function exit_on_error(error_msg){
  if (source == "CLIENT"){
    set_error_status();
  }

  throw new Error(error_msg);
}

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
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