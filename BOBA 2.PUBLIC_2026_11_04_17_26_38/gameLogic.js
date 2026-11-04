//Completed --> ______________________________________

//Randomizer
function getRandomElement(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
} 

//Creates new order object and details
function generateNewOrder() {
  let teaKeys = Object.keys(TEAS);
  let toppingKeys = Object.keys(TOPPINGS);
  let duration = max(12, 25 - level * 2);
  
  let newOrder = {
    id: millis() + Math.random() * 1000,
    tea: getRandomElement(teaKeys),
    topping: getRandomElement(toppingKeys),
    ice: getRandomElement(ICE_LEVELS),
    sugar: getRandomElement(SUGAR_LEVELS),
    maxDuration: duration,
    timeLeft: duration,
    bornAt: millis()
  };

  if (activeOrders.length < maxOrders) {
    activeOrders.push(newOrder);
  }
}

//Rinse and repeat
function resetCurrentCup() {
  currentCup = { tea: null, topping: null, ice: "Regular", sugar: "100%" };
}

//Checks against active cup 
function serveSelectedTicket(index) {
  let target = activeOrders[index];
  if (
    currentCup.tea === target.tea &&
    currentCup.topping === target.topping &&
    currentCup.ice === target.ice &&
    currentCup.sugar === target.sugar
  ) {
    score += 15;
    if (score >= level * scoreToNextLevel) {
      level++;
    }
    activeOrders.splice(index, 1);
    resetCurrentCup();
  } else {
    score = max(0, score - 5);
  }
}

//____________________________________________ <--
