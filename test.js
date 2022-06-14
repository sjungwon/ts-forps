(function () {
    function getInput() {
        var filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
        var fs = require("fs");
        var input = fs.readFileSync(filePath).toString().trim();
        return input;
    }
    function solution() {
        var input = getInput().split("\n");
        var length = parseInt(input[0]);
        var data = input[1].split(" ").map(function (e) { return parseInt(e); });
        var dp = new Array(length).fill(0);
        dp[0] = data[0];
        var ans = data[0];
        for (var i = 1; i < length; i++) {
            dp[i] = Math.max(data[i], data[i] + dp[i - 1]);
            ans = Math.max(ans, dp[i]);
        }
        console.log(ans);
    }
    solution();
})();
