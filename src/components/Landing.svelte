<script>
  import { goto } from "$app/navigation";
  import { color } from "$data/variables.json";

  import CTA from "$components/common/CTA.svelte";
  import LogoAnimation from "$components/LogoAnimation.svelte";

  export let copy;
  let { heading, body, links } = copy;
</script>

<section class="landing-container col-12">
  <div class="text-container">
    <h2>{heading}</h2>
    <p class="body-lg">{@html body}</p>
    <CTA icon="download" text="Download Dataset" iconFirst={true} color={color.c4} />
  </div>

  <div class="animation-container">
    <LogoAnimation />
  </div>

  {#each links as link, i}
    <div class={`link shadow link${i + 1}`}>
      <h5>{link.heading}</h5>
      <p class="body-rg">{@html link.body}</p>
      <CTA
        icon="arrow-right"
        text={link.linkText}
        iconFirst={false}
        color={color.white}
        onClick={() => goto(`/${link.linkTo.toLowerCase()}`)}
      />
    </div>
  {/each}
</section>

<style lang="scss">
  .landing-container {
    margin: 100px auto;
  }

  .text-container {
    grid-column: 2 / span 8;
    grid-row: 1;

    p {
      width: 80%;
    }
  }

  .animation-container {
    grid-column: 10 / span 2;
    grid-row: 1;
  }

  .link {
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin-top: 100px;
    min-height: 250px;
    background-color: var(--color-c4);
    color: var(--color-white);
    border-radius: 10px;
    // cursor: pointer;

    p {
      width: 80%;
    }

    &.link1 {
      grid-column: 2 / span 5;
    }

    &.link2 {
      grid-column: 7 / span 5;
    }
  }
</style>
