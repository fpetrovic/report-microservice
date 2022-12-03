import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Icon, Label, Message} from 'semantic-ui-react';
import {Input, Form} from 'formsy-semantic-ui-react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import reportTemplateApi from '../../api/reportTemplate';
import {ReportTemplate as iReportTemplate} from "../../interfaces/reporttemplate";
import {ReportSection} from "../../interfaces/reportsection";
import SectionTemplateList from "./SectionTemplateList";
import {ReportTemplateApiFactory} from "../../api-ts/api/typescript-axios"
import {ReportFieldUnionType} from "../../config/types";

const defaultReportTemplate: iReportTemplate = {
    name:'',
    sections: []
}

// export const loader: ({ params }: LoaderFunctionParameter) => Promise<iReportTemplate> = async ({ params }) => {
// @ts-ignore
export const loader = async ({ params }) => {
  return params.reportTemplateId ? await reportTemplateApi().get(params.reportTemplateId) : Promise.resolve(defaultReportTemplate);
}

function ReportTemplate() {
  const loadedReportTemplate: iReportTemplate = useLoaderData() as iReportTemplate;
  const [reportTemplate, setReportTemplate] = useState(loadedReportTemplate);

  const navigate = useNavigate()

  const submitForm = async () => {
    const response = reportTemplate.id ?
      await ReportTemplateApiFactory().apiReportTemplatesIdPut(reportTemplate.id, reportTemplate) :
      await ReportTemplateApiFactory().apiReportTemplatesPost(reportTemplate)

    if(response.status === 200) {
      //@todo return minimum read if redirect to index. add minimum read to collection
      navigate('/reportTemplates')
    }

    // @todo else -- handle error messages with formsy
  }

  const handleSaveReportTemplate = async () => {

    // check errors
    // if all is good - then redirect to index with success message
    return reportTemplate.id ?
      await ReportTemplateApiFactory().apiReportTemplatesIdPut(reportTemplate.id, reportTemplate) :
      await ReportTemplateApiFactory().apiReportTemplatesPost(reportTemplate)
  }


  const handleReportTemplateChange = (e: any, data: any) => {
    console.log(ReportTemplate)
    const { name, value } = data;

    setReportTemplate((prevReportTemplate) => (
      {
        ...prevReportTemplate,
        [name]: value,
      }));
  };

  function handleSectionChange(editedSectionTitle: string, sectionIndex: number):void {
    debugger
    setReportTemplate((prevObject: iReportTemplate) => {
      const updatedObject = {...prevObject};
      const list = [...prevObject.sections];

      list[sectionIndex].name = editedSectionTitle

      updatedObject.sections = list;
      return updatedObject;
    });
  }

  const handleAddSectionClick = () => {
    const defaultSection: ReportSection = {
      sortOrder:reportTemplate.sections.length + 1,
      name:`Section ${reportTemplate.sections.length + 1}`,
      reportFields: []
    }

    setReportTemplate((prevObject: iReportTemplate) => {
      const updatedObject = {...prevObject};
      updatedObject.sections = [...prevObject.sections, defaultSection];

      return updatedObject;
    });
  };
  const handleRemoveSectionClick = (index: number) => {
    setReportTemplate((prevObject: iReportTemplate) => {
      const updatedObject = {...prevObject};
      const list = [...prevObject.sections]
      list.splice(index, 1);
      updatedObject.sections = list;

      return updatedObject;
    });
  };

  function handleSaveFieldToSectionFieldsList(sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) {
    setReportTemplate((prevObject: iReportTemplate) => {
      const updatedObject = {...prevObject};
      const list = [...prevObject.sections];

      if (fieldIndex !== undefined) {
        list[sectionIndex].reportFields[fieldIndex] = {...field};
      } else {
        list[sectionIndex].reportFields = [...list[sectionIndex].reportFields, {...field}];
      }

      updatedObject.sections = list;
      return updatedObject;
    });
  }

  const handleRemoveFieldFromSectionClick = (sectionIndex: number, fieldIndex: number) => {
    setReportTemplate((prevObject: iReportTemplate) => {
      const updatedObject = {...prevObject}
      const list = [...prevObject.sections[sectionIndex].reportFields];
      list.splice(fieldIndex, 1);

      updatedObject.sections[sectionIndex].reportFields = list;
      return updatedObject;
    });
  };

  return (
    <div className="ReportTemplate">
      <Form
        id="save-report-template-form"
        onValidSubmit={submitForm}
        noValidate
      >
        {<Button form="save-report-template-form" type="submit" color={'green'} className="ui button save-button">Save Report Template</Button>}

        <Card fluid color='yellow' className="card-style">
          <CardHeader className={'card-header'}>
            <h2>Report Template Overview</h2>
            <p >This section will not be included when a report is generated</p>
          </CardHeader>
          <CardContent>
            <div>
              <Form.Field width={6} required >
                <label>Report Name</label>
                <Form.Input value={reportTemplate.name}
                            placeholder="Please, enter the report template name"
                            name="name"
                            onChange={handleReportTemplateChange}
                            className="ui input"
                            required
                            validationErrors={{isDefaultRequiredValue: 'Report Name is Required'}} //IF OPTIONAL IT WILL NOT ACTIVATE THE FORM
                            errorLabel={ <Label prompt color="red" pointing="left" /> }
                />
              </Form.Field>

              <Form.Field width={6}>
                <label>Report Description</label>
                <Form.Input value={reportTemplate.description}
                            placeholder="Please, enter the report template description"
                            name="description"
                            onChange={handleReportTemplateChange}
                            className="ui input"
                />
              </Form.Field>

            </div>
          </CardContent>
        </Card>

      <Card fluid color='yellow' className="card-style">
        <CardHeader className={'card-header'}>
          <h2>Report Details</h2>
          <p >Report overview details</p>
        </CardHeader>
        <CardContent>
            <div>
              <Message color='yellow'>
                <p style={{ color:'#92400e'}}><Icon name='info'></Icon> Disabled fields can be populated when a report is generated, Date, Time & Author will be auto captured.</p>
              </Message>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Report Title</label>
                  <Input name="title" disabled placeholder="Autofilled by user at report creation" className="ui input" />
                </Form.Field>
                <Form.Field>
                  <label>Report Author</label>
                  <Input name="author" disabled placeholder="Autofilled by user at report creation" className="ui input" />
                </Form.Field>
                <Form.Field>
                  <label>Date & Time of Report</label>
                  <Input name="datetime" disabled placeholder="Autofilled by user at report creation" className="ui input" />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Supporting Text</label>
                <Input value={reportTemplate.supportingText} placeholder="Optional Text Field for Guidance"
                       name="supportingText" onChange={handleReportTemplateChange} className="ui input" />
              </Form.Field>
            </div>
        </CardContent>
      </Card>

      {reportTemplate.sections && (
        <SectionTemplateList
          sections={reportTemplate.sections}
          handleRemoveFieldFromSectionClick={handleRemoveFieldFromSectionClick}
          handleSaveFieldToSectionFieldsList={handleSaveFieldToSectionFieldsList}
          handleAddSectionClick={handleAddSectionClick}
          handleRemoveSectionClick={handleRemoveSectionClick}
          handleSectionChange={handleSectionChange}
        />
      )}

      <div>
        {<Button type="button" color={"black"} onClick={handleAddSectionClick} className="ui button left floated">Add Section</Button>}
      </div>

      </Form>

    </div>
  );
}

export default ReportTemplate;
