export const getYearlyRecsBySplit = (data, years, splitVar) => {
  // return the number of recs for each level of the given split var.
  // slightly different methods based on the given split var
  let results = [];
  switch (splitVar.display) {
    case "Compliance Status":
      // compliance status has separate property for each level of compliance. values are 1 or 999 (or 333. include 333 in totals)
      splitVar.opts.forEach((opt) => {
        let { name, display } = opt;
        let optData = data.filter((d) => d[name] === 1 || d[name] === 333);
        years.forEach((year) => {
          results.push({
            name,
            display,
            year,
            nRecs: optData.filter((d) => d.year === year).length
          });
        });
      });
      return results;
    case "Action":
    case "Precision":
      // action and precision each have single property in data. value represents the level of the variable
      splitVar.opts.forEach((opt) => {
        let { name, display } = opt;
        let optData = data.filter((d) => d[splitVar.name] === name);
        years.forEach((year) => {
          results.push({
            name,
            display,
            year,
            nRecs: optData.filter((d) => d.year === year).length
          });
        });
      });
      return results;
    default:
      console.log(`no method found for split by var: ${splitVar.display}`);
  }
};
