import "@jazzer.js/jest-runner";
import assert from "node:assert";
import prettier from "prettier";
import * as prettierPluginTOML from "prettier-plugin-toml";

describe("prettier-plugin-toml", () => {
  it.fuzz("formats a basic setup", async (data: Buffer) => {
    try {
      const output = await prettier.format(data.toString(), {
        parser: "toml",
        plugins: [prettierPluginTOML],
      });
    } catch (error) {
      // check that the error message returns this value
      if (
        error instanceof SyntaxError ||
        (error instanceof Error && error?.message.includes("SyntaxError")) ||
        (error instanceof Error &&
          error?.message.includes("Sad sad panda, lexing errors")) ||
        (error instanceof Error &&
          error?.message.includes("Sad sad panda, parsing errors detected")) ||
        (typeof error === "string" && error.includes("SyntaxError"))
      ) {
        return;
      }
      throw error;
    }
  });

  it.fuzz("prints a roundtrip correctly", async (data: Buffer) => {
    let formatted: string;

    try {
      formatted = await prettier.format(data.toString(), {
        parser: "toml",
        plugins: [prettierPluginTOML],
      });
    } catch (error: unknown) {
      // check that the error message returns this value
      if (
        error instanceof SyntaxError ||
        (error instanceof Error && error?.message.includes("SyntaxError")) ||
        (error instanceof Error &&
          error?.message.includes("Sad sad panda, lexing errors")) ||
        (error instanceof Error &&
          error?.message.includes("Sad sad panda, parsing errors detected")) ||
        (typeof error === "string" && error.includes("SyntaxError"))
      ) {
        return;
      }
      throw error;
    }

    const formatted_twice = await prettier.format(data.toString(), {
      parser: "toml",
      plugins: [prettierPluginTOML],
    });

    assert.deepStrictEqual(formatted, formatted_twice);
  });
});
