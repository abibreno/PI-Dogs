import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import Details from './Components/Detail';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route exact path = '/dogs/:id' component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;


