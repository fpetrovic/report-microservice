import React from 'react';
import { useState } from 'react';
import {Button, Input} from 'semantic-ui-react';
import { useLoaderData } from 'react-router-dom';
import reportTemplateApi from '../../api/reportTemplate';
import {ReportField} from "../../interfaces/reportfield";
import {ReportTemplate as iReportTemplate} from "../../interfaces/reporttemplate";
import {ReportSection} from "../../interfaces/reportsection";
import SectionTemplateList from "./SectionTemplateList";
import {ReportTemplateApiFactory} from "./../../api-ts/api/typescript-axios/api"

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

  const handleSaveReportTemplate = async () => {
    const response = reportTemplate.id ?
      await ReportTemplateApiFactory().apiReportTemplatesIdPut(reportTemplate.id, reportTemplate) :
      await ReportTemplateApiFactory().apiReportTemplatesPost(reportTemplate)
    ;
    // check errors
    // if all is good - then redirect to index with success message
    return response
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
      updatedObject.sections.splice(index, 1);

      return updatedObject;
    });
  };

  function handleSaveFieldToSectionFieldsList(sectionIndex: number, field: ReportField, fieldIndex?: number) {
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
      const updatedObject = {...prevObject};

      const list = [...prevObject.sections];
      list[sectionIndex].reportFields.splice(fieldIndex, 1);

      updatedObject.sections = list;
      return updatedObject;
    });
  };

  return (
    <div>
      <div className="ReportTemplate" style={{padding: '20px'}}>
        <h2>Report Template Overview</h2>
        <p>This section will not be included when a report is generated</p>
        <div>
          <Input value={reportTemplate.name} placeholder="Please, enter the report template name"
                 name="name" onChange={handleReportTemplateChange} />
          <br/>
          <Input value={reportTemplate.description}
                 placeholder="Please, enter the report template description" name="description" onChange={handleReportTemplateChange} />
        </div>

        <h2>Report Details</h2>
        <p>Report overview details</p>
        <div style={{margin: '10px'}}>
          <Input disabled placeholder="Autofilled by user at report creation"/>
          <br/>
          <Input disabled placeholder="Autofilled by user at report creation"/>
          <br/>
          <Input disabled placeholder="Autofilled by user at report creation"/>
          <br/>
          <Input value={reportTemplate.supportingText} placeholder="Optional Text Field for Guidance"
                 name="supportingText" onChange={handleReportTemplateChange} />
        </div>
        {reportTemplate.sections && (
          <SectionTemplateList
            sections={reportTemplate.sections}
            handleRemoveFieldFromSectionClick={handleRemoveFieldFromSectionClick}
            handleSaveFieldToSectionFieldsList={handleSaveFieldToSectionFieldsList}
            handleAddSectionClick={handleAddSectionClick}
            handleRemoveSectionClick={handleRemoveSectionClick}
          />
        )}

        {<Button onClick={handleAddSectionClick}>Add Section</Button>}
      </div>
      {<Button onClick={handleSaveReportTemplate}>Save Report Template</Button>}
    </div>
  );
}

export default ReportTemplate;
