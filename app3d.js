/* =========================================================
   RaceMarket 3D Visual Layer
   Built on top of the attached working race model.

   - Leaves race/market engine untouched.
   - Replaces only the visual track with a browser-rendered 3D
     scene when Three.js is available.
   - Falls back to the original visualizer if WebGL/CDN fails.
========================================================= */

(() => {
  "use strict";

  const THREE_SRC = "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";

  const COLOR = {
    dirt: 0x765038,
    dirtDark: 0x4b3022,
    dirtLight: 0x9a6a46,
    turf: 0x2f7137,
    turfDark: 0x173b20,
    turfLight: 0x4f8c46,
    rail: 0xd7d3c6,
    railDark: 0x706e66,
    white: 0xf2f0e6,
    wood: 0x4b3426,
    grandstand: 0x2a302b,
    tree: 0x244d2b,
    treeDark: 0x102816,
    sky: 0x92aa9c,
    gold: 0xd6b76b
  };

  const rendererState = {
    ready: false,
    renderer: null,
    scene: null,
    camera: null,
    root: null,
    horses: new Map(),
    materials: {},
    textures: {},
    lastWidth: 0,
    lastHeight: 0,
    currentProfileKey: "",
    environmentKey: "",
    raf: 0
  };

  function log(...args) {
    console.debug("[RaceMarket 3D]", ...args);
  }

  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

  function getTrackEl(){
    return document.getElementById("visualTrack");
  }

  function getCanvas(){
    return document.getElementById("race3dCanvas");
  }

  function createCanvasTexture(surface){
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    if(surface === "Turf"){
      const g = ctx.createLinearGradient(0,0,1024,0);
      g.addColorStop(0,"#234f29");
      g.addColorStop(.5,"#31763b");
      g.addColorStop(1,"#234f29");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,1024,1024);

      for(let i=0;i<14000;i++){
        const x=Math.random()*1024,y=Math.random()*1024;
        const l=70+Math.random()*70;
        ctx.fillStyle=`rgba(${35+Math.random()*35},${70+Math.random()*65},${28+Math.random()*38},${.10+Math.random()*.18})`;
        ctx.fillRect(x,y,1+Math.random()*2,l*.025);
      }

      for(let x=0;x<1024;x+=74){
        ctx.fillStyle="rgba(195,225,167,.045)";
        ctx.fillRect(x,0,26,1024);
      }
    } else {
      const g = ctx.createLinearGradient(0,0,0,1024);
      g.addColorStop(0,"#5b3a28");
      g.addColorStop(.46,"#7b5136");
      g.addColorStop(1,"#5a3826");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,1024,1024);

      for(let i=0;i<12000;i++){
        const x=Math.random()*1024,y=Math.random()*1024;
        const shade=45+Math.floor(Math.random()*95);
        ctx.fillStyle=`rgba(${shade+28},${shade},${shade-20},${.045+Math.random()*.14})`;
        ctx.fillRect(x,y,1+Math.random()*3,1+Math.random()*2);
      }

      for(let i=0;i<500;i++){
        const x=Math.random()*1024,y=Math.random()*1024;
        ctx.strokeStyle="rgba(235,205,173,.055)";
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+20+Math.random()*70,y+Math.random()*4-2);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5.5, 5.5);
    tex.anisotropy = 8;
    return tex;
  }

  function makeMat(color, opts={}){
    return new THREE.MeshStandardMaterial({
      color,
      roughness: opts.roughness ?? .82,
      metalness: opts.metalness ?? .02,
      map: opts.map || null,
      transparent: opts.transparent || false,
      opacity: opts.opacity ?? 1
    });
  }

  function createHorse(horse){
    const group = new THREE.Group();
    group.userData.horseId = horse.id;

    const coat = {
      1:0x6c4532,2:0x4b3025,3:0x8e4b2d,4:0x965634,
      5:0x272521,6:0x79786f,7:0x5d6261,8:0x623526
    }[(horse.id-1)%8+1] || 0x6c4532;

    const coatMat = makeMat(coat,{roughness:.67});
    const darkMat = makeMat(0x1b110d,{roughness:.9});
    const skinMat = makeMat(0xc18b67,{roughness:.72});
    const silkColors = [
      0xc93c36,0xe8e6dc,0x2d68ba,0xd7b033,
      0x2f8249,0x171717,0xe76e28,0xd77ca9,
      0x219a9c,0x8254a6,0x8b8b8b,0x6da348
    ];
    const silkMat = makeMat(silkColors[(horse.post-1)%silkColors.length],{roughness:.55});

    // Body — elongated capsule-like set of overlapping spheres.
    const body = new THREE.Mesh(new THREE.SphereGeometry(1,20,14),coatMat);
    body.scale.set(2.25,.82,.78);
    body.position.set(0,1.42,0);
    group.add(body);

    const chest = new THREE.Mesh(new THREE.SphereGeometry(1,18,12),coatMat);
    chest.scale.set(.72,.83,.70);
    chest.position.set(1.62,1.54,0);
    group.add(chest);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(.42,.58,1.9,14),coatMat);
    neck.position.set(1.62,2.38,0);
    neck.rotation.z=-.30;
    group.add(neck);

    // Head + muzzle
    const head = new THREE.Mesh(new THREE.SphereGeometry(1,16,12),coatMat);
    head.scale.set(.68,.50,.47);
    head.position.set(2.65,3.28,0);
    head.rotation.z=-.06;
    group.add(head);

    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(1,14,10),darkMat);
    muzzle.scale.set(.36,.25,.30);
    muzzle.position.set(3.16,3.12,0);
    group.add(muzzle);

    // Ears
    for(const z of [-.16,.16]){
      const ear=new THREE.Mesh(new THREE.CylinderGeometry(.10,.16,.48,8),darkMat);
      ear.position.set(2.48,3.86,z);
      ear.rotation.z=(z<0?-.16:.16);
      group.add(ear);
    }

    // Mane
    for(let i=0;i<7;i++){
      const mane=new THREE.Mesh(
        new THREE.CylinderGeometry(.055,.09,.55,7),
        darkMat
      );
      mane.position.set(1.15+i*.16,3.08-i*.09,-.43);
      mane.rotation.z=-.45;
      group.add(mane);
    }

    // Tail
    const tailBase=new THREE.Mesh(new THREE.CylinderGeometry(.14,.22,1.05,9),darkMat);
    tailBase.position.set(-2.2,1.60,0);
    tailBase.rotation.z=1.05;
    group.add(tailBase);

    for(let i=0;i<3;i++){
      const tail=new THREE.Mesh(new THREE.CylinderGeometry(.05,.09,.75,7),darkMat);
      tail.position.set(-2.65-i*.20,1.54-i*.12,(i-1)*.05);
      tail.rotation.z=1.18+i*.09;
      group.add(tail);
    }

    // Saddle
    const saddle=new THREE.Mesh(new THREE.SphereGeometry(1,16,10),darkMat);
    saddle.scale.set(.72,.12,.65);
    saddle.position.set(-.15,2.18,0);
    group.add(saddle);

    // Saddlecloth with post number
    const cloth=new THREE.Mesh(new THREE.BoxGeometry(1.05,.10,.88),silkMat);
    cloth.position.set(-.20,2.05,0);
    group.add(cloth);

    // Jockey
    const torso=new THREE.Mesh(new THREE.BoxGeometry(.50,.80,.38),silkMat);
    torso.position.set(-.25,2.83,0);
    torso.rotation.z=-.25;
    group.add(torso);

    const headJ=new THREE.Mesh(new THREE.SphereGeometry(.23,12,10),skinMat);
    headJ.position.set(-.10,3.48,0);
    group.add(headJ);

    const helmet=new THREE.Mesh(new THREE.SphereGeometry(.28,14,8),silkMat);
    helmet.scale.set(1,.52,1);
    helmet.position.set(-.10,3.66,0);
    group.add(helmet);

    // Four segmented legs, each with a joint.
    const legDefs=[
      [-1.10,-.42,0],[-1.10,.42,Math.PI],
      [1.20,-.42,Math.PI],[1.20,.42,0]
    ];
    const legs=[];
    legDefs.forEach((d,idx)=>{
      const upper=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.92,9),coatMat);
      upper.position.set(d[0],.78,d[1]);
      group.add(upper);
      const lower=new THREE.Mesh(new THREE.CylinderGeometry(.075,.11,.78,8),darkMat);
      lower.position.set(d[0],.18,d[1]);
      group.add(lower);
      const hoof=new THREE.Mesh(new THREE.BoxGeometry(.23,.10,.20),darkMat);
      hoof.position.set(d[0]+.08,.04,d[1]);
      group.add(hoof);
      legs.push({upper,lower,hoof,phase:d[2],baseX:d[0],baseZ:d[1]});
    });

    // Bridle/reins
    const reinMat=makeMat(0x17110f,{roughness:.75});
    const rein1=new THREE.Mesh(new THREE.TorusGeometry(.48,.018,6,18,Math.PI*1.2),reinMat);
    rein1.position.set(2.45,3.28,-.42);
    rein1.rotation.y=Math.PI/2;
    group.add(rein1);

    group.userData.parts={body,chest,neck,head,tailBase,torso,headJ,helmet,legs,cloth,saddle};
    group.userData.coatMat=coatMat;
    return group;
  }

  function addBox(parent,size,pos,mat){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);
    mesh.position.set(...pos);
    parent.add(mesh);
    return mesh;
  }

  function addTree(parent,x,z,scale=1){
    const trunk=addBox(parent,[.28,2.0,.28],[x,1,z],makeMat(0x3b281b,{roughness:.96}));
    const crown=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),makeMat(COLOR.tree,{roughness:.95}));
    crown.position.set(x,2.55,z);
    crown.scale.set(1.5*scale,1.7*scale,1.5*scale);
    parent.add(crown);
    const crown2=new THREE.Mesh(new THREE.SphereGeometry(1,9,7),makeMat(COLOR.treeDark,{roughness:.97}));
    crown2.position.set(x+.55*scale,2.7,z+.1);
    crown2.scale.set(1.2*scale,1.4*scale,1.2*scale);
    parent.add(crown2);
  }

  function buildEnvironment(){
    const scene=rendererState.scene;
    const key = `${state.profile?.track}|${state.profile?.surface}|${state.trackCondition?.name}|${state.weather?.name}`;
    if(rendererState.environmentKey===key) return;
    rendererState.environmentKey=key;

    if(rendererState.root){
      scene.remove(rendererState.root);
      rendererState.root=null;
    }

    const root=new THREE.Group();
    root.name="race-environment";

    const surface = state.profile?.surface==="Turf" ? "Turf" : "Dirt";
    const trackMat=makeMat(
      surface==="Turf"?COLOR.turf:COLOR.dirt,
      {map:createCanvasTexture(surface),roughness: surface==="Turf" ? .95 : .88}
    );
    rendererState.textures.surface=trackMat.map;

    // Main track
    const track=new THREE.Mesh(new THREE.PlaneGeometry(170,58,1,1),trackMat);
    track.rotation.x=-Math.PI/2;
    track.position.set(0,0,0);
    track.receiveShadow=true;
    root.add(track);

    // Infield
    const infield=new THREE.Mesh(
      new THREE.PlaneGeometry(170,18),
      makeMat(surface==="Turf"?COLOR.turfDark:0x4c2f20,{roughness:.99})
    );
    infield.rotation.x=-Math.PI/2;
    infield.position.set(0,-.012,0);
    root.add(infield);

    // Track lanes
    const laneMat=makeMat(0xd9d1bc,{roughness:.78});
    for(let z=-20;z<=20;z+=8){
      const line=new THREE.Mesh(new THREE.PlaneGeometry(160,.045),laneMat);
      line.rotation.x=-Math.PI/2;
      line.position.set(0,.012,z);
      root.add(line);
    }

    // Rails
    const railMat=makeMat(COLOR.rail,{roughness:.48,metalness:.18});
    const postMat=makeMat(COLOR.railDark,{roughness:.62,metalness:.15});
    for(const side of [-27,27]){
      for(let x=-78;x<=78;x+=5.4){
        const post=new THREE.Mesh(new THREE.CylinderGeometry(.075,.09,1.45,8),postMat);
        post.position.set(x,.72,side);
        post.castShadow=true;
        root.add(post);
      }
      for(const y of [1.35,.68]){
        const rail=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,156,8),railMat);
        rail.rotation.z=Math.PI/2;
        rail.position.set(0,y,side);
        root.add(rail);
      }
    }

    // Starting gate
    for(let z=-22;z<=22;z+=3.2){
      addBox(root,[.18,2.4,.12],[-67,1.2,z],postMat);
    }
    addBox(root,[.24,.12,48],[-67,2.28,0],railMat);

    // Finish checkered line and marker
    const finishZ=new THREE.Group();
    const finishMatA=makeMat(0xf2efe4,{roughness:.72});
    const finishMatB=makeMat(0x191c19,{roughness:.88});
    for(let z=-23;z<=23;z+=1.6){
      const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.6),((Math.round((z+23)/1.6)%2)===0)?finishMatA:finishMatB);
      m.rotation.x=-Math.PI/2;
      m.position.set(65,.024,z);
      finishZ.add(m);
    }
    root.add(finishZ);

    // Distant grandstand
    for(let tier=0;tier<5;tier++){
      const b=addBox(
        root,
        [104,.85,7],
        [12,2.0+tier*.85,38+tier*.3],
        makeMat(COLOR.grandstand,{roughness:.97})
      );
      b.castShadow=true;
    }
    addBox(root,[108,.34,8],[12,6.6,38],makeMat(0x131715,{roughness:.9}));

    for(let x=-42;x<=64;x+=9){
      addBox(root,[.15,4.2,.15],[x,3.7,34],postMat);
    }

    // Horizon/tree line
    for(let x=-76;x<=76;x+=7){
      const z=46+Math.sin(x*.18)*3;
      addTree(root,x,z,0.75+Math.random()*.5);
    }

    // Venue-specific landmarks
    if((state.profile?.track||"").includes("Churchill")){
      for(const x of [-22,28]){
        const spire=addBox(root,[1.1,4.6,1.1],[x,6.3,37],makeMat(COLOR.gold,{roughness:.60}));
        spire.rotation.y=.1;
      }
    }

    rendererState.root=root;
    scene.add(root);
  }

  function rebuildHorses(){
    if(!rendererState.root) return;
    const currentIds=new Set((state.horses||[]).map(h=>h.id));

    for(const [id,obj] of rendererState.horses.entries()){
      if(!currentIds.has(id)){
        rendererState.root.remove(obj);
        rendererState.horses.delete(id);
      }
    }

    (state.horses||[]).forEach(horse=>{
      let obj=rendererState.horses.get(horse.id);
      if(!obj){
        obj=createHorse(horse);
        rendererState.horses.set(horse.id,obj);
        rendererState.root.add(obj);
      }
    });
  }

  function horseX(h){
    const p=clamp(
      (h.distanceTravelled||0)/Math.max(1,state.raceDistance||100),
      0,1
    );
    return -60 + p*122;
  }

  function horseZ(h){
    const count=Math.max(1,state.horses.length);
    if(count===1) return 0;
    return -21 + ((h.post-1)/(count-1))*42;
  }

  function updateHorses(time){
    const live=state.phase==="live";
    const now=time*.001;

    (state.horses||[]).forEach((h,idx)=>{
      const obj=rendererState.horses.get(h.id);
      if(!obj)return;

      obj.visible=true;
      const targetX=horseX(h);
      const targetZ=horseZ(h);
      obj.position.x += (targetX-obj.position.x)*.14;
      obj.position.z += (targetZ-obj.position.z)*.14;

      const speed=clamp((h.currentSpeed||0)/1.25,.55,1.15);
      const gait=live ? now*(5.2+speed*2.1)+h.id*.87 : 0;
      const swing=live ? Math.sin(gait) : 0;

      const parts=obj.userData.parts;
      if(!parts) return;

      // Body and jockey bounce only while racing.
      const bob=live ? Math.abs(Math.sin(gait*1.0))*.055 : 0;
      parts.body.position.y=1.42+bob;
      parts.chest.position.y=1.54+bob;
      parts.torso.position.y=2.83+bob*.8;
      parts.headJ.position.y=3.48+bob*.8;
      parts.helmet.position.y=3.66+bob*.8;

      // Gallop articulation. Zeroes out exactly when not running.
      parts.legs.forEach((leg,i)=>{
        const phase=(i%2===0)?0:Math.PI;
        const a=live ? Math.sin(gait+phase)*.72 : 0;
        leg.upper.rotation.z=a*.55;
        leg.lower.rotation.z=-a*.72;
        leg.hoof.rotation.z=-a*.35;
        leg.upper.position.y=0.78+bob;
        leg.lower.position.y=0.18+bob*.35;
        leg.hoof.position.y=0.04;
      });

      parts.tailBase.rotation.z=1.05 + (live?Math.sin(gait*.8)*.16:0);
      parts.neck.rotation.z=-.30 + (live?Math.sin(gait*.7)*.035:0);

      // Face slightly down-track.
      obj.rotation.y=0;

      // A subtle shadow footprint.
      if(!obj.userData.shadow){
        const shadowMat=new THREE.MeshBasicMaterial({
          color:0x16120f,transparent:true,opacity:.23
        });
        const shadow=new THREE.Mesh(
          new THREE.CircleGeometry(1.9,.36),
          shadowMat
        );
        shadow.rotation.x=-Math.PI/2;
        shadow.position.set(0,.018,0);
        obj.add(shadow);
        obj.userData.shadow=shadow;
      }
    });
  }

  function init(){
    if(!window.THREE){
      log("Three.js not available; keeping original visualizer.");
      return;
    }

    const canvas=getCanvas();
    const track=getTrackEl();
    if(!canvas||!track){
      log("3D canvas/track missing.");
      return;
    }

    try{
      const renderer=new THREE.WebGLRenderer({
        canvas,
        antialias:true,
        alpha:false,
        powerPreference:"high-performance"
      });
      renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
      renderer.shadowMap.enabled=true;
      renderer.shadowMap.type=THREE.PCFSoftShadowMap;
      renderer.outputEncoding=THREE.sRGBEncoding;

      const scene=new THREE.Scene();
      scene.background=new THREE.Color(COLOR.sky);
      scene.fog=new THREE.Fog(0x7f9689,70,170);

      const camera=new THREE.PerspectiveCamera(48,1,.1,260);
      camera.position.set(-14,9.5,34);

      // Hemisphere + warm key + soft fill.
      scene.add(new THREE.HemisphereLight(0xbfd2c3,0x3c2b1e,1.65));

      const key=new THREE.DirectionalLight(0xfff0cf,2.1);
      key.position.set(-20,31,18);
      key.castShadow=true;
      key.shadow.mapSize.set(2048,2048);
      key.shadow.camera.left=-85;
      key.shadow.camera.right=85;
      key.shadow.camera.top=70;
      key.shadow.camera.bottom=-70;
      key.shadow.bias=-.0003;
      scene.add(key);

      const fill=new THREE.DirectionalLight(0x9eb8ff,.45);
      fill.position.set(35,13,-30);
      scene.add(fill);

      rendererState.renderer=renderer;
      rendererState.scene=scene;
      rendererState.camera=camera;
      rendererState.ready=true;

      track.classList.add("three-enabled");
      rendererState.currentProfileKey="";
      buildEnvironment();
      rebuildHorses();
      resize();
      updateStatus();
      renderLoop(0);

      log("3D renderer initialized.");
    }catch(error){
      console.warn("[RaceMarket 3D] Initialization failed; original visualizer remains active.",error);
      rendererState.ready=false;
    }
  }

  function resize(){
    if(!rendererState.ready)return;
    const canvas=getCanvas();
    const rect=canvas.getBoundingClientRect();
    const dpr=Math.min(2,window.devicePixelRatio||1);
    const w=Math.max(1,Math.floor(rect.width*dpr));
    const h=Math.max(1,Math.floor(rect.height*dpr));

    if(canvas.width!==w||canvas.height!==h){
      canvas.width=w;
      canvas.height=h;
      rendererState.renderer.setSize(rect.width,rect.height,false);
    }

    rendererState.camera.aspect=Math.max(.5,rect.width/Math.max(1,rect.height));
    rendererState.camera.updateProjectionMatrix();
  }

  function updateCamera(){
    if(!rendererState.ready)return;
    const leader=(state.horses||[]).find(h=>h.id===state.horses?.[0]?.id) ||
                 [...(state.horses||[])].sort((a,b)=>(b.distanceTravelled||0)-(a.distanceTravelled||0))[0];
    if(!leader)return;

    const leaderX=horseX(leader);
    const targetX=leaderX+6;
    const target=new THREE.Vector3(targetX,1.65,0);

    const desiredCameraX=leaderX-13;
    const desiredZ=state.phase==="live" ? 25 : 31;
    const desiredY=state.phase==="live" ? 7.3 : 8.2;

    rendererState.camera.position.x += (desiredCameraX-rendererState.camera.position.x)*.055;
    rendererState.camera.position.y += (desiredY-rendererState.camera.position.y)*.055;
    rendererState.camera.position.z += (desiredZ-rendererState.camera.position.z)*.055;
    rendererState.camera.lookAt(target);
  }

  function updateStatus(){
    const status=document.getElementById("race3dStatus");
    if(!status)return;
    const phase=state.phase||"countdown";
    status.textContent=
      phase==="live" ? "3D • LIVE" :
      phase==="countdown" ? "3D • PRE-RACE" :
      phase==="finished" ? "3D • FINISH" :
      "3D • SETTLED";
  }

  function renderLoop(time){
    rendererState.raf=requestAnimationFrame(renderLoop);
    if(!rendererState.ready)return;

    const envKey =
      `${state.profile?.track}|${state.profile?.surface}|${state.trackCondition?.name}|${state.weather?.name}`;

    if(rendererState.environmentKey!==envKey){
      buildEnvironment();
      rebuildHorses();
    }

    const horseKey=(state.horses||[]).map(h=>h.id).join(",");
    if(rendererState.currentProfileKey!==horseKey){
      rendererState.currentProfileKey=horseKey;
      rebuildHorses();
    }

    updateHorses(time);
    updateCamera();
    updateStatus();
    resize();
    rendererState.renderer.render(
      rendererState.scene,
      rendererState.camera
    );
  }

  // Hook after the working application's initial DOM callback has built
  // the race state. The original 2D system remains the fallback.
  document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(init,0);
  });

  window.addEventListener("resize",resize);
})();
