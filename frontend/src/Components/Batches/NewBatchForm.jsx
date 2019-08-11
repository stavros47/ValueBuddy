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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  datepick: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150
  },
  descr: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
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
        <DialogContentText>Create a new Coupon Batch.</DialogContentText>
        <form className={classes.root} autoComplete="off">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
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
                className={classes.descr}
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
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
              item
              xs={12}
              sm={12}
              md={12}
            >
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  name="start_date"
                  value={props.newBatch.start_date}
                  onChange={props.handleInputChange}
                  label="Start Date"
                  type="date"
                  className={classes.datepick}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  name="expiry_date"
                  value={props.newBatch.expiry_date}
                  onChange={props.handleInputChange}
                  label="Expiry Date"
                  type="date"
                  className={classes.datepick}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} md={12}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  margin="dense"
                  name="created_count"
                  value={props.newBatch.created_count}
                  onChange={props.handleInputChange}
                  className={classes.textField}
                  id="created_count"
                  label="Count"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  select
                  required
                  margin="dense"
                  name="status_id"
                  value={props.newBatch.status_id}
                  onChange={props.handleInputChange}
                  className={classes.textField}
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
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
}
