export const getYearlyRecsBySplit = (data, years, splitVar) => {
  // return the number of recs for each level of the given split var.
  // slightly different methods based on the given split var
  let results = [];

  switch (splitVar.display) {
    case "Compliance Status":
      years.forEach((year) => {
        let yearData = data.filter((d) => d.year === year);

        // sum up # of recs for each compliance status level for this year
        splitVar.opts.forEach((opt) => {
          let { name, display } = opt;
          let optData = yearData.filter((d) => [1, 333].includes(d[name]));
          results.push({
            name,
            display,
            year,
            nRecs: optData.length
          });
        });

        // sum up # of unclassified values for this year
        // let nUnclassified = yearData.filter((d) =>
        //   splitVar.opts.every(({ name }) => ![1, 333].includes(d[name]))
        // );
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
