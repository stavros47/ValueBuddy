import React from "react";

import {
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  dialog: {
    minWidth: "80vh"
  }
}));

export default function NewTemplateForm(props) {
  //Material UI needs these to style and open the select form control.
  const classes = useStyles();

  return (
    <div>
      <DialogTitle id="form-dialog-title">New Template</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialog}>
          Create a new Coupon Template.
        </DialogContentText>
        <form className={classes.root} autoComplete="off">
          <TextField
            required
            fullWidth
            autoFocus
            margin="dense"
            name="description"
            value={props.newTemplate.description}
            onChange={props.handleInputChange}
            id="description"
            label="Description"
            type="text"
          />
          <TextField
            select
            style={{ width: "25%" }}
            required
            margin="dense"
            name="discount_type"
            value={props.newTemplate.discount_type}
            onChange={props.handleInputChange}
            id="discount_type"
            label="Discount Type"
          >
            <MenuItem value="Flat">Flat</MenuItem>
            <MenuItem value="Percentage">Percentage</MenuItem>
          </TextField>
          <TextField
            required
            margin="dense"
            name="discount"
            value={props.newTemplate.discount}
            onChange={props.handleInputChange}
            id="discount"
            label="Discount"
            type="text"
          />
        </form>
      </DialogContent>
    </div>
  );
}
