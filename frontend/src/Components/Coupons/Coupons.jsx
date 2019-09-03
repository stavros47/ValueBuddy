import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/*Styled components*/
import Select from 'react-select';
import { Grid, Typography } from '@material-ui/core';
import BatchInstance from '../Batches/BatchInstance';

import AuthHelperMethods from '../AuthHelperMethods';
const Auth = new AuthHelperMethods('http://localhost:3001');

export default function Coupons(props) {
  const [coupons, setCoupons] = useState([]);
  const { match, resourcePath } = props;

  /*Sort & Filters states: */
  const [selectedStatus, setSelectedStatus] = useState({ label: 'Valid', value: 1 });
  const [redeemedOption, setRedeemedOption] = useState({ label: 'No', value: false });
  const [selectedCategory, setSelectedCategory] = useState({ label: 'Food', value: 1 });
  const [selectedSort, setSelectedSort] = useState({
    label: 'Expiry Date',
    value: 'expiry_date',
  });
  const [selectedAsc, setSelectedAsc] = useState({ label: 'Desc', value: false });

  /*Available options for sort & filters */
  const statusOptions = [{ label: 'Valid', value: 1 }, { label: 'Expired', value: 2 }];
  const redeemedOptions = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
  const categoryOptions = [
    { label: 'Food', value: 1 },
    { label: 'Clothing', value: 2 },
    { label: 'Drinks', value: 3 },
    { label: 'Technology', value: 4 },
    { label: 'Groceries', value: 5 },
    { label: 'Coffee', value: 6 },
  ];
  const sortOptions = [
    { label: 'Start Date', value: 'start_date' },
    { label: 'Expiry Date', value: 'expiry_date' },
    { label: 'Business', value: 'business_name' },
    { label: 'Date Used', value: 'date_used' },
  ];
  const directionOptions = [{ label: 'Asc', value: true }, { label: 'Desc', value: false }];

  /*Handlers for Filters & Sort changes */
  const handleStatusChange = selectedOption => {
    setSelectedStatus(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const handleRedeemChange = selectedOption => {
    setRedeemedOption(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const handleSortChange = selectedOption => {
    setSelectedSort(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const handleDirectionChange = selectedOption => {
    setSelectedAsc(selectedOption);
    //console.log(`dir selected:`, selectedOption.value);
  };

  useEffect(() => {
    /*If any filter has no value use a default value*/
    let status = selectedStatus ? selectedStatus.value : 1;
    let redeemed = redeemedOption ? redeemedOption.value : false;
    let category = selectedCategory ? selectedCategory.value : '1';
    let orderBy = selectedSort ? selectedSort.value : 'customer_name';
    let isAsc = selectedAsc ? selectedAsc.value : true;

    /*Get the coupons according to the filters and sort selected */
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Coupons?category_id=${category}&status_id=${status}&sortBy=${orderBy}&redeemed=${redeemed}&isAsc=${isAsc}`,
      data: {},
      validateStatus: function(status) {
        return (status = 404);
      },
    })
      .then(res => {
        if (res && res.coupons) {
          console.log(res);
          setCoupons(res.coupons);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [resourcePath, selectedStatus, redeemedOption, selectedCategory, selectedSort, selectedAsc]);

  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography className="section_title" variant="h4">
          My Coupons
        </Typography>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justify="space-between"
          alignItems="baseline"
          spacing={1}>
          <Grid item xs={4}>
            Status:
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              options={statusOptions}></Select>
          </Grid>
          <Grid item xs={3}>
            Redeemed:
            <Select
              value={redeemedOption}
              onChange={handleRedeemChange}
              options={redeemedOptions}></Select>
          </Grid>
          <Grid item xs={5}>
            Category:
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categoryOptions}></Select>
          </Grid>
          <Grid item xs={7}>
            Sort By:
            <Select value={selectedSort} onChange={handleSortChange} options={sortOptions}></Select>
          </Grid>
          <Grid item xs={5}>
            Direction:
            <Select
              value={selectedAsc}
              onChange={handleDirectionChange}
              options={directionOptions}></Select>
          </Grid>
        </Grid>
        {coupons.map(coupon => (
          <Grid item key={coupon.coupon_id}>
            <RouterLink to={`${match.url}/${coupon.coupon_id}`}>
              <BatchInstance
                description={coupon.description}
                business_name={coupon.business_name}
                discount={coupon.discount}
                discount_type={coupon.discount_type}
                expiry_date={coupon.expiry_date}
              />
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
