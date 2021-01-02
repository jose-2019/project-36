//Create variables here
var dog, happyDog, database, position, foodStock, feedPetButton, addFoodButton, fedTime, milkObj;
var feed,add,addFood,FeedTime,lastFed;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1300,800);

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
  milkObj = new Food();
  dog = createSprite(850,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  feed = createButton("FEED THE DOG");
  feed.position(850,95);
  feed.mousePressed(feedDog);

  add = createButton("ADD FOOD");
  add.position(1000,95);
  add.mousePressed(addFood)
}


function draw() {  
  background(46, 139, 87);

  milkObj.display();
  
  drawSprites();
  fill("red");
textSize(25);

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data)
{
  lastFed=data.val();
})

  if(lastFed>12){
    text("Last Feed:"+lastFed%12+"PM",200,30);
    }else if(lastFed==0){
    text("Last Feed : 12 AM",200,30);
    }else{
      text("Last Feed : "+lastFed+"AM",200,50)
    }
    }



function readStock(data){
  position = data.val();
  milkObj.updateFoodStock(position);
}

function writeStock(x){
  if(x>20){
    x=20;
  }else{
    x=x-1;
  }
  if(x<=0){
    x=20; 
  }
  
  database.ref('/').update({
    'Food':x
  })
}

function addFood(){
  position = position + 1;
  database.ref('/').update({
  Food:position
  })
}

function feedDog(){
    dog.addImage(happyDogImg);
    milkObj.updateFoodStock(milkObj.getFoodStock()-1);
    database.ref('/').update({
    Food:milkObj.getFoodStock(),
    FeedTime:hour()
  });
}






function showError(){
  console.log("Error in writing to the database");
}