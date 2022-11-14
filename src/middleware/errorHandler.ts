/*
 * @Author: taozhiyaoyao
 * @LastEditors: taozhiyaoyao
 * @Date: 2022-11-13 20:09:22
 * @LastEditTime: 2022-11-14 21:25:45
 * @FilePath: \gcuwomd-oa-server\src\middleware\errorHandler.ts
 * @Description: 错误处理中间件
 */
import { Response } from "express";
import { IRequest } from "../types/express-extends";

export enum errorCode {
  SQLERROR = 3306,
  INVALID_TOKEN,
}

interface IErrResp {
  path: string;
  message: string;
  errMsg: string;
}

export const errorHandler = (
  err: Error,
  req: IRequest<unknown>,
  res: Response
): void => {
  let code;
  const errorInfo: Array<string> = err.message.split(":");
  const errCode = Number(errorInfo[0]);
  const errMsg: string = errorInfo[1];
  const errResp: IErrResp = {
    path: req.path,
    message: "未知错误",
    errMsg,
  };

  switch (errCode) {
    case errorCode.SQLERROR:
      code = 500;
      errResp.message = "执行sql语句时出现错误，请联系平台维护者";
      break;
    case errorCode.INVALID_TOKEN:
      code = 401;
      errResp.message = errMsg;
      break;
    default:
      code = 500;
      break;
  }
  res.status(code).send(errResp);
};

export const catchSQLError = (message: string): Error => {
  return new Error(`${errorCode.SQLERROR}:${message}`);
};

export const catchJWTError = (message?: string): Error => {
  const msg = message ? message : "token 失效，请重新登录";
  return new Error(`${errorCode.INVALID_TOKEN}:${msg}`);
};
