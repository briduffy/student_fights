import React from 'react';
import Avatar from './Avatar';
import axios from 'axios';

class App extends React.Component {
  state = { loaded: false, students: [], left: null, right: null, winner: null }

  componentDidMount() {
    axios.get('https://canvas-students.herokuapp.com/api/student_list/64')
      .then( res => { 
        let [left, right, ...students] = res.data
        this.setState({ students, left, right, loaded: true }) 
      })
  }

  sample = (arr) => {
    const index = Math.floor(Math.random() * arr.length)
    const student = arr[index];
    return student;
  }

  selectStudents = () => {
    const left = this.sample(this.state.students);
    let remaining = this.state.students.filter( s => s.name !== left.name )
    const right = this.sample(remaining);
    let students = this.state.students.filter( s => s.name !== left.name && s.name !== right.name )
    this.setState({ left, right, students });
  }

  winner = (position) => {
    let fighter = this.state[position]
    if (this.state.students.length === 0) {
      this.setState({ left: fighter, right: fighter });
    } else {
      this.setState({ students: [...this.state.students, fighter], winner: fighter.name }, () => {
        if (this.state.students.length > 1) 
          this.selectStudents();
      });
    }
  }

  render() {
    let { students, loaded, left, right, winner } = this.state;
    let fightClass = loaded ? "left fight-box" : "";
    let renderAvatar = false;

    if ( left && right )
      renderAvatar = true

    return (
      <div>
        <h1>Student Fights</h1>
        <div id="loading_zone" className="left">
          { !loaded && <label>Load Students</label> }
          <ul id="students">
            { students.map( (student, i) => <li key={i}>{student.name}</li> )}
          </ul>
        </div>
        <div id="fight_zone" className="left">
          <div id="left" className={fightClass} onClick={() => this.winner('left')}>
            { renderAvatar && <Avatar {...left} /> }
          </div>
          <div id="right" className={fightClass} onClick={() => this.winner('right')}>
            { renderAvatar && <Avatar {...right} /> }
          </div>
        </div>
        <h2 id="winner" className="green center">{ winner ? `Winner: ${winner}` : ''}</h2>
      </div>
    )
  }
}

export default App;
