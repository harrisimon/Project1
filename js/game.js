import TileMap from "./tileMap.js"

const tileSize = 32
const speed = 1

const game = document.getElementById('canvas')
const ctx = game.getContext('2d')


const tileMap = new TileMap(tileSize)
const rat = tileMap.getRat(speed)

function gameLoop(){
    tileMap.draw(ctx)
    rat.draw(ctx)
}
tileMap.setCanvasSize(canvas)
gameLoop()
setInterval(gameLoop, 1000/60)