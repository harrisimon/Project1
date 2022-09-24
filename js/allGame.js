//vars
const tileSize = 32
const speed = 1
const active = null
let grime = 3

//getting the canvas
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")

//getting the grime display
const grimeDisplay = document.getElementById("grime-display")

const endMessage = document.getElementById("end-overlay")
console.log(endMessage)
//getting the timer
const time = document.getElementById("sec")

const startMessage = document.getElementById("start-overlay")

let startTime = 90
const countDown = setInterval(function () {
	if (startTime <= 0) {
		clearInterval(countDown)
		gameLose()
	}
	document.getElementById("sec").innerHTML = startTime
	startTime -= 1
}, 1000)

const messageOff = () => {
	startMessage.style.display = "none"
}
document.getElementById("start-overlay").addEventListener("click", messageOff)

//getting the reset button
const resetButton = document.getElementById("reset")
resetButton.addEventListener("click", () => {
	//add logic for resetting gameloop
	console.log("reset")
	rats.x = 0,
    rat.y = tileSize
	startTime = 60
	grime = 3
	gameLoop()
})

class TileMap {
	constructor(tileSize) {
		this.tileSize = tileSize
		this.mazePath = new Image()
		this.mazePath.src = "../imgs/mazePath.png"
		this.wall = new Image()
		this.wall.src = "../imgs/grimeTile.png"
	}

	//1 walls
	//0 path
	//9 rat
	//3 water
	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 1],
		[1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1],
		[1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 3, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 1, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 0, 3, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
		[1, 3, 0, 0, 3, 0, 3, 0, 0, 3, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	]

	//loop through to read tile and draw
	draw(ctx) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column]
				if (tile === 1) {
					this.drawWall(ctx, column, row, this.tileSize)
					// this.allWalls.push({'x': column * this.tileSize, 'y': row * this.tileSize})
				} else if (tile === 0) {
					this.drawPath(ctx, column, row, this.tileSize)
				}
				// ctx.strokeStyle = 'yellow'
				// ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
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

//adding rat to the board
class Rat {
	constructor(x, y, tileSize) {
		this.x = x,
        this.y = y,
        this.tileSize = tileSize,
        this.keys = [],
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

	loadRatPics() {
		const ratPic1 = new Image()
		ratPic1.src = "../imgs/ratRight.png"
		const ratPic2 = new Image()
		ratPic2.src = "../imgs/ratDown.png"
		const ratPic3 = new Image()
		ratPic3.src = "../imgs/ratLeft.png"
		const ratPic4 = new Image()
		ratPic4.src = "../imgs/ratUp.png"
		this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic4]
	}

	//changes the rat picture and updated the request
	setDirection = (event) => {
		if (event.key === "ArrowRight") {
			this.requestedMovingDirection = "ArrowRight"
			this.ratPicIndex = 0
		} else if (event.key === "ArrowLeft") {
			this.keys.push(event.key)
			this.requestedMovingDirection = "ArrowLeft"
			this.ratPicIndex = 2
		} else if (event.key === "ArrowUp") {
			this.keys.push(event.key)
			this.requestedMovingDirection = "ArrowUp"
			this.ratPicIndex = 3
		} else if (event.key === "ArrowDown") {
			this.keys.push(event.key)
			this.ratPicIndex = 1
			this.requestedMovingDirection = "ArrowDown"
		}
	}

	//this function moves the rat after the key is released and stores the x, y in an object
	//it will also check if the rat is blocked by a wall before allowing movement
	unsetDirection = () => {
		wallCollide()
        waterCollide()
		if (this.rightBlocked === false) {
			if (this.requestedMovingDirection === "ArrowRight") {
				this.x += this.tileSize
				this.requestedMovingDirection = null
			}
		}
		if (this.leftBlocked === false) {
			if (this.requestedMovingDirection === "ArrowLeft") {
				this.x -= this.tileSize
				this.requestedMovingDirection = null
			}
		}
		if (this.downBlocked === false) {
			if (this.requestedMovingDirection === "ArrowDown") {
				this.y += this.tileSize
				this.requestedMovingDirection = null
			}
		}
		if (this.upBlocked === false) {
			if (this.requestedMovingDirection === "ArrowUp") {
				this.y -= this.tileSize
				this.requestedMovingDirection = null
			}
		}
	}
}

//   respawn = () => {
//     //add in collision detection for hazards later
//     // if (colliding with water tile and water[idx].active === true){
//     //     this.x = 0
//      grime-=1
//     // }

class WaterHazard {
	constructor(x, y, tileSize, tileMap, active) {
		;(this.x = x),
			(this.y = y),
			(this.tileSize = tileSize),
			(this.active = active),
			(this.tileMap = tileMap),
			this.loadWater()
	}
	draw(ctx) {
		//boolean for turning on the water
		if (Math.random() < 0.09) {
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
		this.water.src = "../imgs/water-spout.png"
		this.image = this.water
	}
}

//instantiating tile map, rat, water hazards
const tileMap = new TileMap(tileSize)
tileMap.setCanvasSize(canvas)
const rat = new Rat(0, 32, tileSize)

const water = tileMap.getWater(active)

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

function waterCollide() {
	const ratPosX = rat.x / tileSize
	const ratPosY = rat.y / tileSize

	if (tileMap.map[ratPosY][ratPosX] === 3 && water.active) {
		console.log("hello")
	}
}
console.log(water[0])
const gameWin = () => {
	if (rat.y >= 480) {
		console.log("you win")
		const endText = document.getElementById("endgame")
		endText.innerHTML = "you win"
		endMessage.style.display = "visible"
		// setTimeout(timerInterval)
	}
}
const gameLose = () => {
	const endText = document.getElementById("endgame")
	endText.innerHTML = "You lose!"
	endMessage.style.display = "visible"
}

//make rat before game loop
// rat.loadRatPics()
function gameLoop() {
	tileMap.draw(ctx)
	wallCollide()
	water.forEach((water) => water.draw(ctx))
	rat.drawRat()
}
gameLoop()
const gameInterval = setInterval(gameLoop, 600)
document.addEventListener("DOMContentLoaded", function () {
	//calls the game loop and runs the interval
	gameLoop()
})
