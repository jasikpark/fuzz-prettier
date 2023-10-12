import "@jazzer.js/jest-runner";
import prettier from "prettier";
import { idempotent } from "./util/idempotent.js";
import { naive } from "./util/naive.js";

describe("prettier-parser-babel", () => {
  it.fuzz(
    "formats a basic setup",
    naive(
      async (input: string) =>
        await prettier.format(input, {
          parser: "babel",
        }),
      (error) => {
        if (error instanceof SyntaxError) {
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
          parser: "babel",
        })
    )
  );
});
