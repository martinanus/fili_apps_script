function clear_form(){
    page_name         = "Carga de Facturas";
    clear_range       = "B3:B73";
    default_bg_colour = "white"; 
  
    ss = SpreadsheetApp.getActiveSpreadsheet();
    range = ss.getRange(page_name + '!' + clear_range);
    
    range.clearContent();
    range.setBackground(default_bg_colour);
  }
  
  function onOpen(){
    clear_form();
  }