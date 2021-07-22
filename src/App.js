import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

import GetCourses from './Components/GetCourses';
import Header from './Components/Header';
import GetOneCourse from './Components/GetOneCourse';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';

axios.defaults.withCredentials = true;

function App() {
  const[user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      if(document.cookie) {
        setUser(document.cookie.split('=')[1])
      }    
    }
  checkUser();
  });
  return (
    <>
      <Header user={user} />
      <main>
          <Switch>
            <Route exact path="/" render={(props) => <GetCourses />} />
            <Route path="/api/courses/create" component={CreateCourse} />
            <Route path="/api/courses/:id/update" component={UpdateCourse} />
            <Route path="/api/courses/:id">
              <GetOneCourse />
            </Route>
            <Route path="/api/signup" component={UserSignUp} />
            <Route path="/api/signin" component={UserSignIn} />
          </Switch>
      </main>
    </>
  );
}

export default App;
