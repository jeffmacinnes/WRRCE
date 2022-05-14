<script>
  import PortableText from "@portabletext/svelte";

  export let portableText;

  let listItems = portableText.block.children;
  listItems = listItems.map((d) => {
    let children = d.children.map((dd) => ({ ...dd, text: dd.text.replace(": ", "") }));
    return {
      ...d,
      children
    };
  });
</script>

<div class="tooltip-list">
  <PortableText blocks={listItems} />
</div>

<style lang="scss">
  .tooltip-list {
    :global(ul) {
      margin: 0px 15px;
      font-size: 14px;
      line-height: 1.1;
      // list-style-type: none;
    }

    :global(li) {
      margin: 10px 0px;
    }

    :global(strong) {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 800;
      line-height: 12px;
      margin: 0;

      &::after {
        content: "\a";
        white-space: pre;
      }
    }
  }
</style>
