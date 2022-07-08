import { Subjects } from "./subjects";
import { ScrapingData } from "./types/scraping-data";
export interface ScrapingStartEvent {
    subject: Subjects.ScrapingStart;
    data: {
        scrapingId: string;
        url: string;
        content: ScrapingData[];
    };
}
