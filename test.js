(function () {
    function getInput() {
        var filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
        var fs = require("fs");
        var input = fs.readFileSync(filePath).toString().trim();
        return input;
    }
    //1541번 문제
    //+,-와 괄호로 식을 만듬
    //이후에 괄호를 지움
    //괄호는 연산자 사이에도 들어갈 수 있음
    //string으로 +,- 다 나눈 후에
    //순서대로 연산을 진행
    //-를 크게 만들 수록 작은 수를 만들 수 있음
    //배열 순회 -> -에서 괄호 시작해서 +인 경우 계속 진행, -를 만나면 괄호 종료
    //최적해 -> -를 만나면 괄호를 시작 -> 다시 -를 만나면 괄호를 종료 & 다시 괄호 시작
    //따라서 -를 만나면 계속 숫자 빼면됨 -> 다시 -를 만나도 거기부터 다시 괄호 시작한다 생각
    function solution() {
        var input = getInput().split("");
        var number = 0;
        var total = 0;
        var isMinus = false;
        var ans = input.reduce(function (total, cur, index) {
            var curNum = Number(cur);
            if (cur === "-") {
                var realNum = isMinus ? -1 * number : number;
                number = 0;
                isMinus = true;
                return total + realNum;
            }
            else if (cur === "+") {
                var realNum = isMinus ? -1 * number : number;
                number = 0;
                return total + realNum;
            }
            else {
                number *= 10;
                number += curNum;
                if (index === input.length - 1) {
                    return total + (isMinus ? -1 * number : number);
                }
                return total;
            }
        }, 0);
        console.log(ans);
    }
    solution();
})();
