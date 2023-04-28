function main()
{
  paintFields()
  validateFields()
  savePDF();
  callCloudRun();
} 

 function paintFields()
{
  ss = SpreadsheetApp.getActiveSpreadsheet();//This assumes that the Apps Script project is bound to a G-Sheet
  var originSheet = ss.getSheetByName("Carga de Facturas");
  var variables = [
    counterpart=originSheet.getRange("B3:B4"),
    approved=originSheet.getRange("B6"),
    installments=originSheet.getRange("B7"),
    dates=originSheet.getRange("B10:B11"),
    item=originSheet.getRange("B14:B16")
  ];
  for (const i of variables) {
      i.setBackground("#0AFB3A")
    }

}

 function validateFields(){
    ss = SpreadsheetApp.getActiveSpreadsheet();//This assumes that the Apps Script project is bound to a G-Sheet
    var originSheet = ss.getSheetByName("Carga de Facturas");

    var rg1=originSheet.getRange("B3:B73");
    var vA1=rg1.getValues().map(function(r){return r[0];});
    vA1.unshift(new Date());

    //// Field Validation

  var variables = [
    counterpart=originSheet.getRange("B3:B4"),
    approved=originSheet.getRange("B6"),
    installments=originSheet.getRange("B7"),
    dates=originSheet.getRange("B10:B11"),
    item=originSheet.getRange("B14:B16")
  ];
  var installment_periodicity =originSheet.getRange("B9")
  var fixcost_periodicity =originSheet.getRange("B8")


    if (vA1[1] == "" || vA1[2] == "" || vA1[4] == "" || vA1[5] == "" || vA1[8] == "" || vA1[9] == "" || vA1[12] == "" || vA1[13] == "" || vA1[14] == "") {
      for (const i of variables) {
        if (i.getValue() == "") {
          Logger.log(i.getValue())
          i.setBackground("#FF4122");
        }
      }
      console.log("Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
      throw new Error( "Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
      return;
    }

    if (Number(installments.getValue()) > +1 && vA1[7] == '') {
      installment_periodicity.setBackground("#FF4122");
      console.log("Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
      throw new Error( "Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
      
      return;
    }

    if (vA1[2] == "Costos Fijos" && vA1[6] == '') {
      fixcost_periodicity.setBackground("#FF4122");
      console.log("Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
      throw new Error( "Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
      
      return;
    }


    if (vA1[6] !== '' & vA1[2] !== "Costos Fijos") {
      fixcost_periodicity.setBackground("#FF4122");
      counterpart.setBackground("#FF4122");
      console.log("Por favor, seleccione un costo fijo o modifique el valor de la periodicidad para que el comprobante pueda ser cargado. Muchas gracias.");
      throw new Error( "Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
      
      return;
    }

    /// Processing data

    counterpart.setBackground("#0AFB3A");
    installments.setBackground("#0AFB3A");
    dates.setBackground("#0AFB3A");  
    item.setBackground("#0AFB3A");
    approved.setBackground("#0AFB3A");


 }

 function savePDF()
{
  // function c2ode goes here;
  // add more elements to onErrObj as desired;

  var blob,exportUrl,options,pdfFile,response,sheetTabNameToGet,sheetTabId,ss,ssID,url_base;

  sheetTabNameToGet = "Comprobante";//Replace the name with the sheet tab name for your situation
  ss = SpreadsheetApp.getActiveSpreadsheet();//This assumes that the Apps Script project is bound to a G-Sheet
  ssID = ss.getId();
  range = ss.getRange("Carga de Facturas!B3:B73");
  sh = ss.getSheetByName('Comprobante');
  sheetTabId = sh.getSheetId();
  url_base = ss.getUrl().replace(/edit$/,'');
  var folderId = PropertiesService.getScriptProperties().getProperty('folderId');
  var clientEmail = PropertiesService.getScriptProperties().getProperty('clientEmail');
  folder = DriveApp.getFolderById(folderId);
  var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getName();

  exportUrl = url_base + 'export?exportFormat=pdf&format=pdf' +

    '&gid=' + sheetTabId + '&id=' + ssID +
    '&size=A4' +     // paper size
    '&portrait=true' +   // orientation, false for landscape
    '&fitw=true' +       // fit to width, false for actual size
    '&sheetnames=true&printtitle=false&pagenumbers=true' + //hide optional headers and footers
    '&gridlines=false' + // hide gridlines
    '&fzr=false';       // do not repeat row headers (frozen rows) on each page

  Logger.log('exportUrl: ' + exportUrl)

  options = {
    headers: {
      'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken(),
    }
  }

  options.muteHttpExceptions = true;//Make sure this is always set

/// Format Invoice 



var items = [item1=sh.getRange("D17"), item2=sh.getRange("D18"), item3=sh.getRange("D19"), item4=sh.getRange("D20"), item5=sh.getRange("D21"), item6=sh.getRange("D22"), item7=sh.getRange("D23"), item8=sh.getRange("D24"), item9=sh.getRange("D25"), item10=sh.getRange("D26"), item11=sh.getRange("D27"), item12=sh.getRange("D28"), item13=sh.getRange("D29"), item14=sh.getRange("D30"), item15=sh.getRange("D31"), item16=sh.getRange("D32"), item17=sh.getRange("D33"), item18=sh.getRange("D34"), item19=sh.getRange("D35"), item20=sh.getRange("D36")];

for (const i of items) {
  if(i.getValue() !== ""){
    row = i.getRow();
    var resetInvoice = sh.getRange(row,4,1,5);
    resetInvoice.setBackground("#f3f3f3")
  }
}

for (const i of items) {
  if(i.getValue() == ""){
    row = i.getRow();
    var emptyRows = sh.getRange(row,1,1,sh.getLastColumn());
    emptyRows.setBackground("white");
  }
}

  response = UrlFetchApp.fetch(exportUrl, options);

  Logger.log(response.getResponseCode())

  if (response.getResponseCode() !== 200) {
    console.log("Error exporting Sheet to PDF!  Response Code: " + response.getResponseCode());
    return;

  }


  var originSheet = ss.getSheetByName("Carga de Facturas");
  var destSheet = ss.getSheetByName("manual_upload");
  var invoice_id = sh.getRange(18,2).getValue()

  var rg1=originSheet.getRange("B3:B73");
  var vA1=rg1.getValues().map(function(r){return r[0];});
  vA1.unshift(new Date());


/// Variables

var variables = [
counterpart=originSheet.getRange("B3:B4"),
approved=originSheet.getRange("B6"),
installments=originSheet.getRange("B7"),
dates=originSheet.getRange("B10:B11"),
item=originSheet.getRange("B14:B16")
];
var installment_periodicity =originSheet.getRange("B9")
var fixcost_periodicity =originSheet.getRange("B8")



 /// Replace InvoiceID if null in upload

  if (vA1[10] == '') {
    vA1[10] = invoice_id;
    }
  Logger.log ("InvoiceID: " +vA1[10])

//// Get url_invoice and print at 70 position (end of array)


  if (vA1[6] == "" && vA1[7] == "") {
    var theBlob = response.getBlob().getAs('application/pdf').setName(vA1[10] +'.pdf');
    var newFile = folder.createFile(theBlob);
    var fileUrl = newFile.getUrl()
    Logger.log(newFile.getUrl())
    vA1[72] = fileUrl
    Logger.log ("FileURL:  " +vA1[72])
  }


  /// Re-arrange array

  vA1.splice(11, 0, "")
  vA1.splice(12, 0, "")


  /// Append invoice data

  destSheet.appendRow(vA1)

  /// Clear data after validation and PDF saved

  range.clearContent();
  counterpart.setBackground("white");
  installments.setBackground("white");
  dates.setBackground("white");  
  item.setBackground("white");
  approved.setBackground("white");
  installment_periodicity.setBackground("white");
  fixcost_periodicity.setBackground("white");


/// Send e-mail with PDF

  if (vA1[6] == "" && vA1[7] == "") {
    Logger.log("se enviará la factura al email " + clientEmail)
    let subject = 'Se generó su comprobante con ID ' + vA1[10]
    let message = 'Estimado/a, \n\n Adjunto a este email vas a encontrar el comprobante recientemente generado para ' + vA1[1] + ', con ID ' + vA1[10] + '.\n\n  Saludos, \n El equipo de Fili.'
  GmailApp.sendEmail(clientEmail, subject, message, {
     attachments: [newFile]
     })
    return;
  }

  if (vA1[6] !== "" || vA1[7] !== "") {
    Logger.log("se enviará la factura al email " + clientEmail)
    let subject1 = 'Sus comprobantes con ID ' + vA1[10] + ' están en proceso'
    let message1 = 'Estimado/a, \n\n Los comprobantes recientemente generados para ' + vA1[1] + ', con ID ' + vA1[10] + ' se encuentran en proceso.\n\n  Saludos, \n El equipo de Fili.'
  GmailApp.sendEmail(clientEmail, subject1, message1, {
  })
    let subject2 = 'Se cargó un nuevo comprobante en cuotas / costo fijo, ID ' + vA1[10]
    let message2 = 'Equipo Fili, \n\n Se acaba de generar un comprobante para' + vA1[1] + ', con ID ' + vA1[10] + ' en la sheet ' + actualSheetName + '. Se puso en marcha la generación de tantos comprobantes como correspondan, con sus fechas de vencimiento, montos y número de cuota si corresponde.\n\n  Saludos, \n El equipo de Fili.'
  GmailApp.sendEmail('jeidlicz@gmail.com, agmendilaharzu@gmail.com, soporte@somosfili.com', subject2, message2, {
  })

    return;
  }

}

function callCloudRun() {
  var CLOUD_RUN_URL = PropertiesService.getScriptProperties().getProperty('CLOUD_RUN_URL');
 // Use the OpenID token inside App Scripts
 const token = ScriptApp.getIdentityToken();
var options = {
  'method' : 'get',
  'headers': {'Authorization': 'Bearer ' + token},
 };
// call the server
 var response = UrlFetchApp.fetch(CLOUD_RUN_URL + '/hello', options);
}