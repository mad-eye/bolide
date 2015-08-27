FROM node:0.10.40
MAINTAINER Mike Risse

## make sure to git submodule --init --recursive the repor first

EXPOSE 3003
RUN apt-get update
ADD .madeye-common/package.json /app/.madeye-common/package.json
ADD package.json /app/package.json
RUN cd /app/.madeye-common && npm install
RUN cd /app && npm install

ADD . app

CMD node app/app.js
