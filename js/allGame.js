//vars
const tileSize = 32
const speed = 1
const active = null
let startTime = 3
let grime = 60

//getting the canvas
const game = document.getElementById('canvas')
const ctx = game.getContext('2d')


//getting the grime display
const grimeDisplay = document.getElementById('grime-display')

//fix timer logic
//starting the game with click
const messageOff = () =>{
    document.getElementById("start-overlay").style.display = "none"
    timerInterval()
    timer()
}
const timerInterval = ()=>{
    setInterval(timer, 1000)}
//getting the timer
const time = document.getElementById('sec')

// const startMessage = document.getElementById('start-overlay')
// startMessage.addEventListener('click', messageOff)

const endMessage = document.getElementById('end-overlay')
console.log(endMessage)

const timer = () => {
    while(startTime> 0){
        startTime-=1
        console.log(startTime)
    }
    // if(time.innerHTML !== 0 + ' '){
    //     time.innerHTML = startTime + ' '
    //     startTime--
    // } else if (startTime === 0|| grime === 0){
    //     console.log("hi")
    //     endMessage.style.display = 'visible'
    //     clearInterval(timerInterval)

    // }
}

//getting the reset button
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click',  ()=> {
    //add logic for resetting gameloop
        console.log('reset')
        rat.x = 0, rat.y = tileSize
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
		[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
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
	//adding rat to tile map
	getRat(speed) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column]
				if (tile === 9) {
					this.map[row][column] = 0
					return new Rat(
						column * this.tileSize,
						row * this.tileSize,
						this.tileSize,
						speed,
						this
					)
				}
			}
		}
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
    constructor(x, y, tileSize, speed, tileMap) {
      this.x = x,
      this.y = y,
      this.tileSize = tileSize,
      this.speed = speed,
      this.tileMap = tileMap,
      this.keys = [],
      this.upBlocked = false,
      this.downBlocked = false,
      this.rightBlocked = false,
      this.leftBlocked = false,
      this.currCell = {
          x: null,
          y: null
      }
      this.ratPicIndex = 0
  
      document.addEventListener("keydown", this.setDirection)
      document.addEventListener("keyup", this.unsetDirection)
      this.loadRatPics()
    }
    draw(ctx) {
      ctx.drawImage(
          this.ratPicArray[this.ratPicIndex],
          this.x,
          this.y,
          this.tileSize,
          this.tileSize 
      )
    }
  
    loadRatPics() {
      const ratPic1 = new Image()
      ratPic1.src = "../imgs/ratRight.png"
      const ratPic2 = new Image()
      ratPic2.src = "../imgs/ratDown.png"
      const ratPic3 = new Image()
      ratPic3.src = "../imgs/ratLeft.png"
      const ratPic4 = new Image ()
      ratPic4.src = '../imgs/ratUp.png'
      this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic4]
  
    }
  
    //changes the rat picture and updated the request
    setDirection = (event) => {
      if (event.key === "ArrowRight") {
          this.requestedMovingDirection = 'ArrowRight'
          this.ratPicIndex = 0
      } else if (event.key === "ArrowLeft") {
          this.keys.push(event.key)
          this.requestedMovingDirection = 'ArrowLeft'
          this.ratPicIndex = 2
      } else if (event.key === "ArrowUp") {
          this.keys.push(event.key)
          this.requestedMovingDirection = 'ArrowUp'
          this.ratPicIndex = 3
      } else if (event.key === "ArrowDown") {
          this.keys.push(event.key)
          this.ratPicIndex = 1
          this.requestedMovingDirection = 'ArrowDown'
      }
    }
    //this function moves the rat after the key is released and stores the x, y in an object
    //it will also check if the rat is blocked by a wall before allowing movement
    unsetDirection = () => {
      //if this.right is false
      console.log(this.leftBlocked)
      if (this.rightBlocked === false){
          if (this.requestedMovingDirection === 'ArrowRight' && this.x < 416){
              this.x+=this.tileSize
              this.requestedMovingDirection = null
              this.currCell.x = this.x
              this.currCell.y = this.y 
      }
      if (this.leftBlocked === false){
          if (this.requestedMovingDirection === 'ArrowLeft'&& this.x > 0){
              this.x-=this.tileSize
              this.requestedMovingDirection = null
              this.currCell.x = this.x
              this.currCell.y = this.y 
      }
  }
      if(this.downBlocked === false){
          if (this.requestedMovingDirection === 'ArrowDown'){
              this.y+=this.tileSize
              this.requestedMovingDirection = null
              this.currCell.x = this.x
              this.currCell.y = this.y 
      }
  
      if(this.upBlocked === false){
          if (this.requestedMovingDirection === 'ArrowUp' && this.y > 32){
              this.y-=this.tileSize
              this.requestedMovingDirection = null
              this.currCell.x = this.x
              this.currCell.y = this.y 
      }
   
      return this.currCell
    }
  }
  
  //   respawn = () => {
  //     //add in collision detection for hazards later
  //     // if (colliding with water tile and water[idx].active === true){
  //     //     this.x = 0
        //      grime-=1
  //     // }
    }
      }}

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
            //boolean for turning on the water
            if (Math.random() < .15){
                this.active = false
                ctx.drawImage(
                    this.image,
                    this.x,
                    this.y,
                    this.tileSize,
                    this.tileSize
                )
            } else {
                this.active = true
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
const rat = tileMap.getRat(speed)
const water = tileMap.getWater(active)
tileMap.setCanvasSize(canvas)

function gameLoop(){
    tileMap.draw(ctx)
    collide()
    rat.draw(ctx)
    water.forEach(water=>water.draw(ctx))
    // checkcollision()
    // gameWin()
    // console.log(water[0].active)

}


function collide() {

    for (let row = 0; row < 14; row++) {
        for (let col = 0; col < tileMap.map[row].length; col++) {   
             
            if(tileMap.map[row][col]===1){
                // console.log(currTile)
                let x = col * tileSize
                let y = row * tileSize
                // console.log(x, y)

                // console.log("yes")
						// this.tileSize,
						// speed,
						// this
                if (rat.x >= x && rat.x < x + tileSize && rat.y > y && rat.y < y -tileSize){
                    console.log("hello")
                    return rat.leftBlocked = true
                }
                // if can't go up
                //return rat blocked up
                //
            
                }
            //         console.log(rat.x)
            //         return rat.leftBlocked = true
            //     } else {
            //         return rat.leftBlocked = false
            //     }
            //     // if (rat.y > currTile[row]*tileSize && rat.y <= currTile[])
            //     // if (rat.currCell.y >= curTileCoord.y && rat.y <= curTileCoord.y + this.tileSize){

            //     // }
                
          
        }
           
        }
    
}


setInterval(gameLoop, 250)

const gameWin = () => {
    if(rat.y >= 480){
        console.log("you win")
        const endText = document.getElementById('endgame')
        endText.innerHTML = "you win"
        // console.log(endText)
        endMessage.style.display = 'visible'
        // console.log(endMessage)
        setTimeout(timerInterval)
    }
}

 // const curTileCoord = {
            // 	x: col * this.tileSize,
            // 	y: row * this.tileSize,
            // }
            //check 
           
            // console.log(curTileCoord)
            //use rat currCell and requesteddirection to calculate if there's a hit
            // if rat.requestedDirection === ArrowUp && rat.currCell.y - this.tileSize === contains(wallCell)
                // block
            //if rat.requestedDirection === ArrowRight && rat.currCell.x + this.tileSize === wallCell
                //block
            //if rat.requestedDirection === ArrowLeft && rat.currCell.x - this.tileSize === wallCell
                //block
            //if rat.requestedDirection === ArrowDown && rat.currCell.y + this.tileSize === wallCell
                //block


// let collision = 0   
//                 function checkcollision() {
//                     let imgd = ctx.getImageData(rat.x, rat.y, tileSize, tileSize);
//                     let pix = imgd.data;
//                     for (let i = 0; i < pix.length; i += 4) {
//                       if (pix[i] == 0) {
//                         collision = 1;
//                       }
//                     }
//                     console.log(collision)
//                 }