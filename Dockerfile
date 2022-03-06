FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/workstocks-angular /usr/share/nginx/html
EXPOSE 80
