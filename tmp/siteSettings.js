export default {
  title: "Settings",
  name: "siteSettings", // needs to match documentID in siteStructure.js
  type: "document",
  // __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Settings",
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
