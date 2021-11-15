# Github Actions

## database-backup

### Creating new database backup

1. Create a new workflow, e.g. `.github/workflows/database-backup.magic-graphql.iamnoah.com.yml`
1. Be sure to set these `env` variables to unique values for this database backup

    ```yml
    HASURA_HOST: https://magic-graphql.iamnoah.com
    BUCKET_NAME: magic-graphql.iamnoah.com
    HASURA_ADMIN_SECRET: ${{ secrets.HASURA_ADMIN_SECRET_MAGIC_GRAPHQL }}
    ```

1. Now set must setup both the **AWS S3 bucket** and `secrets.HASURA_ADMIN_SECRET_MAGIC_GRAPHQL`
1. https://s3.console.aws.amazon.com/s3/bucket/create?region=us-west-1
1. Enter **Bucket name**, the value of `env.BUCKET_NAME`
1. Leave **Block *all* public access** enabled
1. Enable **Bucket Versioning**
1. Click **Create bucket**
1. https://github.com/magus/next-magic-auth/settings/secrets/actions
1. Click **New repository secret**

    | Name | Value |
    | --- | --- |
    | `HASURA_ADMIN_SECRET_MAGIC_GRAPHQL` | **HASURA_ADMIN_SECRET** |

    **NOTE**: `HASURA_ADMIN_SECRET` is from `.env.local` under a site, e.g. `sites/magic.iamnoah.com/.env.local`

1. https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::155137801733:policy/database-backup$jsonEditor
1. Click **Edit policy**
1. Click **JSON** tab and paste in policy below
1. Add new entries under `"Resource"`

    ```
    "Resource": [
        "arn:aws:s3:::magic-graphql.iamnoah.com",
        "arn:aws:s3:::magic-graphql.iamnoah.com/*"
    ]
    ```

### Creating AWS Policy, Group and User

1. https://console.aws.amazon.com/iamv2/home#/policies
1. Click **Create Policy**
1. Click **JSON** tab and paste in policy below

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "s3:*Object*",
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::magic-graphql.iamnoah.com",
                    "arn:aws:s3:::magic-graphql.iamnoah.com/*"
                ]
            }
        ]
    }
    ```

    **NOTE**: Update the S3 bucket name to match the `BUCKET_NAME` `env` variable in the workflow, e.g. `database-backup.magic-graphql.iamnoah.com.yml`

1. Click **Next: Tags**
1. Click **Next: Review**
1. Enter a **Name**, e.g. `database-backup`
1. Click **Create policy**
1. https://console.aws.amazon.com/iamv2/home#/users
1. Click **Add users**
1. Enter a **User name**, e.g. `database-backup`
1. Select **Access key - Programmatic access** under **Select AWS credential type**
1. Click **Next: Permissions**
1. Click **Create group** under **Add user to group**
1. Enter **Group name**, e.g. `database-backup`
1. Enter the **Policy name** you created above, e.g. `database-backup`
1. Select the checkbox to the left of the matching **Policy name**
1. Click **Create group**
1. Click **Next: Tags**
1. Click **Next: Review**
1. Click **Create user**
1. **IMPORTANT**: Be sure to copy the **Access key ID** and **Secret access key** into **Github > Settings > Secrets**
1. https://github.com/magus/next-magic-auth/settings/secrets/actions
1. Click **New repository secret**

    | Name | Value |
    | --- | --- |
    | `AWS_ACCESS_KEY_ID` | **Access key ID** |
    | `AWS_SECRET_ACCESS_KEY` | **Secret access key** |

1. Click **Close**
