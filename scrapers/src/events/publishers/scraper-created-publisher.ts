import {
  Publisher,
  Subjects,
  ScraperCreatedEvent,
} from "@mistho-scraper/common";

export class ScraperCreatedPublisher extends Publisher<ScraperCreatedEvent> {
  subject: Subjects.ScraperCreated = Subjects.ScraperCreated;
}
