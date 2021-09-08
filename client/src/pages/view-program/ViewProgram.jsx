import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import { ProgramDetails, MilestoneTimeline } from "../../components";
import { Paper } from "@material-ui/core";

export default function ViewProgram() {
  const { getItem, program } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    getItem("programs", id);
  },[]);

  return (
    <Paper>
      <ProgramDetails program={program}/>
      <MilestoneTimeline milestones={program.milestones}/>
    </Paper>
  );
}
