import React from 'react';
import {Button, Label} from 'semantic-ui-react';
import {ReportSelectableField} from "../../interfaces/reportselectablefield";
import {ReportSelectableFieldOption} from "../../interfaces/reportselectablefieldoption";
import { Form } from 'formsy-semantic-ui-react';
import {isUniqueName} from "../../config/validation";

interface Props {
  field: ReportSelectableField;
  handleRemoveItemClick: (index: number) => void;
  handleItemChange: (e: any, data: any) => void;
  handleAddItemClick: () => void;
}

const FieldSelectableInput: React.FC<Props> = ({
                                        field,
                                        handleItemChange,
                                        handleAddItemClick,
                                        handleRemoveItemClick,
                                      }) => {

  const minReportSelectableFieldOptionCount = 2
  const maxReportSelectableFieldOptionCount = 10   //@todo add for checkbox and select different max values

  return (
    <div>
      <h4>Please Add Options:</h4>
      { field.reportSelectableFieldOptions && field.reportSelectableFieldOptions.map((reportSelectableFieldOption: ReportSelectableFieldOption, index: number) => (
        <div key={index} className="box">
          <Form.Field required>
            <label>Field Option {index + 1}</label>
            <Form.Input
              name="name"
              placeholder="Enter the option value"
              value={reportSelectableFieldOption.name || ''}
              onChange={(e) => handleItemChange(e, index)}
              required
              validations={{
                isUniqueFieldOption: (values, value) => isUniqueName([...field.reportSelectableFieldOptions], value, index)
              }}
              validationErrors={{
                isDefaultRequiredValue: `Field Option ${index + 1}  is Required`,
                isUniqueFieldOption: 'Field Option Already Exists'
            }}
              errorLabel={ <Label prompt color="red" pointing="above" /> }
            />
          </Form.Field>
          <div className="btn-box">
           {index + 1 > minReportSelectableFieldOptionCount && <Button
              className="mr10"
              onClick={() => handleRemoveItemClick(index)}
            >
              Remove
            </Button>}
          </div>

          <br />
        </div>
      ))}

      { field.reportSelectableFieldOptions.length < maxReportSelectableFieldOptionCount && <Button type="button" onClick={handleAddItemClick}>Add Option</Button> }
    </div>
  );
}

export default FieldSelectableInput;
