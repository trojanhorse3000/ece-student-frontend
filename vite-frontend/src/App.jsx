import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  
  const BASE_URL = 'http://127.0.0.1:8000'

  const [students, setStudents] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')  
  const [isEditing, setIsEditing] = useState(false)
//explaination: useState is a React hook that allows you to add state to functional components. In this code, we are using useState to create state variables for students, id, name, and course. The initial value of students is an empty array, while the initial values of id, name, and course are empty strings.

  async function getAllStudents() {
    const response = await axios.get(`${BASE_URL}/students`)
     //is an asynchronous function that makes a GET request to the backend API to fetch all student records. It uses the axios library to send the request and waits for the response. Once the response is received, it updates the students state variable with the data received from the API using
    setStudents(response.data)
  }

  useEffect(() => {
    getAllStudents()
  }, [])
  function storeId(e) {
    setId(e.target.value)
  }
  function storeName(e) {
    setName(e.target.value)
  }
  function storeCourse(e) {
    setCourse(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const student = { id, name, course }
    await axios.post(`${BASE_URL}/students`, student)
    getAllStudents()
  }
  async function sendData(e) {
   if (isEditing === false) { 
     const response = await axios.post(`${BASE_URL}/students`, { 
      id: id,
      name:name,
      course:course })
      alert(response.data.detail)
    } else {
      const response = await axios.put(`${BASE_URL}/students/${id}`, { 
        name: name,
        course: course })
      alert(response.data.detail)
    }
  }

  function edit(student) {    
    setId(student.id)
    setName(student.name)
    setCourse(student.course) 
    setIsEditing(true)
  }

  async function deleteRecordStudent(student) {
    await axios.delete(`${BASE_URL}/students/${student.id}`)
    getAllStudents()
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <form className="student-form" onSubmit={handleSubmit} >
        <input type="number" placeholder="ID" onChange={storeId} value={id} />
        <input type="text" placeholder="name" onChange={storeName} value={name} />
        <input type="text" placeholder="Course" onChange={storeCourse} value={course} />
        <button onClick={sendData}>{isEditing ? "Update" : "Submit"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map((student) => {
              return (
                <tr key={student.id}>  
                  <td>{student.id}</td> 
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td><button className='edit-btn' onClick={() => {edit(student)}}>Edit</button></td>
                  <td><button className='delete-btn' onClick={() => {deleteRecordStudent(student)}}>Delete</button></td>
                </tr>
              )
            } ) // map method is used to iterate over the students array and render each student as a table row
          }
        </tbody>
      </table>
    </div>
  );
}
export default App;