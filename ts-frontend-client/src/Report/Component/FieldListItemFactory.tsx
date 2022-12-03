import {Checkbox, Form, Input, Radio, Select, TextArea, Button} from 'semantic-ui-react';
import {DashboardImportFilter, RecordImportFilter, ReportFieldUnionType} from "../../config/types";
import {ReportSelectableFieldOption} from "../../interfaces/reportselectablefieldoption";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function recordImportFieldFilterListItem(filter: RecordImportFilter) {
  return (
  <div>
    {filter.type && <p>Record Type: {filter.type} </p>}
    {filter.status && <p>Status: {filter.status} </p>}
    {filter.priorities && <p>Priorities: {filter.priorities.toString()} </p>}
    {filter.categories && <p>Categories: {filter.categories.toString()} </p>}
    {filter.locations && <p>Locations: {filter.locations.toString()} </p>}
  </div>
  )}

function dashboardFieldFilterListItem(filter: DashboardImportFilter) {
  return (
    <div>
      {filter.type && <p>Component Type: {filter.type} </p>}
      {filter.categoryGroups && <p>Category Groups: {filter.categoryGroups.toString()} </p>}
      {filter.category && <p>Category: {filter.category} </p>}
      {filter.isShowCategoriesWithNoIssues && <p>Show category with no issue: {filter.isShowCategoriesWithNoIssues}</p>}
    </div>
  )}


function FieldListItemFactory(field: ReportFieldUnionType, isTemplate: boolean = false) {
  switch (field.reportFieldType) {
    case 'short-text':
      return <Form.Field disabled={true} width={6} className='left floated'>
        <Input name={field.name} value={"textValue" in field ? field.textValue : ''}  disabled={isTemplate}  />
      </Form.Field>;
    case 'long-text':
      return <Form.Field  className='left floated'>
        <TextArea cols={100} rows={7} name={field.name} value={"textValue" in field ? field.textValue : ''} disabled={isTemplate} />
      </Form.Field>
    case 'radio':

      return ['yes', 'no'].map((value) =>
        <Form.Field  className='left floated'>
          <Radio name={field.name} value={"textValue" in field ? field.textValue : undefined} label={value} disabled={isTemplate} />
      </Form.Field>);
    case 'select':
      if ("reportSelectableFieldOptions" in field) {
        const preparedFieldOptionItems = field.reportSelectableFieldOptions.map((value: ReportSelectableFieldOption) => ({
          key: value['@id'],
          value: value['@id'],
          text: value.name
        }));

        return <Form.Field width={6} className='left floated'><Select options={preparedFieldOptionItems} disabled={isTemplate} /></Form.Field>;
      }

      return
    case 'checkbox':
      return "reportSelectableFieldOptions" in field ? field.reportSelectableFieldOptions.map((value: ReportSelectableFieldOption, index: number) =>
        <Checkbox key={index} label={value.name} name={field.name} disabled={isTemplate}/>) : undefined;
    case 'date':
      return <Form.Field><DatePicker
        customInput={<Input icon="calendar alternate" iconPosition="left" />}
        selected={undefined}
        onChange={() => undefined}
        placeholderText="Select a date"
        className="ui input"
      />
      </Form.Field>;
    case 'time':
      return <Form.Field><DatePicker
        customInput={<Input icon="time alternate" iconPosition="left" />}
        selected={undefined}
        onChange={() => undefined}
        placeholderText="Select time"
        className="ui input"
        showTimeSelect={true}
      />
      </Form.Field>;
    case 'file':
      return <div>
        <Button as="label" htmlFor="file-input" style={{ display: 'block', width: '100%', textAlign: 'center' }} icon="file" content="Upload files" />
        <Input type="file" id="file-input" style={{ display: 'none' }} />
      </div>
    case 'record-import':
      // @ts-ignore
      return recordImportFieldFilterListItem(field.filter)
        ;
    case 'dashboard':
      // @ts-ignore
      return dashboardFieldFilterListItem(field.filter)
    default:
      return undefined;
  }
}

export default FieldListItemFactory;
