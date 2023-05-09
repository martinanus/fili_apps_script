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

//----------------------------------------------------------------
// Standard variables
//----------------------------------------------------------------

// Sheet pages name
invoice_upload_page_name  = "Carga de Facturas";
receipt_page_name         = "Comprobante";
manual_upload_page_name   = "manual_upload";
internal_upload_page_name = "internal_upload";


fili_notif_email          = 'jeidlicz@gmail.com, \
                             agmendilaharzu@gmail.com, \
                             soporte@somosfili.com, \
                             anusmartin1@gmail.com';

// Items quantity
item_q                    = 20;

// Colors
default_bg_colour         = "#FFFFFF";   // white
running_bg_colour         = "#FF6D01";   // orange
error_bg_colour           = "#FF4122";   // red
validated_bg_colour       = "#0ADB3A";   // green


// Cells declaration
content_range             = "B3:B75";   // in invoice_upload_page
final_invoice_cell        = "B18";      // in receipt_page
status_cell               = "B2";       // in invoice_upload_page
first_col_internal_load   = 1;          // =A in manual_upload
first_row_internal_load   = 2;          // in manual_upload
inv_id_col_internal_load  = 'K';        // in manual_upload
url_inv_col_internal_load = 'BW';       // in manual_upload

cells_client_dict = {
"counterpart"               : "B3", // in invoice_upload_page
"relation"                  : "B4",
"email"                     : "B5",
"is_approved"               : "B6",
"installments"              : "B7",
"fixcost_periodicity"       : "B8",
"installments_periodicity"  : "B9",
"invoice_date"              : "B10",
"due_date"                  : "B11",
"invoice_id"                : "B12",
"invoice_group_1"           : "B13",
"invoice_group_2"           : "B14",
"tax"                       : "B15",
"item_1"                    : "B16",
"unit_price_1"              : "B17",
"quantity_1"                : "B18",
};