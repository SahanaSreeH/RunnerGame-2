var score = 0; 
var PLAY = 1, END = 0;
var gameState = PLAY;  
var deer, deerImg, snake, snakeImg, backgroundImg, forest;

function preload(){
backgroundImg = loadImage("images/background.jpg")
deerImg = loadImage("images/deer.png");
snakeImg = loadImage("images/snake.png");
forest = loadImage("images/forest.jpg");
}

function setup(){
  canvas = createCanvas(1200,700);

  deer = createSprite(200,530,50,80);
  deer.addImage(deerImg);
  deer.scale = 0.4;

  ground = createSprite(650, 585, 1300, 20);
  ground.visible = false;

  restart = createSprite(650,350,50,50);

  snakesGroup = new Group();
}

function draw(){
  background(forest);

  text("Score: "+ score, 1000, 50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  

    if(keyDown("space") && deer.y >= 159) {
      deer.velocityY = -12;
    }
  
    deer.velocityY = deer.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    deer.collide(ground);

    if(snakesGroup.isTouching(deer)){
      gameState = END;
  }

  restart.visible = false;

  spawnSnakes();
}

  else if (gameState === END) {
  
  ground.velocityX = 0;
  deer.velocityY = 0;
  snakesGroup.setVelocityXEach(0);
 
  snakesGroup.setLifetimeEach(-1);

  restart.visible = true;
  
  if(mousePressedOver(restart)) {
    reset();
  }
  }
  

  drawSprites();
  
}

function spawnSnakes(){
  if(frameCount % 60 === 0 ){
  snake = createSprite(1300,530,50,50);
  snake.addImage("monster",monsterImg);
  snake.scale = +8;

  var x = Math.round(random(500,1300));
  var y = Math.round(random(400,550));

  snake.velocityX = -(6 + 3*score/100);
  
  snake.lifetime = 300;  
  monstersGroup.add(monster);
  }
}

function reset(){
  gameState = PLAY;
  
  snakesGroup.destroyEach();

  score = 0;
  
}