import prettier from "prettier";
import prettierPluginAstro from "prettier-plugin-astro";

module.exports.fuzz = function (data: Buffer) {
  try {
    prettier.format(data.toString(), {
      parser: "astro",
      plugins: [prettierPluginAstro],
    });
  } catch (error) {
    // check that the error message returns this value
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }
};
