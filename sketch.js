
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var boy,boyImg;
var tree,treeImg;
var mango1,mango2,mango3,mangoImg;
var stone, stoneImg;
var ground;

function preload()
{
	boyImg = loadImage("boy.png")
	treeImg = loadImage("tree.png")
	mangoImg = loadImage("mango.png")
	stoneImg = loadImage("stone.png")
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = createSprite(400,680,800,40)
	boy = createSprite(600,640,0,0)
	boy.addImage(boyImg)
	tree = createSprite(90,500,0,0)
	tree.addImage(treeImg)
	tree.scale = 0.3;
	boy.scale = 0.05;
	var mango_options = {
	  isStatic: true,
	  restitution: 0,
	  friction: 1,
	  fly()
	  { this.mango.bodyA = null; }
	}
	var stone_options = {
		isStatic: false,
		restitution: 0,
		friction: 1,
		density: 1.2,
		fly()
		{ this.stone.bodyA = null; }
	  }

	mango1 = createSprite(30,800,0,0,mango_options)
	mango2 = createSprite(50,900,0,0,mango_options)
	mango3 = createSprite(40,400,0,0,mango_options)
	mango1.addImage(mangoImg)
	mango2.addImage(mangoImg)
	mango3.addImage(mangoImg)

	mango1.scale = 0.05
	mango2.scale = 0.05
	mango3.scale = 0.05

	stone = createSprite(563,610,0,0)
	stone.addImage(stoneImg)
	stone.scale = 0.05

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
  ground.shapeColor = "green";

  if(keyDown("UP_ARROW")){
	 stone.velocityY = -6
  }

  if(keyDown("LEFT_ARROW")){
	stone.velocityX = -6
 }

  if(stone.x < 0){
	  reset();
  }

  if(stone.isTouching(mango1)){
    mango1.velocityY = 6;
  }
  if(stone.isTouching(mango2)){
    mango2.velocityY = 6;
  }
  if(stone.isTouching(mango3)){
    mango3.velocityY = 6;
  }

  mango1.collide(ground)
  mango2.collide(ground)
  mango3.collide(ground)

  drawSprites();
 
}
function mouseDragged(){
 Matter.Body.setPosition(stone.body,{x: mouseX , y: mouseY}); 
}
function mouseReleased(){ 
	boy.fly(); 
}

function reset(){
	stone.x = 563
	stone.y = 610
	stone.velocityX = 0;
	stone.velocityY = 0;
}
