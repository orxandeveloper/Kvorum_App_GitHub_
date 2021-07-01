using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.DB
{
    public class ApplicationUser: IdentityUser
    {
        public string Password_deser { get; set; }
        public string SecondName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string TypeOrgName { get; set; }
        public string NormalizedUserName { get; set; }
        public string NormalizedEmail { get; set; }
        public string ConcurrencyStamp { get; set; }

    }
}