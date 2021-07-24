import React, { useState, useEffect, createContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

import GetCourses from './Components/GetCourses';
import Header from './Components/Header';
import GetOneCourse from './Components/GetOneCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import PrivateRoute from './Components/PrivateRoute';
// import AuthContext from './Components/AuthContext'

axios.defaults.withCredentials = true;



export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function App() {
  const [userData, setUserData] = useState();
  const [user, setUser] = useState('Bobby')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  
  // let history = useHistory()
  // useEffect(() => {
  //   const checkUser = () => {
  //     if(document.cookie) {
  //       setUser(document.cookie.split('=')[1])
  //     }    
  //   }
  // checkUser();
  // console.log(user)
  // });

  return (
    <>
      {/* <Header user={user} isLoggedIn={isLoggedIn} /> */}
      <AuthContext.Provider value={user}>
        <Header />
        <main>
            <Switch>
              <Route exact path="/" render={(props) => <GetCourses />} />
              <Route path="/api/courses/:id">
                <GetOneCourse />
              </Route>
              <Route path="/api/signup" component={UserSignUp} />
              {/* <Route path="/api/signin" render={(props) => <UserSignIn emailAddress={emailAddress} password={password} setEmailAddress={setEmailAddress} setPassword={setPassword} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData} onSubmit={SignIn}/>} /> */}
              <Route path="/api/signin" render={(props) => <UserSignIn />} />
              <Route path="/api/signout" component={UserSignOut} />
              <PrivateRoute />
            </Switch>
        </main>
        </AuthContext.Provider>
    </>
  );
}

export default App;
