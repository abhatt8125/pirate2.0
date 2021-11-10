class Cannon{
constructor(x,y,width,height,angle){
    this.x=x
    this.y=y
    this.width=width
    this.height=height
    this.angle=angle
    this.cannon_image=loadImage("assets/canon.png")
    this.cannonbase=loadImage("assets/cannonBase.png")
}
display(){
    //handeling the up and down movement 
    if(keyIsDown(RIGHT_ARROW)&& this.angle<70){
    
    this.angle=this.angle+1
    
    }
   
    if(keyIsDown(LEFT_ARROW)&&this.angle>-45){
        this.angle=this.angle-1
        }

//creating the cannon top
push ()
translate (this.x,this.y)
rotate (this.angle)
imageMode(CENTER)
image(this.cannon_image,0,0,this.width,this.height)
pop ()
//creating the cannon bottoms
image(this.cannonbase,70,20,200,200)
noFill()
}

}