import Rat from "./rat.js"

// import WaterHazard from "./waterHazards.js"

export default class TileMap {
	constructor(tileSize) {
		this.tileSize = tileSize
		this.mazePath = new Image()
		this.mazePath.src = "../imgs/mazePath.png"
		this.wall = new Image()
		this.wall.src = "../imgs/grimeTile.png"
        this.allWalls = []
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
	walls = []

	//loop through to read tile and draw
	draw(ctx) {
		// const water = []
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

	//private draw method for path for rat
	drawPath(ctx, column, row, size) {
		ctx.drawImage(
			this.mazePath,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		)
	}
	//private draw method for rat to collide
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
	//adding water hazard to tile map---still not working
	getWater(active) {
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
 
	//collision detection---still not working
	collide() {
        
		for (let row = 0; row < this.map.length; row++) {
			for (let col = 0; col < this.map[row].length; col++) {
				const currTile = this.map[row][col]
                if (currTile === 1){
                    if (rat.x >= currTile.cord.x && rat.x <= curTileCoord.x + this.tileSize){

                        return 
                    }
                    if (rat.currCell.y >= curTileCoord.y && rat.y <= curTileCoord.y + this.tileSize){

                    }
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
			}
		
	}



}


class WaterHazard {
	constructor(x, y, tileSize, tileMap, active) {
		this.x = x,
		this.y = y,
		this.tileSize = tileSize,
			// this.active = active,
		this.tileMap = tileMap,
		this.#loadWater()
		setInterval(this.setActive, 250)
		this.setActive()
	}

	draw(ctx) {
		if (active) {
			ctx.drawImage(
				this.image,
				this.x,
				this.y,
				this.tileSize,
				this.tileSize
			)
		}
	}

	#loadWater() {
		this.water = new Image()
		this.water.src = "../imgs/water-spout.png"
		this.image = this.water
	}
	setActive() {
		this.active = Math.random() < 0.5
	}
}

