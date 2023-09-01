function validate_inv_fields(){

    validate_inv_mandatory_fields();
    validate_installments();
    validate_dates();
    validate_items();

    return;
}

function validate_client_fields(){

    validate_client_mandatory_fields();
    validate_duplicated_counterpart();

    return;
}

function validate_payment_fields(){

    validate_payment_mandatory_fields();
    validate_concepts();

    return;
}


function validate_inv_mandatory_fields(){
    const mandatory_field_l = ["timestamp", "counterpart",
                          "recurrence_periodicity", "installments", "invoice_date",
                          "due_date", "invoice_id", "currency",
                          "item_1", "unit_price_1", "quantity_1", "is_invoice"];

    const mandatory_internal_field_l = ["url_source_reference"];

    var error_field_l = []

    for (const field of mandatory_field_l){
        if (inv_field_values_dict[field] == '' && typeof(inv_field_values_dict[field]) != "boolean"){
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }

    if (source == "MANUAL"){
        var is_approve_value = invoice_upload_sheet.getRange(is_approved_cell).getValue();
        if (is_approve_value == ''){
            console.log("is approved field is empty");
            validate_sheet.getRange(is_approved_cell).setBackground(error_bg_colour);
        }
    } else if (source == "INTERNAL"){
        for (const field of mandatory_internal_field_l){
            if (inv_field_values_dict[field] == '' && typeof(inv_field_values_dict[field]) != "boolean"){
                console.log(field, " field is empty");
                error_field_l.push(field);
            }
        }
    }

    for (const field of error_field_l){
        validate_sheet.getRange(cell_validate_dict[field]).setBackground(error_bg_colour);
    }


    if ((error_field_l.length) || (is_approve_value == '')){
        exit_on_error("Campos obligatorios incompletos");
    }

    return;
}

function validate_client_mandatory_fields(){
    const mandatory_field_l = ["timestamp", "counterpart", "relation",
                                "external_notification",	"counterpart_id",	"upload_source"];


    var error_field_l = []

    for (const field of mandatory_field_l){
        if (client_field_values_dict[field] == '' && typeof(client_field_values_dict[field]) != "boolean"){
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }


    for (const field of error_field_l){
        validate_sheet.getRange(cell_validate_dict[field]).setBackground(error_bg_colour);
    }

    if (error_field_l.length){
        exit_on_error("Campos obligatorios incompletos");
    }

    return;
}


function validate_payment_mandatory_fields(){
    const mandatory_field_l = ["timestamp", "id", "counterpart", "is_income", "date",
                                "currency", "name_concept_1", "amount_concept_1",
                                "source_reference_url"];


    var error_field_l = []

    for (const field of mandatory_field_l){
        if (payment_field_values_dict[field] == '' && typeof(payment_field_values_dict[field]) != "boolean"){
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }


    for (const field of error_field_l){
        validate_sheet.getRange(cell_validate_dict[field]).setBackground(error_bg_colour);
    }

    if (error_field_l.length){
        exit_on_error("Campos obligatorios incompletos");
    }

    return;
}

function validate_installments(){

    if (Number(inv_field_values_dict["installments"] > 1) && (inv_field_values_dict["installments_periodicity"] == '')) {
        validate_sheet.getRange(cell_validate_dict["installments_periodicity"]).setBackground(error_bg_colour);
        exit_on_error("Indique la periodicidad de las cuotas ");
    }

    if (Number(inv_field_values_dict["installments"] == 1) && (inv_field_values_dict["installments_periodicity"] != '')) {
        validate_sheet.getRange(cell_validate_dict["installments_periodicity"]).setBackground(error_bg_colour);
        validate_sheet.getRange(cell_validate_dict["installments"]).setBackground(error_bg_colour);
        exit_on_error("Periodicidad de cuotas debe quedar vacío si Cuotas es 1");
    }

    return;
}


function validate_dates(){
    if (inv_field_values_dict["due_date"] < inv_field_values_dict["invoice_date"]){
        validate_sheet.getRange(cell_validate_dict["invoice_date"]).setBackground(error_bg_colour);
        validate_sheet.getRange(cell_validate_dict["due_date"]).setBackground(error_bg_colour);
        exit_on_error("La fecha de vencimiento no puede ser anterior a la fecha de emisión");
    }

    return;
}

function validate_items(){

    var error_flag = false;

    for (let i = 0; i < inv_item_q; i++) {
        let item_i        = inv_field_values_dict["item_" + (i+1)];
        let quantity_i    = inv_field_values_dict["quantity_" + (i+1)];
        let unit_price_i  = inv_field_values_dict["unit_price_" + (i+1)];

        if (item_i != '' || unit_price_i != '' || quantity_i != ''){
            if (item_i == '' || unit_price_i == '' || quantity_i == ''){
                validate_sheet.getRange(cell_validate_dict["item_" + (i+1)]).setBackground(error_bg_colour);
                validate_sheet.getRange(cell_validate_dict["quantity_" + (i+1)]).setBackground(error_bg_colour);
                validate_sheet.getRange(cell_validate_dict["unit_price_" + (i+1)]).setBackground(error_bg_colour);
                error_flag = true;
            }
        }
    }

    if (error_flag){
        exit_on_error("Se debe indicar el precio unitario y las cantidades para cada item.");
    }

    return;
}

function validate_concepts(){

    var error_flag = false;

    for (let i = 0; i < payment_concept_q; i++) {
        let name_i        = payment_field_values_dict["name_concept_" + (i+1)];
        let amount_i    = payment_field_values_dict["amount_concept_" + (i+1)];

        if (name_i != '' || amount_i != ''){
            if (name_i == '' || amount_i == ''){
                validate_sheet.getRange(cell_validate_dict["name_concept_" + (i+1)]).setBackground(error_bg_colour);
                validate_sheet.getRange(cell_validate_dict["amount_concept_" + (i+1)]).setBackground(error_bg_colour);
                error_flag = true;
            }
        }
    }

    if (error_flag){
        exit_on_error("Se debe indicar el nombre y monto para cada concepto.");
    }

    return;
}

function validate_duplicated_field(arr, col, field, allow_empties=false){
    const find_duplicates   = arr => arr.filter((item, index) => arr.indexOf(item) !== index);
    var dup_elements      = find_duplicates(arr);

    if (allow_empties){
        let index;
        while((index = dup_elements.indexOf('')) > -1){
            dup_elements.splice(index, 1);
        }
    }

    var error_flag  = false;
    var row_i       = first_row;

    for (const element of arr) {
        if(dup_elements.includes(element)){
            validate_sheet.getRange(col+row_i).setBackground(error_bg_colour);
            error_flag = true;
        }
        row_i++;
    }

    if (error_flag){
        exit_on_error(`Se encontraron ${field} repetidos`);
    }
}

function validate_duplicated_counterpart(){

    var counterpart_duplicated_crm = client_form_sheet.getRange(duplicated_counterpart_cell).getValue();

    if (counterpart_duplicated_crm == true){
        validate_sheet.getRange(cell_validate_dict["counterpart"]).setBackground(error_bg_colour);
        exit_on_error(`La contraparte ya ha sido dada de alta. Para modificaciones, contacte al administrador.`);
    }

    return;
}

function validate_counterpart_in_crm(inv_counterpart_l){

    var counterpart_index_not_added_l = []
    var crm_counterparts_l = [];
    var crm_counterparts = get_crm_counterparts();

    for (let i = 0; i < crm_counterparts.length ; i++ ){
        crm_counterparts_l.push(crm_counterparts[i][0])
    }

    for (let i = 0; i < inv_counterpart_l.length ; i++ ){
        if (!crm_counterparts_l.includes(inv_counterpart_l[i])){
            console.log(inv_counterpart_l[i] + " no está dado de alta en el CRM!")
            counterpart_index_not_added_l.push(i);
        }
    }

    for (const i of counterpart_index_not_added_l){
        let cell = counterpart_col_internal_load + (first_row + i)
        internal_upload_sheet.getRange(cell).setBackground(error_bg_colour);
    }

    if (counterpart_index_not_added_l.length){
        exit_on_error("Hay contrapartes no dadas de alta");
    }

}