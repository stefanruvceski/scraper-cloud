import {
  Publisher,
  Subjects,
  ScrapingStartEvent,
} from "@mistho-scraper/common";

export class ScrapingStartedPublisher extends Publisher<ScrapingStartEvent> {
  subject: Subjects.ScrapingStart = Subjects.ScrapingStart;
}
