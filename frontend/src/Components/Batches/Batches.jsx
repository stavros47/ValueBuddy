import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//Material-ui components
import { Grid, Typography, Fab, Hidden } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
//Components
// import BatchItem from './BatchItem';
import BatchInstance from './BatchInstance';
import DialogNewBatch from './DialogNewBatch';

import SortFilterBatches from './SortFilterBatches';

//Helpers
import AuthHelperMethods from '../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    float: 'right',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Batches(props) {
  const classes = useStyles();
  const { resourcePath, templates, match, currentUser } = props;

  const [batches, setBatches] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [selectedStatus, setSelectedStatus] = useState({ label: 'All', value: '3' });
  const [selectedType, setSelectedType] = useState({ label: 'All', value: 'All' });
  const [selectedSort, setSelectedSort] = useState({ label: 'Expiry date', value: 'expiry_date' });
  const [sortDirection, setSortDirection] = useState({ label: 'Desc', value: false });

  const sortOptions = [
    { label: 'Start date', value: 'start_date' },
    { label: 'Expiry date', value: 'expiry_date' },
    { label: 'Created Count', value: 'created_count' },
    { label: 'Claimed Count', value: 'claimed_count' },
    { label: 'Redeemed Count', value: 'redeemed_count' },
  ];

  const dirOptions = [{ label: 'Asc', value: true }, { label: 'Desc', value: false }];

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Expired', value: 'Expired' },
    { label: 'All', value: 'All' },
  ];

  const typeOptions = [
    { label: 'All', value: 'All' },
    { label: 'Percentage', value: 'Percentage' },
    { label: 'Flat', value: 'Flat' },
  ];

  const handleSortChange = selectedOption => {
    setSelectedSort(selectedOption);
    //console.log(`Sort selected:`, selectedOption);
  };

  const handleSortDirChange = selectedOption => {
    setSortDirection(selectedOption);
    //console.log(`direction selected:`, selectedOption);
  };

  const handleStatusChange = selectedOption => {
    setSelectedStatus(selectedOption);
    //console.log(`Status selected:`, selectedOption);
  };

  const handleTypeChange = selectedOption => {
    setSelectedType(selectedOption);
    //console.log(`Type selected:`, selectedOption);
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    resetState();
  }
  /*
   - Dates need to be in a certain format to be acceptable by input type="date"
  */
  const getInitialState = () => {
    return {
      template_id: '',
      created_count: '',
      start_date: new Date().toISOString().substring(0, 10),
      expiry_date: new Date().toISOString().substring(0, 10),
      status_id: '',
    };
  };

  const resetState = () => {
    setNewBatch(getInitialState);
  };

  const [newBatch, setNewBatch] = useState(getInitialState);

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewBatch({
      ...newBatch,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setOpen(false);
    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/${resourcePath}/Templates/${newBatch.template_id}/Batches`,
      data: { ...newBatch },
    }).then(res => {
      if (res && res.batch) {
        console.log('ress', res);
        setBatches([...batches, res.batch[0]]);
        console.log('+batches:', batches);
      }
    });
    resetState();
  };

  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Batches?sortBy=${selectedSort.value}&isAsc=${sortDirection.value}&status=${selectedStatus.value}&type=${selectedType.value}`,
      data: {},
    }).then(res => {
      console.log(res.batches);
      if (res.batches) {
        setBatches(res.batches);
      }
    });
  }, [resourcePath, selectedSort, sortDirection, selectedStatus, selectedType]);

  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
        <Grid container item xs={12} sm={12} md={12}>
          <Grid item xs={9} md={7}>
            <Typography className="section_title" variant="h4">
              Coupon Batches
            </Typography>
          </Grid>
          <Grid item xs={3} md={5}>
            <Hidden smDown>
              <Fab
                onClick={handleClickOpen}
                color="primary"
                variant="extended"
                aria-label="create"
                className={classes.fab}>
                <AddIcon className={classes.extendedIcon} />
                Create
              </Fab>
            </Hidden>
            <Hidden mdUp>
              <Fab
                onClick={handleClickOpen}
                color="primary"
                aria-label="create"
                className={classes.fab}>
                <AddIcon />
              </Fab>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SortFilterBatches
            selectedSort={selectedSort}
            sortOptions={sortOptions}
            handleSortChange={handleSortChange}
            sortDirection={sortDirection}
            dirOptions={dirOptions}
            handleSortDirChange={handleSortDirChange}
            selectedType={selectedType}
            typeOptions={typeOptions}
            handleTypeChange={handleTypeChange}
            selectedStatus={selectedStatus}
            statusOptions={statusOptions}
            handleStatusChange={handleStatusChange}
          />
        </Grid>
        {batches.map(batch => (
          // <BatchItem key={batch.batch_id} batch={batch} />

          <Grid item key={batch.batch_id} xs={12}>
            <RouterLink to={`${match.url}/${batch.batch_id}`}>
              <BatchInstance
                description={batch.description}
                business_name={batch.business_name}
                discount={batch.discount}
                discount_type={batch.discount_type}
                expiry_date={batch.expiry_date}
                created_count={batch.created_count}
                claimed_count={batch.claimed_count}
                isBusiness={currentUser.role === 'business'}
              />
            </RouterLink>
          </Grid>
        ))}

        <DialogNewBatch
          open={open}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          newBatch={newBatch}
          templates={templates}
        />
      </Grid>
    </div>
  );
}
