import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import CompareFace from './containers/CompareFace/CompareFace';
import CompareFaceNew from './containers/CompareFace/CompareFaceNew';
// import CompateFaceApi from './containers/CompareFaceApi/CompateFaceApi';
import Alert from "./components/alert/Alert";
import PrivateCompareFaceRouter from './containers/customRouter/PrivateCompareFaceRouter';
import Loading from './components/alert/Loading';
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import DashBoard from './containers/DashBoard/DashBoard';
import PrivateRouter from './containers/customRouter/PrivateRouter';
import Header from './containers/Header/Header';
import PrivateRouterLogin from './containers/customRouter/PrivateRouterLogin';
import Sidebar from './containers/Sidebar/Sidebar';
import Routes from './routes/Routes';
import CompareOTP from './containers/CompareOTP/CompareOTP';

if (typeof window !== "undefined") {
  injectStyle();
}

let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const { auth } = useSelector((state) => state);
  return (
    <>
      <Router>
        {/* <Loading /> */}
        <Alert />
        {/* <Switch>
          <div className="app">
            {auth.isLogin && <Header />}
            <div className={!auth.isLogin ? "container-login" : "container-logined"}>
              <div className="main">
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/compare-face" component={CompareFace} />
                <PrivateRouterLogin exact path="/dashboard" component={DashBoard} />
              </div>
            </div>
          </div>
        </Switch> */}
        <Switch>
          <div className="app">
            {!auth.isLogin && < div className="container-logined">
              <div className="main">
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/compare-face" component={CompareFace} />
                  <Route exact path="/compare-otp" component={CompareOTP} />
                  {/* <Route exact path="/otp" component={CompareOTP} /> */}
                  <Route exact render={(props) => (
                    <Redirect to="/login" />
                  )} />

                </Switch>
              </div>
            </div>}
            {auth.isLogin && <Route
              render={(props) => (
                <div className="container-body">
                  <Header />
                  <div className="layout-content">
                    <Sidebar {...props} />
                    <div className="layout-content-main">
                      <Routes />
                    </div>
                  </div>
                </div>
              )}
            />}
          </div>
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>

    </>
  );
}

export default App;
