import React, { useState } from 'react';
import {Button, Card, CardContent, CardHeader} from 'semantic-ui-react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {ReportApiFactory} from "../../../api/api/typescript-axios";
import {Report as iReport} from "../../../interfaces/report";
import {ReportSection} from "../../../interfaces/reportsection";
import SectionCard from "../common/SectionCard";
import {Form} from "formsy-semantic-ui-react";
import ErrorLabel from "../../commonLayout/ErrorLabel";
import {ReportFieldUnionType} from "../../../config/types";
import {ReportTemplate as iReportTemplate} from "../../../interfaces/reporttemplate";

// export const loader: ({ params }: LoaderFunctionParameter) => Promise<iReport> = async ({ params }) => {
// @ts-ignore
export const loader = async ({ params }) => {
  const result = await ReportApiFactory().apiReportsIdGet(params.reportId);
  /*if 200 result data if error show error*/
  return result.data
}

function Report() {
  const loadedReport: iReport = useLoaderData() as iReport;
  const [report, setReport] = useState(loadedReport);

  const navigate = useNavigate()

  const submitForm = async () => {

    const response = report.id ?
      // @ts-ignore
      await ReportApiFactory().apiReportsIdPut(report.id, report) :
      // @ts-ignore
      await ReportApiFactory().apiReportsPost(report)

    if(response.status === 200) {
      //@todo return minimum read if redirect to index. add minimum read to collection
      navigate('/reports')
    }

    // @todo else -- handle error messages with formsy
  }

  const handleReportChange = (e: any, data: any) => {
    const { name, value } = data;

    setReport((prevReport) => (
      {
        ...prevReport,
        [name]: value,
      }));
  };

  function handleSaveFieldValue(sectionIndex: number, fieldIndex: number, field: ReportFieldUnionType, data: any) {
    const { value } = data;

    setReport((prevObject: iReport) => {
      const updatedObject = {...prevObject};
      const list = [...prevObject.sections];

      switch(field.reportFieldType){
        case('short-text'):
        case('long-text'):
        case('radio'):
          list[sectionIndex].reportFields[fieldIndex] = {...field, textValue: value };
      }

      updatedObject.sections = list;
      return updatedObject;
    });
  }

  const sectionElementList = report.sections && report.sections.map((section:ReportSection, index:number) => {
    return <SectionCard
      key={index}
      section={section}
      sectionIndex={index}
      handleSaveFieldValue={handleSaveFieldValue}
    />
  });

  return (
      <Form
        id="save-report-form"
        onValidSubmit={submitForm}
        noValidate
      >
        {<Button form="save-report-form" type="submit" color={'green'} className="ui button save-button">Save Report Template</Button>}

        <Card fluid color='yellow' className="card-style">
          <CardHeader className={'card-header'}>
            <h2>Report Overview</h2>
            <p >This section will not be included when a report is generated</p>
          </CardHeader>
          <CardContent>
            <div>
              <Form.Field width={6} required >
                <label>Report Name</label>
                <Form.Input value={report.name}
                            placeholder="Please, enter the report name"
                            name="name"
                            onChange={handleReportChange}
                            className="ui input"
                            required
                            validationErrors={{isDefaultRequiredValue: 'Report Name is Required'}}
                            errorLabel={ErrorLabel()}
                />
              </Form.Field>

              <Form.Field width={6}>
                <label>Created At</label>
                <Form.Input value={report.createdAt}
                            name="createdAt"
                            onChange={handleReportChange}
                            className="ui input"
                            disabled
                />
              </Form.Field>

            </div>
          </CardContent>
        </Card>

        {sectionElementList}

      </Form>


)
}

export default Report;
