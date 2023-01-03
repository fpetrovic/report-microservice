import FieldList from './FieldList';
import {ReportSection} from "../../interfaces/reportsection";
import { Card, CardContent, CardHeader} from "semantic-ui-react";
import React from "react";

function SectionList(props: {
  sections?: ReportSection[];
}) {
  const sectionElementsList = props.sections && props.sections.map((section, index) => (
    <Card key={index} fluid color='yellow' className="card-style">
      <CardHeader className={'card-header'}>
        <h2 className={'left floated'}>{section.name}</h2>
      </CardHeader>
      <CardContent className='card-content'>
        <FieldList
          sectionFields={section.reportFields}
        />
      </CardContent>
    </Card>
  ));

  return (
    <div>
      <div className="SectionList">
        {sectionElementsList}
      </div>

      <br />
    </div>
  );
}

export default SectionList;
