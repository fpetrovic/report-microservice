import { Button } from 'semantic-ui-react';
import { ReportField } from '../../interfaces/reportfield';
import FieldTemplateList from './FieldTemplateList';
import {ReportSection} from "../../interfaces/reportsection";

function SectionTemplateList(props: {
  sections?: ReportSection[];
  handleRemoveFieldFromSectionClick: (sectionIndex: number, fieldIndex: number) => void;
  handleSaveFieldToSectionFieldsList: (sectionIndex: number, field: ReportField, fieldIndex?: number) => void;
  handleAddSectionClick: () => void;
  handleRemoveSectionClick: (arg0: any) => void;
}) {
  const sectionElementsList = props.sections && props.sections.map((section:ReportSection, index:number) => (
    <div key={index} style={{ border: '1px solid grey' }}>
      <h4>
        Title:
        {section.name}
      </h4>

      <FieldTemplateList
        key={index}
        sectionIndex={index}
        sectionFields={section.reportFields}
        handleRemoveFieldFromSectionClick={props.handleRemoveFieldFromSectionClick}
        handleSaveFieldToSectionFieldsList={props.handleSaveFieldToSectionFieldsList}
      />

      <Button onClick={() => props.handleRemoveSectionClick(index)}>Remove Section</Button>
    </div>
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
