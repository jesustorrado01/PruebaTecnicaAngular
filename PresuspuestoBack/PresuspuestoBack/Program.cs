using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PresuspuestoBack.Models;
using PresuspuestoBack.Servicios;
using PresuspuestoBack.Servicios.TipoGastoService;
using PresuspuestoBack.Servicios.FondoMonetarioService;
using PresuspuestoBack.Servicios.PresupuestoService;
using PresuspuestoBack.Servicios.ReportesService;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ================= CONEXIÓN A SQL =================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// ================= JWT =================
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });


// ================= SERVICIOS E INTERFACES =================
builder.Services.AddScoped<IJwTServicio, JwtServicio>();
builder.Services.AddScoped<ITipoGastoServicio, TipoGastoService>();
builder.Services.AddScoped<IFondoMonetarioServicio, FondoMonetarioServicio>();
builder.Services.AddScoped<IPresupuestoServicio, PresupuestoServicio>();
builder.Services.AddScoped<IReportesServicios, ReporteServicio>();

// ================= CORS (para Angular) =================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// ================= SERVICIOS =================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ================= MIDDLEWARE =================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
