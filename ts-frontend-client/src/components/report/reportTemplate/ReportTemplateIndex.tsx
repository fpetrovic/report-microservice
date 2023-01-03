import React, {useState} from 'react';
import {Button, Icon, Input, Menu, Table} from 'semantic-ui-react';
import {Link, useLoaderData} from 'react-router-dom';
import {ReportTemplate} from "../../../interfaces/reporttemplate";
import {ReportTemplateApiFactory} from "../../../api/api/typescript-axios";

export async function loader() {
  const result = await ReportTemplateApiFactory().apiReportTemplatesGetCollection();
  return result.data['hydra:member']
}
function ReportTemplateIndex() {
  const loadedReportTemplates: ReportTemplate[] = useLoaderData() as ReportTemplate[];
  const [reportTemplates, setReportTemplates] = useState(loadedReportTemplates);

  const reportTemplateTableRowElements = reportTemplates.map((reportTemplate: ReportTemplate, index: number) => (
    <Table.Row key={index} style={{ border: '1px solid grey', margin: '20px' }}>
      <Table.HeaderCell><a href={`/reportTemplates/${reportTemplate.id}`}>{reportTemplate.name}</a></Table.HeaderCell>
      <Table.HeaderCell>{reportTemplate.createdAt?.toString()}</Table.HeaderCell>
      <Table.HeaderCell>{reportTemplate.updatedAt?.toString()}</Table.HeaderCell>
      <Table.HeaderCell><a href={`/reportTemplates/${reportTemplate.id}`}>Edit</a></Table.HeaderCell>
    </Table.Row>
  ));

  return (
    <div>
      <h1>Report Templates</h1>
      <Link to="/reportTemplates/new" style={{ margin: '0px' }}>Add New Report Template</Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reportTemplates.length === 0 ? (
            <h3 className={"empty-table-message"}>There are no report templates.</h3>
          ) : (
            reportTemplateTableRowElements
          )
          }
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
                  <Input style={{'margin':'0px','marginLeft':'10px',}} name="limitPerPage" placeholder="10"></Input>
               </section>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

export default ReportTemplateIndex;
