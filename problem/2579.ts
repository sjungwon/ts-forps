function getInput(): string {
  const filePath = process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
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

  const temp1: number[] = new Array(length).fill(0);
  const temp2: number[] = new Array(length).fill(0);

  temp1[0] = data[0];
  temp2[0] = data[0];
  temp1[1] = data[0] + data[1];
  temp2[1] = data[1];

  for (let i = 2; i < length; i++) {
    temp1[i] = temp2[i - 1] + data[i];
    temp2[i] =
      temp1[i - 2] > temp2[i - 2]
        ? temp1[i - 2] + data[i]
        : temp2[i - 2] + data[i];
  }

  const sol =
    temp1[length - 1] > temp2[length - 1]
      ? temp1[length - 1]
      : temp2[length - 1];

  console.log(sol);
}

solution();

//1개 전을 밟았을 때
//2개 전을 밟았을 때
//를 나눠서 저장함 -> 다음 계단에서 계산할 때 자기 전꺼를 계산할 떄는 2개 전, 자기 전전꺼를 계산할 때는 둘 중 큰거
