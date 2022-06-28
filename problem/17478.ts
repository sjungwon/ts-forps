(function () {
  function getInput(): string {
    const filePath =
      process.platform !== "linux" ? "./dev/stdin" : "/dev/stdin";
    const fs = require("fs");
    const input: string = fs.readFileSync(filePath).toString().trim();

    return input;
  }

  //17478번 문제
  //재귀 함수

  function solution(): void {
    const input: string = getInput();

    const max = parseInt(input);

    let messageArr: string[] = [
      "어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.",
    ];

    const prefix = "____";
    function recur(i: number): void {
      messageArr.push(prefix.repeat(i) + `"재귀함수가 뭔가요?"`);
      if (i === max) {
        messageArr.push(
          [
            prefix.repeat(i) + `"재귀함수는 자기 자신을 호출하는 함수라네"`,
            prefix.repeat(i) + "라고 답변하였지.",
          ].join("\n")
        );
        return;
      }
      const message = [
        prefix.repeat(i) +
          `"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`,
        prefix.repeat(i) +
          `마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`,
        prefix.repeat(i) +
          `그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`,
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
