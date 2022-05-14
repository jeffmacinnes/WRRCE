<script>
  import { slide, fade } from "svelte/transition";
  import { extent } from "d3-array";
  import { color } from "$data/variables.json";
  import { tooltip } from "$actions/tooltip";

  import Checkbox from "$components/common/Checkbox.svelte";
  import RangeSelector from "$components/common/RangeSelector.svelte";
  import Icon from "$components/helpers/Icon.svelte";
  import VariableTooltip from "$components/tooltips/variables/VariableTooltip.svelte";

  export let name;
  export let display;
  export let isOpen;
  export let opts;
  export let onToggle;
  export let onOptsUpdate;
  export let tooltipContent;

  // -- calculate the type of filter it is
  $: type = name === "year" ? "slider" : "checkbox";

  let isHovered = false;

  // -- calculate if any options are selected
  $: anySelected = opts.filter((opt) => opt.isSelected).length > 0;

  const handleToggleCheckbox = (e) => {
    let opt = opts.find((d) => d.name === e.detail.name);
    onOptsUpdate(name, [opt], [!opt.isSelected]);
  };

  // --- Slider Specific Parameters ------
  let sliderMin;
  let sliderMax;
  let sliderValues; // current values to set the slider at
  $: if (type === "slider") {
    let possibleValues = opts.map((d) => d.name);
    [sliderMin, sliderMax] = extent(possibleValues);
    let selectedVals = opts.filter((d) => d.isSelected).map((d) => d.name);
    sliderValues = selectedVals.length === 0 ? [sliderMin, sliderMax] : extent(selectedVals);
  }

  const handleRangeUpdate = (e) => {
    let newVals = e.detail.values;
    if (JSON.stringify(newVals) === JSON.stringify([sliderMin, sliderMax])) {
      // deselect all if slider is at min/max limits
      onOptsUpdate(
        name,
        opts,
        opts.map((d) => false)
      );
    } else {
      let states = opts.map((opt) => opt.name >= newVals[0] && opt.name <= newVals[1]);
      onOptsUpdate(name, opts, states);
    }
  };

  // --- DEBUG
  // $: console.log("tooltip", tooltipContent);
</script>

<!-- FILTER HEADER -->
<button
  class="header"
  class:active={anySelected}
  on:click={() => onToggle(name)}
  on:mouseover={() => (isHovered = true)}
  on:mouseout={() => (isHovered = false)}
  on:focus={() => (isHovered = true)}
  on:blur={() => (isHovered = false)}
  aria-expanded={isOpen}
>
  <div class="label">
    {display}
    {#if isHovered}
      <div
        transition:fade={{ duration: 100 }}
        class="help-icon"
        use:tooltip={{
          component: VariableTooltip,
          props: { tooltip: tooltipContent, placement: "top-end" }
        }}
      >
        <Icon
          name="help-circle"
          width={15}
          height={15}
          stroke={anySelected ? color.c4 : color.g3}
        />
      </div>
    {/if}
  </div>

  <svg
    style="tran"
    width="20"
    height="20"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
  >
</button>

<!-- FILTER PANEL -->
{#if isOpen}
  <div transition:slide={{ duration: 300 }} class="panel">
    <!--  CHECKBOX -->
    {#if type === "checkbox"}
      {#each opts as opt}
        <Checkbox
          name={opt.name}
          display={opt.display}
          isSelected={opt.isSelected}
          on:toggleCheckbox={handleToggleCheckbox}
        />
      {/each}
    {:else if type === "slider"}
      <RangeSelector
        min={sliderMin}
        max={sliderMax}
        values={sliderValues}
        on:updateSliderValues={handleRangeUpdate}
      />
    {/if}
  </div>
{/if}

<style lang="scss">
  .divider {
    height: 30px;
  }

  .panel {
    max-height: 400px;
    overflow-y: auto;
    padding-left: 20px;
  }

  button {
    background: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px 0px;
    padding-left: 5px;
    border-radius: 0;

    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.015;
    text-transform: uppercase;
    color: var(--color-g3);

    &:hover {
      opacity: 0.6;
    }

    &.active {
      background-color: var(--color-c1);
      font-weight: 800;
      color: var(--color-c4);

      &:hover {
        opacity: 1;
      }
    }

    cursor: pointer;
  }

  .label {
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
  }

  .help-icon {
    display: inline-block;
    transform: translateY(1px);
  }

  svg {
    transition: transform 0.2s ease-in;
  }

  [aria-expanded="true"] svg {
    transform: rotate(0.25turn);
  }
</style>
