import { Card, CardContent, Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import { ProgramForm, TemplateSelection } from "../../components";

export default function CreateProgram() {
  const [openCreate, setOpenCreate] = useState(false);
  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleCreateClose = () => {};
  return (
    <>
      <TemplateSelection open={openCreate} onClose={handleCreateClose} />
      <div className="header">
        <h2>Create Program</h2>
      </div>
      <ProgramForm/>
    </>
  );
}
