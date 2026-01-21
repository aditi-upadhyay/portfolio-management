import * as XLSX from "xlsx";
import { PortfolioData } from "../types/portfolio";

const excelDateToJSDate = (excelDate: number): Date => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + excelDate * msPerDay);
};

export const readExcelFile = async (blob: Blob): Promise<PortfolioData[]> => {
    const buffer = await blob.arrayBuffer();
    const workbook = XLSX.read(buffer, { cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, { range: 5, raw: false });

    return rows.map((row: any): PortfolioData => {
        const dateValue = row["NAV Date"];
        let parsedDate = new Date(); // Default fallback

        if (dateValue instanceof Date) {
            parsedDate = dateValue;
        } else if (typeof dateValue === 'number') {
            parsedDate = excelDateToJSDate(dateValue);
        } else if (typeof dateValue === 'string') {
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
                parsedDate = date;
            } else {
                // Handle DD-MM-YYYY format
                const parts = dateValue.split(/[-\/]/);
                if (parts.length === 3) {
                    parsedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                }
            }
        }

        return {
            date: parsedDate,
            nav: Number(row["NAV (Rs)"] || row["NAV"] || 0)
        };
    })
        .filter((item: PortfolioData) => !isNaN(item.date.getTime()) && !isNaN(item.nav))
        .reverse();
};
