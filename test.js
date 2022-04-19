(function () {
    function getInput() {
        var filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
        var fs = require("fs");
        var input = fs.readFileSync(filePath).toString().trim();
        return input;
    }
    function solution() {
        var input = getInput()
            .split("\n")
            .map(function (e) { return e.split(" "); })
            .map(function (e) { return e.map(function (j) { return parseInt(j); }); });
        var length = input[0][0];
        var data = input.slice(1);
        var dp = new Array(length)
            .fill(0)
            .map(function (e) { return new Array(3).fill(0); });
        dp[0] = dp[0].map(function (e, i) {
            return data[0][i];
        });
        for (var i = 1; i < length; i++) {
            dp[i][0] = Math.min(data[i][0] + dp[i - 1][1], data[i][0] + dp[i - 1][2]);
            dp[i][1] = Math.min(data[i][1] + dp[i - 1][0], data[i][1] + dp[i - 1][2]);
            dp[i][2] = Math.min(data[i][2] + dp[i - 1][0], data[i][2] + dp[i - 1][1]);
        }
        console.log(Math.min.apply(Math, dp[length - 1]));
    }
    solution();
})();
