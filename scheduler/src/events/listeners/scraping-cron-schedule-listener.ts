import {
  Listener,
  ScrapingCronScheduleEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { schedulerQueue } from "../../queues/scheduler-queue";
import { queueGroupName } from "./queue-group-name";

export class ScrapingCronScheduleListener extends Listener<ScrapingCronScheduleEvent> {
  readonly subject: Subjects.ScrapingCronSchedule =
    Subjects.ScrapingCronSchedule;
  queueGroupName = queueGroupName;

  async onMessage(data: ScrapingCronScheduleEvent["data"], msg: Message) {
    console.log("Scheduling scraping cron " + data.scheduleFor + " !");
    await schedulerQueue.add(
      {
        scrapingId: data.scrapingId,
        url: data.url,
        content: data.content,
      },
      {
        repeat: {
          cron: data.scheduleFor,
        },
        jobId: data.scrapingId,
      }
    );

    msg.ack();
  }
}
