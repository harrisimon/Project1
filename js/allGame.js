//vars
const tileSize = 32
const speed = 1
const active = null
let grime = 3
let startTime = 60
let lose = false
let win = false

//getting the canvas
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")
//start message
const startMessage = document.getElementById("start-overlay")
//getting the grime display
const grimeDisplay = document.getElementById("grime-display")
let grimeNum = document.getElementById('grime-num')
grimeNum.innerHTML = grime
const endMessage = document.getElementById("end-overlay")

//getting the timer
const time = document.getElementById("sec")
time.innerHTML = startTime

function timer()  {
    if(startTime>0){
        startTime -= 1
        time.innerHTML = startTime
    }
}
//turns off the start message
const messageOff = () => {
	startMessage.style.display = "none"
}
//starts the timer
document.getElementById("start-overlay").addEventListener("click",()=>{ 
    messageOff()
    setInterval(timer, 1000)
    })

//getting the reset button
const resetButton = document.getElementById("reset")
const reset = () => resetButton.addEventListener("click", () => {
	rat.x = 0,
    rat.y = tileSize
    startTime = 60
    grime = 3
    grimeNum.innerHTML = grime
    const gameInterval = setInterval(gameLoop, 500)
    clearInterval(gameInterval)
    clearInterval(countDown)
    countDown()
	gameLoop()
})
reset()

//tile map class for drawing the game board
class TileMap {
	constructor(tileSize) {
		this.tileSize = tileSize
		this.mazePath = new Image()
		this.mazePath.src = "./imgs/mazePath.png"
		this.wall = new Image()
		this.wall.src = "./imgs/grimeTile.png"
	}

	//1 walls
	//0 path
	//3 water
	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 1],
		[1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 3, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 1, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 0, 3, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
		[1, 3, 3, 0, 3, 0, 3, 3, 0, 3, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	]

	//loop through to read tile and draw either path or wall
	draw(ctx) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column]
				if (tile === 1) {
					this.drawWall(ctx, column, row, this.tileSize)
				} else if (tile === 0) {
					this.drawPath(ctx, column, row, this.tileSize)
				}
			}
		}
	}

	//draw method for path for rat
	drawPath(ctx, column, row, size) {
		ctx.drawImage(
			this.mazePath,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		)
	}
	// draw method for wall
	drawWall(ctx, column, row, size) {
		ctx.drawImage(
			this.wall,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		)
	}

	//adding water hazard to tile map
	getWater() {
		const water = []
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				const tile = this.map[row][column]
				if (tile === 3) {
					this.map[row][column] = 0
					water.push(
						new WaterHazard(
							column * this.tileSize,
							row * this.tileSize,
							this.tileSize,
							active,
							this
						)
					)
				}
			}
		}
		return water
	}
	//setting canvas size as array element lengths
	setCanvasSize(canvas) {
		canvas.width = this.map[0].length * this.tileSize
		canvas.height = this.map.length * this.tileSize
	}
}

//rat class for our grimey friend
class Rat {
	constructor(x, y, tileSize) {
		this.x = x,
        this.y = y,
        this.tileSize = tileSize,
        this.upBlocked = true,
        this.downBlocked = true,
        this.rightBlocked = true,
        this.leftBlocked = true,
        this.ratPicIndex = 0,
        this.drawRat = function () {
            ctx.drawImage(
                this.ratPicArray[this.ratPicIndex],
                0,
                0,
                tileSize,
                tileSize,
                this.x,
                this.y,
                tileSize,
                tileSize
            )
        }
		document.addEventListener("keydown", this.setDirection)
		document.addEventListener("keyup", this.unsetDirection)
		this.loadRatPics()
	}
    //rat pics for each direction
	loadRatPics() {
		const ratPic1 = new Image()
		ratPic1.src = "./imgs/rightRight.png"
		const ratPic2 = new Image()
		ratPic2.src = "../imgs/ratDown.png"
		const ratPic3 = new Image()
		ratPic3.src = "./imgs/ratLeft.png"
		const ratPic4 = new Image()
		ratPic4.src = "./imgs/ratUp.png"
		this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic4]
	}

	//moves the rat, checks for blocks, collisions, and water
    //plays lil' squeaks
	setDirection = (event) => {
        wallCollide()
        waterCollide()
		if (event.key === "ArrowRight" && this.rightBlocked === false) {
			this.ratPicIndex = 0
            document.getElementById('squeak').play()
            this.x += this.tileSize
		} else if (event.key === "ArrowLeft" && this.leftBlocked === false) {
			this.ratPicIndex = 2
            document.getElementById('squeak').play()
            this.x -= this.tileSize
		} else if (event.key === "ArrowUp" && this.upBlocked === false) {
			this.requestedMovingDirection = "ArrowUp"
			this.ratPicIndex = 3
            document.getElementById('squeak').play()
            this.y -= this.tileSize
		} else if (event.key === "ArrowDown" && this.downBlocked === false) {
			this.ratPicIndex = 1
			this.requestedMovingDirection = "ArrowDown"
            document.getElementById('squeak').play()
            this.y += this.tileSize
		}
	}

}

//creates waterspouts
class WaterHazard {
	constructor(x, y, tileSize, tileMap, active) {
		this.x = x,
			this.y = y,
			this.tileSize = tileSize,
			this.active = active,
			this.tileMap = tileMap,
			this.loadWater()
	}
	draw(ctx) {
		//boolean for turning on the water aka drawing it
		if (Math.random() < 0.1) {
			this.active = true
			ctx.drawImage(
				this.image,
				this.x,
				this.y,
				this.tileSize,
				this.tileSize
			)
		} else {
			this.active = false
		}
	}

	loadWater() {
		this.water = new Image()
		this.water.src = "./imgs/water-spout.png"
		this.image = this.water
	}
}

//instantiating tile map, rat, water hazards
const tileMap = new TileMap(tileSize)
tileMap.setCanvasSize(canvas)
const rat = new Rat(0, 32, tileSize)
const water = tileMap.getWater(active)

//function to detect walls, using cells rather than coordinates
function wallCollide() {
	const ratPosX = rat.x / tileSize
	const ratPosY = rat.y / tileSize

	if (tileMap.map[ratPosY]?.[ratPosX - 1] === 0) {
		rat.leftBlocked = false
	} else {
		rat.leftBlocked = true
	}
	if (tileMap.map[ratPosY]?.[ratPosX + 1] === 0) {
		rat.rightBlocked = false
	} else {
		rat.rightBlocked = true
	}
	if (tileMap.map[ratPosY + 1]?.[ratPosX] === 0) {
		rat.downBlocked = false
	} else {
		rat.downBlocked = true
	}
	if (tileMap.map[ratPosY - 1]?.[ratPosX] === 0) {
		rat.upBlocked = false
	} else {
		rat.upBlocked = true
	}
}
//function for checking if rat is on a water tile aka gets sprayed
//moves rat to beginning of maze and lowers grime by 1
//plays a splash if rat gets sprayed
function waterCollide() {
    grimeNum.innerHTML = grime
    water.forEach(function(water){
        if(rat.x === water.x && rat.y === water.y && water.active === true)
        {
            document.getElementById('splash').play()
            grime-=1
            rat.x = 0, rat.y = 32
        }})
    }

//if rat reaches the end of the maze displays a message
const gameWin = () => {
	if (rat.y >= 448) {
        clearInterval(gameInterval)
        clearInterval(timer)
        const endMessage = document.createElement('div')
        endMessage.setAttribute('id', 'win-message')
        const youWin = document.createElement('h1')
        youWin.innerHTML = 'You Win! <br> Click to play again'
        endMessage.appendChild(youWin)
        const messageBox = document.getElementById('container')
        messageBox.appendChild(endMessage)
        messageBox.addEventListener('click', playAgain)
        document.getElementById('disco').play()
	}
}

//game loop
function gameLoop() {
	tileMap.draw(ctx)
	wallCollide()
    waterCollide()
	water.forEach((water) => water.draw(ctx))
	rat.drawRat()
    gameWin()
    gameLose()
}

//check if time is out or grime is at zero
function gameLose() {
    if(startTime === 0 || grime === 0){
        clearInterval(gameInterval)
        clearInterval(timer)
        const endMessage = document.createElement('div')
        endMessage.setAttribute('id', 'lose-message')
        const youLose = document.createElement('h1')
        youLose.innerHTML = 'You Lose! <br> Click to play again'
        endMessage.appendChild(youLose)
        const messageBox = document.getElementById('container')
        messageBox.appendChild(endMessage)
        messageBox.addEventListener('click', playAgain)
    }
}
//reseting the game after win/lose condition
const tryAgain = document.getElementById('lose-message')
const playAgain =  ()=>{
    const messageBox = document.getElementById('container')
    messageBox.removeChild(messageBox.lastChild),
    rat.x = 0,
    rat.y = tileSize
    startTime = 60
    grime = 3
    gameInterval = setInterval(gameLoop, 700)
}

//game loop speed
let gameInterval = setInterval(gameLoop, 700)

