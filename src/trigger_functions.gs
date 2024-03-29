function doPost(e){
    var trigger = e.queryString;

    try {
        switch (trigger){
        case "add_new_client":
            add_new_client();
            break;
        case "generate_invoice":
            generate_invoice();
            break;
        case "check_internal_data":
            check_internal_data();
            break;
        case "check_crm_data":
            check_crm_data();
            break;
        case "check_payment_data":
            check_payment_data();
            break;
        case "load_data":
            load_data();
            break;
        case "customOnOpen":
            customOnOpen();
            break;
        }
    } catch (error_msg) {
        return ContentService.createTextOutput(error_msg)
    }

    return ContentService.createTextOutput("OK")
}

function customOnOpen(){
    set_global_variables("MANUAL");
    clear_inv_form_background();
    clear_inv_form_content();
    set_ready_status();
    set_global_variables("CRM");
    clear_client_form_background();
    clear_client_form_content();
    set_ready_status();
}

function add_new_client(){
    set_global_variables("CRM");
    set_running_status();
    clear_client_form_background();
    validate_client_fields();
    set_validated_status();
    populate_client_data_table();
    clear_client_form_content();
    getToUploadPortalForm();
    set_ready_status();
}

function generate_invoice(){
    set_global_variables("MANUAL");
    set_running_status();
    clear_inv_form_background();
    validate_inv_fields();
    set_validated_status();
    process_form_data();
    populate_inv_data_table();
    populate_payment_data_table();
    populate_client_data_table();
    clear_inv_form_content();
    set_ready_status();
    run_dbt();
    getToUploadPortalForm();
}


function check_internal_data(){
    set_global_variables("INTERNAL_CHECK");
    clear_internal_upload_background();

    get_internal_data();

    for (let row = first_row; row <= last_row ; row++ ){
        load_field_values_from_internal(row);
        validate_inv_fields();
    }
    validate_duplicated_field(invoice_id_l, inv_id_col_internal_load, "invoice_id");
    validate_duplicated_field(url_invoice_l, url_inv_col_internal_load, "url_invoice",
                              allow_empties=true);

    validate_counterpart_in_crm(inv_counterpart_l);
}

function check_crm_data(){
  set_global_variables("CRM_CHECK");
  clear_crm_upload_background();

  get_crm_data();

  for (let row = first_row; row <= last_row ; row++ ){
      load_field_values_from_crm(row);
      validate_client_fields();
  }
}


function check_payment_data(){
  set_global_variables("PAYMENT_CHECK");
  clear_payment_upload_background();

  get_payment_data();

  for (let row = first_row; row <= last_row ; row++ ){
      load_field_values_from_payment(row);
      validate_payment_fields();
  }
  validate_duplicated_field(payment_id_l, id_col_payment_load, "id", false);
}

function check_all_data(){
  check_internal_data();
  check_payment_data();
  check_crm_data();
}

function load_data(){
    check_all_data();
    run_dbt();
    getToUploadPortalForm();
}
