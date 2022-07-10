import {
  Listener,
  ScrapingEveryScheduleEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { schedulerQueue } from "../../queues/scheduler-queue";
import { queueGroupName } from "./queue-group-name";

export class ScrapingEveryScheduleListener extends Listener<ScrapingEveryScheduleEvent> {
  readonly subject: Subjects.ScrapingEverySchedule =
    Subjects.ScrapingEverySchedule;
  queueGroupName = queueGroupName;

  async onMessage(data: ScrapingEveryScheduleEvent["data"], msg: Message) {
    console.log("Scheduling for every " + data.scheduleFor + " minutes!");
    await schedulerQueue.add(
      {
        scrapingId: data.scrapingId,
        url: data.url,
        content: data.content,
      },
      {
        repeat: {
          every: data.scheduleFor * 60 * 1000,
        },
        jobId: data.scrapingId,
      }
    );

    msg.ack();
  }
}
