
 function process_form_data(){

    if (field_values_dict["fixcost_periodicity"] == "" &&
        field_values_dict["installments_periodicity"] == ""){

        var response = generate_pdf_receipt();
        var uploaded_file = upload_pdf(response);

        send_email_with_receipt(uploaded_file);
        send_email_internal_notif();
    } else {
        send_email_pending_generation();
        send_email_internal_action_req();
    }

    return
}


function populate_data_table(){

    var data_arr = [];
    for (const [field, value] of Object.entries(field_values_dict)) {
        data_arr.push(value);
    }

    manual_upload_sheet.appendRow(data_arr);

    return;
}
