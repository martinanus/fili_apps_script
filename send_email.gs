
function send_email_with_receipt(file){
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

    let subject = `[INFO] ${sheet_name} - Nuevo comprobante automático con ID ${invoice_id}`;
    let message = `Equipo Fili, <BR><BR>`
                  + `Se acaba de generar un comprobante `
                  + `para ${counterpart} en la sheet ${sheet_name} con ID ${invoice_id}. <BR><BR>`
                  + `No se requiere ninguna acción por parte de Fili. <BR><BR>`
                  + `Saludos, <BR>`
                  + `El equipo de Fili.`

    GmailApp.sendEmail(fili_notif_email, subject, '', {
        htmlBody : message
    });

    Logger.log('Se notificó internamente que se debe generar las facturas recurrentes '+
                'o por cuotas a: ' + fili_notif_email);

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


function send_email_internal_action_req(file){
    let counterpart = field_values_dict["counterpart"];
    let sheet_name  = spreadsheet.getName();

    let subject = `[URGENTE] ${sheet_name} - Nuevo comprobante en cuotas / costo fijo`;
    let message = `Equipo Fili, <BR><BR>`
                  + `Se acaba de generar un comprobante `
                  + `para ${counterpart} en la sheet ${sheet_name}. `
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