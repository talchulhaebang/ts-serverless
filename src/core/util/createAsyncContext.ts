import asyncHooks from "async_hooks";

let asyncHook: asyncHooks.AsyncHook | undefined = undefined;
if (!asyncHook) {
  asyncHook = asyncHooks
    .createHook({
      init: (asyncId, type, triggerAsyncId) => {
        // 새로운 비동기 리소스가 생성되었을 때
        // 만약 부모 asyncId가 이미 context 객체를 가지고 있다면
        // 해당 context 객체를 현재 리소스 asyncId에 할당합니다
        if (contexts[triggerAsyncId]) {
          contexts[asyncId] = contexts[triggerAsyncId];
        }
      },
      destroy: (asyncId) => {
        // 메모리 누수를 방지하기 위해 정리하는 작업을 합니다
        delete contexts[asyncId];
      },
    })
    .enable();
}
export const contexts: any = {};
export function createAsyncContext(e: any) {
  const id = asyncHooks.executionAsyncId();
  contexts[id] = e;

  console.log("context@@@");
  console.log(JSON.stringify(contexts));

  return e;
}
