#!/bin/sh

# stop and remove previous container
docker rm $(docker stop scapui)

# will run the Socialcap API in host port 3080 
# --user $(id -u www-data):$(id -g www-data) \
# --env USER=www-data \
# --env GROUP=www-data \
# --env UID=$(id -u www-data) \
# --env GID=$(id -g www-data) \
docker -l debug run -it -d --restart=always --name scapui \
  --net=host \
  -v /etc/localtime:/etc/localtime:ro \
  socialcap/ui:run
