
function send_email_to_user(file){
    let invoice_id = field_values_dict["invoice_id"];
    let counterpart = field_values_dict["counterpart"];
    let subject = `Se generó su comprobante con ID ${invoice_id}`;
    let message = `Estimado/a, <BR><BR>`
                  + `Adjunto a este email vas a encontrar `
                  + `el comprobante recientemente generado para ${counterpart} `
                  + `con ID ${invoice_id}. <BR><BR>`
                  + `Saludos, <BR> `
                  + `El equipo de Fili.`;

    GmailApp.sendEmail(client_email, subject, '', {
      htmlBody    : message,
      attachments : [file]
    })
    Logger.log("Se envió la factura al cliente:  " + client_email);

    return;
  }


function send_email_internal_notif(){
    let counterpart = field_values_dict["counterpart"];
    let invoice_id = field_values_dict["invoice_id"];
    let sheet_name  = spreadsheet.getName();

    let subject = `[INFO] ${client_name} - Nuevo comprobante automático con ID ${invoice_id}`;
    let message = `Equipo Fili, <BR><BR>`
                  + `Se acaba de generar un comprobante `
                  + `para ${counterpart} en la sheet ${sheet_name} con ID ${invoice_id}. <BR><BR>`
                  + `No se requiere ninguna acción por parte de Fili. <BR><BR>`
                  + `Saludos, <BR>`
                  + `El equipo de Fili.`

    GmailApp.sendEmail(fili_notif_email, subject, '', {
        htmlBody : message
    });

    return;
  }


  function send_email_pending_generation(){
    let counterpart = field_values_dict["counterpart"];
    let subject = `Sus comprobantes están en proceso`;
    let message = `Estimado/a, <BR><BR>`
                  + `Los comprobantes recientemente generados `
                  + `para ${counterpart} se encuentran en proceso. <BR><BR>`
                  + `Saludos, <BR> `
                  + `El equipo de Fili.`;

    GmailApp.sendEmail(client_email, subject, '', {
        htmlBody: message
    });

    Logger.log("Se notificó que la generación está en proceso al cliente: " + client_email);

    return;
  }


function send_email_internal_action_req(){
    let invoice_id = field_values_dict["invoice_id"];
    let counterpart = field_values_dict["counterpart"];
    let sheet_name  = spreadsheet.getName();

    let subject = `[URGENTE] ${client_name} - Nuevo comprobante en cuotas / recurrente `
                  + `con ID ${invoice_id}`;
    let message = `Equipo Fili, <BR><BR>`
                  + `Se acaba de generar un comprobante `
                  + `para ${counterpart} en la sheet ${sheet_name} con ID ${invoice_id}. `
                  + `Se puso en marcha la generación de tantos comprobantes `
                  + `como correspondan, con sus fechas de vencimiento, montos `
                  + `y número de cuota si corresponde. <BR><BR>`
                  + `Saludos, <BR>`
                  + `El equipo de Fili.`

    GmailApp.sendEmail(fili_notif_email, subject, '', {
        htmlBody : message
    });

    Logger.log('Se notificó internamente que se debe generar las facturas recurrentes '+
                'o por cuotas a: ' + fili_notif_email);

    return;
  }



function send_email_to_client(file){

  let subject = get_translated_subject();

  let message = get_translated_message();

    // VER SI ES LISTA
  // contact_email = read

  GmailApp.sendEmail(fili_notif_email, subject, '', {
    cc          : client_email,
    htmlBody    : message,
    attachments : [file]
  })

//   Logger.log("Se envió la factura al contacto externo:  " + contact_email);

  return;
}

function get_translated_subject(){

    let en_subject = `New invoice issued by ${client_name}`

    let fr_subject = `Nouvelle facture émise par ${client_name}`

    let es_subject = `Nueva Factura de ${client_name}`;

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
    let counterpart = field_values_dict["counterpart"];

    let en_message = `Hello ${counterpart} team, <BR><BR>`
                + `I hope all is well.  `
                + `Attached you will find the invoice issued to you `
                + `by ${client_name}. <BR><BR>`
                + `Regards, <BR> `
                + `${client_name}`;

    let fr_message = `Bonjour à l'équipe de ${counterpart}, <BR><BR>`
                + `J'espère que tout va bien. `
                + `Vous trouverez ci-joint la facture émise par `
                + `${client_name}. <BR><BR>`
                + `Cordialement, <BR> `
                + `${client_name}`;

    let es_message = `Hola equipo de ${counterpart}, <BR><BR>`
                + `Espero que todo vaya bien. `
                + `Adjunta encontrarán la factura emitida para ustedes por `
                + `parte de ${client_name}. <BR><BR>`
                + `Saludos, <BR> `
                + `${client_name}`;

    switch (language) { // LL_specific
        case 'Inglés':
            return en_message
        case 'Francés':
            return fr_message
        case 'Español':
            return es_message
    } // LL_specific

}