import { FiLink2 } from "react-icons/fi";

export default {
  title: "Link Box",
  name: "linkBox",
  type: "object",
  icon: FiLink2,
  fields: [
    {
      title: "Link To",
      name: "linkTo",
      type: "string"
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
      title: "Link Text",
      name: "linkText",
      type: "string"
    }
  ]
};
