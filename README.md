# Test Daemon

This is a do-nothing test server in NodeJS to test pulling, installing and running a daemon with SystemD on remote servers.

Something like this install script needs to be present on the Linux Ubuntu AMI.

```shell
#!/bin/bash

curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash-
apt install -y nodejs git build-essential

WRKDIR=/home/server

if [ ! -d "$WRKDIR" ]; then
    mkdir $WRKDIR
fi
cd $WRKDIR

# Pull repo
if [ -d /home/server/test-daemon ] ; then
    rm -rf test-daemon
fi
git clone https://github.com/moosch/test-daemon.git

# Copy systemD service file
cp test-daemon/node-server.service /lib/systemd/system/node-server.service
sudo chown 644 /lib/systemd/system/node-server.service

# Reload systemd daemon
sudo systemctl daemon-reload

# Enable to start on reboot
sudo systemctl enable node-server.service
```

Check the SystemD service logs with `journalctl -u node-server.service`
