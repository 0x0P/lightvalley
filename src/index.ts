import express from "express";
import index from "./routes";
import bodyParser from "body-parser";
import { db } from "./global";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", index);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
