import MoveDirection from "./ratMove.js"

//adding rat to the board
export default class Rat {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x,
    this.y = y,
    this.tileSize = tileSize,
    this.speed = speed,
    this.tileMap = tileMap,
    this.goLeft = false
    this.goRight = true
    this.goUp = false
    this.goDown = false
    this.keys = []

    document.addEventListener("keydown", this.setDirection)
    document.addEventListener("keyup", this.unsetDirection)
    this.#loadRatPics()
  }
  draw(ctx) {
    this.move()
    this.respawn()

    ctx.drawImage(
      this.ratPicArray[this.ratPicIndex],
      this.x,
      this.y,
      this.tileSize / 1.3,
      this.tileSize / 1.3
    )
  }

  #loadRatPics() {
    const ratPic1 = new Image()
    ratPic1.src = "../imgs/rat1.png"
    const ratPic2 = new Image()
    ratPic2.src = "../imgs/rat1.png"
    const ratPic3 = new Image()
    ratPic3.src = "../imgs/rat3.png"

    this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic2]

    this.ratPicIndex = 0
  }
  move() {

    if (this.keys.includes("ArrowRight")) {
      this.x += this.speed
    } else if (this.keys.includes("ArrowLeft")) {
      return (this.x -= this.speed)
    } else if (this.keys.includes("ArrowDown")) {
      return (this.y += this.speed)
    } else if (this.keys.includes("ArrowUp")) {
      return (this.y -= this.speed)
    }
  }
  //   }
  setDirection = (event) => {
    if (event.key === "ArrowRight") {
      this.keys.push(event.key)
      this.requestedMovingDirection = this.keys.at(-1)
    } else if (event.key === "ArrowLeft") {
      this.keys.push(event.key)
      this.requestedMovingDirection = this.keys.at(-1)
    } else if (event.key === "ArrowUp") {
      this.keys.push(event.key)
      this.requestedMovingDirection = this.keys.at(-1)
    } else if (event.key === "ArrowDown") {
      this.keys.push(event.key)
      this.requestedMovingDirection = this.keys.at(-1)
    }
  }
  unsetDirection = () => {
    if (this.keys.length >= 0) {
      this.keys = []
    }
  }
  respawn = () => {
    //add in collision detection for hazards later
    // if (this.x === 200){
    //     this.x = 0
    // }
  }
}
