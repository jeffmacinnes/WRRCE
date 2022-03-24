import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import sample from "./sample";
// import landingPage from "./landingPage";
import siteSettings from "./siteSettings";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "WRRCE",
  types: schemaTypes.concat([sample, siteSettings])
});
