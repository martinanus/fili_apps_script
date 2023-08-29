
function set_global_variables(trig_source){
    source = trig_source;

    // Check for client custom variables
    if (client_name.includes("REPLACE_ME") ||
        user_email.includes("REPLACE_ME") ||
        dbt_run_url.includes("REPLACE_ME")){

            throw new Error("Complete client specific variables");
    }

    spreadsheet           = SpreadsheetApp.openById(spreadsheetId)
    invoice_upload_sheet  = spreadsheet.getSheetByName(invoice_upload_page_name);
    receipt_sheet         = spreadsheet.getSheetByName(receipt_page_name);
    manual_upload_sheet   = spreadsheet.getSheetByName(manual_upload_page_name);
    internal_upload_sheet = spreadsheet.getSheetByName(internal_upload_page_name);
    payment_upload_sheet  = spreadsheet.getSheetByName(payment_upload_page_name);

    client_form_sheet     = spreadsheet.getSheetByName(client_form_page_name);
    client_upload_sheet   = spreadsheet.getSheetByName(client_upload_page_name);



    if (source == "MANUAL"){
        is_approved         = get_approve_status();
        initialize_inv_field_value_dict();
        initialize_payment_field_value_dict();
        initialize_client_field_value_dict();
        load_inv_dicts();
        load_payment_dicts();
        load_indirect_client_dicts();
        validate_sheet      = invoice_upload_sheet;
        cell_validate_dict  = cells_inv_dict;
        counterpart_duplicated = get_counterpart_duplicated();
    } else if (source == "INTERNAL"){
        initialize_inv_field_value_dict();
        validate_sheet      = internal_upload_sheet;
        last_col            = columnToLetter(inv_upload_table_fields_l.length);
        last_row            = internal_upload_sheet.getLastRow();
        internal_data       = [[]];
        cells_internal_dict = {};
        invoice_id_l        = [];
        url_invoice_l       = [];
    } else if (source == "CRM"){
        initialize_client_field_value_dict();
        load_client_dicts();
        validate_sheet      = client_form_sheet;
        cell_validate_dict  = cells_client_dict;
    }

}


function initialize_inv_field_value_dict(){
    inv_upload_table_fields_l = ["timestamp", "counterpart",
    "recurrence_periodicity", "installments", "installments_periodicity",
    "invoice_date", "due_date", "invoice_id", "payment_id", "invoice_group_1",
    "invoice_group_2", "invoice_group_3", "invoice_group_4", "invoice_group_5", "currency"];

    for (let i = 0; i < inv_item_q; i++) {
        inv_upload_table_fields_l.push("item_" + (i+1));
        inv_upload_table_fields_l.push("quantity_" + (i+1));
        inv_upload_table_fields_l.push("unit_price_" + (i+1));
    }

    inv_upload_table_fields_l.push("url_invoice", "url_source_reference" ,"is_invoice");

    inv_field_values_dict = {};
    for (const field_name of inv_upload_table_fields_l) {
        inv_field_values_dict[field_name] = "";
    }
}


function initialize_payment_field_value_dict(){
    var payment_table_fields_l = ["timestamp", "invoice_key",
    "id", "counterpart", "is_income",
    "date", "currency"];

    for (let i = 0; i < payment_concept_q; i++) {
        payment_table_fields_l.push("name_concept_" + (i+1));
        payment_table_fields_l.push("amount_concept_" + (i+1));
    }

    payment_table_fields_l.push("documents_url", "url_source_reference" ,"payment_method",
                             "payment_group_1","payment_group_2", "payment_group_3",
                             "payment_group_4", "payment_group_5",);

    payment_field_values_dict = {};
    for (const field_name of payment_table_fields_l) {
        payment_field_values_dict[field_name] = "";
    }
}


function initialize_client_field_value_dict(){
    client_upload_table_fields_l = ["timestamp", "counterpart", "relation",
    "payment_methods", "payment_bank", "payment_alias_cbu", "cuit",
    "contact_email", "country", "city", "address",
    "language","client_group_1", "client_group_2", "client_group_3",
    "url_logo", "external_notification", "counterpart_id", "upload_source"];

    client_field_values_dict = {};
    for (const field_name of client_upload_table_fields_l) {
        client_field_values_dict[field_name] = "";
    }
}

function load_inv_dicts(){
    inv_field_values_dict["timestamp"] = new Date();

    for (const [field, cell] of Object.entries(cells_inv_dict)) {
        inv_field_values_dict[field] = invoice_upload_sheet.getRange(cell).getValue();
    }

    var items_col       = cells_inv_dict['item_1'][0];
    var first_item_row  = cells_inv_dict['item_1'].substring(1);
    for (let i = 1; i < inv_item_q; i++) {
        let initial_cell  = Number(first_item_row) + 3*(spacing*i);
        let cell = items_col + (initial_cell  );

        cells_inv_dict["item_" + (i+1)]        = cell;
        inv_field_values_dict["item_" + (i+1)]        = invoice_upload_sheet.getRange(cell).getValue();

        cell = items_col + (initial_cell + spacing);
        cells_inv_dict["quantity_" + (i+1)]    = cell;
        inv_field_values_dict["quantity_" + (i+1)]    = invoice_upload_sheet.getRange(cell).getValue();

        cell = items_col + (initial_cell + (2 * spacing));
        cells_inv_dict["unit_price_" + (i+1)]  = cell;
        inv_field_values_dict["unit_price_" + (i+1)]  = invoice_upload_sheet.getRange(cell).getValue();
    }

    inv_field_values_dict["is_invoice"] = false;

    if (is_approved){
        inv_field_values_dict["payment_id"] = invoice_upload_sheet.getRange(payment_id_cell).getValue();
    }
}

function load_payment_dicts(){
    if (!is_approved){
        return;
    }
    payment_field_values_dict["timestamp"] = inv_field_values_dict["timestamp"];

    payment_field_values_dict["id"] = invoice_upload_sheet.getRange(payment_id_cell).getValue();

    payment_field_values_dict["counterpart"] = inv_field_values_dict["counterpart"];

    var relation = invoice_upload_sheet.getRange(relation_cell).getValue();
    if (relation == "Cliente"){
        payment_field_values_dict["is_income"] = true;
    } else{
        payment_field_values_dict["is_income"] = false;
    }

    payment_field_values_dict["date"] = invoice_upload_sheet.getRange(payment_date_cell).getValue();
    payment_field_values_dict["currency"] = inv_field_values_dict["currency"];

    payment_field_values_dict["name_concept_1"] = "Pago Factura";

    payment_field_values_dict["amount_concept_1"] = calculate_invoice_total_amount();

}


function load_client_dicts(){
    client_field_values_dict["timestamp"] = new Date();

    for (const [field, cell] of Object.entries(cells_client_dict)) {
        client_field_values_dict[field] = client_form_sheet.getRange(cell).getValue();
    }

    client_field_values_dict["external_notification"] = "notify"
    client_field_values_dict["upload_source"]         = "manual"
    client_field_values_dict["counterpart_id"]        = hash_str(client_field_values_dict["counterpart"]);
}

function load_indirect_client_dicts(){
    client_field_values_dict["timestamp"] = inv_field_values_dict["timestamp"];

    client_field_values_dict["counterpart"] = inv_field_values_dict["counterpart"];
    client_field_values_dict["relation"]    = invoice_upload_sheet.getRange(relation_cell).getValue();

    client_field_values_dict["external_notification"] = "notify"
    client_field_values_dict["upload_source"]         = "manual_indirect"
    client_field_values_dict["counterpart_id"]        = hash_str(client_field_values_dict["counterpart"]);
}

function get_internal_data(){
    var range   = first_col_internal_load + first_row_internal_load + ":"
                + last_col + last_row;

    internal_data = internal_upload_sheet.getRange(range).getValues();
}

function load_field_values_from_internal(row){
    var i = 0;
    for (const field_name of inv_upload_table_fields_l) {
        let cell   = columnToLetter(letterToColumn(first_col_internal_load) + i) + row;
        inv_field_values_dict[field_name]   = internal_data[row - first_row_internal_load][i]
        cells_internal_dict[field_name] = cell;
        i++;
    }
    cell_validate_dict  = cells_internal_dict;
    invoice_id_l.push(inv_field_values_dict["invoice_id"]);
    url_invoice_l.push(inv_field_values_dict["url_invoice"]);
}

function get_approve_status(){
    var is_approve_value = invoice_upload_sheet.getRange(is_approved_cell).getValue();

    if (is_approve_value == "No"){
        return false;
    }
    return true;
}

function calculate_invoice_total_amount(){
    var invoice_total_amount = 0.0;


    for (let i = 0; i < inv_item_q; i++) {
        let quantity_i    = inv_field_values_dict["quantity_" + (i+1)];
        let unit_price_i  = inv_field_values_dict["unit_price_" + (i+1)];

        if (Number(unit_price_i) && Number(quantity_i)){
            invoice_total_amount += quantity_i * unit_price_i;
        }
    }

    return invoice_total_amount;
}

function get_counterpart_duplicated(){
    return invoice_upload_sheet.getRange(duplicated_indirect_counterpart).getValue();
}