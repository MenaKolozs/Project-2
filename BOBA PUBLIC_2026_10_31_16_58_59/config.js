//Completed --> ______________________________________

p5.disableFriendlyErrors = true; // blocks internal variable name error

// Global Game State Variables
let activeOrders = [];
let maxOrders = 3;
let currentCup = { tea: null, topping: null, ice: "Regular", sugar: "100%" };
let score = 0;
let level = 1;
let gameState = "START"; //States: START, PLAY, GAMEOVER
let scoreToNextLevel = 50;
let lastSpawnTime = 0;
let spawnDelay = 4000; // Spawns a new ticket every 4 seconds (if space allows)
let buttons = [];

const ICE_LEVELS = ["None", "Regular", "Extra"];
const SUGAR_LEVELS = ["0%", "50%", "100%"];
//____________________________________________ <--


//TO BE EDITED --> __________________________________

// Menu & Aesthetics Configuration Models
const TEAS = {
  "Milk Tea": { color: "#D2B48C", name: "Milk Tea" },
  "Matcha Tea": { color: "#8FBC8F", name: "Matcha Tea" },
  "Taro Tea": { color: "#D8BFD8", name: "Taro Tea" }
};

const TOPPINGS = {
  "Tapioca Pearls": { 
    name: "Tapioca Pearls", 
    color: "#211308", 
    size: 13, 
    style: "pearl" 
  },
  "Popping Boba": { 
    name: "Popping Boba", 
    color: "#FF4500", 
    size: 11, 
    style: "popping" 
  }
};
//____________________________________________ <--