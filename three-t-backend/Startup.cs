using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using three_t_backend.Models;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Cors;
using three_t_backend.SignalRHubs;

namespace three_t_backend
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserContext>(opt => opt.UseInMemoryDatabase("UserList"));
            services.AddDbContext<MoveContext>(opt => opt.UseInMemoryDatabase("MoveList"));
            services.AddDbContext<GameContext>(opt => opt.UseInMemoryDatabase("GameList"));
            services.AddCors();
            services.AddSignalR();
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "TIC-TAC-TOE API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TIC-TAC-TOE API V1");
            });

            app.UseCors(options =>
                options.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
            );

            app.UseSignalR(routes => {
                routes.MapHub<MoveHub>("move");
            });

            app.UseMvc();
        }
    }
}
