# #!/bin/bash
#
# # sh scripts/sign-in-json.sh
#
# # API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com/"
# # URL_PATH="/post"
# API="${API_ORIGIN:-https://murmuring-sierra-58376.herokuapp.com/"
# URL_PATH="/sign-in"
#
# curl "${API}${URL_PATH}" \
#   --include \
#   --request POST \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "'" ${EMAIL}"'",
#       "password": "'"${PASSWORD}"'"
#     }
#   }'
#
# echo
API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/sign-in"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
