import {
  LOCKTIME,
  MESSAGES,
  SHEETNAMES,
  WEBAPP,
  WEBMODE as WebMode,
} from "./constValues";
/**
 * @description webapp Template entrypoint
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 2024-05-03
 * @param {GoogleAppsScript.Events.DoGet} e
 * @returns
 */
function doGet(e: GoogleAppsScript.Events.DoGet) {
  const pram0: string = e.parameter.mode;
  switch (pram0) {
    case WebMode.ADMIN:
      Logger.log("Admin mode selected");
      // Adminモードの処理
      break;

    case WebMode.REPLY:
      Logger.log("Reply mode selected");
      // Replyモードの処理
      break;

    case WebMode.NGET:
      Logger.log("Get mode selected");
      // Getモードの処理
      const pram1: string = e.parameter.status; //status
      const pram2: string = e.parameter.sheetRowIndex; //sheetRowIndex
      const pram3: string = e.parameter.sheetId; //sheetId
      const outPut = HtmlService.createHtmlOutputFromFile(MESSAGES.THANKYOU);
      setLog_({
        pram3: parseInt(pram3),
        pram1: decodeURI(pram1),
        pram2: parseInt(pram2),
      });
      return outPut;

    case WebMode.IMPORT:
      Logger.log("Import mode selected");
      // Importモードの処理
      break;
    default:
      Logger.log("Invalid mode");
      const htmlTemp = HtmlService.createTemplateFromFile("index");

      const output = htmlTemp.evaluate();
      output.setTitle(WEBAPP.TITLE);
      //ファビコン
      output.setFaviconUrl(WEBAPP.FAVICONURL);

      //モバイル対応用のviewport設定はここでいれないと動かない
      output.addMetaTag(WEBAPP.VIEWPORT, WEBAPP.WIDTH_SCALE);

      return output;
      break;
  }
}
export function setLog_(args: {} | []): void {
  const sp = SpreadsheetApp.getActiveSpreadsheet();
  const sh = sp.getSheetByName(SHEETNAMES.LOGSHEETNAME);
  const accessDate = new Date();
  const sessionUser = Session.getActiveUser().getEmail();
  let appendData = [accessDate, sessionUser, ...Object.values(args)];
  const lock = LockService.getScriptLock();
  if (lock.tryLock(LOCKTIME.WAIT)) {
    sh?.appendRow(appendData);
    lock.releaseLock();
  } else {
    Logger.log(MESSAGES.APPENDERROR);
  }
}
