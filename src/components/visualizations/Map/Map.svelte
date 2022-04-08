<script>
  import MapSvg from "./Map.Svg.svelte";

  import { LayerCake, Svg, Html } from "layercake";
  import { feature } from "topojson-client";

  import { filteredData } from "$stores/dataStores";
  import countryGeo from "$data/countriesGeo.json";

  // --- Map setup
  // convert to geojson
  const geojson = feature(countryGeo, countryGeo.objects.countries);

  // TO DO: add color properties based on current scale and current data

  console.log(geojson);
</script>

<div class="map-container">
  <LayerCake data={geojson}>
    <Svg>
      <MapSvg />
    </Svg>
  </LayerCake>
</div>

<style>
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
</style>
