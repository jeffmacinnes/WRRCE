import { GrTooltip } from "react-icons/gr";

export default {
  title: "Tooltip",
  name: "tooltip",
  type: "document",
  icon: GrTooltip,
  fields: [
    {
      title: "Variable",
      description:
        "The variable you want to assign the tooltip to (e.g. institution). The variable name should match the variables that appear in the raw data",
      name: "variable",
      type: "string"
    },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }]
    }
  ]
};
