import fs from "fs";
import * as readline from "readline";
import bcrypt from "bcrypt";
import { User, permission } from "./src/types/user";
import { db } from "./src/global";
import { makeKey } from "./src/utils/makeKey";
import { Document, documentTypes } from "./src/types/document";
console.log("✨ Lightvalley SETUP ✨");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = async (questions: Array<string>): Promise<Array<string>> => {
  const answers: Array<string> = [];
  for (const question of questions) {
    const answer = await new Promise<string>((resolve) => {
      rl.question(question, resolve);
    });
    answers.push(answer);
  }
  return answers;
};

const keySetup = async () => {
  const accessToken = makeKey(1000);
  const refreshToken = makeKey(1000);
  const envContent = `ACCESS=${accessToken}\nREFRESH=${refreshToken}`;
  fs.writeFileSync(".env", envContent);
  console.log("✨ 키 생성 완료 ✨");
  await main();
};

const createRootUser = async () => {
  const questions = [
    "소유자 계정 이름(lightvalley): ",
    "소유자 계정 태그: ",
    "소유자 계정 비밀번호: ",
  ];
  try {
    const [name = "lightvalley", tag = "0000", pw = ""] = await ask(questions);
    if (!pw) throw new Error("비밀번호가 없어요.");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    const user: User = {
      name,
      tag,
      identifier: `${name}#${tag}`,
      password: hash,
      time: new Date(),
      permission: permission.owner,
    };
    await db("users").insert(user);
    console.log("✨ 소유자 계정 생성 완료 ✨");
  } catch (error) {
    console.error(error);
  } finally {
    rl.close();
    process.exit();
  }
};

const createIndexPage = async () => {
  const document: Document = {
    version: 1,
    type: documentTypes.DOCUMENT,
    author: "lightvalley",
    name: "index",
    identifier: `DOCUMENT:index:1`,
    displayname: "INDEX",
    content: "Hello, World!",
    time: new Date(),
    read: 3,
    edit: 0,
  };
  await db("documents").insert(document);
  await main();
};

const main = async () => {
  rl.question(
    "1. JWT 키 생성\n2. 소유자 계정 생성\n3. Index 문서 생성\n",
    async (answer: string) => {
      switch (answer) {
        case "1":
          await keySetup();
          break;
        case "2":
          await createRootUser();
          break;
        case "3":
          await createIndexPage();
          break;
        default:
          console.log("잘못된 입력입니다.");
          rl.close();
          break;
      }
    }
  );
};

main();
