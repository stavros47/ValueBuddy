import React, { useState, useEffect } from "react";

import { Grid, Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import AuthHelperMethods from "../AuthHelperMethods";
import BatchItem from "./BatchItem";
import DialogNewBatch from "./DialogNewBatch";

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

export default function Batches(props) {
  const classes = useStyles();
  const [batches, setBatches] = useState([]);
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [newBatch, setNewBatch] = useState({
    template_id: "",
    created_count: "",
    start_date: new Date(),
    expiry_date: new Date(),
    status_id: ""
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNewBatch({
      ...newBatch,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleClose();

    console.log(newBatch);
    // Auth.fetch({
    //   method: "post",
    //   url: `http://localhost:3001/${props.resourcePath}/Batches`,
    //   data: { ...newBatch }
    // })
    //   .then(res => {
    //     console.log(res);
    //     if (res.batch) {
    //       setBatches([...batches, res.batch[0]]);
    //       console.log("+batches:", batches);
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };

  useEffect(() => {
    Auth.fetch({
      method: "get",
      url: `http://localhost:3001/${props.resourcePath}/Batches`,
      data: {}
    })
      .then(res => {
        console.log(res.batches);
        if (res.batches) {
          setBatches(res.batches);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.resourcePath]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography className="section_title" variant="h4">
          Coupon Batches
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
        {batches.map(batch => (
          <BatchItem key={batch.batch_id} batch={batch} />
        ))}

        <DialogNewBatch
          open={open}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          newBatch={newBatch}
          templates={props.templates}
        />
      </Grid>
    </div>
  );
}
