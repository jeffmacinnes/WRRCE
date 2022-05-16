import { color } from "$data/variables.json";

let colors = [color.c4, color.c2, color.c3, color.a1];
let noiseScale = 10.1;

export class Circle {
  constructor(p5, x, y, cellSize, i) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.noiseStart = this.x * this.y;
    this.size = cellSize * 0.8;
    let tmpColor = colors[Math.floor(Math.random() * colors.length)];
    this.red = p5.red(tmpColor);
    this.green = p5.green(tmpColor);
    this.blue = p5.blue(tmpColor); // break it into array so can add opactity laer
    this.opacity = 1;
    this.step = 0;
  }

  update() {
    this.step += 0.002;
    let noise = this.p5.noise(this.noiseStart * noiseScale + this.step);
    this.opacity = this.p5.map(noise, 0.25, 0.75, 0, 255);

    if (this.opacity === 0) {
      let tmpColor = colors[Math.floor(Math.random() * colors.length)];
      this.red = p5.red(tmpColor);
      this.green = p5.green(tmpColor);
      this.blue = p5.blue(tmpColor); // break it into array so can add opactity laer
    }
  }

  display() {
    this.p5.push();
    this.p5.translate(this.x, this.y);

    this.p5.fill(this.red, this.green, this.blue, this.opacity);
    this.p5.noStroke();
    this.p5.ellipse(0, 0, this.size, this.size);

    this.p5.pop();
  }
}
