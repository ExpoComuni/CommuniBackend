import { Router, Request, Response } from "express";
import ReportServices from "../services/reports.services";
import { ReportInterface } from "../interfaces/report";
import UserService from "../services/user.services";

const router = Router();
const reportServices = new ReportServices();
const userService = new UserService();


router.get("/", async (req:Request, res:Response) => {
    try {
        const reports = await reportServices.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reports', error });
    }
})

router.get('/getAll/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const reports = await reportServices.getReportsByUser(userId);
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reports', error });
    }
});

router.put("/markAsAttended/:reportId", async (req: Request, res: Response) => {
    try {
        const { reportId } = req.params;  // Boolean value expected in request body
        const updatedReport = await reportServices.markReportAsAttended(reportId, true);
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error marking report as attended", error });
    }
});

router.post('/create/:userId', async (req: Request, res: Response) => {
    try {
        const report: ReportInterface = req.body;
        const { userId } = req.params
        const user = await userService.getUserById(userId)
        const newReport = await reportServices.createReport(report, user);
        res.status(201).json(newReport);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating report', error });
    }
});

router.delete('/delete/:reportId', async (req: Request, res: Response) => {
    try {
        const { reportId } = req.params;
        await reportServices.deleteReport(reportId);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting report', error });
    }
});


export default router;
