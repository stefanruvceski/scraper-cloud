import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@mistho-scraper/common";
import { startScrapingRouter } from "./routes/start-scraping";
import { scheduleScrapingRouter } from "./routes/schedule-scraping";
import { showScrapingDataRouter } from "./routes/show-scraping-data";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(startScrapingRouter);
app.use(scheduleScrapingRouter);
app.use(showScrapingDataRouter);
// TODO Route for killing scheduled scraping

app.all("*", async (req, res) => {
  res.send("<h1>Scraper Cloud</h1>");
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
