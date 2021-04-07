using Microsoft.Owin.Security.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
 

namespace Kvorum_App
{
    public partial class Main : System.Web.UI.MasterPage
    {
        protected global::System.Web.UI.WebControls.DataList dlClaims;
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void login_Click(object sender, EventArgs e)
        {
            //if (!Request.IsAuthenticated)
            //{//d
            //    HttpContext.Current.GetOwinContext().Authentication.Challenge();
            //}
            //else
            //{
            //    var claims = ClaimsPrincipal.Current.Claims;
            //    dlClaims.DataSource = claims;
            //    dlClaims.DataBind();
            //}
        }
    }
}