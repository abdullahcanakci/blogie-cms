# Blogie

(Subject to Change)

## A minimal NextJS CMS

A CMS for yesteryear.

Minimal article focused CMS for headless sites. Build on Nextjs and powered by serverless functions.

My aim was to create a blog with nextjs and needed a way to enter new articles for non-techie people. Which turned into why should not I split them so they would be minimaly and self contained and each part can be changed freely.

Article storage was mainly inspired by wordpress and unlike it's name it will handle more than articles so frontend can fetch any abstract data format they like.
Like blog posts, employee lists, featured items etc.

Data will be stored on MongoDB and media will be transferred into S3 compatible handlers this way project will be trully serverless and can be hosted on Vercel or other provider who provide building lambda function from api routes or might look into raw lamdda functions.


## Roadmap

### CMS

- [ ] Articles List
  - [X] Listing
  - [ ] Pagination
  - [ ] Filtering
  - [ ] Tag System
- [ ] Article View
  - [ ] Article View
  - [ ] Related Articles
  - [ ] Tags
  - [ ] Comments
- [ ] Draft System
- [x] Insert/Update
- [x] Auth
  - [x] Login
  - [x] Register
- [ ] Deployment trigger

### Related

- [ ] Dark theme

### To Use

Copy `.env.example`file to `.env` and update information.

Run either one in order.

```bash
yarn install
yarn dev
```

```bash
npm install
npm run dev
```
