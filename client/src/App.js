import React from 'react';
import './App.css';
import axios from 'axios';

import CourseForm from './components/courses/CourseForm';

class App extends React.Component {
  state = {
      courses: [],
      errors: {}
  }

    componentDidMount() {
        axios.get('/api/courses')
            .then(res => {
                this.setState({courses: res.data});
            })
            .catch(errors => {
                this.setState({errors});
            });
    }

    addCourse = course => {
        let newCourses = [...this.state.courses];
        newCourses.push(course.data);
        this.setState({courses: newCourses});
    }

    render() {
        const {courses} = this.state;
        let displayCourses = courses.map((course, index) => (
            <div key={index}>{course.name}</div>
        ));
        return (
            <div className="App">
                {displayCourses}
                <CourseForm addCourse={this.addCourse} />
            </div>
        );
  }
  
}

export default App;
