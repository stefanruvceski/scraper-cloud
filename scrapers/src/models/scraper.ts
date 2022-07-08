import { ScrapingData } from "@mistho-scraper/common";
import mongoose from "mongoose";

interface ScraperAttrs {
  title: string;
  url: string;
  userId: string;
  content: ScrapingData[];
}

interface ScraperDoc extends mongoose.Document {
  title: string;
  url: string;
  userId: string;
  content: ScrapingData[];
}

interface ScraperModel extends mongoose.Model<ScraperDoc> {
  build(attrs: ScraperAttrs): ScraperDoc;
}

const scraperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    content: {
      type: Array<ScrapingData>,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

scraperSchema.statics.build = (attrs: ScraperAttrs) => {
  return new Scraper(attrs);
};

const Scraper = mongoose.model<ScraperDoc, ScraperModel>(
  "Scraper",
  scraperSchema
);

export { Scraper };
