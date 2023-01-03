import {Label} from 'semantic-ui-react'
import React from "react";
import {ReportFilterField} from "../../interfaces/reportfilterfield";
import {Form, Dropdown, Checkbox} from 'formsy-semantic-ui-react';
import {
  fieldRecordImportSubtypeOptions,
  fieldRecordImportPriorityOptions,
  fieldRecordImportCategoriesOptions,
  fieldRecordImportStatusOptions
} from "../../api/hardcoded-data/FieldRecordImportInputOptions"


// @ts-ignore
interface Props {
  field: ReportFilterField;
  handleFilterChange: (e: any, data: any) => void;
}

const FieldRecordImportInput: React.FC<Props> = ({
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

export default FieldRecordImportInput
