import express from "express";
import docs from "./router/docs/index";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("#LightValley");
});

app.use("/docs", docs);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
