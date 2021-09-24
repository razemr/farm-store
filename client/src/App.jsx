import './App.css';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ViewProgram } from './pages/ViewProgram';
import { CreateProgram } from './pages/CreateProgram';
import { ListPrograms } from './pages/ListPrograms';
import { ListMilestones } from './pages/ListMilestones';
import { EditProgram } from './pages/EditProgram';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { theme } from './theme';
import { ListFarmers } from './pages/ListFarmers';
import { CreateFarmer } from './pages/CreateFarmer';
import { ViewFarmer } from './pages/ViewFarmer';
import { EditFarmer } from './pages/EditFarmer';
import { ListProducts } from './pages/ListProducts';
import { ViewProduct } from './pages/ViewProduct';
import { CreateProduct } from './pages/CreateProduct';
import { EditProduct } from './pages/EditProduct';
import { ListTemplates } from './pages/ListTemplates';
import { ViewTemplate } from './pages/ViewTemplate';
import { CreateTemplate } from './pages/CreateTemplate';
import { EditTemplate } from './pages/EditTemplate';

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Sidebar />
          <main className="main-container">
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
                  <Route path="/programs/:id" exact component={ViewProgram} />
                  <Route path="/programs/:id/edit" component={EditProgram} />
                </Switch>
              </Route>
              <Route path="/milestones" exact component={ListMilestones} />
              <Route path="/farmers">
                <Switch>
                  <Route path="/farmers" exact component={ListFarmers} />
                  <Route
                    path="/farmers/create"
                    exact
                    component={CreateFarmer}
                  />
                  <Route path="/farmers/:id" exact component={ViewFarmer} />
                  <Route
                    path="/farmers/:id/edit"
                    exact
                    component={EditFarmer}
                  />
                </Switch>
              </Route>
              <Route path="/products">
                <Switch>
                  <Route path="/products" exact component={ListProducts} />
                  <Route
                    path="/products/create"
                    exact
                    component={CreateProduct}
                  />
                  <Route path="/products/:id" exact component={ViewProduct} />
                  <Route
                    path="/products/:id/edit"
                    exact
                    component={EditProduct}
                  />
                </Switch>
              </Route>
              <Route path="/templates">
                <Switch>
                  <Route path="/templates" exact component={ListTemplates} />
                  <Route
                    path="/templates/create"
                    exact
                    component={CreateTemplate}
                  />
                  <Route path="/templates/:id" exact component={ViewTemplate} />
                  <Route
                    path="/templates/:id/edit"
                    exact
                    component={EditTemplate}
                  />
                </Switch>
              </Route>
            </Switch>
          </main>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
