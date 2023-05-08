function main()
{
  set_global_variables();
  set_running_status();
  validate_fields();
  process_form_data(); 
  populate_data_table();   
  clear_form();
  run_dbt();
  set_ready_status();
}

function set_global_variables(){
  invoice_upload_page_name  = "Carga de Facturas";
  receipt_page_name         = "Comprobante";
  manual_upload_page_name   = "manual_upload";
  
  client_email              = 'soporte@somosfili.com';
  // TODO - Replace emails for real operation
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
  execute_button_cell       = "B2";       // in receipt_page
  default_bg_colour         = "#FFFFFF";    // white 
  running_bg_colour         = "#FF6D01";   // orange
  error_bg_colour           = "#FF4122";   // red
  validated_bg_colour       = "#0ADB3A";   // green
    
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

function set_running_status(){
  invoice_upload_sheet.getRange(execute_button_cell).setBackground(running_bg_colour);
}
function set_validated_status(){
  invoice_upload_sheet.getRange(execute_button_cell).setBackground(validated_bg_colour);
}

function set_ready_status(){
  invoice_upload_sheet.getRange(execute_button_cell).setBackground(default_bg_colour);
}
function set_error_status(){
  invoice_upload_sheet.getRange(execute_button_cell).setBackground(error_bg_colour);
}

function exit_on_error(error_msg){
  set_error_status();
  throw new Error(error_msg);
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
      invoice_upload_sheet.getRange(field_cells_dict[field]).setBackground(error_bg_colour);
    }

    if (error_field_l.length){
      exit_on_error("Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_installments(){

    if (Number(field_values_dict["installments"] > 1) && (field_values_dict["installments_periodicity"] == '')) {      
      invoice_upload_sheet.getRange(field_cells_dict["installments_periodicity"]).setBackground(error_bg_colour);
      exit_on_error("Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    if (Number(field_values_dict["installments"] == 1) && (field_values_dict["installments_periodicity"] != '')) {      
      invoice_upload_sheet.getRange(field_cells_dict["installments_periodicity"]).setBackground(error_bg_colour);
      invoice_upload_sheet.getRange(field_cells_dict["installments"]).setBackground(error_bg_colour);
      exit_on_error("La periodicidad de cuotas solo debe ingresarse si Cuotas es mayor a 1. Caso contrario, el campo debe quedar vacío.");
    }

    return;
}


function validate_fixcost(){

    if (field_values_dict["relation"] == "Costos Fijos" && field_values_dict["fixcost_periodicity"] == '') {
      invoice_upload_sheet.getRange(field_cells_dict["fixcost_periodicity"]).setBackground(error_bg_colour);
      exit_on_error("Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    if (field_values_dict["relation"] != "Costos Fijos" && field_values_dict["fixcost_periodicity"] != '') {
      invoice_upload_sheet.getRange(field_cells_dict["fixcost_periodicity"]).setBackground(error_bg_colour);
      invoice_upload_sheet.getRange(field_cells_dict["relation"]).setBackground(error_bg_colour);
      exit_on_error("La periodicidad de costo fijo solo debe ingresarse si la Relación comercial es 'costos fijos'. Caso contrario, el campo  debe quedar vacío.");
    }

    return;
}

function validate_dates(){    
    if (field_values_dict["due_date"] < field_values_dict["invoice_date"]){
      invoice_upload_sheet.getRange(field_cells_dict["invoice_date"]).setBackground(error_bg_colour);
      invoice_upload_sheet.getRange(field_cells_dict["due_date"]).setBackground(error_bg_colour);
      exit_on_error("La fecha de vencimiento no puede ser anterior a la fecha de emisión");
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
            invoice_upload_sheet.getRange(items_col+initial_cell+':'+items_col + (initial_cell+2)).setBackground(error_bg_colour);
            error_flag = true;
          }
        }           
    }

    if (error_flag){
      exit_on_error("Se debe indicar el precio unitario y las cantidades para cada item.");
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

  set_validated_status();
  
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
  let message = `Estimado/a, <BR><BR>`
                + `Adjunto a este email vas a encontrar `
                + `el comprobante recientemente generado para ${counterpart} `
                + `con ID ${invoice_id}. <BR><BR>`
                + `Saludos, <BR> `
                + `El equipo de Fili.`;

  GmailApp.sendEmail(client_email, subject, '', {
    htmlBody    : message,
    attachments : [file]
  })
  Logger.log("Se envió la factura al cliente:  " + client_email);
    
  return;
}


function send_email_internal_notif(file){
  let counterpart = field_values_dict["counterpart"];
  let invoice_id = field_values_dict["invoice_id"];
  let sheet_name  = spreadsheet.getName();
  
  let subject = `[INFO] ${sheet_name} - Nuevo comprobante automático con ID ${invoice_id}`;
  let message = `Equipo Fili, <BR><BR>`
                + `Se acaba de generar un comprobante `
                + `para ${counterpart} en la sheet ${sheet_name} con ID ${invoice_id}. `
                + `No se requiere ninguna acción por parte de Fili. <BR><BR>`
                + `Saludos, <BR>`
                + `El equipo de Fili.`

  GmailApp.sendEmail(fili_notif_email, subject, '', {
    htmlBody : message
  });

  Logger.log('Se notificó internamente que se debe generar las facturas recurrentes '+
              'o por cuotas a: ' + fili_notif_email);
    
  return;
}


function send_email_pending_generation(){
  let counterpart = field_values_dict["counterpart"];
  let subject = `Sus comprobantes están en proceso`;
  let message = `Estimado/a, <BR><BR>`
                + `Los comprobantes recientemente generados `
                + `para ${counterpart} se encuentran en proceso. <BR><BR>` 
                + `Saludos, <BR> `
                + `El equipo de Fili.`;                

  GmailApp.sendEmail(client_email, subject, '', {
    htmlBody: message
  });

  Logger.log("Se notificó que la generación está en proceso al cliente: " + client_email);
    
  return;
}


function send_email_internal_action_req(file){
  let counterpart = field_values_dict["counterpart"];
  let sheet_name  = spreadsheet.getName();
  
  let subject = `[URGENTE] ${sheet_name} - Nuevo comprobante en cuotas / costo fijo`;
  let message = `Equipo Fili, <BR><BR>`
                + `Se acaba de generar un comprobante `
                + `para ${counterpart} en la sheet ${sheet_name}. `
                + `Se puso en marcha la generación de tantos comprobantes `
                + `como correspondan, con sus fechas de vencimiento, montos `
                + `y número de cuota si corresponde. <BR><BR>`
                + `Saludos, <BR>`
                + `El equipo de Fili.`

  GmailApp.sendEmail(fili_notif_email, subject, '', {
    htmlBody : message
  });

  Logger.log('Se notificó internamente que se debe generar las facturas recurrentes '+
              'o por cuotas a: ' + fili_notif_email);
    
  return;
}

 function generate_receipt(){
  var export_url  = generate_export_url();
  var options     = get_http_options();

  var response    = UrlFetchApp.fetch(export_url, options);
  if (response.getResponseCode() !== 200) {
    console.log("Error exporting Sheet to PDF!  Response Code: " + response.getResponseCode());
    exit_on_error("Error en la generación del comprobante. Reintente luego por favor.");
  }
  
  var final_invoice_id = receipt_sheet.getRange(final_invoice_cell).getValue()
  field_values_dict['invoice_id'] = final_invoice_id;

  var uploaded_file = upload_pdf(response);
  
  field_values_dict["file_url"]   = uploaded_file.getUrl();  

  return uploaded_file;
 }

 function process_form_data(){
  
  if (field_values_dict["fixcost_periodicity"] == "" &&
    field_values_dict["installments_periodicity"] == ""){
    
    uploaded_file = generate_receipt();
    send_email_with_receipt(uploaded_file);
    send_email_internal_notif();
  } else {
    send_email_pending_generation();
    send_email_internal_action_req();
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