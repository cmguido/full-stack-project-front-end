#!/bin/bash

# ID=2 sh scripts/sign-out.sh
# ID=8 sh scripts/sign-out.sh

# API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com/"
# URL_PATH="/delete?id=$ID"
API="${API_ORIGIN:-http://localhost:4741"
URL_PATH="/sign-out/$ID"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
