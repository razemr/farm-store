import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import {
  Edit,
  Person,
  Phone,
  Email,
  LocationOn,
  Delete,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import ImageCard from '../../components/ImageCard/ImageCard';
import { makeStyles } from '@material-ui/styles';
import Feature from '../../components/Feature/Feature';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

const useStyles = makeStyles((theme) => ({
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop3: {
    marginTop: theme.spacing(3),
  },
  marginTop4: {
    marginTop: theme.spacing(4),
  },
  marginTop5: {
    marginTop: theme.spacing(5),
  },
}));

export default function ViewProgram() {
  const [program, setProgram] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getProgam() {
      const { data } = await httpClient.get(`/programs/${id}`);
      setProgram({ ...data.program });
    }
    getProgam();
  }, [id]);

  const handleEdit = () => {
    history.push(`/programs/${id}/edit`);
  };

  const handleCheck = async (status, id) => {
    const { data } = await httpClient.patch(`/programs/${program._id}`, {
      target: 'milestoneStatus',
      status,
      id,
    });
    setProgram({ ...data.program });
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/programs/${program._id}`);
    setOpen(false);
    history.push('/programs');
  };

  return (
    <>
      <PageHeader title="Program Detail">
        <IconButton onClick={handleEdit}>
          <Edit color="action" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete color="action" />
        </IconButton>
      </PageHeader>
      {Object.keys(program).length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ImageCard
              style={{ marginTop: '64px' }}
              imageUrl={`${process.env.PUBLIC_URL}/images/${program.cropName}.jpg`}
            >
              <>
                <Typography
                  align="center"
                  variant="h6"
                  color="textSecondary"
                  className={classes.marginTop3}
                >
                  {program.cropName} - {program.acres} acres
                </Typography>
                <Typography align="center" variant="h4">
                  {program.name}
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  paragraph
                  className={classes.marginTop2}
                >
                  {program.description}
                </Typography>

                <Grid container spacing={10}>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      color="primary"
                    >
                      Start
                    </Typography>
                    <Typography align="center" variant="h4">
                      {new Date(program.startDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      color="primary"
                    >
                      End
                    </Typography>
                    <Typography align="center" variant="h4">
                      {new Date(program.endDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      color="primary"
                    >
                      Next Milestone
                    </Typography>
                    <Typography align="center" variant="h4">
                      {new Date(program.nextMilestone).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </ImageCard>

            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.marginTop4}>
                <Feature
                  icon={<Person />}
                  title="Farmer"
                  value={program.farmerName}
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} className={classes.marginTop4}>
                <Feature
                  icon={<Phone />}
                  title="Phone"
                  value={program.farmer.phoneNumber}
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} className={classes.marginTop2}>
                <Feature
                  icon={<Email />}
                  title="Email"
                  value={program.farmer.emailAddress}
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} className={classes.marginTop2}>
                <Feature
                  icon={<LocationOn />}
                  title="Location"
                  value={`${program.radaExtensionName}, ${program.parishName}`}
                  color="primary"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <MilestoneTimeline
              onCheck={handleCheck}
              milestones={program.milestones}
              nextMilestone={program.nextMilestone}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
      <ConfirmationDialog
        open={open}
        title="Delete Program"
        content={
          <Typography>Are you sure you want to delete this program?</Typography>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
