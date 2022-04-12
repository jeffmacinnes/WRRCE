<script>
  export let feature;
  export let x;
  export let y;
</script>

<div id="tooltip" class="tooltip-container" style:top={y} style:left={x}>
  <h1>{feature.properties.name}</h1>
  <div>{x} {y}</div>
</div>

<style lang="scss">
  .tooltip-container {
    position: absolute;
    background: red;
    color: white;
  }
</style>
