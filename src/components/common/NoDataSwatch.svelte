<script>
  import { onMount } from "svelte";
  import { color } from "$data/variables.json";
  import { select } from "d3";
  import textures from "textures";

  const landColor = "#e8e8e8";
  const texture = textures.lines().size(8).strokeWidth(1).stroke("#fff").background(landColor);
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };

  let node;

  onMount(() => {
    select(node).call(texture);
  });
</script>

<svg bind:this={node} width="150px" height="20px">
  <g transform={`translate(${margin.left}, ${margin.top})`}>
    <rect x={0} y={0} width="20" height="100%" stroke={color.g4} fill={texture.url()} />
    <text class="label" x="30" y="10" dominant-baseline="middle">Data Unavailable</text>
  </g>
</svg>

<style>
  .label {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 500;
    fill: var(--color-g5);
  }
</style>
