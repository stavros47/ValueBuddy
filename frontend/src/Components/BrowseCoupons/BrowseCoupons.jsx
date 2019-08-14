import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Restaurant from "@material-ui/icons/Restaurant";
import LocalMall from "@material-ui/icons/LocalMall";
import LocalBar from "@material-ui/icons/LocalBar";
import Memory from "@material-ui/icons/Memory";
import LocalGroceryStore from "@material-ui/icons/LocalGroceryStore";
import LocalCafe from "@material-ui/icons/LocalCafe";

const useStyles = makeStyles(theme => ({
  paper: {},
  icon: {
    fontSize: 215,
    [theme.breakpoints.down("sm")]: {
      fontSize: 100
    }
  }
}));

export default function BrowseCoupons(props) {
  const classes = useStyles();

  const categories = [
    {
      name: "Food",
      href: "/Food",
      icon: <Restaurant className={classes.icon} />,
      id: 1
    },
    {
      name: "Clothing",
      href: "/Clothing",
      icon: <LocalMall className={classes.icon} />,
      id: 2
    },
    {
      name: "Drinks",
      href: "/Drinks",
      icon: <LocalBar className={classes.icon} />,
      id: 3
    },
    {
      name: "Technology",
      href: "/Technology",
      icon: <Memory className={classes.icon} />,
      id: 4
    },
    {
      name: "Groceries",
      href: "/Groceries",
      icon: <LocalGroceryStore className={classes.icon} />,
      id: 5
    },

    {
      name: "Coffee",
      href: "/Coffee",
      icon: <LocalCafe className={classes.icon} />,
      id: 6
    }
  ];

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid
          container
          item
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              Discover Coupons
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="subtitle1">
              by Category:
            </Typography>
          </Grid>
        </Grid>
        {categories.map(category => {
          return (
            <Grid item xs={4} md={2} key={category.id}>
              <Link
                component={RouterLink}
                to={{
                  pathname: `${props.match.url}${category.href}`,
                  state: { categoryID: category.id }
                }}
              >
                <Paper elevation={3} className={classes.paper}>
                  {category.icon}
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    {category.name}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
