FROM centos:7
MAINTAINER Brian Ogden
 
# Not currently being used but may come in handy
ARG ENVIRONMENT
ENV NODE_VERSION 6.11.1
 
RUN yum -y update && \
    yum clean all && \
    yum -y install http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm \
    yum -y makecache && \
    yum -y install nginx-1.12.0 wget
 
# Cleanup some default NGINX configuration files we don’t need
RUN rm /etc/nginx/conf.d/default.conf
 
#############################################
# NodeJs Install
#############################################

#Download NodeJs package
RUN wget -q -O - https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz \
    | tar --strip-components=1 -xzf - -C /usr/local

# https://stackoverflow.com/a/35774741/1258525
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app/
 
WORKDIR /app
COPY . /app
 
RUN npm run build-$ENVIRONMENT
 
RUN cd /app && cp -a dist/* /usr/share/nginx/html
COPY ./docker/conf/frontend.conf /etc/nginx/conf.d/frontend.conf
COPY ./docker/conf/nginx.conf /etc/nginx/nginx.conf
 
 
CMD ["nginx"]