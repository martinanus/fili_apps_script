function clear_background(){
  
    var range = spreadsheet.getRange(invoice_upload_page_name + '!' + content_range);
    
    range.setBackground(default_bg_colour);
    SpreadsheetApp.flush();
}
  
function clear_form(){  
    var range = spreadsheet.getRange(invoice_upload_page_name + '!' + content_range);

    range.clearContent();
    SpreadsheetApp.flush();
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
  


