<script>
  export let text;
  export let x;
  export let y;
</script>

<div id="tooltip" class="tooltip-container shadow" style:top={y} style:left={x}>
  {text}
</div>

<style>
  .tooltip-container {
    position: absolute;
    background: var(--color-white);
    border: solid 1px var(--color-g3);
    color: var(--color-c3);
    padding: 10px;
    border-radius: 5px;
    z-index: 10;
  }
</style>
