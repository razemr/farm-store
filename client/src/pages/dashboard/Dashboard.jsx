import './Dashboard.css';
import { Feature } from '../../components/Feature';
import { PageHeader } from '../../components/PageHeader';
import { Grid } from '@material-ui/core';
import {
  Assignment,
  PeopleAlt,
  Storefront,
  Timeline,
} from '@material-ui/icons';
import Chart from '../../components/Chart/Chart';
import { Line, Bar } from 'react-chartjs-2';
import { httpClient } from '../../http/HttpClient';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [labels, setLabels] = useState([]);

  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    async function groupByMonthAndCount() {
      const { data } = await httpClient.get('/milestones/groupByMonthAndCount');

      let values = new Array(12).fill(0);
      data.next12MonthsData.forEach(d => values[d._id] = d.total)
      
      

      data.sort((a, b) => a._id <= b._id ? -1 : 1)
      const month = new Date().getMonth();
      let count = 12 - month;

      while(count != 0) {
        const m = months.pop();
        const v = values.pop();
        values.unshift(v)
        months.unshift(m);
        count--;
      }

      

      console.log(months)
      console.log(values)
    }

    groupByMonthAndCount();
  }, []);

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: '#fff',
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <PageHeader title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Feature
            icon={<Assignment />}
            title="Programs"
            footer="Updated 20 minutes ago"
            value="13"
            color="success"
          />
        </Grid>
        <Grid item md={3}>
          <Feature
            icon={<Timeline />}
            title="Milestones"
            footer="Update 15 minutes ago"
            value="20"
            color="info"
          />
        </Grid>
        <Grid item md={3}>
          <Feature
            icon={<PeopleAlt />}
            title="Farmers"
            footer="Update 15 minutes ago"
            value="20"
            color="warning"
          />
        </Grid>
        <Grid item md={3}>
          <Feature
            icon={<Storefront />}
            title="Products"
            footer="Update 15 minutes ago"
            value="20"
            color="error"
          />
        </Grid>
      </Grid>

      {/* <Grid container spacing={4} style={{ marginTop: '32px' }}>
        <Grid item md={4}>
          <Chart
            color="success"
            chart={<Line data={data} options={options} />}
          />
        </Grid>
        <Grid item md={4}>
          <Chart
            color="success"
            chart={<Bar data={data} options={options} />}
          />
        </Grid>
        <Grid item md={4}>
          <Chart
            color="success"
            chart={<Line data={data} options={options} />}
          />
        </Grid>
      </Grid> */}
    </>
  );
}
