
function send_email_to_user(file){
    let invoice_id = field_values_dict["invoice_id"];
    let counterpart = field_values_dict["counterpart"];
    let contact_email = invoice_upload_sheet.getRange(contact_email_cell).getValue(); // LL_specific
    let subject = `Se generó su comprobante con ID ${invoice_id}`;
    let message = `Estimado/a, <BR><BR>`
                  + `Adjunto a este email vas a encontrar `
                  + `el comprobante recientemente generado para ${counterpart} `
                  + `con ID ${invoice_id}. <BR>`
                  + `El mail de contacto proporcionado es:  ${contact_email} <BR><BR>`
                  + `Saludos, <BR> `
                  + `El equipo de Fili.`;

    GmailApp.sendEmail(client_email, subject, '', {
      bcc         : fili_notif_email,
      htmlBody    : message,
      attachments : [file]
    })
    Logger.log("Se envió la factura al cliente:  " + client_email);

    return;
  }


function send_email_to_client(file){

  let subject = get_translated_subject();

  let message = get_translated_message();

  let contact_email = invoice_upload_sheet.getRange(contact_email_cell).getValue(); // LL_specific

  GmailApp.sendEmail(contact_email, subject, '', {
    cc          : client_email,
    bcc         : fili_notif_email,
    htmlBody    : message,
    attachments : [file]
  })

    Logger.log("Se envió la factura al contacto externo:  " + contact_email);

  return;
}

function get_translated_subject(){
    let counterpart = field_values_dict["counterpart"];
    let invoice_month = get_month_in_translated_text();

    let en_subject = `SEO Invoice ${invoice_month} - ${counterpart}`
    let fr_subject = `Facture SEO ${invoice_month} - ${counterpart}`
    let es_subject = `Factura SEO ${invoice_month} - ${counterpart}`

    switch (language) { // LL_specific
        case 'Inglés':
            return en_subject;
        case 'Francés':
            return fr_subject;
        case 'Español':
            return es_subject;
    } // LL_specific
}

function get_translated_message(){
    let invoice_month = get_month_in_translated_text();
    let emoji_html = "&#128075;"

    let en_message = `Hello ${emoji_html}, <BR><BR>`
                + `Attached you will find the invoice regarding the `
                + `the SEO services provided during ${invoice_month}.<BR><BR>`
                + `Thank you and have a nice day! <BR><BR>`
                + `Lucio Laria, <BR> `
                + `<font size="-2">Sent with Fili</font>`


    let fr_message = `Bonjour ${emoji_html}, <BR><BR>`
                  + `Vous trouverez ci-joint la facture correspondante aux services `
                  + `de référencement naturel réalisés lors du mois de ${invoice_month}.<BR><BR>`
                  + `Merci beaucoup et bonne journée! <BR><BR>`
                  + `Lucio Laria, <BR> `
                  + `<font size="-2">Envoyé avec Fili</font>`


    let es_message = `Hola ${emoji_html}, <BR><BR>`
                + `Adjunta encontrarán la factura correspondiente a los servicios `
                + `de SEO brindados en ${invoice_month}.<BR><BR>`
                + `¡Muchas gracias! <BR><BR>`
                + `Lucio Laria, <BR> `
                + `<font size="-2">Enviado con Fili</font>`


    switch (language) { // LL_specific
        case 'Inglés':
            return en_message
        case 'Francés':
            return fr_message
        case 'Español':
            return es_message
    } // LL_specific

}

function get_month_in_translated_text(){
  const en_month_names = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

    const es_month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const fr_month_names = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];


    let invoice_month_num = field_values_dict["invoice_date"].getMonth();
    let invoice_month;


    switch (language) { // LL_specific
      case 'Inglés':
        invoice_month = en_month_names[invoice_month_num];
      case 'Francés':
        invoice_month = fr_month_names[invoice_month_num];
      case 'Español':
        invoice_month = es_month_names[invoice_month_num];
  } // LL_specific

  return invoice_month;

}
