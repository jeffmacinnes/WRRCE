<script>
  import { slide } from "svelte/transition";

  export let data = {};
  // export let idx;

  let isOpen = false;
  let { country, institution, year, complianceStatus, actionDisplay, precisionDisplay } = data;

  let expandedFields = {
    CEDAW: {
      minor: [
        { key: "id", display: "id" },
        { key: "documentname", display: "recommendation source" }
      ],
      major: [
        { key: "institutionDisplay", display: "institution" },
        { key: "recommendation", display: "recommendation" }
      ]
    },
    UPR: {
      minor: [
        { key: "id", display: "id" },
        { key: "session", display: "session" }
      ],
      major: [
        { key: "institutionDisplay", display: "institution" },
        { key: "recommendation", display: "recommendation" },
        { key: "recstate", display: "recommending state" }
      ]
    },
    ECtHR: {
      minor: [
        { key: "id", display: "id" },
        { key: "case", display: "judgment name" },
        { key: "finaljudgmentdate", display: "judgment date" }
      ],
      major: [
        { key: "institutionDisplay", display: "institution" },
        { key: "recommendation", display: "recommendation" },
        { key: "recSource", display: "recommendation source" }
      ]
    }
  };

  // --- Debugging ---
  // $: console.log("here", actionOpts);
</script>

<!-- Fixed Row -->
<tr class="fixed-row" class:expanded={isOpen}>
  <td class="expand-button" aria-expanded={isOpen} on:click={() => (isOpen = !isOpen)}>
    <svg
      style="tran"
      width="15"
      height="15"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      viewBox="0 0 24 24"
      stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
    ></td
  >
  <td>{country}</td>
  <td>{institution}</td>
  <td>{year}</td>
  <td class="compliance-status">{@html complianceStatus}</td>
  <td>{actionDisplay}</td>
  <td>{precisionDisplay}</td>
  <!-- <td class="index">{idx + 1}</td> -->
</tr>

<!-- Expanded Row -->
{#if isOpen}
  <tr class="expanded-row">
    <td />
    <td colspan="1">
      <div class="expanded-content-container minor" transition:slide={{ duration: 300 }}>
        {#each expandedFields[institution]["minor"] as item}
          <div>
            <div class="field-type">{item.display}</div>
            <div class="field-content">{data[item.key]}</div>
          </div>
        {/each}
      </div>
    </td>
    <td colspan="6">
      <div class="expanded-content-container major" transition:slide={{ duration: 300 }}>
        {#each expandedFields[institution]["major"] as item}
          <div>
            <div class="field-type">{item.display}</div>
            <div class="field-content">{data[item.key]}</div>
          </div>
        {/each}
      </div>
    </td></tr
  >
{/if}

<style lang="scss">
  tr {
    background-color: var(--color-white);
    border-bottom: solid 1px var(--color-c3);
    font-size: 14px;
    text-transform: uppercase;

    &.expanded {
      border-bottom: solid 1px var(--color-g2);
    }
  }

  td {
    vertical-align: middle;
  }

  .expanded-row {
    td {
      vertical-align: top;
    }
  }

  .expanded-content-container {
    width: 100%;
    margin: 10px 0px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    text-transform: none;

    &.minor {
      max-width: 150px;
    }

    &.major {
      max-width: 700px;
    }
  }

  .field-type {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-g4);
  }

  .expand-button {
    position: relative;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
  }

  svg {
    transition: transform 0.2s ease-in;
  }

  [aria-expanded="true"] svg {
    transform: rotate(0.25turn);
  }

  .compliance-status {
    font-size: 20px;
    vertical-align: middle;
    color: var(--color-a1);
  }

  .index {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-g3);
  }
</style>
