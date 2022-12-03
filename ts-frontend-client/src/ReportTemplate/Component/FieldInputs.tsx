import React from 'react';
import { Input } from 'semantic-ui-react';
import FieldSelectableInput from './FieldSelectableInput';
import FieldFilterableInput from './FieldFilterableInput';
import FieldDashboardInput from './FieldDashboardInput';
import {ReportField} from "../../interfaces/reportfield";

interface Props {
  field: ReportField;
  handleFieldChange: (e: any, data: any) => void;
  handleRemoveItemClick: (e: any, data: any) => void;
  handleItemChange: (e: any, data: any) => void;

  handleAddItemClick: () => void;
  handleFilterChange: (e: any, data: any) => void;
}

const fieldTypeComponents: any = {
  select: FieldSelectableInput,
  checkbox: FieldSelectableInput,
  'record-import': FieldFilterableInput,
  dashboard: FieldDashboardInput,
};

const FieldInputs: React.FC<Props> = ({
                                        field,
                                        handleFieldChange,
                                        handleItemChange,
                                        handleAddItemClick,
                                        handleRemoveItemClick,
                                        handleFilterChange
                     }) => {

  const FieldSpecificInput: any = fieldTypeComponents[field.reportFieldType];

  return (
    <div>
      <h4>Field Title</h4>
      <Input value={field.name} onChange={handleFieldChange} placeholder="Please, enter the field title" name="title" />
      <br />
      <br />
      {FieldSpecificInput && (
        <FieldSpecificInput
          field={field}
          handleItemChange={handleItemChange}
          handleRemoveItemClick={handleRemoveItemClick}
          handleAddItemClick={handleAddItemClick}
          handleFilterChange={handleFilterChange}
        />
      )}
      <br />
    </div>
  );
}

export default FieldInputs;
