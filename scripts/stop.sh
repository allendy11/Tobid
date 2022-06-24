#!/bin/bash

cd /home/ubuntu/tobid/server/build
sudo pm2 stop index.js 2> /dev/null || true
sudo pm2 delete index.js 2> /dev/null || true