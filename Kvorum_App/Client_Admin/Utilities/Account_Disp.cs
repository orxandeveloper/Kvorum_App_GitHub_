using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Client_Admin.Utilities
{
    public class Account_Disp
    {
        public string ACCOUNT_NAME { get; set; }
        public string LOG_IN_ID { get; set; }
        public List<Roles> roles { get; set; }

    }
}