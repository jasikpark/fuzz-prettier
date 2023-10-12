import "@jazzer.js/jest-runner";
import prettier from "prettier";
import * as prettierPluginAstro from "prettier-plugin-astro";
import { idempotent } from "./util/idempotent.js";
import { naive } from "./util/naive.js";

describe("prettier-plugin-astro", () => {
  it.fuzz(
    "formats a basic setup",
    naive(
      async (input: string) =>
        await prettier.format(input, {
          parser: "astro",
          plugins: [prettierPluginAstro],
        }),
      (error) => {
        if (error instanceof SyntaxError) {
          return;
        }
        if (
          error instanceof TypeError &&
          ["Cannot read properties of undefined"].some((message) =>
            error.message.includes(message)
          )
        ) {
          return;
        }

        throw error;
      }
    )
  );

  it.fuzz(
    "prints a roundtrip correctly",
    idempotent(
      async (input: string) =>
        await prettier.format(input, {
          parser: "astro",
          plugins: [prettierPluginAstro],
        }),
      (error) => {
        if (error instanceof SyntaxError) {
          return;
        }
        if (
          error instanceof TypeError &&
          ["Cannot read properties of undefined"].some((message) =>
            error.message.includes(message)
          )
        ) {
          return;
        }

        throw error;
      }
    )
  );
});
