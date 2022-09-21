// import TileMap from "./tileMap";

const game = document.getElementById('canvas')
const ctx = game.getContext('2d')
console.log(game)
const grime = document.getElementById('grime')
const time = document.getElementById('time')
time.setAttribute('text-size', '3em')
time.innerHTML = '60'



let startTime = 60
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])


const ratPic = document.getElementById('rat')
class Rat {
    constructor(x, y, width, height, color){
            this.keys = []
            this.x = x,
            this.y = y, 
            this.velocityX = 0,
            this.velocityY = 0,
            this.friction = .2 
            this.speed = 10,
            this.height = height,
            this.width = width,
            this.color = color,
            this.direction = {
                right: false,
                left: false,
                up: false,
                down: false

            },
            this.setDirection = function (key){
                // console.log('set', key)
                if (key === 'ArrowLeft'){this.keys.push(key)}
                if (key === 'ArrowRight'){this.keys.push(key)}
                if (key === 'ArrowUp'){this.keys.push(key)}
                if (key === 'ArrowDown'){this.keys.push(key)}
                console.log(this.keys)
            },
            this.unsetDirection = function (key){
                // console.log('unset', key)
                if (key == 'ArrowLeft'){this.keys = []}
                if (key == 'ArrowRight'){this.keys= []}
                if (key == 'ArrowUp'){this.keys = []}
                if (key === 'ArrowDown'){this.keys= []}
                
                if (this.keys.length > 0){
                    this.keys.pop()
                }
                console.log(this.keys)
            },
            this.moveRat = function (){
                if(this.keys.includes('ArrowRight')){
                    this.x+=this.speed
                }
                if(this.keys.includes('ArrowLeft')){
                    this.x-=this.speed
                }
                if(this.keys.includes('ArrowUp')){
                    this.y-=this.speed
                }
                if(this.keys.includes('ArrowDown')){
                    this.y+=this.speed
                }

            },            
            this.render = function () {
                // ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.drawImage(ratPic, 0, 10, ratPic.width, ratPic.height-32, this.x, this.y, ratPic.width, ratPic.height/2)
            } 
    }
}

const waterPic = document.getElementById('water')
class Water {
    constructor(x, y, width, height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
        this.active = false
        this.render = function () {
            ctx.drawImage(waterPic, 0, 0, waterPic.width, waterPic.height, this.x, this.y, waterPic.width, waterPic.height)
        }
    }
}

const obstacle1 = new Water(150, 20, 25, 25)
///Write a function that generates a grid
// this will make rows and columns
//write another function that removes walls of a grid to create platforms
    //inside of this there will be 3 levels that remove walls to create different platforms

//pipe / end function that moves the rat back to 0, 0 for the next level
//write a function that places obstacles, this will be inside of the wall removal function

//write a wall detection function
class Platform {
    constructor(x, y, width, height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
        this.color = 'brown'
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
const levelOne = {
    platform1:
    {x:0,
    y:60,
    width: 250,
    height:30},
    platform2: 
    {x:100,
    y:150,
    width: 400,
    height:30}

}
//maze
const drawWalls = () => {
    const platform = new Platform(levelOne.platform1.x, levelOne.platform1.y, levelOne.platform1.width, levelOne.platform1.height)
    const platform2 = new Platform(levelOne.platform2.x, levelOne.platform2.y, levelOne.platform2.width, levelOne.platform2.height)
    platform.render()
    platform2.render()
}
//edges of maze
const drawBorders = () => {
    const edgeLeft = new Platform(0, 0, 5, game.height)
    const edgeRight = new Platform(495, 0, 5, game.height)
    const edgeTop = new Platform(0, 0, game.width, 5)
    const edgeBottom = new Platform(0, 495, game.width, 5)
    edgeLeft.render()
    edgeRight.render()
    edgeTop.render()
    edgeBottom.render()
}

const rat = new Rat(10, 10, 25, 15, 'grey')


//first attempt at collision but need to think about the grid
const collisionDetection = (thing)=> {
    if(rat.x < thing.x + thing.width 
        && rat.x + rat.width > thing.x
        && rat.y < thing.y + thing.height
        && rat.y + rat.height > thing.y){
        rat.y=platform.y-rat.height
    }
    console.log("collide")
}


//key listeners for direction
document.addEventListener('keydown', e=>{
    rat.setDirection(e.key)
})
document.addEventListener('keyup',e=>{
    rat.unsetDirection(e.key)
} )

const randomObstacle = () => {
    if(time.innerHTML % 3){
        obstacle1.render()
    }
}
const clearTimer = () => {
    if(time.innerHTML === 50){
        clearInterval(timerInterval)
    }
}


const gameLoop =() => {

    ctx.clearRect(0,0,game.width, game.height)
    rat.moveRat()
    rat.render()
    // drawWalls()
    randomObstacle()
    drawBorders()

}
console.log(ctx.getImageData(rat.x, rat.y, rat.width, rat.height))
gameLoop()
const timer = () => {
    time.innerHTML = startTime
    startTime--
}


timer()

const timerInterval = setInterval(timer, 1000)
const gameInterval = setInterval(gameLoop, 60)


