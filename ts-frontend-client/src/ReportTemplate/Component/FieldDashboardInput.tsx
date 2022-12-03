import { Checkbox, Dropdown } from 'semantic-ui-react';
import {ReportField} from "../../interfaces/reportfield";
import React from "react";

const fieldCategoriesOptions = [
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
];

const fieldDashboardSubtypeOptions = [
  {
    key: 'issueByCategoryGroup',
    text: 'Issue by Category Group',
    value: 'issueByCategoryGroup',
  },
  {
    key: 'issueByCategory',
    text: 'Issue by Category',
    value: 'issueByCategory',
  },
  {
    key: 'issueByPriority',
    text: 'Issue By Priority',
    value: 'issueByPriority',
  },
  {
    key: 'issueOverTime',
    text: 'Issue Over Time',
    value: 'issueOverTime',
  },
];

interface Props {
  field: ReportField;
  handleFilterChange: (e: any, data: any) => void;
}

const FieldDashboardInput: React.FC<Props> = ({
                                                field,
                                                handleFilterChange,

                                         }) => {
  return (
    <div>
      <h4>Dashboard Field</h4>

      <h4>Field Type: </h4>

      {/*<Dropdown*/}
      {/*  placeholder="Select Record Import Type"*/}
      {/*  fluid*/}
      {/*  selection*/}
      {/*  options={fieldDashboardSubtypeOptions}*/}
      {/*  onChange={handleFilterChange}*/}
      {/*  name="type"*/}
      {/*  value={field.filter.type}*/}
      {/*/>*/}
      <br />

      <h3>Additional Configuration</h3>

      <div className="filter-section">

        {/*{field.filter.type === 'issueByCategoryGroup' && (*/}
        {/*  <Dropdown*/}
        {/*    placeholder="Category Groups to Show"*/}
        {/*    fluid*/}
        {/*    selection*/}
        {/*    options={fieldCategoriesOptions}*/}
        {/*    onChange={handleFilterChange}*/}
        {/*    name="categoryGroups"*/}
        {/*    value={field.filter.categoryGroups}*/}
        {/*    multiple*/}
        {/*  />*/}
        {/*)}*/}

        {/*{field.filter.type === 'issueByCategory' && (*/}
        {/*  <Dropdown*/}
        {/*    placeholder="Select Category Group/Sub Group"*/}
        {/*    fluid*/}
        {/*    selection*/}
        {/*    options={fieldCategoriesOptions}*/}
        {/*    onChange={handleFilterChange}*/}
        {/*    name="category"*/}
        {/*    value={field.filter.category}*/}
        {/*  />*/}
        {/*)}*/}

        {/*{field.filter.type === 'issueByCategory'*/}
        {/*  && (*/}
        {/*    <Checkbox*/}
        {/*      toggle*/}
        {/*      label="Display all category labels, even where no issue data exists"*/}
        {/*      checked={field.filter.isShowCategoriesWithNoIssues}*/}
        {/*      name="isShowCategoriesWithNoIssues"*/}
        {/*    />*/}
        {/*  )}*/}
      </div>
    </div>
  );
}

export default FieldDashboardInput;
