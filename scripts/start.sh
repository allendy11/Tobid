#!/bin/bash

cd /home/ubuntu/tobid/server/build
authbind --deep pm2 start index.js