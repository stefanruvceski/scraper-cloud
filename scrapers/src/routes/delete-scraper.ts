import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Scraper } from "../models/scraper";

const router = express.Router();

router.delete(
  "/api/scrapers/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const scraper = await Scraper.findById(req.params.id);

    if (!scraper) {
      throw new NotFoundError();
    }

    if (scraper.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    scraper.remove();
    await scraper.save();

    res.send(scraper);
  }
);

export { router as deleteScraperRouter };
