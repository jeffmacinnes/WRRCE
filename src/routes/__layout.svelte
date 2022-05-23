<script context="module">
  // Pass the key of the current path for the transitions
  // export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
  import "$styles/app.css";
  import Footer from "$components/Footer.svelte";
  import Navigation from "$components/Navigation.svelte";
  import Meta from "$components/Meta.svelte";

  import PageTransition from "$components/helpers/PageTransition.svelte";

  let description =
    "Tracking Compliance with Women's Rights Recommendations throughout Europe. New data and analytical tools to help scholars, practitioners and other stakeholders better understand how international human rights recommendations become reality";
  let url = "https://www.wrrce.org";
  let w;
</script>

<Meta {url} {description} />
<main id="content" bind:clientWidth={w}>
  <Navigation />
  <div class="bg" style:width={`${w}px`} style:height={`${w}px`} />
  <!-- <PageTransition {url}> -->
  <slot />
  <Footer />
  <!-- </PageTransition> -->
</main>

<style>
  .bg {
    position: fixed;
    max-width: 1200px;
    max-height: 1200px;
    top: 0;
    left: 50%;
    border-radius: 50%;
    background-color: var(--color-a1);
    /* background: linear-gradient(to left bottom, var(--color-a1), var(--color-white)); */
    transform: translate(-100%);
    opacity: 15%;
    z-index: -1;
  }
</style>
