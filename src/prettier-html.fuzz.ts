import "@jazzer.js/jest-runner";
import prettier from "prettier";
import { idempotent } from "./util/idempotent.js";
import { naive } from "./util/naive.js";

describe("prettier-parser-html", () => {
  it.fuzz(
    "formats a basic setup",
    naive(
      async (input: string) =>
        await prettier.format(input, {
          parser: "html",
        }),
      (error) => {
        if (error instanceof SyntaxError) {
          return;
        }
        if (
          error instanceof TypeError &&
          error.message.includes("u(...).getContentType is not a function")
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
          parser: "html",
        })
    )
  );
});
