using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using IdentityModel;
using IdentityModel.Client;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Notifications;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;

namespace Kvorum_App
{





    public partial class Startup
    {

        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "ApplicationCookie",
                ExpireTimeSpan = TimeSpan.FromMinutes(10),
                SlidingExpiration = true

            });
            string url = "http://localhost:5002/ClientLogin.aspx"; //"https://test.upravbot.ru/ClientLogin.aspx";// ;// "http://172.20.20.115/ClientLogin.aspx"; //

            //"http://localhost:5002/ClientLogin.aspx"; 
            //
            //"http://172.20.20.115/ClientLogin.aspx"
            //HttpContext.Current.Request.Url.Host + "/ClientLogin.aspx";
            var oidcOptions = new OpenIdConnectAuthenticationOptions
            {
                ClientId = "aspx",
                Authority = "https://upravbot.ru/IDS4/", //"https://localhost:5002/",
                RedirectUri = url ,
                Scope = "apiCore profile openid offline_access api1",
                ResponseType = "code",
                SignInAsAuthenticationType = "cookie",
                PostLogoutRedirectUri= "https://upravbot.ru/IDS4/Account/Login",// "https://upravbot.ru/IDS4/signout-callback-oidc",// "http://localhost:5002/signout-callback-oidc",
                RequireHttpsMetadata = false,
                UseTokenLifetime = true,
                
                RedeemCode = true,
                SaveTokens = true,
                ClientSecret = "secret",
              


                ProtocolValidator = new OpenIdConnectProtocolValidator()
                {
                    NonceLifetime = new TimeSpan(0, 8, 0, 0),
                    RequireNonce = false,
                    RequireState = false,
                    RequireStateValidation = false,

                    RequireTimeStampInNonce = false

                },

                Notifications = new OpenIdConnectAuthenticationNotifications
                { 

                    SecurityTokenValidated = async n =>
                    {
                        var claims_to_exclude = new[]
                        {
                            "aud", "iss", "nbf", "exp", "nonce", "iat", "at_hash"
                        };

                        var claims_to_keep =
                            n.AuthenticationTicket.Identity.Claims
                            .Where(x => false == claims_to_exclude.Contains(x.Type)).ToList();
                        claims_to_keep.Add(new Claim("id_token", n.ProtocolMessage.IdToken));
                      
                        if (n.ProtocolMessage.AccessToken != null)
                        {
                            claims_to_keep.Add(new Claim("access_token", n.ProtocolMessage.AccessToken));


                            var client = new HttpClient();
                            System.Web.HttpContext.Current.Session["Token"] = n.ProtocolMessage.AccessToken;
                            System.Web.HttpContext.Current.Session["IdTokenHint"] = n.ProtocolMessage.IdToken;//n.ProtocolMessage.IdTokenHint;
                            // System.Web.HttpContext.Current.Session["tt"] = tt;
                            var userInfoClient = await client.GetUserInfoAsync(new UserInfoRequest
                            {

                                Address = "https://upravbot.ru/IDS4/connect/userinfo",//"https://localhost:5002/connect/userinfo",
                                Token = n.ProtocolMessage.AccessToken
                                
                           });



                            //var userInfoClient = new IdentityModel.Client.UserInfoClient(new Uri("https://localhost:5002/connect/userinfo"), n.ProtocolMessage.AccessToken);

                            var userInfoResponse = userInfoClient;
                            string Login_Data = userInfoResponse.Raw;
                            System.Web.HttpContext.Current.Session["Login_Data"] = Login_Data;
                            var userInfoClaims = userInfoResponse.Claims
                             .Where(x => x.Type != "sub") // filter sub since we're already getting it from id_token
                             .Select(x => new Claim(x.Type, x.Value));
                            claims_to_keep.AddRange(userInfoClaims);
                        }

                        var ci = new ClaimsIdentity(
                            n.AuthenticationTicket.Identity.AuthenticationType,
                            "name", "role");
                        ci.AddClaims(claims_to_keep);

                        n.AuthenticationTicket = new Microsoft.Owin.Security.AuthenticationTicket(
                            ci, n.AuthenticationTicket.Properties
                        );
                    },
                    RedirectToIdentityProvider = n =>
                    {
                        if (n.ProtocolMessage.RequestType == OpenIdConnectRequestType.Logout)
                        {
                            
                            var id_token = n.OwinContext.Authentication.User.FindFirst("id_token")?.Value;
                           
                            n.ProtocolMessage.IdTokenHint = id_token;
                        
                        }

                        return Task.FromResult(0);
                    }
                }



            };
            app.UseOpenIdConnectAuthentication(oidcOptions);



        }

    }
}
