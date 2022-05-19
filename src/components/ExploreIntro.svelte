<script>
  import mq from "$stores/mq.js";

  export let copy;
  let { heading, body } = copy;

  let mobileText =
    "The Recommendations & Compliance Database Explorer offers custom visualizations and filtering options on a dataset of nearly 4000 recommendations. It is designed to work on screens with a minimum resolution of 1024 pixels wide. Please visit the desktop version of the site to use the Explorer";
  $: body = $mq.md || $mq.sm ? mobileText : body;
</script>

<section class="explore-intro-container col-12">
  <!-- <div id="explore-anchor" /> -->
  <div class="text-container">
    <h2>{heading}</h2>
    <p class="body-lg">{@html body}</p>
    <div id="explore-anchor" />
  </div>
</section>

<style lang="scss">
  .explore-intro-container {
    margin: 200px auto 100px;
  }

  // #explore-anchor {
  //   position: relative;
  //   top: -200px;
  //   width: 20px;
  //   height: 20px;
  //   background-color: red;
  // }

  .text-container {
    grid-column: 2 / span 8;
    grid-row: 1;

    p {
      width: 80%;
    }
  }

  #explore-anchor {
    width: 10px;
    height: 10px;
    opacity: 0;
  }

  @media screen and (max-width: 600px) {
    .text-container {
      grid-column: 2 / span 10;
    }
  }
</style>
