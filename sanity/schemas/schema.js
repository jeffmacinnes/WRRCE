import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import person from "./person";
import book from "./book";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "mySchema",
  types: schemaTypes.concat([person, book])
});
