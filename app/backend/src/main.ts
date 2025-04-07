import { CONFIGDATA, onOpen, getHello } from "./event";
(global as any).excuteMain = excuteMain;
global.onOpen = onOpen;

export function excuteMain() {
  //補完がききます
  const message = CONFIGDATA.CONFIGMESSAGE;
  getHello(message);
}
