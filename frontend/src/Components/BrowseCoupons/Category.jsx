import React, { useState, useEffect } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CouponInstance from "./CouponInstance";
import AuthHelperMethods from "../AuthHelperMethods";

const Auth = new AuthHelperMethods("http://localhost:3001");

export default function Category(props) {
  console.log(props);
  const { match, location } = props;
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    Auth.fetch({
      method: "get",
      url: `http://localhost:3001/Batches?categoryID=${
        location.state.categoryID
      }`,
      data: {}
    }).then(res => {
      if (res && res.batches) {
        console.log(res.batches);
        setBatches(res.batches);
      } else {
        console.log("There are no available coupons for this category");
      }
    });
  }, [location.state.categoryID]);

  return (
    <Grid>
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
          <Typography variant="h4">{match.params.categoryName}</Typography>
        </Grid>
      </Grid>

      {batches.map(batch => {
        return (
          <Grid item key={batch.batch_id}>
            <CouponInstance batch={batch} />
          </Grid>
        );
      })}
    </Grid>
  );
}
