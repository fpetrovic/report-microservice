import {Card, CardContent, CardHeader, Icon} from 'semantic-ui-react';
import React from "react";
import {ReportFieldUnionType} from "../../../config/types";
import FieldListItemFactory from "../../../factories/FieldListItemFactory";


function FieldCard(props: {
  field: ReportFieldUnionType
  sectionIndex: number
  index: number
  fieldCardAdditionalHeader?: any
  isTemplate: boolean
  handleSaveFieldValue: any
}) {
  const fieldElement = FieldListItemFactory(props.field, props.isTemplate, props.handleSaveFieldValue, props.sectionIndex, props.index);

  const FieldCardAdditionalHeader = props.fieldCardAdditionalHeader

  return (
    <Card fluid >
      <CardHeader className='card-header'>
        <h3 className={'left floated'}>{props.field.name}</h3>
        {FieldCardAdditionalHeader && FieldCardAdditionalHeader}
      </CardHeader>

      <CardContent className='card-content-field'>
        {fieldElement}
      </CardContent>

    </Card>
  );
}

FieldCard.defaultProps = {
  isTemplate: false
}

export default FieldCard;
