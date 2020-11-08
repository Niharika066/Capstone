var tower, door, climber, ghost, invisibleBlock;
var towerImage, doorImage, climberImage, ghostImage;
var doorGroup, climberGroup, invisibleBlockGroup;

var gameState="Play";

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  doorGroup= new Group();
  climberGroup= new Group();
  invisibleBlockGroup= new Group();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=4;
  
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
}

function draw(){
 background(0);
  
  if(gameState==="Play"){
  if(tower.y>400){
  tower.y=300;
  }
  
  if(keyDown("d")){
   ghost.x=ghost.x+2;
  }
  
  if(keyDown("a")){
   ghost.x=ghost.x-2;
  } 
  
if(keyDown("space")){
  ghost.velocityY=-10;
}
   ghost.velocityY=ghost.velocityY+0.6;
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
ghost.destroy();
    gameState="End";
 }
 
  spawnDoor();
  drawSprites();
  } 
  if(gameState==="End"){
    textSize(50);
    text("GameOver",200,230);
  }
}

function spawnDoor(){
  if(frameCount%200===0){
 door=createSprite(200,-50);
 door.addImage(doorImage)
 door.x=Math.round(random(100,400));
 door.velocityY=4
  door.lifetime=500;
  doorGroup.add(door);
   
  climber=createSprite(400,10) 
  climber.addImage(climberImage);
  door.x=climber.x;
  climber.velocityY=4;
    climber.lifetime=500;
    climberGroup.add(climber);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=4;
    invisibleBlock.x=door.x;
    invisibleBlock.lifetime=500;
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
}
}