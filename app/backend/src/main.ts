/**
 * @description openイベント
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 2022-10-18
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu("メニュー");
  menu.addToUi();
}

/**
 * @description webapp Template entrypoint
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 2024-05-03
 * @param {GoogleAppsScript.Events.DoGet} e
 * @returns
 */
function doGet(e: GoogleAppsScript.Events.DoGet) {
  //contentsに割り込み文字列を入れてシートIDとROWを入れる
  //status は　add , stop, confirm
  // entry point
  // e.parameter.paramName query param get
  //https://script.google.com/script/**********/exec?pramname1=pram1&pramname2=pram2****pramnameN=pramN
  const pram0: string = e.parameter.mode;
  switch (pram0) {
    case WebMode.admin:
      Logger.log("Admin mode selected");
      // Adminモードの処理
      break;

    case WebMode.reply:
      Logger.log("Reply mode selected");
      // Replyモードの処理
      break;

    case WebMode.nget:
      Logger.log("Get mode selected");
      // Getモードの処理
      const pram1: string = e.parameter.status; //status
      const pram2: string = e.parameter.sheetRowIndex; //sheetRowIndex
      const pram3: string = e.parameter.sheetId; //sheetId
      const outPut = HtmlService.createHtmlOutputFromFile("thankyou");
      setData(parseInt(pram3), decodeURI(pram1), parseInt(pram2));
      return outPut;

      break;
    case WebMode.import:
      Logger.log("Import mode selected");
      // Importモードの処理
      return ContentService.createTextOutput("import mode selected");

    default:
      Logger.log("Invalid mode");
      const sisya = decodeURI(e.parameter.sisya);
      const htmlTemp = HtmlService.createTemplateFromFile("index");
      htmlTemp.sisyalist = buildSelectOptionsForDatalist(0);
      htmlTemp.GOTOHEADERLIST = buildSelectOptionsForDatalist(1);
      if (sisya !== "undefined") {
        htmlTemp.SISYA = sisya;
      } else {
        htmlTemp.SISYA = "";
      }
      const output = htmlTemp.evaluate();
      output.setTitle("Email配信あっぷろーだー");
      //ファビコン
      output.setFaviconUrl(
        "https://drive.google.com/uc?id=1k00y3_wIc7S2FCzdLAqDYlVMZAKQmY3o&.png"
      );

      //モバイル対応用のviewport設定はここでいれないと動かない
      output.addMetaTag("viewport", "width=device-width, initial-scale=1.0");

      return output;
      break;
  }
}
