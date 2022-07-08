import { ScrapedDataStatus } from "./order-status";
export interface ScrapingData {
    name: string;
    selector: string;
    status?: ScrapedDataStatus;
    value?: string;
}
