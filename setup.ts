import fs from "fs";

function makeKey(num: number) {
  let text = "";
  for (let i = 0; i < num; i++) {
    text += String.fromCharCode(Math.floor(Math.random() * 65535));
  }
  return text;
}

fs.writeFileSync(".env", `PUBLIC=${makeKey(1000)}\nPRIVATE=${makeKey(1000)}`);
