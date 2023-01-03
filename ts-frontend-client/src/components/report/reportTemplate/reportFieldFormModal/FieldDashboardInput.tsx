import {Label} from 'semantic-ui-react';
import {Form, Checkbox, Dropdown} from 'formsy-semantic-ui-react';
import React from "react";
import {ReportFilterField} from "../../../../interfaces/reportfilterfield";
import {
  fieldCategoriesOptions, fieldDashboardSubtypeOptions
} from "../../../../api/hardcoded-data/FieldDashboardInputOptions"
import ErrorLabel from "../../../commonLayout/ErrorLabel";

interface Props {
  field: ReportFilterField;
  handleFilterChange: (e: any, data: any) => void;
}

const FieldDashboardInput: React.FC<Props> = ({
                                                field,
                                                handleFilterChange,

                                         }) => {
  return (
    <div>
      <Form.Field required>
        <label>Dashboard Component Type</label>
      <Form.Dropdown
        placeholder="Select Dashboard Component Type"
        fluid
        selection
        options={fieldDashboardSubtypeOptions}
        onChange={handleFilterChange}
        name="type"
        value={field.filter?.type}
        required
        validationErrors={{isDefaultRequiredValue: 'Dashboard Component Type is Required'}}
        errorLabel={ ErrorLabel({pointing:"above"}) }
      />
      </Form.Field>

      <h3>Additional Configuration</h3>

      <div className="filter-section">

        {field.filter?.type === 'issueByCategoryGroup' && (
          <Dropdown
            placeholder="Category Groups to Show"
            fluid
            selection
            options={fieldCategoriesOptions}
            onChange={handleFilterChange}
            name="categoryGroups"
            value={"categoryGroups" in field.filter ? field.filter.categoryGroups.map((categoryGroup) => categoryGroup.id) : ''}
            multiple
          />
        )}

        {field.filter?.type === 'issueByCategory' && (
          <Dropdown
            placeholder="Select Category Group/Sub Group"
            fluid
            selection
            options={fieldCategoriesOptions}
            onChange={handleFilterChange}
            name="category"
            value={"category" in field.filter ? field.filter.category : ''}
          />
        )}

        {field.filter?.type === 'issueByCategory'
          && (
            <Checkbox
              toggle
              label="Display all category labels, even where no issue data exists"
              checked={"isShowCategoriesWithNoIssues" in field.filter ? field.filter?.isShowCategoriesWithNoIssues : false}
              name="isShowCategoriesWithNoIssues"
            />
          )}
      </div>
    </div>
  );
}

export default FieldDashboardInput;
