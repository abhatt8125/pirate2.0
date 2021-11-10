class Boat {
 constructor(x,y,width,height,boatPos,boatAni){
  var options={
      restitution:0.8,
      friction:1.0,
      density: 1.0,
    }
    this.animation=boatAni
 this.body=Bodies.rectangle(x,y,width,height,options)
 this.speed=0.05
 this.width=width
 this.height=height
 this.image=loadImage("assets/boat.png")
 this.boatPosition=boatPos
 this.isBroken=false 
 World.add(world,this.body)
 }  
 animate(){
   this.speed+=0.05
 }
 remove(index){
   this.animation=brokenBoatAni
   this.speed=0.05
   this.width=300
   this.height=300
   this.isBroken=true
   setTimeout(()=>{
     Matter.World.remove(world,boats[index].body)
     delete boats[index]
   },2000)
 }
display(){
var pos=this.body.position
//var index=Math.round(random(0,3))
var index=floor(this.speed%this.animation.length)
console.log(index)
push ()
 translate(pos.x,pos.y)
 imageMode(CENTER)
 image (this.animation[index],0,this.boatPosition,this.width,this.height)
pop ()
}
}