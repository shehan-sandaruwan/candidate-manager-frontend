FROM node:8
ARG NPM_TOKEN  
WORKDIR /app
COPY .npmrc .npmrc
COPY package.json /app
RUN npm install
COPY . /app
RUN rm -f .npmrc
EXPOSE 8080
ENV HTTPS false
CMD [ "npm", "start" ]

#fc73593e-c334-4048-9db7-b9b3c9fc2e0e
#ucsc@15SH./com     
