import "@jazzer.js/jest-runner";
import prettier from "prettier";
import prettierPluginGoTemplate from "prettier-plugin-go-template";
import { idempotent } from "./util/idempotent.js";
import { naive } from "./util/naive.js";

describe("prettier-plugin-go-template", () => {
  it.fuzz(
    "formats a basic setup",
    naive(
      async (input: string) =>
        await prettier.format(input, {
          parser: "go-template",
          plugins: [prettierPluginGoTemplate],
        }),
      (error) => {
        if (
          error instanceof Error &&
          ["An error occured during printing. Found invalid node root."].some(
            (prefix) => error.message.includes(prefix)
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
          parser: "go-template",
          plugins: [prettierPluginGoTemplate],
        }),
      (error) => {
        if (false) {
          return;
        }
        throw error;
      }
    )
  );
});
