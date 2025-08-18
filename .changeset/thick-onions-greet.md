---
'magic.iamnoah.com': patch
---

smtp2go email api

- sendgrid no longer free + requires twilio account
- smtp2go verified sender required adding cname records to iamnoah.com ([with cloudflare proxy disabled](https://support.smtp2go.com/hc/en-gb/articles/360022578154-DNS-Setup-for-Cloudflare))
- sending test email worked perfectly

  ```bash
  curl --request POST \
  --url https://api.smtp2go.com/v3/email/send \
  --header 'Content-Type: application/json' \
  --header 'X-Smtp2go-Api-Key: api-8366C04B89A1473BB34DF24246DBBEF8' \
  --header 'accept: application/json' \
  --data '
  {
    "sender": "magic@iamnoah.com",
    "to": [
      "noah@iamnoah.com"
    ],
    "subject": "My First Email",
    "text_body": "Hello from the other side."
  }
  '
  ```

- update `sites/magic.iamnoah.com/src/server/email.js` to use smtp2go api via `fetch`
- `yarn dev` to test locally
- get a `payload` of a failed api request from [hasura event invocation logs](https://magic-graphql.iamnoah.com/console/events/data/loginSendEmail/logs)
- run against `localhost:3000/api/events/loginSendEmail`

  ```bash
  curl --request POST --url http://localhost:3000/api/events/loginSendEmail --header 'Content-Type: application/json' --data '{
    "created_at": "2025-08-18T06:54:44.766408",
    "delivery_info": {
        "current_retry": 2,
        "max_retries": 5
    },
    "event": {
        "data": {
            "new": {
                "approved": false,
                "created": "2025-08-18T06:54:44.766408+00:00",
                "domain": "localhost",
                "email": "magic@iamnoah.com",
                "expires": "2025-08-18T07:04:44.362+00:00",
                "geo": {
                    "code": {},
                    "error": "NA",
                    "geonameId": {},
                    "ip": "::1",
                    "vercel": {
                        "city": "undefined",
                        "country": "undefined",
                        "region": "undefined"
                    }
                },
                "id": "4a4ecf55-8ca2-46a9-8959-8db487bab7f3",
                "ip": "::1",
                "secret": "yelDwXMMJnoWzf4opeO/qxrdjgzkRrIabC5UGyZHbkU=",
                "userAgent": "Desktop (Chrome / Mac OS)",
                "userAgentRaw": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
                "userId": "d5347111-fa43-4c09-b3dd-7e9994651be5"
            },
            "old": null
        },
        "op": "INSERT",
        "session_variables": {
            "x-hasura-role": "admin"
        },
        "trace_context": {
            "sampling_state": "1",
            "span_id": "fa2b463f9cb8e0c3",
            "trace_id": "4409731bd4537ff7206f6eef15499d6b"
        }
    },
    "id": "969768ab-8442-4e69-bde6-37f866ff6c57",
    "table": {
        "name": "loginToken",
        "schema": "public"
    },
    "trigger": {
        "name": "loginSendEmail"
    }
  }'
  ```

- it worked! so we can deploy this to fix email auth
