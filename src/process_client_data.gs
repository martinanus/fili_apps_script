 function process_form_data(){
    var response = generate_pdf_receipt();
    var uploaded_file = upload_pdf(response);

    if (send_external_mail == true){
        send_email_to_client(uploaded_file);
    } else {
        send_email_to_user(uploaded_file);
    }

    return
}

function populate_inv_data_table(){

    var data_arr = [];
    for (const [field, value] of Object.entries(field_values_dict)) {
        data_arr.push(value);
    }

    manual_upload_sheet.appendRow(data_arr);

    return;
}

function populate_client_data_table(){

    var data_arr = [];
    for (const [field, value] of Object.entries(field_values_dict)) {
        data_arr.push(value);
    }

    client_upload_sheet.appendRow(data_arr);

    return;
}