FROM centos:centos6

MAINTAINER Stefan Reichert stefan@wickedshell.net


# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release
# Install Node.js and npm
RUN yum install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE 3000

ENV NODE_ENV docker
CMD ["node", "/src/app/app.js"]