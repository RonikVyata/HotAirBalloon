var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var restart, restartImage;
var gamestate = "play";
var obsBottom1, obsBottom2, obsBottom3, obsTop1, obsTop2;
var bottomGroup, topGroup;
var die
var score = 0;


function preload(){
  bgImg = loadImage("assets/bg.png")
  restartImage = loadImage ("assets/restart.png");
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  obsBottom1 = loadImage ("assets/obsBottom1.png");
  obsBottom2 = loadImage ("assets/obsBottom2.png");
  obsBottom3 = loadImage ("assets/obsBottom3.png");
  obsTop1 = loadImage ("assets/obsTop1.png");
  obsTop2 = loadImage ("assets/obsTop2.png");
  die = loadSound ("assets/die.mp3")
}

function setup(){
  
  createCanvas(windowWidth-25, windowHeight-25);
  
  //background image
  bg = createSprite(width/2,height/2,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.6
  
  //creating top and bottom grounds
  bottomGround = createSprite(200,height-12,4700,20);
  bottomGround.visible = true;
  
  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
  
  //creating balloon
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.3;
  
  //creates restart button
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImage);
  restart.scale = 2.5
  
  bottomGroup = new Group();
  topGroup = new Group();
  
}

function draw() {
  
  background("black");
  
  if(gamestate === "play"){

    //We are adding score to the value and we are rounding it so there are no decimals
    score = score+Math.round(getFrameRate()/60);

    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -10 ;  
    }

    if(keyDown("UP_ARROW")) {
      balloon.velocityY = -19 ;  
    }
    
    //adding gravity
    balloon.velocityY = balloon.velocityY + 1.3;
    restart.visible = false;

    spawnTop();
    spawnBottom();

    if(balloon.isTouching(bottomGroup)||balloon.isTouching(topGroup)||balloon.y>height||balloon.y<0){
      gamestate = "end"
      die.play();
    }
  }

  else if(gamestate === "end"){

    textSize(50);
    fill("white");
    text("You Lost",width/2-70,height/2-100)
    text("Try Again",width/2-80,height/2-50)

    restart.visible = true;

    //Stopping Everything
    balloon.velocityY=0;
    topGroup.setVelocityXEach(0);
    bottomGroup.setVelocityXEach(0);
    

    if(mousePressedOver(restart)){
      reset();
    }
  }

  //creating gamestates
  drawSprites();

  textSize(22);
  fill("black");

  //The text which displays the score 
  text("Score :"+score,25,25);
}

function spawnTop(){
  if(frameCount%120 ===0){
    obsTop = createSprite(width,30);
    obsTop.velocityX = -4;
    obsTop.velocityX = -(5+score/100);
    obsTop.scale = 0.2;
    obsTop.y = Math.round(random (10,height/4));

    var r = Math.round(random(1,2));
    switch(r){
      case 1: obsTop.addImage(obsTop1);
      obsTop.setCollider("rectangle", 0,0,250,800);
      obsTop.debug=true
      break;
      case 2: obsTop.addImage(obsTop2);
      break;
      default:break;
    }

    obsTop.lifetime=width/4+100;
    topGroup.add(obsTop);
  }
}

function spawnBottom(){
if(frameCount%160 ===0){
    obsBottom = createSprite(width,30);
    obsBottom.velocityX = -4;
    obsBottom.velocityX = -(5+score/100);
    obsBottom.scale = 0.23 ;
    obsBottom.y = Math.round(random (height-199,height-200));
    
    var r = Math.round(random(1,3));
    switch(r){
      case 1: obsBottom.addImage(obsBottom1);        
      break;
      case 2: obsBottom.addImage(obsBottom2);
      break;
      case 3: obsBottom.addImage(obsBottom3);
      break;
      default:break;
    }

    obsBottom.lifetime=width/4+100;
    bottomGroup.add(obsBottom);
  }
}

function reset(){
  gamestate = "play";
  score = 0;
  topGroup.destroyEach();
  bottomGroup.destroyEach();
  balloon.x=100;
  balloon.y=200;
}