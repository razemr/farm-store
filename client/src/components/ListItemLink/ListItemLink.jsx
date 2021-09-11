import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLink(props) {
  const { icon, primary, to, ...other } = props;

  const disabledIcon = React.isValidElement(icon) ? React.cloneElement(icon, {color: "disabled"}) : '';

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <ListItem {...other} component={renderLink} color="">
      {icon ? <ListItemIcon>{disabledIcon}</ListItemIcon> : null}
      <ListItemText
        primary={primary}
        primaryTypographyProps={{ variant: 'h3' }}
      />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
