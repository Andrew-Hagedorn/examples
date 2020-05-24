import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OtherPages from './OtherPages';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="navbar-expand-sm">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link 
              className="nav-link" 
              data-test="first-page-link"
              to="/">Main App</Link>
          </li>
          <li className="nav-item">
            <Link 
                className="nav-link"  
                data-test="second-page-link"
                to="/second">Second Page</Link>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link" 
              data-test="third-page-link"
              to="/third">Third Page</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/second">
            <OtherPages page={'second'} />
          </Route>
          <Route path="/third">
            <OtherPages page={'third'} />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
