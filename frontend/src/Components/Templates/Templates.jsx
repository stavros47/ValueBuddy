import React, { useState } from "react";

import { Grid, Typography, Fab, Hidden } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import TemplateItem from "./TemplateItem";
import DialogCreateTemplate from "./DialogCreateTemplate";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    float: "right"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Templates(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [newTemplate, setNewTemplate] = useState({
    description: "",
    discount_type: "",
    discount: ""
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNewTemplate({
      ...newTemplate,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.createTemplate(newTemplate);
    handleClose();
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid container item xs={12} sm={12} md={12}>
          <Grid item xs={9} md={7}>
            <Typography className="section_title" variant="h4">
              Coupon Templates
            </Typography>
          </Grid>
          <Grid item xs={3} md={5}>
            <Hidden smDown>
              <Fab
                onClick={handleClickOpen}
                color="primary"
                variant="extended"
                aria-label="create"
                className={classes.fab}
              >
                <AddIcon className={classes.extendedIcon} />
                Create
              </Fab>
            </Hidden>
            <Hidden mdUp>
              <Fab
                onClick={handleClickOpen}
                color="primary"
                aria-label="create"
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Hidden>
          </Grid>
        </Grid>
        {props.templates.map((template, index) => (
          <TemplateItem
            key={template.template_id || index}
            template={template}
          />
        ))}
        <DialogCreateTemplate
          open={open}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          newTemplate={newTemplate}
        />
      </Grid>
    </div>
  );
}
