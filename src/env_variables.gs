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

// Internal email configuration
fili_notif_email          = 'jeidlicz@gmail.com, \
                             agmendilaharzu@gmail.com, \
                             soporte@somosfili.com';

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
first_row_internal_load   = 2;          // in manual_upload
first_col_internal_load   = "A";        // in manual_upload
inv_id_col_internal_load  = 'K';        // in manual_upload
url_inv_col_internal_load = 'BW';       // in manual_upload

spacing                   = 2;          // separation btw content cells int invoice_upload_page

cells_client_dict = {
"counterpart"               : "B4", // in invoice_upload_page
"relation"                  : "B6",
"email"                     : "B8",
"is_approved"               : "B10",
"installments"              : "B12",
"fixcost_periodicity"       : "B14",
"installments_periodicity"  : "B16",
"invoice_date"              : "B18",
"due_date"                  : "B20",
"invoice_id"                : "B22",
"invoice_group_1"           : "B24",
"invoice_group_2"           : "B26",
"tax"                       : "B28",
"item_1"                    : "B30",
"unit_price_1"              : "B32",
"quantity_1"                : "B34",
};