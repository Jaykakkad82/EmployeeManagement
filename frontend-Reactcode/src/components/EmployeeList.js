import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';  // Import the CSS file

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  // Department mapping
  const departmentOptions = [
    { value: 0, label: "HR" },
    { value: 1, label: "IT" },
    { value: 2, label: "Finance" },
    { value: 3, label: "Marketing" },
    { value: 4, label: "Technology" },
    { value: 5, label: "Unassigned" }
  ];

  // Fetch all employees initially
  useEffect(() => {
    axios.get('http://localhost:5238/api/v1/Employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // If no search term, fetch all employees
    if (!name && !email && !department) {
      axios.get('http://localhost:5238/api/v1/Employees')
        .then(response => {
          setEmployees(response.data);
        })
        .catch(error => console.error(error));
      return;
    }

    // Fetch employees based on search inputs
    const fetchEmployees = async () => {
      try {
        const params = new URLSearchParams();
        if (name) {
          params.append('name', name );
        }
        if (email) {
          params.append('email', email );
        }
        if (department) {
          params.append('department', department);
        }
        const response = await axios.get(`http://localhost:5238/api/v1/Employees?${params.toString()}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error searching employees:', error);
      }
    };

    fetchEmployees();
  }, [name, email, department]);

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

    if (confirmDelete) {
      axios.delete(`http://localhost:5238/api/v1/Employees/${id}`)
        .then(() => {
          setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
          console.log(`Employee ${name} with id: ${id} deleted successfully.`);
        })
        .catch(error => console.error('There was an error deleting the employee:', error));
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3 search-bar"
        />
        <input
          type="text"
          placeholder="Search by Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3 search-bar"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="form-control mb-3 search-bar"
        >
          <option value="">Search by Department</option>
          {departmentOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <Link to="/add-employee" className="btn add-btn mb-3">ADD: New Employee</Link>
      <table className="table employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
              <td>{departmentOptions.find(option => option.value === employee.department)?.label}</td>
              <td className="action-buttons">
                <Link to={`/employee/${employee.id}`} className="btn btn-info btn-sm view-btn">View Details</Link>{' '}
                <Link to={`/edit-employee/${employee.id}`} className="btn btn-warning btn-sm edit-btn">Edit</Link>{' '}
                <button 
                  onClick={() => handleDelete(employee.id, employee.name)} 
                  className="btn btn-danger btn-sm delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
