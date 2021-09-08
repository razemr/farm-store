import { Container } from "@material-ui/core";
import { useHistory } from "react-router";
import { ProgramForm } from "../../components";

const emptyProgram = {
  name: "",
  farmer: "",
  startDate: null,
  endDate: null,
  acres: "",
  crop: "",
  template: "",
  milestones: [{
    date: null,
    productApplications: [{
      product: "",
      quantity: "",
      unit: ""
    }]
  }],
}

export default function CreateProgram(props) {
  const program = props.location.state || emptyProgram;
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/programs");
  }
  return (
    <Container>
      <div className="header">
        <h1>Create Program</h1>
      </div>
      <ProgramForm program={program} onSubmit={handleSubmit}/>
    </Container>
  );
}
