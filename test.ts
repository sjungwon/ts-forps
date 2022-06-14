(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  function solution() {
    const input: string[] = getInput().split("\n");

    const length = parseInt(input[0]);
    const data = input[1].split(" ").map((e) => parseInt(e));

    const dp = new Array(length).fill(0);
    dp[0] = data[0];

    let ans = data[0];

    for (let i = 1; i < length; i++) {
      dp[i] = Math.max(data[i], data[i] + dp[i - 1]);
      ans = Math.max(ans, dp[i]);
    }

    console.log(ans);
  }

  solution();
})();
