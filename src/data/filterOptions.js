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
        name: "CEDAW",
        display: "Committee on the Elimination of Discrimination Against Women (CEDAW)"
      },
      { name: "UPR", display: "Universal Periodic Review (UPR)" },
      { name: "ECtHR", display: "European Court of Human Rights (ECtHR)" }
    ]
  },
  {
    name: "issue",
    display: "Issue",
    opts: [
      { name: "vaw", display: "Violence Against Women" },
      { name: "econ", display: "Economic Discrimination Against Women" }
    ]
  },
  {
    name: "complianceStatus",
    display: "Compliance Status",
    opts: [
      { name: "nomention", display: "No Mention" },
      { name: "inaction", display: "Inaction" },
      { name: "consideration", display: "Consideration" },
      { name: "delegation", display: "Delegation" },
      { name: "execution", display: "Execution" },
      { name: "compliance", display: "Compliance" }
    ]
  }
].map((d) => ({ ...d, isOpen: false, opts: d.opts.map((opt) => ({ ...opt, isSelected: false })) }));
