import config from './config';

// smtp2go email api
// https://developers.smtp2go.com/docs/send-an-email
//
// ```bash
// curl --request POST \
//   --url https://api.smtp2go.com/v3/email/send \
//   --header 'Content-Type: application/json' \
//   --header 'X-Smtp2go-Api-Key: api-8366C04B89A1473BB34DF24246DBBEF8' \
//   --header 'accept: application/json' \
//   --data '
//   {
//     "sender": "magic@iamnoah.com",
//     "to": [
//       "noah@iamnoah.com"
//     ],
//     "subject": "My First Email",
//     "text_body": "Hello from the other side."
//   }
//   '
// ```
//
async function send(options) {
  // options: {
  //   email: String,
  //   subject: String,
  //   html: String,
  // }
  if (!options) throw new Error('[server/email] send requires options');

  const url = 'https://api.smtp2go.com/v3/email/send';

  const body = {
    sender: config.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html_body: options.html,
  };

  console.info(`[server/email] api request`, { url, body });

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-smtp2go-api-key': config.SMTP2GO_API_KEY,
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const resp_json = await resp.json();
    console.info(`[server/email] api response status=${resp.status}`, { resp_json });

    if (!resp.ok) {
      throw new Error(`status=${resp.status} json=${JSON.stringify(resp_json)}`);
    }
  } catch (error) {
    console.error(`[server/email] api fetch failed`, { error });
    throw new Error(`[server/email] api request failed: ${error.message}`);
  }
}

const module = { send };
export default module;
