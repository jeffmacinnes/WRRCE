export default {
  title: "Landing Page",
  name: "landingPage", // needs to match documentID in siteStructure.js
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Page",
      name: "page",
      type: "string",
      initialValue: "Landing Page Content",
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
      title: "Links",
      name: "links",
      type: "array",
      validation: (Rule) => Rule.required().length(2),
      of: [{ type: "linkBox" }]
    }
  ]
};
