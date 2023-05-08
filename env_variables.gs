//----------------------------------------------------------------
// Client Custom variables
//----------------------------------------------------------------

// Drive upload Folder for generated invoiced
upload_folder_id          = '1gYNhl_1QetW_9v6B9j3s3awIV7LbTcn8';

// Email config
client_email              = 'soporte@somosfili.com';

// DBT service URL
dbt_run_url               = 'https://dbt-fili-7txkfbm3yq-uc.a.run.app';

//----------------------------------------------------------------
// Standard variables
//----------------------------------------------------------------

// Sheet pages name
invoice_upload_page_name  = "Carga de Facturas";
receipt_page_name         = "Comprobante";
manual_upload_page_name   = "manual_upload";


// TODO - Replace emails for real operation
// fili_notif_email          = 'jeidlicz@gmail.com, \
//                              agmendilaharzu@gmail.com, \
//                              soporte@somosfili.com';
fili_notif_email          = 'anusmartin1@gmail.com, \
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
execute_button_cell       = "B2";       // in receipt_page

field_cells_dict = {              
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