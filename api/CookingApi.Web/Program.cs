using System.Text.Json;
using CookingApi.Domain.DAL.Base;
using CookingApi.Infrastructure.DAL.Base;
using CookingApi.Infrastructure.Extensions;
using CookingApi.Infrastructure.Models.DTO.Auth;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Infrastructure.Services.Implementations;
using CookingApi.Web.Filters;
using CookingApi.Web.Helpers;
using CookingApi.Web.Middlewares;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions()
{
  ContentRootPath = Directory.GetCurrentDirectory(),
  WebRootPath = "wwwroot",
});
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
    .SetMinimumLevel(LogLevel.Trace)
    .AddConsole());

ILogger logger = loggerFactory.CreateLogger<Program>();
logger.LogTrace("ConnectionStrings:name ="+ builder.Configuration.GetSection("ConnectionStrings:name").Value);
logger.LogTrace("ConnectionStrings:local =" + builder.Configuration.GetSection("ConnectionStrings:local").Value);
logger.LogTrace("Kestrel:Urls =" + builder.Configuration.GetSection("Kestrel:Urls").Value);


builder.WebHost.UseKestrel(options =>
{
  options.Limits.MaxRequestBodySize = long.MaxValue;
});
builder.WebHost.UseUrls(builder.Configuration.GetSection("Kestrel:Urls").Value);

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(builder =>
 {
   builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
 });
});

builder.Services.AddControllers(options =>
{
  options.Filters.Add(new AuthFilterAttribute());
}).AddNewtonsoftJson();


builder.Services.Configure<JsonOptions>(options =>
{
  options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});


var dbConnectionName = builder.Configuration.GetSection("ConnectionStrings:name").Value;

if (string.IsNullOrWhiteSpace(dbConnectionName))
  throw new Exception("db_connection_name_missing");

NHibernateHelper.Initialize(dbConnectionName, builder);

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddScoped<ISettingsService, SettingsService>();
builder.Services.AddScoped<IDossierService, DossierService>();
HttpContextExtensions.AddHttpContextAccessor(builder.Services);

builder.Services.Configure<UserOptions>(builder.Configuration.GetSection("Users"));

//builder.Services.AddHsts(options =>
//            {
//              options.Preload = true;
//              options.IncludeSubDomains = true;
//              options.MaxAge = TimeSpan.FromDays(365);
//            });

var app = builder.Build();
//app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlerMiddleware>();

//app.UseHsts();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
  ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});


app.UseHttpContext();
app.UseCors();
app.MapControllers();
app.Run();
