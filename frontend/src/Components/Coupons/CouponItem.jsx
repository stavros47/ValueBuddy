import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

/*The actual Batch Item*/
export default function CouponItem(props) {
  const { coupon } = props;

  return (
    <Grid item xs={12} sm={12} md={12} zeroMinWidth>
      <Card className="batch_card coupon" id={coupon.coupon_id}>
        <CardHeader
          title={coupon.description}
          subheader={`By: ${coupon.business_name}`}
          className="card-header"
        />

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="card_content"
          spacing={0}
        >
          <Grid item xs={12} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Owner:{" "}
              <span style={{ display: "block" }}>{coupon.customer_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Category:{" "}
              <span style={{ display: "block" }}>{coupon.coupon_type}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Starts:{" "}
              <span style={{ display: "block" }}>
                {coupon.start_date.split("T")[0]}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Expires:{" "}
              <span style={{ display: "block" }}>
                {coupon.expiry_date.split("T")[0]}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
