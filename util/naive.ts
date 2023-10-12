/**
 * {@link naive} is a helper function for testing that a prettier formatter only returns
 * expected errors
 */
export function naive(
  formattingFn: (input: string) => Promise<string>,
  handleErrors: (error: unknown) => void | never
) {
  return async function (data: Buffer) {
    try {
      await formattingFn(data.toString());
    } catch (error: unknown) {
      console.warn(error);
      handleErrors(error);
    }
  };
}
