<script>
  import { setContext } from "svelte";
  import { LayerCake, Svg, Html } from "layercake";
  import { feature } from "topojson-client";
  import { flatRollup, rollup, max, greatest } from "d3";

  import { fullData, filteredData } from "$stores/dataStores";
  import countryGeo from "$data/countriesGeo.json";

  import MapSvg from "./Map.Svg.svelte";

  // --- Map setup
  // convert to geojson
  let svgElement;
  let geojson = feature(countryGeo, countryGeo.objects.countries);
  let zoom = 0;
  const setZoom = () => {
    zoom++;
    if (zoom > 5) {
      zoom = 0;
    }
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
</script>

<div class="map-container">
  <LayerCake data={geojson}>
    <Svg bind:element={svgElement} let:element>
      <MapSvg id="map-svg" countryData={countryRecCounts} zoomLevel={zoom} {maxRecs} />
    </Svg>
  </LayerCake>

  <div class="scale-toggle">
    <!-- Only show if filteredData !== rawData -->
    <button class:active={scaleType === "absolute"} on:click={() => setScale("absolute")}
      >Absolute</button
    >
    <button class:active={scaleType === "relative"} on:click={() => setScale("relative")}
      >Relative</button
    >
    <button on:click={() => setZoom()}>Zoom {zoom}</button>
  </div>
</div>

<style lang="scss">
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
