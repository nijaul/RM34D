/* =========================================================
   RaceMarket V4.15
   Emergent race simulation + premium racing visuals
========================================================= */

const HORSE_UNIVERSE = [
  { id:1, name:"Golden Tempo", age:5, sex:"Horse", baseRating:84, dirt:87, sprint:82, route:85, earlySpeed:83, lateSpeed:80, classRating:84, form:[3,1,4,2,5] },
  { id:2, name:"Renegade", age:6, sex:"Horse", baseRating:81, dirt:84, sprint:79, route:83, earlySpeed:88, lateSpeed:75, classRating:82, form:[2,6,1,5,3] },
  { id:3, name:"Skippylongstocking", age:6, sex:"Horse", baseRating:88, dirt:91, sprint:72, route:94, earlySpeed:81, lateSpeed:93, classRating:90, form:[1,2,3,1,4] },
  { id:4, name:"White Abarrio", age:6, sex:"Horse", baseRating:92, dirt:95, sprint:84, route:95, earlySpeed:90, lateSpeed:91, classRating:96, form:[1,1,2,4,1] },
  { id:5, name:"Napoleon Solo", age:5, sex:"Horse", baseRating:78, dirt:80, sprint:76, route:79, earlySpeed:75, lateSpeed:84, classRating:77, form:[5,3,7,2,6] },
  { id:6, name:"Counting Stars", age:4, sex:"Horse", baseRating:76, dirt:78, sprint:88, route:70, earlySpeed:91, lateSpeed:69, classRating:74, form:[2,4,1,8,2] },
  { id:7, name:"Commandment", age:5, sex:"Horse", baseRating:83, dirt:85, sprint:86, route:79, earlySpeed:85, lateSpeed:82, classRating:81, form:[4,2,2,6,3] },
  { id:8, name:"Magnitude", age:4, sex:"Horse", baseRating:87, dirt:89, sprint:76, route:92, earlySpeed:78, lateSpeed:95, classRating:87, form:[2,1,5,2,1] },
  { id:9, name:"Always a Runner", age:5, sex:"Horse", baseRating:74, dirt:76, sprint:90, route:68, earlySpeed:92, lateSpeed:68, classRating:72, form:[6,4,3,7,2] },
  { id:10, name:"Further Ado", age:6, sex:"Horse", baseRating:79, dirt:82, sprint:80, route:81, earlySpeed:73, lateSpeed:88, classRating:79, form:[3,5,2,4,5] },
  { id:11, name:"Sovereignty", age:4, sex:"Horse", baseRating:94, dirt:96, sprint:70, route:98, earlySpeed:80, lateSpeed:97, classRating:98, form:[1,1,2,1,3] },
  { id:12, name:"Silent Tactic", age:5, sex:"Horse", baseRating:80, dirt:83, sprint:78, route:84, earlySpeed:82, lateSpeed:86, classRating:80, form:[4,3,6,1,4] },
  { id:13, name:"Nitrogen", age:3, sex:"Horse", baseRating:86, dirt:88, sprint:82, route:90, earlySpeed:84, lateSpeed:88, classRating:85, form:[2,1,3,1,4] },
  { id:14, name:"Chip Honcho", age:3, sex:"Horse", baseRating:80, dirt:82, sprint:84, route:78, earlySpeed:89, lateSpeed:76, classRating:79, form:[4,2,5,1,6] },
  { id:15, name:"Kathynmarissa", age:4, sex:"Horse", baseRating:79, dirt:84, sprint:87, route:75, earlySpeed:86, lateSpeed:80, classRating:80, form:[2,5,1,3,4] },
  { id:16, name:"Ted Noffey", age:3, sex:"Horse", baseRating:78, dirt:80, sprint:83, route:77, earlySpeed:82, lateSpeed:86, classRating:77, form:[3,4,2,7,1] },
  { id:17, name:"The Puma", age:3, sex:"Horse", baseRating:84, dirt:86, sprint:80, route:88, earlySpeed:79, lateSpeed:91, classRating:84, form:[1,3,2,5,4] },
  { id:18, name:"Baeza", age:3, sex:"Horse", baseRating:88, dirt:92, sprint:71, route:96, earlySpeed:79, lateSpeed:94, classRating:91, form:[2,2,1,3,5] },
  { id:19, name:"Journalism", age:4, sex:"Horse", baseRating:91, dirt:94, sprint:76, route:96, earlySpeed:85, lateSpeed:95, classRating:94, form:[1,1,1,2,3] },
  { id:20, name:"Forever Young", age:6, sex:"Horse", baseRating:93, dirt:95, sprint:74, route:97, earlySpeed:83, lateSpeed:96, classRating:96, form:[1,2,1,1,2] }
];

const RACE_PROFILES = [

  /* ======================================================
     DIRT TRACKS
     ====================================================== */

  {
    track:"Churchill Downs",
    distance:"1 1/8 Miles",
    surface:"Dirt",
    raceType:"Stakes",
    style:"Strong Favorite",
    minHorses:7,
    maxHorses:8,
    volatility:.75,
    favoriteBoost:7,
    routeWeight:1.15,
    raceSecondsMin:80,
    raceSecondsMax:100
  },

  {
    track:"Gulfstream Park",
    distance:"6 Furlongs",
    surface:"Dirt",
    raceType:"Allowance",
    style:"Wide Open",
    minHorses:6,
    maxHorses:7,
    volatility:1.25,
    favoriteBoost:1,
    sprintWeight:1.2,
    raceSecondsMin:55,
    raceSecondsMax:75
  },

  {
    track:"Keeneland",
    distance:"1 1/8 Miles",
    surface:"Dirt",
    raceType:"Stakes",
    style:"Late Speed",
    minHorses:8,
    maxHorses:14,
    volatility:1.1,
    favoriteBoost:2,
    routeWeight:1.2,
    lateWeight:1.2,
    raceSecondsMin:95,
    raceSecondsMax:120
  },

  {
    track:"Saratoga",
    distance:"1 1/16 Miles",
    surface:"Dirt",
    raceType:"Handicap",
    style:"Speed Duel",
    minHorses:7,
    maxHorses:14,
    volatility:1.35,
    favoriteBoost:2,
    earlyWeight:1.2,
    raceSecondsMin:85,
    raceSecondsMax:105
  },

  {
    track:"Santa Anita",
    distance:"6.5 Furlongs",
    surface:"Dirt",
    raceType:"Allowance",
    style:"Front Runner",
    minHorses:6,
    maxHorses:8,
    volatility:1.15,
    favoriteBoost:4,
    sprintWeight:1.1,
    earlyWeight:1.25,
    raceSecondsMin:60,
    raceSecondsMax:80
  },

  {
    track:"Belmont at the Big A",
    distance:"1 1/4 Miles",
    surface:"Dirt",
    raceType:"Stakes",
    style:"Big Field",
    minHorses:10,
    maxHorses:20,
    volatility:1.3,
    favoriteBoost:1,
    routeWeight:1.25,
    lateWeight:1.15,
    raceSecondsMin:105,
    raceSecondsMax:130
  },


  /* ======================================================
     TURF TRACKS
     ====================================================== */

  {
    track:"Gulfstream Park",
    distance:"1 Mile",
    surface:"Turf",
    raceType:"Allowance",
    style:"Wide Open",
    minHorses:8,
    maxHorses:12,
    volatility:1.18,
    favoriteBoost:2,
    routeWeight:1.25,
    lateWeight:1.12,
    raceSecondsMin:82,
    raceSecondsMax:100
  },

  {
    track:"Keeneland Turf Course",
    distance:"1 1/8 Miles",
    surface:"Turf",
    raceType:"Stakes",
    style:"Late Speed",
    minHorses:8,
    maxHorses:14,
    volatility:1.12,
    favoriteBoost:2,
    routeWeight:1.25,
    lateWeight:1.22,
    raceSecondsMin:92,
    raceSecondsMax:116
  },

  {
    track:"Saratoga Turf",
    distance:"1 1/16 Miles",
    surface:"Turf",
    raceType:"Stakes",
    style:"Tactical",
    minHorses:8,
    maxHorses:12,
    volatility:1.20,
    favoriteBoost:2,
    routeWeight:1.22,
    lateWeight:1.20,
    raceSecondsMin:88,
    raceSecondsMax:108
  },

  {
    track:"Santa Anita Turf",
    distance:"1 Mile",
    surface:"Turf",
    raceType:"Allowance",
    style:"Stalker Friendly",
    minHorses:7,
    maxHorses:11,
    volatility:1.12,
    favoriteBoost:2,
    routeWeight:1.18,
    lateWeight:1.14,
    raceSecondsMin:78,
    raceSecondsMax:94
  },

  {
    track:"Belmont Turf",
    distance:"1 1/8 Miles",
    surface:"Turf",
    raceType:"Stakes",
    style:"Big Field",
    minHorses:9,
    maxHorses:16,
    volatility:1.25,
    favoriteBoost:1,
    routeWeight:1.28,
    lateWeight:1.25,
    raceSecondsMin:94,
    raceSecondsMax:118
  }

];

const SILK_PALETTE = [
  { silk:"#d95f59", body:"#50392d" },
  { silk:"#5b8def", body:"#604b3b" },
  { silk:"#7acb7a", body:"#3f3027" },
  { silk:"#d6a84f", body:"#5a4030" },
  { silk:"#b77be0", body:"#4b352b" },
  { silk:"#f08a57", body:"#523a2e" },
  { silk:"#4fc1b0", body:"#604635" },
  { silk:"#e8e8e8", body:"#392c28" },
  { silk:"#e16f9a", body:"#684a38" },
  { silk:"#8ca2b8", body:"#47342b" },
  { silk:"#e6c75c", body:"#493328" },
  { silk:"#7aa2ff", body:"#4a382d" }
];


const POST_COLORS = {
  1:"#cf3c36", 2:"#f1eee7", 3:"#2f69bd", 4:"#e5be38",
  5:"#2e8a4b", 6:"#191919", 7:"#ef7c28", 8:"#e38bb2",
  9:"#23a4a5", 10:"#8d57b5", 11:"#8b8b8b", 12:"#79a84b",
  13:"#a95e36", 14:"#4a7cbe", 15:"#d45a86", 16:"#5c7f62",
  17:"#c59a3c", 18:"#5f5f8f", 19:"#b65c43", 20:"#3d9d85"
};

const HORSE_COATS = [
  {name:"Bay",main:"#6f4933",light:"#a87550",dark:"#2b1812",muzzle:"#362117"},
  {name:"Dark Bay",main:"#4c3024",light:"#744936",dark:"#1c100d",muzzle:"#251510"},
  {name:"Chestnut",main:"#914e2f",light:"#c1774f",dark:"#32170f",muzzle:"#3d1d14"},
  {name:"Flaxen Chestnut",main:"#985d38",light:"#d08a59",dark:"#351b12",muzzle:"#412319"},
  {name:"Black",main:"#262522",light:"#4a4841",dark:"#090908",muzzle:"#171615"},
  {name:"Gray",main:"#77766e",light:"#b5b4aa",dark:"#35342f",muzzle:"#4d4b45"},
  {name:"Steel Gray",main:"#5d6261",light:"#939a97",dark:"#252827",muzzle:"#3c403e"},
  {name:"Mahogany",main:"#633425",light:"#92523a",dark:"#210f0b",muzzle:"#301610"}
];

const RACE_WEATHER = [
  {name:"Sunny",className:"weather-sunny",atmosphere:"Clear skies"},
  {name:"Overcast",className:"weather-overcast",atmosphere:"Overcast"},
  {name:"Golden Hour",className:"weather-golden",atmosphere:"Late afternoon light"},
  {name:"Morning Haze",className:"weather-haze",atmosphere:"Cool morning haze"},
  {name:"Light Rain",className:"weather-rain",atmosphere:"Light rain"}
];

const TRACK_CONDITIONS = {
  Dirt:[
    {name:"Fast",wetness:0,spray:.18,darkness:0},
    {name:"Good",wetness:.18,spray:.30,darkness:.06},
    {name:"Muddy",wetness:.62,spray:.68,darkness:.25},
    {name:"Sloppy",wetness:.88,spray:.95,darkness:.40}
  ],
  Turf:[
    {name:"Firm",wetness:.04,spray:.12,darkness:0},
    {name:"Good",wetness:.20,spray:.20,darkness:.05},
    {name:"Yielding",wetness:.58,spray:.34,darkness:.22}
  ]
};

const VENUE_VISUALS = {
  "Churchill Downs":{
    short:"CD",
    className:"venue-churchill",
    skyline:"Twin Spires"
  },
  "Gulfstream Park":{
    short:"GP",
    className:"venue-gulfstream",
    skyline:"Palm Skyline"
  },
  "Keeneland":{
    short:"KEE",
    className:"venue-keeneland",
    skyline:"Kentucky Green"
  },
  "Keeneland Turf Course":{
    short:"KEE",
    className:"venue-keeneland",
    skyline:"Kentucky Green"
  },
  "Saratoga":{
    short:"SAR",
    className:"venue-saratoga",
    skyline:"Historic Grandstand"
  },
  "Saratoga Turf":{
    short:"SAR",
    className:"venue-saratoga",
    skyline:"Historic Grandstand"
  },
  "Santa Anita":{
    short:"SA",
    className:"venue-santa-anita",
    skyline:"San Gabriel Mountains"
  },
  "Santa Anita Turf":{
    short:"SA",
    className:"venue-santa-anita",
    skyline:"San Gabriel Mountains"
  },
  "Belmont at the Big A":{
    short:"BEL",
    className:"venue-belmont-big-a",
    skyline:"Long Belmont Stretch"
  },
  "Belmont Turf":{
    short:"BEL",
    className:"venue-belmont-big-a",
    skyline:"Long Belmont Stretch"
  }
};


const WEATHER_PROFILES = [
  {name:"Sunny",className:"weather-sunny",atmosphere:"Clear skies",intensity:.08},
  {name:"Overcast",className:"weather-overcast",atmosphere:"Overcast skies",intensity:.25},
  {name:"Golden Hour",className:"weather-golden",atmosphere:"Late afternoon light",intensity:.12},
  {name:"Morning Haze",className:"weather-haze",atmosphere:"Cool morning haze",intensity:.38},
  {name:"Light Rain",className:"weather-rain",atmosphere:"Light rain",intensity:.95}
];

const state = {
  phase:"countdown",
  openCountdown:15,
  raceT:0,
  raceDuration:90,

  cash:10000,

  selected:1,
  side:"buy",

  positions:{},
  history:{},
  lastPrices:{},

  winner:null,
  timer:null,

  profile:null,
  horses:[],

  raceNumber:1,

  finishAt:null,
  raceDistance:100,
  finishOrder:[],

  marketSuspended:false,

  pacePlan:"mixed",
  separationFactor:1,

  specialRunnerId:null,
  specialAbilityName:null,

  weather:null,
  weatherClass:"",
  trackCondition:null,
  environment:null,

  visualLoopStarted:false,
  visualEnvironmentOffset:0,
  visualEnvironmentLastTs:null,
  visualTargets:{},
  visualPositions:{}
};


/* =========================================================
   UTILITIES
========================================================= */

function money(v){
  return `$${Number(v).toFixed(2)}`;
}

function cents(p){
  return `${Math.round(Number(p)*100)}¢`;
}

function clamp(v,min,max){
  return Math.max(
    min,
    Math.min(
      max,
      v
    )
  );
}

function randomBetween(min,max){
  return Math.floor(
    Math.random()*
    (max-min+1)
  )+
    min;
}

function randomFloat(min,max){
  return Math.random()*
    (max-min)+
    min;
}

function fmt(seconds){

  const safe=
    Math.max(
      0,
      Number(seconds)||0
    );

  return `${Math.floor(
    safe/60
  ).toString().padStart(2,"0")}:${Math.floor(
    safe%60
  ).toString().padStart(2,"0")}`;
}

function shuffle(items){
  return [...items].sort(
    ()=>Math.random()-.5
  );
}

function sample(items,count){
  return shuffle(items).slice(
    0,
    count
  );
}

function logistic(x){
  return 1/
    (
      1+
      Math.exp(-x)
    );
}


/* =========================================================
   RACE MODEL
========================================================= */

function suitability(horse,profile){

  let score=
    horse.baseRating;

  if(profile.sprintWeight){
    score+=
      (horse.sprint-80)*
      profile.sprintWeight;
  }

  if(profile.routeWeight){
    score+=
      (horse.route-80)*
      profile.routeWeight;
  }

  if(profile.earlyWeight){
    score+=
      (horse.earlySpeed-80)*
      profile.earlyWeight;
  }

  if(profile.lateWeight){
    score+=
      (horse.lateSpeed-80)*
      profile.lateWeight;
  }

  return score+
    randomFloat(
      -3.5,
      3.5
    );
}

function morningLine(p){

  const odds=
    clamp(
      1/
      clamp(
        p,
        .025,
        .55
      )*
      .92,

      1.2,
      80
    );

  if(odds<=2.1)return"1-1";
  if(odds<=3.1)return"2-1";
  if(odds<=4.1)return"3-1";
  if(odds<=5.1)return"4-1";
  if(odds<=6.1)return"5-1";
  if(odds<=8.1)return"6-1";
  if(odds<=10.1)return"8-1";
  if(odds<=13.1)return"10-1";
  if(odds<=17.1)return"12-1";
  if(odds<=21.1)return"15-1";
  if(odds<=28.1)return"20-1";
  if(odds<=36.1)return"25-1";
  if(odds<=51.1)return"30-1";

  return"40-1";
}


/* =========================================================
   BUILD FIELD
========================================================= */

function buildRaceHorses(profile){

  const count=
    randomBetween(
      profile.minHorses,
      profile.maxHorses
    );

  const selected=
    sample(
      HORSE_UNIVERSE,
      count
    );

  const scored=
    selected.map(
      horse=>({

        ...horse,

        raceRating:
          suitability(
            horse,
            profile
          )

      })
    );

  if(
    profile.style===
    "Strong Favorite"
  ){

    scored.sort(
      (a,b)=>
        b.raceRating-
        a.raceRating
    );

  }else{

    scored.sort(
      ()=>Math.random()-.5
    );
  }

  const raw=
    scored.map(
      horse=>{

        let weight=
          Math.max(
            .15,
            horse.raceRating-
            55
          );

        if(
          profile.favoriteBoost&&
          horse.raceRating>=88
        ){

          weight+=
            profile.favoriteBoost;
        }

        return weight;
      }
    );

  const total=
    raw.reduce(
      (a,b)=>
        a+b,
      0
    );

  const stylePool=[
    "Front Runner",
    "Pace Presser",
    "Stalker",
    "Closer",
    "Deep Closer"
  ];

  return scored.map(
    (
      horse,
      index
    )=>{

      const probability=
        raw[index]/
        total;

      let runningStyle=
        stylePool[
          Math.floor(
            Math.random()*
            stylePool.length
          )
        ];

      if(
        horse.earlySpeed>=92&&
        Math.random()<.72
      ){

        runningStyle=
          "Front Runner";

      }else if(
        horse.earlySpeed>=87&&
        Math.random()<.60
      ){

        runningStyle=
          "Pace Presser";

      }else if(
        horse.lateSpeed>=94&&
        Math.random()<.78
      ){

        runningStyle=
          Math.random()<.5
            ?"Closer"
            :"Deep Closer";
      }

      const styleTraits={

        "Front Runner":{
          early:1.10,
          mid:1.01,
          late:.86,
          stamina:.90
        },

        "Pace Presser":{
          early:1.06,
          mid:1.04,
          late:.94,
          stamina:.96
        },

        "Stalker":{
          early:.98,
          mid:1.05,
          late:1.03,
          stamina:1.03
        },

        "Closer":{
          early:.89,
          mid:.97,
          late:1.16,
          stamina:1.07
        },

        "Deep Closer":{
          early:.82,
          mid:.92,
          late:1.24,
          stamina:1.10
        }

      }[runningStyle];

      return{

        ...horse,

        post:index+1,

        postColor:
          POST_COLORS[
            index+1
          ],

        coat:
          HORSE_COATS[
            (horse.id-1)%
            HORSE_COATS.length
          ],

        modelProbability:
          probability,

        morningLine:
          morningLine(
            probability
          ),

        runningStyle,

        styleTraits,

        energy:100,

        distanceTravelled:0,

        distanceRemaining:100,

        position:index+1,

        previousPosition:
          index+1,

        finishTime:null,

        finishPosition:null,

        finished:false,

        currentSpeed:0,

        paceScore:0,

        acceleration:
          randomFloat(
            .93,
            1.07
          ),

        consistency:
          randomFloat(
            .88,
            1.08
          ),

        breakStrength:
          randomFloat(
            -1,
            1
          ),

        raceMomentum:
          randomFloat(
            -1,
            1
          ),

        surgeTimer:0,
        surgeStrength:0,

        fadeTimer:0,
        fadeStrength:0,

        confidence:
          randomFloat(
            .88,
            1.12
          ),

        marketMomentum:0,
        marketShock:0,

        recentMove:0,
        recentEnergy:100,

        upsetPotential:0,
        duelPressure:0,

        breakoutAbility:
          randomFloat(
            .75,
            1.35
          ),

        collapseRisk:
          randomFloat(
            .70,
            1.30
          ),

        staminaReserve:
          randomFloat(
            .90,
            1.10
          ),

        tacticalPatience:
          randomFloat(
            .80,
            1.20
          ),

        pacePreference:
          randomFloat(
            .90,
            1.10
          ),

        frontRunner:
          runningStyle===
          "Front Runner",

        specialAbility:null,
        specialAbilityActive:false,
        specialAbilityUsed:false,
        specialAbilityTriggerT:null,
        specialAbilitySeconds:0,
        specialAbilityDuration:0,
        specialAbilitySpeed:null
      };
    }
  );
}


/* =========================================================
   CREATE RACE
========================================================= */


const SPECIAL_ABILITY_NAME="Flash Kick";

function assignSpecialAbility(){
  state.specialRunnerId=null;
  state.specialAbilityName=null;

  if(!state.horses.length){
    return;
  }

  const runner=
    state.horses[
      Math.floor(
        Math.random()*
        state.horses.length
      )
    ];

  runner.specialAbility=
    SPECIAL_ABILITY_NAME;

  state.specialRunnerId=
    runner.id;

  state.specialAbilityName=
    SPECIAL_ABILITY_NAME;
}

function specialAbilityDuration(energy){
  /*
    3–7 seconds determined from energy at the
    instant the ability activates.
  */
  return clamp(
    3+
    (energy/100)*4,
    3,
    7
  );
}

function specialAbilityEligibleToFire(horse,t){
  if(
    !horse.specialAbility||
    horse.specialAbilityUsed||
    horse.specialAbilityActive||
    horse.finished
  ){
    return false;
  }

  /*
    Random activation trigger is assigned when
    the race is created.
  */
  return(
    horse.specialAbilityTriggerT!==null&&
    state.raceT>=
      horse.specialAbilityTriggerT&&
    t>=.20&&
    t<=.86
  );
}

function activateSpecialAbility(horse){
  if(
    horse.specialAbilityUsed||
    horse.specialAbilityActive
  ){
    return;
  }

  const leader=
    fieldRanks().find(
      h=>
        !h.finished&&
        h.id!==horse.id
    );

  if(!leader){
    return;
  }

  horse.specialAbilityUsed=true;
  horse.specialAbilityActive=true;

  horse.specialAbilityDuration=
    specialAbilityDuration(
      horse.energy
    );

  horse.specialAbilitySeconds=
    Math.ceil(
      horse.specialAbilityDuration
    );

  /*
    Match the leader's CURRENT speed. The boost
    is temporary and does not change the horse's
    base rating.
  */
  horse.specialAbilitySpeed=
    Math.max(
      .01,
      leader.currentSpeed||
      1
    );
}

function createRace(){

  if(state.timer){
    clearInterval(
      state.timer
    );
  }

  state.timer=null;

  state.visualEnvironmentOffset=0;
  state.visualEnvironmentLastTs=null;

  state.visualTargets={};
  state.visualPositions={};

  state.weather=null;
  state.weatherClass="";
  state.weatherIntensity=0;
  state.trackCondition=null;
  state.environment=null;

  state.profile=
    RACE_PROFILES[
      Math.floor(
        Math.random()*
        RACE_PROFILES.length
      )
    ];

  /*
    Weather is selected fresh for every race and is
    stored explicitly so the visual layer cannot lose
    the weather state between renders.
  */
  state.weather=
    WEATHER_PROFILES[
      Math.floor(
        Math.random()*
        WEATHER_PROFILES.length
      )
    ];

  state.weatherClass=
    state.weather.className;

  state.weatherIntensity=
    state.weather.intensity;


  state.weather=
    RACE_WEATHER[
      Math.floor(
        Math.random()*
        RACE_WEATHER.length
      )
    ];

  state.weatherClass=
    state.weather.className;

  const conditionChoices=
    TRACK_CONDITIONS[
      state.profile.surface
    ]||
    TRACK_CONDITIONS.Dirt;

  state.trackCondition=
    conditionChoices[
      Math.floor(
        Math.random()*
        conditionChoices.length
      )
    ];

  const venueVisual=
    VENUE_VISUALS[
      state.profile.track
    ]||
    {
      short:"RACE",
      className:"venue-default",
      skyline:"Racecourse"
    };

  state.environment={
    venue:state.profile.track,
    surface:state.profile.surface,
    condition:state.trackCondition.name,
    weather:state.weather.name,
    venueClass:venueVisual.className,
    cameraIntensity:0
  };

  state.raceNumber=
    randomBetween(
      2,
      10
    );

  const pacePlans=[
    "fastEarly",
    "slowEarly",
    "mixed",
    "stretch",
    "compressed",
    "erratic"
  ];

  state.pacePlan=
    pacePlans[
      Math.floor(
        Math.random()*
        pacePlans.length
      )
    ];

  state.separationFactor=
    randomFloat(
      .72,
      1.38
    );

  state.openCountdown=
    15;

  state.raceT=
    0;

  state.finishAt=
    null;

  state.finishOrder=
    [];

  state.marketSuspended=
    false;

  state.raceDistance=
    100;

  state.raceDuration=
    randomBetween(
      state.profile.raceSecondsMin,
      state.profile.raceSecondsMax
    );

  state.phase=
    "countdown";

  state.winner=
    null;

  state.positions=
    state.positions||
    {};

  state.history=
    {};

  state.lastPrices=
    {};

  state.horses=
    buildRaceHorses(
      state.profile
    );

  assignSpecialAbility();

  state.horses.forEach(
    horse=>{
      horse.specialAbilityTriggerT=null;

      if(
        horse.id===
        state.specialRunnerId
      ){
        horse.specialAbilityTriggerT=
          randomBetween(
            Math.max(
              1,
              Math.round(
                state.raceDuration*
                .20
              )
            ),
            Math.max(
              1,
              Math.round(
                state.raceDuration*
                .86
              )
            )
          );
      }
    }
  );

  state.selected=
    state.horses[0]?.id||
    1;

  state.horses.forEach(
    horse=>{

      state.history[
        horse.id
      ]=[
        {
          t:0,
          p:
            horse.modelProbability
        }
      ];

      state.lastPrices[
        horse.id
      ]=
        horse.modelProbability;
    }
  );

  updateRaceHeader();

  render();

  state.timer=
    setInterval(
      tick,
      1000
    );
}


/* =========================================================
   HEADER
========================================================= */

function updateRaceHeader(){

  if(!state.profile){
    return;
  }

  const values={

    trackName:
      state.profile.track.toUpperCase(),

    raceNumber:
      `Race ${state.raceNumber}`,

    raceDistance:
      `🏇 ${state.profile.distance}`,

    surface:
      state.profile.surface,

    raceType:
      state.profile.raceType,

    horseCount:
      `${state.horses.length} Horses`,

    raceStyle:
      state.profile.style
  };

  Object.entries(
    values
  ).forEach(
    (
      [id,value]
    )=>{

      const el=
        document.getElementById(
          id
        );

      if(el){
        el.textContent=
          value;
      }
    }
  );
}


/* =========================================================
   PROGRESS
========================================================= */

function raceProgress(){

  return clamp(
    state.raceDuration>0

      ?state.raceT/
       state.raceDuration

      :0,

    0,
    1
  );
}

function secondsRemaining(){

  return Math.max(
    0,
    state.raceDuration-
    state.raceT
  );
}

function fieldRanks(){

  return[
    ...state.horses
  ].sort(
    (a,b)=>
      b.distanceTravelled-
      a.distanceTravelled
  );
}


/* =========================================================
   RACE ENGINE
========================================================= */

function percentileNormalized(
  value,
  min,
  max
){

  if(max===min){
    return .5;
  }

  return clamp(
    (
      value-
      min
    )/
    (
      max-
      min
    ),
    0,
    1
  );
}

function updateHorseState(
  horse,
  t
){

  if(
    specialAbilityEligibleToFire(
      horse,
      t
    )
  ){
    activateSpecialAbility(
      horse
    );
  }

  const profile=
    state.profile;

  const style=
    horse.styleTraits;

  const earlyShare=
    clamp(
      1-
      t/.36,
      0,
      1
    );

  const midShare=
    clamp(
      1-
      Math.abs(
        t-.50
      )/
      .32,
      0,
      1
    );

  const lateShare=
    clamp(
      (
        t-.46
      )/
      .54,
      0,
      1
    );

  const ranking=
    fieldRanks();

  const nearby=
    ranking.filter(
      rival=>
        rival.id!==
          horse.id&&
        !rival.finished&&
        Math.abs(
          rival.distanceTravelled-
          horse.distanceTravelled
        )<
        1.35
    ).length;

  let shapeEffect=0;

  switch(
    state.pacePlan
  ){

    case "fastEarly":

      shapeEffect=
        earlyShare*.070-
        lateShare*.018;

      break;

    case "slowEarly":

      shapeEffect=
        earlyShare*.010+
        lateShare*.060;

      break;

    case "stretch":

      shapeEffect=
        t<.45
          ?.008
          :.085;

      break;

    case "compressed":

      shapeEffect=
        -.018+
        lateShare*.105;

      break;

    case "erratic":

      shapeEffect=
        Math.sin(
          state.raceT*.49+
          horse.id*1.73
        )*.048;

      break;

    default:

      shapeEffect=
        Math.sin(
          state.raceT*.13+
          horse.id
        )*.017;
  }

  const ability=
    horse.raceRating*.27+
    horse.baseRating*.10+
    horse.classRating*.10+
    horse.dirt*.055+
    horse.route*
      (profile.routeWeight||1)*
      .035+
    horse.sprint*
      (profile.sprintWeight||1)*
      .025;

  const earlyComponent=
    (
      horse.earlySpeed-
      80
    )*
    .070*
    earlyShare*
    style.early;

  const midComponent=
    (
      horse.baseRating-
      80
    )*
    .023*
    midShare*
    style.mid;

  const lateComponent=
    (
      horse.lateSpeed-
      80
    )*
    .092*
    lateShare*
    style.late;

  let energyCost=
    .15+
    nearby*.075;

  if(
    horse.position===
    1
  ){

    energyCost+=
      .42*
      earlyShare+
      .14*
      midShare;

  }else if(
    horse.position<=3
  ){

    energyCost+=
      .19*
      earlyShare;

  }else{

    energyCost-=
      .03*
      earlyShare;
  }

  if(
    state.pacePlan===
      "fastEarly"&&
    t<.40
  ){

    energyCost+=
      .22*
      horse.pacePreference;
  }

  energyCost/=
    style.stamina*
    horse.staminaReserve;

  horse.recentEnergy=
    horse.energy;

  horse.energy=
    clamp(
      horse.energy-
      energyCost,
      4,
      100
    );

  const fatigue=
    horse.energy<52

      ?Math.pow(
          (
            52-
            horse.energy
          )/
          40,
          1.25
        )*
        .070*
        horse.collapseRisk

      :0;

  const timeLeft=
    secondsRemaining();

  const lateEventFactor=
    timeLeft<=15
      ?1.70
      :timeLeft<=30
        ?1.28
        :1;

  const rhythmNoise=
    randomFloat(
      -.046,
      .046
    )*
    profile.volatility*
    horse.consistency;

  if(
    horse.surgeTimer<=0&&
    horse.fadeTimer<=0&&
    Math.random()<
      .048*
      profile.volatility*
      lateEventFactor*
      horse.breakoutAbility
  ){

    horse.surgeTimer=
      randomBetween(
        2,
        7
      );

    horse.surgeStrength=
      randomFloat(
        .028,
        .115
      )*
      profile.volatility*
      horse.breakoutAbility;
  }

  if(
    horse.surgeTimer<=0&&
    horse.fadeTimer<=0&&
    Math.random()<
      .020*
      profile.volatility*
      lateEventFactor*
      horse.collapseRisk
  ){

    horse.fadeTimer=
      randomBetween(
        2,
        6
      );

    horse.fadeStrength=
      randomFloat(
        .030,
        .120
      )*
      profile.volatility*
      horse.collapseRisk;
  }

  let surge=0;
  let fade=0;

  if(
    horse.surgeTimer>0
  ){

    surge=
      horse.surgeStrength*
      (
        .65+
        lateShare
      );

    horse.surgeTimer--;
  }

  if(
    horse.fadeTimer>0
  ){

    fade=
      horse.fadeStrength*
      (
        .75+
        earlyShare*.45
      );

    horse.fadeTimer--;
  }

  const nearestAhead=
    ranking
      .filter(
        rival=>
          rival.id!==
            horse.id&&
          !rival.finished&&
          rival.distanceTravelled>
            horse.distanceTravelled
      )
      .sort(
        (a,b)=>
          a.distanceTravelled-
          b.distanceTravelled
      )[0];

  let passingOpportunity=0;

  if(nearestAhead){

    const gap=
      nearestAhead.distanceTravelled-
      horse.distanceTravelled;

    if(gap<1.50){

      passingOpportunity=
        horse.breakoutAbility*
        (
          .018+
          .022*
          lateShare
        );
    }
  }

  const closingKick=
    horse.lateSpeed>=88

      ?lateShare*.108*
       (
         .70+
         Math.random()*.68
       )

      :0;

  const currentLeader=
    ranking.find(
      h=>
        !h.finished
    )||
    ranking[0];

  const leaderFade=
    horse.position===1

      ?Math.max(
          0,
          t-.33
        )*
        .095*
        (
          1+
          nearby*.13
        )

      :0;

  const momentumSwing=
    (
      horse.marketMomentum||
      0
    )*
    .018;

  const separation=
    state.separationFactor*
    (
      horse.position===1
        ?.015
        :horse.position>=5
          ?-.008
          :0
    );

  let movement=
    (
      ability/
      86
    )*
    (
      1+
      earlyComponent*.011+
      midComponent*.010+
      lateComponent*.012+
      shapeEffect+
      rhythmNoise+
      surge+
      passingOpportunity+
      closingKick+
      momentumSwing+
      separation-
      leaderFade-
      fade-
      fatigue
    )*
    horse.acceleration;

  movement*=
    clamp(
      .84+
      horse.energy/
      100*.23,
      .68,
      1.09
    );

  movement*=
    horse.consistency;

  /*
    Flash Kick temporarily matches the speed of
    the leader at activation. The rest of the
    simulation still applies before/after it.
  */
  if(
    horse.specialAbilityActive
  ){
    movement=
      horse.specialAbilitySpeed;
  }

  movement=
    clamp(
      movement,
      .55,
      1.55
    );

  horse.currentSpeed=
    movement;

  horse.distanceTravelled+=
    movement;

  if(
    horse.specialAbilityActive
  ){
    horse.specialAbilitySeconds--;

    if(
      horse.specialAbilitySeconds<=0
    ){
      horse.specialAbilityActive=false;
      horse.specialAbilitySeconds=0;
      horse.specialAbilitySpeed=null;
    }
  }

  horse.distanceRemaining=
    Math.max(
      0,
      state.raceDistance-
      horse.distanceTravelled
    );

  horse.recentMove=
    movement;

  horse.paceScore=
    state.raceT>0
      ?horse.distanceTravelled/
       state.raceT*
       100
      :0;
}


/* =========================================================
   MARKET MODEL
========================================================= */

function lengthsBehind(
  leader,
  horse
){

  if(
    !leader||
    !horse
  ){

    return 0;
  }

  return Math.max(
    0,
    (
      leader.distanceTravelled-
      horse.distanceTravelled
    )*.32
  );
}

function updateMarketState(){

  const active=
    state.horses.filter(
      horse=>
        !horse.finished
    );

  if(!active.length){
    return;
  }

  const ranking=
    [
      ...active
    ].sort(
      (a,b)=>
        b.distanceTravelled-
        a.distanceTravelled
    );

  const leader=
    ranking[0];

  const remaining=
    secondsRemaining();

  active.forEach(
    horse=>{

      const gap=
        lengthsBehind(
          leader,
          horse
        );

      const timeFactor=
        clamp(
          remaining/15,
          0,
          1
        );

      const closingStrength=
        clamp(
          (
            horse.lateSpeed-
            horse.earlySpeed+
            20
          )/
          40,
          0,
          1
        );

      horse.upsetPotential=
        clamp(
          closingStrength*
          (
            horse.energy/
            100
          )*
          (
            .25+
            .75*
            timeFactor
          )*
          (
            1/
            (
              1+
              gap*.22
            )
          ),
          0,
          1
        );

      const second=
        ranking[1];

      horse.duelPressure=0;

      if(
        second&&
        leader
      ){

        const duelGap=
          lengthsBehind(
            leader,
            second
          );

        if(
          duelGap<=1.30&&
          (
            horse.id===
              leader.id||
            horse.id===
              second.id
          )
        ){

          horse.duelPressure=
            clamp(
              (
                15-
                remaining
              )/
              15,
              .15,
              1
            );
        }
      }

      const recent=
        horse.recentMove||
        0;

      const energyChange=
        horse.energy-
        horse.recentEnergy;

      horse.marketMomentum=
        (
          horse.marketMomentum||
          0
        )*
        .62+
        (
          recent-
          1+
          energyChange*.015
        )*
        .38;

      horse.marketShock=
        (
          horse.marketShock||
          0
        )*
        .82+
        randomFloat(
          -.006,
          .006
        );
    }
  );
}

function liveProbability(horse){

  if(
    horse.finished
  ){

    return horse.id===
      state.winner
      ?1
      :0;
  }

  if(
    state.phase===
    "countdown"
  ){

    return horse.modelProbability;
  }

  const remaining=
    secondsRemaining();

  const t=
    raceProgress();

  const active=
    state.horses.filter(
      h=>
        !h.finished
    );

  const ranking=
    [
      ...active
    ].sort(
      (a,b)=>
        b.distanceTravelled-
        a.distanceTravelled
    );

  const leader=
    ranking[0];

  const rankIndex=
    Math.max(
      0,
      ranking.findIndex(
        h=>
          h.id===
          horse.id
      )
    );

  const rankScore=
    1-
    rankIndex/
    Math.max(
      1,
      ranking.length-1
    );

  const gap=
    leader
      ?lengthsBehind(
          leader,
          horse
        )
      :0;

  const energy=
    clamp(
      horse.energy/
      100,
      .04,
      1
    );

  const momentum=
    logistic(
      (
        horse.marketMomentum||
        0
      )*
      3.2
    );

  const closing=
    clamp(
      (
        horse.lateSpeed-
        68
      )/
      38,
      0,
      1
    );

  const priorWeight=
    clamp(
      1-
      t*.84,
      .08,
      1
    );

  const timeWeight=
    clamp(
      t*.96,
      .05,
      .92
    );

  const requiredGap=
    Math.max(
      0,
      gap-
      remaining*.28
    );

  const catchupPenalty=
    clamp(
      requiredGap/
      4.5,
      0,
      1
    );

  const comeback=
    horse.upsetPotential*
    (
      .14+
      .58*
      clamp(
        remaining/15,
        0,
        1
      )
    )*
    (
      .70+
      closing*.60
    );

  let probability=
    horse.modelProbability*
      priorWeight+

    rankScore*
      .30*
      timeWeight+

    energy*
      .07*
      timeWeight+

    momentum*
      .11*
      t+

    comeback;

  probability-=
    catchupPenalty*
    (
      .18+
      .50*
      clamp(
        (
          15-
          remaining
        )/
        15,
        0,
        1
      )
    );

  if(
    leader&&
    ranking[1]&&
    remaining<=15
  ){

    const second=
      ranking[1];

    const duelGap=
      lengthsBehind(
        leader,
        second
      );

    if(
      duelGap<=1.30&&
      (
        horse.id===
          leader.id||
        horse.id===
          second.id
      )
    ){

      const duelStrength=
        (
          1-
          duelGap/
          1.30
        )*
        clamp(
          (
            16-
            remaining
          )/
          16,
          .20,
          1
        );

      probability+=
        .11*
        duelStrength;

      if(
        horse.id===
          second.id&&
        (
          horse.marketMomentum||
          0
        )>
        (
          leader.marketMomentum||
          0
        )
      ){

        probability+=
          .11*
          clamp(
            (
              15-
              remaining
            )/
            15,
            0,
            1
          );
      }
    }
  }

  if(
    horse.id===
      leader?.id&&
    remaining<=15
  ){

    const second=
      ranking[1];

    const leadGap=
      second
        ?lengthsBehind(
            leader,
            second
          )
        :0;

    if(
      leadGap>=2
    ){

      probability+=
        .13*
        clamp(
          leadGap/
          5,
          0,
          1
        )*
        clamp(
          (
            16-
            remaining
          )/
          16,
          .20,
          1
        );
    }

    if(
      leadGap>=4
    ){

      probability+=
        .15;
    }
  }

  probability+=
    (
      horse.marketShock||
      0
    )+
    Math.sin(
      horse.id*4.31+
      state.raceT*.77
    )*
    .010*
    state.profile.volatility;

  return clamp(
    probability,
    .0025,
    .995
  );
}

function marketIsClosed(){

  return(
    state.marketSuspended===
    true
  );
}

function winnerName(){

  const winner=
    state.horses.find(
      horse=>
        horse.id===
        state.winner
    );

  return winner
    ?`#${winner.post} ${winner.name}`
    :"Official winner";
}

function settleWinnerMarket(){

  state.marketSuspended=
    true;
}

function currentPrice(horse){

  /*
    Winner market mark.

    V4.23 fixes a key calibration issue:
    late-race physical certainty is applied LAST,
    after all generic momentum/probability smoothing,
    so a clearly runaway leader cannot fall back
    toward 50¢.
  */

  if(state.marketSuspended){
    return horse.id===state.winner
      ?1
      :0;
  }

  if(state.phase==="countdown"){
    return clamp(
      horse.modelProbability,
      .01,
      .99
    );
  }

  if(horse.finished){
    return horse.id===state.winner
      ?1
      :0;
  }

  const remaining=
    Math.max(
      0,
      state.raceDuration-
      state.raceT
    );

  const probability=
    liveProbability(
      horse
    );

  const ranking=
    fieldRanks();

  const leader=
    ranking.find(
      h=>!h.finished
    )||
    ranking[0];

  const second=
    ranking.find(
      h=>
        !h.finished&&
        h.id!==
        leader?.id
    );

  const gap=
    leader
      ?Math.max(
          0,
          (
            leader.distanceTravelled-
            horse.distanceTravelled
          )*.32
        )
      :0;

  const sensitivity=
    remaining<=2
      ?2.20
      :remaining<=5
        ?1.90
        :remaining<=10
          ?1.60
          :remaining<=20
            ?1.28
            :remaining<=35
              ?1.05
              :.90;

  let price=
    probability+

    (
      horse.marketMomentum||
      0
    )*
    .070*
    sensitivity+

    (
      horse.marketShock||
      0
    )*
    sensitivity+

    (
      horse.duelPressure||
      0
    )*
    .045*
    sensitivity;

  /*
    Generic smoothing happens first.
  */
  if(remaining<=5){
    price=
      price*.60+
      probability*.40;
  }

  if(remaining<=2){
    price=
      price*.48+
      probability*.52;
  }

  /*
    --------------------------------------------------------
    FINAL PHYSICAL CERTAINTY FLOOR
    --------------------------------------------------------

    The market should not be allowed to contradict
    an obvious race state.

    Lead gap is measured against the nearest active
    challenger. This is separate from the horse's
    own gap variable.
  */
  let leadGap=0;

  if(
    horse.id===leader?.id
  ){

    leadGap=
      second
        ?Math.max(
            0,
            (
              leader.distanceTravelled-
              second.distanceTravelled
            )*.32
          )
        :12;

    /*
      A large lead late in the race.

      <=10s:
        4L  -> >= .90
        6L  -> >= .95
        8L  -> >= .975
        10L -> >= .985

      <=5s:
        4L  -> >= .96
        6L  -> >= .98
        8L  -> >= .99
        10L -> >= .995
    */
    if(remaining<=10){

      let certaintyFloor=.0;

      if(leadGap>=4){
        certaintyFloor=
          remaining<=5
            ?.96
            :.90;
      }

      if(leadGap>=6){
        certaintyFloor=
          remaining<=5
            ?.98
            :.95;
      }

      if(leadGap>=8){
        certaintyFloor=
          remaining<=5
            ?.99
            :.975;
      }

      if(leadGap>=10){
        certaintyFloor=
          remaining<=5
            ?.995
            :.985;
      }

      /*
        Final 2 seconds:
        a 6L+ leader is essentially resolved.
      */
      if(
        remaining<=2&&
        leadGap>=6
      ){
        certaintyFloor=
          .995;
      }

      if(
        remaining<=2&&
        leadGap>=8
      ){
        certaintyFloor=
          .998;
      }

      price=
        Math.max(
          price,
          certaintyFloor
        );
    }
  }

  /*
    --------------------------------------------------------
    TRAILING HORSE FLOOR
    --------------------------------------------------------

    Once the field gap exceeds what can physically
    be made up in the available time, force the quote
    down rather than letting generic model probability
    keep it artificially high.
  */
  if(
    horse.id!==leader?.id&&
    remaining<=10
  ){

    const catchable=
      remaining*
      (
        .25+
        clamp(
          (
            horse.lateSpeed-
            80
          )/100,
          0,
          .18
        )
      );

    const gapRatio=
      gap/
      Math.max(
        .5,
        catchable
      );

    let ceiling=null;

    if(gapRatio>=2){
      ceiling=
        remaining<=5
          ?.10
          :.16;
    }

    if(gapRatio>=3){
      ceiling=
        remaining<=5
          ?.025
          :.07;
    }

    if(gapRatio>=4){
      ceiling=
        remaining<=5
          ?.01
          :.035;
    }

    if(
      gap>=10&&
      remaining<=5
    ){
      ceiling=.008;
    }

    if(
      ceiling!==null
    ){
      price=
        Math.min(
          price,
          ceiling
        );
    }
  }

  /*
    --------------------------------------------------------
    HEAD-TO-HEAD EXCEPTION
    --------------------------------------------------------

    A tight duel keeps both contracts alive.
    We never apply the runaway floor unless the
    leader is actually separated from the challenger.
  */
  if(
    horse.id===leader?.id&&
    second&&
    remaining<=15
  ){

    const duelGap=
      lengthsBehind(
        leader,
        second
      );

    if(
      duelGap<=1.30
    ){

      /*
        Remove the runaway certainty floor for a
        genuine close duel.
      */
      const duelCap=
        remaining<=3
          ?.88
          :remaining<=7
            ?.82
            :.76;

      price=
        Math.min(
          price,
          duelCap
        );
    }
  }

  return clamp(
    price,
    .001,
    .998
  );
}

function bookFor(horse){

  if(
    marketIsClosed()
  ){

    const settled=
      horse.id===
        state.winner
        ?1
        :0;

    return{

      asks:[
        settled,
        settled,
        settled
      ],

      bids:[
        settled,
        settled,
        settled
      ]
    };
  }

  const price=
    Math.round(
      currentPrice(
        horse
      )*
      100
    )/
    100;

  const spread=
    state.phase===
      "live"
      ?.02
      :.03;

  return{

    asks:[
      clamp(
        price+
        spread/2,
        .01,
        .99
      ),

      clamp(
        price+
        spread*.9,
        .01,
        .99
      ),

      clamp(
        price+
        spread*1.35,
        .01,
        .99
      )
    ].sort(
      (a,b)=>
        a-b
    ),

    bids:[
      clamp(
        price-
        spread/2,
        .01,
        .99
      ),

      clamp(
        price-
        spread*.9,
        .01,
        .99
      ),

      clamp(
        price-
        spread*1.35,
        .01,
        .99
      )
    ].sort(
      (a,b)=>
        b-a
    )
  };
}


/* =========================================================
   HORSE VISUAL — RICHER RUNNER
========================================================= */

function horseVisualSVG(horse){

  const silk=
    SILK_PALETTE[
      (horse.id-1)%
      SILK_PALETTE.length
    ];

  return `

    <div
      class="horse-art"

      style="
        --silk:${silk.silk};
        --post-color:${horse.postColor||silk.silk};
        --horse-body:${silk.body};
        --horse-main:${horse.coat?.main||silk.body};
        --horse-light:${horse.coat?.light||silk.body};
        --horse-dark:${horse.coat?.dark||"#241915"};
        --horse-muzzle:${horse.coat?.muzzle||"#30211a"};
      "

      aria-label="${horse.name}"
    >

      <div
        class="horse-dust"
        aria-hidden="true"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div
        class="horse-tail"
        aria-hidden="true"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        class="
          horse-leg
          rear-leg
          rear-one
        "
      >
        <span
          class="hoof"
        ></span>
      </div>

      <div
        class="
          horse-leg
          rear-leg
          rear-two
        "
      >
        <span
          class="hoof"
        ></span>
      </div>

      <div
        class="horse-body"
      >

        <div
          class="body-sheen"
        ></div>

        <div
          class="shoulder-detail"
        ></div>

        <div
          class="horse-girth"
        ></div>

        <div
          class="horse-saddlecloth"
          data-post="${horse.post}"
          style="
            --post-color:${
              horse.postColor||
              silk.silk
            };
          "
        >
          <span
            class="saddle-number"
          >
            ${horse.post}
          </span>
        </div>

        <div
          class="horse-saddle"
        ></div>

      </div>

      <div
        class="horse-neck"
      >

        <div
          class="mane"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      <div
        class="horse-head"
      >

        <div
          class="
            horse-ear
            ear-one
          "
        ></div>

        <div
          class="
            horse-ear
            ear-two
          "
        ></div>

        <div
          class="horse-eye"
        ></div>

        <div
          class="horse-blaze"
        ></div>

        <div
          class="horse-muzzle"
        ></div>

        <div
          class="horse-nostril"
        ></div>

        <div
          class="horse-bridle"
        ></div>

        <div
          class="horse-reins"
        ></div>

      </div>

      <div
        class="
          horse-leg
          front-leg
          front-one
        "
      >
        <span
          class="hoof"
        ></span>
      </div>

      <div
        class="
          horse-leg
          front-leg
          front-two
        "
      >
        <span
          class="hoof"
        ></span>
      </div>

      <div
        class="jockey-body"
      >

        <div
          class="jockey-arm"
        ></div>

        <div
          class="jockey-glove"
        ></div>

      </div>

      <div
        class="jockey-head"
      ></div>

      <div
        class="jockey-helmet"
      ></div>

      <div
        class="horse-aura"
      ></div>

    </div>
  `;
}


/* =========================================================
   VISUAL POSITION
========================================================= */

function visualTrackPercent(horse){

  /*
    Horizontal movement is still entirely controlled
    by actual race progress.

    The horse artwork has no X movement of its own.
  */

  if(
    state.phase===
    "countdown"
  ){

    return 7;
  }

  const progress=
    clamp(
      horse.distanceTravelled/
      Math.max(
        1,
        state.raceDistance
      ),
      0,
      1
    );

  return 7+
    progress*
    84;
}

function visualLaneTop(horse){

  const count=
    Math.max(
      1,
      state.horses.length
    );

  const postIndex=
    Math.max(
      0,
      (
        horse.post||
        1
      )-
      1
    );

  if(
    count===
    1
  ){

    return 50;
  }

  /*
    Runner #1 keeps the original top lane.
    Only the outside/bottom lane moves inward.
  */
  const topLane=12;
  const bottomLane=82;

  return topLane+
    (
      postIndex/
      Math.max(
        1,
        count-
        1
      )
    )*
    (
      bottomLane-
      topLane
    );
}

/* =========================================================
   VISUAL TRACK
========================================================= */


function setupRaceEnvironment(){

  const track=
    document.getElementById(
      "visualTrack"
    );

  if(!track){
    return;
  }

  track.dataset.surface=
    state.profile?.surface||
    "Dirt";

  track.dataset.condition=
    state.trackCondition?.name||
    "Good";

  const weatherClass=
    state.weatherClass||
    "weather-sunny";

  track.dataset.weather=
    weatherClass;

  track.dataset.weatherName=
    state.weather?.name||
    "Sunny";

  [
    "weather-sunny",
    "weather-overcast",
    "weather-golden",
    "weather-haze",
    "weather-rain"
  ].forEach(
    className=>
      track.classList.remove(
        className
      )
  );

  track.classList.add(
    weatherClass
  );

  track.style.setProperty(
    "--weather-progress",
    String(
      state.weatherIntensity||
      0
    )
  );

  track.style.setProperty(
    "--condition-wetness",
    String(
      state.trackCondition?.wetness||
      0
    )
  );

  track.style.setProperty(
    "--condition-spray",
    String(
      state.trackCondition?.spray||
      0
    )
  );

  const venueVisual=
    VENUE_VISUALS[
      state.profile?.track
    ]||
    {
      className:"venue-default"
    };

  track.dataset.venueClass=
    venueVisual.className;

  [
    "venue-churchill",
    "venue-gulfstream",
    "venue-keeneland",
    "venue-saratoga",
    "venue-santa-anita",
    "venue-belmont-big-a",
    "venue-default"
  ].forEach(
    className=>
      track.classList.remove(
        className
      )
  );

  track.classList.add(
    venueVisual.className
  );

  if(state.environment){
    state.environment.cameraIntensity=
      clamp(
        raceProgress()*.72+
        (
          (
            1-
            secondsRemaining()/
            Math.max(
              1,
              state.raceDuration
            )
          )*.28
        ),
        0,
        1
      );
  }

  let scenery=
    track.querySelector(
      ".track-scenery"
    );

  if(!scenery){
    scenery=
      document.createElement(
        "div"
      );

    scenery.className=
      "track-scenery";

    scenery.innerHTML=`
      <div class="venue-backdrop"></div>

      <div class="grandstand">
        <div class="grandstand-roof"></div>
        <div class="grandstand-tier"></div>
        <div class="grandstand-seats">
          <i></i><i></i><i></i><i></i><i></i>
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>

      <div class="venue-landmarks"></div>

      <div class="track-lighting">
        <span></span><span></span><span></span><span></span>
      </div>

      <div class="tree-line">
        <i></i><i></i><i></i><i></i><i></i>
      </div>
    `;

    track.prepend(
      scenery
    );
  }

  let gate=
    track.querySelector(
      ".enhanced-start-gate"
    );

  if(!gate){
    gate=
      document.createElement(
        "div"
      );

    gate.className=
      "enhanced-start-gate";

    track.appendChild(
      gate
    );
  }

  gate.innerHTML=`
    <div class="gate-frame"></div>
    <div class="gate-stalls">
      ${Array.from(
        {
          length:
            Math.min(
              20,
              state.horses.length
            )
        },
        (_,i)=>
          `<span aria-hidden="true"></span>`
      ).join("")}
    </div>
    <div class="gate-bar"></div>
    <div class="gate-post left"></div>
    <div class="gate-post right"></div>
  `;

  [
    ["25%","1/4"],
    ["50%","1/2"],
    ["75%","3/4"],
    ["91%","FINAL"]
  ].forEach(
    ([position,label])=>{
      if(
        !track.querySelector(
          `.distance-marker[data-position="${position}"]`
        )
      ){
        const marker=
          document.createElement(
            "div"
          );

        marker.className=
          "distance-marker";

        marker.dataset.position=
          position;

        marker.style.left=
          position;

        marker.innerHTML=`
          <span
            class="distance-pole"
            aria-label="${label}"
          ></span>
        `;

        track.appendChild(
          marker
        );
      }
    }
  );

  let broadcast=
    track.querySelector(
      ".race-broadcast"
    );

  if(!broadcast){
    broadcast=
      document.createElement(
        "div"
      );

    broadcast.className=
      "race-broadcast";

    track.appendChild(
      broadcast
    );
  }

  broadcast.innerHTML=`
    <span class="broadcast-live-dot"></span>
    <strong>
      ${state.profile?.track||"RACECOURSE"}
    </strong>
    <span class="broadcast-separator">•</span>
    <span>
      ${state.profile?.distance||""}
    </span>
    <span class="broadcast-separator">•</span>
    <span>
      ${state.profile?.surface||""}
    </span>
    <span class="broadcast-separator">•</span>
    <span>
      ${state.trackCondition?.name||"Good"}
    </span>
    <span class="broadcast-separator">•</span>
    <span class="broadcast-weather">
      ${state.weather?.atmosphere||"Clear skies"}
    </span>
  `;

  if(
    !track.querySelector(
      ".weather-layer"
    )
  ){
    const weather=
      document.createElement(
        "div"
      );

    weather.className=
      "weather-layer";

    const rainColumns=[
      4,9,14,19,24,29,34,39,44,
      49,54,59,64,69,74,79,84,89,94
    ];

    weather.innerHTML=`
      <div class="weather-rain-back">
        ${rainColumns.map(
          (left,index)=>
            `<i style="
              left:${left}%;
              animation-delay:${(
                index*.11
              ).toFixed(2)}s;
            "></i>`
        ).join("")}
      </div>

      <div class="weather-rain-front">
        ${rainColumns.map(
          (left,index)=>
            `<i style="
              left:${(
                (left+index*1.7)%
                100
              )}%;
              animation-delay:${(
                index*.07+
                .18
              ).toFixed(2)}s;
            "></i>`
        ).join("")}
      </div>

      <div class="weather-mist"></div>
      <div class="weather-sheen"></div>
    `;

    track.appendChild(
      weather
    );
  }

  if(
    !track.querySelector(
      ".surface-texture"
    )
  ){
    const texture=
      document.createElement(
        "div"
      );

    texture.className=
      "surface-texture";

    track.appendChild(
      texture
    );
  }

  const oldVenueBadge=
    track.querySelector(
      ".venue-identity"
    );

  if(oldVenueBadge){
    oldVenueBadge.remove();
  }

  let venueLabel=
    track.querySelector(
      ".venue-scene-label"
    );

  if(!venueLabel){

    venueLabel=
      document.createElement(
        "div"
      );

    venueLabel.className=
      "venue-scene-label";

    track.appendChild(
      venueLabel
    );
  }

  const venueIdentity=
    VENUE_VISUALS[
      state.profile?.track
    ]||
    {
      short:"RACE",
      skyline:"Racecourse"
    };

  venueLabel.innerHTML=`
    <span>${venueIdentity.short||"RACE"}</span>
    <b>${state.profile?.track||"Racecourse"}</b>
  `;

}
function renderVisualTrack(){

  setupRaceEnvironment();

  const trackForField=
    document.getElementById(
      "visualTrack"
    );

  if(trackForField){
    trackForField.classList.toggle(
      "large-field",
      state.horses.length>=14
    );

    trackForField.classList.toggle(
      "mega-field",
      state.horses.length>=18
    );
  }



  const layer=document.getElementById("visualRunnerLayer");
  const status=document.getElementById("visualTrackStatus");
  const track=document.getElementById("visualTrack");

  if(!layer)return;

  if(status){
    status.textContent=
      state.phase==="countdown"
        ?"PREFLIGHT"
        :state.phase==="live"
          ?"LIVE"
          :state.phase==="finished"
            ?"FINISH"
            :"SETTLED";
  }

  if(track){
    if(state.profile){
      track.dataset.venue=state.profile.track;
      track.dataset.surface=state.profile.surface;
    }

    track.classList.remove(
      "camera-mid",
      "camera-tight",
      "camera-finish",
      "race-pre",
      "race-live",
      "race-finished",
      "race-settled"
    );

    if(state.phase==="countdown"){
      track.classList.add("race-pre");
    }else if(state.phase==="live"){
      track.classList.add("race-live");
      const remaining=secondsRemaining();

      if(remaining<=7){
        track.classList.add("camera-finish");
      }else if(remaining<=20){
        track.classList.add("camera-tight");
      }else if(raceProgress()>=.48){
        track.classList.add("camera-mid");
      }
    }else if(state.phase==="finished"){
      track.classList.add("race-finished","camera-finish");
    }else{
      track.classList.add("race-settled");
    }
  }

  const maxSpeed=Math.max(
    1,
    ...state.horses.map(h=>h.currentSpeed||0)
  );

  layer.innerHTML=
    state.horses.map(horse=>{

      const targetX=
        visualTrackPercent(
          horse
        );

      const targetY=
        visualLaneTop(
          horse
        );

      if(
        state.visualTargets[
          horse.id
        ]===
        undefined
      ){
        state.visualTargets[
          horse.id
        ]={
          x:targetX,
          y:targetY
        };
      }else{
        state.visualTargets[
          horse.id
        ].x=targetX;

        state.visualTargets[
          horse.id
        ].y=targetY;
      }

      if(
        state.visualPositions[
          horse.id
        ]===
        undefined
      ){
        state.visualPositions[
          horse.id
        ]={
          x:targetX,
          y:targetY
        };
      }

      const x=
        state.visualPositions[
          horse.id
        ].x;

      const y=
        state.visualPositions[
          horse.id
        ].y;

      const relativeSpeed=clamp(
        (horse.currentSpeed||0)/maxSpeed,
        .55,
        1
      );

      const selected=
        horse.id===state.selected
          ?"selected-runner":"";

      const leader=
        state.phase==="live" &&
        horse.position===1
          ?"leading":"";

      const gaining=
        state.phase==="live" &&
        horse.previousPosition &&
        horse.position<horse.previousPosition
          ?"passing":"";

      const finished=
        horse.finished
          ?"finished-runner":"";

      const specialActive=
        horse.specialAbilityActive
          ?"special-active":"";

      const specialBadge=
        horse.specialAbility
          ?`
            <div class="special-ability-badge ${
              horse.specialAbilityActive
                ?"active"
                :""
            }">
              ⚡ ${horse.specialAbility}
            </div>
          `
          :"";

      const runnerAnimation=
        state.phase==="countdown"
          ?"runner-pre"
          :state.phase==="live"
            ?"runner-gallop"
            :state.phase==="finished"
              ?"runner-finish"
              :"runner-settled";

      const speedClass=
        relativeSpeed>=.88
          ?"runner-fast"
          :relativeSpeed>=.72
            ?"runner-cruise"
            :"runner-slow";

      const dustClass=
        state.phase==="live" &&
        (horse.currentSpeed||0)>=.97
          ?"runner-dust":"";

      const positionChange=
        state.phase==="live" &&
        horse.previousPosition
          ?horse.position<horse.previousPosition
            ?"↑"
            :horse.position>horse.previousPosition
              ?"↓"
              :""
          :"";

      const check=
        horse.finished
          ?`<span class="finished-check">✓</span>`:"";

      return `
        <div
          class="
            runner-visual
            ${runnerAnimation}
            ${speedClass}
            ${dustClass}
            ${finished}
            ${selected}
            ${leader}
            ${gaining}
            ${specialActive}
          "
          data-runner-id="${horse.id}"
          style="
            left:calc(${x}% - 59px);
            top:${y}%;
          "
        >
          <div class="runner-motion-trail" aria-hidden="true"></div>
          ${horseVisualSVG(horse)}

          ${specialBadge}

          <div class="runner-label">
            <strong>
              #${horse.post}
              ${horse.name.split(" ")[0]}
              ${check}
            </strong>
            <span>
              ${
                state.phase==="countdown"
                  ?horse.morningLine
                  :horse.finished
                    ?`P${horse.finishPosition}`
                    :`P${horse.position}`
              }
              ${
                positionChange
                  ?`<span class="position-change">${positionChange}</span>`
                  :""
              }
            </span>
          </div>
        </div>`;
    }).join("");
}

/* =========================================================
   MARKET STATUS
========================================================= */

function renderMarketStatus(){

  const pill=
    document.getElementById(
      "marketPill"
    );

  const pillText=
    document.getElementById(
      "marketPillText"
    );

  const banner=
    document.getElementById(
      "marketClosedBanner"
    );

  const bannerText=
    document.getElementById(
      "marketClosedText"
    );

  const orderCard=
    document.querySelector(
      ".order-card"
    );

  const closed=
    marketIsClosed();

  if(pill){

    pill.classList.toggle(
      "market-closed",
      closed
    );
  }

  if(pillText){

    pillText.textContent=
      closed
        ?"MARKET CLOSED"
        :"PRICES LIVE";
  }

  if(banner){

    banner.classList.toggle(
      "hidden",
      !closed
    );
  }

  if(
    bannerText&&
    closed
  ){

    bannerText.textContent=
      `${winnerName()} has crossed the finish line. All Winner contracts are settled.`;
  }

  if(orderCard){

    orderCard.classList.toggle(
      "order-locked",
      closed
    );
  }
}


/* =========================================================
   TICKET
========================================================= */

function updateTicketSummary(){

  const price=
    Number(
      document.getElementById(
        "priceInput"
      )?.value
    )||
    0;

  const qty=
    Number(
      document.getElementById(
        "qtyInput"
      )?.value
    )||
    0;

  const label=
    document.getElementById(
      "priceLabel"
    );

  const notional=
    document.getElementById(
      "notional"
    );

  const payout=
    document.getElementById(
      "payout"
    );

  const button=
    document.getElementById(
      "placeBtn"
    );

  if(label){

    label.textContent=
      `(${money(price)})`;
  }

  if(notional){

    notional.textContent=
      money(
        price*
        qty
      );
  }

  if(payout){

    payout.textContent=
      money(qty);
  }

  if(button){

    button.textContent=
      `PLACE ${
        state.side.toUpperCase()
      } YES ORDER`;
  }
}


/* =========================================================
   HORSE TABLE
========================================================= */

function renderRaceCard(){

  const body=
    document.getElementById(
      "raceCardBody"
    );

  if(!body){
    return;
  }

  body.innerHTML=
    state.horses.map(
      horse=>`

      <tr
        class="
          runner-row
          ${
            horse.id===
            state.selected
              ?"selected"
              :""
          }
        "
        data-id="${horse.id}"
      >

        <td>

          <span
            class="post-pill"
          >
            ${horse.post}
          </span>

        </td>

        <td
          class="horse-cell"
        >

          ${horse.name}

          <small>

            ${horse.runningStyle}

          </small>

        </td>

        <td
          class="ml"
        >
          ${horse.morningLine}
        </td>

        <td
          class="rating"
        >
          ${Math.round(
            horse.raceRating
          )}
        </td>

        <td
          class="style-chip"
        >

          ${
            horse.specialAbility
              ?`⚡ ${horse.specialAbility}`
              :horse.position===1&&
               state.phase==="live"
                ?"LEADING"
                :horse.lateSpeed>
                  horse.earlySpeed+5
                  ?"Closer"
                  :horse.earlySpeed>
                    horse.lateSpeed+5
                    ?"Speed"
                    :"Balanced"
          }

        </td>

      </tr>

    `
    ).join("");

  body
    .querySelectorAll(
      ".runner-row"
    )
    .forEach(
      row=>{

        row.onclick=
          ()=>{
            state.selected=
              Number(
                row.dataset.id
              );

            render();
          };
      }
    );
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(){

  const horse=
    state.horses.find(
      h=>
        h.id===
        state.selected
    );

  const title=
    document.getElementById(
      "profileTitle"
    );

  const badge=
    document.getElementById(
      "profileBadge"
    );

  const profile=
    document.getElementById(
      "horseProfile"
    );

  if(
    !title||
    !badge||
    !profile
  ){

    return;
  }

  if(!horse){

    title.textContent=
      "Select a runner";

    badge.textContent=
      "RUNNER PROFILE";

    profile.className=
      "horse-profile empty";

    profile.textContent=
      "No runner selected.";

    return;
  }

  title.textContent=
    `#${horse.post} ${horse.name}`;

  badge.textContent=
    state.phase===
      "live"

      ?`LIVE • ${
          horse.position===
            1
            ?"LEADING"
            :`#${horse.position}`
        }`

      :"SIMULATION PROFILE";

  profile.className=
    "horse-profile";

  profile.innerHTML=`

    <div
      class="profile-grid"
    >

      <div
        class="profile-main"
      >

        <div
          class="profile-name"
        >
          #${horse.post}
          ${horse.name}
        </div>

        <div
          class="profile-tag"
        >
          ${horse.age}yo •
          ${horse.sex} •
          Simulation profile
        </div>

        <div
          class="profile-stats"
        >

          <div
            class="stat"
          >
            <span>
              BASE RATING
            </span>

            <strong>
              ${horse.baseRating}
            </strong>
          </div>

          <div
            class="stat"
          >
            <span>
              RACE RATING
            </span>

            <strong>
              ${Math.round(
                horse.raceRating
              )}
            </strong>
          </div>

          <div
            class="stat"
          >
            <span>
              LIVE PROBABILITY
            </span>

            <strong>
              ${Math.round(
                liveProbability(
                  horse
                )*
                100
              )}%
            </strong>
          </div>

          <div
            class="stat"
          >
            <span>
              POSITION
            </span>

            <strong>
              ${
                state.phase===
                  "countdown"
                  ?"—"
                  :`#${horse.position}`
              }
            </strong>
          </div>

          <div
            class="stat"
          >
            <span>
              EARLY SPEED
            </span>

            <strong>
              ${horse.earlySpeed}
            </strong>
          </div>

          <div
            class="stat"
          >
            <span>
              LATE SPEED
            </span>

            <strong>
              ${horse.lateSpeed}
            </strong>
          </div>

        </div>

      </div>

      <div
        class="profile-side"
      >

        <h3>
          Runner Notes
        </h3>

        <div
          class="profile-list"
        >

          <div>
            <span>
              Current form
            </span>

            <strong>
              ${horse.form.join(" • ")}
            </strong>
          </div>

          <div>
            <span>
              Dirt rating
            </span>

            <strong>
              ${horse.dirt}
            </strong>
          </div>

          <div>
            <span>
              Sprint rating
            </span>

            <strong>
              ${horse.sprint}
            </strong>
          </div>

          <div>
            <span>
              Route rating
            </span>

            <strong>
              ${horse.route}
            </strong>
          </div>

          <div>
            <span>
              Class rating
            </span>

            <strong>
              ${horse.classRating}
            </strong>
          </div>

          <div>
            <span>
              Energy
            </span>

            <strong>
              ${Math.round(
                horse.energy
              )}%
            </strong>
          </div>

          <div>
            <span>
              Running style
            </span>

            <strong>
              ${horse.runningStyle}
            </strong>
          </div>

          <div>
            <span>
              Special ability
            </span>

            <strong>
              ${
                horse.specialAbility
                  ?`⚡ ${horse.specialAbility}${
                      horse.specialAbilityActive
                        ?" • ACTIVE"
                        :horse.specialAbilityUsed
                          ?" • USED"
                          :" • READY"
                    }`
                  :"—"
              }
            </strong>
          </div>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   MARKET CARDS
========================================================= */

function renderHorses(){

  const element=
    document.getElementById(
      "horseList"
    );

  if(!element){
    return;
  }

  element.innerHTML=
    state.horses.map(
      horse=>{

        const price=
          currentPrice(
            horse
          );

        const last=
          state.lastPrices[
            horse.id
          ]??
          price;

        const diff=
          price-
          last;

        const moveClass=
          diff>.002
            ?"up"
            :diff<-.002
              ?"down"
              :"neutral";

        return`

          <div

            class="
              horse-card
              ${
                horse.id===
                state.selected
                  ?"selected"
                  :""
              }
            "

            data-id="${horse.id}"
          >

            <div
              class="horse-row"
            >

              <div
                class="horse-id"
              >
                #${horse.post}
              </div>

              <div
                class="horse-name"
              >
                ${horse.name}
              </div>

              <div>

                <div
                  class="price"
                >
                  ${cents(price)}
                </div>

                <div
                  class="
                    move
                    ${moveClass}
                  "
                >

                  ${
                    diff>0
                      ?"+"
                      :""
                  }

                  ${Math.round(
                    diff*
                    100
                  )}¢

                </div>

              </div>

            </div>

            <div
              class="bar"
            >
              <span
                style="
                  width:${Math.round(
                    price*
                    100
                  )}%
                "
              ></span>
            </div>

            <div
              class="subline"
            >

              <span>

                ${
                  state.phase===
                    "countdown"

                    ?`ML ${horse.morningLine}`

                    :`LIVE #${horse.position}`
                }

              </span>

              <span>

                ${
                  state.phase===
                    "countdown"

                    ?`${Math.round(
                        horse.modelProbability*
                        100
                      )}%`

                    :`${Math.round(
                        liveProbability(
                          horse
                        )*
                        100
                      )}%`
                }

              </span>

            </div>

          </div>

        `;
      }
    ).join("");

  element
    .querySelectorAll(
      ".horse-card"
    )
    .forEach(
      card=>{

        card.onclick=
          ()=>{

            state.selected=
              Number(
                card.dataset.id
              );

            render();
          };
      }
    );
}


/* =========================================================
   SELECTED MARKET
========================================================= */

function renderSelected(){

  const horse=
    state.horses.find(
      h=>
        h.id===
        state.selected
    );

  if(!horse){
    return;
  }

  const price=
    currentPrice(
      horse
    );

  const book=
    bookFor(
      horse
    );

  [
    "selectedHorseTitle",
    "bookTitle",
    "ticketTitle"
  ].forEach(
    id=>{

      const el=
        document.getElementById(
          id
        );

      if(el){

        el.textContent=
          `#${horse.post} ${horse.name}`;
      }
    }
  );

  const selectedPrice=
    document.getElementById(
      "selectedPrice"
    );

  if(selectedPrice){

    selectedPrice.textContent=
      money(price);
  }

  const asks=
    document.getElementById(
      "asks"
    );

  if(asks){

    asks.innerHTML=
      book.asks.map(
        (
          p,
          i
        )=>`

          <div
            class="book-line" style="--depth:${Math.min(96,30+i*24)}%"
          >

            <strong
              class="ask"
            >
              ${cents(p)}
            </strong>

            <span>
              ${[18,42,65][i]}
            </span>

          </div>

        `
      ).join("");
  }

  const bids=
    document.getElementById(
      "bids"
    );

  if(bids){

    bids.innerHTML=
      book.bids.map(
        (
          p,
          i
        )=>`

          <div
            class="book-line" style="--depth:${Math.min(96,30+i*24)}%"
          >

            <strong
              class="bid"
            >
              ${cents(p)}
            </strong>

            <span>
              ${[25,52,88][i]}
            </span>

          </div>

        `
      ).join("");
  }

  const input=
    document.getElementById(
      "priceInput"
    );

  if(
    input&&
    !input.matches(
      ":focus"
    )
  ){

    input.value=
      price.toFixed(2);
  }

  updateTicketSummary();
}


/* =========================================================
   POSITIONS
========================================================= */

function renderPositions(){

  const wrapper=
    document.getElementById(
      "positions"
    );

  if(!wrapper){
    return;
  }

  const ids=
    Object.keys(
      state.positions
    )
    .map(Number)
    .filter(
      id=>
        state.positions[id]?.qty
    );

  if(
    !ids.length
  ){

    wrapper.innerHTML=`

      <div
        class="empty"
      >
        No open positions yet.
        Trade the live field to build a portfolio.
      </div>

    `;

    return;
  }

  let total=0;

  wrapper.innerHTML=
    ids.map(
      id=>{

        const horse=
          state.horses.find(
            h=>
              h.id===
              id
          );

        if(!horse){
          return "";
        }

        const pos=
          state.positions[id];

        const value=
          pos.qty*
          currentPrice(
            horse
          );

        const pnl=
          value-
          pos.cost;

        total+=
          pnl;

        return`

          <div
            class="position-row"
          >

            <div
              class="position-meta"
            >

              #${horse.post}
              ${horse.name}

              <span>
                ${pos.qty}
                YES @
                ${cents(pos.avg)}
              </span>

            </div>

            <div
              class="pos-extra"
            >

              <small>
                Current
              </small>

              <strong>
                ${money(value)}
              </strong>

            </div>

            <div
              class="pos-extra"
            >

              <small>
                Cost
              </small>

              <strong>
                ${money(pos.cost)}
              </strong>

            </div>

            <div
              class="pos-val"
            >

              <small>
                P/L
              </small>

              <strong
                class="${
                  pnl>=0
                    ?"up"
                    :"down"
                }"
              >

                ${
                  pnl>=0
                    ?"+"
                    :""
                }

                ${money(pnl)}

              </strong>

            </div>

          </div>

        `;
      }
    ).join("");

  const pnl=
    document.getElementById(
      "portfolioPnl"
    );

  if(pnl){

    pnl.textContent=
      `${total>=0?"+":""}${money(total)}`;

    pnl.className=
      `portfolio-pnl ${
        total>=0
          ?"up"
          :"down"
      }`;
  }
}


/* =========================================================
   LIVE BOARD
========================================================= */

function renderLiveRaceState(){

  const summary=
    document.getElementById(
      "liveRaceSummary"
    );

  const board=
    document.getElementById(
      "liveRaceState"
    );

  if(
    !summary||
    !board
  ){

    return;
  }

  if(
    state.phase===
    "countdown"
  ){

    summary.textContent=
      "WAITING FOR START";

    board.className=
      "live-race-state empty";

    board.textContent=
      "The live race board will populate when the gates open.";

    return;
  }

  const ranking=
    [
      ...state.horses
    ].sort(
      (a,b)=>
        b.distanceTravelled-
        a.distanceTravelled
    );

  summary.textContent=
    state.phase===
      "live"

      ?"LIVE RACE"

      :state.phase===
        "finished"

        ?"FINISH"

        :"SETTLED";

  board.className=
    "live-race-state";

  board.innerHTML=
    ranking.map(
      (
        horse,
        index
      )=>{

        const gap=
          index===0

            ?"LEADER"

            :`${Math.max(
                0,
                ranking[0].distanceTravelled-
                horse.distanceTravelled
              ).toFixed(1)}L`;

        return`

          <div
            class="live-row"
          >

            <div
              class="live-rank"
            >
              ${index+1}
            </div>

            <div
              class="live-horse"
            >

              <strong>
                #${horse.post}
                ${horse.name}
              </strong>

              <span>

                ${
                  horse.finished
                    ?"Finished"
                    :horse.position===
                      1
                      ?"On the lead"
                      :horse.runningStyle
                }

              </span>

            </div>

            <div
              class="live-stat"
            >

              <small>
                POS
              </small>

              <strong>
                #${horse.position}
              </strong>

            </div>

            <div
              class="live-stat"
            >

              <small>
                ENERGY
              </small>

              <strong>
                ${Math.round(
                  horse.energy
                )}%
              </strong>

            </div>

            <div
              class="live-gap"
            >
              ${gap}
            </div>

          </div>
        `;
      }
    ).join("");
}


/* =========================================================
   RESULTS
========================================================= */

function renderResults(){

  const card=
    document.getElementById(
      "resultsCard"
    );

  const body=
    document.getElementById(
      "resultsBody"
    );

  const summary=
    document.getElementById(
      "resultsSummary"
    );

  const badge=
    document.getElementById(
      "resultWinnerBadge"
    );

  if(
    !card||
    !body||
    !summary||
    !badge
  ){

    return;
  }

  if(
    state.phase!=="finished"&&
    state.phase!=="settled"
  ){

    card.classList.add(
      "hidden"
    );

    return;
  }

  card.classList.remove(
    "hidden"
  );

  const ordered=
    [
      ...state.horses
    ].sort(
      (a,b)=>{

        if(
          a.finished&&
          b.finished
        ){

          return(
            a.finishPosition-
            b.finishPosition
          );
        }

        if(a.finished){
          return -1;
        }

        if(b.finished){
          return 1;
        }

        return(
          b.distanceTravelled-
          a.distanceTravelled
        );
      }
    );

  const winner=
    state.horses.find(
      horse=>
        horse.id===
        state.winner
    );

  const finishers=
    ordered.filter(
      horse=>
        horse.finished
    );

  const winnerTime=
    winner?.finishTime??
    0;

  badge.textContent=
    winner
      ?`WINNER #${winner.post}`
      :"FINISHED";

  summary.innerHTML=`

    <div
      class="result-stat"
    >

      <span>
        WINNER
      </span>

      <strong>

        ${
          winner
            ?`#${winner.post} ${winner.name}`
            :"—"
        }

      </strong>

    </div>

    <div
      class="result-stat"
    >

      <span>
        WINNING TIME
      </span>

      <strong>
        ${fmt(winnerTime)}
        elapsed
      </strong>

    </div>

    <div
      class="result-stat"
    >

      <span>
        RUNNERS
      </span>

      <strong>
        ${finishers.length}/
        ${state.horses.length}
      </strong>

    </div>

    <div
      class="result-stat"
    >

      <span>
        MARKET STATUS
      </span>

      <strong>
        SETTLED
      </strong>

    </div>

  `;

  body.innerHTML=
    ordered.map(
      (
        horse,
        index
      )=>{

        const position=
          horse.finished
            ?horse.finishPosition
            :index+1;

        const margin=
          position===1

            ?"—"

            :horse.finishTime!==null

              ?`+${Math.max(
                  0,
                  horse.finishTime-
                  winnerTime
                )}s`

              :"—";

        const isWinner=
          horse.id===
          state.winner;

        return`

          <tr
            class="${
              isWinner
                ?"winner-row"
                :""
            }"
          >

            <td
              class="result-pos"
            >
              ${position}
            </td>

            <td>

              <span
                class="post-pill"
              >
                ${horse.post}
              </span>

            </td>

            <td
              class="result-horse"
            >

              ${horse.name}

              <small>
                ML ${horse.morningLine}
              </small>

            </td>

            <td
              class="result-time"
            >

              ${
                horse.finishTime!==null
                  ?fmt(
                      horse.finishTime
                    )
                  :"—"
              }

            </td>

            <td
              class="result-margin"
            >
              ${margin}
            </td>

            <td>

              ${
                isWinner

                  ?'<span class="result-win">🏆 WINNER</span>'

                  :horse.finished

                    ?'<span class="result-finish">FINISHED</span>'

                    :'<span class="result-finish">PENDING</span>'
              }

            </td>

          </tr>

        `;
      }
    ).join("");
}


/* =========================================================
   CHART
========================================================= */

function drawChart(){

  const canvas=
    document.getElementById(
      "chart"
    );

  if(!canvas){
    return;
  }

  const ctx=
    canvas.getContext(
      "2d"
    );

  if(!ctx){
    return;
  }

  const w=
    canvas.width;

  const h=
    canvas.height;

  ctx.clearRect(
    0,
    0,
    w,
    h
  );

  ctx.strokeStyle=
    "#294034";

  ctx.lineWidth=1;

  for(
    let i=1;
    i<4;
    i++
  ){

    const y=
      h*i/4;

    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.lineTo(
      w,
      y
    );

    ctx.stroke();
  }

  const history=
    state.history[
      state.selected
    ]||
    [];

  if(
    history.length<
    2
  ){

    return;
  }

  ctx.beginPath();

  history.forEach(
    (
      point,
      index
    )=>{

      const x=
        (
          index/
          Math.max(
            1,
            history.length-
            1
          )
        )*
        w;

      const y=
        h-
        point.p*
        h*
        .88-
        h*
        .05;

      if(index===0){

        ctx.moveTo(
          x,
          y
        );

      }else{

        ctx.lineTo(
          x,
          y
        );
      }
    }
  );

  const gradient=
    ctx.createLinearGradient(
      0,
      0,
      w,
      0
    );

  gradient.addColorStop(
    0,
    "#5f8ff5"
  );

  gradient.addColorStop(
    1,
    "#7ee787"
  );

  ctx.strokeStyle=
    gradient;

  ctx.lineWidth=3;

  ctx.stroke();
}


/* =========================================================
   ORDERS
========================================================= */

function placeOrder(){

  if(
    state.phase===
    "countdown"
  ){

    flash(
      "Market is not open yet."
    );

    return;
  }

  if(
    state.phase!=="live"||
    state.marketSuspended
  ){

    flash(
      "Trading is suspended — a horse has crossed the finish line."
    );

    return;
  }

  const price=
    clamp(
      Number(
        document.getElementById(
          "priceInput"
        )?.value
      )||
      0,

      .01,
      .99
    );

  const qty=
    Math.max(
      1,
      Math.floor(
        Number(
          document.getElementById(
            "qtyInput"
          )?.value
        )||
        0
      )
    );

  const horse=
    state.horses.find(
      h=>
        h.id===
        state.selected
    );

  if(!horse){
    return;
  }

  if(
    state.side===
    "buy"
  ){

    const cost=
      price*
      qty;

    if(
      cost>
      state.cash
    ){

      flash(
        "Insufficient paper balance."
      );

      return;
    }

    state.cash-=
      cost;

    const position=
      state.positions[
        horse.id
      ]||
      {
        qty:0,
        cost:0,
        avg:0
      };

    position.qty+=
      qty;

    position.cost+=
      cost;

    position.avg=
      position.cost/
      position.qty;

    state.positions[
      horse.id
    ]=
      position;

    flash(
      `Bought ${qty} YES on #${horse.post} at ${cents(price)}.`
    );

  }else{

    const position=
      state.positions[
        horse.id
      ];

    if(
      !position||
      position.qty<
      qty
    ){

      flash(
        "You don't have enough YES contracts to sell."
      );

      return;
    }

    state.cash+=
      price*
      qty;

    position.qty-=
      qty;

    position.cost-=
      position.avg*
      qty;

    if(
      position.qty<=0
    ){

      delete state.positions[
        horse.id
      ];
    }

    flash(
      `Sold ${qty} YES on #${horse.post} at ${cents(price)}.`
    );
  }

  render();
}

function settlePositions(){

  for(
    const [
      id,
      pos
    ]
    of Object.entries(
      state.positions
    )
  ){

    if(
      Number(id)===
      state.winner
    ){

      state.cash+=
        pos.qty;
    }
  }
}

function flash(message){

  const el=
    document.getElementById(
      "tradeMsg"
    );

  if(!el){
    return;
  }

  el.textContent=
    message;

  if(el.animate){

    el.animate(
      [
        {
          opacity:.45
        },

        {
          opacity:1
        }
      ],

      {
        duration:180
      }
    );
  }
}


/* =========================================================
   RACE SECOND
========================================================= */

function simulateOneSecond(){

  const t=
    raceProgress();

  const active=
    state.horses.filter(
      horse=>
        !horse.finished
    );

  shuffle(
    active
  ).forEach(
    horse=>{

      updateHorseState(
        horse,
        t
      );
    }
  );

  updateMarketState();

  const crossers=
    active
      .filter(
        horse=>
          !horse.finished&&
          horse.distanceTravelled>=
            state.raceDistance
      )
      .map(
        horse=>{

          const overshoot=
            horse.distanceTravelled-
            state.raceDistance;

          const secondFraction=
            clamp(
              overshoot/
              Math.max(
                .01,
                horse.currentSpeed
              ),
              0,
              1
            );

          return{

            horse,

            finishFraction:
              1-
              secondFraction
          };
        }
      )
      .sort(
        (a,b)=>
          a.finishFraction-
          b.finishFraction
      );

  crossers.forEach(
    item=>{

      const horse=
        item.horse;

      horse.distanceTravelled=
        state.raceDistance;

      horse.distanceRemaining=
        0;

      horse.finished=
        true;

      horse.finishTime=
        Math.max(
          0,
          state.raceT-
          (
            1-
            item.finishFraction
          )
        );

      horse.finishPosition=
        state.finishOrder.length+
        1;

      state.finishOrder.push(
        horse.id
      );

      if(
        state.winner===
        null
      ){

        state.winner=
          horse.id;

        state.finishAt=
          Date.now();

        state.marketSuspended=
          true;

        state.phase=
          "finished";
      }
    }
  );

  if(
    state.phase===
      "finished"&&
    state.horses.some(
      horse=>
        !horse.finished
    )
  ){

    const remaining=
      state.horses.filter(
        horse=>
          !horse.finished
      );

    shuffle(
      remaining
    ).forEach(
      horse=>{

        updateHorseState(
          horse,
          t
        );
      }
    );

    const lateCrossers=
      remaining
        .filter(
          horse=>
            !horse.finished&&
            horse.distanceTravelled>=
              state.raceDistance
        )
        .map(
          horse=>{

            const overshoot=
              horse.distanceTravelled-
              state.raceDistance;

            return{

              horse,

              finishFraction:
                1-
                clamp(
                  overshoot/
                  Math.max(
                    .01,
                    horse.currentSpeed
                  ),
                  0,
                  1
                )
            };
          }
        )
        .sort(
          (a,b)=>
            a.finishFraction-
            b.finishFraction
        );

    lateCrossers.forEach(
      item=>{

        const horse=
          item.horse;

        horse.distanceTravelled=
          state.raceDistance;

        horse.distanceRemaining=
          0;

        horse.finished=
          true;

        horse.finishTime=
          Math.max(
            0,
            state.raceT-
            (
              1-
              item.finishFraction
            )
          );

        horse.finishPosition=
          state.finishOrder.length+
          1;

        state.finishOrder.push(
          horse.id
        );
      }
    );
  }

  const ranking=
    [
      ...state.horses
    ].sort(
      (a,b)=>{

        if(
          a.finished&&
          b.finished
        ){

          return(
            a.finishPosition-
            b.finishPosition
          );
        }

        if(a.finished){
          return -1;
        }

        if(b.finished){
          return 1;
        }

        return(
          b.distanceTravelled-
          a.distanceTravelled
        );
      }
    );

  ranking.forEach(
    (
      horse,
      index
    )=>{

      if(
        !horse.finished
      ){

        horse.previousPosition=
          horse.position;

        horse.position=
          index+1;
      }
    }
  );

  if(
    state.horses.length>0&&
    state.horses.every(
      horse=>
        horse.finished
    )
  ){

    state.phase=
      "settled";
  }
}


/* =========================================================
   TICK
========================================================= */

function tick(){

  if(
    state.phase===
    "countdown"
  ){

    state.openCountdown--;

    if(
      state.openCountdown<=0
    ){

      state.openCountdown=
        0;

      state.phase=
        "live";

      state.raceT=
        0;
    }

  }else if(
    state.phase===
      "live"||
    state.phase===
      "finished"
  ){

    state.raceT++;

    simulateOneSecond();

    state.horses.forEach(
      horse=>{

        const price=
          currentPrice(
            horse
          );

        if(
          state.history[
            horse.id
          ]
        ){

          state.history[
            horse.id
          ].push(
            {
              t:
                state.raceT,

              p:
                price
            }
          );
        }

        state.lastPrices[
          horse.id
        ]=
          price;
      }
    );

    if(
      state.phase===
        "settled"&&
      state.timer
    ){

      clearInterval(
        state.timer
      );

      state.timer=
        null;

      settlePositions();
    }
  }

  render();
}


/* =========================================================
   EVENTS
========================================================= */

function wireEvents(){

  const place=
    document.getElementById(
      "placeBtn"
    );

  const price=
    document.getElementById(
      "priceInput"
    );

  const qty=
    document.getElementById(
      "qtyInput"
    );

  const restart=
    document.getElementById(
      "restartBtn"
    );

  const buy=
    document.getElementById(
      "buyTab"
    );

  const sell=
    document.getElementById(
      "sellTab"
    );

  const flip=
    document.getElementById(
      "flipSide"
    );

  if(place){
    place.onclick=
      placeOrder;
  }

  if(price){
    price.oninput=
      updateTicketSummary;
  }

  if(qty){
    qty.oninput=
      updateTicketSummary;
  }

  if(restart){
    restart.onclick=
      restartRace;
  }

  if(buy){

    buy.onclick=
      ()=>{

        state.side=
          "buy";

        buy.classList.add(
          "active"
        );

        if(sell){

          sell.classList.remove(
            "active"
          );
        }

        updateTicketSummary();
      };
  }

  if(sell){

    sell.onclick=
      ()=>{

        state.side=
          "sell";

        sell.classList.add(
          "active"
        );

        if(buy){

          buy.classList.remove(
            "active"
          );
        }

        updateTicketSummary();
      };
  }

  if(flip){

    flip.onclick=
      ()=>{

        if(
          state.side===
          "buy"
        ){

          if(sell){
            sell.click();
          }

        }else{

          if(buy){
            buy.click();
          }
        }
      };
  }
}

function restartRace(){

  createRace();
}



function renderTickerAndTelemetry(){
  const ticker=document.getElementById("tickerTrack");
  if(ticker&&state.horses.length){
    const ranked=[...state.horses].sort((a,b)=>currentPrice(b)-currentPrice(a)).slice(0,8);
    const items=ranked.map(h=>{const p=currentPrice(h),last=state.lastPrices[h.id]??p,d=Math.round((p-last)*100),cls=d>0?"ticker-up":d<0?"ticker-down":"";return `<span><b>#${h.post} ${h.name}</b> ${cents(p)} <em class="${cls}">${d>0?"+":""}${d}¢</em></span>`}).join("");
    ticker.innerHTML=items+items;
  }
  const leader=fieldRanks()[0],set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  set("telemetryLeader",leader?`#${leader.post} ${leader.name}`:"—");
  set("telemetryPace",state.phase==="live"?state.pacePlan.replace(/([A-Z])/g," $1").toUpperCase():"PREFLIGHT");
  const fastest=Math.max(0,...state.horses.map(h=>h.currentSpeed||0));set("telemetrySpeed",state.phase==="live"?`${(fastest*37.4).toFixed(1)} MPH`:"—");
  set("telemetryTrack",`${state.profile?.surface||"—"} • ${state.trackCondition?.name||"—"}`);set("telemetryWeather",state.weather?.name||"—");
  const progress=Math.round(raceProgress()*100);set("telemetryProgress",`${progress}%`);const bar=document.getElementById("telemetryProgressBar");if(bar)bar.style.width=`${progress}%`;
}

/* =========================================================
   MAIN RENDER
========================================================= */


function smoothVisualLoop(timestamp=0){

  const track=
    document.getElementById(
      "visualTrack"
    );

  if(track){

    if(
      state.visualEnvironmentLastTs===
      null
    ){
      state.visualEnvironmentLastTs=
        timestamp;
    }

    const dt=
      Math.min(
        48,
        Math.max(
          0,
          timestamp-
          state.visualEnvironmentLastTs
        )
      );

    state.visualEnvironmentLastTs=
      timestamp;

    const liveIntensity=
      state.phase==="live"
        ?state.environment?.cameraIntensity||
          0
        :0;

    /*
      The camera illusion is independent from the
      runner simulation clock.

      Early race:
        almost no environmental drift.

      Mid race:
        moderate parallax.

      Late race:
        strong backward environmental motion.

      The horses themselves are never moved by this.
    */
    const targetVelocity=
      state.phase==="live"
        ?(
          7+
          Math.pow(
            liveIntensity,
            1.55
          )*
          105
        )
        :0;

    state.visualEnvironmentOffset+=
      (
        targetVelocity*
        (dt/1000)
      );

    if(
      state.visualEnvironmentOffset>
      100000
    ){
      state.visualEnvironmentOffset%=
        160;
    }

    track.style.setProperty(
      "--environment-offset",
      `${state.visualEnvironmentOffset}px`
    );

    track.style.setProperty(
      "--environment-intensity",
      liveIntensity.toFixed(3)
    );
  }

  const layer=
    document.getElementById(
      "visualRunnerLayer"
    );

  if(layer){
    Object.keys(
      state.visualTargets
    ).forEach(
      id=>{
        const target=
          state.visualTargets[id];

        const current=
          state.visualPositions[id];

        if(!target||!current){
          return;
        }

        /*
          Smoothly chase the one-second simulation
          target. The simulation stays deterministic;
          only the presentation becomes continuous.
        */
        const alpha=.16;

        current.x +=
          (
            target.x-
            current.x
          )*
          alpha;

        current.y +=
          (
            target.y-
            current.y
          )*
          alpha;

        const runner=
          layer.querySelector(
            `[data-runner-id="${id}"]`
          );

        if(runner){

          runner.style.left=
            `calc(${current.x}% - 59px)`;

          runner.style.top=
            `${current.y}%`;
        }
      }
    );
  }

  requestAnimationFrame(
    smoothVisualLoop
  );
}

function startSmoothVisualLoop(){
  if(
    state.visualLoopStarted
  ){
    return;
  }

  state.visualLoopStarted=true;

  requestAnimationFrame(
    smoothVisualLoop
  );
}

function render(){

  const cash=
    document.getElementById(
      "cash"
    );

  if(cash){

    cash.textContent=
      money(
        state.cash
      );
  }

  const status=
    document.getElementById(
      "raceStatus"
    );

  if(status){

    status.textContent=

      state.phase===
        "countdown"

        ?`OPENS IN ${fmt(
            state.openCountdown
          )}`

        :state.phase===
          "live"

          ?"🔴 LIVE"

          :state.phase===
            "finished"

            ?"PHOTO / OFFICIAL"

            :"SETTLED";
  }

  const clock=
    document.getElementById(
      "raceClock"
    );

  const timeLabel=
    document.getElementById(
      "raceTimeLabel"
    );

  const timeSubtext=
    document.getElementById(
      "raceTimeSubtext"
    );

  if(clock){

    if(
      state.phase===
      "countdown"
    ){

      clock.textContent=
        fmt(
          state.openCountdown
        );

      if(timeLabel){

        timeLabel.textContent=
          "MARKET OPENS IN";
      }

      if(timeSubtext){

        timeSubtext.textContent=
          "COUNTDOWN TO MARKET OPEN";
      }

    }else if(
      state.phase===
      "live"
    ){

      clock.textContent=
        fmt(
          Math.max(
            0,
            state.raceDuration-
            state.raceT
          )
        );

      if(timeLabel){

        timeLabel.textContent=
          "RACE TIME REMAINING";
      }

      if(timeSubtext){

        timeSubtext.textContent=
          "LIVE SIMULATED RACE";
      }

    }else if(
      state.phase===
      "finished"
    ){

      clock.textContent=
        "00:00";

      if(timeLabel){

        timeLabel.textContent=
          "RACE FINISHED";
      }

      if(timeSubtext){

        timeSubtext.textContent=
          "AWAITING OFFICIAL SETTLEMENT";
      }

    }else{

      clock.textContent=
        "00:00";

      if(timeLabel){

        timeLabel.textContent=
          "SETTLED";
      }

      if(timeSubtext){

        timeSubtext.textContent=
          "MARKET CLOSED";
      }
    }
  }

  renderMarketStatus();
  renderTickerAndTelemetry();

  renderRaceCard();

  renderProfile();

  renderVisualTrack();

  renderLiveRaceState();

  renderResults();

  renderHorses();

  renderSelected();

  renderPositions();

  drawChart();
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  ()=>{

    wireEvents();

    startSmoothVisualLoop();

    createRace();
  }
);
