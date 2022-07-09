import {
  Listener,
  ScrapingScheduleEvent,
  Subjects,
} from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { schedulerQueue } from "../../queues/scheduler-queue";
import { queueGroupName } from "./queue-group-name";

const DEFAULT_REPEAT_IN_MINUTES = 5;

export class ScrapingScheduleListener extends Listener<ScrapingScheduleEvent> {
  readonly subject: Subjects.ScrapingSchedule = Subjects.ScrapingSchedule;
  queueGroupName = queueGroupName;

  async onMessage(data: ScrapingScheduleEvent["data"], msg: Message) {
    console.log("Scheduling for every " + data.scheduleFor + " minutes!");
    const job = await schedulerQueue.add(
      {
        scrapingId: data.scrapingId,
        url: data.url,
        content: data.content,
      },
      {
        repeat: {
          every:
            (Number.parseInt(data.scheduleFor) || DEFAULT_REPEAT_IN_MINUTES) *
            60 *
            1000,
        },
      }
    );

    msg.ack();
  }
}
