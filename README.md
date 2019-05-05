# setup



## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [MongoDB](https://www.mongodb.com/download-center)
- [Redis](https://redis.io/download)
- [Google API key](https://developers.google.com/maps/documentation/embed/get-api-key)
- [Postmon](https://www.getpostman.com/downloads/)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### Developing

1. Clone code from git repo and checkout to `dev` branch

2. Create `.env` in root directory by coping `sample.env`

3. Run `npm install` to install server dependencies.

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.
