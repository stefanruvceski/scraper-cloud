import {
  Publisher,
  ScrapingFinishedEvent,
  Subjects,
} from "@mistho-scraper/common";

export class ScrapingFinishedPublisher extends Publisher<ScrapingFinishedEvent> {
  subject: Subjects.ScrapingFinished = Subjects.ScrapingFinished;
}
