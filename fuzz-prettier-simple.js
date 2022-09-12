const prettier = require("prettier");

/**
 * { type: Error, partialMessage: string }[]
 */
const ALLOWED_ERRORS = [
  { type: SyntaxError, partialMessage: "Unexpected token" },
  { type: SyntaxError, partialMessage: "Unexpected character" },
  { type: SyntaxError, partialMessage: "Unterminated regular expression" },
];

/**
 * @param { Buffer } data
 */
module.exports.fuzz = function (data) {
  try {
    prettier.format(data.toString(), { parser: "babel" });
  } catch (error) {
    // check that the error message returns this value
    if (
      error instanceof SyntaxError ||
      ALLOWED_ERRORS.some(
        (allowed) =>
          error instanceof allowed.type &&
          error.message.includes(allowed.partialMessage)
      )
    ) {
      return;
    }
    throw error;
  }
};
