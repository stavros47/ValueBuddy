import React from "react";

import { Button, Dialog, DialogActions, Slide } from "@material-ui/core";
import EditTemplateForm from "./EditTemplateForm";

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

export default function EditTemplateDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <EditTemplateForm
          template={props.template}
          handleInputChange={props.handleInputChange}
          handleUpdateSubmit={props.handleUpdateSubmit}
        />
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={props.handleUpdateSubmit}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
