import {Card, CardContent, CardHeader, Icon } from 'semantic-ui-react';
import {ReportSection} from "../../../interfaces/reportsection";
import React from "react";
import {ReportFieldUnionType} from "../../../config/types";
import FieldCardTemplateExtraHeader from "./reportTemplate/FieldCardTemplateExtraHeader";
import FieldCard from "./FieldCard";
import FieldListItemFactory from "../../../factories/FieldListItemFactory";


function SectionCard(props: {
  section: ReportSection
  sectionIndex: number
  sectionCardExtraHeader?: any
  sectionCardExtraContent?: any
  isTemplate: boolean
  handleSaveFieldValue?: any
}) {
  let SectionCardExtraHeader = props.sectionCardExtraHeader
  let SectionCardExtraContent = props.sectionCardExtraContent
  const fieldElementList = props.section.reportFields && props.section.reportFields.map((field: ReportFieldUnionType, fieldIndex) => {
    const fieldCardAdditionalHeader = props.isTemplate && <FieldCardTemplateExtraHeader
      field={field}
      sectionFields={props.section.reportFields as ReportFieldUnionType[]}
      sectionIndex={props.sectionIndex}
      index={fieldIndex}
      handleRemoveFieldFromSectionClick={SectionCardExtraHeader.props.handleRemoveFieldFromSectionClick}
      handleSaveFieldToSectionFieldsList={SectionCardExtraHeader.props.handleSaveFieldToSectionFieldsList}
    />

    return (
      <FieldCard
        key={fieldIndex}
        field={field}
        index={fieldIndex}
        fieldCardAdditionalHeader={fieldCardAdditionalHeader}
        isTemplate={props.isTemplate}
        sectionIndex={props.sectionIndex}
        handleSaveFieldValue={props.handleSaveFieldValue}
      />
    )
  });

  return (
    <Card fluid color='yellow' className="card-style">
      <CardHeader className={'card-header'}>
        <h2 className={'left floated'}>{props.section.name}</h2>
        { SectionCardExtraHeader && SectionCardExtraHeader } {/*Might be better to print as component syntax. I can add more props, too*/}
      </CardHeader>
      <CardContent className='card-content'>
        {fieldElementList}

        { SectionCardExtraContent && SectionCardExtraContent }
      </CardContent>
    </Card>
  );
}

SectionCard.defaultProps = {
  isTemplate: false
}


export default SectionCard;
