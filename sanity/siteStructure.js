/* Use Sanity Structure Builder to define custom studio layout that is specific to this site 
helpful links:
  - https://www.sanity.io/guides/getting-started-with-structure-builder
  - https://www.sanity.io/docs/structure-builder-typical-use-cases
  - https://www.youtube.com/watch?v=YMX2TX3vIAc
*/
import { IoBrowsers } from "react-icons/io5";
import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("WRRCE Site Content")
    .items([
      S.listItem()
        .title("Landing Page")
        .icon(IoBrowsers)
        .child(S.document().schemaType("landingPage").documentId("landingPage")),
      S.listItem()
        .title("Explore Page")
        .icon(IoBrowsers)
        .child(S.document().schemaType("explorePage").documentId("explorePage")),
      S.listItem()
        .title("About Page")
        .icon(IoBrowsers)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !["landingPage", "explorePage", "aboutPage"].includes(item.getId())
      )
    ]);
