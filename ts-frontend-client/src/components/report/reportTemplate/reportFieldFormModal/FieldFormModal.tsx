import React, {useRef, useState} from 'react';
import {
  Button, Modal
} from 'semantic-ui-react';
import {fieldTypeData} from '../../../../api/hardcoded-data/FieldTypeData';
import {ReportFieldUnionType} from "../../../../config/types";
import {Form} from 'formsy-semantic-ui-react';
import FieldSelectableInput from "./FieldSelectableInput";
import FieldRecordImportInput from "./FieldRecordImportInput";
import FieldDashboardInput from "./FieldDashboardInput";
import {isUniqueName} from "../../../../config/validation";
import ErrorLabel from "../../../commonLayout/ErrorLabel";

interface Props {
  fieldIndex?: number;

  trigger: any
  onModalSubmit: (field: ReportFieldUnionType, index?: number) => void;
  injectedField?: ReportFieldUnionType;
  fieldList: ReportFieldUnionType[]
}

const fieldTypeComponents: any = {
  select: FieldSelectableInput,
  checkbox: FieldSelectableInput,
  'record-import': FieldRecordImportInput,
  dashboard: FieldDashboardInput,
};


const FieldFormModal: React.FC<Props> = ({
                                           trigger,
                                           fieldIndex = undefined,
                                           onModalSubmit,
                                           injectedField = undefined,
                                           fieldList
                                         }) => {

  const defaultField: ReportFieldUnionType = {
    name: '',
    reportFieldType: '',
    position: fieldList.length + 1,
    reportSelectableFieldOptions: [{name: ''}, {name: ''}],
    filter: {type:'', status:'', priorities:[], locations:[], categories:[]},
  }

  const [open, setOpen] = useState(false);
  const [field, setField] = useState(injectedField ?? defaultField);

  const formRef = useRef(null);

  const handleOpenModal = () => {
    setOpen(true)
    setField(injectedField ?? defaultField)
  }

  const handleFieldChange = (e: any, data: any) => {
    const { name, value } = data;

    setField((prevField) => (
      {
        ...prevField,
        [name]: value,
      }));
  };

  const handleFilterChange = (e: any, data: any) => {
    const { name, value, type, checked } = data;

    setField((prevField) => {
      // @ts-ignore
      let updatedField = { ...prevField, filter: { ...prevField.filter} }

      if(type !== 'checkbox') {
        updatedField = { ...updatedField, filter: { ...updatedField.filter, [name]: value } };
      }

      if (updatedField.filter.type !== 'issue') {
        updatedField.filter.categories = [];
        updatedField.filter.locations = [];
        updatedField.filter.priorities = [];
      } else {
        if(type === 'checkbox') {
          if(checked) {
            let updatedPriorities = [...updatedField.filter.priorities, { id: data.id, value: data.id}];

            updatedField = { ...updatedField, filter: { ...updatedField.filter, [name]: updatedPriorities } };
          } else {
            let updatedPriorities = updatedField.filter.priorities;
            updatedPriorities.splice(data.index, 1)
            updatedField = { ...updatedField, filter: { ...updatedField.filter, [name]: updatedPriorities } };
          }
        }
        if(name === 'categories') {
          updatedField.filter.categories = value.map((category: any) => ({ id: category, value: category}))
        }
        if(name === 'locations') {
          updatedField.filter.locations = value.map((location: any) => ({ id: location, value: location}))
        }
      }

      return updatedField;
    });
  };

  const handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target;
    // @ts-ignore
    const list = [...field.reportSelectableFieldOptions];
    list[index][name] = value;
    setField((prevField) => ({
      ...prevField,
      reportSelectableFieldOptions: list,
    }));
  };

  const handleRemoveItemClick = (index: number) => {
    // @ts-ignore
    const list = [...field.reportSelectableFieldOptions];
    list.splice(index, 1);
    setField((prevField) => ({
      ...prevField,
      reportSelectableFieldOptions: list,
    }));

  };

  const handleAddItemClick = () => {
    // @ts-ignore
    const list = [...field.reportSelectableFieldOptions, { name: '', sortOrder: 0 }];
    setField((prevField) => ({
      ...prevField,
      reportSelectableFieldOptions: list,
    }));
  };

  const submitFormField = (event:any) => {
    setOpen(false);
    onModalSubmit(field, fieldIndex);
  }

  const FieldSpecificInput: any = field.reportFieldType ? fieldTypeComponents[field.reportFieldType] : undefined;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => handleOpenModal()}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Save Field</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          <Form
            ref={formRef}
            // onInvalid={disableSubmitFormButton}
            // onValid={enableSubmitFormButton}
            noValidate
            onValidSubmit={submitFormField}
            id="save-field-form"
          >
            <Form.Field required>
              <label>Field Type</label>
              <Form.Dropdown
                placeholder="Select Field Type"
                fluid
                selection
                options={fieldTypeData}
                onChange={handleFieldChange}
                name="reportFieldType"
                value={ field.reportFieldType }
                required
                validationErrors={{isDefaultRequiredValue: 'Field Type is Required'}}
                errorLabel={ ErrorLabel({pointing:"above"}) }
              />
            </Form.Field>

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
                errorLabel={ ErrorLabel({pointing:"above"}) }
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
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          form="save-field-form"
          content="Save"
          onClick={(event) => {
            event.preventDefault()
            // @ts-ignore
            formRef?.current?.submit();
          }}
          positive
          // disabled={!submitFormButtonEnabled}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default FieldFormModal;
