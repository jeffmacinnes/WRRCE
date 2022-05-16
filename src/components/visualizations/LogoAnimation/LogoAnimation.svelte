<script>
  import P5 from "p5-svelte";
  import { color } from "$data/variables.json";

  import { Circle } from "./Circle";

  let width;
  $: height = 1.2 * width;
  let cellSize;

  const sketch = (p5) => {
    let currentW = width;
    let circles = [];
    cellSize = 35;
    let birthOdds = 0.3;

    const setupCircles = () => {
      circles = [];
      let i = 0;
      for (let x = 0; x + cellSize < width; x += cellSize) {
        for (let y = 0; y + cellSize < height; y += cellSize) {
          if (p5.random() < birthOdds) {
            circles.push(new Circle(p5, x + cellSize / 2, y + cellSize / 2, cellSize, i));
          }
        }
      }
    };

    const reset = () => {
      p5.resizeCanvas(width, height);
      currentW = width;
      setupCircles();
    };

    p5.setup = () => {
      p5.createCanvas(width, height);
      p5.smooth();

      // init all circles
      setupCircles();
    };

    p5.draw = () => {
      p5.background(255);

      // --- debug
      // p5.stroke("#0f0");
      // p5.fill(255);
      // p5.rect(0, 0, p5.width, p5.height);

      // p5.stroke("none");
      // p5.fill("#0f0");
      // p5.rect(0, 0, cellSize, cellSize);

      // --- listen for resize events
      if (currentW !== width) {
        reset();
      }

      // update all circles
      for (const c of circles) {
        c.update();
        c.display();
      }
    };
  };

  // $: w, sketch.resize();
</script>

<div bind:clientWidth={width} class="logo-animation-container">
  <P5 {sketch} />
</div>

<style>
  .logo-animation-container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    /* background-color: var(--color-a1); */
    margin: 3px;
    /* border: solid 1px red; */
  }
</style>
