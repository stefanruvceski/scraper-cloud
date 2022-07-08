import {
  BadRequestError,
  Listener,
  ScrapedDataStatus,
  ScrapingFinishedEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { ScrapedData } from "../../models/scraped-data";
import { Scraper } from "../../models/scraper";
import { queueGroupName } from "./queue-group-name";

export class ScrapingFinishedListener extends Listener<ScrapingFinishedEvent> {
  readonly subject = Subjects.ScrapingFinished;
  queueGroupName = queueGroupName;
  async onMessage(data: ScrapingFinishedEvent["data"], msg: Message) {
    const scrapingData = await ScrapedData.findById(data.scrapingId);
    const status = data.content.some(
      (data) => data.status === ScrapedDataStatus.Fail
    )
      ? ScrapedDataStatus.Fail
      : ScrapedDataStatus.Success;

    if (!!scrapingData) {
      scrapingData.set({
        content: data.content,
        status,
      });
      scrapingData.save();
    } else {
      const scraper = await Scraper.findById(data.scrapingId);
      if (!scraper) {
      } else {
        const scrapedData = ScrapedData.build({
          scraper,
          scrapedAt: new Date(),
          content: data.content,
          status,
        });
        await scrapedData.save();
      }
    }
    msg.ack();
  }
}
