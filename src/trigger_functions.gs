function onOpen(){
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
}


function check_internal_data(){
    set_global_variables("INTERNAL");
    clear_internal_upload_background();

    get_internal_data();

    for (let row = first_row_internal_load; row <= last_row ; row++ ){
        load_field_values_from_internal(row);
        validate_inv_fields();
    }
    validate_duplicated();
}

function load_internal_data(){
    check_internal_data();
    run_dbt();
}
