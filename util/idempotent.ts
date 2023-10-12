import assert from "node:assert";

/**
 * {@link idempotent} is a helper function for testing that a prettier formatter returns the same value
 * after two parse and prints
 */
export function idempotent(
  formattingFn: (input: string) => Promise<string>,
  handleErrors?: (error: unknown) => void | never
) {
  return async function (data: Buffer) {
    let formatted: string;

    try {
      formatted = await formattingFn(data.toString());
    } catch (error) {
      // Catch errors from the first parse
      if (handleErrors) {
        return handleErrors(error);
      } else if (error instanceof Error) {
        throw new Error(`Error on first format: ${error.message}`);
      } else {
        throw new Error("Error on first format");
      }
    }

    let formatted_twice: string;

    try {
      formatted_twice = await formattingFn(formatted);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error on second format: ${error.message}`);
      } else {
        throw new Error("Error on second format");
      }
    }

    assert.deepStrictEqual(formatted, formatted_twice);
  };
}
