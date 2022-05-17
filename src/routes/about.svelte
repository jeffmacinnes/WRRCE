<script context="module">
  import { client } from "$utils/SanityClient";
  import { descending } from "d3";
  export async function load() {
    // ready copy from Sanity
    let query = "*[_id == 'aboutPage']";
    let results = await client.fetch(query);
    const copy = results[0];

    // read research papers from Sanity
    query = "*[_type == 'researchPapers']";
    results = await client.fetch(query);
    const articles = results
      .filter((d) => d.include === true)
      .sort((a, b) => descending(a.publicationDate, b.publicationDate));
    return {
      props: {
        copy,
        articles
      }
    };
  }
</script>

<script>
  import CTA from "$components/common/CTA.svelte";
  import Icon from "$components/helpers/Icon.svelte";

  import { color } from "$data/variables.json";
  import { getCodebookURL, getArticleURL } from "$data/download";
  import { downloadURL } from "$utils/downloadUtils";

  export let copy;
  export let articles;

  // prep copy
  let { heading, body, subheading, objectives, methods } = copy;
  body = body.split("\n").filter((d) => d.length > 0);
  methods = methods.split("\n").filter((d) => d.length > 0);

  const downloadCodebook = async () => {
    let url = await getCodebookURL();
    downloadURL(url, "WRRCE_codebook.pdf");
  };
</script>

<section class="about-container col-12">
  <!-- RELATED PAPERS -->
  <aside class="related-papers-container">
    <div class="title"><h4>Research articles</h4></div>
    {#each articles as article}
      <a class="article-container" href={getArticleURL(article)} target="_blank">
        <Icon name="file-text" width={24} height={24} color={color.c3} />
        <div class="text-content">
          <div class="heading">
            {`${article.publicationDate.split("-")[0]} - ${article.journal}`}
          </div>
          <div class="article-title">
            {article.title}
          </div>
        </div>
      </a>
    {/each}
  </aside>

  <div class="text-container">
    <!-- Intro -->
    <h1>{heading}</h1>
    <div>
      {#each body as text}
        <p class="body-lg">{@html text}</p>
      {/each}
    </div>

    <!-- Objectives -->
    <h3>{subheading}</h3>
    <ul class="objectives-list">
      {#each objectives as objective}
        <li class="body-lg">{@html objective}</li>
      {/each}
    </ul>

    <!-- Methods -->
    <div class="spacer" />
    <h1>Methods</h1>
    <div class="codebook-container">
      <CTA
        icon="file-text"
        text="Codebook and Methodology"
        iconFirst={true}
        color={color.c4}
        onClick={() => downloadCodebook()}
      />
      <i
        >Download the codebook for detailed information and sample coding rubrics for all of our
        coding</i
      >
    </div>
    {#each methods as text}
      <p class="body-rg">{@html text}</p>
    {/each}
  </div>
</section>

<style lang="scss">
  .about-container {
    position: relative;
    margin: 100px auto;
  }

  .text-container {
    grid-column: 5 / span 6;
  }

  .objectives-list {
    margin: 2em 0px;
    li {
      margin: 1em;
    }
  }

  .spacer {
    height: 2em;
  }

  .codebook-container {
    margin: 2em 0px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    i {
      margin: 1em 0;
      margin-bottom: 0;
    }
  }

  .sidebar {
    grid-column: 1 / span 3;
    height: 100%;
    background-color: aqua;
  }

  .related-papers-container {
    grid-column: 1 / span 3;
    align-self: start;
    position: sticky;
    top: 150px;
    min-height: 100px;
    padding: 10px;
    color: var(--color-c3);

    .title {
      display: block;
      padding: 3px 0;
      border-bottom: solid 1px var(--color-c3);
      color: var(--color-c3);
    }
  }

  .article-container {
    display: flex;
    gap: 10px;
    margin: 25px 0px;

    &:hover {
      opacity: 0.7;
    }

    .heading {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .article-title {
      font-weight: 300;
    }
  }
</style>
