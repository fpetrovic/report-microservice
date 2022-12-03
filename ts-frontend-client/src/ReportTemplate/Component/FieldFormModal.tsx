import React, { useState } from 'react';
import {
  Button, Dropdown, Modal,
} from 'semantic-ui-react';
import FieldInputs from './FieldInputs';
import {fieldTypeData} from '../Data/FieldTypeData';
import {ReportField} from "../../interfaces/reportfield";

interface Props {
  fieldIndex?: number;
  onModalSubmit: (field: ReportField, index?: number) => void;
  injectedField?: ReportField;
  fieldList: ReportField[]
}

const FieldFormModal: React.FC<Props> = ({
                                           fieldIndex = undefined,
                                           onModalSubmit,
                                           injectedField = undefined,
                                           fieldList
                                         }) => {

  const defaultField: ReportField = {
    name: '',
    reportFieldType: '',
    sortOrder: 0,
    value:''
  }

  const [open, setOpen] = useState(false);
  const [field, setField] = useState(injectedField ?? defaultField);

  const sortOrder = fieldIndex !== null ? field.sortOrder : fieldList.length + 1;

  const handleFieldChange = (e: any, data: any) => {
    const { name, value } = data;

    setField((prevField) => (
      {
        ...prevField,
        [name]: value,
        sortOrder,
      }));
  };

  const handleFilterChange = (e: any, data: any) => {
    const { name, value } = data;

    setField((prevField) => {
      const updatedField = { ...prevField };
      // const updatedField = { ...prevField, filter: { ...prevField.filter, [name]: value } };
      // if (updatedField.filter.type !== 'issue') {
      //   updatedField.filter.categories = [];
      //   updatedField.filter.locations = [];
      //   updatedField.filter.priorities = [];
      // }

      return updatedField;
    });
  };

  const handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target;
    // const list = [...field.options];
    // list[index][name] = value;
    setField((prevField) => ({
      ...prevField,
      // options: list,
    }));
  };

  const handleRemoveItemClick = (index: number) => {
    // const list = [...field.options];
    // list.splice(index, 1);
    setField((prevField) => ({
      ...prevField,
      // options: list,
    }));

    // reset sort order!
  };

  const handleAddItemClick = () => {
    // const list = [...field.options, { id: 0, title: '', sortOrder: 0 }];
    setField((prevField) => ({
      ...prevField,
      // options: list,
    }));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Save Field</Button>}
    >
      <Modal.Header>Save Field</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          <p>
            This is a demo of component based app and its simplicity.
          </p>
          <h4>Field Type: </h4>
          <Dropdown
            placeholder="Select Field Type"
            fluid
            selection
            options={fieldTypeData}
            onChange={handleFieldChange}
            name="type"
            value={ field.reportFieldType }
          />
          <br />
          {' '}
          {/* Handle this with the css */}

          <FieldInputs
            field={field}
            handleFieldChange={handleFieldChange}
            handleItemChange={handleItemChange}
            handleRemoveItemClick={handleRemoveItemClick}
            handleAddItemClick={handleAddItemClick}
            handleFilterChange={handleFilterChange}
          />

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          onClick={() => {
            setOpen(false);
            onModalSubmit(field, fieldIndex);
            setField(defaultField)
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default FieldFormModal;
