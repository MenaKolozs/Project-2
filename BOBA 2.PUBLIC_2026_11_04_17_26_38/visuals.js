let font1
let font2

async function setup() {
  createCanvas(800, 600);

  font1 = await loadFont('Bobatime-Regular.ttf')
  font2 = await loadFont('New Boba.ttf')
}
//TO BE EDITED --> TITLE SCREEN______________________

//Title screen
function drawStartScreen() {
  background('#F7DBA7');
  
  push()
  fill('#D17A22')
  noStroke()
  beginShape()
  splineVertex(690,580)
  splineVertex(670,265)
  splineVertex(720,180)
  splineVertex(620,120)
  splineVertex(540,200)
  splineVertex(450,190)
  splineVertex(460,290)
  endShape(CLOSE)
  pop()

  push()
  fill('#D17A22')
  noStroke()
  circle(640,80,18)
  circle(310,240,12)
  circle(750,140,15)
  pop()

  push()
  noStroke()
  fill('#4C061D')
  circle(650,500,20)
  circle(670,457,25)
  circle(630,450,23)
  circle(580,400,21)
  circle(520,300,25)
  circle(640,350,24)
  circle(700,200,30)
  circle(610,180,26)
  circle(500,220,33)
  circle(450,270,30)
  circle(380,200,38)
  pop()

  push()
  strokeWeight(7)
  stroke('#71092C')
  fill('#4C061D')
  circle(200,170,100)
  pop()

  push()
  stroke('#71092C')
  strokeWeight(10)
  line(175,175,180,150)
  pop()

  push()
  translate(575,49)
  rotate(-.2)
  strokeWeight(5)
  stroke('#8E2937')
  fill('#A4303F')
  rect(-30,0,40,300,10)
  pop()
  
  push()
  fill('#9CAFB790')
  stroke('#9CAFB7')
  strokeJoin(ROUND)
  strokeWeight(7)
  quad(500,370,680,260,790,530,680,590)
  pop()

  push()
  textFont(font1)
  fill('#381D2A')
  textSize(200)
  translate(20,200)
  rotate(-0.3)
  text("B   BA",20,100)
  pop()

  push()
  textFont(font1)
  fill('#381D2A')
  textSize(175)
  translate(20,200)
  rotate(-0.3)
  text("TEA",60,220)
  pop()

  push()
  textFont(font1)
  fill('#381D2A')
  textSize(100)
  translate(20,200)
  rotate(-0.3)
  text("TYCOON",50,290)
  pop()

  push()
  textFont(font2)
  fill('#381D2A')
  textSize(30)
  text("Match custom orders before time runs out!",50,520)
  pop()

  push()
  if (frameCount % 60 < 30) {
  textFont(font2)
  fill('#E25B12')
  textSize(25)
  text("Click anywhere to start",185,575)
  }
  pop()
}

//end screen
function drawGameOverScreen() {
  background('#F7DBA790');

  push()
  textFont(font1)
  fill('#381D2A')
  textSize(150)
  textAlign(CENTER,CENTER)
  text("GAME OVER", width / 2, height / 2 - 100);
  pop()
  
  push()
  textFont(font2)
  textAlign(CENTER,CENTER)
  textSize(40);
  fill(50);
  text(`Final Score: ${score}`, width / 2, height / 2 - 20);
  pop()

  push()
  beginShape()
  noStroke()
  fill('#D17A22')
  splineVertex(480,400)
  splineVertex(400,350) 
  splineVertex(280,370) 
  splineVertex(200,420)
  splineVertex(230,480) 
  splineVertex(340,500)
  splineVertex(480,460) 
  splineVertex(510,440)
  endShape(CLOSE)
  triangle(500,450,520,450,510,440)
  pop()

  push()
  noStroke()
  fill('#4C061D')
  circle(480,450,13)
  circle(450,407,15)
  circle(430,400,13)
  circle(380,350,14)
  circle(420,450,15)
  circle(250,470,14)
  circle(200,450,20)
  circle(310,370,16)
  circle(400,470,21)
  circle(300,420,13)
  circle(340,450,23)
  pop()
  
  push()
  fill('#9CAFB790')
  stroke('#9CAFB7')
  strokeJoin(ROUND)
  strokeWeight(7)
  quad(705,350,700,450,500,450,505,325)
  pop()

  push()
  strokeWeight(5)
  stroke('#8E2937')
  fill('#A4303F')
  translate(200,425)
  rotate(.1)
  rect(-20,-50,200,25,5)
  pop()
  
  push()
  fill('#381D2A')
  textFont(font2)
  textAlign(CENTER,CENTER)
  if (frameCount % 60 < 30){
  textSize(30);
  text("Click to return to Start Screen", width / 2, height / 2 + 250);
  }
  pop()
}
  //____________________________________________ <--


//TO BE EDITED --> GAME SCREEN______________________
function drawGameScreen() {
  // Timer calculations and ticket queue execution
  if (millis() - lastSpawnTime >= spawnDelay) {
    if (activeOrders.length < maxOrders) generateNewOrder();
    lastSpawnTime = millis();
  }
  if (activeOrders.length === 0) {
    generateNewOrder();
    lastSpawnTime = millis();
  }

  for (let i = activeOrders.length - 1; i >= 0; i--) {
    let elapsed = (millis() - activeOrders[i].bornAt) / 1000;
    activeOrders[i].timeLeft = activeOrders[i].maxDuration - elapsed;
    if (activeOrders[i].timeLeft <= 0) {
      activeOrders.splice(i, 1);
      score = max(0, score - 10);
      if (activeOrders.length === 0 && score <= 0) { gameState = "GAMEOVER"; }
    }
  }
    //____________________________________________ <--

  //TO BE EDITED --> DASH VIEW______________________

  // Header Dashboard View
  fill(60, 40, 25);
  rect(0, 0, width, 55);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Score: ${score}`, 30, 27);
  text(`Level: ${level}`, 200, 27);
  textAlign(CENTER, CENTER);

  // Active Tickets Loop
  for (let i = 0; i < activeOrders.length; i++) {
    drawOrderTicket(20 + i * 260, 75, activeOrders[i]);
  }

  stroke(210);
  strokeWeight(2);
  line(0, 250, width, 250);
  noStroke();

  // Workbench Environment Text
  fill(90, 65, 50);
  textSize(18);
  text("Boba Mixing Station", 220, 280);
  fill(50);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(`Tea Base: ${currentCup.tea || 'Empty'}`, 12, 315);
  text(`Topping: ${currentCup.topping || 'None'}`, 12, 340);
  text(`Ice Level: ${currentCup.ice}`, 12, 365);
  text(`Sugar %: ${currentCup.sugar}`, 12, 390);
  textAlign(CENTER, CENTER);

  drawLiveGlassPreview(680, 340, currentCup);

  for (let i = 0; i < ingredientnamesRectangles.length; i++) {
    const rectInfo = ingredientnamesRectangles[i];
    noStroke();
    fill(60, 40, 25);
    rect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h, 6);

    fill(255);
    textSize(14);
    text(ingredientNames[i], rectInfo.x + rectInfo.w / 2, rectInfo.y + rectInfo.h / 2);
}

  // Render selection interface controls
  for (let btn of buttons) {
    let isSelected = false;
    if (btn.type === 'tea' && currentCup.tea === btn.value) isSelected = true;
    if (btn.type === 'topping' && currentCup.topping === btn.value) isSelected = true;
    if (btn.type === 'ice' && currentCup.ice === btn.value) isSelected = true;
    if (btn.type === 'sugar' && currentCup.sugar === btn.value) isSelected = true;
    
    if (isSelected) {
      fill(180, 230, 180);
      stroke(50, 150, 50);
      strokeWeight(2);
    } else {
      fill(255);
      stroke(200);
      strokeWeight(1);
    }
    if (btn.type === 'trash') {
      fill(255, 200, 200);
      stroke(200, 50, 50);
    }
    rect(btn.x, btn.y, btn.w, btn.h, 6);
    noStroke();
    fill(40);
    textSize(12);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }
}
  //____________________________________________ <--

  //TO BE EDITED --> ORDER TICKET
function drawOrderTicket(x, y, order) {
  fill(255);
  stroke(200);
  strokeWeight(1);
  if (order.timeLeft < 5) {
    stroke(255, 100, 100);
    strokeWeight(2);
  }
  rect(x, y, 240, 160, 8);
  noStroke();

  let pct = max(0, order.timeLeft / order.maxDuration);
  if (pct > 0.4) {
    fill(100, 200, 100);
  } else {
    fill(230, 100, 100);
  }
  rect(x + 10, y + 10, 220 * pct, 6, 2);

  fill(40);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(`Base: ${order.tea}`, x + 15, y + 35);
  text(`Top: ${order.topping}`, x + 15, y + 58);
  text(`Ice: ${order.ice}`, x + 15, y + 81);
  text(`Sugar: ${order.sugar}`, x + 15, y + 104);

  fill(130, 200, 240);
  rect(x + 10, y + 120, 220, 30, 4);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("MATCH & SERVE THIS TICKET", x + 120, y + 135);
}
//__________________________________________ <--

  //TO BE EDITED --> ORDER TICKET
function drawOrderTicket(x, y, order) {
  //ticket shadow
  push()
  noStroke()
  fill('#38192A50')
  rect(x + 4, y + 5, 240, 160, 8)
  pop()
 
  //ticket paper
  push()
  fill('#FFF3D6')
  stroke('#71092C')
  strokeWeight(2)
  if (order.timeLeft < 5) {
    stroke('#E25B12')
    strokeWeight(4)
  }
  rect(x, y, 240, 160, 8)
  pop()
 
  //striped top
  push()
  noStroke()
  for (let i = 0; i < 16; i++) {
    if (i % 2 == 0) {
      fill('#A4303F')
    } else {
      fill('#F7DBA7')
    }
    rect(x + 8 + i * 14, y + 8, 14, 14)
  }
  noFill()
  stroke('#71092C')
  strokeWeight(2)
  rect(x + 8, y + 8, 224, 14)
  pop()
 
  //timer bar
  push()
  noStroke()
  let pct = max(0, order.timeLeft / order.maxDuration);
  fill('#E8CFA0')
  rect(x + 10, y + 28, 220, 6, 3)
  if (pct > 0.4) {
    fill('#D17A22')
  } else {
    fill('#A4303F')
  }
  rect(x + 10, y + 28, 220 * pct, 6, 3)
  pop()
 
  //order lines
  push()
  //textFont(font2)  <-- turn on once the fonts are loaded
  textSize(15)
  textAlign(LEFT, CENTER)
  fill('#381D2A')
  text(`Base: ${order.tea}`, x + 15, y + 50)
  text(`Top: ${order.topping}`, x + 15, y + 67)
  text(`Ice: ${order.ice}`, x + 15, y + 84)
  text(`Sugar: ${order.sugar}`, x + 15, y + 101)
  pop()
 
  //lines under the order
  push()
  stroke('#E8CFA0')
  strokeWeight(1)
  line(x + 15, y + 59, x + 225, y + 59)
  line(x + 15, y + 76, x + 225, y + 76)
  line(x + 15, y + 93, x + 225, y + 93)
  pop()
 
  //tear line
  push()
  stroke('#71092C')
  strokeWeight(2)
  for (let i = 0; i < 11; i++) {
    line(x + 14 + i * 20, y + 114, x + 22 + i * 20, y + 114)
  }
  noStroke()
  fill('#F7DBA7')
  circle(x, y + 114, 14)
  circle(x + 240, y + 114, 14)
  pop()
 
  //serve button
  push()
  fill('#E25B12')
  stroke('#71092C')
  strokeWeight(2)
  rect(x + 10, y + 122, 220, 28, 14)
  pop()
 
  push()
  //textFont(font2)  <-- turn on once the fonts are loaded
  fill('#FFF3D6')
  textSize(15)
  textAlign(CENTER, CENTER)
  text("MATCH & SERVE THIS TICKET", x + 120, y + 136)
  pop()
}



  //TO BE EDITED --> GLASS PREVIEW___________________

function drawLiveGlassPreview(x, y, cup) {
  // Straw
  fill(240, 128, 128);
  rect(x - 6, y - 80, 12, 100, 2);
  
  // Outer Cup Outline Layout Frame
  stroke(140, 140, 140, 110);
  strokeWeight(3);
  fill(255, 255, 255, 90);
  quad(x - 45, y - 50, x + 45, y - 50, x + 32, y + 60, x - 32, y + 60);
  noStroke();

  // Tea Liquid Fill
  if (cup.tea) {
    fill(TEAS[cup.tea].color);
    quad(x - 41, y - 10, x + 41, y - 10, x + 31, y + 58, x - 31, y + 58);
  }

  // Topping Graphic Render Pipeline
  if (cup.topping) {
    let top = TOPPINGS[cup.topping];
    randomSeed(99); 
    
    for (let i = 0; i < 14; i++) {
      let tx = random(x - 24, x + 24);
      let ty = random(y + 25, y + 52);

      if (top.style === "pearl") {
        fill(top.color);
        circle(tx, ty, top.size);
        fill(255, 255, 255, 180);
        circle(tx - 3, ty - 3, top.size * 0.25); 
      } 
      else if (top.style === "popping") {
        fill(top.color);
        circle(tx, ty, top.size);
        fill(255, 200, 150, 150);
        circle(tx + 1, ty - 1, top.size * 0.5);
      }
    }
  }

  // Ice Matrix Render Blocks
  if (cup.ice !== "None") {
    let iceCount = cup.ice === "Regular" ? 3 : 5;
    randomSeed(42); 
    
    for (let i = 0; i < iceCount; i++) {
      let ix = random(x - 25, x + 10);
      let iy = random(y - 15, y + 20);
      let rotation = random(-0.3, 0.3);
      
      push();
      translate(ix, iy);
      rotate(rotation);
      
      stroke(180, 220, 240, 200);
      strokeWeight(1.5);
      fill(220, 240, 255, 130);
      rect(0, 0, 18, 18, 4);
      
      noStroke();
      fill(255, 255, 255, 180);
      rect(2, 2, 4, 4, 1);
      
      pop();
    }
  }
}
//__________________________________________ <--
