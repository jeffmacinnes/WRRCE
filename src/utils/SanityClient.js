import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "risrm5hz",
  dataset: "production",
  apiVersion: "2022-02-11",
  token: "",
  useCdn: true
});

export { client };
