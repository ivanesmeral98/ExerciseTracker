import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional component: takes in the props that were passed into it
const Exercise = props => (
  <tr>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.reps}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// class component
export default class ExerciseList extends Component {

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};


  }

  // adds all exercises to state
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
    .then(res => {
      this.setState({ exercises: res.data })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteExercise(id) {
    // adds the id to make for the route we created in backend
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    // now removing from user view and returns all except for the one w id that we are deleting
    this.setState({
      exercises: this.state.exercises.filter(element => element._id !== id)
    })
  }

  exerciseList() {
    // returns exercise component for every exercise in the state
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  
  render() {
    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name of Lift</th>
              <th>Weight</th>
              <th>Reps</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}