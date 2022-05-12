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
      title: "Short summary",
      name: "shortSummary",
      type: "text",
      description: "(1-2 sentences)"
    },
    {
      title: "Journal",
      name: "journal",
      type: "string"
    },
    {
      title: "Publication Date",
      name: "publicationDate",
      type: "date",
      options: {
        dateFormat: "MMM DD YYYY"
      }
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
  ],
  initialValue: {
    include: true
  }
};
