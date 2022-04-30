import Fuse from "fuse.js";
import { derived, readable, writable } from "svelte/store";
import siteData from "$data/processed/combinedData.csv";
import { filterOptions } from "$data/filterOptions";
import { color } from "$data/variables.json";
import { min, max } from "d3-array";

export const showFilters = writable(false);
export const searchKeyword = writable("");
export const filterOpts = writable(filterOptions);
export const fullData = readable([], (set) => set(parseData(siteData)));
export const rawDataCount = writable(siteData.length);

const actionOpts = filterOptions
  .find((d) => d.name === "action")
  .opts.map((d) => ({ ...d, display: d.display.replace(/[0-9]\s-\s/g, "") }));
const precisionOpts = filterOptions
  .find((d) => d.name === "precision")
  .opts.map((d) => ({ ...d, display: d.display.replace(/[0-9]\s-\s/g, "") }));

const complianceLevels = [
  "nomention",
  "inaction",
  "consideration",
  "delegation",
  "execution",
  "compliance"
];

const getComplianceDisplay = (data) => {
  // convert the compliance levels into svg code
  let circleW = 20;
  let r = (circleW * 0.83) / 2;
  let result = [
    `<svg viewBox="0 0 ${circleW * complianceLevels.length} ${circleW}" width="${
      circleW * complianceLevels.length
    }" height="${circleW}" xmlns="http://www.w3.org/2000/svg">`
  ];
  complianceLevels.forEach((level, i) => {
    result.push(
      `<circle cx="${i * circleW + circleW / 2}" cy="${circleW / 2}" r="${r}" fill="${
        color.white
      }" stroke="${color.a1}" stroke-width="2"/>`
    );
    if ([1, 333].includes(+data[level])) {
      result.push(
        `<circle cx="${i * circleW + circleW / 2}" cy="${circleW / 2}" r="${r * 1}" fill="${
          color.a1
        }"/>`
      );
    }
  });
  result.push("</svg>");
  return result.join("");
};

const getInstitutionDisplay = (inst) => {
  // return the full display name for the institution
  return filterOptions.find((d) => d.name === "institution").opts.find((d) => d.name === inst)
    .display;
};

function parseData(siteData) {
  return siteData.map((d) => ({
    ...d,
    institutionDisplay: getInstitutionDisplay(d.institution),
    action: +d.action,
    actionDisplay: actionOpts.find((dd) => dd.name === +d.action).display,
    precision: +d.precision,
    precisionDisplay: precisionOpts.find((dd) => dd.name === +d.precision).display,
    nomention: +d.nomention,
    inaction: +d.inaction,
    consideration: +d.consideration,
    delegation: +d.delegation,
    execution: +d.execution,
    compliance: +d.compliance,
    complianceStatus: getComplianceDisplay(d),
    vaw: d.vaw === "true",
    econ: d.econ === "true",
    year: +d.year,
    recommendation: d.recommendation.charAt(0).toUpperCase() + d.recommendation.substring(1)
  }));
}

let rawData = parseData(siteData);

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
      filters.push({
        type: "keyword",
        typeDisplay: "keyword",
        opt: $searchKeyword,
        optDisplay: $searchKeyword
      });
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

    // reformat the "years" filters
    let yearFilters = filters.filter((d) => d.type === "year");
    filters = filters.filter((d) => d.type !== "year");
    if (yearFilters.length > 0) {
      let years = yearFilters.map((d) => d.opt);
      filters.push({
        type: "year",
        typeDisplay: "Year",
        opt: [min(years), max(years)],
        optDisplay: `${min(years)} to ${max(years)}`
      });
    }

    console.log("filters", filters);
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
    result = filterByKeyword(kwFilter.opt);
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

  // year
  const yearFilter = $activeFilters.filter((d) => d.type === "year");
  if (yearFilter.length > 0) {
    let yearLims = yearFilter[0].opt;
    result = result.filter((d) => d.year >= yearLims[0] && d.year <= yearLims[1]);
  }

  return result;
});
