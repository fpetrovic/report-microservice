import { Button } from 'semantic-ui-react';
import FieldFormModal from '../../ReportTemplate/Component/FieldFormModal';
import FieldListItemFactory from './FieldListItemFactory';
import {ReportField} from "../../interfaces/reportfield";
import React from "react";

interface Props {
  sectionFields?: ReportField[];
}

const FieldList: React.FC<Props> = ({ sectionFields}) => {
  const fieldElementsList = sectionFields && sectionFields.map((field, fieldIndex) => {
    const fieldElement = FieldListItemFactory(field);

    return (
      <div key={fieldIndex} style={{ border: '1px solid grey', margin: '20px' }}>
        <h4>
          Title:
          {field.name}
        </h4>
        <h4>
          Type:
          {field.reportFieldType}
        </h4>
        {fieldElement}
      </div>
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
