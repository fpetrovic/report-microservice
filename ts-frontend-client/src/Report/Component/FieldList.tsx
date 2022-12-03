import FieldListItemFactory from './FieldListItemFactory';
import React from "react";
import {ReportFieldUnionType} from "../../config/types";
import {Card, CardContent, CardHeader} from "semantic-ui-react";

interface Props {
  sectionFields?: ReportFieldUnionType[];
}

const FieldList: React.FC<Props> = ({ sectionFields}) => {
  const fieldElementsList = sectionFields && sectionFields.map((field, fieldIndex) => {
    const fieldElement = FieldListItemFactory(field);

    return (
      <Card fluid key={fieldIndex}>
        <CardHeader className='card-header'>
          <h3 className={'left floated'}>{field.name}</h3>
        </CardHeader>

        <CardContent className='card-content-field'>
          {fieldElement}
        </CardContent>
      </Card>
    );
  });

  return (
    <div>
      <div className="FieldList">
        {fieldElementsList}
      </div>
    </div>
  );
}
export default FieldList;
