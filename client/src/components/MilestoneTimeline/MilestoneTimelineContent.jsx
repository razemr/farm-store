import './MilestoneTimelineContent.css';
import { TimelineContent } from '@material-ui/lab';
import { getDateDay } from '../../utils/getDateDay';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '../Card/Card';
import { Today } from '@material-ui/icons';
import { MILESTONE_STATUS as STATUS } from '../../utils/constants';
import { Typography } from '@material-ui/core';

export const MilestoneTimelineContent = (props) => {
  const { milestone, onChange } = props;
  return (
    <TimelineContent className="content-wrapper">
      <Card
        color={
          milestone.status === STATUS.NOT_DUE
            ? 'inactive'
            : milestone.status === STATUS.OVERDUE
            ? 'error'
            : milestone.status === STATUS.COMPLETE
            ? 'success'
            : 'warning'
        }
        header={milestone.status}
        label={
          <div>
            <Typography variant="h4">
              {getDateDay(new Date(milestone.date))}
            </Typography>
            <Typography>
              {new Date(milestone.date).toLocaleDateString('en-US', {
                month: 'short',
              })}
            </Typography>
          </div>
        }
      >
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
                  <TableCell>{application.product.name}</TableCell>
                  <TableCell align="right">{application.quantity} </TableCell>
                  <TableCell align="right">{application.unit.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </TimelineContent>
  );
};
