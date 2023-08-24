using Microsoft.EntityFrameworkCore;
using backend.Services;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add data helper
services.AddDbContext<MediaDB>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("BackendDatabase")));

// Add services singletons
services.AddScoped<IMediaService, MediaService>();

// Add services to the container.
services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
