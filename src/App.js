import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import GetCourses from './Components/GetCourses';
import Header from './Components/Header';
import GetOneCourse from './Components/GetOneCourse';
import CreateCourse from './Components/CreateCourse';

function App() {
  return (
    <>
      <Header />
      <main>
          <Switch>
            <Route exact path="/" render={(props) => <GetCourses />} />
            <Route path="/api/courses/create" component={CreateCourse} />
            <Route path="/api/courses/:id">
              <GetOneCourse />
            </Route>
            
          </Switch>
      </main>
    </>
  );
}

export default App;
