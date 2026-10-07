import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";

const FSD_LAYERS = ["app", "views", "widgets", "features", "entities", "shared"];
const SLICED_LAYERS = ["views", "widgets", "features", "entities"];

const lowerLayersOf = (layer) => FSD_LAYERS.slice(FSD_LAYERS.indexOf(layer) + 1);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
      "boundaries/elements": [
        { type: "routes", pattern: "app" },
        { type: "app", pattern: "src/app" },
        ...SLICED_LAYERS.map((layer) => ({
          type: layer,
          pattern: `src/${layer}/*`,
          capture: ["slice"],
        })),
        { type: "shared", pattern: "src/shared" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            { allow: { to: { module: { origin: "!local" } } } },
            {
              from: { element: { type: "routes" } },
              allow: { to: { element: { types: { anyOf: ["routes", ...FSD_LAYERS] } } } },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { types: { anyOf: ["routes", ...FSD_LAYERS] } } } },
            },
            // 슬라이스 레이어: 하위 레이어 + 같은 슬라이스 내부만 허용
            ...SLICED_LAYERS.flatMap((layer) => [
              {
                from: { element: { type: layer } },
                allow: { to: { element: { types: { anyOf: lowerLayersOf(layer) } } } },
              },
              {
                from: { element: { type: layer } },
                allow: {
                  to: {
                    element: {
                      type: layer,
                      captured: { slice: "{{ from.element.captured.slice }}" },
                    },
                  },
                },
              },
            ]),
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
          ],
        },
      ],
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
