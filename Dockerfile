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
