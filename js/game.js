import TileMap from "./tileMap.js"
import Rat from "./rat.js"

//vars
const tileSize = 32
const speed = 1
const active = null
let startTime = 60
let grime = 3

//getting the canvas
const game = document.getElementById('canvas')
const ctx = game.getContext('2d')

//getting the timer
const time = document.getElementById('sec')

const resetGame = () => {
//add logic for resetting gameloop

}

//getting the reset button
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', resetGame())


//fix timer logic
//starting the game with click
const messageOff =() =>{
    document.getElementById("start-overlay").style.display = "none";
    const timerInterval = setInterval(timer, 1000)
    timer()
}

const timer = () => {

    if(time.innerHTML !== 0 + ' '){
        time.innerHTML = startTime + ' '
        startTime--
    } else if (time.innerHTML === 0 + " " || grime === 0){
        clearInterval(timerInterval)

    }

}


//instantiating tile map, rat, water hazards
const tileMap = new TileMap(tileSize)
const rat = tileMap.getRat(speed)
const water = tileMap.getWater(active)

function gameLoop(){
    tileMap.draw(ctx)
    rat.draw(ctx)
    water.forEach(water=>water.draw(ctx))
    // console.log(rat.y,rat.x)
}

tileMap.setCanvasSize(canvas)

gameLoop()
setInterval(gameLoop, 1000/60)


const message = document.getElementById('start-overlay')
message.addEventListener('click', messageOff)







