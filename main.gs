var webAppUrl = "https://script.google.com/macros/s/AKfycbzwfAwI9e3BK0JGDWUGF-Vh15bnWY--YUUUmRV33nkAZf1kT8aoj7mIv1fAOD4lUfE0tQ/exec"

function makePost(args){

  // Make a POST request with a JSON payload.
  var data = {
    'trigger': 'notUsed'
  };
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };

  var urlWithArgs = webAppUrl + "?" + args;
  UrlFetchApp.fetch(urlWithArgs, options);
  console.log("URL: "+ urlWithArgs)
}


function customOnOpen(){
    makePost("onOpen");
}

function add_new_client(){
    makePost("add_new_client");
}

function generate_invoice(){
    makePost("generate_invoice");
}

function check_internal_data(){
    makePost("check_internal_data");
}

function check_crm_data(){
  makePost("check_crm_data");
}

function check_payment_data(){
  makePost("check_payment_data");
}

function load_data(){
    makePost("load_data");
}
