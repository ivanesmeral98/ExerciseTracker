import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.state = {
      description: '',
      weight: 0,
      reps: 0,
      date: new Date()
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          description: response.data.description,
          weight: response.data.weight,
          reps: response.data.reps,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })


  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
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
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      description: this.state.description,
      weight: this.state.weight,
      reps: this.state.reps,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise</h3>
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}