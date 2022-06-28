(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  //1018번 문제
  //체스판 다시 칠하기
  //N,M은 50보다 작거나 같음
  //50*50에서 맨끝 맨아래도 모두 탐색한다고 대충 가정
  //각 칸에서 8*8 탐색 -> 2500 * 64 -> 160000로 2초 제한 안넘음
  //원래 시도한 방법 시작 칸의 색으로 나머지를 계산
  //시작 칸의 색이 반대 색일 때 최소 색칠 수가 나올 수 있음
  //체스판의 경우의 수는 검은색 시작, 하얀색 시작 2가지이므로 2가지 경우를
  //배열로 만들고 비교

  function solution(): void {
    const input: string[] = getInput().split("\n");

    const info = input[0]
      .trim()
      .split(" ")
      .map((elem) => parseInt(elem));
    const realData = input.slice(1).map((row) => row.split(""));

    const countFunc = (startX: number, startY: number) => {
      const test = [
        ["W", "B", "W", "B", "W", "B", "W", "B"],
        ["B", "W", "B", "W", "B", "W", "B", "W"],
      ];
      let count1 = 0;
      let count2 = 0;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (realData[startY + y][startX + x] !== test[y % 2][x]) {
            count1++;
          }
          if (realData[startY + y][startX + x] !== test[(y + 1) % 2][x]) {
            count2++;
          }
        }
      }

      return Math.min(count1, count2);
    };

    let min = 1000000;
    for (let y = 0; y <= info[0] - 8; y++) {
      for (let x = 0; x <= info[1] - 8; x++) {
        const count = countFunc(x, y);
        if (count < min) {
          min = count;
        }
      }
    }
    console.log(min);
  }

  solution();
})();
