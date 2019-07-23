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

export default function EditTemplateDialog(props) {
  const {template} = props;

  return (
    <div>      
      <Dialog open={props.open} onClose={props.handleCloseEdit} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Template - ID: {template.template_id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update only the values you wish to change.
          </DialogContentText>
          <TextField   defaultValue={template.description} autoFocus margin="dense" id="description" label="Description" type="text" fullWidth placeholder={template.description}/>
          <TextField   defaultValue={template.discount_type} margin="dense" id="discount_type" label="Discount Type" type="text" fullWidth />
          <TextField   defaultValue={template.discount} margin="dense" id="discount" label="Discount" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleCloseEdit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}