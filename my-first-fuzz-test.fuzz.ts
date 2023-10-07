import "@jazzer.js/jest-runner";

describe("Target", () => {
  it.fuzz("executes a method", (data: Buffer) => {
    console.log(data);
  });
});
