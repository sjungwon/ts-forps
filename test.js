(function () {
    function getInput() {
        var filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
        var fs = require("fs");
        var input = fs.readFileSync(filePath).toString().trim();
        return input;
    }
    //13305번 문제
    //기름이 0인채로 시작
    //첫번째 도시에서 기름을 넣지 않으면 다음 도시로 이동하지 못함
    //두번째 도시부터는 만약 기름을 다 썻다면 최소한 다음 도시까지는 현재 도시에서 넣어야함
    //현재 도시에서의 최적의 해는 현재 도시부터 첫번째 도시까지의 주유소 중 제일 저렴한 곳에서
    //기름을 넣는 것
    //거리 1 ~ 1,000,000,000
    //기름값 1 ~ 1,000,000,000
    //도시 수 2 ~ 100,000
    //거리 * 기름 값 max는 1*10^18
    //도시까지 max이면 1 * 10^23
    //node의 number 타입은 -(2^53 − 1)부터 2^53 − 1까지의 수
    //2^53 = 9.007 * e+15 -> 2^10이 얼추 1000 => 2^(10*5.3) = 얼추 1000^5 = 15자리 -> 대략 e+16 - 1
    //number는 15자리까지 가능함
    //BigInt 사용해야함
    //BigInt는 숫자 마지막에 n붙어 있음 -> string으로 변환하면 n사라짐
    //추가로 부분점수 받았던 이유
    //매번 이전 도시까지의 가장 저렴한 주유소를 기름값 배열을 탐색해서 가져왔음
    //거리 배열 탐색시간 n * 기름값 배열 탐색 n으로 n^2
    //매 주유소에서 찾은 저렴한 기름값을 저장해두면 이전 도시에서 주유했던 기름값과 현재 기름값만 비교하면됨
    //기름값 메모이제이션하니까 100점 나옴
    function solution() {
        var input = getInput().split("\n");
        var length = parseInt(input[0]);
        var roadLength = input[1]
            .trim()
            .split(" ")
            .map(function (length) { return parseInt(length); });
        var gasFee = input[2]
            .trim()
            .split(" ")
            .map(function (gas) { return parseInt(gas); });
        var memoFee = Number.MAX_SAFE_INTEGER;
        var totalFee = roadLength.reduce(function (total, cur, index, roadLength) {
            memoFee = Math.min(gasFee[index], memoFee);
            var curFee = BigInt(roadLength[index]) * BigInt(memoFee);
            return total + curFee;
        }, BigInt(0));
        console.log(totalFee.toString());
    }
    solution();
})();
