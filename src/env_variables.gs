//----------------------------------------------------------------
// Client Custom variables
//----------------------------------------------------------------

// Client name
client_name                 = 'Lucio Laria';

// Client email config
user_email                  = 'soporte@somosfili.com'; // TODO - This need to be updated
//user_email                  = 'luciolaria@gmail.com';

// Drive root upload Folder for generated receipt
drive_root_folder_id        = "12FHFOmdji-CftGIowrxuYNt6cRngK4-P" // TODO - This need to be updated

// Specific DBT client service URL
//dbt_run_url               = 'https://dbt-luciolaria-7txkfbm3yq-uc.a.run.app/';

// Upload Portal deploy URL
upload_portal_deploy_url    = "https://script.google.com/macros/s/AKfycby9huSbp7k-QQOH2PpGLVBL7sJXKiBvmpmIhOVO8PQ-mIjll-Lsedg0SCd_vzmXP_jZJQ/exec"

// Sheet Master id
spreadsheetId               = "1mkSS7eWwTxa22tGKtyGouuXSKyRn4adekLRrqVbgyeU"

// Internal email configuration
fili_notif_email          = 'soporte@somosfili.com';

// Fix fields - this fields won't be cleared
invoice_upload_fix_fields_l     = ["installments_periodicity", "currency"]
counterpart_upload_fix_fields_l = []

// Additional custom mandatory fields
invoice_custom_mandatory_fields_l     = []
counterpart_custom_mandatory_fields_l = ["payment_methods", "language", "currency"]

// Data for UTM
bqDataset               = 'luciolaria';
filiWebSiteUrl          = "www.somosfili.com"

//----------------------------------------------------------------
// Standard variables
//----------------------------------------------------------------

// Sheet pages name
client_form_page_name     = "Alta de Contraparte";
client_upload_page_name   = "counterpart_upload";

invoice_upload_page_name  = "Carga de Facturas"; // LL_specific
receipt_page_name         = "Comprobante";
manual_upload_page_name   = "manual_upload";
internal_upload_page_name = "internal_upload";
payment_upload_page_name  = "payment_upload";

receipt_en_page_name      = "en_inv"; // LL_specific
receipt_fr_page_name      = "fr_inv";
receipt_es_page_name      = "es_inv";


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
is_approved_cell          = "B6";
payment_id_cell           = "B17";
relation_cell             = "B5";       // in invoice_upload_page
duplicated_counterpart_cell = "B5";     // in client_form_page

// LL_specific
language_cell             = "B29";      // in invoice_upload_page
contact_email_cell        = "B31";      // in invoice_upload_page
custom_mail_content_cell  = "B25";      // in invoice_upload_page

first_row   = 2;          // in manual_upload
first_col   = "A";        // in manual_upload

inv_id_col_internal_load  = 'H';        // in manual_upload
url_inv_col_internal_load = 'BX';       // in manual_upload
counterpart_col_internal_load  = 'B';   // in internal_upload
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
    "url_logo"           : "B32",
    "currency"           : "B34" // LL_specific
};