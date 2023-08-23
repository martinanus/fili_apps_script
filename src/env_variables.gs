//----------------------------------------------------------------
// Client Custom variables
//----------------------------------------------------------------

// Client name
client_name               = 'REPLACE_ME';

// Client email config
user_email              = 'REPLACE_ME';

// Drive upload Folder for generated invoices
upload_folder_id          = 'REPLACE_ME';

// Specific DBT client service URL
dbt_run_url               = 'REPLACE_ME';

// Internal email configuration
fili_notif_email          = 'soporte@somosfili.com';

// Set true to allow multicurrency use - ommit formating and clearing currency field
multicurrency_allowed     = false;

invoice_upload_fix_fields_l     = ["recurrence_periodicity", "installments", "due_date", "is_approved"]
counterpart_upload_fix_fields_l = ["relation"]

//----------------------------------------------------------------
// Standard variables
//----------------------------------------------------------------

// Sheet pages name
client_form_page_name     = "Alta de Clientes";
client_upload_page_name   = "counterpart_upload";

invoice_upload_page_name  = "Registro de Movimiento";
receipt_page_name         = "Comprobante";
manual_upload_page_name   = "manual_upload";
internal_upload_page_name = "internal_upload";
payment_upload_page_name  = "payment_upload";


// Items quantity
inv_item_q                = 20;
payment_concept_q         = 10;

// Colors
default_bg_colour         = "#FFFFFF";   // white
running_bg_colour         = "#FF6D01";   // orange
error_bg_colour           = "#FF4122";   // red
validated_bg_colour       = "#0ADB3A";   // green


// Cells declaration
status_cell               = "B2";       // in invoice_upload_page
invoice_id_cell_to_clear  = "B18";      // in invoice_upload_page
is_approved_cell          = "B7";
payment_id_cell           = "B17";
relation_cell             = "B6";
duplicated_indirect_counterpart = "B3";

first_row_internal_load   = 2;          // in manual_upload
first_col_internal_load   = "A";        // in manual_upload
inv_id_col_internal_load  = 'H';        // in manual_upload
url_inv_col_internal_load = 'BX';       // in manual_upload
duplicated_counterpart_cell = "B5";     // in client_form_page

spacing                   = 2;          // separation btw content cells int invoice_upload_page

cells_inv_dict = {
    "counterpart"               : "B4", // in invoice_upload_page
    "recurrence_periodicity"    : "B8",
    "installments"              : "B10",
    "installments_periodicity"  : "B12",
    "invoice_date"              : "B14",
    "due_date"                  : "B16",
    "invoice_id"                : "B19",
    "invoice_group_1"           : "B20",
    "invoice_group_2"           : "B22",
    "invoice_group_3"           : "B24",
    "invoice_group_4"           : "B26",
    "invoice_group_5"           : "B28",
    "currency"                  : "B30",
    "item_1"                    : "B32",
    "quantity_1"                : "B34",
    "unit_price_1"              : "B36"
};

cells_client_dict = {
    "counterpart"        : "B4", // in client_form_page_name
    "relation"           : "B6",
    "payment_methods"    : "B8",
    "payment_bank"       : "B10",
    "payment_alias_cbu"  : "B12",
    "cuit"               : "B14",
    "contact_email"      : "B16",
    "country"            : "B18",
    "city"               : "B20",
    "address"            : "B22",
    "language"           : "B24",
    "client_group_1"     : "B26",
    "client_group_2"     : "B28",
    "client_group_3"     : "B30",
    "url_logo"           : "B32"
};