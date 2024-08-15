
//using EmployeeManagement.Services;
//using Microsoft.EntityFrameworkCore;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp",
//        builder =>
//        {
//            builder.WithOrigins("https://employeemanagement-2024-basiccrud-bjaqc3fdcvhhcugr.centralus-01.azurewebsites.net") 
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//        });
//});

//builder.Services.AddDbContext<MyAppDbContext>(options =>
//{
//    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//    options.UseSqlServer(connectionString);
//});

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/api/v1/error"); // Ensure this API endpoint is set up to handle errors
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();  // This serves static files from wwwroot by default

//app.UseRouting();

//app.UseCors("AllowReactApp");

//app.UseAuthorization();

//app.MapControllers();

//// Serve the React app for all unknown routes
//app.MapFallbackToFile("/ReactApp/index.html"); // Ensure the correct path relative to wwwroot

//app.Run();



using EmployeeManagement.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // Update this with your React app's URL if running locally
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<MyAppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/api/v1/error"); // Ensure this API endpoint is set up to handle errors
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();  // This serves static files from wwwroot by default

app.UseRouting();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

// Serve the React app for all unknown routes
app.MapFallbackToFile("/ReactApp/index.html"); // Ensure the correct path relative to wwwroot

app.Run();



