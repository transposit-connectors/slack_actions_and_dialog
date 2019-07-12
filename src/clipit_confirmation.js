({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  if (body.message) {
    api.run('this.open_dialog', {trigger_id: body.trigger_id, message: body.message.text, name: api.run('this.id_to_name',{user: body.message.user})[0].name});
  }
  else {
    api.run('this.create_record', {message: body.submission.message, poster: body.user.name, importance: body.submission.importance})
    //Find the entry to set the url
    let entry = api.run('this.get_records').pop().id;
    let url = `https://airtable.com/tbljGpXAuVv4AhDwT/viwbw9dJQtaUQdswj/${entry}?blocks=hide`;
    api.run('this.post_confirmation', {userid: body.user.id, message: body.submission.message, url: url, poster: body.user.name, importance: body.submission.importance});
  }
  return { status_code: 200 };
}
