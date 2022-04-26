<script>
  import { slide } from "svelte/transition";
  import { filterOpts } from "$stores/dataStores.js";

  export let data = {};

  const actionOpts = $filterOpts
    .find((d) => d.name === "action")
    .opts.map((d) => ({ ...d, display: d.display.replace(/[0-9]\s-\s/g, "") }));
  const precisionOpts = $filterOpts
    .find((d) => d.name === "precision")
    .opts.map((d) => ({ ...d, display: d.display.replace(/[0-9]\s-\s/g, "") }));

  let isOpen = false;

  let cells = {
    country: data.country,
    institution: data.institution,
    year: data.year,
    complianceStatus: 3,
    action: actionOpts.find((d) => d.name === data.action).display,
    precision: precisionOpts.find((d) => d.name === data.precision).display
  };

  // --- Debugging ---
  // $: console.log("here", actionOpts);
</script>

<!-- Fixed Row -->
<tr class="fixed-row" class:collapsed={isOpen}>
  <td class="expand-button" on:click={() => (isOpen = !isOpen)} />
  <td>{cells.country}</td>
  <td>{cells.institution}</td>
  <td>{cells.year}</td>
  <td>{cells.complianceStatus}</td>
  <td>{cells.action}</td>
  <td>{cells.precision}</td>
</tr>

<!-- Expanded Row -->
{#if isOpen}
  <tr class="expanded-row">
    <td />
    <td colspan="5">
      <div class="expanded-content-container" transition:slide={{ duration: 300 }} />
    </td>
  </tr>
{/if}

<style lang="scss">
  .fixed-row {
    // border: solid 1px red;
  }

  .expanded-row {
    border: solid 1px blue;
  }

  .expanded-content-container {
    width: 100%;
    height: 300px;
    background: purple;
  }

  .expand-button {
    position: relative;
    cursor: pointer;

    &:after {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translate(0, -50%);
      content: "-";
    }
  }
</style>
