import { Subjects } from "./subjects";
import { ScrapingData } from "./types/scraping-data";
export interface ScraperUpdatedEvent {
    subject: Subjects.ScraperUpdated;
    data: {
        id: string;
        title: string;
        url: string;
        content: ScrapingData[];
        userId: string;
    };
}
