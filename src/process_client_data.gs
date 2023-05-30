 function process_form_data(){

    get_final_invoice_id();

    if (field_values_dict["recurrence_periodicity"] == "" &&
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

function get_final_invoice_id(){
    var final_invoice_id = receipt_sheet.getRange(final_invoice_cell).getValue()

    field_values_dict['invoice_id'] = final_invoice_id;
    return
}