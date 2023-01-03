import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Icon, Label, Message} from 'semantic-ui-react';
import {Input, Form} from 'formsy-semantic-ui-react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {ReportTemplate as iReportTemplate} from "../../../interfaces/reporttemplate";
import {ReportSection} from "../../../interfaces/reportsection";
import {ReportTemplateApiFactory} from "../../../api/api/typescript-axios"
import {ReportFieldUnionType} from "../../../config/types";
import SectionCard from "../common/SectionCard";
import SectionCardTemplateExtraHeader from "../common/reportTemplate/SectionCardTemplateExtraHeader";
import SectionCardTemplateExtraContent from "../common/reportTemplate/SectionCardTemplateExtraContent";
import ErrorLabel from "../../commonLayout/ErrorLabel";

const defaultReportTemplate: iReportTemplate = {
    name:'',
    sections: []
}

// export const loader: ({ params }: LoaderFunctionParameter) => Promise<iReportTemplate> = async ({ params }) => {
// @ts-ignore
export const loader = async ({ params }) => {
  let result
  if(params.reportTemplateId) {
    const response = await ReportTemplateApiFactory().apiReportTemplatesIdGet(params.reportTemplateId)
    if(response.status !== 200){
      throw new Error('Something went wrong. Please contact support')
    }
    result = response.data
  }

  if(params.reportTemplateId === undefined) {
    result = defaultReportTemplate
  }

  return result
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

  const handleReportTemplateChange = (e: any, data: any) => {
    const { name, value } = data;

    setReportTemplate((prevReportTemplate) => (
      {
        ...prevReportTemplate,
        [name]: value,
      }));
  };

  function handleSectionChange(editedSectionTitle: string, sectionIndex: number):void {
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
      position:reportTemplate.sections.length + 1,
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

  const sectionElementList = reportTemplate.sections && reportTemplate.sections.map((section:ReportSection, index:number) => {
    const sectionCardExtraHeader = <SectionCardTemplateExtraHeader
      key={index}
      section={section}
      sections={reportTemplate.sections}
      index={index}
      handleRemoveSectionClick={handleRemoveSectionClick}
      handleSectionChange={handleSectionChange}
      handleRemoveFieldFromSectionClick={handleRemoveFieldFromSectionClick}
      handleSaveFieldToSectionFieldsList={handleSaveFieldToSectionFieldsList}
      />

    const sectionCardExtraContent = <SectionCardTemplateExtraContent
      section={section}
      index={index}
      handleRemoveFieldFromSectionClick={handleRemoveFieldFromSectionClick}
      handleSaveFieldToSectionFieldsList={handleSaveFieldToSectionFieldsList}
      />

    return <SectionCard
      key={index}
      section={section}
      sectionIndex={index}
      sectionCardExtraHeader={sectionCardExtraHeader}
      sectionCardExtraContent={sectionCardExtraContent}
      isTemplate={true}
    />
  });

  // @ts-ignore
  return (
    <div className="ReportTemplate">
      <Form
        id="save-report-template-form"
        onValidSubmit={submitForm}
        noValidate
      >
        {<Button form="save-report-template-form" type="submit" color={'green'} className="ui button save-button">Save Report Template</Button>}
        {<Button  type="button" color={'grey'} className="ui button save-button">Cancel</Button>}

        <Card fluid color='yellow' className="card-style">
          <CardHeader className={'card-header'}>
            <h2>Report Template Overview</h2>
            <p >This section will not be included when a report is generated</p>
          </CardHeader>
          <CardContent>
            <div>
              <Form.Field required >
                <label>Report Name</label>
                <Form.Input value={reportTemplate.name}
                            placeholder="Please, enter the report template name"
                            name="name"
                            onChange={handleReportTemplateChange}
                            className="ui input"
                            required
                            validationErrors={{isDefaultRequiredValue: 'Report Name is Required'}}
                            errorLabel={ErrorLabel()}
                />
              </Form.Field>

              <Form.Field>
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
          <h2>Report template details</h2>
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

        {sectionElementList}


        <div>
          {<Button type="button" color={"black"} onClick={handleAddSectionClick} className="ui button left floated add-section-button">Add Section</Button>}
        </div>

      </Form>

    </div>
  );
}

export default ReportTemplate;
