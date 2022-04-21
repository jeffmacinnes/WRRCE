export const getNumRecsBySplit = (data, splitVar) => {
  // return the number of recs for each level of the given split var.
  // slightly different methods based on the given split var
  switch (splitVar.display) {
    case "Compliance Status":
      // compliance status has separate property for each level of compliance. values are 1 or 999 (or 333)
      return splitVar.opts.map((opt) => {
        let { name, display } = opt;
        return {
          display,
          nRecs: data.filter((d) => d[name] === 1 || d[name] === 333).length
        };
      });
    case "Action":
    case "Precision":
      // action and precision each have single property in data. value represents the level of the variable
      return splitVar.opts.map((opt) => {
        let { name, display } = opt;
        return {
          display,
          nRecs: data.filter((d) => d[splitVar.name] === name).length
        };
      });
    default:
      console.log(`no method found for split by var: ${splitVar.display}`);
  }
};
