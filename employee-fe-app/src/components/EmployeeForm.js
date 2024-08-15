import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeForm.css'; // Import the CSS file

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    department: 5, // Default to 'Unassigned' (5 in the enum)
    phoneNumber: '',
    hireDate: '',
    position: '',
    salary: 0.0,
    isActive: true,
  });

  // const url = "https://employeemanagement-2024-basiccrud-bjaqc3fdcvhhcugr.centralus-01.azurewebsites.net"
  const url = "http://localhost:5238";

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${url}/api/v1/employees/${id}`)
        .then(response => {
          const employeeData = response.data;
          // Format dates to YYYY-MM-DD
          employeeData.dateOfBirth = employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toISOString().split('T')[0] : '';
          employeeData.hireDate = employeeData.hireDate ? new Date(employeeData.hireDate).toISOString().split('T')[0] : '';
          setEmployee(employeeData);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: type === 'checkbox' ? checked : 
              name === 'salary' ? parseFloat(value) : 
              value,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    const birthDate = new Date(employee.dateOfBirth);
    const hireDate = new Date(employee.hireDate);
    const ageAtHire = hireDate.getFullYear() - birthDate.getFullYear();

    if (!employee.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of Birth is required.";
    }

    if (!employee.hireDate) {
      validationErrors.hireDate = "Hire Date is required.";
    } else if (hireDate <= birthDate) {
      validationErrors.hireDate = "Hire Date should be after Date of Birth.";
    } else if (ageAtHire < 18) {
      validationErrors.hireDate = "Employee must be at least 18 years old at the time of hiring.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const apiCall = id
        ? axios.put(`${url}/api/v1/employees/${id}`, employee)
        : axios.post(`${url}/api/v1/employees`, employee);
  
      apiCall
        .then(() => {
          setSuccessMessage(`Successfully ${id ? 'updated' : 'added'} ${employee.name}`);
          setTimeout(() => {
            navigate('/employees');  // Redirect to the employee list after 2 seconds
          }, 2000);
        })
        .catch(error => console.error('Error response:', error.response));
    }
  };

  return (
    <div className="employee-form-container">
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      {successMessage && <div className="alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={employee.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
        </div>

        <div className="form-group">
          <label>Hire Date:</label>
          <input
            type="date"
            name="hireDate"
            value={employee.hireDate}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.hireDate && <div className="text-danger">{errors.hireDate}</div>}
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value={5}>Unassigned</option>
            <option value={0}>HR</option>
            <option value={1}>IT</option>
            <option value={2}>Finance</option>
            <option value={3}>Marketing</option>
            <option value={4}>Technology</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="isActive"
            checked={employee.isActive}
            onChange={handleChange}
            className="form-check-input"
          />
          <label>Is Active</label>
        </div>

        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
