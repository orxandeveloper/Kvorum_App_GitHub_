using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using OpenAthens.Owin.Security.OpenIdConnect;
using Owin;

namespace Kvorum_App
{
    public partial class Startup
    {

        public static string OidcAuthority = ConfigurationManager.AppSettings["oidc:Authority"];
        public static string OidcRedirectUrl = ConfigurationManager.AppSettings["oidc:RedirectUrl"];
        public static string OidcClientId = ConfigurationManager.AppSettings["oidc:ClientId"];
        public static string OidcClientSecret = ConfigurationManager.AppSettings["oidc:ClientSecret"];

        public void ConfigureAuth(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            var oidcOptions = new OpenIdConnectAuthenticationOptions
            {
                Authority = OidcAuthority,

                ClientId = "mvc",//OidcClientId,
                ClientSecret = "secret",//OidcClientSecret,
                //GetClaimsFromUserInfoEndpoint = true,
                PostLogoutRedirectUri = "http://localhost:5002/signout-callback-oidc",//OidcRedirectUrl,
                RedirectUri = "http://localhost:5002/signin-oidc",//OidcRedirectUrl,
                ResponseType = "code",//OpenIdConnectResponseType.CodeIdToken,
                Scope = "api1 openid profile",//OpenIdConnectScope.OpenId
               
            };

            app.UseOpenIdConnectAuthentication(oidcOptions);
        }
    }
}