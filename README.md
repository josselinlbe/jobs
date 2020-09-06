<p align="center">
  <img width="20%" src="./public/icon.png" alt="maouh">
</p>

<h2 align="center">
  Jobs
</h2>

<p align="center">
  A simple electron app to find jobs in a region.
</p>

Demo:
- [Netlify](https://objective-golick-82597b.netlify.app)
- [Youtube](https://www.youtube.com/watch?v=OwuVWcynFQ8)

## Contribute

Prerequisites
* Have [Node.js](https://nodejs.org/en/)
* Have [Yarn](https://yarnpkg.com/en/)

## Install
1. Clone the repository
```sh
$ git clone https://github.com/josselinlbe/jobs.git
```
2. Create a new branch (i.e: feat-new-feature).

3. Install dependencies :
```sh
$ cd jobs && yarn
```

## Run Puppeteer
In the current folder :
```sh
$ node linkedin_fulltime_scraper.js && node linkedin_intern_scraper.js
```

## Run the app
Browser :
```sh
$ yarn serve
```

Electron :
```sh
$ yarn electron:serve
```
