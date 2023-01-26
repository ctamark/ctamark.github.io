

const appstate_logo = 0
const appstate_home = 1
const appstate_game = 2

let gAppstate =  appstate_logo

let gPlaystate = 0

const playstate_none = -1  
const playstate_ready = 0
const playstate_play   = 1
//---
const playstate_timeout = 2

//성적표, 
const playstate_stageClear = 3

//----------
const  gameDlg_stageClear= 0
const  gameDlg_timeOut=1 


const stageScene_stageBegin = 0



//-----asmr.html에서 이사옴-----------
let gIsAndroid = true 
let gIsConnectDevice = true
let gIsBackground = false 

//----------
let gIsPowersave = false
let gIsAlarm = true 

let gStageIdx = 0

let gPlayable_stageMaxIdx = 2 

let gGameRating = 5 
//실수가 있을 때 마다 감점 1