export default class WaterHazard {
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
