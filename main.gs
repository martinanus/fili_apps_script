var webAppUrl = "REPLACE_ME"

function makePost(args){

  // Make a POST request with a JSON payload.
  var urlWithArgs = webAppUrl + "?" + args;
  var options = {
    'method' : 'post'
  };

  Logger.log("URL: "+ urlWithArgs)

  var response = UrlFetchApp.fetch(urlWithArgs, options);
  var responseContentText = response.getContentText();

  Logger.log("responseContentText: " + responseContentText)

  if(responseContentText != "OK"){
    throw new Error(responseContentText)
  }
}


function customOnOpen(){
    makePost("customOnOpen");
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
