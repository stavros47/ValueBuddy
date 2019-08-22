import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import BatchInstance from '../BatchInstance';
import AuthHelperMethods from '../../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

const categories = {
  Food: 1,
  Clothing: 2,
  Drinks: 3,
  Technology: 4,
  Groceries: 5,
  Coffee: 6,
};

export default function Category(props) {
  // console.log('Category props: ',props);
  const { match } = props;
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/Batches?categoryID=${categories[match.params.categoryName]}`,
      data: {},
    }).then(res => {
      if (res && res.batches) {
        console.log(res.batches);
        setBatches(res.batches);
      } else {
        console.log('There are no available coupons for this category');
      }
    });
  }, [match.params.categoryName]);

  return (
    <Grid>
      <Grid container item>
        <Grid item>
          <Tooltip title="Back">
            <IconButton aria-label="back" onClick={() => props.history.goBack()}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            {match.params.categoryName}
          </Typography>
        </Grid>
      </Grid>

      {batches.length ? (
        batches.map(batch => {
          return (
            <Link
              underline="none"
              component={RouterLink}
              to={`${match.url}/${batch.batch_id}`}
              key={batch.batch_id}>
              <Grid item>
                <BatchInstance
                  description={batch.description}
                  business_name={batch.business_name}
                  discount={batch.discount}
                  discount_type={batch.discount_type}
                  expiry_date={batch.expiry_date}
                  created_count={batch.created_count}
                  claimed_count={batch.claimed_count}
                />
              </Grid>
            </Link>
          );
        })
      ) : (
        <div>
          <Typography variant="h4" align="center">
            <strong>Too bad!</strong>
          </Typography>
          <Typography variant="h5" align="center">
            Seems like no coupons are available for {match.params.categoryName}. 😒
          </Typography>
          <Typography variant="h6" align="center">
            Check back later!
          </Typography>
        </div>
      )}
    </Grid>
  );
}
