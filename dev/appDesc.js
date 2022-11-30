

const facestate_normal = 0
const facestate_good = 1
//0x00000001
const facestate_bad = 2
//0x00000010
const face_lip_bad        =  0x00000100
const face_eyebrow_bad = 0x00001000
const face_eye_good     = 0x00010000

//------
const  playkind_earCleaning = 0
const  playkind_acne = 1
const  playkind_shaving = 2 
const  playkind_waxing = 2 

//---------------------

const appstate_logo = 0 
const appstate_mainmenu = 1 
const appstate_waitPlaykind = 1 
const appstate_play = 2 


const dir_none = 0
const dir_left = 1
const dir_right = 2 


//---------------------

const playstate_waitStart = 0
const playstate_ready  = 0

const playstate_prepare = 1

const playstate_treatment = 2


//user가 서비스를 받은 후 잠시 쉬는 상태 
const playstate_treatment_end = 3
const playstate_wait_rest = 3
//------
const playstate_rest = 4
//------------
const playstate_finish = 5
const playstate_rating = 5 

//--------------------


let gCloseupCanvasSize = 320 


let gSelectedPlay = 0
let gAppstate =  appstate_logo

let gPlaystate = 0

