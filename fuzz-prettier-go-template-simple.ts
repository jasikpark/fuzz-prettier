import prettier from "prettier";
import prettierPluginGoTemplate from "prettier-plugin-go-template";

/**
 * @param { Buffer } data
 */
module.exports.fuzz = function (data) {
  try {
    prettier.format(data.toString(), {
      parser: "go-template",
      plugins: [prettierPluginGoTemplate],
    });
  } catch (error) {
    // check that the error message returns this value
    if (
      error instanceof SyntaxError ||
      error?.message.includes("SyntaxError") ||
      error.includes("SyntaxError")
    ) {
      return;
    }
    throw error;
  }
};
