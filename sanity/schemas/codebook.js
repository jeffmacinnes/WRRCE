import { GrDocumentPdf } from "react-icons/gr";

export default {
  title: "Codebook and Methodolgy",
  name: "codebook",
  type: "document",
  icon: GrDocumentPdf,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "PDF",
      name: "pdf",
      type: "file"
    }
  ]
};
