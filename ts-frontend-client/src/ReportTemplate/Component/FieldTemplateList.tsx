import {Button, Card, CardHeader, CardContent, Icon} from 'semantic-ui-react';
import FieldFormModal from '../../ReportTemplate/Component/FieldFormModal';
import FieldListItemFactory from './../../Report/Component/FieldListItemFactory';
import React from "react";
import {ReportFieldUnionType} from "../../config/types";

interface Props {
  sectionFields?: ReportFieldUnionType[],
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void,
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) => void,
  sectionIndex: number
}

const FieldTemplateList: React.FC<Props> = ({ sectionFields,
                                      sectionIndex,
                                      handleRemoveFieldFromSectionClick,
                                      handleSaveFieldToSectionFieldsList,
                                       }) => {


  const fieldElementsList = sectionFields && sectionFields.map((field, fieldIndex) => {
    const fieldElement = FieldListItemFactory(field, true);
    return (
        <Card fluid key={fieldIndex}>
          <CardHeader className='card-header'>
            <h3 className={'left floated'}>{field.name}</h3>
            <Button type="button" color='black' className={'right floated'} onClick={() => handleRemoveFieldFromSectionClick(sectionIndex, fieldIndex)}><Icon name='close' /></Button>
            <FieldFormModal
                trigger={<Button type="button" color='green' className='right floated'><Icon name='edit' /></Button>}
                fieldIndex={fieldIndex}
                onModalSubmit={(field, fieldIndex) => handleSaveFieldToSectionFieldsList(sectionIndex, field, fieldIndex)}
                fieldList={sectionFields}
                injectedField={field}
              />
          </CardHeader>

          <CardContent className='card-content-field'>
            {fieldElement}
          </CardContent>

        </Card>
    );
  });

  return (
    <div>
      <div className="FieldTemplateList">
          {fieldElementsList}
      </div>

      <div className={'add-report-field-button-div-wrapper'}>
      <FieldFormModal
        trigger={<Button type="button" color='black' className={'add-report-field-button'}>Add Field</Button>}
        onModalSubmit={(field) => handleSaveFieldToSectionFieldsList(sectionIndex, field)}
        fieldList={sectionFields ?? []}
      />
      </div>

    </div>
  );
}
export default FieldTemplateList;
