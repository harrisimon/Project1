window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 500;
    canvas.height = 500;

    class Game {
       constructor(width, height){
           this.width = width,
           this.height = height
           this.rat = new Rat(this)
           this.movement = new ratMovment()
       }
       update(){
           this.rat.update(this.movement.keyPressed)
       }
       draw(context){
           this.rat.draw(context)
       }
    }
   const game = new Game(canvas.width, canvas.height)
   console.log(game)

   function animate(){
       ctx.clearRect(0,0,canvas.width, canvas.height)
       game.update()
       game.draw(ctx)
       requestAnimationFrame(animate)

   }
   animate()
})

class Rat {
   constructor(game){
       this.game = game,
       this.width = 35,
       this.height = 25,
       this.x = 20,
       this.y = 20,
       this.ratPic = document.getElementById('rat'),
       this.speed = 0,
       this.velocity = 3
   }
   update(input){
       this.x += this.speed
       if(input.includes('ArrowRight')){
           this.speed = this.velocity
       } else if (input.includes('ArrowLeft')){
           this.speed = this.velocity * -1
       } else {
           this.speed = 0
       }
       
   }
   draw(context){
       context.fillStyle = 'grey'
       // context.fillRect(this.x, this.y, this.width, this.height)
       context.drawImage(this.ratPic, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
   }
}

class ratMovment {
   constructor(){

       this.keyPressed = []
       window.addEventListener('keydown', e =>{
           if((e.key === 'ArrowRight' && !this.keyPressed.includes('ArrowRight') ||
            (e.key === 'ArrowLeft' && !this.keyPressed.includes('ArrowLeft')))){
               this.keyPressed.push(e.key)
               console.log(this.keyPressed)
           }
       window.addEventListener('keyup', e => {
           if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
               this.keyPressed.pop()
           }
           console.log(this.keyPressed)
       })

       })

   }
}