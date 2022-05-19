export default {
  title: "About Page",
  name: "aboutPage", // needs to match documentID in siteStructure.js
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Page",
      name: "page",
      type: "string",
      initialValue: "About Page Content",
      readOnly: true
    },
    {
      title: "Heading",
      name: "heading",
      type: "string"
    },
    {
      title: "Body",
      name: "body",
      type: "text"
    },
    {
      title: "Subheading",
      name: "subheading",
      type: "string"
    },
    {
      title: "Objectives",
      name: "objectives",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      title: "Research Team",
      name: "researchTeam",
      type: "text"
    },
    {
      title: "Methods",
      name: "methods",
      type: "text"
    }
  ]
};
