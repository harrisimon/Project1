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
    this.currCell = {
        x: null,
        y: null
    }
    this.ratPicIndex = 0

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
    ratPic1.src = "../imgs/ratRight.png"
    const ratPic2 = new Image()
    ratPic2.src = "../imgs/ratDown.png"
    const ratPic3 = new Image()
    ratPic3.src = "../imgs/ratLeft.png"
    const ratPic4 = new Image ()
    ratPic4.src = '../imgs/ratUp.png'
    this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic4]

    // this.ratPicIndex = 0
  }

  //   }
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
  unsetDirection = () => {
    //if not blocked
    if (this.requestedMovingDirection === 'ArrowRight'){
        this.x+=32
        this.requestedMovingDirection = null
        this.currCell.x = this.x
        this.currCell.y = this.y 
        // console.log(this.currCell)
    //if not blocked
    } else if (this.requestedMovingDirection === 'ArrowLeft'){
        this.x-=32
        this.requestedMovingDirection = null
        this.currCell.x = this.x
        this.currCell.y = this.y 
    //if not blocked
    } else  if (this.requestedMovingDirection === 'ArrowDown'){
        this.y+=32
        this.requestedMovingDirection = null
        this.currCell.x = this.x
        this.currCell.y = this.y 
    //if not blocked
    } else if (this.requestedMovingDirection === 'ArrowUp'){
        this.y-=32
        this.requestedMovingDirection = null
        this.currCell.x = this.x
        this.currCell.y = this.y 
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
