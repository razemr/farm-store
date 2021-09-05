import "./Dashboard.css";
import { FeaturedCard, MilestoneWidget, CalendarWidget } from "../../components";

export default function Dashboard() {
  return (
    <>
      <div className="featured">
        <FeaturedCard title="Programs" count="10" color="#4caf50" />
        <FeaturedCard title="Milestones" count="5" color="#2196f3" />
        <FeaturedCard title="Overdue Milestones" count="1" color="#f44336" />
      </div>
      <div className="widgets">
        <CalendarWidget/>
        <MilestoneWidget></MilestoneWidget>
      </div>
    </>
  );
}
