using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Kvorum_App.DB
{
    public class ApplicationDbContext :IdentityDbContext<ApplicationUser>
    {
        //public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        //    : base(options)
        //{
        //}:System.Data.Entity.DbContext//:
        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().Ignore(c => c.LockoutEndDateUtc);//.Ignore(c => c.LockoutEnabled)

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
