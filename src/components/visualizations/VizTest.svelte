<script>
  export let color = "#ff0";
  export let name = "";
</script>

<div class="vis-container" style:background={color}>
  <h1>{name}</h1>
</div>

<style>
  .vis-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
  }
</style>
