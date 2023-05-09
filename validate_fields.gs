function validate_fields(){

    validate_mandatory_fields();
    validate_installments();
    validate_fixcost();
    validate_dates();
    validate_items();

    return;
}


function validate_mandatory_fields(){
    const mandatory_field_l = ["counterpart", "relation", "is_approved",
                          "installments", "invoice_date", "due_date",
                          "item_1", "unit_price_1", "quantity_1"];
    const mandatory_internal_field_l = ["is_invoice", "url_invoice"];

    var error_field_l = []

    for (const field of mandatory_field_l){
        if (field_values_dict[field] == ''){
            console.log(field, " field is empty");
            error_field_l.push(field);
        }
    }
    if (source == "INTERNAL"){
        for (const field of mandatory_internal_field_l){
            if (field_values_dict[field] == '' && typeof(field_values_dict[field]) != "boolean"){
                console.log(field, " field is empty");
                error_field_l.push(field);
            }
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


function validate_fixcost(){

    if (field_values_dict["relation"] == "Costos Fijos" && field_values_dict["fixcost_periodicity"] == '') {
        validate_sheet.getRange(cell_validate_dict["fixcost_periodicity"]).setBackground(error_bg_colour);
        exit_on_error("Por favor, indique la periodicidad de su costo fijo para que el comprobante pueda ser cargado. Muchas gracias.");
    }

    if (field_values_dict["relation"] != "Costos Fijos" && field_values_dict["fixcost_periodicity"] != '') {
        validate_sheet.getRange(cell_validate_dict["fixcost_periodicity"]).setBackground(error_bg_colour);
        validate_sheet.getRange(cell_validate_dict["relation"]).setBackground(error_bg_colour);
        exit_on_error("La periodicidad de costo fijo solo debe ingresarse si la Relación comercial es 'costos fijos'. Caso contrario, el campo  debe quedar vacío.");
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
        let unit_price_i  = field_values_dict["unit_price_" + (i+1)];
        let quantity_i    = field_values_dict["quantity_" + (i+1)];

        if (item_i != '' || unit_price_i != '' || quantity_i != ''){
            if (item_i == '' || unit_price_i == '' || quantity_i == ''){
                let range        = cell_validate_dict["item_" + (i+1)] + ":"
                                    + cell_validate_dict["quantity_" + (i+1)];
                validate_sheet.getRange(range).setBackground(error_bg_colour);
                error_flag = true;
            }
        }
    }

    if (error_flag){
        exit_on_error("Se debe indicar el precio unitario y las cantidades para cada item.");
    }

    return;
}