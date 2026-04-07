import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  defineCollections,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const webdev = defineDocs({
  dir: "content/web-dev",
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const web3 = defineDocs({
  dir: "content/web3",
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blogs",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  mdxOptions: {},
});
