import {
  Listener,
  ScrapedDataStatus,
  ScrapingData,
  ScrapingStartEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import axios from "axios";
import { load } from "cheerio";
import { ScrapingFinishedPublisher } from "../publishers/scraping-finished-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ScrapingStartListener extends Listener<ScrapingStartEvent> {
  readonly subject: Subjects.ScrapingStart = Subjects.ScrapingStart;
  queueGroupName = "scraping-service";

  async onMessage(data: ScrapingStartEvent["data"], msg: Message) {
    console.log(process.env.NATS_CLIENT_ID + " STARTING TO SCRAPE " + data.url);

    const { data: htmlData } = await axios.get(data.url);
    const $ = load(htmlData);
    let status = ScrapedDataStatus.Success;
    const content = data.content.map((obj: ScrapingData) => {
      const value =
        $(obj.selector)?.text() || "error caused by " + obj.selector;
      if (value.includes("error")) status = ScrapedDataStatus.Fail;
      return {
        ...obj,
        value,
        status,
      } as ScrapingData;
    });

    new ScrapingFinishedPublisher(natsWrapper.client).publish({
      scrapingId: data.scrapingId,
      content,
    });
    msg.ack();
  }
}
