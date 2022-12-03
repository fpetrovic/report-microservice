import { Button } from 'semantic-ui-react';
import FieldFormModal from '../../ReportTemplate/Component/FieldFormModal';
import FieldListItemFactory from './../../Report/Component/FieldListItemFactory';
import {ReportField} from "../../interfaces/reportfield";
import React from "react";

interface Props {
  sectionFields?: ReportField[],
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void,
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportField, fieldIndex?: number) => void,
  sectionIndex: number
}

const FieldList: React.FC<Props> = ({ sectionFields,
                                      sectionIndex,
                                      handleRemoveFieldFromSectionClick,
                                      handleSaveFieldToSectionFieldsList,
                                       }) => {


  const fieldElementsList = sectionFields && sectionFields.map((field, fieldIndex) => {
    const fieldElement = FieldListItemFactory(field, true);

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

        <FieldFormModal
          fieldIndex={fieldIndex}
          onModalSubmit={(field: ReportField, fieldIndex) => handleSaveFieldToSectionFieldsList(sectionIndex, field, fieldIndex)}
          fieldList={sectionFields}
          injectedField={field}
        />

        <Button onClick={() => handleRemoveFieldFromSectionClick(sectionIndex, fieldIndex)}>Remove Field</Button>
      </div>
    );
  });

  return (
    <div>
      <div className="FieldList">
        {fieldElementsList}
      </div>

      <FieldFormModal
        onModalSubmit={(field) => handleSaveFieldToSectionFieldsList(sectionIndex, field)}
        fieldList={sectionFields ?? []}
      />

    </div>
  );
}
export default FieldList;
