class Cannonball{
    constructor(x,y){
    var options = {
        isStatic:true
    }
this.radius=30
this.speed=0.05
this.body=Bodies.circle(x,y,this.radius,options)
this.image=loadImage("assets/cannonball.png")
this.animation=[this.image]
this.trajectory=[]
this.isSink=false
World.add(world,this.body)

    }
    animate (){
     this.speed+=0.05
    }
    shoot(){
        var newAngle=cannon.angle-30
        newAngle=newAngle*(3.14/180)
        var velocity=p5.Vector.fromAngle(newAngle)
        console.log(velocity)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})
            
       
    }
    remove(index){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=waterSplashAni
        this.speed=0.05
        this.radius=150
        setTimeout(()=>{
          Matter.World.remove(world,this.body)
          delete balls[index]
        },1000)
      }
    display(){
        var pos=this.body.position
        var index=floor(this.speed%this.animation.length)
        push ()
        imageMode(CENTER)
        image(this.animation[index],pos.x,pos.y,this.radius,this.radius)
         pop ()
         
// recording each and every position of the ball and storing them in the individiual arrays. storing those individual arrays in the this . trajectory array
   if (this.body.velocity.x>0 && pos.x>10) {
    var position= [pos.x,pos.y]   
    this.trajectory.push(position)
    // this.trajectory=[[1,2],[3,4],[5,6],[7,8]]
   }       
//extracting the x and y coordinates of the position of the ball one by one and displaying the image of a tiny cannonball at all of those positions.
//we are doing this to highlight the entire trajectory of the cannonball with a lot of tiny cannonballs
for(var i=0;i<this.trajectory.length;i=i+1){
    image (this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
}






    }
}