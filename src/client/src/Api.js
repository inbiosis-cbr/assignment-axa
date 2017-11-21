/* eslint-disable no-undef */
function auth(query, cb) {
  //console.log("token=" + query + "&check=1");

  var payload = {
      token: query,
  };

  var headers = new Headers();

  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body

  //var data = new FormData();
  //data.append( "token", query);
  //data.append( "json",  );
  var data = JSON.stringify(payload);

  return fetch(`api/user/auth`, {
    'method': "POST",
    'body': data,
    'headers': headers
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);

//    .then(function(res){ return res.json(); })
//    .then(function(data){ alert( JSON.stringify( data ) ) })

}

function checkStatus(response) {
  console.log(response);
  console.log('Status', response.status);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Api = { auth };
export default Api;