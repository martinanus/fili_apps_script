function main()
{
  set_global_variables();
  // TODO - set some indicator that script is running
  validate_fields() // TODO - periodicity empty check
  process_form_data(); // TODO - format HTML email - format receipt
  populate_data_table();   
  clear_form();
  run_dbt();
}

function set_global_variables(){
  invoice_upload_page_name  = "Carga de Facturas";
  receipt_page_name         = "Comprobante";
  manual_upload_page_name   = "manual_upload";
  
  client_email              = 'soporte@somosfili.com';
  // fili_notif_email          = 'jeidlicz@gmail.com, \
  //                              agmendilaharzu@gmail.com, \
  //                              soporte@somosfili.com';
  fili_notif_email          = 'anusmartin1@gmail.com, \
                              soporte@somosfili.com';
  upload_folder_id          = '1gYNhl_1QetW_9v6B9j3s3awIV7LbTcn8';
  dbt_run_url               = 'https://dbt-fili-7txkfbm3yq-uc.a.run.app';
  item_q                    = 20;
  content_range             = "B3:B75";   // in invoice_upload_page
  final_invoice_cell        = "B18";      // in receipt_page
  default_bg_colour         = "white"; 
    
  field_cells_dict = {              
    "counterpart"               : "B3", // in invoice_upload_page
    "relation"                  : "B4",
    "email"                     : "B5",
    "is_approved"               : "B6",
    "installments"              : "B7",
    "fixcost_periodicity"       : "B8",
    "installments_periodicity"  : "B9",
    "invoice_date"              : "B10",
    "due_date"                  : "B11", 
    "invoice_id"                : "B12", 
    "invoice_group_1"           : "B13", 
    "invoice_group_2"           : "B14", 
    "tax"                       : "B15", 
    "item_1"                    : "B16", 
    "unit_price_1"              : "B17", 
    "quantity_1"                : "B18", 
  };

  spreadsheet           = SpreadsheetApp.getActiveSpreadsheet();
  invoice_upload_sheet  = spreadsheet.getSheetByName(invoice_upload_page_name);
  receipt_sheet         = spreadsheet.getSheetByName(receipt_page_name);
  manual_upload_sheet   = spreadsheet.getSheetByName(manual_upload_page_name);


  // Load values in dict
  field_values_dict = {
    "timestamp"   : new Date()
  };
  for (const [field, cell] of Object.entries(field_cells_dict)) {
    field_values_dict[field] = invoice_upload_sheet.getRange(cell).getValue();
  }

}


function validate_mandatory_fields(){    
    const mandatory_field_l = ["counterpart", "relation", "is_approved",  
                          "installments", "invoice_date", "due_date", 
                          "item_1", "unit_price_1", "quantity_1"];

    var error_field_l = []

    for (const field of mandatory_field_l){
      if (field_values_dict[field] == ''){
          console.log(field, " field is empty");
          error_field_l.push(field);
      }
    }

    for (const field of error_field_l){
      invoice_upload_sheet.getRange(field_cells_dict[field]).setBackground("#FF4122");
    }

    if (error_field_l.length){
      throw new Error( "Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_installments(){

    if (Number(field_values_dict["installments"] > 1) && (field_values_dict["installments_periodicity"] == '')) {      
      invoice_upload_sheet.getRange(field_cells_dict["installments_periodicity"]).setBackground("#FF4122");
      throw new Error( "Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");      
    }

    return;
}


function validate_fixcost(){

    if (field_values_dict["relation"] == "Costos Fijos" && field_values_dict["fixcost_periodicity"] == '') {
      invoice_upload_sheet.getRange(field_cells_dict["fixcost_periodicity"]).setBackground("#FF4122");
      throw new Error( "Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_dates(){    
    if (field_values_dict["due_date"] < field_values_dict["invoice_date"]){
      invoice_upload_sheet.getRange(field_cells_dict["invoice_date"]).setBackground("#FF4122");
      invoice_upload_sheet.getRange(field_cells_dict["due_date"]).setBackground("#FF4122");
      throw new Error( "La fecha de vencimiento no puede ser anterior a la fecha de emisión");
    }

    return;
}

function validate_items(){
  items_col       = field_cells_dict['item_1'][0];
  first_item_row  = field_cells_dict['item_1'].substring(1);                 
            
  let error_flag = false;
  
    for (let i = 0; i < item_q; i++) {
        let initial_cell  = Number(first_item_row) + 3*i;
        let item_i        = invoice_upload_sheet.getRange(items_col + (initial_cell  )).getValue();
        let unit_price_i  = invoice_upload_sheet.getRange(items_col + (initial_cell+1)).getValue();
        let quantity_i    = invoice_upload_sheet.getRange(items_col + (initial_cell+2)).getValue();

        if (item_i != '' || unit_price_i != '' || quantity_i != ''){
          if (item_i == '' || unit_price_i == '' || quantity_i == ''){
            invoice_upload_sheet.getRange(items_col+initial_cell+':'+items_col + (initial_cell+2)).setBackground("#FF4122");
            error_flag = true;
          }
        }           
    }

    if (error_flag){
      throw new Error( "Se debe indicar el precio unitario y las cantidades para cada item.");
    }

    return;
}

 function validate_fields(){

  clear_background();

  validate_mandatory_fields();
  validate_installments();
  validate_fixcost();
  validate_dates();
  validate_items(); 
  validate_items(field_cells_dict['item_1'][0],  
                  field_cells_dict['item_1'].substring(1)); 
  return;
 }


 function generate_export_url(){
    
  const url_base = spreadsheet.getUrl().replace(/edit$/,'');
  const sheet_tab_id = receipt_sheet.getSheetId();
  const ss_id = spreadsheet.getId();
  const export_url = url_base + 
    'export?'+
    'exportFormat=pdf&format=pdf' +
    '&gid=' + sheet_tab_id + 
    '&id=' + ss_id +
    '&size=A4' +          
    '&portrait=true' +    
    '&fitw=true' +        
    '&sheetnames=true'+
    '&printtitle=false'+
    '&pagenumbers=true' + 
    '&gridlines=false' +  
    '&fzr=false';         // frozen rows - do not repeat row headers on each page

  Logger.log('exportUrl: ' + export_url)

  return export_url;
 }

 function get_http_options(){
  var options;
  
  options = {
    headers: {
      'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken(),
    }
  }
  options.muteHttpExceptions = true; 

  return options;
 }

 function upload_pdf(http_response){
  var folder          = DriveApp.getFolderById(upload_folder_id);
  var invoice_id      = field_values_dict["invoice_id"];
  var the_blob        = http_response.getBlob().getAs('application/pdf').setName(invoice_id +'.pdf');
  var uploaded_file   = folder.createFile(the_blob);  

  return uploaded_file;
}

function send_email_with_receipt(file){
  let invoice_id = field_values_dict["invoice_id"];
  let counterpart = field_values_dict["counterpart"];
  let subject = `Se generó su comprobante con ID ${invoice_id}`;
  let message = `Estimado/a, \n\nAdjunto a este email vas a encontrar el comprobante \
recientemente generado para ${counterpart} con ID ${invoice_id}. \
\n\nSaludos, \nEl equipo de Fili.`;
            
  GmailApp.sendEmail(client_email, subject, message, {
    attachments: [file]
  })
  Logger.log("Se envió la factura al cliente:  " + client_email);
    
  return;
}


function send_email_pending_generation(file){
  let invoice_id = field_values_dict["invoice_id"];
  let counterpart = field_values_dict["counterpart"];
  let subject = `Sus comprobantes con ID ${invoice_id} están en proceso`;
  let message = `Estimado/a, \n\nLos comprobantes recientemente generados \
para ${counterpart}, con ID ${invoice_id} se encuentran en proceso. \
\n\nSaludos, \nEl equipo de Fili.`;                

  GmailApp.sendEmail(client_email, subject, message);

  Logger.log("Se notificó que la generación está en proceso al cliente: " + client_email);
    
  return;
}


function send_email_internal_notif(file){
  let invoice_id  = field_values_dict["invoice_id"];
  let counterpart = field_values_dict["counterpart"];
  let sheet_name  = spreadsheet.getName();
  

  let subject = `Se cargó un nuevo comprobante en cuotas / costo fijo, ID ${invoice_id}`;
  let message = `Equipo Fili, \nSe acaba de generar un comprobante \
para ${counterpart}, con ID ${invoice_id} en la sheet ${sheet_name}. \
Se puso en marcha la generación de tantos comprobantes como correspondan, \
con sus fechas de vencimiento, montos y número de cuota si corresponde. \
\n\nSaludos, \nEl equipo de Fili.`

  GmailApp.sendEmail(fili_notif_email, subject, message);

  Logger.log('Se notificó internamente que se debe generar las facturas recurrentes '+
              'o por cuotas a: ' + fili_notif_email);
    
  return;
}

 function generate_receipt(){
  var export_url  = generate_export_url();
  var options     = get_http_options();

  // TODO - Format Invoice 
// var items = [item1=sh.getRange("D17"), item2=sh.getRange("D18"), item3=sh.getRange("D19"), item4=sh.getRange("D20"), item5=sh.getRange("D21"), item6=sh.getRange("D22"), item7=sh.getRange("D23"), item8=sh.getRange("D24"), item9=sh.getRange("D25"), item10=sh.getRange("D26"), item11=sh.getRange("D27"), item12=sh.getRange("D28"), item13=sh.getRange("D29"), item14=sh.getRange("D30"), item15=sh.getRange("D31"), item16=sh.getRange("D32"), item17=sh.getRange("D33"), item18=sh.getRange("D34"), item19=sh.getRange("D35"), item20=sh.getRange("D36")];

// for (const i of items) {
//   if(i.getValue() !== ""){
//     row = i.getRow();
//     var resetInvoice = sh.getRange(row,4,1,5);
//     resetInvoice.setBackground("#f3f3f3")
//   }
// }

// for (const i of items) {
//   if(i.getValue() == ""){
//     row = i.getRow();
//     var emptyRows = sh.getRange(row,1,1,sh.getLastColumn());
//     emptyRows.setBackground("white");
//   }
// }

  var response    = UrlFetchApp.fetch(export_url, options);
  if (response.getResponseCode() !== 200) {
    console.log("Error exporting Sheet to PDF!  Response Code: " + response.getResponseCode());
    throw new "Error en la generación del comprobante. Reintente luego por favor."
  }

  var uploaded_file = upload_pdf(response);
  
  var final_invoice_id = receipt_sheet.getRange(final_invoice_cell).getValue()
  field_values_dict["file_url"]   = uploaded_file.getUrl();  
  field_values_dict['invoice_id'] = final_invoice_id;

  return uploaded_file;
 }

 function process_form_data(){
  
  // TODO - AVOID BREAKING EMAIL MESSAGE IN MULTIPLE LINES
  if (field_values_dict["fixcost_periodicity"] == "" &&
    field_values_dict["installments_periodicity"] == ""){
    
    // TODO - Format invoice
    uploaded_file = generate_receipt();
    send_email_with_receipt(uploaded_file);
  } else {
    send_email_pending_generation();
    send_email_internal_notif();
  }

  return  
}


function populate_data_table(){

  

  data_arr = [];
  for (const [field, value] of Object.entries(field_values_dict)) {
    data_arr.push(value);
  }

  manual_upload_sheet.appendRow(data_arr);

  return;
}

function run_dbt() {
 // Use the OpenID token inside App Scripts
 const token = ScriptApp.getIdentityToken();
  var options = {
    'method' : 'get',
    'headers': {'Authorization': 'Bearer ' + token},
 };
// call the server
 var response = UrlFetchApp.fetch(dbt_run_url + '/hello', options);
}