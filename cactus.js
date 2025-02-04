import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const speed = 0.05
const cactus_interval_min = 500;
const cactus_interval_max = 2000;
const worldElement = document.querySelector("[data-world]")

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = cactus_interval_min ;
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}


export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      incrementCustomProperty(cactus, "--left", delta * speedScale * speed * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    })
    if ( nextCactusTime <= 0 ) {
   createCactus()
   nextCactusTime = randomNUmberBetween(cactus_interval_min, cactus_interval_max) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects() {

    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}


function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElement.append(cactus)
}


function randomNUmberBetween(min, max) {
   return  Math.floor(Math.random()*(max-min +1) +min)
}