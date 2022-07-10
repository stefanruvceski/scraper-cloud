import { ScrapingData } from "@mistho-scraper/common";
import Queue from "bull";
import { ScrapingStartPublisher } from "../events/publishers/scraping-start-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
  scrapingId: string;
  url: string;
  content: ScrapingData[];
}

const schedulerQueue = new Queue<Payload>("scraping:start", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

schedulerQueue.process(async (job) => {
  new ScrapingStartPublisher(natsWrapper.client).publish({
    scrapingId: job.data.scrapingId,
    url: job.data.url,
    content: job.data.content,
  });
});

export { schedulerQueue };
