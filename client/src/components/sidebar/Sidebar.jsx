import {
  Drawer,
  List,
  makeStyles,
  Divider,
  Typography,
} from '@material-ui/core';
import { useLocation } from 'react-router';
import { ListItemLink } from '../ListItemLink';
import { navigationMenu } from '../../utils/navigationMenu';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '260px',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
  },
  typographyRoot: {
    marginBottom: theme.spacing(2),
    fontWeight: 400,
  },
  listRoot: {
    marginTop: theme.spacing(2),
  },
  listItemRoot: {
    borderRadius: theme.shape.borderRadius,
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "#fff !important"
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const location = useLocation();
  
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.paper,
      }}
    >
      <Typography
        classes={{ root: classes.typographyRoot }}
        variant="h1"
        align="center"
      >
        FARM STORE ADMIN
      </Typography>

      <Divider />

      <List component="nav" classes={{ root: classes.listRoot }}>
        {navigationMenu.map((menu) => 
          <ListItemLink
            key={menu.title}
            selected={location.pathname === menu.to}
            classes={{ root: classes.listItemRoot, selected: classes.listItemSelected }}
            to={menu.to}
            primary={menu.title}
            icon={menu.icon}
          />
        )}
      </List>
    </Drawer>
  );
}
