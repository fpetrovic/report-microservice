import {Label} from 'semantic-ui-react'
import React from "react";
import {ReportFilterField} from "../../interfaces/reportfilterfield";
import {Input, Form, Dropdown, Checkbox} from 'formsy-semantic-ui-react';


const fieldRecordImportSubtypeOptions = [
    {
        key: 'issue',
        text: 'Issue',
        value: 'issue',
    },
    {
        key: 'note',
        text: 'Note',
        value: 'note',
    },
    {
        key: 'checklist',
        text: 'Checklist',
        value: 'checklist',
    }
]

const fieldRecordImportPriorityOptions = [
    {
        key: '1',
        text: '1',
        value: '1',
    },
    {
        key: '2',
        text: '2',
        value: '2',
    },
    {
        key: '3',
        text: '3',
        value: '3',
    },
    {
        key: '4',
        text: '4',
        value: '4',
    },
    {
        key: '5',
        text: '5',
        value: '5',
    },
]

const fieldRecordImportStatusOptions = [
    {
        key: 'all',
        text: 'All',
        value: 'all',
    },
    {
        key: 'open',
        text: 'Open',
        value: 'open',
    },
    {
        key: 'closed',
        text: 'Closed',
        value: 'closed',
    },
]

const fieldRecordImportCategoriesOptions = [
    {
        key: 'health',
        text: 'Health',
        value: 'health',
    },
    {
        key: 'security',
        text: 'Security',
        value: 'security',
    },
    {
        key: 'catering',
        text: 'Catering',
        value: 'catering',
    },
]

// @ts-ignore
interface Props {
  field: ReportFilterField;
  handleFilterChange: (e: any, data: any) => void;
}

const FieldFilterableInput: React.FC<Props> = ({
                                                field,
                                                handleFilterChange,
                                              }) => {
    // @ts-ignore
  const getCheckboxFilterElements = (field) => {
        let priorities = fieldRecordImportPriorityOptions.map((priorityValue, index) => {
            return <Checkbox key={index}
                             name='priorities'
                             label={priorityValue.text}
                             checked = { field.filter.priorities && field.filter.priorities.includes(priorityValue.value) }
                             onChange={handleFilterChange} />
        })

        return priorities
    }

    return (
        <div>



          <Form.Field required>
            <label>Record Type</label>
            <Dropdown
              placeholder='Select Record Import Type'
              fluid
              selection
              options={fieldRecordImportSubtypeOptions}
              onChange={handleFilterChange}
              name='type'
              value={field.filter?.type}
              required
              validationErrors={{isDefaultRequiredValue: 'Record Type is Required'}}
              errorLabel={ <Label prompt color="red" pointing="above" /> }
            />
          </Form.Field>

            <h3>Additional Configuration</h3>

            <div className='filter-section'>


                <Dropdown
                    placeholder='Record Status to Show'
                    fluid
                    selection
                    options={fieldRecordImportStatusOptions}
                    onChange={handleFilterChange}
                    name='status'
                    value={field.filter?.status}
                />

                {field.filter?.type === 'issue' && getCheckboxFilterElements(field)}

                {field.filter?.type === 'issue' && <Dropdown
                    placeholder='Select Categories'
                    fluid
                    selection
                    options={fieldRecordImportCategoriesOptions}
                    onChange={handleFilterChange}
                    name='categories'
                    value={"categories" in field.filter ? field.filter.categories.map((category) => category.id) : ''}
                    multiple
                />}

                {field.filter?.type === 'issue' && <Dropdown
                    placeholder='Select Locations'
                    fluid
                    selection
                    options={fieldRecordImportCategoriesOptions}
                    onChange={handleFilterChange}
                    name='locations'
                    value={"locations" in field.filter ? field.filter.locations.map((location) => location.id) : ''}
                    multiple
                />}
            </div>
        </div>
    )
}

export default FieldFilterableInput
