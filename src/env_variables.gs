//----------------------------------------------------------------
// Client Custom variables
//----------------------------------------------------------------

// Client name
client_name               = 'REPLACE_ME';

// Client email config
client_email              = 'REPLACE_ME';

// Drive upload Folder for generated invoices
upload_folder_id          = 'REPLACE_ME';

// Specific DBT client service URL
dbt_run_url               = 'REPLACE_ME';

// Internal email configuration
fili_notif_email          = 'anusmartin1@gmail.com';

// Set true to send generated receipt to client contact
send_external_mail     = true;

// Set true to allow multicurrency use
multicurrency_allowed     = false;

// this is use to ommit formating and clearing relation fielZ
upload_only_client     = true; // LL_specific

//----------------------------------------------------------------
// Standard variables
//----------------------------------------------------------------

// Sheet pages name
client_form_page_name     = "Alta de Clientes";
client_upload_page_name   = "client_upload";

invoice_upload_page_name  = "Carga de Facturas";

receipt_en_page_name      = "en_inv"; // LL_specific
receipt_fr_page_name      = "fr_inv";
receipt_es_page_name      = "es_inv";


manual_upload_page_name   = "manual_upload";
internal_upload_page_name = "internal_upload";


// Items quantity
item_q                    = 20;

// Colors
default_bg_colour         = "#FFFFFF";   // white
running_bg_colour         = "#FF6D01";   // orange
error_bg_colour           = "#FF4122";   // red
validated_bg_colour       = "#0ADB3A";   // green


// Cells declaration
status_cell               = "B2";       // in invoice_upload_page
first_row_internal_load   = 2;          // in manual_upload
first_col_internal_load   = "A";        // in manual_upload
inv_id_col_internal_load  = 'I';        // in manual_upload
url_inv_col_internal_load = 'BY';       // in manual_upload
invoice_id_cell_to_clear  = "B18";      // in invoice_upload_page
duplicated_counterpart_cell = "B5";      // in client_form_page
language_cell               = "B31";      // in manual_upload

spacing                   = 2;          // separation btw content cells int invoice_upload_page

cells_inv_dict = {
"counterpart"               : "B4", // in invoice_upload_page
"is_approved"               : "B6",
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
"tax"                       : "B32",
"item_1"                    : "B34",
"quantity_1"                : "B36",
"unit_price_1"              : "B38"
};

cells_client_dict = {
    "counterpart"        : "B4", // in client_upload_page
    "relation"           : "B6",
    "payment_methods"    : "B8",
    "contact_email"      : "B10",
    "country"            : "B12",
    "city"               : "B14",
    "address"            : "B16",
    "language"           : "B18",
    "client_group_1"     : "B20",
    "client_group_2"     : "B22",
    "client_group_3"     : "B24",
    "url_logo"           : "B26",
    "currency"           : "B28" // LL_specific
    };