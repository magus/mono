# magic.iamnoah.com

## 0.9.2

### Patch Changes

- e4a15b9: vercelignore .env files

  - Check + update github secrets for `mono/.github/workflows/magic.iamnoah.com.yml`
  - Rotate `https://magic-graphql.iamnoah.com` secrets (dokku)

    - `dcsseeds`
    - `mono/sites/magic.iamnoah.com`
    - For both sites above
      - explicitly vercelignore `.env*`
      - set sensitive secret with current values
      - redeploy vercel with sensitive secret
      - confirm `.env` is not present in vercel deployment files
      - rotate secret in service (railway / dokku)
      - confirm hasura login with new secret works
      - update vercel with new secret

  - dokku

    tailscale ssh into the digital ocean droplet and update hasura

    initial `config:set` failed due to timeout at 100% CPU but manual stop + start worked

    ```bash
    ssh root@magic-auth
    dokku config:set hasura HASURA_GRAPHQL_ADMIN_SECRET="NEW_SECRET"
    dokku ps:stop hasura
    dokku ps:start hasura
    ```

## 0.9.1

### Patch Changes

- e35bed3: smtp2go email api

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

## 0.9.0

### Minor Changes

- 35aef7f: framer-motion6.5.1

### Patch Changes

- Updated dependencies [35aef7f]
  - @magusn/react@0.8.0

## 0.8.0

### Minor Changes

- e836e64: db: dcsseeds_scrapePlayers_item_search_name function
- 2246336: db: restart.sh every 4 hours and cleanup verbose logging
- 5f8ab90: docs: dokku health check and git:from-image
- 3ca65e0: set refresh token lastActive previously missing

## 0.7.0

### Minor Changes

- 60e313e: database: nullable level and loc for errors

### Patch Changes

- 2df42c5: magic: eslint babel resolver

## 0.6.1

### Patch Changes

- cc14de5: use vercel cli

## 0.6.0

### Minor Changes

- 863ae8b: respect disableAuth flag to prevent race conditions

### Patch Changes

- 2e83057: /api/auth/confirm validates login request secret
- 7393deb: race condition calling `/api/auth/complete`
- Updated dependencies [d486780]
- Updated dependencies [9c4fdc8]
- Updated dependencies [863ae8b]
  - @magusn/react@0.7.0

## 0.5.2

### Patch Changes

- 4a222ab: run eslint directly (next lint requires config to lint all folders)

## 0.5.1

### Patch Changes

- Updated dependencies [abd2120]
  - @magusn/react@0.6.0

## 0.5.0

### Minor Changes

- 195cdb7: server/handler for method check (force POST only)
- 6dbe9b3: rearrange dynamic loading for bundle size
- 5d7968c: @magusn/react/src/styles export for easy migration between css-in-js providers
  - Easily switch between styled-components and @emotion for example
- 7f94483: Use specific folder imports from @magusn/react, e.g. @magusn/react/magic-auth
- 3f5079b: remove styled-jsx reducing bundle size by ~5kb

### Patch Changes

- 75bc5c1: FORCE=true for ignoring eslint in build
- f1eea8a: export babelrc function to mutate babel config for styles
- fd83f3a: vercel geo from headers
- Updated dependencies [f1eea8a]
- Updated dependencies [5d7968c]
- Updated dependencies [7f94483]
- Updated dependencies [3f5079b]
- Updated dependencies [6341346]
- Updated dependencies [c55e93b]
  - @magusn/react@0.5.0

## 0.4.5

### Patch Changes

- eaf1a9b: build(import): name dynamic chunks
- 1c492a5: build: set NODE_ENV for analyze
- 2a5441e: build(deps): move magusn/react deps to peerDeps
- 69c581b: build: remove superfluous analyze scripts
- af388bd: build(deps): rearrange MagicAuth for bundle size
- 05505cd: yarn test:deps:fix + syncpack order
- 1303be8: refactor(styles): move global styles to styled-components
- Updated dependencies [722891a]
- Updated dependencies [2a5441e]
- Updated dependencies [af388bd]
- Updated dependencies [05505cd]
- Updated dependencies [e79b000]
  - @magusn/react@0.4.4

## 0.4.4

### Patch Changes

- use magusn/react eslint
- disable no-console eslint
- resolve eslint errors to run build

## 0.4.3

### Patch Changes

- magic-auth Modal

* Button

- Cleanup MagicAuth API

- Updated dependencies []:
  - @magusn/react@0.4.3

## 0.4.2

### Patch Changes

- MagicAuthProvider + useMagicAuth

- Updated dependencies []:
  - @magusn/react@0.4.2

## 0.4.1

### Patch Changes

- build(eslint): use @magusn/eslint-config-magusn

- Updated dependencies []:
  - @magusn/react@0.4.1
