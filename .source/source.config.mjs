// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  defineCollections,
  metaSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var webdev = defineDocs({
  dir: "content/web-dev",
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var web3 = defineDocs({
  dir: "content/web3",
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blogs",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date())
  })
});
var source_config_default = defineConfig({
  mdxOptions: {
    // MDX options
  }
});
export {
  blog,
  source_config_default as default,
  web3,
  webdev
};
