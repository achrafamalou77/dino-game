
import {setupGround, updateGround} from './ground.js';
import {updateDino, setupDino, getDinoRect, setDinoLose} from './dino.js'
import { setupCactus, updateCactus, getCactusRects } from './cactus.js';
const worldElement = document.querySelector("[data-world]")
const speed_scale_increase = .00001;
const worldW =100
const worldh=30


setWorldScale()
window.addEventListener("resize", setWorldScale)
document.addEventListener("keydown",handleStart, {once: true})
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-screen-start]")

setupGround();


let lasteTime;
let speedScale ;
let score;


function update(time) {
    if (lasteTime == null){
        lasteTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lasteTime
        console.log(delta);


        updateGround(delta,speedScale)
        updateDino(delta, speedScale)
        updateCactus(delta, speedScale)
        updateSpeedScale(delta)
        updateScoer(delta)
        if (checkLose()) return handleLose()
        
    lasteTime = time 
    window.requestAnimationFrame(update)
    
}


function updateScoer(delta) {
    score +=delta* .01
    scoreElem.textContent = Math.floor(score)
}

function checkLose(){
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2 ) {
    return rect1.left < rect2.right && rect1.top < rect2.bottom &&rect1.right > rect2.left && rect1.bottom > rect2.top
}

function updateSpeedScale(delta){
    speedScale += delta*speed_scale_increase
}


function handleStart(){
    lasteTime = null;
    speedScale = 1;
    score = 0 ;
    startScreenElem.classList.add("hide")
    setupGround()
    setupCactus()
    setupDino()
    window.requestAnimationFrame(update)
}

function setWorldScale(){
    console.log(worldh);
    
    let worldScale 
    if (window.innerWidth / window.innerHeight < worldW / worldh){
        worldScale = window.innerWidth / worldW
    }else {
        worldScale = window.innerHeight / worldh
    }

    worldElement.style.width = `${worldW * worldScale}px`
    worldElement.style.height = `${worldh * worldScale}px`
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once:true})
        startScreenElem.classList.remove("hide")
    }, 100)
}
