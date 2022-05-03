// tools for downloading the WRRCE datasets
import { get } from "svelte/store";
import { csv } from "d3-fetch";
import { zipFiles } from "$utils/downloadUtils";
import { filteredData, activeFilters } from "$stores/dataStores";
import { csvFormat } from "d3";

const CEDAW_URL =
  "https://raw.githubusercontent.com/jeffmacinnes/WRRCE/main/src/data/processed/CEDAW.csv";
const ECtHR_URL =
  "https://raw.githubusercontent.com/jeffmacinnes/WRRCE/main/src/data/processed/ECtHR.csv";
const UPR_URL =
  "https://raw.githubusercontent.com/jeffmacinnes/WRRCE/main/src/data/processed/UPR.csv";

const generateREADME = (instData) => {
  let currentDate = new Date();
  let parts = [];
  let isFiltered = instData[0].fname.includes("_filtered");

  parts.push(`
  This data was obtained from the Women's Rights Recommendations & Compliance Data Explorer
  For more information visit https://www.wrrce.org

  Generated on: ${currentDate.toDateString()} - ${currentDate.toLocaleTimeString()}

  ---
  This zip file contains recommendation data files for 3 institutions:

  \tCEDAW - Committee on the Elimination of Discrimination Against Women
  \tUPR - Universal Periodic Review
  \tECtHR - European Court of Human Rights

  ---

  `);

  if (isFiltered) {
    parts.push(
      "During export, the full data for each of these institutions was filtered according to the following rules: "
    );
    let currentFilters = get(activeFilters);
    currentFilters.forEach((f) => {
      parts.push(`\t(FILTER) ${f.typeDisplay}: ${f.optDisplay}`);
    });
  }
  return parts.join("\n");
};

export const downloadData = async (filter = false) => {
  /* Download the 3 datasets. Settings filter = true will filter
  each of the 3 datasets to only include ids that are in the filteredData. 
  In addition, a file describing each of the filters will be created. 
  */
  console.log("downloading data...");
  let CEDAW = await csv(CEDAW_URL);
  let ECtHR = await csv(ECtHR_URL);
  let UPR = await csv(UPR_URL);

  let instData = [
    { name: "CEDAW", fname: "CEDAW.csv", data: CEDAW },
    { name: "ECtHR", fname: "ECtHR.csv", data: ECtHR },
    { name: "UPR", fname: "UPR.csv", data: UPR }
  ];

  let zipFname = "WRRCE.zip";
  let fileArray = [];

  if (filter) {
    // rename zipfile
    zipFname = "WRRCE_filtered.zip";

    // filter each dataset to only include specifed IDs
    let fd = get(filteredData);
    let filterIDs = fd.map((d) => d.id);
    instData = instData.map((inst) => {
      let instIDs = filterIDs.filter((d) => d.slice(0, -4) === inst.name);
      return {
        ...inst,
        fname: `${inst.name}_filtered.csv`,
        data: inst.data.filter((d) => instIDs.includes(d.id))
      };
    });
  }

  // Add the README
  fileArray.push({ fname: "README.txt", content: generateREADME(instData) });

  // package datasets into an array
  instData.forEach((inst) => fileArray.push({ fname: inst.fname, content: csvFormat(inst.data) }));

  let zipFolder = zipFname.replace(".zip", "");
  zipFiles(fileArray, zipFolder, zipFname);
};
