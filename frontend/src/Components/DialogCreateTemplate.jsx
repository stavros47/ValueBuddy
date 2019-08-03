import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" timeout={{enter:15000, exit:4000}} ref={ref} {...props} />;
});

export default function DialogCreateTemplate(props) {
 
  return (
    <div>      
      <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new Coupon Template.
          </DialogContentText>
          <TextField  autoFocus margin="dense" name='description' value={props.newTemplate.description} onChange={props.handleInputChange} id="description" label="Description" type="text" fullWidth/>
          <TextField  margin="dense" name='discount_type' value={props.newTemplate.discount_type} onChange={props.handleInputChange} id="discount_type" label="Discount Type" type="text" fullWidth />
          <TextField  margin="dense" name='discount' value={props.newTemplate.discount} onChange={props.handleInputChange} id="discount" label="Discount" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit"  onClick={props.handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}