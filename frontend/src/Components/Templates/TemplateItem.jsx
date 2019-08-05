import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForever from "@material-ui/icons/DeleteForever";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";
import EditTemplateDialog from "./EditTemplateDialog";
import DeleteDialog from "../DeleteDialog";

/*Setup the Menu that pops up when clicking the more icon on a template*/
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

/*The actual Template Item*/
export default function TemplateItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { template } = props;

  /*Edit Dialog */
  function handleOpenEdit() {
    setIsDialogOpen(true);
  }

  function handleCloseEdit() {
    setIsDialogOpen(false);
  }

  /*Delete Dialog */
  function handleOpenDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  function handleCloseDeleteDialog() {
    setDeleteDialogOpen(false);
  }

  /*More options menu */
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Grid item xs={12} sm={12} md={12} zeroMinWidth>
      <Card className="template_card" id={template.template_id}>
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
          title={template.description}
          subheader={`Created at: ${template.created}`}
        />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => {
              handleOpenEdit();
              handleClose();
            }}
          >
            <ListItemIcon>
              <Edit />
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
      <EditTemplateDialog
        open={isDialogOpen}
        handleCloseEdit={handleCloseEdit}
        template={template}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        item={{ id: template.template_id, name: "Template" }}
      />
    </Grid>
  );
}
