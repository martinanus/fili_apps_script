function generate_invoice()
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


 function process_form_data(){
  
  if (field_values_dict["fixcost_periodicity"] == "" &&
    field_values_dict["installments_periodicity"] == ""){
    
    var response = generate_pdf_receipt();
    var uploaded_file = upload_pdf(response);

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
  UrlFetchApp.fetch(dbt_run_url + '/hello', options);
}

function exit_on_error(error_msg){
  set_error_status();
  throw new Error(error_msg);
}

