//Completed --> ______________________________________

//Control panel setup
function buildControlPanel() {
  buttons = [];
  let yStart = 420;

  // Row 1: Teas
  let x = 30;
  for (let teaKey in TEAS) {
    buttons.push({ x: x, y: yStart, w: 100, h: 35, label: teaKey, type: 'tea', value: teaKey });
    x += 110;
  }

  // Row 2: Toppings
  x = 30;
  for (let toppingKey in TOPPINGS) {
    buttons.push({ x: x, y: yStart + 45, w: 110, h: 35, label: toppingKey, type: 'topping', value: toppingKey });
    x += 120;
  }

  // Row 3: Ice 
  x = 30;
  for (let ice of ICE_LEVELS) {
    buttons.push({ x: x, y: yStart + 90, w: 70, h: 35, label: `${ice}`, type: 'ice', value: ice });
    x += 80;
  }

  // Row 4: Sugar %
  x = 300;
  for (let sugar of SUGAR_LEVELS) {
    buttons.push({ x: x, y: yStart + 90, w: 70, h: 35, label: `${sugar}`, type: 'sugar', value: sugar });
    x += 80;
  }

  // //Trash .util block
  buttons.push({ x: 620, y: 430, w: 150, h: 45, label: "TRASH CUP", type: 'trash', value: null });
}
