import mongoose from "mongoose";
import { ScraperDoc } from "./scraper";
import { ScrapingStatus, ScrapingData } from "@mistho-scraper/common";
interface ScrapedDataAttrs {
  scraper: ScraperDoc;
  status: ScrapingStatus;
  scrapedAt?: Date;
  content?: ScrapingData[];
}

interface ScrapedDataDoc extends mongoose.Document {
  scraper: ScraperDoc;
  status: ScrapingStatus;
  scrapedAt?: Date;
  content?: ScrapingData[];
}

interface ScrapedDataModel extends mongoose.Model<ScrapedDataDoc> {
  build(attrs: ScrapedDataAttrs): ScrapedDataDoc;
}

const scrapedDataSchema = new mongoose.Schema(
  {
    scraper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scraper",
    },
    status: {
      type: String,
      require: true,
      enum: Object.values(ScrapingStatus),
      default: ScrapingStatus.Pending,
    },
    scrapedAt: {
      type: mongoose.Schema.Types.Date,
    },
    content: {
      type: Array<ScrapingData>,
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

scrapedDataSchema.statics.build = (attrs: ScrapedDataAttrs) => {
  return new ScrapedData(attrs);
};

const ScrapedData = mongoose.model<ScrapedDataDoc, ScrapedDataModel>(
  "ScrapedData",
  scrapedDataSchema
);

export { ScrapedData };
