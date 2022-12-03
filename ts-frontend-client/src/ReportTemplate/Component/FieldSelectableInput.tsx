import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import {ReportField} from "../../interfaces/reportfield";

interface Props {
  field: ReportField;
  handleRemoveItemClick: (e: any, data: any) => void;
  handleItemChange: (e: any, data: any) => void;
  handleAddItemClick: () => void;
}

const FieldSelectableInput: React.FC<Props> = ({
                                        field,
                                        handleItemChange,
                                        handleAddItemClick,
                                        handleRemoveItemClick,
                                      }) => {
  return (
    <div>
      <h4>Please Add Options:</h4>
      {/*{ field.options.map((x, i) => (*/}
      {/*  <div className="box">*/}
      {/*    <Input*/}
      {/*      name="title"*/}
      {/*      placeholder="Enter the option value"*/}
      {/*      value={x.title}*/}
      {/*      onChange={(e) => handleItemChange(e, i)}*/}
      {/*    />*/}
      {/*    <div className="btn-box">*/}
      {/*      <Button*/}
      {/*        className="mr10"*/}
      {/*        onClick={() => handleRemoveItemClick(i)}*/}
      {/*      >*/}
      {/*        Remove*/}
      {/*      </Button>*/}
      {/*    </div>*/}

      {/*    <br />*/}
      {/*  </div>*/}
      {/*))}*/}

      <Button onClick={handleAddItemClick}>Add Option</Button>
    </div>
  );
}

export default FieldSelectableInput;
