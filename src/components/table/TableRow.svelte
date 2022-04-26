<script>
  import { slide } from "svelte/transition";

  export let data = {};
  export let idx;

  let isOpen = false;
  let { country, institution, year, complianceStatus, actionDisplay, precisionDisplay } = data;

  // --- Debugging ---
  // $: console.log("here", actionOpts);
</script>

<!-- Fixed Row -->
<tr class="fixed-row" class:collapsed={isOpen}>
  <td class="expand-button" on:click={() => (isOpen = !isOpen)}>{isOpen ? "-" : "+"}</td>
  <td>{country}</td>
  <td>{institution}</td>
  <td>{year}</td>
  <td class="compliance-status">{@html complianceStatus}</td>
  <td>{actionDisplay}</td>
  <td>{precisionDisplay}</td>
</tr>

<!-- Expanded Row -->
{#if isOpen}
  <tr class="expanded-row">
    <td />
    <td colspan="6">
      <div class="expanded-content-container" transition:slide={{ duration: 300 }} />
    </td>
  </tr>
{/if}

<style lang="scss">
  tr {
    background-color: var(--color-white);
    border-bottom: solid 1px var(--color-c3);
    font-size: 14px;
    text-transform: uppercase;
  }

  td {
    vertical-align: middle;
  }

  .fixed-row {
    // border: solid 1px red;
  }

  // .expanded-row {
  //   border: solid 1px blue;
  // }

  .expanded-content-container {
    width: 100%;
    height: 300px;
    background: purple;
  }

  .expand-button {
    position: relative;
    cursor: pointer;
    font-size: 20px;
    text-align: center;

    // &:after {
    //   position: absolute;
    //   left: 0.75rem;
    //   top: 50%;
    //   transform: translate(0, -50%);
    //   content: "+";
    // }
  }

  .compliance-status {
    font-size: 20px;
    vertical-align: middle;
    color: var(--color-a1);
  }
</style>
