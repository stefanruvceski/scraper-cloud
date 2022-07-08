import { Subjects } from "./subjects";
import { ScrapingData } from "./types/scraping-data";
export interface ScrapingScheduleEvent {
    subject: Subjects.ScrapingSchedule;
    data: {
        scrapingId: string;
        scheduleFor: string;
        url: string;
        content: ScrapingData[];
    };
}
