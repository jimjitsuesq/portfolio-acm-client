import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

import GetCourses from './Components/GetCourses';
import Header from './Components/Header';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import PrivateRoute from './Components/PrivateRoute';
import CourseDetail from './Components/CourseDetail';

axios.defaults.withCredentials = true;

function App() {
  const [userData, setUserData] = useState('');
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const cookieValue = document.cookie.split('=')[1]
  let history = useHistory()
  async function SignIn () {
    
    try {
        const response = await axios.get('http://localhost:5000/api/users', {
            auth: {
                username: emailAddress,
                password: password
            }
        })
        const responseJSON = JSON.stringify(response.data.authenticatedUser)
        localStorage.setItem('userInfo', responseJSON)
        const loggedInUser = localStorage.getItem('userInfo')
        const foundUser = JSON.parse(loggedInUser);
        setUserData(foundUser);
        setUserId(foundUser.id);
        setUserName(foundUser.firstName + ' ' + foundUser.lastName);
        setEmailAddress(foundUser.emailAddress);
        setPassword(cookieValue)
        console.log('User Signed In')
        setIsLoggedIn(true)
        history.push('/')
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo')
      if(loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUserData(foundUser);
        setUserId(foundUser.id);
        setUserName(foundUser.firstName + ' ' + foundUser.lastName);
        setEmailAddress(foundUser.emailAddress);
        setPassword(cookieValue)
        setIsLoggedIn(true)
      }    
  }, [])
  
  return (
    <>
      <Header isLoggedIn={isLoggedIn} userName={userName} />
        <main>
            <Switch>
              <Route exact path="/" render={(props) => <GetCourses />} />
              <PrivateRoute path="/api/courses/create" props={{isLoggedIn:isLoggedIn, userData:userData}} component={CreateCourse} />
              <PrivateRoute path="/api/courses/:id/update" props={{isLoggedIn:isLoggedIn, userData:userData}} component={UpdateCourse} />
              <Route path="/api/courses/:id"  render={(props) => <CourseDetail isLoggedIn={isLoggedIn} userId = {userId} />} />
              <Route path="/api/signup" component={UserSignUp} />
              <Route path="/api/signin" render={(props) => <UserSignIn emailAddress={emailAddress} password={password} setEmailAddress={setEmailAddress} setPassword={setPassword} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData} onSubmit={SignIn}/>} />
              {/* <Route path="/api/signin" render={(props) => <UserSignIn />} /> */}
              <Route path="/api/signout" component={UserSignOut} />
              
            </Switch>
        </main>
    </>
  );
}

export default App;
