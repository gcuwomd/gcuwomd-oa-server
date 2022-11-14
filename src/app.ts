/*
 * @Author: taozhiyaoyao taozhiyaoyao9527@outlook.com
 * @Date: 2022-11-12 21:58:42
 * @LastEditors: taozhiyaoyao
 * @LastEditTime: 2022-11-13 19:57:10
 * @FilePath: \gcuwomd-oa-server\src\app.ts
 * @Description: 入口文件
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.listen(port, () => {
  console.log("app is running at " + port);
});
