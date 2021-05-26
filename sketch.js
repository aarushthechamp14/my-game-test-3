const Engine = Matter.Engine
const World  = Matter.World
const Bodies = Matter.Bodies
var engine;
var world;

var PLAY = 1;
var END = 0;

var player;
var background,backgroundImg,background2,backgroundImg2;
var block,blockImage;
var ground;
var invisibleGround;
var spikes,spikesImg;
var obstacleGroup;
var coin,coinImg,coinGroup;
var score;

var gameState = PLAY;

function preload(){
    backgroundImg = loadImage("images/startingPoint.png");
    backgroundImg2 = loadImage("images/beach.png");
    blockImage = loadImage("images/block.png")
    spikesImg = loadImage("images/spike.png")
    coinImg = loadImage("images/goldCoin.png")
}

function setup(){
 createCanvas(1370,700);
engine = Engine.create()
world  = engine.world


 ground = createSprite(300,300,1300,700)

 ground.addImage(backgroundImg2);
 ground.scale = 1.5
 //background = createSprite(1000,375);
 ground.x = ground.width/2
 ground.velocityX =-3
 player = createSprite(100,650,20,20);
 invisibleGround = createSprite(100,650,1370,30);
 invisibleGround.visible = false;

 obstacleGroup = new Group();
 coinGroup = new Group();
 score = 0;
}

function draw(){
    background(0)
    Engine.update(engine);
   // ellipseMode(CENTER);

   // ellipse(player.position.x,player.position.y,20,20)

   if(gameState === 1){
    //   background(backgroundImg2);
    if(keyDown(LEFT_ARROW)){
        player.x = player.x - 10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x = player.x + 10;
  }
    if(keyDown(UP_ARROW)){
        player.y = player.y -10
    }
    if(keyDown(DOWN_ARROW)){
        player.y = player.y +10
    }
    if(ground.x < 100){
        ground.x = ground.width/2
    }
    
    spawnObstacle();
    spawnCoins();
   if(obstacleGroup.isTouching(player)){
       gameState = 0
   }
   if(coinGroup.isTouching(player)){
       score = score + 100;
   }
    player.collide(invisibleGround);
   }
   else if(gameState === 0){

   }
  
  drawSprites();
  text("score:"+ score,685,50)
}

function spawnObstacle(){
    if(frameCount%200 === 0 ){
        block = createSprite(700,500,20,20)
        
       // block.addImage(blockImage)
        block.velocityX =-4
       
        var rand = Math.round(random(1,2))
        switch(rand){
            case 1: block.addImage(blockImage)
            block.scale = 0.2
            break
            case 2: block.addImage(spikesImg)
            block.scale = 0.5
            break
            default:break
            
            
        }
        console.log(rand);
        obstacleGroup.add(block)
    }

}

function spawnCoins(){
    if(frameCount%250 === 0 ){
        coin = createSprite(700,500,20,20)
        coin.addImage(coinImg)
        coin.scale = 0.3
       // block.addImage(blockImage)
        coin.velocityX =-5
       
         coin.y = Math.round(random(400,100))
        
      
        coinGroup.add(coin)
    }
}