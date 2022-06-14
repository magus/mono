# Solutions

## 400 error on `/api/auth/complete`

Seems like some sort of race condition when calling API endpoint. We call this from `CheckEmailModal` and it was using an `React.useEffect(async () => {})` which is flagged by `eslint` and mentions race conditions since effects should be synchronous. Maybe the source of the error? Refactored it to be a normal synchronous function that kicks off the `auth.actions.completeLogin` (which is an `async function`).

```
[
    {
        "extensions": {
            "path": "$.selectionSet.insert_refreshToken.args.objects",
            "code": "constraint-violation"
        },
        "message": "Uniqueness violation. duplicate key value violates unique constraint \"refreshToken_id_key\""
    }
]
```


Upon further investigation the reproduction seems to be that the `/auth/complete` page incorrectly loads the entire auth stack. This causes an api request to `/api/auth/refresh` which tells the client the login token is approved (`json.loginRequestApproved`) and so the page calls `/api/auth/complete` which writes the refresh token to the database and the client side cookie. This completes the entire login BEFORE it ever has a chance to finish on the `CheckEmailModal` window. That's the race!

This is esecially tricky to reproduce because the `/api/auth/complete` was being called in the `/auth/complete` page which we were ignoring. We assumed (incorrectly) that the error would always happen in the original login request tab, but it was a race between these two pages that often failed on the complete page not the login request page, so we missed it!

You also must request the login (start) and also access the email to click complete button/url via the SAME BROWSER browser and also the SAME HOSTNAME (e.g. `magic.iamnoah.com`). When debugging locally the emails (generated via Hasura event hook in production), send emails to `https://magic.iamnoah.com/api/auth/confirm?id=879...` but you would initiate the login via `http://localhost:3000`, hence a mismatch, so the bug would never repro since `https://magic.iamnoah.com/api/auth/confirm?id=879...` would not have any pending login to refresh and complete, so it'd only finish in the `http://localhost:3000` tab.

> How can we preventing this mismatch in production and local development behavior?

We could invest in running locally via `https://localhost.magic.iamnoah.com` or something like that so that it writes to the same domain.
