//const glob = require('./../gloval_vars.js')
class SlangWord{
    constructor(f,func){
        this.pos = createVector(random(0, width), random(-1500,-100));
        let z = random(0,80);
        let ys = map(z, 0, 80, 2, 10);
        this.speed = createVector(0,ys);
        //this.angle = 0;
        this.word = f;
        //this.func = func

    }

    update(){
        this.pos.add(this.speed);
        //this.angle += 0.01;
        if(this.pos.y > height + 50){
          this.pos.y = random(-1500,-100);
          this.pos.x = random(0,width);
          this.word = window._arr.returnRandomEntry().id;
        }
        //this.dist = map(mouseX,0 ,width, 0, 108);

    }

    show(){
      push();
        stroke(255, 20, 147);
        fill(255);
        textSize(30);
        text(this.word,this.pos.x, this.pos.y);

      pop();
  }

    resize(){
      this.pos.x = random(0, windowWidth);
    }
}
