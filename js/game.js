import TileMap from "./tileMap.js"

//vars
const tileSize = 32
const speed = 1
const active = null
let startTime = 60

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



const timer = () => {
    if(time.innerHTML === 0){
        clear
    }
    time.innerHTML = startTime + ' '
    startTime--
}


//instantiating tile map, rat, water hazards
const tileMap = new TileMap(tileSize)
const rat = tileMap.getRat(speed)
const water = tileMap.getWater(active)

function gameLoop(){
    tileMap.draw(ctx)
    rat.draw(ctx)
    water.forEach(water=>water.draw(ctx)) 
}

tileMap.setCanvasSize(canvas)
gameLoop()
setInterval(gameLoop, 1000/60)

//starting the game with click
const messageOff =() =>{
    document.getElementById("overlay").style.display = "none";
    const timerInterval = setInterval(timer, 1000)
    timer()
}
const message = document.getElementById('overlay')
message.addEventListener('click', messageOff)







