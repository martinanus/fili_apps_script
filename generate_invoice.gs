function main()
{
  // paintFields() // THIS IS DONE JUST TO INFORM THAT VALIDATION IS RUNNING
  validateFields()
  savePDF();
  clear_form();
  //callCloudRun();
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

function validate_mandatory_fields(field_values_dict, field_cells_dict, sheet){    
    mandatory_field_l = ["counterpart", "relation", "is_approved",  
                          "installments", "invoice_date", "due_date", 
                          "item_1", "unit_price_1", "quantity_1"];

    error_field_l = []

    for (const field of mandatory_field_l){
      if (field_values_dict[field] == ''){
          console.log(field, " field is empty");
          error_field_l.push(field);
      }
    }

    for (const field of error_field_l){
      sheet.getRange(field_cells_dict[field]).setBackground("#FF4122");
    }

    if (error_field_l.length){
      throw new Error( "Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_installments(field_values_dict, field_cells_dict, sheet){

    if (Number(field_values_dict["installments"] > 1) && (field_values_dict["installments_periodicity"] == '')) {      
      sheet.getRange(field_cells_dict["installments_periodicity"]).setBackground("#FF4122");
      throw new Error( "Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");      
    }

    return;
}


function validate_fixcost(field_values_dict, field_cells_dict, sheet){

    if (field_values_dict["relation"] == "Costos Fijos" && field_values_dict["fixcost_periodicity"] == '') {
      sheet.getRange(field_cells_dict["fixcost_periodicity"]).setBackground("#FF4122");
      throw new Error( "Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
      
    }

    return;
}

function validate_dates(field_values_dict, field_cells_dict, sheet){    
    if (field_values_dict["due_date"] < field_values_dict["invoice_date"]){
      sheet.getRange(field_cells_dict["invoice_date"]).setBackground("#FF4122");
      sheet.getRange(field_cells_dict["due_date"]).setBackground("#FF4122");
      throw new Error( "La fecha de vencimiento no puede ser anterior a la fecha de emisión");
    }
    return;
}

function validate_items(sheet, items_col, first_item_row, item_q){
  error_flag = false;
  
    for (let i = 0; i < item_q; i++) {
        initial_cell = Number(first_item_row) + 3*i;
        item_i        = sheet.getRange(items_col + (initial_cell  )).getValue();
        unit_price_i  = sheet.getRange(items_col + (initial_cell+1)).getValue();
        quantity_i    = sheet.getRange(items_col + (initial_cell+2)).getValue();

        if (item_i != '' || unit_price_i != '' || quantity_i != ''){
          if (item_i == '' || unit_price_i == '' || quantity_i == ''){
            sheet.getRange(items_col+initial_cell+':'+items_col + (initial_cell+2)).setBackground("#FF4122");
            error_flag = true;
          }
        }           
    }

    if (error_flag){
      throw new Error( "Se debe indicar el precio unitario y las cantidades para cada item.");
    }

    return;
}

 function validateFields(){
    page_name = "Carga de Facturas";
    items_q   = 20;
    
    field_cells_dict = {
      "counterpart"               : "B3",
      "relation"                  : "B4",
      "email"                     : "B5",
      "is_approved"               : "B6",
      "installments"              : "B7",
      "fixcost_periodicity"       : "B8",
      "installments_periodicity"  : "B9",
      "invoice_date"              : "B10",
      "due_date"                  : "B11", 
      "invoice_id"                : "B12", 
      "tax"                       : "B13", 
      "item_1"                    : "B14", 
      "unit_price_1"              : "B15", 
      "quantity_1"                : "B16", 
    };

    ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getSheetByName(page_name);


    // Load values in dict
    field_values_dict = {};
    for (const [field, cell] of Object.entries(field_cells_dict)) {
      field_values_dict[field] = sheet.getRange(cell).getValue();
    }


  
  validate_mandatory_fields(field_values_dict, field_cells_dict, sheet);

  validate_installments(field_values_dict, field_cells_dict, sheet);

  validate_fixcost(field_values_dict, field_cells_dict, sheet);

  validate_dates(field_values_dict, field_cells_dict, sheet);
  
  validate_items(sheet, field_cells_dict['item_1'][0], field_cells_dict['item_1'].substring(1) ,items_q ); 

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


  return
  /// Re-arrange array

  vA1.splice(11, 0, "")
  vA1.splice(12, 0, "")

  /// Format dates

  formatted_date = Utilities.formatDate(vA1[8], "GMT-3", 'MM/dd/yyyy');
  formatted_date = Utilities.formatDate(vA1[9], "GMT-3", 'MM/dd/yyyy');

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