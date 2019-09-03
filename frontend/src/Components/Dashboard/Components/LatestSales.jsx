import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  //   action={
  //     <Button size="small" variant="text">
  //       Last 7 days <ArrowDropDownIcon />
  //     </Button>
  //   }
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Coupon Activity" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default LatestSales;
