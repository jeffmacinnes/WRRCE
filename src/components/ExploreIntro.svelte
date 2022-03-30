<script>
  export let copy;
  let { heading, body } = copy;
</script>

<section class="explore-intro-container col-12">
  <div class="text-container">
    <h2>{heading}</h2>
    <p class="body-lg">{@html body}</p>
  </div>
</section>

<style lang="scss">
  .explore-intro-container {
    margin: 200px auto 100px;
  }

  .text-container {
    grid-column: 2 / span 8;
    grid-row: 1;

    p {
      width: 80%;
    }
  }
</style>
