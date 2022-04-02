import siteData from "$data/siteData.csv";

export const filterOptions = [
  {
    name: "country", // property in the data
    display: "Country", // How you want filter to be displayed
    opts: Array.from(new Set(siteData.map((d) => d.country))).map((d) => ({ name: d, display: d }))
  },
  {
    name: "institution",
    display: "Institution",
    opts: [
      {
        opt: "CEDAW",
        display: "Committee on the Elimination of Discrimination Against Women (CEDAW)"
      },
      { opt: "UPR", display: "Universal Periodic Review (UPR)" },
      { opt: "ECtHR", display: "European Court of Human Rights (ECtHR)" }
    ]
  },
  {
    name: "issue",
    display: "Issue",
    opts: [
      { opt: "vaw", display: "Violence Against Women" },
      { opt: "econ", display: "Economic Discrimination Against Women" }
    ]
  }
].map((d) => ({ ...d, isOpen: false, opts: d.opts.map((opt) => ({ ...opt, isSelected: false })) }));
