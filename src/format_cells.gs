function clear_background(page_name, clear_range){
    var range = spreadsheet.getRange(page_name + '!' + clear_range);

    range.setBackground(default_bg_colour);
    SpreadsheetApp.flush();
}

function clear_inv_form_background(){
    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        if (invoice_upload_fix_fields_l.includes(field)){
            continue;
        }
        invoice_upload_sheet.getRange(cell).setBackground(default_bg_colour);
    }
    invoice_upload_sheet.getRange(is_approved_cell).setBackground(default_bg_colour);
    SpreadsheetApp.flush();
}

function clear_client_form_background(){
    for (const [field, cell] of Object.entries(cells_client_dict)) {
        if (counterpart_upload_fix_fields_l.includes(field)){
            continue;
        }
        client_form_sheet.getRange(cell).setBackground(default_bg_colour);
    }
    SpreadsheetApp.flush();
}

function clear_internal_upload_background(){
    var clear_range = first_col + first_row + ":"
                  + last_col + last_row;
    clear_background(internal_upload_page_name, clear_range);
}
function clear_crm_upload_background(){
    var clear_range = first_col + first_row + ":"
                  + last_col + last_row;
    clear_background(client_upload_page_name, clear_range);
}
function clear_payment_upload_background(){
    var clear_range = first_col + first_row + ":"
                  + last_col + last_row;
    clear_background(payment_upload_page_name, clear_range);
}

function clear_inv_form_content(){
    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        if (invoice_upload_fix_fields_l.includes(field)){
            continue;
        }
        if (field == "invoice_id"){
            invoice_upload_sheet.getRange(invoice_id_cell_to_clear).clearContent();
            continue;
        }
        invoice_upload_sheet.getRange(cell).clearContent();
    }
    invoice_upload_sheet.getRange(is_approved_cell).clearContent();
    invoice_upload_sheet.getRange(custom_mail_content_cell).clearContent();
    SpreadsheetApp.flush();
}

function clear_client_form_content(){
    for (const [field, cell] of Object.entries(cells_client_dict)) {
        if (counterpart_upload_fix_fields_l.includes(field)){
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