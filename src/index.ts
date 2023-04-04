import express, { NextFunction, Request, Response } from "express";
import index from "./router";
import { db } from "./global";

const app = express();
const port = 3000;

db.connect((e) => {
  if (e) {
    console.error(e.stack);
  } else {
    console.log("DB 연결됨");
  }
});

app.use("/", index);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
