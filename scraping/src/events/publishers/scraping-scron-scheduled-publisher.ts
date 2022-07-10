import {
  Publisher,
  Subjects,
  ScrapingCronScheduleEvent,
} from "@mistho-scraper/common";

export class ScrapingCronSchedulePublisher extends Publisher<ScrapingCronScheduleEvent> {
  subject: Subjects.ScrapingCronSchedule = Subjects.ScrapingCronSchedule;
}
