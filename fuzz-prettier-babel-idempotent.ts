const prettier = require("prettier");

const config = {
  parser: "babel",
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

  if (formatted !== formatted_twice) {
    throw new Error(
      `Idempotency Error: formatting twice did not produce the same output.`
    );
  }
};
