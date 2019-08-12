import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

import CouponInstance from "./CouponInstance";

import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods("http://localhost:3001");

export default function BrowseCoupons(props) {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    Auth.fetch({
      method: "get",
      url: `http://localhost:3001/Batches`,
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
      <Typography variant="h4">Discover Coupons!</Typography>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <div>
          {batches.map(batch => (
            <CouponInstance key={batch.batch_id} batch={batch} />
          ))}
        </div>
      </Grid>
    </div>
  );
}
