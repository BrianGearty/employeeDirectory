import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
import Table from './components/Table/Table'




function App() {

  const [state, setState] = useState({
    employees: [],
    filteredEmps: []
  })

  useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=200&nat=us').then(function (data) {
      console.log('data from api', data.data.results)
      setState({ ...state, employees: data.data.results })
    })
  }, [])

  const handleAlphabet = () => {


  }

  const handleTyping = (event) => {
    console.log("were typing", event.target.value)
    var newFiltered = []

    for (var i = 0; i < state.employees.length; i++) {
      if (event.target.value === state.employees[i].name.first.substr(0, event.target.value.length)) {
        console.log("we found a match", state.employees[i])
        newFiltered.push(state.employees[i])
      }
    }

    setState({ ...state, filteredEmps: newFiltered })

  }

  var empsToDisplay = state.employees

  if (state.filteredEmps.length > 0) {
    empsToDisplay = state.filteredEmps
  }

  console.log('this is our state!!', state)
  return (
    <div className="App">
      <input onChange={handleTyping}></input>

      <table style={{ width: "100%" }}>
        <tr>
          <th><h2>Photo</h2></th>
          <th><h2 onChange={handleAlphabet}>Name</h2></th>
          <th><h2>Email</h2></th>
          <th><h2>Phone</h2></th>
          <th><h2>DOB</h2></th>
        </tr>
        
          {empsToDisplay.map((emp) => {
            return (
              <>
              <Table></Table>
              </>
            )
          })
        }
        
      </table>
    </div>
  )
}

export default App;


