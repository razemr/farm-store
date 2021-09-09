import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  featuredItem: {
      flex: 1,
      margin: '0 20px',
      padding: '30px',
      cursor: 'pointer'
  },
  featuredTitle: {
    fontSize: '20px',
    textAlign: 'center'
  },
  featuredCount: {
      margin: '10px 0',
      textAlign: 'center',
      fontWeight: 'bolder',
      fontSize: '50px'
  },
});

export default function FeaturedCard(props) {
  const { title, count, color } = props;
  const classes = useStyles();

  return (
    <Card className={classes.featuredItem}>
      <CardContent>
        <Typography className={classes.featuredTitle} color="textSecondary">{title}</Typography>
        <Typography className={classes.featuredCount} style={{color: color}}>{count}</Typography>
      </CardContent>
    </Card>
  );
}
