using Kvorum_App.Client_Admin.Utilities;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OpenIdConnect;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;


namespace Kvorum_App
{
    public partial class ClientLogin : System.Web.UI.Page
    {
        protected global::System.Web.UI.WebControls.DataList dlClaims;
        protected void Page_Load(object sender, EventArgs e)
        {
            var keyExistsToken = check_for_session_key("Token");
            if (!check_for_session_key("Token"))
            {
                HttpContext.Current.GetOwinContext().Authentication.Challenge(
                            new AuthenticationProperties
                            {
                                RedirectUri = "/ClientLogin.aspx",



                            },
                            OpenIdConnectAuthenticationDefaults.AuthenticationType
                            ); 
            }
            string LoginNew = System.Configuration.ConfigurationManager.AppSettings["Idendity"];
            if (LoginNew == "true")
            {
                var keyExists = check_for_session_key("Login_Data");

                if (keyExists==true)
                {
                    HttpContext.Current.Response.Cookies.Remove("mycookie");
                    HttpContext.Current.Response.Cookies["mycookie"].Expires = DateTime.Now.AddDays(-1);
                    HttpCookie mycookie = new HttpCookie("mycookie");
                    mycookie.Value = System.Web.HttpContext.Current.Session["Login_Data"].ToString();
                    HttpContext.Current.Response.Cookies.Add(mycookie);
                }
                //(string.IsNullOrEmpty(System.Web.HttpContext.Current.Session["Login_Data"].ToString())) ? "" : System.Web.HttpContext.Current.Session["Login_Data"].ToString();

            }

            // Response.Redirect("https://upravbot.ru/IDS4/");
        }

        static bool check_for_session_key(string SessionKey)
        {
            foreach (var key in HttpContext.Current.Session.Keys)
            {
                if (key.ToString() == SessionKey) return true;
            }
            return false;
        }
        [WebMethod]
        public static string ConnectLs(string sc_C, string pwd_C,string device_id)
        {
            string r= Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_auth", new SqlParameter[] { new SqlParameter("@log", sc_C), new SqlParameter("@pwd", pwd_C),new SqlParameter("@DEVICE_ID", device_id) }, CommandType.StoredProcedure).ToString();
            return r;
        }

        [WebMethod]
        public static string LoginIdentity(string Id_, string isTenant,string role)
        {
            string returnvalue = null;
            try
            {
                
                if (isTenant== "false")
                {
                    /*
                     Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "2"), new SqlParameter("@lg", Id) }, CommandType.StoredProcedure);*/
                    if (role!= "УК")
                    {
                        returnvalue = UK_Login(Id_);
                    }
                    else
                    {
                        int CountOfMailAsClient = Convert.ToInt32(Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "6"), new SqlParameter("@mail", Id_) }, CommandType.StoredProcedure));

                        if (CountOfMailAsClient==0)
                        {
                            Mydb.ExecuteNoNQuery("InsertNewClient_T", new SqlParameter[] { new SqlParameter("@mail", Id_) }, CommandType.StoredProcedure);

                            returnvalue = UK_Login(Id_);
                        }
                        else
                        {
                            returnvalue = UK_Login(Id_);
                        }
                        
                    }
                   

                }
                else if(isTenant=="true")
                {
                    //Mydb.ExecuteAsJson("LoginSecond", new SqlParameter[] { new SqlParameter("@sc", Id_), new SqlParameter("@pass", pass) }, CommandType.StoredProcedure)
                    returnvalue= Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_get_accounts_by_device1", new SqlParameter[] { new SqlParameter("@device_id",Id_) }, CommandType.StoredProcedure);
                }
                 
            }
            catch (Exception ex)
            {

                returnvalue = "{\"result\" : \"ErrorIdendity\"}";
            }
            /*
              return Redirect(AppConstants.AuthServer() + "/connect/endsession?id_token_hint=" + idToken + "&post_logout_redirect_uri=" + AppConstants.ClientServer() + "/signout-callback-oidc");
             */


            //HttpContext.Current.Response.Redirect("https://upravbot.ru/IDS4/Account/Logout?logoutId=CfDJ8JQq6V4gQ1xPva8MeQadqxUh3pMtraOr8jUvW3qBRzq9wjZC_7fNFZKIYrQJb94_dXsQJdLY64yybb8ZktHoTlmfzsLBfLLKRHIAuq7no_fY4fV35KwYxS6yGoQ10iGckHDmBjHS6pJcM8SwTA141e9htZFEwmiA1BQ9klespO6JcD4xZLTWbHbKm9N0juHicGdGySaC0TS5WQBsdJ3CxhDQeAt9lmcNZLTlv-2zOS8aX1bnW3p_UkLyOOszvEij3SsQSdcxo4GzSMW6UJ5ZhVBO9PizBVpxKTgKf-0ntb1_EMTxBC20xBY1h_foAP_vjsAyt2a8mEFSxRdZRcjiBIM");
            //HttpContext.Current.Response.Cookies.Remove("cookie");
            //HttpContext.Current.Response.Cookies["cookie"].Expires = DateTime.Now.AddDays(-1);
            //HttpContext.Current.GetOwinContext().Authentication.SignOut("Cookies");
            //HttpContext.Current.GetOwinContext().Authentication.SignOut("oidc");
            //HttpContext.Current.GetOwinContext().Authentication.SignOut();
            //  HttpContext.Current.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            // examplefunction();
            return returnvalue;
        }

        private static string UK_Login(string Id_)
        {
            int Id = 0;
            string returnvalue = "";
            if (Id_.Contains('@'))
            {
                Id = Convert.ToInt32(Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "5"), new SqlParameter("@mail", Id_) }, CommandType.StoredProcedure));
            }
            else
            {
                Id_ = Id_.Substring(Id_.IndexOf('_') + 1);
                Id = Convert.ToInt32(Id_);
            }
            string Client_Id = Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@lg", Id), new SqlParameter("@procType", "1") }, CommandType.StoredProcedure).ToString();//1


            int count = (int)Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "2"), new SqlParameter("@lg", Id) }, CommandType.StoredProcedure);//2
            if (count == 1)
            {
                string role = Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "3"), new SqlParameter("@lg", Id) }, CommandType.StoredProcedure).ToString();//3
                string RolName = "Нечего";
                string ModulName = "Нечего";
                if (role == "4")
                {
                    ModulName = "Клиентское администрирование";
                    RolName = "Администратор";
                }
                if (role == "3")
                {
                    ModulName = "Диспетчерская";
                    RolName = "Диспетчер";
                }
                if (role == "1")
                {
                    ModulName = "Личный кабинет";
                    RolName = "Управляющий";
                }
                if (role == "15")
                {
                    ModulName = "Диспетчерская";
                    RolName = "Диспетчер поставщика";
                }
                if (role == "17")
                {
                    ModulName = "Диспетчерская";
                    RolName = "Супер Диспетчер";
                }

                if (role == "16")
                {
                    ModulName = "Профиль Управляющего";
                    RolName = "Ответственный";
                }
                Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Вход"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE",RolName),
                                    new SqlParameter("@EVENT_MODULE",ModulName),
                                    new SqlParameter("@EVENT_MESSAGE","Пользователь вошел в систему"),
                                    new SqlParameter("@EVENT_MAKER",Id)}, CommandType.StoredProcedure);
                returnvalue = "{\"result\" : \"1\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + Id + "\",\"RoleId\":\"" + role + "\"}";
            }
            if (count > 1)
            {
                DataTable dt = Mydb.ExecuteReadertoDataTable("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "3"), new SqlParameter("@lg", Id) }, CommandType.StoredProcedure);//3
                List<LoginDatas> lds = new List<LoginDatas>();
                foreach (DataRow item in dt.Rows)
                {
                    LoginDatas ld = new LoginDatas();
                    ld.ROLE_ID = item["ROLE_ID"].ToString();
                    ld.Id = Client_Id;
                    ld.LogId = Id.ToString();
                    ld.result = "5";
                    lds.Add(ld);

                }
                JavaScriptSerializer js = new JavaScriptSerializer();

                returnvalue = js.Serialize(lds);

            }
            return returnvalue;
        }

        private static void examplefunction()
        {
            /*"eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwQzQ5MzAzOUMyNjlDNzgxRTU1NTkyNTNFMzBDMkU4RTExNjZENkVSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6Ik1NU1RBNXdtbkhnZVZWa2xQakRDNk9FV2JXNCJ9.eyJuYmYiOjE2MTg5ODY1MTAsImV4cCI6MTYxODk5MDExMCwiaXNzIjoiaHR0cHM6Ly91cHJhdmJvdC5ydS9pZHM0IiwiYXVkIjoiaHR0cHM6Ly91cHJhdmJvdC5ydS9pZHM0L3Jlc291cmNlcyIsImNsaWVudF9pZCI6ImFzcHgiLCJzdWIiOiJlOTEyZGFlNC03ZjJmLTQyNTEtYTYwYy1lMTZiZGJkZTQ1ZmIiLCJhdXRoX3RpbWUiOjE2MTg5ODY1MDksImlkcCI6ImxvY2FsIiwianRpIjoiMTI2NkY3NUJBMUEzQ0VFQzAyNkRCNEY2Q0FCMUNDMkQiLCJzaWQiOiIxRkZCQjE2OTM2RkQ2RDNFNDU1NUUxNDJERTREQTEzNCIsImlhdCI6MTYxODk4NjUxMCwic2NvcGUiOlsiYXBpQ29yZSIsInByb2ZpbGUiLCJvcGVuaWQiLCJhcGkxIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.Lhg35sdDGN0oG_c14FJh23Q8Xjf_A4dFujzyFsIYG2Z2Oqyl1V62r04nNb4UHhbCdEnnD33ShzCocpsd8OC15mN_06ImFUhYuzeBPOXpB1cTyUvTnzlvAHylmRFR5NAM4tyx-9GnIg_vz-Rxyzh08SoKij-RTaJTeySeCHswSMxYOR4seRwCsnM0kg0wTb0P7gdk1NvMzrQU4Pryk7qjz2SIwwDB8f1cyCIekTq7n8esCDlxLdEiOanLJ2yzfsUn_veAxUq-l0Pzr4I_dTDsa55H53NqVpD5dR8MpyxVRAWck245obyBQr0apOYX3inoJ4sxGSuSqs7KYyWeS_AO-A"*/
            string URL = "https://upravbot.ru/IDS4/Account/Logout?logoutId=eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwQzQ5MzAzOUMyNjlDNzgxRTU1NTkyNTNFMzBDMkU4RTExNjZENkVSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6Ik1NU1RBNXdtbkhnZVZWa2xQakRDNk9FV2JXNCJ9.eyJuYmYiOjE2MTg5OTMyNzUsImV4cCI6MTYxODk5Njg3NSwiaXNzIjoiaHR0cHM6Ly91cHJhdmJvdC5ydS9pZHM0IiwiYXVkIjoiaHR0cHM6Ly91cHJhdmJvdC5ydS9pZHM0L3Jlc291cmNlcyIsImNsaWVudF9pZCI6ImFzcHgiLCJzdWIiOiJlOTEyZGFlNC03ZjJmLTQyNTEtYTYwYy1lMTZiZGJkZTQ1ZmIiLCJhdXRoX3RpbWUiOjE2MTg5OTMyNzMsImlkcCI6ImxvY2FsIiwianRpIjoiOTRFRDE0MDY3RkQ3RkM0OTk4MzM4QTM5Q0VENkY5RDIiLCJzaWQiOiI5ODE2RUQ2NzNGMDQwQ0Q0NDczREE4RTEzNDdGNzBBNyIsImlhdCI6MTYxODk5MzI3NSwic2NvcGUiOlsiYXBpQ29yZSIsInByb2ZpbGUiLCJvcGVuaWQiLCJhcGkxIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.im5ToY9BMWBAQGzG7WuIggkUW_UfsDmGLsutPdD-LjDeedCdJ2IVNabRxyz5VKQIbxHmP0rYGe9OQMXzx_MYcdGy9HzAVsHJ0afwT5pINLK1lTgi9BHjDofarMC4bdDQzs8dZhjCZW-dIDFMq-XltxZt0pXY0T2FDux6r9GodvYoLv4YVZZGGITXRE8DOKmTVCzsKigLx61LtrfIcDiv_F8v-OjKenJ9fy-2WM8tqBjokiGgxizgKwGCe9giuOqsd6nWwD3tXmRIx6LTZyfyB21Fem_Bv2HnAU4pDRmHa4GeIgwBPuE__RhSAewzYUffw6oINmyTryXn2lgUm6Ezhg";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            request.Proxy = HttpWebRequest.DefaultWebProxy;
            request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
            request.PreAuthenticate = true;
            request.ContentType = "application/json";
            WebResponse webResponse = request.GetResponse();
            Stream webStream = webResponse.GetResponseStream();
            StreamReader responseReader = new StreamReader(webStream);
            string result = responseReader.ReadToEnd();
            result = result.Replace("\n", "");
            // result = result.Replace('\', "");
            HttpContext.Current.Response.Write(responseReader.ReadToEnd());

            /*
             CfDJ8GERkKiZiUBGtLehhXdUqiTWaCzG5sGCh8AIshs-h1fJ7vIpHOlULL0s7ANtW_V7b3S7zmgBuFlIIznnEQ8jD1bglu1nPfjI4TMf8VHXVL1sO7qYku5QmkpeG0OV5tiOz-gCxVP1CimlhWeqUvigTk23Ot6roYfp6HFfrcmz1n31578Ut6ZoMKyN9SO5K8eY459LfqT8U8uRWaKvH2SbzulGavKchjMG-LHiqs67T0zR8gLeE_SnKPFYAd_AqvF74TeC8y8F25X3X70iPh9f9DrC7YIk4bgx4DOlXHGpIIQDQuFg5pYP4jX4Lt_zKYUZZql-6aUXl4jrk9e1KUiasFc
             */
        }

        /*
         public async Task EndSessionAsync(LogoutRequest request)
        {
            var endpoint = _options.ProviderInformation.EndSessionEndpoint;
            if (endpoint.IsMissing())
            {
                throw new InvalidOperationException("Discovery document has no end session endpoint");
            }

            var url = CreateEndSessionUrl(endpoint, request);

            var browserOptions = new BrowserOptions(url, _options.PostLogoutRedirectUri ?? string.Empty)
            {
                Timeout = TimeSpan.FromSeconds(request.BrowserTimeout),
                DisplayMode = request.BrowserDisplayMode
            };

            var browserResult = await _options.Browser.InvokeAsync(browserOptions);
        }
             */



        [WebMethod]
        public static string LoginSystem(string email_, string pass_)
        {
            #region BadKod
            //if (!email_.Contains("Login_"))
            //{
            //    int Cpass_Mail = (int)Mydb.ExecuteScalar("select COUNT(PASSWORD ) FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text);
            //    if (Cpass_Mail > 0)
            //    {
            //        string pass_mail = Mydb.ExecuteScalar("select PASSWORD FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();
            //        bool verf = (bool)Mydb.ExecuteScalar("select VERIFICATION_ from CLIENT where CLIENT_ID=(select CLIENT_ID from ACCOUNT where E_MAIL=@mail)", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text);

            //        if (verf == true)
            //        {
            //            pass_ = GetMd5HashData(pass_);
            //            if (pass_mail == pass_)
            //            {
            //                string Client_Id = Mydb.ExecuteScalar("select CLIENT_ID FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();

            //                string loginId = Mydb.ExecuteScalar("select LOG_IN_ID FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();
            //                return "{\"result\" : \"1\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + loginId + "\"}";
            //            }
            //            else
            //            {
            //                return "{\"result\" : \"2\"}";
            //            }
            //        }
            //        else
            //        {
            //            return "{\"result\" : \"3\"}";
            //        }
            //    }
            //    else
            //    {
            //        return "{\"result\" : \"2\"}";
            //    }

            //}
            //else
            //{
            //    int Count_DBPass = (int)Mydb.ExecuteScalar("select count(PASSWORD) from ACCOUNT where LOGIN = @lg", new SqlParameter[] { new SqlParameter("@lg", email_) }, CommandType.Text);
            //    if (Count_DBPass > 0)
            //    {
            //        string DBPass = Mydb.ExecuteScalar("select PASSWORD from ACCOUNT where LOGIN = @lg", new SqlParameter[] { new SqlParameter("@lg", email_) }, CommandType.Text).ToString();

            //        pass_ = GetMd5HashData(pass_);
            //        if (pass_ == DBPass)
            //        {
            //            int LogId = (int)Mydb.ExecuteScalar("select LOG_IN_ID, PASSWORD from ACCOUNT where LOGIN=@lg", new SqlParameter[] { new SqlParameter("@lg", email_) }, CommandType.Text);
            //            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT_ROLE where LOG_IN_ID=@lgId", new SqlParameter[] { new SqlParameter("@lgId", LogId) }, CommandType.Text);
            //            List<MR> mrs = new List<MR>();
            //            foreach (DataRow item in dt.Rows)
            //            {
            //                MR mr = new MR();
            //                mr.sm = Mydb.ExecuteScalar("select MODUL_ID from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] { new SqlParameter("@mr", Convert.ToInt32(item["MR_ID"])) }, CommandType.Text).ToString();
            //                mr.sr = Mydb.ExecuteScalar("select ROLE_ID from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] { new SqlParameter("@mr", Convert.ToInt32(item["MR_ID"])) }, CommandType.Text).ToString();
            //                mrs.Add(mr);
            //            }
            //            JavaScriptSerializer js = new JavaScriptSerializer();
            //            return js.Serialize(mrs);
            //        }
            //        else
            //        {
            //            return "{\"result\" : \"2\"}";
            //        }
            //    }
            //    else
            //    {
            //        return "{\"result\" : \"2\"}";
            //    }

            //}
            #endregion

            string returnvalue = null;
            string SUPPLIER_EMAIL = email_;
            if (!email_.Contains("Login_"))
            {
                int Cpass_Mail = (int)Mydb.ExecuteScalar("select COUNT(PASSWORD ) FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text);
                if (Cpass_Mail > 0)
                {
                    string pass_mail = Mydb.ExecuteScalar("select PASSWORD FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();
                    bool verf = (bool)Mydb.ExecuteScalar("select VERIFICATION_ from CLIENT where CLIENT_ID=(select CLIENT_ID from ACCOUNT where E_MAIL=@mail)", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text);
                    if (verf == true)
                    {
                        pass_ = GetMd5HashData(pass_);
                        if (pass_mail == pass_)
                        {
                            string Client_Id = Mydb.ExecuteScalar("select CLIENT_ID FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();//4

                            string loginId = Mydb.ExecuteScalar("select LOG_IN_ID FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();//5
                            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from ACCOUNT_ROLE where LOG_IN_ID =@lg", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(loginId)) }, CommandType.Text);//2
                            if (count == 1)
                            {
                                string role = Mydb.ExecuteScalar("select ROLE_ID from MODUL_ROLE where MR_ID=(select MR_ID from ACCOUNT_ROLE where LOG_IN_ID =@lg)", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(loginId)) }, CommandType.Text).ToString();//3
                                string RolName = "Нечего";
                                string ModulName = "Нечего";
                                if (role == "4")
                                {
                                    ModulName = "Клиентское администрирование";
                                    RolName = "Администратор";
                                }
                                if (role == "3")
                                {
                                    ModulName = "Диспетчерская";
                                    RolName = "Диспетчер";
                                }
                                if (role == "1")
                                {
                                    ModulName = "Личный кабинет";
                                    RolName = "Управляющий";
                                }
                                Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Вход"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE",RolName),
                                    new SqlParameter("@EVENT_MODULE",ModulName),
                                    new SqlParameter("@EVENT_MESSAGE","Пользователь  вошел в систему"),
                                    new SqlParameter("@EVENT_MAKER",loginId)}, CommandType.StoredProcedure);
                                returnvalue = "{\"result\" : \"1\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + loginId + "\",\"RoleId\":\"" + role + "\"}";
                            }
                            if (count > 1)
                            {
                                DataTable dt = Mydb.ExecuteReadertoDataTable("select ROLE_ID from MODUL_ROLE where MR_ID in (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID =@lg)", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(loginId)) }, CommandType.Text);
                                List<LoginDatas> lds = new List<LoginDatas>();
                                foreach (DataRow item in dt.Rows)
                                {
                                    LoginDatas ld = new LoginDatas();
                                    ld.ROLE_ID = item["ROLE_ID"].ToString();
                                    ld.Id = Client_Id;
                                    ld.LogId = loginId;
                                    ld.result = "5";
                                    lds.Add(ld);

                                }
                                JavaScriptSerializer js = new JavaScriptSerializer();
                                //returnvalue= "{\"result\" : \"5\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + loginId + "\",\"Roles\":\"" + js.Serialize(rls) + "\"}"; 
                                returnvalue = js.Serialize(lds);
                            }
                        }
                        else
                        {
                            returnvalue = "{\"result\" : \"2\"}";
                        }
                    }
                    else
                    {
                        returnvalue = "{\"result\" : \"3\"}";
                    }
                }
                else
                {
                    // returnvalue= "{\"result\" : \"2\"}";
                    string RESULT = Mydb.ExecuteScalar("CHECK_SUPPLIER", new SqlParameter[] { new SqlParameter("@email", email_), new SqlParameter("@pass", pass_) }, CommandType.StoredProcedure).ToString();
                    returnvalue = RESULT;
                }
            }
            else
            {
                int IdCount = (int)Mydb.ExecuteScalar("select Count(*) from ACCOUNT where [LOGIN]=@login", new SqlParameter[] { new SqlParameter("@login", email_) }, CommandType.Text);//Convert.ToInt32(email_);
                if (IdCount != 0)
                {
                    // email_ = email_.Substring(email_.LastIndexOf('_') + 1);
                    int Id = (int)Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where [LOGIN]=@login", new SqlParameter[] { new SqlParameter("@login", email_) }, CommandType.Text);//Convert.ToInt32(email_);//5
                    int Count_DBPass = (int)Mydb.ExecuteScalar("select count(PASSWORD) from ACCOUNT where LOG_IN_ID=@id", new SqlParameter[] { new SqlParameter("@id", Id) }, CommandType.Text);
                    if (Count_DBPass > 0)
                    {
                        string DBPass = Mydb.ExecuteScalar("select PASSWORD from ACCOUNT where LOG_IN_ID = @lg", new SqlParameter[] { new SqlParameter("@lg", Id) }, CommandType.Text).ToString();
                        pass_ = GetMd5HashData(pass_);
                        if (pass_ == DBPass)
                        {
                            if (SUPPLIER_EMAIL != "Login_742")
                            {
                                string Client_Id = Mydb.ExecuteScalar("select CLIENT_ID FROM ACCOUNT WHERE LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Id) }, CommandType.Text).ToString();//1

                                //string loginId = Mydb.ExecuteScalar("select LOG_IN_ID FROM ACCOUNT WHERE E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", email_) }, CommandType.Text).ToString();
                                int count = (int)Mydb.ExecuteScalar("select COUNT(*) from ACCOUNT_ROLE where LOG_IN_ID =@lg", new SqlParameter[] { new SqlParameter("@lg", Id) }, CommandType.Text);//2
                                if (count == 1)
                                {
                                    string role = Mydb.ExecuteScalar("select ROLE_ID from MODUL_ROLE where MR_ID=(select MR_ID from ACCOUNT_ROLE where LOG_IN_ID =@lg)", new SqlParameter[] { new SqlParameter("@lg", Id) }, CommandType.Text).ToString();//3
                                    string RolName = "Нечего";
                                    string ModulName = "Нечего";
                                    if (role == "4")
                                    {
                                        ModulName = "Клиентское администрирование";
                                        RolName = "Администратор";
                                    }
                                    if (role == "3")
                                    {
                                        ModulName = "Диспетчерская";
                                        RolName = "Диспетчер";
                                    }
                                    if (role == "1")
                                    {
                                        ModulName = "Личный кабинет";
                                        RolName = "Управляющий";
                                    }
                                    if (role == "15")
                                    {
                                        ModulName = "Диспетчерская";
                                        RolName = "Диспетчер поставщика";
                                    }
                                    if (role == "17")
                                    {
                                        ModulName = "Диспетчерская";
                                        RolName = "Супер Диспетчер";
                                    }

                                    if (role == "16")
                                    {
                                        ModulName = "Профиль Управляющего";
                                        RolName = "Ответственный";
                                    }
                                    Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Вход"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE",RolName),
                                    new SqlParameter("@EVENT_MODULE",ModulName),
                                    new SqlParameter("@EVENT_MESSAGE","Пользователь вошел в систему"),
                                    new SqlParameter("@EVENT_MAKER",Id)}, CommandType.StoredProcedure);
                                    returnvalue = "{\"result\" : \"1\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + Id + "\",\"RoleId\":\"" + role + "\"}";
                                }
                                if (count > 1)
                                {
                                    DataTable dt = Mydb.ExecuteReadertoDataTable("select ROLE_ID from MODUL_ROLE where MR_ID in (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID =@lg)", new SqlParameter[] { new SqlParameter("@lg", Id) }, CommandType.Text);//3
                                    List<LoginDatas> lds = new List<LoginDatas>();
                                    foreach (DataRow item in dt.Rows)
                                    {
                                        LoginDatas ld = new LoginDatas();
                                        ld.ROLE_ID = item["ROLE_ID"].ToString();
                                        ld.Id = Client_Id;
                                        ld.LogId = Id.ToString();
                                        ld.result = "5";
                                        lds.Add(ld);

                                    }
                                    JavaScriptSerializer js = new JavaScriptSerializer();
                                    //returnvalue= "{\"result\" : \"5\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + loginId + "\",\"Roles\":\"" + js.Serialize(rls) + "\"}"; 
                                    returnvalue = js.Serialize(lds);
                                    //List<Roles> rls = new List<Roles>();
                                    //foreach (DataRow item in dt.Rows)
                                    //{
                                    //    Roles rl = new Roles();
                                    //    rl.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
                                    //    rls.Add(rl);
                                    //}
                                    //JavaScriptSerializer js = new JavaScriptSerializer();
                                    //returnvalue= "{\"result\" : \"5\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + Id + "\",\"Roles\":\"" + js.Serialize(rls) + "\"}";
                                }
                            }
                            else
                            {


                                string role = "15";
                                string RolName = "Нечего";
                                string ModulName = "Нечего";

                                if (role == "15")
                                {
                                    ModulName = "Диспетчер поставщика";
                                    RolName = "Диспетчер поставщика";
                                }
                                Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Вход"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE",RolName),
                                    new SqlParameter("@EVENT_MODULE",ModulName),
                                    new SqlParameter("@EVENT_MESSAGE","Пользователь вошел в систему"),
                                    new SqlParameter("@EVENT_MAKER",Id)}, CommandType.StoredProcedure);
                                returnvalue = "{\"result\" : \"1\",\"Id\" :\"742\",\"LogId\" :\"" + Id + "\",\"RoleId\":\"" + role + "\"}";

                            }
                        }
                        else
                        {
                            returnvalue = "{\"result\" : \"2\"}";
                        }
                    }
                    else
                    {
                        returnvalue = "{\"result\" : \"2\"}";
                    }
                }
                else
                {
                    returnvalue = "{\"result\" : \"2\"}";

                }

            }
            return returnvalue;
        }
        [WebMethod]
        public static string SendMail(string mailto, string subject, string body)
        {
            string returnvalue = null;
            try
            {
                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", mailto), new SqlParameter("@theme", subject), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                returnvalue = "";
            }
            catch (Exception)
            {

                throw;
            }
            return returnvalue;
        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }

        protected void close__Click(object sender, EventArgs e)
        {
            Mydb.SigOutFromIdendity();
        }
    }
}