import React, { useState, useEffect } from "react";

import { Grid, Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import AuthHelperMethods from "../AuthHelperMethods";
import TemplateItem from "./TemplateItem";
import DialogCreateTemplate from "./DialogCreateTemplate";

const Auth = new AuthHelperMethods("http://localhost:3001");

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

  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    Auth.fetch({
      method: "get",
      url: `http://localhost:3001/${props.resourcePath}/Templates`,
      data: {}
    })
      .then(res => {
        console.log(res.templates);
        if (res.templates) {
          setTemplates(res.templates);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [props]);

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
    handleClose();

    Auth.fetch({
      method: "post",
      url: `http://localhost:3001/${props.resourcePath}/Templates`,
      data: { ...newTemplate }
    })
      .then(res => {
        console.log(res);
        if (res.template) {
          setTemplates([...templates, res.template[0]]);
          console.log("templates!!", templates);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography className="section_title" variant="h4">
          Coupon Templates
        </Typography>
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

        {templates.map((template, index) => (
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
