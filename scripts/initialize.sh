#!/bin/bash

cd /home/ubuntu/tobid/server/build

sudo apt-get update
sudo apt-get install npm -y
sudo npm install
sudo npm install pm2@latest -g
sudo apt-get install authbind
# sudo touch /etc/authbind/byport/80
# sudo chown ubuntu /etc/authbind/byport/80
# sudo chmod 755 /etc/authbind/byport/80