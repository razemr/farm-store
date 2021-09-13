import "./PageHeader.css";
import { Typography } from "@material-ui/core";

export default function PageHeader(props) {
    const {title, children} = props;
    return (
        <div className="page-header">
            <Typography variant="h1" color="textSecondary">
                {title}
            </Typography>
            <div className="header-actions">
                {children}
            </div>
        </div>
        
    )
}
