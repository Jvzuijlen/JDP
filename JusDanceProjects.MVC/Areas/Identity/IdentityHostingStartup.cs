using System;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(JusDanceProjects.MVC.Areas.Identity.IdentityHostingStartup))]
namespace JusDanceProjects.MVC.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<DataContext>(options =>
                    options.UseSqlite(
                        context.Configuration.GetConnectionString("DefaultConnection")));

                services.AddDefaultIdentity<User>(x => {
                    x.SignIn.RequireConfirmedAccount = false;
                    x.SignIn.RequireConfirmedEmail = false;
                    x.SignIn.RequireConfirmedPhoneNumber = false;

                    x.Password.RequireDigit = false;
                    x.Password.RequireNonAlphanumeric = false;
                    x.Password.RequiredLength = 4;
                    x.Password.RequireUppercase = false;

                }).AddEntityFrameworkStores<DataContext>();

            });
        }
    }
}