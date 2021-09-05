import { Topbar, Sidebar } from "./components";
import { Dashboard, ProgramList } from "./pages";
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="app">
        <Topbar />
        <Sidebar />
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/programs">
              <ProgramList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

//Container - look into this
