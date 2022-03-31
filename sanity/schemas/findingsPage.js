export default {
  title: "Findings Page",
  name: "findingsPage",
  type: "document",
  _experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Page",
      name: "page",
      type: "string",
      initialValue: "Findings Page Content",
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
      title: "Findings",
      name: "findings",
      type: "array",
      of: [{ type: "finding" }]
    }
  ]
};
