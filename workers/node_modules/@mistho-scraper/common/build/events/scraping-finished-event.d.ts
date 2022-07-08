import { Subjects } from "./subjects";
import { ScrapingData } from "./types/scraping-data";
export interface ScrapingFinishedEvent {
    subject: Subjects.ScrapingFinished;
    data: {
        scrapingId: string;
        content: ScrapingData[];
    };
}
