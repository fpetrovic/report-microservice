import React, {useRef, useState} from 'react';
import {
  Button, Label, Modal
} from 'semantic-ui-react';
import FieldInputs from './FieldInputs';
import {fieldTypeData} from '../Data/FieldTypeData';
import {ReportFieldUnionType} from "../../config/types";
import {Form} from 'formsy-semantic-ui-react';
import {isUniqueName} from "../../config/validation";
import {ReportSection} from "../../interfaces/reportsection";

interface Props {
  trigger:any
  injectedSection: ReportSection;
  sectionIndex: number;
  sectionList?: ReportSection[]
  handleSectionChange: any
  onModalSubmit: any
}

const FieldFormModal: React.FC<Props> = ({
                                           trigger,
                                           injectedSection,
                                           sectionIndex,
                                           sectionList,
                                           handleSectionChange,
                                           onModalSubmit
                                         }) => {
  const [open, setOpen] = useState(false);
  const [editingSectionTitle, setEditingSectionTitle] = useState(injectedSection.name);

  const formRef = useRef(null);

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleEditSectionTitle = (e: any, data: any) => {
    const { name, value } = data;
    setEditingSectionTitle(value)
  }

  const submitSectionForm = (event:any) => {

    setOpen(false);
    onModalSubmit(editingSectionTitle, sectionIndex);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => handleOpenModal()}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Edit Section Title</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          <Form
            ref={formRef}
            // onInvalid={disableSubmitFormButton}
            // onValid={enableSubmitFormButton}
            noValidate
            onValidSubmit={submitSectionForm}
            id="save-section-form"
          >
            <Form.Field required >
              <label>Section Title </label>
              <Form.Input
                value={editingSectionTitle}
                placeholder="Please, enter the section title"
                onChange={handleEditSectionTitle}
                name="name"
                required
                validations={{ isUniqueFieldName: (values, value) => isUniqueName(sectionList ?? [], value, sectionIndex ) }}
                validationErrors={{isDefaultRequiredValue: 'Section Title is Required', isUniqueFieldName: 'Section Title already exists'}}
                errorLabel={ <Label prompt color="red" pointing="above" /> }
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          form="save-section-form"
          content="Save"
          onClick={(event) => {
            event.preventDefault()
            // @ts-ignore
            formRef?.current?.submit();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default FieldFormModal;
