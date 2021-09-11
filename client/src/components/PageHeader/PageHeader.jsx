import "./PageHeader.css";
import { Typography } from "@material-ui/core";

export default function PageHeader(props) {
    const {title} = props;
    return (
        <div className="page-header">
            <Typography variant="h1" color="textSecondary">
                {title}
            </Typography>
        </div>
        
    )
}
