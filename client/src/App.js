import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import LandingPage from "./Components/LandingPage";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path = "/" component = {LandingPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
