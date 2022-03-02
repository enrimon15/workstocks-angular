FROM nginx:alpine
COPY dist/workstocks-angular /usr/share/nginx/html
EXPOSE 80
