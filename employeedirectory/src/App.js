import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
// import Table from './components/Table'
// import TableHeader from "./components/TableHeader";


function App() {
// HOOK
  const [state, setState] = useState({
    employees: [],
    filteredEmps: [],
    alphabetizedEmps: []
  })
// GETTING API RESULTS BEFORE PAGE LOADS
  useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=200&nat=us').then(function (data) {
      setState({ ...state, employees: data.data.results })
    })
  }, [])

  // ALPHABETIZATION OF EMPLOYEES
  const handleAlphabet = () => {
    var newAlphabetizedName = []

    for (var i = 0; i < state.employees.length; i++) {
    newAlphabetizedName.push(state.employees[i]);
  }
    
  // console.log('state emps', newAlphabetizedName.sort() )
    setState({...state, alphabetizedEmps: newAlphabetizedName})
  }

// HANDLE TYPING TO SORT EMPLOYEES  
  const handleTyping = (event) => {
    console.log("we're typing", event.target.value)
    var newFiltered = []

    for (var i = 0; i < state.employees.length; i++) {
      if (event.target.value === state.employees[i].name.first.substr(0, event.target.value.length)) {
        console.log("we found a match", state.employees[i])
        newFiltered.push(state.employees[i])
      }
    }

    setState({ ...state, filteredEmps: newFiltered })

  }
// IF STATEMENT FOR TYPING TO SORT EMPLOYEES
  var empsToDisplay = state.employees

  if (state.filteredEmps.length > 0) {
    empsToDisplay = state.filteredEmps
  }

// STATEMENT FOR ALPHABETIZING NAMES
  for(var i =0; i < state.alphabetizedEmps.length; i ++){
    if(state.alphabetizedEmps.length > 0){
      empsToDisplay = state.alphabetizedEmps

      empsToDisplay.sort(function(a, b){
        if (a.name.first < b.name.first) { return -1;}
        if (a.name.first > b.name.first) { return 1; }
        return 0;
      })
    }
  }

  return (
    <div className="App">
      <h4>Employee Name</h4><input style={{ width: "200px"}} onChange={handleTyping}></input>

      <table style={{ width: "100%", border: "2px solid black"}}>
        <tbody>
        <tr>
          <th><h2>Photo</h2></th>
          <th><h2 onClick={handleAlphabet}>Name</h2></th>
          <th><h2>Email</h2></th>
          <th><h2>Phone</h2></th>
          <th><h2>DOB</h2></th>
        </tr>
        </tbody>
        {empsToDisplay.map((emp) => {
          return (
            <>
            <tbody>
              <tr>
                <td style={{border: "2px solid black"}}><img alt="Employee" src={emp.picture.thumbnail}></img></td>
                <td><h3>{emp.name.first} {emp.name.last}</h3></td>
                <td><h4>{emp.email}</h4></td>
                <td><h4>{emp.phone}</h4></td>
                <td><h4>{emp.dob.date.slice(0, 10)}</h4></td>
              </tr>
              </tbody>
            </>
          )
        })
        }

      </table>
    </div>
  )
}

export default App;


