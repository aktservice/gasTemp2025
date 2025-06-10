import { SHEETNAMES } from "./constValues";
/**
 * @description HTML側から実行するファイルをドライブへ送信する関数 for frontend
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 01/04/2024
 * @param {uploadBlob}uploadBlob
 */

export function importFile(uploadBlob: uploadBlob): string {
  const blb = Utilities.newBlob(
    Utilities.base64Decode(uploadBlob.data),
    uploadBlob.mimeType,
    uploadBlob.fileName
  );
  const sp = SpreadsheetApp.getActiveSpreadsheet();
  const sh = sp.getSheetByName(SHEETNAMES.CONFIGSHNAME);
  if (!sh) {
    throw new Error(`Sheet with name "${SHEETNAMES.CONFIGSHNAME}" not found.`);
  }
  const idRng = CONFIGRNGINFO.ATTACHFOLDERID;
  const rootFolderId = sh.getRange(idRng).getValue();

  const file = Drive.Files.create(
    {
      name: blb.getName() ?? "defaultFileName",
      parents: [rootFolderId],
      description: `${uploadBlob.folder}・${uploadBlob.user}`,
    },
    blb,
    { supportsAllDrives: true, fields: "webViewLink,name,id" }
  );

  setLog_("upload", [
    file.webViewLink ?? "defaultWebViewLink",
    uploadBlob.folder,
    file.name ?? "defaultFileName",
    file.id ?? "defaultId",
  ]);
  const returnFileData = JSON.stringify({
    url: file.webViewLink,
    title: file.name,
  });
  return returnFileData;
}

/**
 * @description userEmailを取得する関数 for frontend
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 02/05/2025
 * @export
 * @returns {*}  {string}
 */
export function getSessionUser(): string {
  const userEmailAddress = Session.getActiveUser().getEmail();
  return userEmailAddress;
}
/**
 * @description ログをセット
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 2023-03-27
 * @param {string} [change="access"]
 * @param {string} [machineName=""]
 * @param {string} [userName=""]
 */
function setLog_(change = "access", addData: string[]): void {
  const sp = SpreadsheetApp.getActiveSpreadsheet();
  const sh = sp.getSheetByName(SHEETNAMES.MAINSHEETNAME);
  const accessDate = new Date();
  const sessionUser = Session.getActiveUser().getEmail();
  let appendData = [accessDate, sessionUser, change].concat(addData);
  const lock = LockService.getScriptLock();
  if (lock.tryLock(10000)) {
    sh?.appendRow(appendData);
    lock.releaseLock();
  } else {
    Logger.log("appendError");
  }
}
