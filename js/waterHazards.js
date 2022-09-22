export default class WaterHazard {
  constructor(x, y, tileSize,speed, tileMap) {
    this.x = x, this.y = y, this.tileSize = tileSize,
    this.active = true,
    this.speed = speed,
    this.tileMap = tileMap,
    this.#loadWater()
  }

  draw(ctx) {
    ctx.drawImage(
        this.image, 
        this.x, 
        this.y,
        this.tileSize, 
        this.tileSize)
  }

  #loadWater() {
    this.water = new Image()
    water.src = '../imgs/waterspout.png'
    this.image = this.water
  }
}
