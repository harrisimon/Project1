import Rat from "./rat.js"
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
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  ]
  //loop throw to read tile and draw
  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column]
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize)
        } else if (tile === 0) {
          this.#drawPath(ctx, column, row, this.tileSize)
        }
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
  //adding rat to til map
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
  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize
    canvas.height = this.map.length * this.tileSize
  }
}
