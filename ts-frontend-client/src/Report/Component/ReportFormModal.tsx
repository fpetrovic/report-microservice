import React, { useState } from 'react';
import {
  Button, Dropdown, Icon, Modal,
} from 'semantic-ui-react';

interface Props {
  onReportGenerateFromTemplateModalSubmit: (reportGeneratedFromTemplate: any) => void;

}

const ReportFormModal: React.FC<Props> = ({
                                            onReportGenerateFromTemplateModalSubmit,
                                         }) => {

  // @ts-ignore
  const defaultReport: any = {
    config: '',
    reportTemplateToGenerateFrom: ''
  }

  const [open, setOpen] = useState(false);
  const [reportGeneratedFromTemplate, setReportGeneratedFromTemplate] = useState(defaultReport);



  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Wannabe Generate Report From Report Template (backend works)</Button>}
    >
      <Modal.Header>Generate Report From Report Template</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Dropdown
            placeholder="Select Report Template"
            fluid
            selection
            options={[]}
            name="reportTemplateToGenerateFrom"
            value={ defaultReport.reportTemplateToGenerateFrom }
            label={"Report Template"}
          />
          <br />

          <p><Icon name="info"></Icon>You can only select logs that you have been assigned to</p>

          <Dropdown
            placeholder="Select Logs"
            fluid
            selection
            options={[]}
            name="logs"
            value={ defaultReport.config.logs }
            label={"Logs"}
          />

          <p>or</p>

          <p>Wannabe date fields live here</p>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Wannabe Create"
          onClick={() => {
            setOpen(false);
            onReportGenerateFromTemplateModalSubmit(reportGeneratedFromTemplate);
            setReportGeneratedFromTemplate(defaultReport)
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ReportFormModal;
