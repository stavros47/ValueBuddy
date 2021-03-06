import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PagesIcon from '@material-ui/icons/Pages';
import Receipt from '@material-ui/icons/Receipt';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import WhatsHot from '@material-ui/icons/Whatshot';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

const drawerItems = {
  customer: [
    {
      name: 'Dashboard',
      href: '/',
      icon: <DashboardIcon />,
    },
    {
      name: 'Discover',
      href: '/Discover',
      icon: <WhatsHot />,
    },
    {
      name: 'My Coupons',
      href: '/Coupons',
      icon: <AccountBalanceWallet />,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <SupervisorAccount />,
    },
  ],
  business: [
    {
      name: 'Dashboard',
      href: '/',
      icon: <DashboardIcon />,
    },
    {
      name: 'Coupon Templates',
      href: '/Templates',
      icon: <PagesIcon />,
    },
    {
      name: 'Coupon Batches',
      href: '/Batches',
      icon: <Receipt />,
    },
    {
      name: 'Redeem',
      href: '/Redeem',
      icon: <ShoppingBasketIcon />,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <SupervisorAccount />,
    },
  ],
};

export default function DrawerItems(props) {
  const sidebarItems = props.role === 'customer' ? drawerItems.customer : drawerItems.business;
  return (
    <List style={{ paddingTop: '15px' }}>
      {sidebarItems.map((sidebarItem, index) => (
        <RouterLink to={sidebarItem.href} key={sidebarItem.href}>
          <ListItem button onClick={props.handleDrawerToggle}>
            <ListItemIcon>{sidebarItem.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={sidebarItem.name} />
          </ListItem>
        </RouterLink>
      ))}
    </List>
  );
}
