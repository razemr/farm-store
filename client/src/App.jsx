import { Topbar, Sidebar } from "./components";
import { Dashboard, ListProgram, CreateProgram } from "./pages";
import { CssBaseline, Toolbar } from "@material-ui/core";
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
      <CssBaseline />
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
              <Switch>
                <Route path="/programs" exact>
                  <ListProgram />
                </Route>
                <Route path="/programs/create">
                  <CreateProgram/>
                </Route>
              </Switch>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

//Container - look into this
