import { AccountCircle, Notifications, Settings } from "@material-ui/icons";
import { Typography, makeStyles, IconButton, Badge } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Topbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Farm Store Admin
        </Typography>
        <div className={classes.grow}></div>
        <IconButton color="inherit">
          <Badge badgeContent="2" color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
