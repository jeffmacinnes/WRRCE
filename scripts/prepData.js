import fs from "fs";
import csv from "csvtojson";
import fastcsv from "fast-csv";
import { titleCase } from "title-case";

const CEDAW_fname = "20220522_CEDAW.csv";
const ECtHR_fname = "20220522_ECtHR.csv";
const UPR_fname = "20220522_UPR.csv";

const rawDir = "src/data/raw";
const commonVars = [
  "id",
  "country",
  "ccode",
  "institution",
  "recommendation",
  "year",
  "womensrightsissue",
  "nomention",
  "inaction",
  "consideration",
  "delegation",
  "execution",
  "compliance",
  "vaw",
  "econ",
  "action",
  "precision"
];

function selectProps(propsArr) {
  // return array of objects with just the selected props
  return function (obj) {
    const newObj = {};
    propsArr.forEach((name) => {
      newObj[name] = obj[name];
    });
    return newObj;
  };
}

function formatRights(str) {
  // given a delimited string of rights, split into array, title case, and rejoin
  str = str.replace(";", ","); // <- some have semicolon delimiters
  return str
    .split(",")
    .map((d) => titleCase(d))
    .join(",");
}

// -- Process each institution dataset separately.
// Consider giving each instituion an additional property that spells out full name of institution for filtering purposes
const prepCEDAW = async () => {
  console.log("...processing CEDAW...");
  let data = await csv().fromFile(`${rawDir}/${CEDAW_fname}`);
  data = data.map((d, i) => ({
    ...d,
    id: `CEDAW${String(i).padStart(4, "0")}`, // ID to allow linking back to orig CEDAW dataset
    institution: "CEDAW"
  }));

  // write processed version back to disk
  const ws = fs.createWriteStream("src/data/processed/CEDAW.csv");
  fastcsv.write(data, { headers: true }).pipe(ws);

  // return dataset filtered to include only the shared vars
  let props = [...commonVars, "documentname"];
  return data.map(selectProps(props));
};

const prepECtHR = async () => {
  console.log("...processing ECtHR...");
  let data = await csv().fromFile(`${rawDir}/${ECtHR_fname}`);
  data = data.map((d, i) => ({
    ...d,
    id: `ECtHR${String(i).padStart(4, "0")}`,
    institution: "ECtHR",
    year: d["recyear"],
    recSource: `${d["sources"]}, Committee of Ministers meeting #${d["COMmeetingnumber_rec"]}`
  })); // <- rename year var as well

  const ws = fs.createWriteStream("src/data/processed/ECtHR.csv");
  fastcsv.write(data, { headers: true }).pipe(ws);

  let props = [...commonVars, "case", "finaljudgmentdate", "recSource"];
  return data.map(selectProps(props));
};

const prepUPR = async () => {
  console.log("...processing UPR...");
  let data = await csv().fromFile(`${rawDir}/${UPR_fname}`);
  data = data.map((d, i) => ({ ...d, id: `UPR${String(i).padStart(4, "0")}`, institution: "UPR" }));

  const ws = fs.createWriteStream("src/data/processed/UPR.csv");
  fastcsv.write(data, { headers: true }).pipe(ws);

  let props = [...commonVars, "session", "recstate"];
  return data.map(selectProps(props));
};

(async () => {
  // prep CEDAW
  let CEDAW = await prepCEDAW();

  // prep ECtHR
  let ECtHR = await prepECtHR();

  // prep UPR
  let UPR = await prepUPR();

  // combine
  let combined = [...CEDAW, ...UPR, ...ECtHR].map((d) => ({
    ...d,
    ccode: d.ccode,
    year: +d.year,
    recommendation: d.recommendation.replace(/(\r\n|\n|\r)/gm, ""),
    nomention: +d.nomention,
    inaction: +d.inaction,
    consideration: +d.consideration,
    delegation: +d.delegation,
    execution: +d.execution,
    compliance: +d.compliance,
    // womensrightsissue: formatRights(d.womensrightsissue),
    vaw: d.vaw === "1",
    econ: d.econ === "1",
    action: +d.action,
    precision: +d.precision,
    documentname: d.documentname,
    session: d.session,
    recstate: d.recstate,
    case: d.case,
    finaljudgmentdate: d.finaljudgmentdate,
    recSource: d.recSource
  }));

  // clean up country names
  combined = combined.map((d) => {
    if (d.country === "Bosnia & Herzegovina") {
      return { ...d, country: "Bosnia Herzegovina" };
    } else if (d.country === "Macedonia") {
      return { ...d, country: "North Macedonia" };
    } else if (d.ccode === "352") {
      return { ...d, country: "Cyprus" };
    } else if (d.ccode === "365") {
      return { ...d, country: "Russia" };
    }
    return d;
  });

  // format and save
  console.log("writing data...");
  const ws = fs.createWriteStream("src/data/processed/combinedData.csv");
  fastcsv.write(combined, { headers: true }).pipe(ws);

  // --- tmp
  let tmp = combined.map((d) => ({
    year: +d.year,
    nomention: +d.nomention,
    inaction: +d.inaction,
    consideration: +d.consideration,
    delegation: +d.delegation,
    execution: +d.execution,
    compliance: +d.compliance,
    vaw: d.vaw === true,
    econ: d.econ === true,
    action: +d.action,
    precision: +d.precision
  }));
  const wss = fs.createWriteStream("src/data/processed/tmp_combinedData.csv");
  fastcsv.write(tmp, { headers: true }).pipe(wss);
})();
