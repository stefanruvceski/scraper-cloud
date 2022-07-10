# Scraper Cloud 🚀 
### Start scraping anything with scraper cloud.
Get quality data from any public website with Data Collector, the world's #1 web scraping platform.

public url for demo - https://www.scrapercloud.com/api/

- [Technologies](#Technologies)
- [Usage](#Usage)
- [Local Setup](#local-setup)
- [Architecture](#Architecture)

## Lending Page (WIP) https://www.scrapercloud.com/api/scraping/ 
![image](https://user-images.githubusercontent.com/36955966/178142477-706f41ef-21c6-4a75-ab19-fd11cd3ee672.png)

## Technologies
- NodeJS
- Express
- TypeScript

## Usage
Currently usage of Scraper Cloud 🚀 is only available through our API (you can use Postman for trying it out)

Postman collection for easier usage - [Scraper Cloud requests](https://github.com/stefanruvceski/mitsho-scraper/files/9079129/Scraper.Cloud.requests.postman_collection.json.zip)

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
```js
    const response = {
        "currentUser": {
            "id": "62c8c26ca79a8b00195b2654",
            "email": "test@test.com",
            "iat": 1657449899
        }
    }
```

#### scraper models
- GET /api/scrapers/
```js
    const response = {
        {
            "content": [
                {
                    "name": "Header",
                    "selector": ".header"
                },
                {
                    "name": "Subheader",
                    "selector": ".byline"
                }
            ],
            "title": "IMDB test",
            "url": "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
            "userId": "62c8c26ca79a8b00195b2654",
            "__v": 0,
            "id": "62c96322a9f53600191a15ef"
        },
        {
            "content": [
                {
                    "name": "Header",
                    "selector": ".header"
                },
                {
                    "name": "Subheader",
                    "selector": ".byline"
                }
            ],
            "title": "IMDB test2",
            "url": "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
            "userId": "62c8c26ca79a8b00195b2654",
            "__v": 0,
            "id": "62caadafc059170019968d6c"
        }
    }
```
- GET /api/scrapers/:scraper_id
```js
    const response = {
        "content": [
                {
                    "name": "Header",
                    "selector": ".header"
                },
                {
                    "name": "Subheader",
                    "selector": ".byline"
                }
            ],
        "title": "IMDB test",
        "url": "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
        "userId": "62c8c26ca79a8b00195b2654",
        "__v": 0,
        "id": "62c96322a9f53600191a15ef"
    }
```
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
```js
    const response = {
        "data": [
            {
                "status": "success",
                "content": [
                    {
                        "name": "Header",
                        "selector": ".header",
                        "value": "IMDb Top 250 Movies\n"
                        "status": "success"
                    },
                    {
                        "name": "Subheader",
                        "selector": ".byline",
                        "value": "IMDb Top 250 as rated by regular IMDb voters.",
                        "status": "success"
                    }
                ],
                "scraper": "62caadafc059170019968d6c",
                "__v": 1,
                "id": "62caadbfad3f89001946e321"
            }
        ]
    }
```
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


## Local Setup
### Prerequisites
- docker desktop and kubernetes (mac/windows)
- docker and minikube (linux)
- Skaffold
In root of the repository use command `skaffold dev`

## Architecture
![arch](https://user-images.githubusercontent.com/36955966/178144278-ed2f96c0-fcf5-4ca4-9bd8-4f643f73b900.jpg)


### Micro Services
Every service is instance of docker image deployed into kubernetes cluster on Digital Ocean platform.
CI/CD is implemented through GitHub action workflows. On PR merge into `master` branch, when there are changes in some of the services, associated action is triggered for building and deploying it to Digital Ocean cluster.
- auth service for handling signup/signin/signout and currentUser routes
- scrapers service for handling CRUD operations on scraper model
- scraping sercice for handling start and schedule scraping
- scheduler service for handling cron jobs for triggering scraping on given time schedule
- workers service for handling scraping work 
- NATS streaming service for handling async event based communication between all services
