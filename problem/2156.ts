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
    const length: number = parseInt(input[0]);
    const data: number[] = input.slice(1).map((e) => parseInt(e));

    if (length < 3) {
      const result = data.reduce((prev, cur) => {
        return prev + cur;
      }, 0);
      console.log(result);
      return;
    }

    const dp: number[] = new Array(length).fill(0);
    dp[0] = data[0];
    dp[1] = data[0] + data[1];
    dp[2] = Math.max(data[2] + data[1], data[2] + data[0], data[1] + data[0]);

    for (let i = 3; i < length; i++) {
      dp[i] = Math.max(
        data[i] + data[i - 1] + dp[i - 3],
        data[i] + dp[i - 2],
        dp[i - 1]
      );
    }
    console.log(dp[length - 1]);
  }

  solution();
})();

//2 1 0 -> 이 문제는 꼭 마지막 요소를 포함할 필요가 없음 -> 그럼 그 전꺼랑 젤 큰거 ? -> ㄴㄴ 자기 자신을 포함 안한다 생각하고 계산하면 연산 숫자 길어질 수록 정확해짐
//이유는 2 1 0 0 5 9 -> 이런 경우 중간 0 0 이걸 포함 안해야함 -> 3개 연속되지 않게 선택할 때 단순 하나 혹은 두개 전꺼로 계산하면 0 0 이렇게 두번
//건너 뛰는 경우 계산이 안됨 -> 따라서 자신도 빠지는거 까지 계산에 포함해야함
