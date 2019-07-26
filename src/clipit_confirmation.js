({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  if (body.message) {
    api.run('this.open_dialog', {trigger_id: body.trigger_id, message: body.message.text, name: api.run('this.id_to_name',{user: body.message.user})[0].name});
  }
  else {
    api.run('this.create_record', {baseId: env.get("baseId"), message: body.submission.message, poster: body.submission.send_by, importance: body.submission.importance})
    // Automatically set to an example url. If you want to change it, go to environment variables.
    let url = env.get("url");
    api.run('this.post_confirmation', {userid: body.user.id, message: body.submission.message, url: url, poster: body.submission.send_by, importance: body.submission.importance});
  }
  return { status_code: 200 };
}
