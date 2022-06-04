using System.Text.Json;
using CookingApi.Domain.DAL.Base;
using CookingApi.Infrastructure.DAL.Base;
using CookingApi.Infrastructure.Models.DTO.Auth;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Infrastructure.Services.Implementations;
using CookingApi.Web.Filters;
using CookingApi.Web.Helpers;
using CookingApi.Web.Middlewares;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
   {
        //builder.WithOrigins("http://localhost:800").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        //builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        //builder.SetIsOriginAllowed(origin => true);
    });
});

builder.Services.AddControllers(options =>
{
  options.Filters.Add(new AuthFilterAttribute());
});


builder.Services.Configure<JsonOptions>(options =>
{
  options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

var dbConnectionName = Environment.GetEnvironmentVariable("DB_CONNECTION_NAME");

if (string.IsNullOrWhiteSpace(dbConnectionName))
    throw new Exception("db_connection_name_missing");

NHibernateHelper.Initialize(dbConnectionName, builder);

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddSingleton<IAuthService, AuthService>();
//builder.Services.AddTransient<AuthFilterAttribute>();

builder.Services.AddScoped<ICourseService, CourseService>();

builder.Services.Configure<UserOptions>(builder.Configuration.GetSection("Users"));

var app = builder.Build();
app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseAuthorization();
app.UseCors();
app.MapControllers();
app.Run();
