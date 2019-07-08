({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  return { status_code: 200 };
}
