import React, { useState, useEffect } from "react";

import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods("http://localhost:3001");
export default function CouponPage(props) {
  const [batch, setBatch] = useState({});

  useEffect(() => {
    Auth.fetch({
      method: "get",
      url: `http://localhost:3001/Batches/${props.match.params.batchID}`,
      data: {}
    }).then(res => {
      if (res && res.batch) {
        console.log(res.batch);
        setBatch(res.batch);
      } else {
        console.log("Not Found");
      }
    });
  }, [props.match.params.batchID]);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid container item>
        <Grid item>
          <Tooltip title="Back">
            <IconButton
              aria-label="back"
              onClick={() => props.history.goBack()}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant="h4">Coupon Page</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
