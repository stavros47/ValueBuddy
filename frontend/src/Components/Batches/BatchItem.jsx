import React, { useState } from "react";

/* 
  A Date handling library that helps with date formating/parsing
  - using date_fns parseIso function I can get back a Date object from an iso date string
  - using date_fns format function I can format the date object to any desired format
  ex: format(parseISO(newBatch.start_date), "do-MMM-yyyy")
*/
import { format, parseISO } from "date-fns";

import {
  Grid,
  Card,
  CardHeader,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import DeleteForever from "@material-ui/icons/DeleteForever";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";

import DeleteDialog from "../DeleteDialog";

const availableCoupons = (created, claimed) => {
  return created - claimed;
};

/*Setup the Menu that pops up when clicking the more icon on a batch*/
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

/*The actual Batch Item*/
export default function BatchItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { batch } = props;

  /*Delete Dialog */
  function handleOpenDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  function handleCloseDeleteDialog() {
    setDeleteDialogOpen(false);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Grid item xs={12} sm={12} md={12} zeroMinWidth>
      <Card className="batch_card" id={batch.batch_id}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="More"
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            </>
          }
          title={batch.description}
          subheader={`Starts: ${format(
            parseISO(batch.start_date),
            "MMM do yyyy"
          )} - Expires: ${format(parseISO(batch.expiry_date), "MMM do yyyy")}`}
          className="card-header"
        />
        {/* <CardContent className="card_content"> */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="card_content"
          spacing={0}
        >
          <Grid item xs={6} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Status:{" "}
              <span
                style={{ display: "block" }}
                className={
                  batch.status === "Active"
                    ? "status_active"
                    : "status_inactive"
                }
              >
                {" "}
                {batch.status}
              </span>
            </Typography>
          </Grid>
          {/* </Grid> 
            <Grid container direction="row" justify="flex-start" alignItems="flex-start"> */}
          <Grid item xs={6} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Category:{" "}
              <span style={{ display: "block" }}>{batch.business_type}</span>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Company:{" "}
              <span style={{ display: "block" }}>{batch.business_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} zeroMinWidth>
            <Typography variant="subtitle1" align="center">
              Available:{" "}
              <span style={{ display: "block" }}>
                {availableCoupons(batch.created_count, batch.claimed_count)}
              </span>
            </Typography>
          </Grid>
        </Grid>
        {/* </CardContent> */}
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <Edit color="action" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              handleOpenDeleteDialog();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteForever color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </StyledMenuItem>
        </StyledMenu>
      </Card>
      <DeleteDialog
        open={deleteDialogOpen}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        item={{ id: batch.batch_id, name: "Batch" }}
      />
    </Grid>
  );
}
