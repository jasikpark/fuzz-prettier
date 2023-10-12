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
        if (
          error instanceof SyntaxError &&
          [
            "Bad control character in string literal in JSON at position",
            "Unexpected character",
            "Invalid left-hand side in prefix operation.",
            "Unexpected token",
            "Unterminated string constant.",
            "Unterminated template.",
            "Unterminated regular expression.",
            "Missing semicolon.",
            "Expecting Unicode escape sequence \\uXXXX.",
            "Invalid left-hand side in postfix operation.",
            "Leading decorators must be attached to a class declaration.",
            "Identifier directly after number.",
            "Invalid regular expression flag.",
            "Invalid left-hand side in assignment expression.",
            "A numeric separator is only allowed between two digits.",
          ].some((message) => error.message.includes(message))
        ) {
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
        if (false) {
          return;
        }
        throw error;
      }
    )
  );
});
