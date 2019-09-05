import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const options = {
  legend: {
    display: true,
  },
  responsive: true,
  maintainAspectRatio: false,
  cutoutPercentage: 60,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
  },
};

export default function CouponActivity(props) {
  const classes = useStyles();
  const { couponData } = props;

  const sumData = objectArray => {
    let results = { claimed: 0, redeemed: 0 };
    objectArray.forEach(element => {
      results.claimed += element.coupons_claimed;
      results.redeemed += element.coupons_redeemed;
    });
    return results;
  };
  let dataResults = sumData(couponData);

  const data = {
    labels: ['Claimed', 'Redeemed'],
    datasets: [
      {
        data: [dataResults.claimed, dataResults.redeemed],
        backgroundColor: ['orange', 'darkgreen'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Card className={classes.card} raised>
      <CardHeader title="Coupon Usage" />
      <CardContent>
        <Doughnut data={data} options={options} />
      </CardContent>
    </Card>
  );
}
