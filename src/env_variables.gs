///----------------------------------------------------------------
// Client Custom variables
//----------------------------------------------------------------

// Client name
client_name               = 'Iberogram';

// Client email config
user_email              = 'soporte@somosfili.com';

// Specific DBT client service URL
dbt_run_url               = 'https://dbt-dev-7txkfbm3yq-uc.a.run.app';

// sheet master id
spreadsheetId = "1UA373gL5oJm0Yru6vc7Wcvo4f9PuGQ-krPWXdldG66U"

// Root folder for receipt
rootDriveFolderId = "1VB_0wCNZwdmbxsTq3frPpJyX7yQ2hCeU"

// WebApp to upload portal
upload_portal_deploy_url = "https://script.google.com/macros/s/AKfycbzA4TAF_STM3zUo5MyvK0dzDIUHnhr0O_7Jb4j33RTJLgbn9NmudA0WCdydeMATWSfr0A/exec"


invoice_upload_fix_fields_l     = ["recurrence_periodicity", "installments", "invoice_date", "is_approved"]
counterpart_upload_fix_fields_l = ["relation"]

// Internal email configuration
fili_notif_email          = 'soporte@somosfili.com';

// Set true to allow multicurrency use - ommit formating and clearing currency field
multicurrency_allowed     = true;

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
is_approved_cell          = "B9";
payment_id_cell           = "B17";
payment_date_cell         = "B11"
relation_cell             = "B6";
duplicated_indirect_counterpart = "B3";
duplicated_counterpart_cell = "B5";     // in client_form_page
drive_folder_cell         = "B27";

first_row   = 2;          // in internal/manual/counterpart_upload
first_col   = "A";        // in internal/manual/counterpart_upload

inv_id_col_internal_load  = 'H';        // in manual_upload
url_inv_col_internal_load = 'BX';       // in manual_upload
counterpart_col_crm_load  = 'B';        // in counterpart_upload
id_col_payment_load       = 'C';        // in payment_upload


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