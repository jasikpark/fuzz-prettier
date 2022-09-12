import prettier from "prettier";

/**
 * @param { Buffer } data
 */
module.exports.fuzz = function (data) {
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
