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
  select: {
    width: "70%"
  },
  textField: {
    width: "60%"
  }
}));

export default function EditTemplateDialog(props) {
  //Material UI needs these to style and open the select form control.
  const classes = useStyles();
  const { template } = props;

  return (
    <div>
      <DialogTitle id="form-dialog-title">
        Edit Template - ID: {template.template_id}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update only the values you wish to change.
        </DialogContentText>

        <form className={classes.root} autoComplete="off">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                fullWidth
                autoFocus
                name="description"
                value={template.description}
                onChange={props.handleInputChange}
                id="description"
                label="Description"
                type="text"
              />
            </Grid>
            <Grid container item xs={12} sm={12} md={12}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  select
                  required
                  margin="dense"
                  name="discount_type"
                  value={template.discount_type}
                  onChange={props.handleInputChange}
                  className={classes.select}
                  id="discount_type"
                  label="Discount Type"
                >
                  <MenuItem value="Flat">Flat</MenuItem>
                  <MenuItem value="Percentage">Percentage</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  margin="dense"
                  name="discount"
                  value={template.discount}
                  onChange={props.handleInputChange}
                  className={classes.textField}
                  id="discount"
                  label="Discount"
                  type="text"
                />
              </Grid>
            </Grid>

            {/* final */}
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
}
