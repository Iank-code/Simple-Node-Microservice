FROM node:lts-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"] /usr/src/app/
RUN npm install --production --silent && mv node_modules ../
# COPY . .
COPY . /usr/src/app
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
