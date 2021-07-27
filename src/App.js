import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Courses from './Components/CourseComponents/Courses';
import Header from './Components/Header';
import UserSignUp from './Components/UserComponents/UserSignUp';
import UserSignIn from './Components/UserComponents/UserSignIn';
import UserSignOut from './Components/UserComponents/UserSignOut';
import CreateCourse from './Components/CourseComponents/CreateCourse';
import UpdateCourse from './Components/CourseComponents/UpdateCourse';
import PrivateRoute from './Components/RouteComponents/PrivateRoute';
import CourseDetail from './Components/CourseComponents/CourseDetail';
import NotFound from './Components/ErrorComponents/NotFound';
import Forbidden from './Components/ErrorComponents/Forbidden';
import UnhandledError from './Components/ErrorComponents/UnhandledError';

axios.defaults.withCredentials = true;
/**
 * The "main" page for the app.  Handles all routing and sets and dispatches
 * userData and logged in status.
 * @returns The routes for all components.
 */
function App() {
  const [userData, setUserData] = useState('');
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
/**
 * Retrieves userData from localStorage when the component mounts
 */
  useEffect(() => {
    if(localStorage.getItem('userInfo')) {
    const loggedInUser = localStorage.getItem('userInfo')
      if(loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUserData(foundUser);
        setUserId(foundUser.id);
        setIsLoggedIn(true)
      }    
  }}, [])
  
  return (
    <>
      <Header props={{isLoggedIn: isLoggedIn, userData: userData}} />
        <main>
            <Switch>
              <Route 
                exact path="/" 
                render={(props) => <Courses />} 
              />
              <PrivateRoute 
                path="/courses/create" 
                props={{userData:userData}} 
                component={CreateCourse} 
              />
              <PrivateRoute 
                path="/courses/:id/update" 
                props={{userData:userData}} 
                component={UpdateCourse} 
              />
              <Route 
                path="/courses/:id"  
                render={(props) =>  <CourseDetail 
                                      userId={userId}
                                      userData={userData}
                                    />
                } 
              />
              <Route 
                path="/signin" 
                render={(props) =>  <UserSignIn 
                                      setIsLoggedIn={setIsLoggedIn} 
                                      setUserData={setUserData} 
                                      {...props} 
                                    />
                } 
              />
              <Route 
                path="/signup" 
                render={(props) =>  <UserSignUp 
                                      setIsLoggedIn={setIsLoggedIn} 
                                      setUserData={setUserData} 
                                      {...props} 
                                    />
                } 
              />
              <Route 
                path="/signout" 
                component={UserSignOut} 
              />
              <Route 
                path="/forbidden" 
                component={Forbidden} 
              />
              <Route 
                path="/error" 
                component={UnhandledError} 
              />
              <Route>
                <NotFound 
                  path="/notfound" 
                  component={NotFound}
                />
              </Route>
            </Switch>
        </main>
    </>
  );
}

export default App;
