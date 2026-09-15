# Timeweb production deployment

The site runs as `barfin-website.service` on loopback port `5108`. The deploy
auto-detects Nginx or Apache and routes only `barfin.org` and `www.barfin.org`
to this service.
Releases are atomic symlinks under `/srv/barfin-website`.
The contact route reads `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from the
separately provisioned root-owned `/etc/barfin/website.env` file.
The file is optional for serving the website; without it, contact submissions
return `503` until the Telegram secrets are provisioned.

Pushes to `main` are deployed automatically by
`.github/workflows/deploy-production.yml`. Configure the GitHub `production`
environment with these values:

- Variables: `PROD_HOST`, `PROD_PORT`, `PROD_USER`.
- Secrets: `PROD_SSH_PRIVATE_KEY`, `PROD_SSH_KNOWN_HOSTS`.

The SSH user must be able to run the commands used by `deploy-main.sh` through
passwordless `sudo`. Pin the server host key in `PROD_SSH_KNOWN_HOSTS`; do not
use `StrictHostKeyChecking=no`.

`deploy-main.sh` installs the isolated service and HTTP virtual host. After both
DNS A records resolve to `45.82.14.210`, run `enable-tls.sh` once to issue and
verify the Let's Encrypt certificate.
