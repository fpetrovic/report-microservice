import {Button, Card, CardContent, CardHeader, Icon } from 'semantic-ui-react';
import FieldTemplateList from './FieldTemplateList';
import {ReportSection} from "../../interfaces/reportsection";
import {ReportFieldUnionType} from "../../config/types";
import React from "react";
import SectionFormModal from "./SectionFormModal";

function SectionTemplateList(props: {
  sections?: ReportSection[];
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void;
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportFieldUnionType, fieldIndex?: number) => void;
  handleAddSectionClick: () => void;
  handleRemoveSectionClick: (arg0: any) => void;
  handleSectionChange: any;
}) {
  const sectionElementsList = props.sections && props.sections.map((section:ReportSection, index:number) => (
    <Card key={index} fluid color='yellow' className="card-style">
      <CardHeader className={'card-header'}>
        <h2 className={'left floated'}>{section.name}</h2>

        <Button color={'black'} onClick={() => props.handleRemoveSectionClick(index)}  className={' right floated remove-section-button'}>
          <Icon name='close' /> Remove Section
        </Button>
        <SectionFormModal
          trigger={<Button type="button" color='green' className='right floated'><Icon name='edit' />Edit Section Title</Button>}
          sectionIndex={index}
          onModalSubmit={(section: ReportSection, sectionIndex: number) => props.handleSectionChange(section, sectionIndex)}
          sectionList={props.sections}
          injectedSection={section}
          handleSectionChange={props.handleSectionChange}
        />


      </CardHeader>
      <CardContent className='card-content'>
        <FieldTemplateList
          sectionIndex={index}
          sectionFields={section.reportFields}
          handleRemoveFieldFromSectionClick={props.handleRemoveFieldFromSectionClick}
          handleSaveFieldToSectionFieldsList={props.handleSaveFieldToSectionFieldsList}
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

export default SectionTemplateList;
