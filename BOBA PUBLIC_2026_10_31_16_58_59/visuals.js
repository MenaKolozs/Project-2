//TO BE EDITED --> TITLE SCREEN______________________

//Title screen
function drawStartScreen() {
  fill(70, 45, 30);
  textSize(40);
  text("Boba Tea Tycoon", width / 2, height / 2 - 40);
  textSize(18);
  text("Match customer orders before time runs out!", width / 2, height / 2 + 10);
  textSize(15);
  text("Click anywhere to start", width / 2, height / 2 + 60);
}
  //____________________________________________ <--


//TO BE EDITED --> END SCREEN______________________
//End screen
function drawGameOverScreen() {
  fill(150, 50, 50);
  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 20);
  textSize(20);
  fill(50);
  text(`Final Score: ${score}`, width / 2, height / 2 + 30);
  textSize(15);
  text("Click to return to Start Screen", width / 2, height / 2 + 75);
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
  text(`Tea Base: ${currentCup.tea || 'Empty'}`, 40, 315);
  text(`Topping: ${currentCup.topping || 'None'}`, 40, 340);
  text(`Ice Level: ${currentCup.ice}`, 40, 365);
  text(`Sugar %: ${currentCup.sugar}`, 40, 390);
  textAlign(CENTER, CENTER);

  drawLiveGlassPreview(680, 340, currentCup);

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
