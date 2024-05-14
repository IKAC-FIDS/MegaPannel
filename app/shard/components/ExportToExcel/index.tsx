
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface UserProp {
    id: number;
    name: string;
    role: string;
    team: string;
    status: 'active' | 'paused' | 'vacation';
    age: number;
    avatar: string;
    email: string;
}
interface Props {
    apiData: UserProp[]; // Your data from the API
    fileName: string; // Desired filename for the exported Excel file
}

const ExportToExcel: React.FC<Props> = ({ apiData, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <button onClick={exportToCSV}>Export to Excel</button>
    );
};

export default ExportToExcel;
