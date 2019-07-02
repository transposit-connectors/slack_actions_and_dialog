({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event.body).payload);
  if (body.challenge) {
    // https://api.slack.com/events/url_verification
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  }
  else {
    api.run('this.post_confirmation', {userid: body.user.id, message: body.message.text, url: `http://example.com/${body.user.name}/clip`, poster: api.run('this.id_to_name',{id: body.message.user})[0].name, importance: 'High'});
  }
  return { status_code: 200 };
}
