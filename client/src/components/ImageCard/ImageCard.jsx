import { Paper } from '@material-ui/core';
import './ImageCard.css';

export default function ImageCard(props) {
  const { imageUrl, imageAlt, children, ...other } = props;
  return (
    <Paper elevation={1} className="image-card-wrapper" {...other}>
      <img className="image-card-image" src={imageUrl} alt={imageAlt} />
      <div className="image-card-body">{children}</div>
    </Paper>
  );
}
