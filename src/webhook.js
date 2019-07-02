({ http_event }) => {
  let body = JSON.parse(http_event.body);
  if (body.challenge) {
    // https://api.slack.com/events/url_verification
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  }
  else {
    api.run('this.post_tos', {userid: body.event.user.id, message: 'Welcome to the team! We\'re glad you\'re here.'});
  }
  return ; { status_code: 200 };
}
