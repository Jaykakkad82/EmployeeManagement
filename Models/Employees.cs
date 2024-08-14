using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Models
{
    public enum Department
    {
        HR = 0,
        IT = 1,
        Finance = 2,
        Marketing = 3,
        Technology = 4,
        Unassigned = 5
    }


    // validate if the date of birth is in the past
    public class EmployeeValidators
    {
        public static ValidationResult ValidateDateOfBirth(DateTime dateOfBirth, ValidationContext context)
        {
            if (dateOfBirth < DateTime.UtcNow)
                return ValidationResult.Success;
            else
                return new ValidationResult("Date of birth must be in the past.");
        }
    }

    public class Employees
    {
        // name, email, date-of-birth and department


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]         // ID is auto incremented
        public int Id { get; set; }


        [Required]
        [MaxLength(100)]
        public string Name { get; set; }= "NoName";


        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; } = "NoEmail";


        [DataType(DataType.Date)]
        [CustomValidation(typeof(EmployeeValidators), "ValidateDateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public Department Department { get; set; } = Department.Unassigned;


        // other non-required fields

        [Phone]
        [MaxLength(13)]
        public string PhoneNumber { get; set; } = "0000000000";

        [DataType(DataType.Date)]
        public DateTime HireDate { get; set; }= DateTime.UtcNow;

        [MaxLength(100)]
        public string Position { get; set; }

        [DataType(DataType.Currency)]
        [Precision(10,2)]
        public decimal Salary { get; set; } = 0.0M;

        // Adding ForeignKey attribute to link ManagerId to another Employee's Id
        [ForeignKey("Manager")]
        public int? ManagerId { get; set; } = null;

        // Navigation property to represent the manager
        public virtual Employees Manager { get; set; }

        public bool IsActive { get; set; } = true;



    }
}
