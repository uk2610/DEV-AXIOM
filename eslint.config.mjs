import nextCoreWebVitalsConfig from "eslint-config-next/core-web-vitals.js";
import nextTypescriptConfig from "eslint-config-next/typescript.js";

const nextCoreWebVitals = Array.isArray(nextCoreWebVitalsConfig)
  ? nextCoreWebVitalsConfig
  : nextCoreWebVitalsConfig.default ?? [];

const nextTypescript = Array.isArray(nextTypescriptConfig)
  ? nextTypescriptConfig
  : nextTypescriptConfig.default ?? [];

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
