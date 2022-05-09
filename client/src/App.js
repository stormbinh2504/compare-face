import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import CompareFace from './containers/CompareFace/CompareFace';
import CompareFaceNew from './containers/CompareFace/CompareFaceNew';
// import CompateFaceApi from './containers/CompareFaceApi/CompateFaceApi';
import Alert from "./components/alert/Alert";
import PrivateCompareFaceRouter from './containers/customRouter/PrivateCompareFaceRouter';

function App() {
  const { auth } = useSelector((state) => state);
  console.log("binh--auth", auth)
  return (
    <Router>
      <Alert />
      <Switch>
        <div className="app">
          <div className="main">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/compare-face" component={CompareFace} />
            {/* <PrivateCompareFaceRouter exact path="/compare-face" component={CompareFace}  /> */}
            {/* {auth.token && <Route exact path="/compare-face" component={CompareFace} />} */}
            {/* <Route exact path="/compare-face" component={CompareFace} /> */}
            {/* <Route exact path="/c" component={CompareFaceNew} /> */}
            {/* <Route exact path="/b" component={CompateFaceApi} /> */}
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
