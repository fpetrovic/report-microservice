import {Button, Icon } from 'semantic-ui-react';
import React from "react";
import FieldFormModal from "../../reportTemplate/reportFieldFormModal/FieldFormModal";
import {ReportFieldUnionType} from "../../../../config/types";

function FieldCardTemplateExtraHeader(props: {
  field: ReportFieldUnionType
  sectionFields: ReportFieldUnionType[]
  sectionIndex: number
  index: number
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void;
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) => void;
}) {
  return (
    <div>
      <Button type="button" color='black' className={'right floated'} onClick={() => props.handleRemoveFieldFromSectionClick(props.sectionIndex, props.index)}><Icon name='close' /></Button>
      <FieldFormModal
        trigger={<Button type="button" color='green' className='right floated'><Icon name='edit' /></Button>}
        fieldIndex={props.index}
        onModalSubmit={(field, fieldIndex) => props.handleSaveFieldToSectionFieldsList(props.sectionIndex, field, fieldIndex)}
        fieldList={props.sectionFields}
        injectedField={props.field}
      />
    </div>
  );
}


export default FieldCardTemplateExtraHeader;
