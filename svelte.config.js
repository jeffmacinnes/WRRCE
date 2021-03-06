import fs from "fs";
import path from "path";
import adapterStatic from "@sveltejs/adapter-static";
// import svg from "vite-plugin-svgstring";
import svg from "@poppanator/sveltekit-svg";
import { imagetools } from "vite-imagetools";
import dsv from "@rollup/plugin-dsv";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const { svelteStarter } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const dev = process.env.NODE_ENV === "development";
const dir = svelteStarter ? svelteStarter.subdirectory : "";
const prefix = dir.startsWith("/") ? "" : "/";
const base = dev || !dir ? "" : `${prefix}${dir}`;

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [autoprefixer]
  }
});

const config = {
  preprocess,
  kit: {
    adapter: adapterStatic(),
    vite: {
      resolve: {
        alias: {
          $actions: path.resolve("./src/actions"),
          $assets: path.resolve("./src/assets"),
          $components: path.resolve("./src/components"),
          $data: path.resolve("./src/data"),
          $stores: path.resolve("./src/stores"),
          $styles: path.resolve("./src/styles"),
          $svg: path.resolve("./src/svg"),
          $utils: path.resolve("./src/utils")
        }
      },
      plugins: [dsv(), svg(), imagetools({ force: true })],
      ssr: {
        noExternal: dev ? [] : ["lodash", "gsap"]
      }
    },
    paths: {
      base
    }
  }
};

export default config;
