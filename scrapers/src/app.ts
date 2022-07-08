import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@mistho-scraper/common";
import { createScraperRouter } from "./routes/create-scraper";
import { showScraperRouter } from "./routes/show-scraper";
import { showScrapersRouter } from "./routes/show-scrapers";
import { updateScraperRouter } from "./routes/update-scraper";

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
app.use(updateScraperRouter);
app.use(showScrapersRouter);
app.use(createScraperRouter);
app.use(showScraperRouter);

app.all("*", async (req, res) => {
  res.send("<h1>Scraper Cloud</h1>");
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
