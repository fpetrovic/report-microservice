import { useState } from 'react';
import { Input } from 'semantic-ui-react';
import { useLoaderData } from 'react-router-dom';
import SectionList from './SectionList';
import reportApi from '../../api/report';
import {Report as iReport} from "../../interfaces/report";

// export const loader: ({ params }: LoaderFunctionParameter) => Promise<iReport> = async ({ params }) => {
// @ts-ignore
export const loader = async ({ params }) => {
  return await reportApi().get(params.reportId);
}

function ReportTemplate() {
  const loadedReport: iReport = useLoaderData() as iReport;
  const [report, setReport] = useState(loadedReport);

  const handleReportChange = (e: any, data: any) => {
    const { name, value } = data;

    setReport((prevReport) => (
      {
        ...prevReport,
        [name]: value,
      }));
  };

  return (
    <div>
      <div className="Report" style={{ padding: '20px' }}>
        <h2>Report Details</h2>
        <p>Report overview details</p>
        <div>
          <Input value={report.name} placeholder="Please, enter the report name" name="name" onChange={handleReportChange} />
          <br />
          <Input value={report.createdAt} name="createdAt" disabled />
        </div>

        <SectionList sections={report.sections} />
      </div>
  </div>
);
}

export default ReportTemplate;
