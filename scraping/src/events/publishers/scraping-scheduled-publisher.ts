import {
  Publisher,
  Subjects,
  ScrapingScheduleEvent,
} from "@mistho-scraper/common";

export class ScrapingSchedulePublisher extends Publisher<ScrapingScheduleEvent> {
  subject: Subjects.ScrapingSchedule = Subjects.ScrapingSchedule;
}
