<script>
  export let feature;
  export let x;
  export let y;

  const { nRecs } = feature.properties;

  let text = "";
  $: if (nRecs === null) {
    text = "No Data Available";
  } else {
    text = `${nRecs} Recommendation${nRecs !== 1 ? "s" : ""}`;
  }
</script>

<div id="tooltip" class="tooltip-container shadow" style:top={y} style:left={x}>
  <div class="country-name">{feature.properties.name}</div>
  <div>{text}</div>
</div>

<style lang="scss">
  .tooltip-container {
    position: absolute;
    background: var(--color-white);
    border: solid 1px var(--color-g3);
    color: var(--color-c3);
    padding: 10px;
    border-radius: 5px;
    z-index: 10;
  }

  .country-name {
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.005em;
    margin-bottom: 10px;
  }
</style>
