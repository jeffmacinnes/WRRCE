# Women's Rights Recommendations and Compliance Database

# Setup

- `npm i`: install dependencies

## Dev

- `npm dev`: will start dev server on port 8000

- anything pushed to `main` branch is set to automatically deploy to netlify, so do in-progress work on `dev` branch.

## CMS

- The Sanity CMS files are stored in this repo in the `sanity` directory.

### To Edit:

- `cd sanity`
  - `sanity docs` to open docs in browser
  - `sanity manage` to open project settings in browser
  - `sanity start` to run your studio

### Connecting sanity to local app dev:

- need to add CORS origins for every url that will be connecting
- if running app dev server at [localhost:8000](http://localhost:8000)
  - go to [manage.sanity.io](manage.sanity.io), then Settings > API Settings > Add CORS origin
  - add `http://localhost:8000`
- In App, need to create a `SanityClient.js` file like

  ```jsx
  import sanityClient from "@sanity/client";

  const client = sanityClient({
    projectID: "risrm5hz", // <- project ID from sanity
    dataset: "production", // <- dataset name
    apiVersion: "2022-02-11", // <- use today's date for latest
    token: "",
    useCdn: true
  });

  export { client };
  ```

- Need to refresh browser while dev server is going to get updates to be reflected (HMR alone doesn’t do it)

## Deploy

- anything pushed to `main` will be automatically deployed to netlify at https://wrrce.netlify.app/
