function exit_on_error(error_msg){
  if (source == "MANUAL"){
    set_error_status();
  }
  throw new Error(error_msg);
}

function columnToLetter(column){
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter){
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function hash_str(str_to_hash){
  let sum = 0;

  for (let i = 0; i < str_to_hash.length; i++) {
    sum += str_to_hash.charCodeAt(i);
  }
  sum *= str_to_hash.charCodeAt(0);

  return sum;
}


function run_dbt() {
  // Use the OpenID token inside App Scripts
  const token = ScriptApp.getIdentityToken();
  var options = {
      'method' : 'get',
      'headers': {'Authorization': 'Bearer ' + token},
  };

  // call the server
  UrlFetchApp.fetch(dbt_run_url , options);
}

function getToUploadPortalForm(){
  var response = UrlFetchApp.fetch(upload_portal_deploy_url);
}