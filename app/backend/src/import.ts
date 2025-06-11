import { CONFIGINFO, SHEETNAMES } from "./constValues";
import { setLog_ } from "./main";
interface uploadBlob {
  data: string;
  mimeType: string;
  fileName: string;
  folder: string;
  user: string;
  isOcr: boolean;
}
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
  const idRng = CONFIGINFO.ATTACHFOLDER_ID_RNG;
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

  setLog_([
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
