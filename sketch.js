var helicopterIMG, helicopter, package,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	
    package=createSprite(width/2, 80, 10,10);
	package.addImage(packageIMG)
	package.scale=0.2

	helicopter=createSprite(width/2, 200, 10,10);
	helicopter.addImage(helicopterIMG)
	helicopter.scale=0.6

	ground=createSprite(width/2, height-35, width,10);
	ground.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	var ground_options = {
       restitution: 1.0 
	}
     
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:3, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

     var package_options = {
       restitution: 1.0
	 }

	Engine.run(engine);
  
}


function draw() {
  background(0);
  Engine.update(engine)
  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,800,20);
  
  ellipseMode(radius);
  ellipse(package.position.x,package.position.y,20,20);

  package.x= packageBody.position.x 
  package.y= packageBody.position.y 
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	
	function bounceOff(package,ground) {
		if (package.x - ground.x < ground.width/2 + package.width/2
		  && ground.x - package.x < ground.width/2 + package.width/2) {
		package.velocityX = package.velocityX * (-1);
		ground.velocityX = ground.velocityX * (-1);
	  }
	  if (package.y - ground.y < ground.height/2 + package.height/2
		&& ground.y - package.y < ground.height/2 + package.height/2){
		package.velocityY = package.velocityY * (-1);
		ground.velocityY = ground.velocityY * (-1);
		}
    
	package.velocityY = -3;
	Matter.body.static(packageSprite,false);
	bounceOff(package , ground);
	package.setScale = 0.15;
    
  }
}


}
