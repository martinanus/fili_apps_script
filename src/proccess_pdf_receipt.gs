function generate_pdf_receipt(){
    var export_url  = generate_export_url();
    var options     = get_http_options();

    var response    = UrlFetchApp.fetch(export_url, options);
    if (response.getResponseCode() !== 200) {
      console.log("Error exporting Sheet to PDF!  Response Code: " + response.getResponseCode());
      exit_on_error("Error en la generación del comprobante. Contacte al administrador para solucionarlo.");
    }

    return response;
}


function generate_export_url(){

    const url_base = spreadsheet.getUrl().replace(/edit$/,'');
    const sheet_tab_id = receipt_sheet.getSheetId();
    const ss_id = spreadsheet.getId();
    const export_url = url_base +
      'export?'+
      'exportFormat=pdf&format=pdf' +
      '&gid=' + sheet_tab_id +
      '&id=' + ss_id +
      '&size=A4' +
      '&portrait=true' +
      '&fith=true' +
      '&sheetnames=false'+
      '&printtitle=false'+
      '&pagenumbers=true' +
      '&gridlines=false' +
      '&fzr=false';         // frozen rows - do not repeat row headers on each page

    Logger.log('exportUrl: ' + export_url)

    return export_url;
}


function get_http_options(){

    var options = {
      headers: {
        'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken(),
      }
    }
    options.muteHttpExceptions = true;

    return options;
}


function upload_pdf(http_response){
    var folder          = getFolderToUpload();
    var invoice_id      = inv_field_values_dict["invoice_id"];
    var the_blob        = http_response.getBlob().getAs('application/pdf').setName(invoice_id +'.pdf');
    var uploaded_file   = folder.createFile(the_blob);
    var file_url        = uploaded_file.getUrl();

    inv_field_values_dict["url_invoice"]            = file_url;
    inv_field_values_dict["url_source_reference"]   = file_url;

    if(is_approved){
      payment_field_values_dict["documents_url"]        = file_url;
      payment_field_values_dict["url_source_reference"] = file_url;
    }

    return uploaded_file;
}


