import {
  Drawer,
  List,
  ListSubheader,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import {
  Dashboard,
  FileCopy,
  PeopleAlt,
  Storefront,
  Timeline,
  Star
} from "@material-ui/icons";
import { ListItemLink } from "../index";

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
});

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List component="nav">
          <ListSubheader component="div">Main</ListSubheader>
          <ListItemLink to="/" primary="Dashboard" icon={<Dashboard />}/>
          <ListItemLink to="/programs" primary="Programs" icon={<Timeline />}/>
          <ListItemLink to="/" primary="Milestones" icon={<Star />}/>
          <ListSubheader component="div">Database</ListSubheader>
          <ListItemLink to="/" primary="Farmers" icon={<PeopleAlt />}/>
          <ListItemLink to="/" primary="Products" icon={<Storefront />}/>
          <ListItemLink to="/" primary="Templates" icon={<FileCopy />}/>
        </List>
      </div>
    </Drawer>
  );
}
