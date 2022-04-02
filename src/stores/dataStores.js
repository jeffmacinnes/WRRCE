import { derived, writable } from "svelte/store";
import siteData from "$data/siteData.csv";
import { filterOptions } from "$data/filterOptions";

export const showFilters = writable(true);
export const searchKeyword = writable("");
export const filterOpts = writable(filterOptions);
export const rawData = writable(siteData);

export const activeFilters = derived(
  // set active filters array based on current searchterm and filter opts
  [searchKeyword, filterOpts],
  ([$searchKeyword, $filterOpts]) => {
    let filters = [];

    // get the current search term
    if ($searchKeyword !== "") {
      filters.push({ type: "keyword", keyword: $searchKeyword });
    }

    // find any selected filters
    $filterOpts.forEach((filter) => {
      filter.opts
        .filter((opt) => opt.isSelected)
        .forEach((activeOpt) => {
          let { name, display } = activeOpt;
          filters.push({ type: filter.name, name, display });
        });
    });

    console.log(filters);
    return filters;
  }
);

export const filteredData = derived(
  [searchKeyword, activeFilters, rawData],
  ([$searchKeyword, $activeFilters, $rawData]) => {
    if ($searchKeyword === "" && $activeFilters.length === 0) {
      return $rawData;
    } else {
      // apply all filters
      return $rawData.filter((d) => d.institution === "CEDAW");
    }
  }
);

/*


1. apply search keyword

2. walk through filters array. For every filter

data = data.filter(d => {
  // only true if passes ALL filters
  let valid = true;
  for (let f of filters){
    /* f = {prop: "institution", "validValues": ["CEDAW"]}
    if (!f.validValues.includes(d[f.prop])){
      valid = false;
      break;
    }
    return valid
  }

})


filters = [
  {prop: "institution", validValues: ["CEDAW", "UPR"]},
  { type: "year", prop: "year"}
]


*/
