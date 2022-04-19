(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  function solution() {
    const input: number[][] = getInput()
      .split("\n")
      .map((e) => e.split(" "))
      .map((e) => e.map((j) => parseInt(j)));

    const length = input[0][0];
    const data = input.slice(1);

    const dp: number[][] = new Array(length)
      .fill(0)
      .map((e) => new Array(3).fill(0));

    dp[0] = dp[0].map((e, i) => {
      return data[0][i];
    });

    for (let i = 1; i < length; i++) {
      dp[i][0] = Math.min(data[i][0] + dp[i - 1][1], data[i][0] + dp[i - 1][2]);
      dp[i][1] = Math.min(data[i][1] + dp[i - 1][0], data[i][1] + dp[i - 1][2]);
      dp[i][2] = Math.min(data[i][2] + dp[i - 1][0], data[i][2] + dp[i - 1][1]);
    }

    console.log(Math.min(...dp[length - 1]));
  }

  solution();
})();
