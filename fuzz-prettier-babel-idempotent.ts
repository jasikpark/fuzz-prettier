import prettier from "prettier";
import assert from "node:assert/strict";

const config = {
  parser: "babel",
};

module.exports.fuzz = function (data: Buffer) {
  let formatted: string;

  try {
    formatted = prettier.format(data.toString(), config);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }

  const formatted_twice = prettier.format(formatted, config);

  assert.deepStrictEqual(formatted, formatted_twice);
};
