import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="left"
      timeout={{ enter: 15000, exit: 4000 }}
      ref={ref}
      {...props}
    />
  );
});

export default function DeleteDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleCloseDeleteDialog}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete {props.item.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to <strong>delete</strong> {props.item.name}:{" "}
            {props.item.id} . Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleCloseDeleteDialog} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
