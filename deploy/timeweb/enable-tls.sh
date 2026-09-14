#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -n bash "$0" "$@"
fi

EXPECTED_IP="45.82.14.210"
domains=(-d barfin.org -d www.barfin.org)
for host in barfin.org www.barfin.org; do
  resolved="$(getent ahostsv4 "$host" | awk 'NR == 1 { print $1 }')"
  if [[ "$resolved" != "$EXPECTED_IP" ]]; then
    echo "Warning: the server resolver still caches ${resolved:-nothing} for $host" >&2
  fi
done

command -v certbot >/dev/null
if command -v nginx >/dev/null 2>&1; then
  installer="--nginx"
elif command -v apache2ctl >/dev/null 2>&1; then
  installer="--apache"
else
  echo "No supported reverse proxy found" >&2
  exit 1
fi

certbot "$installer" \
  --non-interactive \
  --agree-tos \
  --redirect \
  --keep-until-expiring \
  --email info@barfin.org \
  "${domains[@]}"

curl -fsS --max-time 20 https://barfin.org/ >/dev/null
curl -fsS --max-time 20 https://www.barfin.org/ >/dev/null
echo "TLS enabled and verified"
