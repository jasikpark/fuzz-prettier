import "@jazzer.js/jest-runner";
import prettier from "prettier";
import * as prettierPluginTOML from "prettier-plugin-toml";
import { idempotent } from "./util/idempotent.js";
import { naive } from "./util/naive.js";

describe("prettier-plugin-toml", () => {
  it.fuzz(
    "formats a basic setup",
    naive(
      async (input: string) =>
        await prettier.format(input, {
          parser: "toml",
          plugins: [prettierPluginTOML],
        }),
      (error) => {
        if (
          error instanceof Error &&
          [
            "Sad sad panda, parsing errors detected in line",
            "Sad sad panda, lexing errors detected in line",
          ].some((prefix) => error.message.includes(prefix))
        ) {
          return;
        }
        throw error;
      },
    ),
  );

  it.fuzz(
    "prints a roundtrip correctly",
    idempotent(
      async (input: string) =>
        await prettier.format(input, {
          parser: "toml",
          plugins: [prettierPluginTOML],
        }),
      (error) => {
        if (
          error instanceof Error &&
          [
            "Sad sad panda, parsing errors detected in line",
            "Sad sad panda, lexing errors detected in line",
          ].some((prefix) => error.message.includes(prefix))
        ) {
          return;
        }
        throw error;
      },
    ),
  );
});
