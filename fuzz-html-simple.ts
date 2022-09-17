import prettier from "prettier";

module.exports.fuzz = function (data: Buffer) {
  try {
    prettier.format(data.toString(), { parser: "html" });
  } catch (error) {
    // check that the error message returns this value
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }
};
