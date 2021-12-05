#!/bin/bash

# set -x

echo " "
echo "  ❗️ Dependency geo-from-ip requires MAXMIND_LICENSE_KEY environmental variable"
echo "  💻 Ensure .env.local has the right values then run the commands below"
echo " "
echo "       rm -rf node_modules"


cat $(pwd)/.env.local | while read line
do
  echo "       export $line"
done

echo " "
