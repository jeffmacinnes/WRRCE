<script>
  import { LayerCake, Svg } from "layercake";
  import { feature } from "topojson-client";
  import { flatRollup, rollup, greatest, scaleLinear, scaleSequential, max } from "d3";
  import * as d3 from "d3";
  import Icon from "$components/helpers/Icon.svelte";

  import { fullData, filteredData } from "$stores/dataStores";
  import countryGeo from "$data/countriesGeo.json";
  import { color } from "$data/variables.json";

  import MapSvg from "./Map.Svg.svelte";
  import Legend from "$components/common/Legend.svelte";
  import NoDataSwatch from "$components/common/NoDataSwatch.svelte";

  import mapData from "$data/processed/regionalTrends_proportions.csv";

  // --- Map setup
  // convert to geojson
  let svgElement;
  let geojson = feature(countryGeo, countryGeo.objects.countries);
  let zoom = 1;
  let maxZoom = 2;
  let resetMapTranslation;
  let mapTranslated = false;
  const resetMapView = () => {
    zoom = 0;
    if (mapTranslated) resetMapTranslation();
  };

  const updateMapTranslationState = (e) => {
    mapTranslated = e.detail;
  };

  // --- Data prep
  // proportion of fully compliant
  let propData = mapData.map((d) => {
    return {
      ccode: d.ccode,
      propCompliance: +d.proportioncompliance
    };
  });

  // convert filtered data to array of count of recs by country
  $: countryRecCounts = flatRollup(
    $filteredData,
    (v) => v.length,
    (d) => d.ccode
  ).map((d) => ({ ccode: d[0], nRecs: d[1] }));

  // Set up Color Scale
  let scaleType = "relative";
  const setScale = (type) => {
    scaleType = type;
  };

  const getMaxRecs = (data) => {
    // return the country with the maximum recs from the given data;
    if (data.length === 0) return 0;
    let result = greatest(
      rollup(
        data,
        (v) => v.length,
        (d) => d.ccode
      ),
      ([ccode, nRecs]) => nRecs
    );
    return result[1]; // result[0] is the ccode of country w/ greatest;
  };

  $: fullMaxRecs = getMaxRecs($fullData);
  $: filteredMaxRecs = getMaxRecs($filteredData);
  $: maxRecs = scaleType === "absolute" ? fullMaxRecs : filteredMaxRecs;
  $: colorScale = scaleLinear()
    .domain([0, max(propData, (d) => d.propCompliance)])
    .range([color.white, color.a1]);

  let buttonSize = "25px";

  // --- DEBUG ----
  $: console.log("here", geojson);
  $: console.log(propData);
</script>

<div class="map-container">
  <LayerCake data={geojson}>
    <Svg bind:element={svgElement} let:element>
      <MapSvg
        id="map-svg"
        countryData={propData}
        bind:resetTranslation={resetMapTranslation}
        zoomLevel={zoom}
        {colorScale}
        {maxRecs}
        on:mapIsTranslated={updateMapTranslationState}
      />
    </Svg>
  </LayerCake>

  <div class="legend-controls">
    <!-- <Legend {colorScale} width={500} height={60} nTicks={4} title="# of Recommendations" /> -->
    <!-- <NoDataSwatch /> -->
  </div>

  <!-- <div class="map-controls">
    <div
      class="control-wrapper"
      class:active={zoom <= maxZoom}
      on:click={() => (zoom <= maxZoom ? zoom++ : null)}
    >
      <Icon
        name="plus"
        width={buttonSize}
        height={buttonSize}
        stroke={zoom <= maxZoom ? "#333" : "#ccc"}
      />
    </div>
    <div
      class="control-wrapper"
      class:active={zoom > 0}
      on:click={() => (zoom > 0 ? zoom-- : null)}
    >
      <Icon
        name="minus"
        width={buttonSize}
        height={buttonSize}
        stroke={zoom > 0 ? "#333" : "#ccc"}
      />
    </div>
    <div
      class="control-wrapper"
      class:active={zoom !== 0 || mapTranslated}
      on:click={() => (zoom !== 0 || mapTranslated ? resetMapView() : null)}
    >
      <Icon
        name="crosshair"
        width={buttonSize}
        height={buttonSize}
        stroke={zoom !== 0 || mapTranslated ? "#333" : "#ccc"}
      />
    </div>
  </div> -->

  <!-- Only show if filteredData !== rawData -->
  <!-- <button class:active={scaleType === "absolute"} on:click={() => setScale("absolute")}
    >Absolute</button
  >
  <button class:active={scaleType === "relative"} on:click={() => setScale("relative")}
    >Relative</button
  >
  <button on:click={() => setZoom()}>Zoom {zoom}</button> -->
</div>

<style lang="scss">
  .map-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
  }

  .legend-controls {
    position: absolute;
    width: 500px;
    bottom: 10px;
    right: 150px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    align-items: flex-end;
    background-color: var(--color-white);
    text-align: center;
  }

  .map-controls {
    position: absolute;
    bottom: 10px;
    right: 50px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: solid 2px var(--color-g3);
    width: 45px;
    background-color: var(--color-white);

    .control-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-bottom: solid 1px var(--color-g3);
      cursor: pointer;
      pointer-events: all;

      &.active {
        &:hover {
          background-color: var(--color-g1);
        }
      }
    }
  }

  .scale-toggle {
    position: absolute;
    bottom: 50px;
    right: 50px;
    width: 100px;
    height: 100px;

    button {
      background-color: #ccc;

      &.active {
        background-color: aqua;
      }
    }
  }
</style>
