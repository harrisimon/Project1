import TileMap from "./tileMap.js"

const tileSize = 32
const game = document.getElementById('canvas')
const ctx = game.getContext('2d')
// console.log(game)

const tileMap = new TileMap(tileSize)

function gameLoop(){
    tileMap.draw()
}
gameLoop()
setInterval(gameLoop, 1000/60)