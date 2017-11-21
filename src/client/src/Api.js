/* eslint-disable no-undef */
function auth(query, cb) {
  return fetch(`api/user/auth`, {
    accept: "application/json",
    method: "POST",
    body: "token=" + query
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  console.log(response);
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