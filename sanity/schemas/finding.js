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
      title: "Figure thumnail",
      name: "figureThumnail",
      type: "image",
      description: "The thumnail image that will appear alongside the finding text",
      fields: [
        {
          title: "Figure Title",
          name: "figureTitle",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
        {
          title: "Caption",
          name: "caption",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
        {
          title: "Alt text",
          name: "altText",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        }
      ]
    },
    {
      title: "Figure",
      name: "figure",
      type: "image",
      description: "The figure that will open once the thumbnail is clicked",
      fields: [
        {
          title: "Figure Title",
          name: "figureTitle",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
        {
          title: "Caption",
          name: "caption",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
        {
          title: "Alt text",
          name: "altText",
          type: "string",
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        }
      ]
    }
  ]
};
