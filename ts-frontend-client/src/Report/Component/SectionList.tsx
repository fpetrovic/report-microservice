import FieldList from './FieldList';
import {ReportSection} from "../../interfaces/reportsection";

function SectionList(props: {
  sections?: ReportSection[];
}) {
  const sectionElementsList = props.sections && props.sections.map((section, index) => (
    <div key={index} style={{ border: '1px solid grey' }}>
      <h4>
        Title:
        {section.name}
      </h4>

      <FieldList
        sectionFields={section.reportFields}
      />
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

export default SectionList;
