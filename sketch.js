var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var restartImg, gameoverImg;

var Gameover, Restart;

function preload(){
  
  //Loading all the images and animations
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  
}

function setup() {

  //Creating a canvas
  createCanvas(600, 200);
  
  //Creating a trex sprite and adding its animation with size
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  //Creating a ground sprite and adding its image with size
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  //Creating a gameover sprite and adding its image with size
  Gameover = createSprite(300,100);
  Gameover.addImage(gameoverImg);
  Gameover.scale = 0.5;

  //Creating a restart sprite and adding its image with size
  Restart = createSprite(300,140);
  Restart.addImage(restartImg);
  Restart.scale = 0.5;

  //Creating a invisible ground sprite and adding its image with visible as false
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //Creating different groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  //Setting score
  score = 0;
}

function draw() {

  //Giving background color
  background(180);

  //Placing score on page
  text("Score: "+ score, 500,50);
  
  
  //If the gamestate is play state
  if(gameState === PLAY){
    
    //Setting visibility false for gameover and restart
    Gameover.visible = false;
    Restart.visible = false;

    //Setting velocity for ground
    ground.velocityX = -4;
   
    //Defining the score
    score = score + Math.round(frameCount/60);
    
    //Giving ground velocity x half its width
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //If space is clicked the trex should jump
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //Setting velocity y for trex
    trex.velocityY = trex.velocityY + 0.8
  
    //spawning clouds
    spawnClouds();
  
    //spawning obstacles
    spawnObstacles();
    
    //If obstacles group is touching trex
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      
      Gameover.visible = true;
      Restart.visible = true;

      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //Trex colling with invisible ground
  trex.collide(invisibleGround);
  
  drawSprites();
}

//Define function to spawn clod
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   //Giving obstacles size and lifetime
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    //Adding obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

//Define function spawn clouds
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
   
    //Giving cloud lifetime, depth, and adding it to a group
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

