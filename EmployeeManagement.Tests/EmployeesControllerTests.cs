using EmployeeManagement.Controllers;
using EmployeeManagement.Models;
using EmployeeManagement.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

// TESTING the Controller: 
// Key IDEA is to test the EndPoints of the controller
// CRUD operations are tested i.e. GET, POST, PUT, DELETE

[assembly: CollectionBehavior(DisableTestParallelization = true)]

public class EmployeesControllerTests
{
    private readonly MyAppDbContext _context;
    private readonly EmployeesController _controller;

    public EmployeesControllerTests()
    {
        var options = new DbContextOptionsBuilder<MyAppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new MyAppDbContext(options);
        _controller = new EmployeesController(_context);
        // Clear the in-memory database by removing all entries from each DbSet
        ClearDatabase();

        //// Base values
        _context.EmployeeTable.AddRange(new List<Employees>
        {
            new Employees {Id = 1, Name = "John Doe", Email = "john@example.com", IsActive = true, Position = "Developer" },
            new Employees {Id = 2, Name = "Jane Smith", Email = "jane@example.com", IsActive = true, Position = "Manager" }
        });
        _context.SaveChanges();
    }

    private void ClearDatabase()
    {
        // Remove all entities from the EmployeeTable DbSet
        _context.EmployeeTable.RemoveRange(_context.EmployeeTable);
        _context.SaveChanges();
    }

    [Fact]
    public async Task GetEmployees_ReturnsAllActiveEmployees()
    {
        var result = await _controller.GetEmployees(null, null, null);
        var actionResult = Assert.IsType<ActionResult<IEnumerable<Employees>>>(result);
        var returnValue = Assert.IsType<List<Employees>>(actionResult.Value);
        Assert.True(returnValue.Count == 2);

    }

    [Fact]
    public async Task GetEmployee_ReturnsEmployeeById()
    {
        // Act
        var result = await _controller.GetEmployee(1);

        // Assert
        var actionResult = Assert.IsType<ActionResult<Employees>>(result);
        var returnValue = Assert.IsType<Employees>(actionResult.Value);
        Assert.Equal(1, returnValue.Id);
        Assert.Equal("John Doe", returnValue.Name);
    }


    [Fact]
    public async Task GetEmployee_ReturnsNotFound_WhenEmployeeDoesNotExist()
    {
        // Act
        var result = await _controller.GetEmployee(999); // An ID that does not exist

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }


    [Fact]
    public async Task PostEmployee_CreatesNewEmployee()
    {
        // Arrange
        var newEmployee = new Employees { Id = 3, Name = "Sam Wilson", Email = "sam@example.com", IsActive = true, Position = "Tester" };

        // Act
        var result = await _controller.PostEmployee(newEmployee);

        // Assert
        var actionResult = Assert.IsType<ActionResult<Employees>>(result);
        var createdResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
        var returnValue = Assert.IsType<Employees>(createdResult.Value);
        Assert.Equal(3, returnValue.Id);
        Assert.Equal("Sam Wilson", returnValue.Name);

        // Verify the employee was added
        var employeeInDb = _context.EmployeeTable.Find(3);
        Assert.NotNull(employeeInDb);
        Assert.Equal("Sam Wilson", employeeInDb.Name);
    }


    [Fact]
    public async Task PutEmployee_UpdatesExistingEmployee()
    {
        var employeeToBeUpdated = _context.EmployeeTable.Find(2);
        if (employeeToBeUpdated != null)
        {
            // Update the existing entity instead of adding a new one
            employeeToBeUpdated.Name = "Updated Name";
            employeeToBeUpdated.Email = "updatedname@example.com";
        }
        else
        {
            // This should not happen. Failed to get employee with a given Id.
            Assert.True(false);
        }

        // Act
        var result = await _controller.PutEmployee(2, employeeToBeUpdated);

        // Assert
        Assert.IsType<NoContentResult>(result);

        // Verify the employee was updated
        var employeeInDb = _context.EmployeeTable.Find(2);
        Assert.NotNull(employeeInDb);
        Assert.Equal("Updated Name", employeeInDb.Name);
        Assert.Equal("updatedname@example.com", employeeInDb.Email);
        //Assert.Equal("Lead Developer", employeeInDb.Position);
    }


    [Fact]
    public async Task PutEmployee_ReturnsBadRequest_WhenIdMismatch()
    {
        // Arrange
        var updatedEmployee = new Employees { Id = 2, Name = "Jane Smith Updated", Email = "jane_updated@example.com", IsActive = true, Position = "Lead Manager" };

        // Act
        var result = await _controller.PutEmployee(1, updatedEmployee);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task DeleteEmployee_RemovesEmployee()
    {
        // Act
        var result = await _controller.DeleteEmployee(1);

        // Assert
        Assert.IsType<NoContentResult>(result);

        // Verify the employee was deleted
        var employeeInDb = _context.EmployeeTable.Find(1);
        Assert.Null(employeeInDb);
    }


    [Fact]
    public async Task DeleteEmployee_ReturnsNotFound_WhenEmployeeDoesNotExist()
    {
        // Act
        var result = await _controller.DeleteEmployee(999); // An ID that does not exist

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }


}
