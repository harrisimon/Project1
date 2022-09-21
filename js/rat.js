import MoveDirection from "./ratMove.js";

//adding rat to the board
export default class Rat {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x,
    this.y = y,
    this.tileSize = tileSize,
    this.speed = speed,
    this.tileMap = tileMap,
    this.direction = null
    document.addEventListener('keydown', e=>{
        rat.setDirection(e.key)
    })

    this.#loadRatPics();
  }
  draw(ctx) {
    //need to figure out why rat goes hidden when switching array element
    ctx.drawImage(
      this.ratPicArray[this.ratPicIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    )
  }

  #loadRatPics() {
    const ratPic1 = new Image()
    ratPic1.src = "../imgs/rat1.png"

    const ratPic2 = new Image()
    ratPic1.src = "../imgs/rat1.png"

    const ratPic3 = new Image()
    ratPic1.src = "../imgs/rat3.png"

    this.ratPicArray = [ratPic1, ratPic2, ratPic3, ratPic2]

    this.ratPicIndex = 0
  }
}
