# Timeweb production deployment

The site runs as `barfin-website.service` on loopback port `5108`. The deploy
auto-detects Nginx or Apache and routes only `barfin.org` and `www.barfin.org`
to this service.
Releases are atomic symlinks under `/srv/barfin-website`.

`deploy-main.sh` installs the isolated service and HTTP virtual host. After both
DNS A records resolve to `45.82.14.210`, run `enable-tls.sh` once to issue and
verify the Let's Encrypt certificate.
