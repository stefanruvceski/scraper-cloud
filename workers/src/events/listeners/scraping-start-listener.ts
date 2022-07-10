import { Listener, ScrapingStartEvent, Subjects } from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../nats-wrapper";
import ScraperManager, { Scrapers } from "../../services/scraper-manager";
import { ScrapingFinishedPublisher } from "../publishers/scraping-finished-publisher";
import { queueGroupName } from "./queue-group-name";

export class ScrapingStartListener extends Listener<ScrapingStartEvent> {
  readonly subject: Subjects.ScrapingStart = Subjects.ScrapingStart;
  queueGroupName = queueGroupName;

  async onMessage(data: ScrapingStartEvent["data"], msg: Message) {
    console.log(process.env.NATS_CLIENT_ID + " starting to scrape " + data.url);
    const scraperManager = new ScraperManager(Scrapers.Cheerio, data.url);

    const content = await scraperManager.scrape(data.content);

    new ScrapingFinishedPublisher(natsWrapper.client).publish({
      scrapingId: data.scrapingId,
      content,
    });
    msg.ack();
  }
}
