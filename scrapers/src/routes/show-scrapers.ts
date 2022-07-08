import { NotFoundError, requireAuth } from "@mistho-scraper/common";
import express, { Request, Response } from "express";
import { Scraper } from "../models/scraper";

const router = express.Router();

router.get(
  "/api/scrapers",
  requireAuth,
  async (req: Request, res: Response) => {
    const tickets = await Scraper.find({
      userId: req.currentUser!.id,
    });

    if (!tickets) {
      throw new NotFoundError();
    }

    res.send(tickets);
  }
);

export { router as showScrapersRouter };
