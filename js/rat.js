import MoveDirection from "./ratMove.js"

//adding rat to the board
export default class Rat {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x,
    this.y = y,
    this.tileSize = tileSize,
    this.speed = speed,
    this.tileMap = tileMap,
    this.keys = []
    this.up = false,
    this.down = false,
    this.right = false,
    this.left = false

    document.addEventListener("keydown", this.setDirection)
    document.addEventListener("keyup", this.unsetDirection)
    this.#loadRatPics()
  }
  draw(ctx) {

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

  //   }
  setDirection = (event) => {
    if (event.key === "ArrowRight") {
    
      this.keys.push(event.key)
      this.requestedMovingDirection = 'ArrowRight'
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
    //if not blocked
    if (this.requestedMovingDirection === 'ArrowRight'){
        this.x+=32
        this.requestedMovingDirection = null
    //if not blocked
    } else if (this.requestedMovingDirection === 'ArrowLeft'){
        this.x-=32
        this.requestedMovingDirection = null
    //if not blocked
    } else  if (this.requestedMovingDirection === 'ArrowDown'){
        this.y+=32
        this.requestedMovingDirection = null
    //if not blocked
    } else if (this.requestedMovingDirection === 'ArrowUp'){
        this.y-=32
        this.requestedMovingDirection = null
    }
    // if (this.keys.length >= 0) {
    // // this.speed = 0
    //   this.keys = []
    // }
  }
  respawn = () => {
    //add in collision detection for hazards later
    // if (this.x === 200){
    //     this.x = 0
    // }
  }
}
