import Rat from "./rat.js"
// import MoveDirection from "./ratMove.js"
import WaterHazard from "./waterHazards.js"

export default class TileMap {
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
		[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 1],
		[1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1],
		[1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 4, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 0, 4, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
		[1, 4, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	]
	walls = []

	//loop through to read tile and draw
	draw(ctx) {
		const water = []
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column]
				if (tile === 1) {
					this.#drawWall(ctx, column, row, this.tileSize)
				} else if (tile === 0) {
					this.#drawPath(ctx, column, row, this.tileSize)
				} else if (tile === 3) {
					water.push(new WaterHazard(ctx, column, row, this.tileSize))
				}
				// ctx.strokeStyle = 'yellow'
				// ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
			}
		}
	}
	//private draw method for path for rat
	#drawPath(ctx, column, row, size) {
		ctx.drawImage(
			this.mazePath,
			column * this.tileSize,
			row * this.tileSize,
			size,
			size
		)
	}
	//private draw method for rat to collide
	#drawWall(ctx, column, row, size) {
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
		console.log(water)
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
				const curTileCoord = {
					x: col * this.tileSize,
					y: row * this.tileSize,
				}
				// console.log(curTileCoord)
                //use rat currCell and requesteddirection to calculate if there's a hit
                // if rat.requestedDirection === ArrowUp and rat.currCell.y - this.tileSize === wallCell
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



}
