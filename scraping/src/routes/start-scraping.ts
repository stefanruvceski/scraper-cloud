import {
  NotFoundError,
  requireAuth,
  ScrapingStatus,
} from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { ScrapingStartedPublisher } from "../events/publishers/scraping-started-publisher";
import { ScrapedData } from "../models/scraped-data";
import { Scraper } from "../models/scraper";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/scraping/start/:scraper_id",
  requireAuth,
  async (req: Request, res: Response) => {
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

    res.send({ data: scrapedData });
  }
);

export { router as startScrapingRouter };
