const prettier = require("prettier");
const assert = require("node:assert/strict");

const config = {
  parser: "html",
};

/**
 * @param { Buffer } data
 */
module.exports.fuzz = function (data) {
  let formatted;

  try {
    formatted = prettier.format(data.toString(), config);
  } catch (error) {
    // check that the error message returns this value
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }

  const formatted_twice = prettier.format(formatted, config);

  assert.deepStrictEqual(formatted, formatted_twice);
};
