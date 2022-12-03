import {Label} from "semantic-ui-react";

function ErrorLabel (props: { pointing:  boolean | "above" | "below" | "left" | "right" | undefined}) {
  return (
    <Label prompt color="red" pointing={props.pointing}></Label>
  )
}

/*@todo it does not recieve the error message defined in formsy prop */

export default ErrorLabel
