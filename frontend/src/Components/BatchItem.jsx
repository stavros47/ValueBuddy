import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForever from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';

const availableCoupons = (created, claimed) => {
    return created - claimed;
}

/*Setup the Menu that pops up when clicking the more icon on a batch*/
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

/*The actual Batch Item*/
export default function BatchItem(props) {    
    const [anchorEl, setAnchorEl] = useState(null);
    const {batch} = props;

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }

    return (
        <Grid item xs={12} sm={12} md={12} zeroMinWidth>
        <Card className='batch_card' id={batch.batch_id}>
            <CardHeader
            action={
                <>
                <IconButton aria-label="More" aria-controls="customized-menu" aria-haspopup="true" variant="contained" onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>                           
                </>
            }
            title={batch.description}
            subheader={`Starts: ${batch.start_date} - Expires: ${batch.expiry_date}`}
            />
            {/* <CardContent className="card_content"> */}
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" className="card_content">
                <Grid item xs={12} sm={12} md={12} zeroMinWidth>
                    <Typography variant="subtitle1" gutterBottom >
                        Status: <span className={batch.status === 'Active' ? 'status_active' : 'status_inactive'}> {batch.status}</span>
                    </Typography>
                </Grid>
            {/* </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start"> */}
                <Grid item xs={6} sm={4} md={3} zeroMinWidth>
                    <Typography variant="subtitle1" gutterBottom>
                        Category: <span>{batch.business_type}</span>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3} zeroMinWidth>
                    <Typography variant="subtitle1" gutterBottom>
                        Company: <span>{batch.business_name}</span>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3} zeroMinWidth>
                    <Typography variant="subtitle1" gutterBottom>
                        Available: <span>{availableCoupons(batch.created_count,batch.claimed_count)}</span>
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
                        <Edit color='action'/>
                    </ListItemIcon>
                    <ListItemText primary="Edit"/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DeleteForever color='secondary'/>
                    </ListItemIcon>
                    <ListItemText primary="Delete"/>
                </StyledMenuItem>
            </StyledMenu>                        
        </Card>
    </Grid>
    );

}