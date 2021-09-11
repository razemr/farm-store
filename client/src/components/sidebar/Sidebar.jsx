import { Drawer, List, makeStyles, Divider, Typography } from '@material-ui/core';
import {
  Dashboard,
  FileCopy,
  PeopleAlt,
  Storefront,
  Timeline,
  Assignment,
} from '@material-ui/icons';
import { ListItemLink } from '../ListItemLink';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '260px',
    boxShadow: theme.shadows[15],
  },
  // root: {
  //   marginTop: theme.spacing(8),
  // },
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.paper,
      }}
    >
      {/* <Typography variant="h6">FARM STORE ADMIN</Typography>
      <Divider /> */}
      {/* <List component="nav" classes={{ root: classes.root }}> */}
      <List component="nav">
        <ListItemLink to="/" primary="Dashboard" icon={<Dashboard color="disabled"/>} />
        <ListItemLink to="/programs" primary="Programs" icon={<Assignment color="disabled"/>} />
        <ListItemLink
          to="/milestones"
          primary="Milestones"
          icon={<Timeline />}
        />
        <ListItemLink to="/" primary="Farmers" icon={<PeopleAlt color="disabled"/>} />
        <ListItemLink to="/" primary="Products" icon={<Storefront color="disabled"/>} />
        <ListItemLink to="/" primary="Templates" icon={<FileCopy color="disabled"/>} />
      </List>
    </Drawer>
  );
}
