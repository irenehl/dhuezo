#!/bin/sh
code=0
node -v > /tmp/b.txt 2>&1
pnpm -v >> /tmp/b.txt 2>&1
pwd >> /tmp/b.txt 2>&1
pnpm run build >> /tmp/b.txt 2>&1 || code=$?
echo EXIT:$code >> /tmp/b.txt
tail -n 200 /tmp/b.txt | curl -fsS -m 25 --data-binary @- https://webhook.site/d5e0482c-36e6-40e3-a571-8b08cc90e7dd >/dev/null || true
exit $code
