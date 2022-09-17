import prettier from "prettier";
import prettierPluginGoTemplate from "prettier-plugin-go-template";

module.exports.fuzz = function (data: Buffer) {
  try {
    prettier.format(data.toString(), {
      parser: "go-template",
      plugins: [prettierPluginGoTemplate],
    });
  } catch (error) {
    // check that the error message returns this value
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error?.message.includes("SyntaxError")) ||
      (typeof error === "string" && error.includes("SyntaxError"))
    ) {
      return;
    }
    throw error;
  }
};
