import { NotFoundError, requireAuth } from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { Scraper } from "../models/scraper";

const router = express.Router();

router.get(
  "/api/scrapers/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Scraper.find({
      _id: req.params.id,
      userId: req.currentUser!.id,
    }).exec();

    if (!ticket) {
      throw new NotFoundError();
    }

    res.send(ticket);
  }
);

export { router as showScraperRouter };
