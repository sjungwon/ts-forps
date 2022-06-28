(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  //7586번 문제
  //덩치 비교
  function solution(): void {
    const input: string[] = getInput().split("\n");

    const data = input.slice(1);
    const realData = data.map((elem) => {
      const body = elem.split(" ").map((strVal) => {
        return parseInt(strVal);
      });
      return [body[0], body[1]];
    });

    const gradeAns = realData
      .map((body, i, arr) => {
        let grade = 1;
        arr.forEach((other, j) => {
          if (i === j) {
            return;
          }
          if (other[0] > body[0] && other[1] > body[1]) {
            grade++;
          }
        });
        return grade;
      })
      .join(" ");
    console.log(gradeAns);
  }

  solution();
})();
