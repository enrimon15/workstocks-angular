# docker initialization
docker-compose down
docker images rm -f workstocks-angular-image

# build stage
npm run build-prod # ng build --configuration=production

# deploy stage
docker-compose up -d
