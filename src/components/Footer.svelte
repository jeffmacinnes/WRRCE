<script>
  import { goto } from "$app/navigation";
  import { color } from "$data/variables.json";
  import { downloadData, getCodebookURL } from "$data/download";
  import { downloadURL } from "$utils/downloadUtils";

  import Logo from "$assets/WRRCE_logo_gray.svg";
  import BgDots from "$assets/bgDots.svg";
  import CTA from "$components/common/CTA.svelte";

  const downloadCodebook = async () => {
    let url = await getCodebookURL();
    downloadURL(url, "WRRCE_codebook.pdf");
  };
</script>

<footer>
  <div class="container">
    <div class="bg-image">
      <BgDots />
    </div>
    <div class="col col-1">
      <div class="logo-container" on:click={() => goto("/")}>
        <Logo />
      </div>
    </div>
    <div class="col col-2">
      <div class="block">
        <h5>Navigation</h5>
        <a class="link" href="/">Explore</a>
        <a class="link" href="/findings">Findings</a>
        <a class="link" href="/about">About</a>
      </div>
      <div class="block">
        <h5>Supplemental Material</h5>
        <CTA
          icon="download"
          text="Download Data"
          textClass="filters-cta"
          iconSize="1.3em"
          lineSize="1px"
          color={color.c1}
          iconFirst={true}
          onClick={() => downloadData()}
        />
        <div class="spacer" />
        <CTA
          icon="file-text"
          text="Codebook"
          textClass="filters-cta"
          iconSize="1.3em"
          lineSize="1px"
          iconFirst={true}
          color={color.c1}
          onClick={() => downloadCodebook()}
        />
      </div>
    </div>
    <div class="col col-3">
      <a class="link contact" href="mailto:womensrights.recommendations@gmail.com">Contact Us</a>
      <div>Copyright Ⓒ {new Date().getFullYear()}. All Rights Reserved</div>
      <a href="https://www.jeffmacinnes.com"
        ><div class="jm-logo">
          Site Design & Development:
          <span>Jeff MacInnes</span>
        </div>
      </a>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    width: 100%;
    height: 100%;
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: var(--color-c4);
    overflow: hidden;
  }

  .container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    padding: 50px;
    padding-bottom: 100px;
    display: flex;
    justify-content: space-between;

    // border: solid 1px white;
  }

  .bg-image {
    position: absolute;
    right: 50px;
    bottom: 0;
    opacity: 0.07;
    transform: rotate(90deg) scale(1.5);
  }

  .col {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    color: var(--color-c1);

    h5 {
      margin-bottom: 5px;
    }
  }

  .link {
    text-decoration: underline;
    margin-right: 5px;
  }

  .spacer {
    width: 10px;
    display: inline-block;
  }

  .logo-container {
    width: 250px;
    height: 75px;
    cursor: pointer;
  }

  .jm-logo {
    cursor: pointer;
    // text-transform: uppercase;
    font-size: 16px;

    span {
      display: block;
      text-decoration: underline;
    }

    * {
      margin-top: 5px;
    }
  }

  .col-2 {
    padding-left: 20px;
    border-left: solid 1px var(--color-c1);
  }

  .contact {
    font-size: 18px;
  }

  @media screen and (max-width: 1024px) {
    .container {
      flex-direction: column;
      gap: 50px;
    }

    .col {
      gap: 20px;
    }
  }
</style>
