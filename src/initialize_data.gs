
function set_global_variables(trig_source){
    source = trig_source;

    // Check for client custom variables
    if (client_name.includes("REPLACE_ME") ||
        upload_folder_id.includes("REPLACE_ME") ||
        client_email.includes("REPLACE_ME") ||
        dbt_run_url.includes("REPLACE_ME")){

            throw new Error("Complete client specific variables");
    }

    spreadsheet           = SpreadsheetApp.getActiveSpreadsheet();
    invoice_upload_sheet  = spreadsheet.getSheetByName(invoice_upload_page_name);
    receipt_sheet         = spreadsheet.getSheetByName(receipt_page_name);
    manual_upload_sheet   = spreadsheet.getSheetByName(manual_upload_page_name);
    internal_upload_sheet = spreadsheet.getSheetByName(internal_upload_page_name);

    client_upload_sheet = spreadsheet.getSheetByName(client_upload_page_name);
    crm_page_sheet      = spreadsheet.getSheetByName(crm_page_name);



    if (source == "CLIENT"){
        initialize_inv_field_value_dict();
        load_inv_dicts();
        validate_sheet      = invoice_upload_sheet;
        cell_validate_dict  = cells_inv_dict;
    } else if (source == "INTERNAL"){
        initialize_inv_field_value_dict();
        validate_sheet      = internal_upload_sheet;
        last_col            = columnToLetter(upload_table_fields_l.length);
        last_row            = internal_upload_sheet.getLastRow();
        internal_data       = [[]];
        cells_internal_dict = {};
        invoice_id_l        = [];
        url_invoice_l       = [];
    } else if (source == "CRM"){
        initialize_client_field_value_dict();
        load_client_dicts();
        // validate_sheet      = invoice_upload_sheet;
        // cell_validate_dict  = cells_inv_dict;
    }

}


function initialize_inv_field_value_dict(){
    upload_table_fields_l = ["timestamp", "counterpart", "is_approved",
    "recurrence_periodicity", "installments", "installments_periodicity",
    "invoice_date", "due_date", "invoice_id", "invoice_group_1",
    "invoice_group_2", "invoice_group_3", "invoice_group_4", "invoice_group_5", "currency", "tax"];

    for (let i = 0; i < item_q; i++) {
        upload_table_fields_l.push("item_" + (i+1));
        upload_table_fields_l.push("quantity_" + (i+1));
        upload_table_fields_l.push("unit_price_" + (i+1));
    }

    upload_table_fields_l.push("url_invoice", "is_invoice");

    field_values_dict = {};
    for (const field_name of upload_table_fields_l) {
        field_values_dict[field_name] = "";
    }
}


function initialize_client_field_value_dict(){
    upload_table_fields_l = ["timestamp", "counterpart", "relation",
    "payment_methods", "contact_email", "country", "city", "address",
    "language","client_group_1", "client_group_2", "client_group_3",
    "url_logo"];

    field_values_dict = {};
    for (const field_name of upload_table_fields_l) {
        field_values_dict[field_name] = "";
    }
}

function load_inv_dicts(){
    field_values_dict["timestamp"] = new Date();

    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        field_values_dict[field] = invoice_upload_sheet.getRange(cell).getValue();
    }

    var items_col       = cells_inv_dict['item_1'][0];
    var first_item_row  = cells_inv_dict['item_1'].substring(1);
    for (let i = 1; i < item_q; i++) {
        let initial_cell  = Number(first_item_row) + 3*(spacing*i);
        let cell = items_col + (initial_cell  );

        cells_inv_dict["item_" + (i+1)]        = cell;
        field_values_dict["item_" + (i+1)]        = invoice_upload_sheet.getRange(cell).getValue();

        cell = items_col + (initial_cell + spacing);
        cells_inv_dict["unit_price_" + (i+1)]  = cell;
        field_values_dict["unit_price_" + (i+1)]  = invoice_upload_sheet.getRange(cell).getValue();

        cell = items_col + (initial_cell + (2 * spacing));
        cells_inv_dict["quantity_" + (i+1)]    = cell;
        field_values_dict["quantity_" + (i+1)]    = invoice_upload_sheet.getRange(cell).getValue();
    }

    field_values_dict["is_invoice"] = false;
}


function load_client_dicts(){
    field_values_dict["timestamp"] = new Date();

    for (const [field, cell] of Object.entries(cells_client_dict)) {
        field_values_dict[field] = client_upload_sheet.getRange(cell).getValue();
    }
}

function get_internal_data(){
    var range   = first_col_internal_load + first_row_internal_load + ":"
                + last_col + last_row;

    internal_data = internal_upload_sheet.getRange(range).getValues();
}

function load_field_values_from_internal(row){
    var i = 0;
    for (const field_name of upload_table_fields_l) {
        let cell   = columnToLetter(letterToColumn(first_col_internal_load) + i) + row;
        field_values_dict[field_name]   = internal_data[row - first_row_internal_load][i]
        cells_internal_dict[field_name] = cell;
        i++;
    }
    cell_validate_dict  = cells_internal_dict;
    invoice_id_l.push(field_values_dict["invoice_id"]);
    url_invoice_l.push(field_values_dict["url_invoice"]);
}
