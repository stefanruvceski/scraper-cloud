import {
  Publisher,
  ScrapingStartEvent,
  Subjects,
} from "@mistho-scraper/common";

export class ScrapingStartPublisher extends Publisher<ScrapingStartEvent> {
  subject: Subjects.ScrapingStart = Subjects.ScrapingStart;
}
