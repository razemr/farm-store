import './App.css';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ViewProgram } from './pages/ViewProgram';
import { CreateProgram } from './pages/CreateProgram';
import { ListPrograms } from './pages/ListPrograms';
import { ListMilestones } from './pages/ListMilestones';
import { CssBaseline, Container, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import {theme } from './theme';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <Topbar />
            <Sidebar />
            <Container component="main" className={classes.root}>
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/programs">
                  <Switch>
                    <Route path="/programs" exact component={ListPrograms} />
                    <Route
                      path="/programs/create"
                      exact
                      component={CreateProgram}
                    />
                    <Route path="/programs/:id" component={ViewProgram} />
                  </Switch>
                </Route>
                <Route path="/milestones" exact component={ListMilestones}/>
              </Switch>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
