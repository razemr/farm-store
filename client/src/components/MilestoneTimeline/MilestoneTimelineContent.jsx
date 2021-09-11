import './MilestoneTimelineContent.css';
import { TimelineContent } from '@material-ui/lab';
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from '@material-ui/core';
import { ProductCategoryIcon } from '../ProductCategoryIcon';
import { getDateDay } from '../../utils/getDateDay';
import { CheckboxControl } from '../FormControls/CheckboxControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const MilestoneTimelineContent = (props) => {
  const { milestone, onChange } = props;
  return (
    <TimelineContent className="content-wrapper">
      <Paper elevation={10} className="milestone-content">
        <Paper elevation={10} className="date-container">
          <Typography variant="h3" align="center">
            {getDateDay(new Date(milestone.date))}
          </Typography>
          <Typography align="center" variant="subtitle1">
            {new Date(milestone.date).toLocaleDateString('en-US', {
              month: 'short',
            })}
          </Typography>
        </Paper>

        <div class="milestone-applications">
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {milestone.productApplications &&
            milestone.productApplications.map((application, index) => (

                <TableRow key={index}>
                <TableCell>
                {application.product.name}
                </TableCell>
                <TableCell align="right">{application.quantity} </TableCell>
                <TableCell align="right">{application.unit.name}</TableCell>
              </TableRow>

            ))}
        </TableBody>
      </Table>






        {/* <Typography variant="subtitle1" color="textSecondary">Applications:</Typography>
          {milestone.productApplications &&
            milestone.productApplications.map((application) => (

                
              <Typography key={application._id} variant="body1">
                {application.quantity} {application.unit.name} of{' '}
                {application.product.name}
              </Typography>

            ))} */}
        </div>
        <div className="milestone-footer">
          <Button variant="contained">Complete</Button>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CheckboxControl
            label="Done"
            value={milestone.notifiedFarmer}
            onChange={onChange}
            disabled={!milestone.active}
          />
        </div> */}
        {/* <List>
          {milestone.productApplications &&
            milestone.productApplications.map((application) => (
              <ListItem key={application._id}>
                <ListItemIcon>
                  <ProductCategoryIcon
                    category={application.product.category.name}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${application.product.name}`}
                  secondary={`${application.quantity} ${application.unit.name}`}
                />
              </ListItem>
            ))}
        </List> */}
      </Paper>
    </TimelineContent>
  );
};
