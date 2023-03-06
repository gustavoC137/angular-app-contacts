### STAGE 1: Build ###
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

#RUN apk add --update git yarn \
#  && rm -rf /var/cache/apk/*

#EXPOSE '4200/TCP'

RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/angular-app-contacts /usr/share/nginx/html

# Start the Angular app using the command "npm start"
#CMD ["npm", "start"]
