import { derived, writable } from "svelte/store";
import siteData from "$data/processed/combinedData.csv";
import { filterOptions } from "$data/filterOptions";
import Fuse from "fuse.js";

export const showFilters = writable(true);
export const searchKeyword = writable("");
export const filterOpts = writable(filterOptions);
export const rawDataCount = writable(siteData.length);

// parse the raw site data
let rawData = siteData.map((d) => ({
  ...d,
  action: +d.action,
  precision: +d.precision,
  nomention: +d.nomention,
  inaction: +d.inaction,
  consideration: +d.consideration,
  delegation: +d.delegation,
  execution: +d.execution,
  compliance: +d.compliance,
  vaw: d.vaw === "true",
  econ: d.econ === "true",
  year: +d.year
}));

// --- FUSE fuzzy keyword search
const fuseData = new Fuse(rawData, {
  keys: ["country", "institution", "issue", "compliance status", "recommendation", "year"]
});

const filterByKeyword = (keyword) => {
  return fuseData.search(keyword).map((d) => d.item);
};

// --- Create array of currently selected filters
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
          filters.push({
            type: filter.name,
            typeDisplay: filter.display,
            opt: name,
            optDisplay: display
          });
        });
    });

    console.log(filters);
    return filters;
  }
);

// --- Filter the data based on currently selected filters
export const filteredData = derived([activeFilters], ([$activeFilters]) => {
  // if no filters, return raw data
  if ($activeFilters.length === 0) return rawData;

  // --- APPLY FILTERS
  let result = rawData;

  // keyword
  const kwFilter = $activeFilters.find((d) => d.type === "keyword");
  if (kwFilter) {
    result = filterByKeyword(kwFilter.keyword);
  }

  // countries
  const countryFilters = $activeFilters.filter((d) => d.type === "country");
  if (countryFilters.length > 0) {
    let countries = countryFilters.map((d) => d.opt);
    result = result.filter((d) => countries.includes(d.country));
  }

  // institution
  const institutionFilters = $activeFilters.filter((d) => d.type === "institution");
  if (institutionFilters.length > 0) {
    let institutions = institutionFilters.map((d) => d.opt);
    result = result.filter((d) => institutions.includes(d.institution));
  }

  // issues
  const issueFilters = $activeFilters.filter((d) => d.type === "issue");
  if (issueFilters.length > 0) {
    // set up array of functions, one for each selected issue. Each function will check if the
    // value of the datarow[issue] is true (e.g. d[vaw] === true).
    // If ANY of the checks return true, the row passes the filter. Hence, an OR filter for any of the
    // options selected on the ISSUE filter
    let conditionChecks = issueFilters.map((issue) => (row) => row[issue.opt] === true);
    result = result.filter((d) => {
      let checks = conditionChecks.map((fn) => fn(d)); // check each condition
      return checks.includes(true);
    });
  }

  // compliance status (same approach as issues)
  const complianceFilters = $activeFilters.filter((d) => d.type === "complianceStatus");
  if (complianceFilters.length > 0) {
    let conditionChecks = complianceFilters.map((issue) => (row) => row[issue.opt] === 1);
    result = result.filter((d) => {
      let checks = conditionChecks.map((fn) => fn(d)); // check each condition
      return checks.includes(true);
    });
  }

  // action
  const actionFilters = $activeFilters.filter((d) => d.type === "action");
  if (actionFilters.length > 0) {
    let actions = actionFilters.map((d) => d.opt);
    result = result.filter((d) => actions.includes(d.action));
  }

  // precision
  const precisionFilters = $activeFilters.filter((d) => d.type === "precision");
  if (precisionFilters.length > 0) {
    let precisions = precisionFilters.map((d) => d.opt);
    result = result.filter((d) => precisions.includes(d.precision));
  }
  return result;
});
