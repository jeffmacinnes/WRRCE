import { GrDocumentPdf } from "react-icons/gr";

export default {
  title: "Research Papers",
  name: "researchPapers",
  type: "document",
  icon: GrDocumentPdf,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Abstract",
      name: "abstract",
      type: "text"
    },
    {
      title: "Publication Date",
      name: "publicationDate",
      type: "string",
      description: "(e.g. Jan 2022)"
    },
    {
      title: "Include",
      name: "include",
      type: "boolean",
      description: "Include in list of related papers on site?"
    },
    {
      title: "PDF",
      name: "pdf",
      type: "file"
    }
  ]
};
