# #!/bin/bash
#
# # sh scripts/sign-up-json.sh
#
# # API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com/"
# # URL_PATH="/post"
# API="${API_ORIGIN:-https://murmuring-sierra-58376.herokuapp.com/"
# URL_PATH="/sign-up"
#
# curl "${API}${URL_PATH}" \
#   --include \
#   --request POST \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "'" ${EMAIL}"'",
#       "password": "'"${PASSWORD}"'",
#         "password_confirmation": "'"${PASSWORD_CONFIRMATION}"'"
#     }
#   }'
#
# echo
API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/sign-up"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
