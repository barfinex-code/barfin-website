#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -n bash "$0" "$@"
fi

EXPECTED_IP="45.82.14.210"
for host in barfin.org www.barfin.org; do
  resolved="$(getent ahostsv4 "$host" | awk 'NR == 1 { print $1 }')"
  if [[ "$resolved" != "$EXPECTED_IP" ]]; then
    echo "$host resolves to ${resolved:-nothing}, expected $EXPECTED_IP" >&2
    exit 1
  fi
done

command -v certbot >/dev/null
certbot --apache \
  --non-interactive \
  --agree-tos \
  --redirect \
  --keep-until-expiring \
  --email info@barfin.org \
  -d barfin.org \
  -d www.barfin.org

curl -fsS --max-time 20 https://barfin.org/ >/dev/null
curl -fsS --max-time 20 https://www.barfin.org/ >/dev/null
echo "TLS enabled and verified"
