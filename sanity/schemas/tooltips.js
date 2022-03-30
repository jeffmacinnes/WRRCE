import { GrTooltip } from "react-icons/gr";

export default {
  title: "Tooltips",
  name: "tooltips",
  type: "document",
  icon: GrTooltip,
  fields: [
    {
      title: "Variable",
      description: "The variable you want to assign the tooltip to (e.g. Institution)",
      name: "variable",
      type: "string"
    },
    {
      title: "Tooltip",
      name: "tooltip",
      type: "text"
    }
  ]
};
