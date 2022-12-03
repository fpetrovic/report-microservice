import React from 'react';
import {Label} from 'semantic-ui-react';
import FieldSelectableInput from './FieldSelectableInput';
import FieldFilterableInput from './FieldFilterableInput';
import FieldDashboardInput from './FieldDashboardInput';
import {ReportFieldUnionType} from "../../config/types";
import {Form} from 'formsy-semantic-ui-react';
import {isUniqueName} from "../../config/validation";


interface Props {
  field: ReportFieldUnionType;
  fieldIndex?: number
  fieldList: ReportFieldUnionType[];
  handleFieldChange: (e: any, data: any) => void;
  handleRemoveItemClick: (index: number) => void;
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
                                        fieldIndex,
                                        fieldList,
                                        handleFieldChange,
                                        handleItemChange,
                                        handleAddItemClick,
                                        handleRemoveItemClick,
                                        handleFilterChange
                     }) => {
  const FieldSpecificInput: any = field.reportFieldType ? fieldTypeComponents[field.reportFieldType] : undefined;

  return (
    <div key={field.sortOrder}>

      <Form.Field required >
        <label>Field Title </label>
        <Form.Input
          value={field.name}
          onChange={handleFieldChange}
          placeholder="Please, enter the field title"
          name="name"
          required
          validations={{ isUniqueFieldName: (values, value) => isUniqueName(fieldList, value, fieldIndex ) }}
          validationErrors={{isDefaultRequiredValue: 'Field Type is Required', isUniqueFieldName: 'Field Title already exists'}}
          errorLabel={ <Label prompt color="red" pointing="above" /> }
        />
      </Form.Field>

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
