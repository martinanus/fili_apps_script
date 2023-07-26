 function process_form_data(){
    var response = generate_pdf_receipt();
    var uploaded_file = upload_pdf(response);

    send_email_with_receipt(uploaded_file);
    send_email_internal_notif();

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

    crm_page_sheet.appendRow(data_arr);

    return;
}