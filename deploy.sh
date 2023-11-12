#!/bin/bash
git pull
cd ./client && npm run build
rm -rf /var/www/dist && cp -r dist /var/www
cd .. && rm -rf /usr/local/bin/server && cp -r server /usr/local/bin
systemctl restart cowsay-server.service