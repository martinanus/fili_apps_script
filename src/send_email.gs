
function send_email_with_receipt(file){
    let invoice_id = inv_field_values_dict["invoice_id"];
    let counterpart = inv_field_values_dict["counterpart"];
    let recurrence = inv_field_values_dict["recurrence_periodicity"];
    let installments = inv_field_values_dict["installments"];
    let subject = `Se generó su comprobante con ID ${invoice_id}`;
    let message = `Estimado/a, <BR><BR>`
                  + `Adjunto a este email vas a encontrar `
                  + `el comprobante recientemente generado para ${counterpart} `
                  + `con ID ${invoice_id}. <BR><BR>`
                  + `Cuota: 1 / ${installments} <BR>`
                  + `Recurrencia: ${recurrence} <BR><BR>`
                  + `Saludos, <BR> `
                  + `El equipo de Fili.`;

    GmailApp.sendEmail(user_email, subject, '', {
      cc          : fili_notif_email,
      htmlBody    : message,
      attachments : [file]
    })
    Logger.log("Se envió la factura al usuario:  " + user_email);

    return;
  }