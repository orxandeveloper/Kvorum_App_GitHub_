using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Super_Disp
{
    public partial class Super : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            //authenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType,
            // OpenIdConnectAuthenticationDefaults.AuthenticationType);
            //Response.Redirect("")

        }

        protected void vixod2_Click(object sender, EventArgs e)
        {
          
            try
            {
                var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                authenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType,
                 OpenIdConnectAuthenticationDefaults.AuthenticationType);


                Session.Abandon();
                Session.Clear();
                HttpCookie currentUserCookie = HttpContext.Current.Request.Cookies["mycookie"];
                HttpContext.Current.Response.Cookies.Remove("mycookie");
                currentUserCookie.Expires = DateTime.Now.AddDays(-10);
                currentUserCookie.Value = null;
                HttpContext.Current.Response.SetCookie(currentUserCookie);

               
            }
            catch (Exception ex)
            {

                
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Mydb.SigOutFromIdendity();
        
        }
    }
}