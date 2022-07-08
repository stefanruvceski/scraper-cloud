import {
  NotFoundError,
  requireAuth,
  ScrapedDataStatus,
} from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { ScrapingStartedPublisher } from "../events/publishers/scraping-started-publisher";
import { ScrapedData } from "../models/scraped-data";
import { Scraper } from "../models/scraper";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.get(
  "/api/scraping/:scraper_id",
  requireAuth,
  async (req: Request, res: Response) => {
    const scraper = await Scraper.findById(req.params.scraper_id);
    if (!scraper) {
      throw new NotFoundError();
    }
    const scrapedData = await ScrapedData.find({
      scraper,
    });

    res.send({ data: scrapedData });
  }
);

export { router as showScrapingDataRouter };
