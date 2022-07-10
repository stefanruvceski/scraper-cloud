import {
  Publisher,
  Subjects,
  ScrapingEveryScheduleEvent,
} from "@mistho-scraper/common";

export class ScrapingEverySchedulePublisher extends Publisher<ScrapingEveryScheduleEvent> {
  subject: Subjects.ScrapingEverySchedule = Subjects.ScrapingEverySchedule;
}
