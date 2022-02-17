FROM cypress/base:12

copy . .

RUN npm install
RUN npm run build:and:test