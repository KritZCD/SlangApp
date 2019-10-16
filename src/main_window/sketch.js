let t = require('./SW.json')
var txt;
var flag = false;
let drops;
const sz = 50;


function setup() {
    window._arr = new SlangList();
    window._arr.Data = t;
    AddButton(_arr.Data);
    //list = new SlangList();
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("main");
    frameRate(120);
    //list.readfromArray(txt);
    drops = [];
    let word;
    for(let i = 0; i < sz; i++){
        word = window._arr.returnRandomEntry();
        drops.push(new SlangWord(word.id));
    }

}

function draw() {
  // put drawing code here
  background(51);
  for(let i of drops){
    i.show();
    i.update();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for(let i of drops){
    i.resize();
  }
}
