export default {
  // This is the display name that'll get displayed in Sanity Studio
  title: "Sample",

  // The identifier for this document type used in the api's
  name: "person",

  // Documents have the type 'document'. Must be one of sanity's preset types, see: https://www.sanity.io/docs/schema-types
  type: "document",

  // Now we proceed to list the fields of our document
  fields: [
    {
      // The display name for this field
      title: "Name",

      // The identifier for this field used in the api's
      name: "name",

      // The type of this field
      type: "string"
    }
  ]
};
