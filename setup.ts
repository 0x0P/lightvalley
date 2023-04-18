import fs from "fs";
import * as readline from "node:readline";
import bcrypt from "bcrypt";
import { User, permission } from "./src/types/user";
import { db } from "./src/global";
import { makeKey } from "./src/utils/makeKey";

console.log(`✨Lightvalley SETUP✨`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const q = [
  "소유자 계정 이름(lightvalley) : ",
  "소유자 계정 태그 : ",
  "소유자 계정 비밀번호 : ",
];

const ask = async (questions: Array<string>): Promise<Array<string>> => {
  const answers: Array<string> = [];
  for (const question of questions) {
    const answer = await new Promise<string>((r) => {
      rl.question(question, r);
    });
    answers.push(answer);
  }
  rl.close();
  return answers;
};

ask(q)
  .then(async (answers) => {
    const [name, tag, pw] = answers;
    if (!pw) return console.log("비밀번호가 없습니다.");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    const user: User = {
      name: name || "lightvalley",
      tag: tag || "0000",
      identifier: (name || "lightvalley") + "#" + (tag || "0000"),
      password: hash,
      time: new Date(),
      permission: permission.admin,
    };
    await db("users").insert(user);
    console.log("✨소유자 계정 생성 완료✨");
    process.exit();
  })
  .catch((error) => {
    console.error(error);
  });

fs.writeFileSync(".env", `PUBLIC=${makeKey(1000)}\nPRIVATE=${makeKey(1000)}`);
