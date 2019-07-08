({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  api.run('this.open_dialog', {token: body.trigger_id, message: body.message.text, name: api.run('this.id_to_name',{id: body.message.user})[0].name});
  return { status_code: 200 };
}
