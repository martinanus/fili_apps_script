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


function validate_inv_mandatory_fields(){
    const mandatory_field_l = ["timestamp", "counterpart", "is_approved",
                          "recurrence_periodicity", "installments", "invoice_date",
                          "due_date", "invoice_id", "currency",
                          "item_1", "unit_price_1", "quantity_1", "is_invoice"];


    var error_field_l = []

    for (const field of mandatory_field_l){
        if (field_values_dict[field] == '' && typeof(field_values_dict[field]) != "boolean"){
            if (multicurrency_allowed==false && field == "currency"){
                continue;
            }
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }

    for (const field of error_field_l){
        validate_sheet.getRange(cell_validate_dict[field]).setBackground(error_bg_colour);
    }

    if (error_field_l.length){
        exit_on_error("Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_client_mandatory_fields(){
    const mandatory_field_l = ["timestamp", "counterpart", "relation",
                                "payment_methods", "language"];


    var error_field_l = []

    for (const field of mandatory_field_l){
        if (field_values_dict[field] == '' && typeof(field_values_dict[field]) != "boolean"){
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }


    for (const field of error_field_l){
        validate_sheet.getRange(cell_validate_dict[field]).setBackground(error_bg_colour);
    }

    if (error_field_l.length){
        exit_on_error("Por favor, complete los campos obligatorios para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    return;
}

function validate_installments(){

    if (Number(field_values_dict["installments"] > 1) && (field_values_dict["installments_periodicity"] == '')) {
        validate_sheet.getRange(cell_validate_dict["installments_periodicity"]).setBackground(error_bg_colour);
        exit_on_error("Por favor, indique la periodicidad de las cuotas para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    if (Number(field_values_dict["installments"] == 1) && (field_values_dict["installments_periodicity"] != '')) {
        validate_sheet.getRange(cell_validate_dict["installments_periodicity"]).setBackground(error_bg_colour);
        validate_sheet.getRange(cell_validate_dict["installments"]).setBackground(error_bg_colour);
        exit_on_error("La periodicidad de cuotas solo debe ingresarse si Cuotas es mayor a 1. Caso contrario, el campo debe quedar vacío.");
    }

    return;
}


function validate_dates(){
    if (field_values_dict["due_date"] < field_values_dict["invoice_date"]){
        validate_sheet.getRange(cell_validate_dict["invoice_date"]).setBackground(error_bg_colour);
        validate_sheet.getRange(cell_validate_dict["due_date"]).setBackground(error_bg_colour);
        exit_on_error("La fecha de vencimiento no puede ser anterior a la fecha de emisión");
    }

    return;
}

function validate_items(){

    var error_flag = false;

    for (let i = 0; i < item_q; i++) {
        let item_i        = field_values_dict["item_" + (i+1)];
        let quantity_i    = field_values_dict["quantity_" + (i+1)];
        let unit_price_i  = field_values_dict["unit_price_" + (i+1)];

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

function validate_duplicated(){
    validate_duplicated_field(invoice_id_l, inv_id_col_internal_load, "invoice_id");
    validate_duplicated_field(url_invoice_l, url_inv_col_internal_load, "url_invoice",
                              allow_empties=true);
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
    var row_i       = first_row_internal_load;

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

    counterpart_duplicated        = client_form_sheet.getRange(duplicated_counterpart_cell).getValue();

    if (counterpart_duplicated == true){
        validate_sheet.getRange(cell_validate_dict["counterpart"]).setBackground(error_bg_colour);
        exit_on_error(`La contraparte ya ha sido dada de alta.`);
    }

    return;
}