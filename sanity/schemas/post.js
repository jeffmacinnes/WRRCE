import { IoBrowsers } from "react-icons/io5";

export default {
  name: "post",
  title: "Post",
  type: "document",
  icon: IoBrowsers,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    }
  }
};
