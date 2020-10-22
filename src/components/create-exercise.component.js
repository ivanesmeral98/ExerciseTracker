import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    // need to make sure the word "this" works properly in methods, otherwise undefined
    // makes it so that "this" refers to class
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      weight: 0,
      reps: 0,
      date: new Date()
    }
  }

  // called right before anything is displayed on page
  componentDidMount() {

  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }

  onChangeReps(e) {
    this.setState({
      reps: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault(); // prevents refresh and does what we do below
    // state has all of the things we changed in form so we set it
    const exercise = {
      description: this.state.description,
      weight: this.state.weight,
      reps: this.state.reps,
      date: this.state.date
    }

    // put exercise in database
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    console.log(exercise);

    // send user back to homepage
     window.location = '/';
  }



  render() {
    return (
    <div>
      <h3>Add an Exercise</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Weight (in lbs): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.weight}
              onChange={this.onChangeWeight}
              />
        </div>

        <div className="form-group">
          <label>Reps (#): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.reps}
              onChange={this.onChangeReps}
              />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}