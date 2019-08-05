import React, { useState, useEffect } from "react";

import { Grid, Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import AuthHelperMethods from "../AuthHelperMethods";
import BatchItem from "./BatchItem";

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
  }, [props]);

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
      </Grid>
    </div>
  );
}
