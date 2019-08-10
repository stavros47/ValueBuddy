import React from "react";

import {
  Grid,
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
  },
  datePicker: {
    marginTop: "15px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function NewBatchForm(props) {
  //Material UI needs these to style and open the select form control.
  const classes = useStyles();
  // const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div>
      <DialogTitle id="form-dialog-title">New Batch</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.test}>
          Create a new Coupon Batch.
        </DialogContentText>
        <form className={classes.dialog} autoComplete="off">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={4}
          >
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                select
                required
                fullWidth
                margin="dense"
                name="template_id"
                value={props.newBatch.template_id}
                onChange={props.handleInputChange}
                id="template_id"
                label="Template"
              >
                {props.templates.map(template => {
                  return (
                    <MenuItem
                      key={template.template_id}
                      name={template.template_id}
                      value={template.template_id.toString()}
                    >
                      {template.description}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <TextField
              name="start_date"
              value={props.newBatch.start_date}
              onChange={props.handleInputChange}
              label="Start Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              name="expiry_date"
              value={props.newBatch.expiry_date}
              onChange={props.handleInputChange}
              label="Expiry Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              required
              margin="dense"
              name="created_count"
              value={props.newBatch.created_count}
              onChange={props.handleInputChange}
              id="created_count"
              label="Count"
              type="text"
            />
            <TextField
              select
              required
              style={{ width: "100px" }}
              margin="dense"
              name="status_id"
              value={props.newBatch.status_id}
              onChange={props.handleInputChange}
              id="status_id"
              label="Status"
            >
              <MenuItem selected value={4}>
                Inactive
              </MenuItem>
              <MenuItem value={"1"}>Active</MenuItem>
              <MenuItem value={"2"}>Expired</MenuItem>
              <MenuItem value={"3"}>Disabled</MenuItem>
            </TextField>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
}
