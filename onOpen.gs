function onOpen() {
  sheetTabNameToGet = "Comprobante";//Replace the name with the sheet tab name for your situation
  ss = SpreadsheetApp.getActiveSpreadsheet();//This assumes that the Apps Script project is bound to a G-Sheet
  ssID = ss.getId();
  range = ss.getRange("Carga de Facturas!B3:B73");
  var originSheet = ss.getSheetByName("Carga de Facturas");

  var counterpart=originSheet.getRange("B3:B4");
  var approved=originSheet.getRange("B6");
  var installments=originSheet.getRange("B7");
  var dates=originSheet.getRange("B10:B11");
  var item=originSheet.getRange("B14:B16");
  var installment_periodicity =originSheet.getRange("B9")
  var fixcost_periodicity =originSheet.getRange("B8")



  range.clearContent();
  counterpart.setBackground("white");
  installments.setBackground("white");
  dates.setBackground("white");  
  item.setBackground("white");
  approved.setBackground("white");
  installment_periodicity.setBackground("white");
  fixcost_periodicity.setBackground("white");
}
