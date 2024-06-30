# Github Actions

## database-backup

### Setting up workflow and secrets

1. Create a new workflow, e.g. `.github/workflows/magic.iamnoah.com.yml`
1. Be sure to set these `env` variables to unique values for this database backup

   ```yml
   AWS_S3_BUCKET_NAME: magic.iamnoah.com
   HASURA_HOST: https://magic-graphql.iamnoah.com
   HASURA_ADMIN_SECRET: ${{ secrets.HASURA_ADMIN_SECRET }}
   ```

1. https://github.com/magus/mono/settings/secrets/actions
1. Click **New repository secret** and add `HASURA_ADMIN_SECRET`

   **NOTE**: `HASURA_ADMIN_SECRET` is from `.env.local` under a site, e.g. `sites/magic.iamnoah.com/.env.local`

### Setup root ssh access for github action

Generate a new ssh key for accessing DigitalOcean droplet from github action

1. SSH into host running database

   ```bash
   ssh root@12.123.123.123
   ```

1. Generate new SSH key

   ```bash
   ssh-keygen -t ed25519
   Generating public/private ed25519 key pair.
   Enter file in which to save the key (/Users/noah/.ssh/id_ed25519): ./hasura-backup-github-action
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   Your identification has been saved in ./hasura-backup-github-action
   Your public key has been saved in ./hasura-backup-github-action.pub
   ```

1. Allow the generated SSH key to access droplet **[Manually from the Droplet without Password-Based Access](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-existing-droplet/#manually)**

   ```bash
   cat hasura-backup-github-action.pub >> ~/.ssh/authorized_keys
   ```

1. Get ssh private key secret (copy entire string including the BEGIN and END lines)

   ```bash
   cat hasura-backup-github-action
   -----BEGIN OPENSSH PRIVATE KEY-----
   ...
   -----END OPENSSH PRIVATE KEY-----
   ```

1. https://github.com/magus/mono/settings/secrets/actions
1. Click **New repository secret** and add `HASURA_SSH_PRIVATE_KEY`

1. Get `HASURA_DATABASE_URL` value

   ```bash
   dokku config:get hasura HASURA_GRAPHQL_DATABASE_URL
   ```

1. Test `pg_dump` command to ensure remote `pg_dump` works correctly

   ```bash
   dokku run hasura /bin/sh
   # pg_dump postgres://postgres:P@55w0rd@dokku-postgres-hasura-db:5432/hasura_db --no-owner --no-acl --data-only --schema public -f data.sql
   # ls -lsah data.sql
   ```

1. https://github.com/magus/mono/settings/secrets/actions
1. Click **New repository secret** and add `HASURA_DATABASE_URL` (e.g. `postgres://postgres:P@55w0rd@dokku-postgres-hasura-db:5432/hasura_db`)
1. Click **New repository secret** and add `HASURA_SSH_HOST` (e.g. `104.236.34.97`)
1. Click **New repository secret** and add `HASURA_SSH_USER` (e.g. `root`)

### Creating new S3 bucket for database backup

1. Now set must setup both the **AWS S3 bucket** and `secrets.HASURA_ADMIN_SECRET`
1. https://s3.console.aws.amazon.com/s3/bucket/create?region=us-west-1
1. Enter **Bucket name**, the value of `env.AWS_S3_BUCKET_NAME`
1. Leave **ACLs disabled** selected
1. Leave **Block _all_ public access** selected
1. Enable **Bucket Versioning**
1. Leave **Server-side encryption with Amazon S3 managed keys (SSE-S3)** selected
1. Click **Create bucket**
1. https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::155137801733:policy/database-backup$jsonEditor
1. Click **Edit policy**
1. Click **JSON** tab and paste in policy below
1. Add new entries under `"Resource"` with the `AWS_S3_BUCKET_NAME` bucket name

   ```
   "Resource": [
       "arn:aws:s3:::magic.iamnoah.com",
       "arn:aws:s3:::magic.iamnoah.com/*"
   ]
   ```

### Creating a new AWS Policy, Group and User

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
         "Action": ["s3:*Object*", "s3:ListBucket"],
         "Resource": ["arn:aws:s3:::magic.iamnoah.com", "arn:aws:s3:::magic.iamnoah.com/*"]
       }
     ]
   }
   ```

   **NOTE**: Update the S3 bucket name to match the `AWS_S3_BUCKET_NAME` `env` variable in the workflow, e.g. `retrolink-hasura.iamnoah.com`

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
1. https://github.com/magus/mono/settings/secrets/actions
1. Click **New repository secret**

   | Name                    | Value                 |
   | ----------------------- | --------------------- |
   | `AWS_ACCESS_KEY_ID`     | **Access key ID**     |
   | `AWS_SECRET_ACCESS_KEY` | **Secret access key** |

1. Click **Close**
