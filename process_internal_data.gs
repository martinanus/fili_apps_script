function check_internal_data(){
    set_global_variables("INTERNAL");
    clear_internal_upload_background();

    var last_row = internal_upload_sheet.getLastRow();

    for (let row = first_row_internal_load; row <= last_row ; row++ ){
        load_field_values_from_internal(row);
        cell_validate_dict  = cells_internal_dict;
        validate_fields();
    }
}

function load_internal_data(){
    check_internal_data();
    run_dbt();
}