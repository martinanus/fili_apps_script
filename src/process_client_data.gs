function process_form_data(){
    var response = generate_pdf_receipt();
    var uploaded_file = upload_pdf(response);

    send_email_with_receipt(uploaded_file);

    return
}

function populate_inv_data_table(){

    var data_arr = [];
    for (const [field, value] of Object.entries(inv_field_values_dict)) {
        data_arr.push(value);
    }

    manual_upload_sheet.appendRow(data_arr);

    return;
}

function populate_payment_data_table(){
    if (!is_approved){
        return;
    }
    var data_arr = [];
    for (const [field, value] of Object.entries(payment_field_values_dict)) {
        data_arr.push(value);
    }

    payment_upload_sheet.appendRow(data_arr);

    return;
}

function populate_client_data_table(){

    var data_arr = [];
    for (const [field, value] of Object.entries(client_field_values_dict)) {
        data_arr.push(value);
    }

    client_upload_sheet.appendRow(data_arr);

    return;
}