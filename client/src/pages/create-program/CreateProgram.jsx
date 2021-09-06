import { Container } from "@material-ui/core";
import { ProgramForm } from "../../components";

export default function CreateProgram(props) {
  const program = props.location.state || {
    name: "",
    farmer: "",
    startDate: null,
    endDate: null,
    acres: "",
    crop: "",
    milestones: [{
      date: null,
      productApplications: [{
        product: "",
        quantity: "",
        unit: ""
      }]
    }],
  };
  return (
    <Container>
      <div className="header">
        <h1>Create Program</h1>
      </div>
      <ProgramForm program={program}/>
    </Container>
  );
}
