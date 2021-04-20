using Kvorum_App.Client_Admin.Utilities;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
 
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
            HttpContext.Current.Response.Cookies.Remove("mycookie");
            HttpContext.Current.Response.Cookies["mycookie"].Expires = DateTime.Now.AddDays(-1); 
            HttpCookie mycookie = new HttpCookie("mycookie");
            mycookie.Value = System.Web.HttpContext.Current.Session["Login_Data"].ToString();
            HttpContext.Current.Response.Cookies.Add(mycookie);
        }

        [WebMethod]
        public static string LoginIdentity(string Id_,string isTenant)
        {
            string returnvalue = null;
            int Id = 0;
            if (Id_.Contains('@'))
            {
                Id =Convert.ToInt32(Mydb.ExecuteScalar("LoginIdendity", new SqlParameter[] { new SqlParameter("@procType", "5"), new SqlParameter("@mail", Id_) }, CommandType.StoredProcedure));
            }
            else
            {
                Id_ = Id_.Substring(Id_.IndexOf('_')+1);
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
            return returnvalue;
        }

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

            string returnvalue=null;
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
                if (IdCount!=0)
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
                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto",mailto),new SqlParameter("@theme",subject),new SqlParameter("@body",body) }, CommandType.StoredProcedure);
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
    }
}