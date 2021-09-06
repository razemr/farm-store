import "./Dashboard.css";
import { FeaturedCard, MilestoneWidget, CalendarWidget } from "../../components";
import { Container } from "@material-ui/core";

export default function Dashboard() {
  return (
    <Container>
      <div className="featured">
        <FeaturedCard title="Programs" count="10" color="#4caf50" />
        <FeaturedCard title="Milestones" count="5" color="#2196f3" />
        <FeaturedCard title="Overdue Milestones" count="1" color="#f44336" />
      </div>
      <div className="widgets">
        <CalendarWidget/>
        <MilestoneWidget></MilestoneWidget>
      </div>
    </Container>
  );
}
