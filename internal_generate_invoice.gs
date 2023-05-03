function internal_main()
{
  createRow();
  callCloudRun();
} 

 function createRow()
{
  // function c2ode goes here;
  // add more elements to onErrObj as desired;

  var blob,exportUrl,options,pdfFile,response,sheetTabNameToGet,sheetTabId,ss,ssID,url_base;

  sheetTabNameToGet = "Comprobante";//Replace the name with the sheet tab name for your situation
  ss = SpreadsheetApp.getActiveSpreadsheet();//This assumes that the Apps Script project is bound to a G-Sheet
  ssID = ss.getId();
  range = ss.getRange("Carga Interna de Facturas!B3:B75");
  sh = ss.getSheetByName('Comprobante');
  sheetTabId = sh.getSheetId();
  url_base = ss.getUrl().replace(/edit$/,'');
  var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getName();
  var clientEmail = PropertiesService.getScriptProperties().getProperty('clientEmail');



//  let invoice = DriveApp.getFileById(shid);
  var originSheet = ss.getSheetByName("Carga Interna de Facturas");
  var destSheet = ss.getSheetByName("Items (Carga interna de facturas)");
  var invoice_id = sh.getRange(18,2).getValue()


  var rg1=originSheet.getRange("B3:B75");
  var vA1=rg1.getValues().map(function(r){return r[0];});
  vA1.unshift(new Date());

/// Variables

var variables = [
counterpart=originSheet.getRange("B3:B4"),
approved=originSheet.getRange("B6"),
installments=originSheet.getRange("B7"),
dates=originSheet.getRange("B10:B11"),
invoiceid = originSheet.getRange("B12"),
item=originSheet.getRange("B16:B18"),
url_invoice =originSheet.getRange("B13"),
is_invoice =originSheet.getRange("B14")
];
var installment_periodicity =originSheet.getRange("B9")
var fixcost_periodicity =originSheet.getRange("B8")
Logger.log(vA1[12])


//// Field Validation


  if (vA1[1] == "" || vA1[2] == "" || vA1[4] == "" || vA1[5] == "" || vA1[8] == "" || vA1[9] == "" ||  vA1[10] == "" || vA1[11] == "" ||  vA1[12] === "" || vA1[14] == "" || vA1[15] == "" || vA1[16] == "") {
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
    installment_periodicity.setBackground("#CD5C5C");
    console.log("Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
    throw new Error( "Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
    
    return;
  }

  if (vA1[2] == "Costos Fijos" && vA1[6] == '') {
    fixcost_periodicity.setBackground("#CD5C5C");
    console.log("Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
    throw new Error( "Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
    
    return;
  }

  /// Processing data

  counterpart.setBackground("#0AFB3A");
  installments.setBackground("#0AFB3A");
  dates.setBackground("#0AFB3A");  
  item.setBackground("#0AFB3A");
  approved.setBackground("#0AFB3A");
  url_invoice.setBackground("#0AFB3A");
  is_invoice.setBackground("#0AFB3A");


 /// Replace InvoiceID if null in upload

  if (vA1[10] == '') {
    vA1[10] = invoice_id;
    }
  Logger.log ("InvoiceID: " +vA1[10])

 /// Re-arrange array

  vA1.splice(75,0,vA1.splice(11,1)[0])
  vA1.splice(75,0,vA1.splice(11,1)[0])
  vA1.splice(11, 0, "")
  vA1.splice(12, 0, "")


  /// Append invoice data

  destSheet.appendRow(vA1)

  /// Clear data after validation

  range.clearContent();
  counterpart.setBackground("white");
  installments.setBackground("white");
  dates.setBackground("white");  
  item.setBackground("white");
  approved.setBackground("white");
  installment_periodicity.setBackground("white");
  fixcost_periodicity.setBackground("white");
  url_invoice.setBackground("white");
  is_invoice.setBackground("white");



/// Send e-mail with PDF

var aliases = GmailApp.getAliases();

/*
  if (vA1[6] == "" && vA1[7] == "") {
    Logger.log("se enviará la factura al email " + clientEmail)
    let subject = 'Se cargó con éxito el comprobante con ID ' + vA1[10]
    let message = 'Estimado/a, \n\n Su solicitud de carga automática del comprobante para ' + vA1[1] + ', con ID ' + vA1[10] + ' ha sido efectuada exitosamente.\n\n  Saludos, \n El equipo de Fili.'
  GmailApp.sendEmail(clientEmail, subject, message)
    return;
  }
*/

  if (vA1[6] !== "" || vA1[7] !== "") {
    let subject2 = 'Se cargó un nuevo comprobante en cuotas / costo fijo, ID ' + vA1[10]
    let message2 = 'Equipo Fili, \n\n Se acaba de generar un comprobante para' + vA1[1] + ', con ID ' + vA1[10] + ' en la sheet ' + actualSheetName + '. Se puso en marcha la generación de tantos comprobantes como correspondan, con sus fechas de vencimiento, montos y número de cuota si corresponde.\n\n  Saludos, \n El equipo de Fili.'
  GmailApp.sendEmail('jeidlicz@gmail.com, agmendilaharzu@gmail.com, soporte@somosfili.com', subject2, message2, {
  })

    return;
  }

}

function callCloudRun() {
  var CLOUD_RUN_URL = 'https://dbt-fili-7txkfbm3yq-uc.a.run.app';
 // Use the OpenID token inside App Scripts
 const token = ScriptApp.getIdentityToken();
var options = {
  'method' : 'get',
  'headers': {'Authorization': 'Bearer ' + token},
 };
// call the server
 var response = UrlFetchApp.fetch(CLOUD_RUN_URL + '/hello', options);
}