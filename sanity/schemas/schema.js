import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// import sample from "./sample";
// import book from "./book";
import landing from "./landing";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "mySchema",
  types: schemaTypes.concat([landing])
});
