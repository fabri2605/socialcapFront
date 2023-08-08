#!/bin/sh

# will run the Socialcap API in host port 3080 
docker -l debug run -d --restart=always --name scapi \
  --net=host \
  -v /etc/localtime:/etc/localtime:ro \
  socialcap/api:run
