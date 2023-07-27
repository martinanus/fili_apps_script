function clear_background(page_name, clear_range){
    var range = spreadsheet.getRange(page_name + '!' + clear_range);

    range.setBackground(default_bg_colour);
    SpreadsheetApp.flush();
}

function clear_inv_form_background(){
    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        invoice_upload_sheet.getRange(cell).setBackground(default_bg_colour);
    }
    SpreadsheetApp.flush();
}

function clear_client_form_background(){
    for (const [field, cell] of Object.entries(cells_client_dict)) {
        client_form_sheet.getRange(cell).setBackground(default_bg_colour);
    }
    SpreadsheetApp.flush();
}

function clear_internal_upload_background(){
    var clear_range = first_col_internal_load + first_row_internal_load + ":"
                  + last_col + last_row;
    clear_background(internal_upload_page_name, clear_range);
}

function clear_inv_form_content(){
    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        if (multicurrency_allowed==false && field == "currency"){
            continue;
        }
        if (field == "invoice_id"){
            invoice_upload_sheet.getRange(invoice_id_cell_to_clear).clearContent();
            continue;
        }
        invoice_upload_sheet.getRange(cell).clearContent();
    }
    SpreadsheetApp.flush();
}

function clear_client_form_content(){
    for (const [field, cell] of Object.entries(cells_client_dict)) {
        if (upload_only_client==true && field == "relation"){ // LL_specific
            continue;
        }
        client_form_sheet.getRange(cell).clearContent();
    }
    SpreadsheetApp.flush();
}


function set_running_status(){
    validate_sheet.getRange(status_cell).setBackground(running_bg_colour);
}

function set_validated_status(){
    validate_sheet.getRange(status_cell).setBackground(validated_bg_colour);
}

function set_ready_status(){
    validate_sheet.getRange(status_cell).setBackground(default_bg_colour);
}

function set_error_status(){
    validate_sheet.getRange(status_cell).setBackground(error_bg_colour);
}