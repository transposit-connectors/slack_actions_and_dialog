# Message Action and Dialog Blueprint

> _Updated July 2019: This are specific instructions for use in Transposit. For other methods, check the Slack API website._

By registering your app's capabilities as message actions, users can pick and choose messages to send to your app so you can do something useful with them. Store these messages in a virtual trapper keeper, feed them to your internal markov chain bot, or file away information about an important lead.

## Creating "ClipIt" app using an action and a dialog

This fictional Slack app, "ClipIt" allows users to "clip" a message posted on Slack by using the actions to export the message to JSON to be used in the external 3rd party app/service, let's say, "ClipIt web app".

### Developer Use-Cases

If you are developing apps like memo / note-taking app, collaborative doc app, this sample use-case would be a nice addition to your Slack app.

Also, the message action would be great for:

- Bug / issue tracking app (_e.g._ "Create a ticket from the message")
- To-Do app (_e.g._ "Create a to-do")
- Project management app (_e.g._ "Attach to task")
- Social media (_e.g._ "Post it to [my social media] App")

### User Work Flow

When a user hover a message then choose "Clip the message" from the action menu, a dialog pops open.
The message text is pre-populated into the dialog box, but the user can edit before submitting it too.
Once a user finalize the form and submit, the app DMs the user with the confirmation.

​
![ClipIt](https://cdn.glitch.com/441299e3-79ff-44b2-9688-4ade057797c8%2Fscreen_actions_dialogs_demo.gif?1526686807617)

## Setup

#### Create a Slack app

1. Create an app at https://api.slack.com/apps
2. Go to Bot Users and click "Add a Bot User" to create a, app bot. Save the change.
3. Navigate to the OAuth & Permissions page and add the following scopes:
   - `commands` (required for Actions)
   - `users:read` (need to get user info _e.g._ full names)
   - `chat:write:bot` (required for posting messages)
4. Add https://accounts.transposit.com/oauth/v2/handle-redirect as a Redirect URI.
5. Click 'Save Changes' and install the app

#### Create your Database in Airtable

1. Add a new base in Airtable. If you are new to Airtable, check out their [Support Center](https://support.airtable.com/hc/en-us).
2. Modify your table with the name `ClipIt` and
   - First column `message` with type "Long text"
   - Second column `poster` with type "Single line text"
   - Third column `importance` with type "Single select" and options `Low`, `Medium`, and `High`

#### Fork in Transposit

1. [Fork this app on Transposit](https://console.transposit.com/t/transposit-sample/slack_actions_and_dialog?readme=true)
2. Authenticate your API token with Slack
3. Authenticate slackbot's API token with the Client iD in your Slack App under Authentication
4. Change all the Airtable specific strings to those matching your credentials
   - `clipit` url
   - `create_record` baseId
   - `get_records` baseId

#### Add an Action

1. Go back to the app settings and click on **Interactive Components**.
2. Click "Enable Interactive Components" button:
   - Request URL: The generated webhook url for `newuser` in Transposit under Deploy
   - Under **Actions**, click "Create New Action" button
     - Action Name: `Clip the message`
     - Description: `Save this message to ClipIt! app`
     - Callback ID: `clipit`
3. Save
   ​

### Transposit Functions

`clipit`: The operation that is called when you call Clipit.

`create_record`: Saves the Clip to an Airtable project.

`get_records`: Returns a list of entries in Airtable for the URL.

`id_to_name`: A helper API call to convert an ID to a name.

`open_dialog`: The Slack API call to open the Clipit dialog.

`post_confirmation`: The Slack API call to post the Clipit confirmation message.
