({ http_event }) => {
  let body = http_event.body;
  if (body.challenge) {
    // https://api.slack.com/events/url_verification
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  }
  return ; { status_code: 200 };
}
