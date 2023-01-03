import {ReportSection} from "../../../../interfaces/reportsection";
import React from "react";
import FieldCard from "../FieldCard";
import {ReportFieldUnionType} from "../../../../config/types";
import FieldCardTemplateExtraHeader from "./FieldCardTemplateExtraHeader";
import FieldFormModal from "../../reportTemplate/reportFieldFormModal/FieldFormModal";
import {Button} from "semantic-ui-react";

function SectionCardTemplateExtraContent(props: {
  section: ReportSection
  index: number
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void,
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) => void;
}) {
  return (
      <div className={'add-report-field-button-div-wrapper'}>
        <FieldFormModal
          trigger={<Button type="button" color='black' className={'add-report-field-button'}>Add Field</Button>}
          onModalSubmit={(field) => props.handleSaveFieldToSectionFieldsList(props.index, field)}
          fieldList={props.section.reportFields as ReportFieldUnionType[]}
        />
      </div>
  );
}

export default SectionCardTemplateExtraContent;
