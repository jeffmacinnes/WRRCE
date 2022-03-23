export default {
  title: "Landing Page",
  name: "landing",
  type: "document",
  description: "Text for the landing page",
  fields: [
    {
      title: "Page",
      name: "page",
      type: "string",
      initialValue: "Landing Page",
      readOnly: true
    },
    {
      title: "Heading",
      name: "heading",
      type: "string"
    },
    {
      title: "Summary",
      name: "summary",
      type: "text"
    }
  ]
};
