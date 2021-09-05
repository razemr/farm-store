import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
} from "@material-ui/icons";

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
          <ListItem button selected={true}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Programs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Farmers" />
          </ListItem>
          <ListSubheader component="div">Database</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Templates" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
