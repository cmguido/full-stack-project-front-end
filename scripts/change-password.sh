#!/bin/bash

# ID=2 sh scripts/sign-out.sh

# API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com/"
# URL_PATH="/patch?id=$ID"
API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/change-password/$ID"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
