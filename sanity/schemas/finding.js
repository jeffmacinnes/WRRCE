import { AiOutlineBarChart } from "react-icons/ai";

export default {
  title: "Finding",
  name: "finding",
  type: "object",
  icon: AiOutlineBarChart,
  fields: [
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
      title: "Figure Title",
      name: "figureTitle",
      type: "string"
    },
    {
      title: "Figure Caption",
      name: "figureCaption",
      type: "text"
    }
  ]
};
