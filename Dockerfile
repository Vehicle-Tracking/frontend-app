# Angular App ========================================
FROM johnpapa/angular-cli as angular-app
RUN apk update && apk add --no-cache make git

RUN apk update \
   && apk add --update alpine-sdk \
   && apk del alpine-sdk \
   && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
   && npm cache verify \
   && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

# Copy and install the Angular app
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN ng build --prod 

#nginx server =======================================
FROM nginx:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy custom nginx config
COPY ./nginx.conf /usr/src/app
COPY ./nginx.conf /etc/nginx
COPY --from=angular-app /app/dist/vehicle-tracking /usr/src/app
RUN chown -R nginx /usr/src/app
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]


## STEP 1 build static website
##FROM node:alpine as builder
#FROM johnpapa/angular-cli as builder
#RUN apk update && apk add --no-cache make git
#
##Linux setup
#RUN apk update \
#   && apk add --update alpine-sdk \
#   && apk del alpine-sdk \
#   && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
#   && npm cache verify \
#   && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd
#
#
## Install app dependencies
#COPY package.json /app/
#COPY .  /app
#
#WORKDIR /app
#RUN npm install
#RUN npm run build
##RUN ng serve --host 0.0.0.0 --port 18018
#
## STEP 2 build a small nginx image with static website
#FROM nginx:alpine
### Remove default NGINX web files
#RUN rm -rf /usr/share/nginx/html/*
### Copy the dist files to NGINX web folder
#COPY ./dist /usr/share/nginx/html
### Set the permission for NGINX web folder
#RUN chmod 777 -R /usr/share/nginx/html
### Overwrit the default NGINX config using the custom config file
## RUN unlink /etc/nginx/site-enabled/default
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
## COPY ./nginx.conf /etc/nginx/
##COPY ./nginx.conf  /etc/nginx/site-enabled/default
#COPY --from=builder /app/dist /usr/share/nginx/html
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]





