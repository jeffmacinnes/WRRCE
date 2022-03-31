import fs from "fs";
import csv from "csvtojson";
import fastcsv from "fast-csv";
import { titleCase } from "title-case";

const CEDAW_fname = "20220205_CEDAW.csv";
const ECtHR_fname = "20220205_ECtHR.csv";
const UPR_fname = "20220205_UPR.csv";

const rawDir = "src/data/raw";
const commonVars = [
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

const prepCEDAW = async () => {
  console.log("processing CEDAW...");
  let data = await csv().fromFile(`${rawDir}/${CEDAW_fname}`);
  return data.map((d) => ({ ...d, institution: "CEDAW" })).map(selectProps(commonVars));
};

const prepECtHR = async () => {
  console.log("...processing ECtHR...");
  let data = await csv().fromFile(`${rawDir}/${ECtHR_fname}`);
  return data
    .map((d) => ({ ...d, institution: "ECtHR", year: d["year(rec)"] })) // <- rename year var as well
    .map(selectProps(commonVars));
};

const prepUPR = async () => {
  console.log("...processing UPR...");
  let data = await csv().fromFile(`${rawDir}/${UPR_fname}`);
  return data.map((d) => ({ ...d, institution: "UPR" })).map(selectProps(commonVars));
};

(async () => {
  // prep CEDAW
  let CEDAW = await prepCEDAW();

  // prep ECtHR
  let ECtHR = await prepECtHR();

  // prep UPR
  let UPR = await prepUPR();

  // combine, format, and save
  const combined = [...CEDAW, ...UPR, ...ECtHR].map((d) => ({
    ...d,
    ccode: +d.ccode,
    year: +d.year,
    recommendation: d.recommendation.replace(/(\r\n|\n|\r)/gm, ""),
    nomention: +d.nomention,
    inaction: +d.inaction,
    consideration: +d.consideration,
    delegation: +d.delegation,
    execution: +d.execution,
    compliance: +d.compliance,
    womensrightsissue: formatRights(d.womensrightsissue),
    vaw: d.vaw === "1",
    econ: d.econ === "1",
    action: +d.action,
    precision: +d.precision
  }));
  console.log("writing data...");
  const ws = fs.createWriteStream("src/data/siteDate.csv");
  fastcsv.write(combined, { headers: true }).pipe(ws);
})();