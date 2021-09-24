import {
  Assignment,
  Dashboard,
  FileCopy,
  PeopleAlt,
  Storefront,
  Timeline,
} from '@material-ui/icons';
import React from 'react';

export const navigationMenu = [
  {
    title: 'Dashboard',
    to: '/',
    icon: <Dashboard />,
  },
  {
    title: 'Milestones',
    to: '/milestones',
    icon: <Timeline />,
  },
  {
    title: 'Programs',
    to: '/programs',
    icon: <Assignment />,
  },
  {
    title: 'Templates',
    to: '/templates',
    icon: <FileCopy color="disabled" />,
  },
  {
    title: 'Farmers',
    to: '/farmers',
    icon: <PeopleAlt />,
  },
  {
    title: 'Products',
    to: '/products',
    icon: <Storefront />,
  }
];
