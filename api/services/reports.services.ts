import { Repository } from "typeorm";
import { ReportInterface, ReportInterfaceOut } from "@/interfaces/report";
import { Report } from "@/entity/Sql/report.entity";
import DataSource from "@/config/NeonDataSource";

class ReportServices {
    private reportRepository: Repository<Report>;

    constructor() {
        this.reportRepository = DataSource.getRepository(Report);
    }
    public async markReportAsAttended(reportId: string, attended: boolean): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id: reportId } });
        if (!report) {
            throw new Error("Report not found");
        }
        report.attended = attended;
        return await this.reportRepository.save(report);
    }

    async createReport(report: ReportInterface, user: {}): Promise<ReportInterfaceOut> {
        const newReport = this.reportRepository.create({ user, ...report });
        return await this.reportRepository.save(newReport);
    }

    async getAllReports():Promise<Report[]> {
        const reports = await this.reportRepository.find()
        return reports
    }

    async getReportsByUser(userId: string): Promise<ReportInterfaceOut[]> {
        return await this.reportRepository.find({
            where: { user: { id: userId } }, 
            relations: ["user"], 
        });
    }
    async deleteReport(reportId: string): Promise<void> {
        await this.reportRepository.delete(reportId);
    }
}

export default ReportServices;
