# Scraper Cloud 🚀 
### Start scraping anything with scraper cloud.
Get quality data from any public website with Data Collector, the world's #1 web scraping platform.

public url for demo - https://www.scrapercloud.com/api/

[Technologies](#Technologies)
[Lending Page (WIP)](#Lending Page (WIP))
[Architecture](#Architecture)

## Technologies
- NodeJS
- Express
- TypeScript

## Usage
### API routes
#### auth 
- POST /api/users/signup
```js
    const body = {
        "email" : "test@test.com",
        "password" : "test"
    }
```
- POST /api/users/signin
```js
    const body = {
        "email" : "test@test.com",
        "password" : "test"
    }
```
- POST /api/users/signout
- GET /api/users/currentUser

#### scraper models
- GET /api/scrapers/
- GET /api/scrapers/:scraper_id
- POST /api/scrapers/
```js
    const body = {
        "title": "IMDB test",
        "url": "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
        "content":[
            {
                "name": "Header",
                "selector": ".header"
            },
            {
                "name": "Subheader",
                "selector": ".byline"
            }
    }
```
- PUT /api/scrapers/:scraper_id
```js
    const body = {
        "title": "IMDB test",
        "url": "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
        "content":[
            {
                "name": "Header",
                "selector": ".header"
            },
            {
                "name": "Subheader",
                "selector": ".byline"
            }
    }
```

#### scraping
- POST /api/scraping/start/:scraper_id
- GET /api/scraping/:scraper_id
- POST /api/scraping/schedule/every/:scraper_id
```js
    const body = {
        // Fire every 3 minutes
        "schedule_for": 3,
    }
```
- POST /api/scraping/schedule/cron/:scraper_id
```js
    const body = {
        // Fire at 12:00 PM (noon) every day
        "schedule_for": "0 0 12 * * ?",
    }
```

## Lending Page (WIP)
![image](https://user-images.githubusercontent.com/36955966/178142477-706f41ef-21c6-4a75-ab19-fd11cd3ee672.png)


## Architecture
![Untitled Diagram-3](https://user-images.githubusercontent.com/36955966/178142394-b5686e94-7956-406a-aede-3ad90c79fa67.jpg)
