import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 60,
    height: 60,
    marginTop: theme.spacing(5)
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const classes = useStyles();

  const user = {
    name: props.currentUser.first_name
      ? `${props.currentUser.first_name} ${props.currentUser.last_name}`
      : props.currentUser.business_name,
    avatar: "/images/avatars/avatar_01.png",
    bio: "Brain Director"
  };

  return (
    // clsx(classes.root, className)
    <div className={classes.root}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/profile"
      />
      <Typography className={classes.name} variant="h6">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
      <Link href="#" variant="body2" onClick={props.handleLogout}>
        Sign-out
      </Link>
    </div>
  );
};

export default Profile;
