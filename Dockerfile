FROM centos:centos6

MAINTAINER Stefan Reichert stefan@wickedshell.net


# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release
# Install Node.js and npm
RUN yum install -y nodejs npm
# Install mongo DB
RUN yum install -y mongodb-server

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

# Create Mongo DB directory
RUN mkdir -p mongodb

EXPOSE 3000
EXPOSE 27017

ENTRYPOINT ["usr/bin/mongod", , "--dbpath ./mongoDB", "--rest"]
CMD ["node", "app/app.js"]