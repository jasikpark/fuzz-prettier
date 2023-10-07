import prettier from "prettier";
import assert from "node:assert/strict";
import prettierPluginAstro from "prettier-plugin-astro";

const config = {
  parser: "astro",
  plugins: [prettierPluginAstro],
};

module.exports.fuzz = async function (data: Buffer) {
  let formatted;

  try {
    formatted = await prettier.format(data.toString(), config);
  } catch (error: unknown) {
    // check that the error message returns this value
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }

  const formatted_twice = prettier.format(formatted, config);

  assert.deepStrictEqual(formatted, formatted_twice);
};
