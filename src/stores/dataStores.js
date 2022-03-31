import { derived, writable } from "svelte/store";
import siteData from "$data/siteData.csv";

export const showFilters = writable(true);
export const searchKeyword = writable("");
export const filters = writable([]);
export const rawData = writable(siteData);
export const filteredData = derived(
  [searchKeyword, filters, rawData],
  ([$searchKeyword, $filters, $rawData]) => {
    if ($searchKeyword === "" && $filters.length === 0) {
      return $rawData;
    } else {
      // apply all filters
      return $rawData.filter((d) => d.institution === "CEDAW");
    }
  }
);

const filterOpts = [
  {
    prop: "country", // property in the data
    display: "Country", // How you want filter to be displayed
    opts: Array.from(new Set(siteData.map((d) => d.country))).map((d) => ({ opt: d, display: d }))
  },
  {
    prop: "institution",
    display: "Institution",
    opts: [
      {
        opt: "CEDAW",
        display: "Committee on the Elimination of Discrimination Against Women (CEDAW)"
      },
      { opt: "UPR", display: "Universal Periodic Review (UPR)" },
      { opt: "ECtHR", display: "European Court of Human Rights (ECtHR)" }
    ]
  }
];

console.log(filterOpts);

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
