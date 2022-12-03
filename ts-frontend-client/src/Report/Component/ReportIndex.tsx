import React, {useState} from 'react';
import {Button, Icon, Input, Menu, Table, Dropdown} from 'semantic-ui-react';
import {Link, useLoaderData} from 'react-router-dom';
import {Report} from "../../interfaces/report";
import {ReportApiFactory, ReportTemplateApiFactory} from "../../api-ts/api/typescript-axios";
import {ReportField} from "../../interfaces/reportfield";
import ReportFormModal from './ReportFormModal'


export async function loader() {
  const result = await ReportApiFactory().apiReportsGetCollection();
  return result.data['hydra:member']
}

export async function reportTemplateLoader() {
  const result = await ReportTemplateApiFactory().apiReportTemplatesGetCollection();
  return result.data['hydra:member']
}

function ReportIndex() {
  const loadedReports: Report[] = useLoaderData() as Report[];
  const [reports, setReports] = useState(loadedReports);



  const handleReportGeneratedFromTemplateCreation = (reportGeneratedFromTemplate: any) => {
    // logic to save report
    //redirect to new report with newly created report id!
    return reportGeneratedFromTemplate
  }


  const reportTemplateTableRowElements = reports.map((report, index) => (
    <Table.Row key={index} style={{ border: '1px solid grey', margin: '20px' }}>
  <Table.HeaderCell><a href={`/reports/${report.id}`}>{report.name}</a></Table.HeaderCell>
  <Table.HeaderCell>{report.createdAt?.toString()}</Table.HeaderCell>
  <Table.HeaderCell>{report.updatedAt?.toString()}</Table.HeaderCell>
  <Table.HeaderCell>{report.publishedAt?.toString()}</Table.HeaderCell>
  <Table.HeaderCell>Wannabe Clickable Delete Link</Table.HeaderCell>
  </Table.Row>
));

  return (
    <div>
      <h1>Reports</h1>
      <ReportFormModal
        onReportGenerateFromTemplateModalSubmit={(reportGeneratedFromTemplate) => handleReportGeneratedFromTemplateCreation(reportGeneratedFromTemplate)}
      />

  <Table celled>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Created At</Table.HeaderCell>
      <Table.HeaderCell>Last Updated</Table.HeaderCell>
      <Table.HeaderCell>Published At</Table.HeaderCell>
      <Table.HeaderCell>Action</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
  {reportTemplateTableRowElements}
  </Table.Body>

  <Table.Footer>
  <Table.Row>
    <Table.HeaderCell colSpan="5">
     <Menu pagination>
      <Menu.Item as='a' icon>
          <Icon name='chevron left' />
      </Menu.Item>
      <Menu.Item as='a'>Wannabe 1</Menu.Item>
      <Menu.Item as='a'>Wannabe 2</Menu.Item>
      <Menu.Item as='a'>Wannabe 3</Menu.Item>
      <Menu.Item as='a'>Wannabe 4</Menu.Item>
      <Menu.Item as='a' icon>
          <Icon name='chevron right' />
      </Menu.Item>
   </Menu>
   <section style={{'float':'right'}}>
     <Button><Icon name='edit'></Icon>Wannabe Confirm Limit Per Page</Button>
     <Input on style={{'margin':'0px','margin-left':'10px',}} name="limitPerPage" placeholder="10"></Input>
   </section>
  </Table.HeaderCell>
  </Table.Row>
  </Table.Footer>
  </Table>
  </div>
);
}

export default ReportIndex;
