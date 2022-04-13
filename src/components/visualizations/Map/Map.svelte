<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { feature } from "topojson-client";
  import { flatRollup, rollup, max, greatest } from "d3";
  import Icon from "$components/helpers/Icon.svelte";

  import { fullData, filteredData } from "$stores/dataStores";
  import countryGeo from "$data/countriesGeo.json";

  import MapSvg from "./Map.Svg.svelte";

  // --- Map setup
  // convert to geojson
  let svgElement;
  let geojson = feature(countryGeo, countryGeo.objects.countries);
  let zoom = 0;
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
    console.log(scaleType);
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

  let buttonSize = "25px";
</script>

<div class="title">
  <h4>Regional Trends in Recommendation Compliance</h4>
</div>

<div class="map-container">
  <LayerCake data={geojson}>
    <Svg bind:element={svgElement} let:element>
      <MapSvg
        id="map-svg"
        countryData={countryRecCounts}
        bind:resetTranslation={resetMapTranslation}
        zoomLevel={zoom}
        {maxRecs}
        on:mapIsTranslated={updateMapTranslationState}
      />
    </Svg>
  </LayerCake>

  <div class="legend-controls">
    <div>Legend and scale controls</div>
  </div>

  <div class="map-controls">
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
  </div>

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
  .title {
    width: 100%;
    // z-index: 1;
    // position: absolute;
    top: 0px;
    left: 0px;
    padding: 8px;
    border-radius: 5px 5px 0px 0px;
    text-align: center;
    color: white;
    background: var(--color-c4);
  }

  .map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
  }

  .legend-controls {
    position: absolute;
    width: 300px;
    bottom: 50px;
    right: 150px;
    height: 50px;
    padding: 5px;
    border-radius: 5px;
    background-color: var(--color-white);
    border: solid 2px var(--color-g2);
    text-align: center;
  }

  .map-controls {
    position: absolute;
    bottom: 50px;
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
