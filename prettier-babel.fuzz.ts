import "@jazzer.js/jest-runner";
import prettier from "prettier";
import { idempotent } from "./util/idempotent.js";

describe("prettier-parser-babel", () => {
  it.fuzz("formats a basic setup", async (data: Buffer) => {
    try {
      await prettier.format(data.toString(), {
        parser: "babel",
      });
    } catch (error) {
      // check that the error message returns this value
      if (
        error instanceof SyntaxError ||
        (error instanceof Error && error?.message.includes("SyntaxError"))
      ) {
        return;
      }
      throw error;
    }
  });

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
