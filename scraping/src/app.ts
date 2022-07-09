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
import path from "path";

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
  // console.log("/pages/home.html", { root: __dirname });
  // res.send("test");
  res.sendFile("pages/home.html", { root: __dirname });
  // throw new NotFoundError();
});

app.use(errorHandler);

export { app };
