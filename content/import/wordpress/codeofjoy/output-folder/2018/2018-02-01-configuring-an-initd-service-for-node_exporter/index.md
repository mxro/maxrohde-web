---
title: "Configuring an initd Service for node_exporter"
date: "2018-02-01"
categories: 
  - "devops"
tags: 
  - "grafana"
  - "linux"
  - "metrics"
  - "prometheus"
---

I recently wrote an article showing how to configure [Prometheus and Grafana for easy metrics collection](http://maxrohde.com/2018/01/23/setting-up-prometheus-and-grafana-for-centos-rhel-7-monitoring/). In that article, I assumed that the system which should be monitored would use the [systemd](https://en.wikipedia.org/wiki/Systemd) approach for defining services.

I now had to set up the [node\_exporter](https://github.com/prometheus/node_exporter) utility on a system which uses the initd approach. Thus, I provide some simple instructions here on how to accomplish that.

- Go to the directory /opt
- [Download the latest version of the node\_exporter executable](https://prometheus.io/download/#node_exporter) suitable for your system.

\[code\]

wget https://github.com/prometheus/node\_exporter/releases/download/v0.15.2/node\_exporter-0.15.2.linux-amd64.tar.gz

\[/code\]

- Extract the archive

\[code\]

tar xvfz node\_exporter-\*.tar.gz

\[/code\]

- Create a link

\[code\]

ln -s node\_exporter-\* node\_exporter

\[/code\]

- Create the file _/opt/node\_exporter/node\_exporter.sh_ and add the following content:

\[code\]

#!/bin/sh

/opt/node\_exporter/node\_exporter --no-collector.diskstats

\[/code\]

- Create the file /etc/init.d/node\_exporter and add the following content ([based on this sample init.d script](https://gist.github.com/naholyr/4275302)):

\[code\]

#!/bin/sh ### BEGIN INIT INFO # Provides: node\_exporter # Required-Start: $local\_fs $network $named $time $syslog # Required-Stop: $local\_fs $network $named $time $syslog # Default-Start: 2 3 4 5 # Default-Stop: 0 1 6 # Description: ### END INIT INFO

SCRIPT=/opt/node\_exporter/node\_exporter.sh RUNAS=root

PIDFILE=/var/run/node\_exporter.pid LOGFILE=/var/log/node\_exporter.log

start() { if \[ -f "$PIDFILE" \] && kill -0 $(cat "$PIDFILE"); then echo 'Service already running' >&2 return 1 fi echo 'Starting service…' >&2 local CMD="$SCRIPT &> \\"$LOGFILE\\" && echo \\$! > $PIDFILE" su -c "$CMD" $RUNAS > "$LOGFILE" echo 'Service started' >&2 }

stop() { if \[ ! -f "$PIDFILE" \] || ! kill -0 $(cat "$PIDFILE"); then echo 'Service not running' >&2 return 1 fi echo 'Stopping service' >&2 kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE" echo 'Service stopped' >&2 }

uninstall() { echo -n "Are you really sure you want to uninstall this service? That cannot be undone. \[yes|No\] " local SURE read SURE if \[ "$SURE" = "yes" \]; then stop rm -f "$PIDFILE" echo "Notice: log file is not be removed: '$LOGFILE'" >&2 update-rc.d -f remove rm -fv "$0" fi }

case "$1" in start) start ;; stop) stop ;; uninstall) uninstall ;; retart) stop start ;; \*) echo "Usage: $0 {start|stop|restart|uninstall}" esac

\[/code\]

**Note 1**: This sample script runs the script as user root. For production environments, it is highly recommended to configure another user (such as 'prometheus') which runs the script.

**Note 2**: Also check out this init.d script made specifically for node\_exporter: [node.exporter.default by eloo](https://gist.github.com/eloo/a06d7c70ff2a841b7bb98cd322b851b9).

- Make both files executable

\[code\]

chmod +x /etc/init.d/node\_exporter

chmod +x _/opt/node\_exporter/node\_exporter.sh_

\[/code\]

- Test the script

\[code\]

/etc/init.d/node\_exporter start

/etc/init.d/node\_exporter stop

\[/code\]

- Enable start with chkconfig

\[code\]

chkconfig --add node\_exporter

\[/code\]

All done! Now you can configure your Prometheus server to grab the metrics from the node\_exporter instance.
