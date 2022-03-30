import { derived, writable } from "svelte/store";
import siteData from "$data/siteData.csv";

export const showFilters = writable(true);
export const filters = writable([]);
export const rawData = writable(siteData);
export const filteredData = derived([filters, rawData], ([$filters, $rawData]) => {
  if ($filters.length === 0) {
    return $rawData;
  } else {
    // apply all filters
    return $rawData.filter((d) => d.institution === "CEDAW");
  }
});
