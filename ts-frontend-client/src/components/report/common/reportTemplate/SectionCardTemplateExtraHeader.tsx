import {Button, Icon } from 'semantic-ui-react';
import {ReportSection} from "../../../../interfaces/reportsection";
import React from "react";
import SectionFormModal from "../../reportTemplate/reportSectionFormModal/SectionFormModal";
import {ReportFieldUnionType} from "../../../../config/types";

function SectionCardTemplateExtraHeader(props: {
  section: ReportSection
  sections: ReportSection[]
  index: number
  handleRemoveSectionClick: (index: number) => void;
  handleSectionChange: (title: string, index: number) => void;
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void;
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) => void;
}) {
  return (
    <div>
      <Button color={'black'} onClick={() => props.handleRemoveSectionClick(props.index)}  className={' right floated remove-section-button'}>
        <Icon name='close' /> Remove Section
      </Button>
      <SectionFormModal
        trigger={<Button type="button" color='green' className='right floated'><Icon name='edit' />Edit Section Title</Button>}
        sectionIndex={props.index}
        onModalSubmit={(sectionTitle: string, sectionIndex: number) => props.handleSectionChange(sectionTitle, props.index)}
        sectionList={props.sections}
        injectedSection={props.section}
        handleSectionChange={props.handleSectionChange}
      />
    </div>
  );
}


export default SectionCardTemplateExtraHeader;
