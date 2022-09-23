import TileMap from "./tileMap.js"
// import Rat from "./rat.js"
// import WaterHazard from "./waterHazards.js"

//vars
const tileSize = 32
const speed = 1
const active = null
let startTime = 50
let grime = 3

//getting the canvas
const game = document.getElementById('canvas')
const ctx = game.getContext('2d')

//instantiating tile map, rat, water hazards
const tileMap = new TileMap(tileSize)
const rat = tileMap.getRat(speed)
const water = tileMap.getWater(active)



//getting the timer
const time = document.getElementById('sec')


//getting the grime display
const grimeDisplay = document.getElementById('grime-display')


//getting the reset button
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click',  ()=> {
    //add logic for resetting gameloop
        console.log('reset')
        rat.x = 0, rat.y = tileSize
        startTime = 60
        grime = 3
})

//fix timer logic
//starting the game with click
const messageOff = () =>{
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
// console.log(tileMap.allWalls)
 //game lose 
 //if grime level === 0 or time.InnerHTML === 0+ ' ' 
 //end screen message lose and end gameloop
 
 //game win
 //if rat.currCell === {x: 416, y: 480}
 //end screen message win and end gameLoop


function gameLoop(){
    tileMap.draw(ctx)
    rat.draw(ctx)
    // tileMap.collide(rat.currCell)
    water.forEach(water=>water.draw(ctx))
  
}

tileMap.setCanvasSize(canvas)

setInterval(gameLoop, 1000/60)


const message = document.getElementById('start-overlay')
// message.addEventListener('click', messageOff)


const updateWater = () => {
    let val = Math.floor(Math.random() * 2)
    if (val === 1){
     this.active = true
    } else if (val === 0){
     this.active = false
    }
    return active
}


// const collide =()=> {
//     for (let row = 0; row < tileMap.length; row++) {
//         console.log(row)
//         for (let col = 0; col < tileMap[row].length; col++) {
//             const currTile = tileMap[row][col]
//             if (currTile === 1){
//                 if (rat.currCell.x >= currTile.cord.x && rat.x <= curTileCoord.x + this.tileSize){
//                     console.log(rat.currCell.x)
//                     return rat.leftBlocked = true
//                 }
//                 if (rat.currCell.y >= curTileCoord.y && rat.y <= curTileCoord.y + this.tileSize){
//                     return rat.downBlocked = true
//                 }
//             }
//         }
//     }
    
// }

