(function () {
  const ENV = process.platform !== "linux" ? true : false;

  function getInput(): string {
    const filePath = ENV ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString();

    return input;
  }

  function solution() {
    const input: string[] = getInput().split("\n");

    console.log(input);
  }

  solution();
})();
