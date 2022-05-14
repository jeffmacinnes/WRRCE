<script>
  import PortableText from "@portabletext/svelte";

  import List from "./List.svelte";
  import ComplianceList from "./ComplianceList.svelte";

  export let tooltip;
  export let placement;
  export let x;
  export let y;

  let parsedContent = tooltip.content;

  let ListComponent = tooltip.variable === "complianceStatus" ? ComplianceList : List;
</script>

<div id="tooltip" class="tooltip-container shadow" style:top={y} style:left={x}>
  <PortableText
    blocks={parsedContent}
    serializers={{
      blockStyles: {
        list_bullet: ListComponent,
        list_number: ListComponent,
        listItem_bullet: ListComponent,
        listItem_number: ListComponent
      }
    }}
  />
</div>

<style lang="scss">
  .tooltip-container {
    position: absolute;
    max-width: 600px;
    background: var(--color-white);
    border: solid 1px var(--color-g3);
    color: var(--color-c3);
    padding: 20px 30px;
    border-radius: 5px;
    z-index: 1000;

    :global(p) {
      margin: 10px 0px !important;
    }
  }
</style>
