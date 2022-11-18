#!/bin/sh

### This code installs any non-NPM packages used by this repo.

# Local constants.
PACKAGES_TO_INSTALL="sqlitebrowser" # Separate items with spaces.

# Let's get cracking...
sudo apt install $PACKAGES_TO_INSTALL --yes
