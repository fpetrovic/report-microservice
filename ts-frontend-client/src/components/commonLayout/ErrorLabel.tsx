import {Label} from "semantic-ui-react";

const ErrorLabel = (props?: { pointing:  boolean | "above" | "below" | "left" | "right" | undefined}): JSX.Element =>
  ( <Label prompt color="red" pointing={props?.pointing}></Label> )

ErrorLabel.defaultValues = {
  props: {pointing: 'left'}
}
export default ErrorLabel
