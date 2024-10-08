import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './EmployeeDetails.css';  // Import the CSS file

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  const url = "http://localhost:5238";
   // const url = "https://employeemanagement-2024-basiccrud-bjaqc3fdcvhhcugr.centralus-01.azurewebsites.net"

  useEffect(() => {
    axios.get(`${url}/api/v1/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details">
      <h2>{employee.name}</h2>
      <p>Email: {employee.email}</p>
      <p>Date of Birth: {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
      <p>Department: {employee.department}</p>
      <p>Phone: {employee.phoneNumber}</p>
      <p>Hire Date: {new Date(employee.hireDate).toLocaleDateString()}</p>
      <p>Position: {employee.position}</p>
      <p>Salary: ${employee.salary}</p>
      <p>Active: {employee.isActive ? 'Yes' : 'No'}</p>
      <Link to={`/edit-employee/${id}`} className="btn btn-primary">Edit</Link>
    </div>
  );
}

export default EmployeeDetails;
