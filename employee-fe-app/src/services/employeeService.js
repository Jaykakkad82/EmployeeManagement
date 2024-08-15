import axios from 'axios';

// const url = "https://employeemanagement-2024-basiccrud-bjaqc3fdcvhhcugr.centralus-01.azurewebsites.net";
const url = "http://localhost:5238";

const API_URL = `${url}/api/v1/employees`;

export const getEmployees = () => {
  return axios.get(API_URL);
};

export const getEmployee = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createEmployee = (employee) => {
  return axios.post(API_URL, employee);
};

export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
