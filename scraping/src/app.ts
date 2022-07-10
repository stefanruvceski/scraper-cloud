import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@mistho-scraper/common";
import { startScrapingRouter } from "./routes/start-scraping";
import { scheduleEveryScrapingRouter } from "./routes/schedule-every-scraping";
import { showScrapingDataRouter } from "./routes/show-scraping-data";
import { scheduleCronScrapingRouter } from "./routes/schedule-cron-scraping";

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
app.use(scheduleEveryScrapingRouter);
app.use(scheduleCronScrapingRouter);
app.use(showScrapingDataRouter);

app.all("*", async (req, res) => {
  res.sendFile("pages/home.html", { root: __dirname });
});

app.use(errorHandler);

export { app };
