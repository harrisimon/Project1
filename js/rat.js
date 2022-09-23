
//adding rat to the board
export default class Rat {
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
//     // if (this.x === 200){
//     //     this.x = 0
//     // }
  }
    }}
