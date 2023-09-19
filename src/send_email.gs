// LL_specific all the page -

function send_email_to_client(file){

  let subject = get_translated_subject();

  let message = get_translated_message();

  let contact_email = invoice_upload_sheet.getRange(contact_email_cell).getValue();

  GmailApp.sendEmail(contact_email, subject, '', {
    cc          : user_email,
    bcc         : fili_notif_email,
    htmlBody    : message,
    attachments : [file]
  })

    Logger.log("Se envió la factura al contacto externo:  " + contact_email);

  return;
}

function get_translated_subject(){
    let counterpart = inv_field_values_dict["counterpart"];
    let invoice_month = get_month_in_translated_text();

    let en_subject = `SEO Invoice ${invoice_month} - ${counterpart}`
    let fr_subject = `Facture SEO ${invoice_month} - ${counterpart}`
    let es_subject = `Factura SEO ${invoice_month} - ${counterpart}`

    switch (language) {
        case 'Inglés':
            return en_subject;
        case 'Francés':
            return fr_subject;
        case 'Español':
            return es_subject;
    }
}

function get_translated_message(){
    let counterpart = inv_field_values_dict["counterpart"];
    let invoice_month = get_month_in_translated_text();
    let emoji_html = "&#128075;"

    let en_body = `Attached you will find the invoice regarding the `
                + `SEO services provided during ${invoice_month}.`
    let en_message = `Hello ${emoji_html}, <BR><BR>`
                + add_body(en_body)
                + `<BR><BR>Thank you and have a nice day! <BR><BR>`
                + `Lucio Laria,`
                + `<font size="-2">`
                + getFiliUrlWithUtm(counterpart,"Sent with Fili")
                +`</font>`

    let fr_body = `Vous trouverez ci-joint la facture correspondante aux services `
                + `de référencement naturel réalisés lors du mois de ${invoice_month}.`
    let fr_message = `Bonjour ${emoji_html}, <BR><BR>`
                  + add_body(fr_body)
                  + `<BR><BR>Merci beaucoup et bonne journée! <BR><BR>`
                  + `Lucio Laria, `
                  + `<font size="-2">`
                  + getFiliUrlWithUtm(counterpart,"Envoyé avec Fili")
                  +`</font>`

    let es_body = `Adjunta encontrarán la factura correspondiente a los servicios `
                  + `de SEO brindados en ${invoice_month}.`
    let es_message = `Hola ${emoji_html}, <BR><BR>`
                + add_body(es_body)
                + `<BR><BR>¡Muchas gracias! <BR><BR>`
                + `Lucio Laria,`
                + `<font size="-2">`
                + getFiliUrlWithUtm(counterpart,"Enviado con Fili")
                +`</font>`


    switch (language) {
        case 'Inglés':
            return en_message
        case 'Francés':
            return fr_message
        case 'Español':
            return es_message
    }

}

function get_month_in_translated_text(){
  const en_month_names = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

    const es_month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const fr_month_names = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];


    let invoice_month_num = inv_field_values_dict["invoice_date"].getMonth();
    let invoice_month;


    switch (language) {
      case 'Inglés':
        invoice_month = en_month_names[invoice_month_num];
        break;
      case 'Francés':
        invoice_month = fr_month_names[invoice_month_num];
        break;
      case 'Español':
        invoice_month = es_month_names[invoice_month_num];
        break;
  }

  return invoice_month;

}

function add_body(default_msg){

  let custom_mail = invoice_upload_sheet.getRange(custom_mail_content_cell).getValue();

  if (custom_mail){
      return custom_mail.replaceAll("\n", "<BR>");
  }

  return default_msg;
}
