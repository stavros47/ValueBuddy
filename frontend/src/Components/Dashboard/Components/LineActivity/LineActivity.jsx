import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

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
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
  },
};

export default function BatchActivity(props) {
  const classes = useStyles();

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Batches Created',
        fill: false,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
      },
    ],
  };
  return (
    <Card className={classes.card} raised>
      <CardHeader title="New Batch Activity" subheader="Created batches per month" />
      <CardContent>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
