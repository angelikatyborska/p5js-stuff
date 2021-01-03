const p5 = require('p5');

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(800, 800);
  }

  s.draw = () => {
    if (s.mouseIsPressed) {
      s.fill(0);
    } else {
      s.fill(255);
    }
    s.ellipse(s.mouseX, s.mouseY, 80, 80);
  }
}

new p5(sketch);
