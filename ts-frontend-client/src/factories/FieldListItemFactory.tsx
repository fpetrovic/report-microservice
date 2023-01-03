import {Checkbox, Form, Input, Radio, Select, TextArea, Button, Table, Menu, Icon} from 'semantic-ui-react';
import {DashboardImportFilter, RecordImportFilter, ReportFieldUnionType} from "../config/types";
import {ReportSelectableFieldOption} from "../interfaces/reportselectablefieldoption";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

function recordImportFieldFilterListItem(filter: RecordImportFilter) {
  return (
  <div>filter &&
    {filter.type && <p>Record Type: {filter.type} </p>}
    {filter.status && <p>Status: {filter.status} </p>}
    {filter.priorities && <p>Priorities: {filter.priorities.map((priority) => priority.value).toString()} </p>}
    {filter.categories && <p>Categories: {filter.categories.map((category) => category.value).toString()} </p>}
    {filter.locations && <p>Locations: {filter.locations.map((location) => location.value).toString()} </p>}
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


function FieldListItemFactory(field: ReportFieldUnionType, isTemplate: boolean = false, handleSaveFieldValue?: any, sectionIndex?: number, fieldIndex?: number ) {
  switch (field.reportFieldType) {
    case 'short-text':
      return <Form.Field>
        <Form.Input
          name={field.name}
          value={"textValue" in field ? field.textValue : ''}
          onChange={(event, data) => handleSaveFieldValue(sectionIndex, fieldIndex, field, data)}
          disabled={isTemplate}  />
      </Form.Field>;
    case 'long-text':
      return <Form.Field>
        <TextArea
          rows={7}
          name={field.name}
          value={"textValue" in field ? field.textValue : ''}
          onChange={(event, data) => handleSaveFieldValue(sectionIndex, fieldIndex, field, data)}
          disabled={isTemplate} />
      </Form.Field>
    case 'radio':

      return [{label: 'yes', value: '1'} , {label: 'no', value: '0'}].map((radioObject) =>
        <Form.Field className='left floated'>
          <Form.Radio
            name={field.name}
            value={radioObject.value}
            onChange={(event, data) => handleSaveFieldValue(sectionIndex, fieldIndex, field, data)}
            checked={"textValue" in field ? field.textValue === radioObject.value : undefined}
            label={radioObject.label}
            disabled={isTemplate}
          />
      </Form.Field>);
    case 'select':
      if ("reportSelectableFieldOptions" in field) {
        const preparedFieldOptionItems = field.reportSelectableFieldOptions.map((value: ReportSelectableFieldOption) => ({
          key: value['@id'],
          value: value['@id'],
          text: value.name
        }));

        const selectedFieldOptionItem = field.reportSelectableFieldOptions.filter((value: ReportSelectableFieldOption) => (
          value.isSelected
        ))

        return <Form.Field width={6} className='left floated'>
          <Select options={preparedFieldOptionItems} value={selectedFieldOptionItem['@id']} disabled={isTemplate} />
        </Form.Field>;
      }

      return
    case 'checkbox':
      return "reportSelectableFieldOptions" in field ? field.reportSelectableFieldOptions.map((value: ReportSelectableFieldOption, index: number) =>
        <Checkbox key={index} label={value.name} name={field.name} disabled={isTemplate}/>) : undefined;
    case 'date':
      return <Form.Field disabled={isTemplate}><DatePicker
        customInput={<Input icon="calendar alternate" iconPosition="left" />}
        selected={undefined}
        onChange={() => undefined}
        placeholderText="Select a date"
        className="ui input"

      />
      </Form.Field>;
    case 'time':
      return <Form.Field disabled={isTemplate}><DatePicker
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
        <Button as="label" htmlFor="file-input" style={{ display: 'block', width: '100%', textAlign: 'center' }} icon="file" content="Upload files" disabled={isTemplate} />
        <Input type="file" id="file-input" style={{ display: 'none' }} disabled={isTemplate} />
      </div>
    case 'record-import':
    { // @ts-ignore
      "filter" in field && field as RecordImportFilter && recordImportFieldFilterListItem(field.filter) }
      return <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Record Name</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {"records" in field && field.records?.length === 0 ? (
              <h3 className={"empty-table-message"}>There are no records for chosen filters.</h3>
            ) : (
              "records" in field && field.records?.map((record: any, index: number) => (
                <Table.Row key={index} style={{ border: '1px solid grey', margin: '20px' }}>
                  <Table.HeaderCell><a href={`/records/${record.id}`}>{record.name}</a></Table.HeaderCell>

                  <Table.HeaderCell><a href={`/records/${record.id}`}>Remove Icon</a></Table.HeaderCell>
                </Table.Row>
              )
            ))
            }
          </Table.Body>
        </Table>
      </div>
        ;
    case 'dashboard':
      // @ts-ignore
      return dashboardFieldFilterListItem(field.filter)
    default:
      return undefined;
  }
}

export default FieldListItemFactory;
