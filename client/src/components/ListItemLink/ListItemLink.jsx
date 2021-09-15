import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import './ListItemLink.css';

export default function ListItemLink(props) {
  const { icon, primary, to, selected, ...other } = props;

  const disabledIcon = React.isValidElement(icon) ? React.cloneElement(icon, {color: "disabled", className : selected? 'path-selected-icon': ''}) : '';

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <ListItem selected={selected} {...other} component={renderLink} color="">
      {icon ? <ListItemIcon>{disabledIcon}</ListItemIcon> : null}
      <ListItemText
        primary={primary}
        primaryTypographyProps={{ variant: 'body1' }}
      />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
