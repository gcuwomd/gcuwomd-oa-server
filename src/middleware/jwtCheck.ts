/*
 * @Author: taozhiyaoyao
 * @LastEditors: taozhiyaoyao
 * @Date: 2022-11-13 20:09:56
 * @LastEditTime: 2022-11-14 21:25:27
 * @FilePath: \gcuwomd-oa-server\src\middleware\jwtCheck.ts
 * @Description: jwt 校验中间件
 */
import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRequest } from "../types/express-extends";
import { catchJWTError } from "./errorHandler";

const secret = "wxwxswzywb2022";

interface ITokenContent {
  host: string;
  user: string;
  timestamp: number;
}

/**
 * @description: 创建一个token
 * @return {string} token
 */
export const createToken = (
  data: ITokenContent,
  keepLogin: boolean
): string => {
  const expiresIn = keepLogin ? "15d" : "12h";
  return jwt.sign(data, secret, { expiresIn });
};


/**
 * @description: 
 * @param {string} token 需要检验的token
 * @return {JwtPayload | string} token 内的信息
 */
export const checkToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, secret);
};

/**
 * @description: jwt 校验白名单
 */
const whiteList: Array<string> = ["/sys/login", "/sys/register"];


/**
 * @description:
 * jwt token 校验
 * OPTIONS 方法直接放行
 * 白名单上的 url 放行
 * 非白名单上的方法校验请求头是否携带token
 */
export const checkAuth = (
  req: IRequest<unknown>,
  _res: Response,
  next: NextFunction
): void => {
  if (req.method === "OPTIONS") {
    next();
  } else {
    if (whiteList.includes(req.url)) {
      next();
    } else {
      const token = req.headers["x-acces-token"];
      if (!token) {
        catchJWTError("请求未携带token");
      }
      try {
        checkToken(token as string);
      } catch (error) {
        catchJWTError();
      }
    }
  }
};
