using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManagement.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeTable_EmployeeTable_ManagerId",
                table: "EmployeeTable");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeTable_ManagerId",
                table: "EmployeeTable");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "EmployeeTable");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ManagerId",
                table: "EmployeeTable",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTable_ManagerId",
                table: "EmployeeTable",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeTable_EmployeeTable_ManagerId",
                table: "EmployeeTable",
                column: "ManagerId",
                principalTable: "EmployeeTable",
                principalColumn: "Id");
        }
    }
}
