import React from 'react';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import DashboardPage from './components/DashboardPage'
import EditRoadTrip from './components/EditRoadTrip'
import ProfilePage from './components/ProfilePage'
import EditProfile from './components/EditProfile'
import EditUserPage from './components/EditUserPage'
import RoadTripsPage from './components/RoadTripsPage'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends React.Component {

  render() {

    return (

        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to='/login' />
            </Route>
            <Route exact path="/login">
              <LoginPage></LoginPage>
            </Route>
            <Route exact path="/register">
              <RegisterPage></RegisterPage>
            </Route>
            <Route exact path="/dashboard">
              <DashboardPage></DashboardPage>
            </Route>
            <Route exact path="/explore">
              <Menu/>
              <RoadTripsPage></RoadTripsPage>
              <Footer/>
            </Route>
            <Route path="/roadtrip/:action/:id" component={DashboardPage}/>
            <Route exact path="/profile">
              <Menu/>
              <ProfilePage></ProfilePage>
              <Footer/>
            </Route>
            <Route exact path="/user-management">
              <Menu/>
              <EditUserPage></EditUserPage>
              <Footer/>
            </Route>
            <Route exact path="/my-road-trips">
              <Menu/>
              <EditRoadTrip></EditRoadTrip>
              <Footer/>
            </Route>
            <Route exact path="/edit-profile">
              <Menu/>
              <EditProfile></EditProfile>
              <Footer/>
            </Route>
          </Switch>

        </Router>

        );
  }
}

export default App;