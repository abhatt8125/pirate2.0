const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body=Matter.Body
var engine, world,ground;
var balls= []
var boats=[]
var boatAni=[]
var boatSpriteData,boatSpriteSheet
var brokenBoatAni=[]
var brokenboatSpriteData,brokenboatSpriteSheet
var isGameOver=false
var isLaughing=false
var brokenBoatAni=[]
var waterSplashAni=[]
var waterSplashSpriteData,waterSplashSpriteSheet
var backgroundm 
var cannonexplosionm
var laughm
var waterm 
var score=0









function preload() {
backgroundIMG=loadImage("assets/background.gif") 

towerIMG=loadImage("assets/tower.png")
boatSpriteData=loadJSON("assets/boat/boat.json")
boatSpriteSheet=loadImage("assets/boat/boat.png")
brokenboatSpriteData=loadJSON("assets/boat/brokenBoat.json")
brokenboatSpriteSheet=loadImage("assets/boat/brokenBoat.png")
waterSplashSpriteData=loadJSON("assets/water_splash/water_splash.json")
waterSplashSpriteSheet=loadImage("assets/water_splash/water_splash.png")
backgroundm=loadSound("assets/background_music.mp3")
cannonexplosionm=loadSound("assets/cannon_explosion.mp3")
laughm=loadSound("assets/pirate_laugh.mp3")
waterm=loadSound("assets/cannon_water.mp3")
}




function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle=15
  var options={
    isStatic:true
  }
 
ground=Bodies.rectangle(0,height-1,width*2,1,options)
World.add(world,ground)

tower=Bodies.rectangle(160,350,160,310,options)
World.add(world,tower)

cannon=new Cannon(180,110,130,100,angle)

var boatFrames=boatSpriteData.frames
for(var i=0;i<boatFrames.length;i=i+1){
  var pos=boatFrames[i].position
  var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
  boatAni.push(img)
  //this dot push is adding thingsto the array
}
var brokenBoatFrames=brokenboatSpriteData.frames
for(var i=0;i<brokenBoatFrames.length;i=i+1){
  var pos=brokenBoatFrames[i].position
  var img = brokenboatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
  brokenBoatAni.push(img)
  //this dot push is adding thingsto the array
}
var waterSplashFrames=waterSplashSpriteData.frames
for(var i=0;i<waterSplashFrames.length;i=i+1){
  var pos=waterSplashFrames[i].position
  var img = waterSplashSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
  waterSplashAni.push(img)
  //this dot push is adding thingsto the array
}

}

function draw() {
  image (backgroundIMG,0,0,1200,600);
  textSize(50)
  fill ("BLACK")
  text(`Score:${score}`,width-200,50)
  textAlign(CENTER,CENTER)
  if(!backgroundm.isPlaying()){
    backgroundm.play()
    backgroundm.setVolume(0.05)

  }
  Engine.update(engine);
  rectMode(CENTER)
  rect(ground.position.x,ground.position.y,width*2,1)
  push ()
  imageMode (CENTER)
  
  image (towerIMG,tower.position.x,tower.position.y,160,310)
  pop ()
  cannon.display()
  showBoats()
      for(var i=0;i<balls.length;i=i+1){
        showCannonBalls(balls[i],i)
        collisionWithBoat(i)
      }


}
function showCannonBalls(ball,i){
if(ball){
  ball.display()
  if(ball.body.position.x>=width || ball.body.position.y>=height-50){
    if(!ball.isSink){
      waterm.play()
      waterm.setVolume(0.05)
      ball.remove(i)
    }
    
  }
}

}
function showBoats(){
if(boats.length>0){
if(boats[boats.length-1].body.position.x<width-300||boats[boats.length-1]==undefined){
var positions=[-40,-60,-80,-20]
var position=random(positions)
var boat=new Boat(width-80,height-60,170,170,position,boatAni)
boats.push(boat)
}
for(var i=0;i<boats.length;i++){
  if(boats[i]){
    Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
    boats[i].display()
    boats[i].animate()
    var collision=Matter.SAT.collides(tower,boats[i].body)
  if(collision.collided&& !boats[i].isBroken){
    //laughing pirate
    if (!isLaughing && !laughm.isPlaying()){
      laughm.play()
      laughm.setVolume(0.05)
      isLaughing=true
    }
   isGameOver=true
   gameOver() 
  }
  }  
else{
    boats[i]
  }
}
}
else{
  var boat=new Boat(width-80,height-60,170,170,-80,boatAni)
  boats.push(boat)
}
}
function keyPressed(){
if(keyCode==32){
var  cannonball=new Cannonball(cannon.x,cannon.y)
balls.push(cannonball)
}
}


function keyReleased(){
  if(keyCode==32){
  balls[balls.length-1].shoot()
  cannonexplosionm.play()
  cannonexplosionm.setVolume(0.05)
  }
  }


function collisionWithBoat(index){
  for(var i=0;i<boats.length;i=i+1){
    if(balls[index] !== undefined && boats[i]!== undefined){
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){
        boats[i].remove(i)
        score=score+5
        Matter.World.remove(world,balls[index].body)
        delete balls[index]
      }
    }
  }

}

function gameOver(){
swal (
  {
    title:`Game Over hahahhahhahahahahahhaha!!! `,
    text:"Thanks for playing!",
    imageUrl:"https://ih1.redbubble.net/image.784963595.1221/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg",
    imageSize:"150x150",
    confirmButtonText:"Play again lol"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload()
    }
  }
)

}

