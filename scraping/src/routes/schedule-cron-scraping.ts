import {
  NotFoundError,
  requireAuth,
  ScrapingStatus,
  validateRequest,
} from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ScrapingCronSchedulePublisher } from "../events/publishers/scraping-scron-scheduled-publisher";
import { ScrapingStartedPublisher } from "../events/publishers/scraping-started-publisher";
import { ScrapedData } from "../models/scraped-data";
import { Scraper } from "../models/scraper";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/scraping/schedule-cron/:scraper_id",
  requireAuth,
  [
    body("schedule_for")
      .not()
      .isEmpty()
      .withMessage("Schedule for is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { schedule_for } = req.body;
    const scraper = await Scraper.findById(req.params.scraper_id);
    if (!scraper) {
      throw new NotFoundError();
    }
    const scrapedData = ScrapedData.build({
      scraper,
      status: ScrapingStatus.Pending,
    });
    await scrapedData.save();

    new ScrapingStartedPublisher(natsWrapper.client).publish({
      scrapingId: scrapedData.id,
      url: scraper.url,
      content: scraper.content,
    });

    new ScrapingCronSchedulePublisher(natsWrapper.client).publish({
      scrapingId: scraper.id,
      url: scraper.url,
      content: scraper.content,
      scheduleFor: schedule_for,
    });

    res.send({ data: scrapedData });
  }
);

export { router as scheduleCronScrapingRouter };
