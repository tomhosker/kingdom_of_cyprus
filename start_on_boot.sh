#!/bin/sh

### This script is intended for starting the server on startup.
###
### To activate me, run `crontab -e`. Then, in nano, add the following line to
### your cron:
###
###     @reboot sh /full/path/to/this/script

# Constants.
PAUSE=0 # In seconds.
PORT_NUM=4000
PATH_TO_SERVER_DIR=$(dirname $0)

# Let's get cracking...
sleep $PAUSE
cd $PATH_TO_SERVER_DIR
PORT=$PORT_NUM npm run devstart
