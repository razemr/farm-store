import {
    Drawer,
    List,
    makeStyles,
  } from "@material-ui/core";
  import {
    Dashboard,
    FileCopy,
    PeopleAlt,
    Storefront,
    Timeline,
    Star
  } from "@material-ui/icons";
  import { ListItemLink } from "../ListItemLink";
  
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
      marginTop: theme.spacing(10)
    },
  }));
  
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
        <div className={classes.drawerContainer}>
          <List component="nav">
            {/* <ListSubheader component="div">Main</ListSubheader> */}
            <ListItemLink to="/" primary="Dashboard" icon={<Dashboard />}/>
            <ListItemLink to="/programs" primary="Programs" icon={<Timeline />}/>
            <ListItemLink to="/milestones" primary="Milestones" icon={<Star />}/>
            {/* <ListSubheader component="div">Database</ListSubheader> */}
            <ListItemLink to="/" primary="Farmers" icon={<PeopleAlt />}/>
            <ListItemLink to="/" primary="Products" icon={<Storefront />}/>
            <ListItemLink to="/" primary="Templates" icon={<FileCopy />}/>
          </List>
        </div>
      </Drawer>
    );
  }
  