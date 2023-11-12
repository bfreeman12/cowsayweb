#!/bin/bash
git pull
cd ./client && npm run build
sudo rm -rf /var/www/dist && sudo cp -r dist /var/www
cd .. && sudo rm -rf /usr/local/bin/server && sudo cp -r server /usr/local/bin
sudo systemctl restart cowsay-server.service