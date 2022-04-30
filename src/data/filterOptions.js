import siteData from "$data/processed/combinedData.csv";

export const filterOptions = [
  {
    name: "country", // property in the data
    display: "Country", // How you want filter to be displayed
    opts: Array.from(new Set(siteData.map((d) => d.country)))
      .map((d) => ({ name: d, display: d }))
      .sort((a, b) => a.name.localeCompare(b.name))
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
  },
  {
    name: "action",
    display: "Action",
    opts: [
      { name: 1, display: "1 - IO-Oriented" },
      { name: 2, display: "2 - Assessment" },
      { name: 3, display: "3 - Provisions of Justice and Accountability" },
      { name: 4, display: "4 - Changing Societal Attitudes" },
      { name: 5, display: "5 - Legal and Legislative Changes" },
      { name: 6, display: "6 - Policy and Programming" },
      { name: 7, display: "7 - Implementation" },
      { name: 8, display: "8 - Overarching Actions with No Accountable Actors" }
    ]
  },
  {
    name: "precision",
    display: "Precision",
    opts: [
      { name: 1, display: "1 - Passive" },
      { name: 2, display: "2 - Guided" },
      { name: 3, display: "3 - Directive" }
    ]
  },
  {
    name: "year",
    display: "Year",
    opts: Array(13)
      .fill(2007)
      .map((d, i) => ({ name: 2007 + i, display: `${2007 + i}` }))
  }
].map((d) => ({ ...d, isOpen: false, opts: d.opts.map((opt) => ({ ...opt, isSelected: false })) }));
