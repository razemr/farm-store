import { Button, Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        flex: 1,
        margin: '0 20px',
        padding: '20px',
        overflow: 'auto'
    },
    title: {

    }
});

export default function MilestoneWidget() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader component="h2" title="Latest Milestones"/>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Farmer</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Ramone Graham</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sheree Bryan</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ishamar Laing</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Richard Blackwood</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Karen Blackwood</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Michael Williams</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Thomas Smith</TableCell>
                            <TableCell>Pineapple Precise Management System</TableCell>
                            <TableCell>15-5-35</TableCell>
                            <TableCell>
                                <Button size="small" color="primary" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
