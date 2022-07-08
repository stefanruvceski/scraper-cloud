import { Subjects } from "./subjects";
import { ScrapingData } from "./types/scraping-data";
export interface ScraperCreatedEvent {
    subject: Subjects.ScraperCreated;
    data: {
        id: string;
        title: string;
        url: string;
        content: ScrapingData[];
        userId: string;
    };
}
