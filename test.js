(function () {
    function getInput() {
        var filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
        var fs = require("fs");
        var input = fs.readFileSync(filePath).toString().trim();
        return input;
    }
    //17478번 문제
    //재귀 함수
    function solution() {
        var input = getInput();
        var max = parseInt(input);
        var messageArr = [
            "어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.",
        ];
        var prefix = "____";
        function recur(i) {
            messageArr.push(prefix.repeat(i) + "\"\uC7AC\uADC0\uD568\uC218\uAC00 \uBB54\uAC00\uC694?\"");
            if (i === max) {
                messageArr.push([
                    prefix.repeat(i) + "\"\uC7AC\uADC0\uD568\uC218\uB294 \uC790\uAE30 \uC790\uC2E0\uC744 \uD638\uCD9C\uD558\uB294 \uD568\uC218\uB77C\uB124\"",
                    prefix.repeat(i) + "라고 답변하였지.",
                ].join("\n"));
                return;
            }
            var message = [
                prefix.repeat(i) +
                    "\"\uC798 \uB4E4\uC5B4\uBCF4\uAC8C. \uC61B\uB0A0\uC61B\uB0A0 \uD55C \uC0B0 \uAF2D\uB300\uAE30\uC5D0 \uC774\uC138\uC0C1 \uBAA8\uB4E0 \uC9C0\uC2DD\uC744 \uD1B5\uB2EC\uD55C \uC120\uC778\uC774 \uC788\uC5C8\uC5B4.",
                prefix.repeat(i) +
                    "\uB9C8\uC744 \uC0AC\uB78C\uB4E4\uC740 \uBAA8\uB450 \uADF8 \uC120\uC778\uC5D0\uAC8C \uC218\uB9CE\uC740 \uC9C8\uBB38\uC744 \uD588\uACE0, \uBAA8\uB450 \uC9C0\uD61C\uB86D\uAC8C \uB300\uB2F5\uD574 \uC8FC\uC5C8\uC9C0.",
                prefix.repeat(i) +
                    "\uADF8\uC758 \uB2F5\uC740 \uB300\uBD80\uBD84 \uC633\uC558\uB2E4\uACE0 \uD558\uB124. \uADF8\uB7F0\uB370 \uC5B4\uB290 \uB0A0, \uADF8 \uC120\uC778\uC5D0\uAC8C \uD55C \uC120\uBE44\uAC00 \uCC3E\uC544\uC640\uC11C \uBB3C\uC5C8\uC5B4.\"",
            ].join("\n");
            messageArr.push(message);
            recur(i + 1);
            messageArr.push(prefix.repeat(i) + "라고 답변하였지.");
        }
        recur(0);
        console.log(messageArr.join("\n"));
    }
    solution();
})();
