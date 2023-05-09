function clear_background(page_name, clear_range){
    var range = spreadsheet.getRange(page_name + '!' + clear_range);

    range.setBackground(default_bg_colour);
    SpreadsheetApp.flush();
}

function clear_form_background(){
    clear_background(invoice_upload_page_name, content_range);
}

function clear_internal_upload_background(){
    var last_col = columnToLetter(upload_table_fields_l.length);
    var last_row = internal_upload_sheet.getLastRow();
    var clear_range = columnToLetter(first_col_internal_load) + first_row_internal_load + ":"
                  + last_col + last_row;
    clear_background(internal_upload_page_name, clear_range);
}

function clear_form_content(){
    var range = spreadsheet.getRange(invoice_upload_page_name + '!' + content_range);

    range.clearContent();
    SpreadsheetApp.flush();
}


function set_running_status(){
    invoice_upload_sheet.getRange(status_cell).setBackground(running_bg_colour);
}

function set_validated_status(){
    invoice_upload_sheet.getRange(status_cell).setBackground(validated_bg_colour);
}

function set_ready_status(){
    invoice_upload_sheet.getRange(status_cell).setBackground(default_bg_colour);
}

function set_error_status(){
    invoice_upload_sheet.getRange(status_cell).setBackground(error_bg_colour);
}