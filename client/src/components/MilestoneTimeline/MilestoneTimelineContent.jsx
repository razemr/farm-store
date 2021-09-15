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
  const { milestone, actions, onChange } = props;
  return (
    <TimelineContent className="content-wrapper">
      <Card
        actions={actions}
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
              <TableCell>
                <Typography variant="h5">Product</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Type</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5">Quantity</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5">Unit</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {milestone.productApplications &&
              milestone.productApplications.map((application, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">
                      {application.product.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {application.product.category.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {application.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {application.unit.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </TimelineContent>
  );
};
