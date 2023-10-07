import prettier from "prettier";
import prettierPluginTOML from "prettier-plugin-toml";

module.exports.fuzz = function (data: Buffer) {
  try {
    prettier.format(data.toString(), {
      parser: "toml-cst",
      plugins: [prettierPluginTOML],
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
