import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import CompareFace from './containers/CompareFace/CompareFace';

function App() {
  return (
    <Router>

      <div className="app">
        <div className="main">
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/compare-face" component={CompareFace} />
        </div>
      </div>
    </Router>
  );
}

export default App;
