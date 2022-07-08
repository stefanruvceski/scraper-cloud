import request from "supertest";
import { app } from "../../app";
import { Scraper } from "../../models/scraper";

it("has a route handler listening to /api/scrapers for post requests", async () => {
  const response = await request(app).post("/api/scrapers").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/scrapers").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({
      title: "asldkjf",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({
      title: "laskdfj",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let scrapers = await Scraper.find({});
  expect(scrapers.length).toEqual(0);

  const title = "asldkfj";

  await request(app)
    .post("/api/scrapers")
    .set("Cookie", await global.signin())
    .send({
      title,
      content: {},
    })
    .expect(201);

  scrapers = await Scraper.find({});
  expect(scrapers.length).toEqual(1);
  expect(scrapers[0].content).toEqual({});
  expect(scrapers[0].title).toEqual(title);
});
