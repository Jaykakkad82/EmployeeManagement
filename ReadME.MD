# Employee Management System : Basic CRUD Operations Demmo
![Architectue](Documentation\employee-mgm.drawio.png)

## Instructions to Run the App locally
#### Step 1 : Set up the Database 
- Download SQL server (SQL Express) and Server Studio.
- Create Database EmployeesEID
- In Visual Studio (VS), open server explorer and connect to the database.
- Create table in database by running migration: Run in package manager console: - "Add-Migration MigrationName", "Update-Database
"
- Check in studio if the database table 'EmployeeTable' exists
- Insert Sample data to database : From the Studio, connect to database, run the sample query provided in documentation
- Based on the ServerName and DatabaseName, check the connectiostring name in the appsettings.json


#### Step 2: Start the backend Server.
- Install in nuget package manager:EntityFramework.Core.sqlserver, EntityFramework.Core.Tools
- Click on Run 'http' to start the server, the server runs in http://localhost:5238/

### Step3: Start React server:
- Go the the folder and run "npm start". 
- the frontend application will run in http://localhost:3000/