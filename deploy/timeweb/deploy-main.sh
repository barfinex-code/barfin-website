#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -n bash "$0" "$@"
fi

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <40-char git sha>" >&2
  exit 2
fi

SHA="$1"
if [[ ! "$SHA" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Invalid git SHA: $SHA" >&2
  exit 2
fi

ROOT="/srv/barfin-website"
RELEASES="$ROOT/releases"
CURRENT="$ROOT/current"
RUNTIME="$ROOT/runtime"
INCOMING="$RUNTIME/incoming"
RELEASE="$RELEASES/$SHA"
ARCHIVE="$INCOMING/barfin-website-$SHA.tar.gz"
SERVICE="barfin-website.service"
HEALTH_URL="http://127.0.0.1:5108/"

if [[ ! -f "$ARCHIVE" ]]; then
  echo "Release archive not found: $ARCHIVE" >&2
  exit 1
fi

if ! id barfin-web >/dev/null 2>&1; then
  useradd --system --home-dir "$RUNTIME" --shell /usr/sbin/nologin barfin-web
fi

install -d -m 0755 "$ROOT" "$RELEASES"
install -d -o barfin-web -g barfin-web -m 0750 "$RUNTIME"
install -d -o root -g root -m 0750 "$INCOMING"

PREVIOUS=""
if [[ -L "$CURRENT" ]]; then
  PREVIOUS="$(readlink -f "$CURRENT" || true)"
fi

rm -rf "$RELEASE"
mkdir -p "$RELEASE"
tar -xzf "$ARCHIVE" -C "$RELEASE"

cd "$RELEASE"
export npm_config_cache="$RUNTIME/npm-cache"
install -d -o barfin-web -g barfin-web -m 0750 "$npm_config_cache"

node -e 'const [a,b]=process.versions.node.split(".").map(Number); if (a < 22 || (a === 22 && b < 13)) process.exit(1)'
npm ci --include=dev
npm run build
chown -R root:root "$RELEASE"
chmod -R o-w "$RELEASE"

install -m 0644 "$RELEASE/deploy/timeweb/barfin-website.service" "/etc/systemd/system/$SERVICE"
install -m 0644 "$RELEASE/deploy/timeweb/apache-barfin.org.conf" "/etc/apache2/sites-available/barfin.org.conf"
a2enmod proxy proxy_http headers rewrite ssl >/dev/null
a2ensite barfin.org.conf >/dev/null
apache2ctl configtest

rollback() {
  echo "Deployment health check failed; rolling back" >&2
  if [[ -n "$PREVIOUS" && -d "$PREVIOUS" ]]; then
    ln -sfn "$PREVIOUS" "$CURRENT"
    systemctl restart "$SERVICE" || true
  else
    systemctl stop "$SERVICE" || true
  fi
}

ln -sfn "$RELEASE" "$CURRENT"
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null
systemctl restart "$SERVICE"

healthy=0
for _ in $(seq 1 25); do
  if curl -fsS --max-time 5 "$HEALTH_URL" >/dev/null; then
    healthy=1
    break
  fi
  sleep 1
done

if [[ "$healthy" -ne 1 ]]; then
  rollback
  exit 1
fi

systemctl reload apache2
curl -fsS --max-time 10 -H 'Host: barfin.org' http://127.0.0.1/ >/dev/null
rm -f "$ARCHIVE"

mapfile -t old_releases < <(find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +7 | cut -d' ' -f2-)
for old in "${old_releases[@]:-}"; do
  [[ -n "$old" && "$old" != "$RELEASE" && "$old" != "$PREVIOUS" ]] && rm -rf -- "$old"
done

echo "Deployed $SHA successfully"
