var webAppUrl = "https://script.google.com/macros/s/AKfycbzmPJ2OKpKuhDfWugH9zloeC5Kezh2C74LmoohbcvqTr18l-JNm9705on3YjiaqIGl1lg/exec"

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


function onOpen(){
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

function load_internal_data(){
    makePost("load_internal_data");
}
