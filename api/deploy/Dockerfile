# For more information, please refer to https://aka.ms/vscode-docker-python
FROM ubuntu:22.04

RUN apt update
RUN apt -y upgrade 
RUN apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_19.x > install-node.sh
RUN sh install-node.sh
RUN apt install -y nodejs

# Install the App
WORKDIR /api
COPY ./ /api

RUN cd /api
RUN npm i 
RUN npm run build
#RUN npx prisma migrate dev

CMD node build/src/main-api.js

