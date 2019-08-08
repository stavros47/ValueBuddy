import React from "react";

import { Button, Dialog, DialogActions, Slide } from "@material-ui/core";
import NewTemplateForm from "./NewTemplateForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      timeout={{ enter: 15000, exit: 4000 }}
      ref={ref}
      {...props}
    />
  );
});

export default function DialogCreateTemplate(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <NewTemplateForm
          handleInputChange={props.handleInputChange}
          handleSubmit={props.handleSubmit}
          newTemplate={props.newTemplate}
        />

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={props.handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
