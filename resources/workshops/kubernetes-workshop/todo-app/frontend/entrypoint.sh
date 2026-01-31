#!/bin/sh
set -e

echo ">>> ENTRYPOINT STARTED"
echo "NEXT_PUBLIC_API_URL = ${NEXT_PUBLIC_API_URL}"

sed -i "s|%%API_URL%%|${NEXT_PUBLIC_API_URL:-http://localhost:3001}|g" /app/public/config.js

exec npm start