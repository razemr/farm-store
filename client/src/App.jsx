import { Topbar, Sidebar } from "./components";
import { Dashboard, ListProgram, CreateProgram, ViewProgram } from "./pages";
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10)
  },
}));

function App() {
  const classes = useStyles();
  return (
    <GlobalProvider>
      <Router>
        <CssBaseline />
        <div className="app">
          <Topbar />
          <Sidebar />
          <Container component="main" className={classes.root}>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/programs">
                <Switch>
                  <Route path="/programs" exact component={ListProgram} />
                  <Route path="/programs/create" exact component={CreateProgram} />
                  <Route path="/programs/:id" component={ViewProgram} />
                </Switch>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
