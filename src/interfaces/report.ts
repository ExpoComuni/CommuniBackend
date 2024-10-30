import { ReportType } from "../enum/reportType";

export interface ReportInterface {
    id: string;
    title: string;
    description: string;
    location: string;
    image: string;
    reportType: ReportType
    attended: boolean
}
export interface ReportInterfaceOut {
    id: string;
    title: string;
    description: string;
    location: string;
    image: string;
    reportType: ReportType,
    attended: boolean
    user: {}   
}