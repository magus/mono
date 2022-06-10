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
