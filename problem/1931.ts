(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  //1931번 문제
  //1개의 강의실 사용 -> N개의 회의
  //회의 I에 대한 시작, 끝 시간 주어짐
  //회의 곂치지 않고 회의실을 사용 -> 최대 회의 개수
  //회의 끝남과 동시 사용 가능
  //회의 시간은 시작과 끝이 동일할 수 있음 -> 0시간 항상 가능
  //회의 개수 1 ~ 100,000
  //2초 -> 연산 대략 2000만번 가능 -> 10만 회의 -> 제곱 = 10,000,000,000 -> O(n^2) 불가능
  //시작시간, 끝나는 시간 2^31 - 1 -> number로 처리 가능
  //회의 가능 시간으로부터 가까우면서 끝나는 시간이 가장 가까운 회의를 찾아서 넣으면 최적해
  //끝나는 시간이 멀 수록 다음 회의를 받을 수 있는 시간이 줄어듬
  //끝나는 시간 순으로 정렬
  //현재 시간으로부터 가능한 시간인지 확인, 해당 시간으로 변경
  //js sort O(nlogn)
  //예시에서 끝나는 시간이 정렬되어 있는데 주어지는 데이터가 정렬 데이터인지 알 수 없음
  //+ 틀렸던 이유 -> 시작 시간도 비교해야함
  //만약 5시에 끝나는데 3 5, 6 6, 5 6 이렇게 데이터 주면
  //끝나는 시간만 비교해서 정렬하기 때문에 3 5, 6 6, 5 6
  //에서 순서대로 3 5 이후 6 6간 후에
  //6 6의 끝나는 시간이 6인데 5,6의 시작 시간이 5여서 짤림
  //따라서 시작 시간이 가까운 순으로 정렬을 해줘야 가능한 다 포함할 수 있음
  //끝나는 시간이 가까운 회의는 끝나는 시간이 더 뒤인 회의보다 더 많은 회의를 포함 가능
  //시작 시간으로부터 끝나는 시간이 가까운 회의를 잡되
  //끝나는 시간이 동일한 경우 시작 시간이 현재 시간에서 가까워야
  //시작 시간과 끝나는 시간이 동일한 회의가 뒤에 있어도 포함할 수 있음
  function solution(): void {
    const input: string[] = getInput().split("\n");
    const numArr = input.slice(1, input.length).map((timeStr) => {
      const split = timeStr.split(" ");
      return [Number(split[0]), Number(split[1])];
    });
    const timeArr = numArr.sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      } else if (a[1] > b[1]) {
        return 1;
      } else {
        if (a[0] < b[0]) {
          return -1;
        } else if (a[0] > b[0]) {
          return 1;
        }
        return 0;
      }
    });

    let start = timeArr[0];
    const ans = timeArr.slice(1, timeArr.length).reduce((total, cur) => {
      if (start[1] > cur[0]) {
        return total;
      }
      start = cur;
      return total + 1;
    }, 0);

    console.log(ans + 1);
  }

  solution();
})();
