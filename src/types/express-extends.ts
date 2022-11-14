/*
 * @Author: taozhiyaoyao
 * @LastEditors: taozhiyaoyao
 * @Date: 2022-11-14 19:34:42
 * @LastEditTime: 2022-11-14 19:39:41
 * @FilePath: \gcuwomd-oa-server\src\types\express-extends.ts
 * @Description: 
 */
import { Response,Request } from "express";

export interface IRequest<T> extends Request {
  ReqBody:T
}