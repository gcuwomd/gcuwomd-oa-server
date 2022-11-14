/*
 * @Author: taozhiyaoyao taozhiyaoyao9527@outlook.com
 * @Date: 2022-11-13 19:49:54
 * @LastEditors: taozhiyaoyao
 * @LastEditTime: 2022-11-14 20:15:45
 * @FilePath: \gcuwomd-oa-server\src\routes\index.ts
 * @Description: 路由总配置
 */
import { Express, Router } from "express";
import mysql2 from 'mysql2/promise';


const db = await mysql2.createConnection({})

interface IRouterConf {
  path:string;
  router:Router;
  meta?:unknown;
}

const RouterConf: Array<IRouterConf> = [];

const useRoutes = (app: Express):void => {

  RouterConf.forEach((conf) => {
    app.use(conf.path,conf.router)
  })
}

export {
  useRoutes,
  IRouterConf
}