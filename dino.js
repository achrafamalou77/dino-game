import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";


const dinoElem = document.querySelector("[data-dino]")

// this fucking variables took all the time 
const jump_speed = 0.45 
const gravity = 0.0015
//
let currentFrameTime ;
let yVelocity;
const dino_frame_count = 2 
const frame_time = 100
let isJumping;
let dinoFrame;
export function setupDino ( ){
    isJumping = false;
    dinoFrame = 0
    yVelocity =0
    currentFrameTime = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function setDinoLose(){
    dinoElem.src = "imgs/dino-lose.png"
}

export function updateDino (delta , speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}


function handleRun(delta, speedScale) {
    if(isJumping) {
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }

    if(currentFrameTime >= frame_time) {
       dinoFrame =(dinoFrame +1) % dino_frame_count
       dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
       currentFrameTime -= frame_time;
    }
    currentFrameTime += delta*speedScale
}
function handleJump(delta) {
    if(!isJumping) return
    
    incrementCustomProperty(dinoElem, "--bottom",yVelocity*delta)

   if(getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
   }
   yVelocity -= gravity*delta
}

function onJump(e) {
    if(e.code !== "Space" || isJumping) return

    yVelocity = jump_speed
    isJumping =true
}