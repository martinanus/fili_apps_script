function generate_invoice(){
    set_global_variables("CLIENT");
    set_running_status();
    clear_form_background();
    validate_fields();
    process_form_data();
    populate_data_table();
    clear_form_content();
    run_dbt();
    set_ready_status();
}


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


function run_dbt() {
    // Use the OpenID token inside App Scripts
    const token = ScriptApp.getIdentityToken();
    var options = {
        'method' : 'get',
        'headers': {'Authorization': 'Bearer ' + token},
    };

    // call the server
    UrlFetchApp.fetch(dbt_run_url , options);
}