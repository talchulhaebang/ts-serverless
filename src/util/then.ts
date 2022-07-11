import { isPromise } from "./isPromise";

export const then = (fn: (...args: any[]) => any, param: any) =>
  isPromise(param) ? param.then(fn) : fn(param);
