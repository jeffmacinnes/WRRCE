<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { headerHeight } from "$stores/dataStores";
  import { fade } from "svelte/transition";

  import Logo from "$assets/WRRCE_logo_color.svg";
  import ShortLogo from "$assets/WRRCE_shortLogo.svg";

  const links = [
    { title: "Explore", path: "/#explore-anchor" },
    { title: "About", path: "/about" },
    { title: "Findings", path: "/findings" }
  ];

  let showFullLogo = true;
  onMount(() => {
    // window.onscroll = () => {
    //   let windowScrolled = window.scrollY > 50;
    //   if (showFullLogo && windowScrolled) {
    //     // toggle short logo ON
    //     showFullLogo = false;
    //     headerHeight.set(60);
    //   } else if (!showFullLogo && !windowScrolled) {
    //     // toggle full logo ON
    //     showFullLogo = true;
    //     headerHeight.set(100);
    //   }
    // };
  });
</script>

<nav>
  <div class="nav-container">
    {#if showFullLogo}
      <div transition={fade} class="logo-container" on:click={() => goto("/")}>
        <Logo />
      </div>
    {:else}
      <div transition={fade} class="logo-container" on:click={() => goto("/")}>
        <ShortLogo />
      </div>
    {/if}

    <div class="links-container">
      {#each links as link}
        <a
          class="link"
          class:active={`${$page.url.pathname}${$page.url.hash}` === link.path}
          href={link.path}>{link.title}</a
        >
      {/each}
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    position: sticky;
    top: 0;
    background-color: white;
    width: 100%;
    z-index: 100;
  }

  .nav-container {
    position: relative;
    max-width: 1600px;
    height: 100%;
    border-bottom: solid 1px var(--color-c4);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 auto;
    padding: 0px 40px 10px;
    transition: height 0.1s;
  }

  .logo-container {
    width: 250px;
    // height: 75px;
    margin-top: 10px;
    cursor: pointer;
  }

  .links-container {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

  .link {
    display: inline-block;
    position: relative;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 1.5%;
    text-transform: uppercase;
    color: var(--color-c4);

    &.active {
      font-weight: 700;
    }

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-c4);
      transform-origin: bottom left;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: bottom left;
      transition: transform 0.25s ease-out;
    }
  }
</style>
