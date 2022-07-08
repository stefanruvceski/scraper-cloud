import { requireAuth, validateRequest } from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ScraperCreatedPublisher } from "../events/publishers/scraper-created-publisher";
import { Scraper } from "../models/scraper";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/scrapers",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  [body("url").not().isEmpty().withMessage("Url is required")],
  [body("content").not().isEmpty().withMessage("Content is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, url, content } = req.body;
    const scraper = Scraper.build({
      title,
      url,
      content,
      userId: req.currentUser!.id,
    });
    await scraper.save();

    new ScraperCreatedPublisher(natsWrapper.client).publish({
      id: scraper.id,
      title: scraper.title,
      url: scraper.url,
      content: scraper.content,
      userId: scraper.userId,
    });
    res.status(201).send(scraper);
  }
);

export { router as createScraperRouter };
