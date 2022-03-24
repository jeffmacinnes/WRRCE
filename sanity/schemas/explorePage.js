export default {
  title: "Explore Page",
  name: "explorePage", // needs to match documentID in siteStructure.js
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Page",
      name: "page",
      type: "string",
      initialValue: "Explore Page Content",
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
    }
  ]
};
