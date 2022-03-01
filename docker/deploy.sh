# build stage
cd ..
npm run build-prod # ng build --configuration=production

# deploy stage
cd ./docker
docker build -t workstocks-angular .
docker run -d -p 80:80 workstocks-angular
