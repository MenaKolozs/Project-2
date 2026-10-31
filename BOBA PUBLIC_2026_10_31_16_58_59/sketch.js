//Completed --> ______________________________________

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  buildControlPanel(); // This runs builder from uiLayout.js
}

function draw() {
  background(245, 238, 228);
//State updater
  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAY") {
    drawGameScreen();
  } else if (gameState === "GAMEOVER") {
    drawGameOverScreen();
  }
}

function mousePressed() {
  if (gameState === "START") {
    gameState = "PLAY";
    score = 0;
    level = 1;
    activeOrders = [];
    resetCurrentCup();
    generateNewOrder();
    lastSpawnTime = millis();
    return;
  }

  if (gameState === "GAMEOVER") {
    gameState = "START";
    return;
  }

  // Global control panel panel interactivity
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      if (btn.type === 'tea') currentCup.tea = btn.value;
      if (btn.type === 'topping') currentCup.topping = btn.value;
      if (btn.type === 'ice') currentCup.ice = btn.value;
      if (btn.type === 'sugar') currentCup.sugar = btn.value;
      if (btn.type === 'trash') resetCurrentCup();
      return;
    }
  }

  // Match-ticket action clicks
  for (let i = 0; i < activeOrders.length; i++) {
    let ticketX = 20 + i * 260;
    let btnY = 190;
    if (mouseX >= ticketX + 10 && mouseX <= ticketX + 230 && mouseY >= btnY && mouseY <= btnY + 30) {
      serveSelectedTicket(i);
      return;
    }
  }
}

//____________________________________________ <--
