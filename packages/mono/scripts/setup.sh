#!/bin/bash

# set -x

script_dir=$(cd "$(dirname $0)" && pwd)
yarn_bin="$(yarn global bin)/mono"

cat <<EOF > $yarn_bin
#!/bin/sh
# launcher for mono cli

node $script_dir/../src/mono \$@
EOF

chmod +x $yarn_bin

echo " "
echo "  ❗️ Installed \`mono\` globally ($yarn_bin)"
echo "  📝 See $(pwd)/README.md for more details"
echo " "
