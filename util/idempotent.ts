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
    try {
      const formatted = await formattingFn(data.toString());

      const formatted_twice = formattingFn(formatted);

      assert.deepStrictEqual(formatted, formatted_twice);
    } catch (error: unknown) {
      if (handleErrors) handleErrors(error);
      else throw error;
    }
  };
}
