import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './empcontainer.css'

// HOOK
function EmpContainer(){
const [state, setState] = useState({
    employees: [],
    filteredEmps: [],
    asc: false,
    handleOrder: false
})


// GETTING API RESULTS BEFORE PAGE LOADS
useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=200&nat=us').then(function (data) {
        setState({ ...state, employees: data.data.results, filteredEmps: data.data.results })
    })
}, [])


// ALPHABETIZATION OF EMPLOYEES
const handleAlphabet = () => {
    if(state.handleOrder === false) {
        setState({ ...state, checked: !state.checked, asc: !state.asc, handleOrder: true })
    } else {
        setState({ ...state, checked: !state.checked, asc: !state.asc })
    }
    
}

// HANDLE TYPING TO SORT EMPLOYEES  
const handleTyping = (event) => {
    var newFiltered = []

    for (var i = 0; i < state.employees.length; i++) {
        if (event.target.value.toLowerCase() === state.employees[i].name.first.substr(0, event.target.value.length).toLowerCase()) {
            newFiltered.push(state.employees[i])
        }
    }

    setState({ ...state, filteredEmps: newFiltered })
}

var empsToDisplay = state.filteredEmps
var arrowToDisplay = 'https://i.pinimg.com/originals/cc/99/3a/cc993a2f30c64a3a9ea1ae1a5a434704.png'

// STATEMENT FOR ALPHABETIZING NAMES
    if (state.handleOrder === true) {

        empsToDisplay = state.filteredEmps

        if (state.asc === true) {
            console.log('WE SHOULD GO A TO Z ASC !!!')
            empsToDisplay.sort(function (a, b) {
                if (a.name.first < b.name.first) { return -1; }
                if (a.name.first > b.name.first) { return 1; }
                return 0;
            })
            arrowToDisplay = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Noun_Project_down_arrow_icon_719904_cc.svg/725px-Noun_Project_down_arrow_icon_719904_cc.svg.png'
        } else {
            console.log('WE SHOULD GO Z TO A DSC !!!')
            empsToDisplay.sort(function (a, b) {
                if (a.name.first > b.name.first) { return -1; }
                if (a.name.first < b.name.first) { return 1; }
                return 0;
            })
            arrowToDisplay = 'https://i.pinimg.com/originals/cc/99/3a/cc993a2f30c64a3a9ea1ae1a5a434704.png'
        }
    } 

return (
    <div className="App">
        <h5 className="input">Employee Name</h5>
        <input className="textArea" onChange={handleTyping}></input>
        <table className='table' style={{ width: "80%", margin: "auto" }}>
            <tbody>
                <tr>
                    <th><h2 className="tableHeader">Photo</h2></th>
                    <th><h2 className="tableHeader">Name</h2><label className="switch"><img  src={arrowToDisplay} style={{height: '25px'}} onClick={handleAlphabet}></img></label></th>
                    <th><h2 className="tableHeader">Email</h2></th>
                    <th><h2 className="tableHeader">Phone</h2></th>
                    <th><h2 className="tableHeader">DOB</h2></th>
                </tr>
            </tbody>
            {empsToDisplay.map((emp, i) => {
                return (
                    <tbody key={i} >
                        <tr>
                            <td><img alt="Employee" src={emp.picture.medium}></img></td>
                            <td><h3 className="empName">{emp.name.first} {emp.name.last}</h3></td>
                            <td><h4 className="empAttr">{emp.email}</h4></td>
                            <td><h4 className="empAttr">{emp.phone}</h4></td>
                            <td><h4 className="empAttr">{emp.dob.date.slice(0, 10)}</h4></td>
                        </tr>
                    </tbody>
                )
            })
            }
        </table>
    </div>
)}
export default EmpContainer;