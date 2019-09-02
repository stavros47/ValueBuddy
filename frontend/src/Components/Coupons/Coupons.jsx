import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

// import CouponItem from "./CouponItem";
import BatchInstance from '../Batches/BatchInstance';
import Select from 'react-select';

import AuthHelperMethods from '../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

export default function Coupons(props) {
  const [coupons, setCoupons] = useState([]);
  const { match, resourcePath } = props;
  const [selectedStatus, setSelectedStatus] = useState({ label: 'Valid', value: 1 });
  const [redeemedOption, setRedeemedOption] = useState({ label: 'No', value: false });
  const [selectedCategory, setSelectedCategory] = useState({ label: 'Food', value: 1 });
  const [selectedSort, setSelectedSort] = useState({
    label: 'Expiry Date Asc',
    value: { field: 'expiry_date', asc: true },
  });

  const statusOptions = [{ label: 'Valid', value: 1 }, { label: 'Expired', value: 2 }];

  const handleStatusChange = selectedOption => {
    setSelectedStatus(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const redeemedOptions = [{ label: 'Yes', value: true }, { label: 'No', value: false }];

  const handleRedeemChange = selectedOption => {
    setRedeemedOption(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const sortOptions = [
    { label: 'Start Date Asc', value: { field: 'start_date', asc: true } },
    { label: 'Start Date Desc', value: { field: 'start_date', asc: false } },
    { label: 'Expiry Date Asc', value: { field: 'expiry_date', asc: true } },
    { label: 'Expiry Date Desc', value: { field: 'expiry_date', asc: false } },
    { label: 'Business Asc', value: { field: 'business_name', asc: true } },
    { label: 'Business Desc', value: { field: 'business_name', asc: false } },
  ];

  const handleSortChange = selectedOption => {
    setSelectedSort(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const categoryOptions = [
    { label: 'Food', value: 1 },
    { label: 'Clothing', value: 2 },
    { label: 'Drinks', value: 3 },
    { label: 'Technology', value: 4 },
    { label: 'Groceries', value: 5 },
    { label: 'Coffee', value: 6 },
  ];

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  useEffect(() => {
    let status = selectedStatus.value ? selectedStatus.value : 1;
    let redeemed = redeemedOption.value ? redeemedOption.value : false;
    let category = selectedCategory.value ? selectedCategory.value : '1';
    let orderBy = selectedSort.value.field ? selectedSort.value.field : 'customer_name';
    let isAsc = selectedSort.value ? selectedSort.value.asc : true;
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Coupons?category_id=${selectedCategory.value}&status_id=${status}&sortBy=${orderBy}&redeemed=${redeemed}&isAsc=${isAsc}`,
      data: {},
    })
      .then(res => {
        if (res && res.coupons) {
          console.log(res.coupons);
          setCoupons(res.coupons);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [resourcePath, selectedStatus, redeemedOption, selectedCategory, selectedSort]);

  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Typography className="section_title" variant="h4">
          Coupons
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
          <Grid item xs={12}>
            Sort By:
            <Select value={selectedSort} onChange={handleSortChange} options={sortOptions}></Select>
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
