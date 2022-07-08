import {
  Listener,
  ScraperCreatedEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { Scraper } from "../../models/scraper";
import { queueGroupName } from "./queue-group-name";

export class ScraperCreatedListener extends Listener<ScraperCreatedEvent> {
  readonly subject = Subjects.ScraperCreated;
  queueGroupName = queueGroupName;
  onMessage(data: ScraperCreatedEvent["data"], msg: Message) {
    msg.ack();
    try {
      const scraper = Scraper.build({ ...data, _id: data.id });
      const save = async () => {
        await scraper.save();
      };
      save();
    } catch (err) {
      console.log(err);
    }
  }
}
