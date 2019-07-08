({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  //if (body.message) {
  	api.run('this.post_confirmation', {userid: body.user.id, message: body.message.text, url: `http://example.com/${body.user.name}/clip`, poster: api.run('this.id_to_name',{id: body.message.user})[0].name, importance: 'High'});
  //}
  //else {
  //  api.run('this.open_dialog', {trigger_id: body.trigger_id, message: body.message.text, name: api.run('this.id_to_name',{id: body.message.user})[0].name});
  //}
  return { status_code: 200 };
}
