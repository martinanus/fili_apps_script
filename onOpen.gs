function clear_background(){
  
  var range = spreadsheet.getRange(invoice_upload_page_name + '!' + content_range);
  
  range.setBackground(default_bg_colour);
  SpreadsheetApp.flush();
}

function clear_form(){  
  var range = spreadsheet.getRange(invoice_upload_page_name + '!' + content_range);
  
  range.clearContent();
  SpreadsheetApp.flush();
}

function onOpen(){
  set_global_variables();
  clear_background();
  clear_form();
  set_ready_status();
}