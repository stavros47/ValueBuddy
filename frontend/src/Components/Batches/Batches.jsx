import React, { useState, useEffect } from "react";

//Material-ui components
import { Grid, Typography, Fab, Hidden } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
//Components
import BatchItem from "./BatchItem";
import DialogNewBatch from "./DialogNewBatch";

//Helpers
import AuthHelperMethods from "../AuthHelperMethods";

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

  /*
   - Dates need to be in a certain format to be acceptable by input type="date"
  */
  const [newBatch, setNewBatch] = useState({
    template_id: "",
    created_count: "",
    start_date: new Date().toISOString().substring(0, 10),
    expiry_date: new Date().toISOString().substring(0, 10),
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

      method: "post",
      url: `http://localhost:3001/${props.resourcePath}/Templates/${
        newBatch.template_id
      }/Batches`,
      data: { ...newBatch }
    })
      .then(res => {
        console.log(res);
        if (res.batch) {
          setBatches([...batches, res.batch[0]]);
          console.log("+batches:", batches);
        }
      })
      .catch(e => {
        console.log(e);
      });
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
        <Grid container item xs={12} sm={12} md={12}>
          <Grid item xs={9} md={7}>
            <Typography className="section_title" variant="h4">
              Coupon Batches
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
