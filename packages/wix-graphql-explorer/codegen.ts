import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://www.wixapis.com/graphql/alpha",
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: ["typescript-msw"],
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
