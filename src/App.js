import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getData} from './fetch';

class App extends Component {
    constructor(){
        super();

        this.state = {
            status: ''
        };

        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);

        this.name = React.createRef();
        this.activityType = React.createRef();
        this.km = React.createRef();
    }

    submit(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.name.current.value, activityType: this.activityType.current.value, km: this.km.current.value})
        };

        getData('/submit', options)
            .then(response => {
                this.setState({
                    status: response.status
                })
            });

    }

    reset(){
        this.name.current.value = '';
        this.activityType.current.value = '';
        this.km.current.value = '';
    }

  render() {
    return (
      <div className="fit-form display">
          <div className='form-block'>
              <div className='display form-fields'>
                  <h3>My Activity</h3>
                  <div><label>Name: </label> <input type='text' ref={this.name}/></div>
                  <div><label>Activity Type: </label>
                      <select ref={this.activityType}>
                          <option value="">Select One Option</option>
                          <option value="running">Running</option>
                          <option value="cycling">Cycling</option>
                          <option value="walking">Walking</option>
                      </select>
                  </div>
                  <div><label>Total Kilometers: </label> <input type='number' ref={this.km}/></div>
                  <div>
                      <input type='button' value='Submit' onClick={this.submit}/>
                      <input type='button' value='Reset' onClick={this.reset}/>
                      {(this.state.status === 'success') && <p>Data Submitted Successfully!</p>}
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
