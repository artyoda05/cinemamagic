using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Cinemamagic.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CinemamagicContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CinemamagicContext"), builder =>
    {
        builder.EnableRetryOnFailure();
    }));

//builder.Services.AddDbContext<CinemamagicContext>(options =>
//    options.UseInMemoryDatabase("CinemamagicContext"));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("CorsPolicy");

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
