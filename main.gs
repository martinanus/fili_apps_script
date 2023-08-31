var webAppUrl = "https://script.google.com/macros/s/AKfycby5_LkD6rtcOqgam0cOjysk-TcGjxFoHmMwmadpRPs4X5wokjwsR9dTsmEya0tdeqrr0g/exec"

function makePost(args){

  // Make a POST request with a JSON payload.
  var urlWithArgs = webAppUrl + "?" + args;
  var options = {
    'method' : 'post'
  };

  UrlFetchApp.fetch(urlWithArgs, options);
  console.log("URL: "+ urlWithArgs)
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
