import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';

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
  animation: {
    duration: 2500,
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
  },
};

export default function FavouritePie(props) {
  const classes = useStyles();

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: ['#FF4500', '#36A2EB', '#FFCE56', '#8B4513', '#00FF00'],
        hoverBackgroundColor: ['#FF6347', '#36A2EB', '#FFCE56', '#800000', '#006400'],
      },
    ],
  };
  return (
    <Card className={classes.card} raised>
      <CardHeader title="Favourites" subheader="Favourite Coupons by Business" />
      <CardContent>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  );
}
