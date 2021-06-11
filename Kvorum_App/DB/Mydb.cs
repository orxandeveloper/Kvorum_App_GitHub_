
using HtmlAgilityPack;
using IdentityModel.Client;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Runtime.Remoting.Contexts;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace Kvorum_App
{
    public static class Mydb
    {
        public static void SigOutFromIdendity() {
            try
            {
                var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                authenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType,
                 OpenIdConnectAuthenticationDefaults.AuthenticationType);


                System.Web.HttpContext.Current.Session.Abandon();
                System.Web.HttpContext.Current.Session.Clear();
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
        public static string LoadPageToAnotherPage(string adressUrl, string Node)
        {
            WebResponse objResponse;
            WebRequest objRequest = HttpWebRequest.Create(adressUrl);
            objResponse = objRequest.GetResponse();
            StreamReader data = new StreamReader(objResponse.GetResponseStream());
            string result = data.ReadToEnd();
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(result);
            string output = doc.DocumentNode.SelectSingleNode(Node).InnerHtml;
            return output;
        }
        /// <summary>
        /// Bu İşlemi Yapmadan Önce flp.SaveAs(Server.MapPath("Deneme/") + resimadi) İşlemini Yap : Resmin Adi Olcak,Fiziksel Adres Server.MapPath Olarak Gonderilicek, Genislik Ve yukseklik String olarak gonderilecek
        /// </summary>
        /// <param name="resimAdi_"></param>
        /// <param name="FizikselAdres"></param>
        /// <param name="Genislik"></param>
        /// <param name="Yukseklik"></param>

        /// <summary>
        /// Mail iceriyi:"HelloWorld";MailAdress:Kimlere MailGidecekce; from:"irfanuzun@Sigorta.com.tr";CredentialMail:"irfanuzun@Sigorta.com.tr";CredentialPassword: "SifreOlucak";Subject: "Konu"; _HostName: "mail.Sigorta.com.tr"
        /// </summary>
        /// <param name="MailIceriyi"></param>
        /// <param name="Mailler"></param>
        /// <param name="from"></param>
        /// <param name="credentialMail"></param>
        /// <param name="CredentialPassword"></param>
        /// <param name="Subject"></param>
        /// <param name="_HostName"></param>
        static public void MailGonder(string MailIceriyi, MailAddress[] Mailler, string from, string credentialMail, string CredentialPassword, string Subject, string _HostName)
        {
            MailMessage Eposta = new MailMessage();
            Eposta.From = new MailAddress(from);
            foreach (MailAddress item in Mailler)
            {
                Eposta.To.Add(item);
            }
            Eposta.Subject = Subject;
            Eposta.Body = MailIceriyi;
            SmtpClient smpt = new SmtpClient();
            smpt.Credentials = new NetworkCredential(credentialMail, CredentialPassword);
            smpt.Port = 80;

            smpt.Host = "smtpout.secureserver.net";

            smpt.Send(Eposta);
        }
        static SqlConnection getConnection()
        {
           // Chek_UserInfo();
            //if (ch.Error== "Unauthorized")
            //{
            //   // HttpContext.Current.ApplicationInstance.CompleteRequest;
            //    HttpContext.Current.Response.Redirect("https://upravbot.ru/IDS4/Account/Login");
            //}
            string conn = System.Configuration.ConfigurationManager.AppSettings["MyConnection"];
            SqlConnection MyConn = new SqlConnection(conn);
            return MyConn;
        }
       
        public static UserInfoResponse Chek_UserInfo()
        {
            string accessToken = System.Web.HttpContext.Current.Session["Token"].ToString();
            var client = new HttpClient();


            UserInfoResponse response = null;
            CancellationTokenSource source = new CancellationTokenSource();
            source.CancelAfter(TimeSpan.FromSeconds(1));
            Task.Run(async () =>
            {
                response = await client.GetUserInfoAsync(new UserInfoRequest
                {
                    Address = "https://upravbot.ru/IDS4/connect/userinfo",//"https://localhost:5002/connect/userinfo",
                    Token = accessToken,
                    
                    

                }).ConfigureAwait(false);
                
            }).GetAwaiter().GetResult();
            if (response.Error == "Unauthorized")
            {
                HttpContext.Current.Response.Cookies.Remove("mycookie");
                HttpContext.Current.Response.Cookies["mycookie"].Expires = DateTime.Now.AddDays(-1);
                HttpCookie mycookie = new HttpCookie("mycookie");
                mycookie.Value = response.Error;
                HttpContext.Current.Response.Cookies.Add(mycookie);
               
            }
          //  EndSession();

            return response;
        }
        public static string EndSession()
        {

            string IdTokenHint = System.Web.HttpContext.Current.Session["IdTokenHint"].ToString();
            // HttpContext.Current.GetOwinContext().Authentication.SignOut();
            //  HttpContext.Current.Response.Cookies.Remove()
          //  HttpContext.Current.GetOwinContext().Response.Cookies.Delete("ASP.NET_SessionId");
         
       //    var A_t = HttpContext.Current.GetOwinContext();//.Authentication.User.Identity.AuthenticationType;
              



            var ru = new RequestUrl("https://upravbot.ru/IDS4/connect/endsession");
            //////("https://upravbot.ru/IDS4/signout-callback-oidc");//("http://localhost:5002/signout-callback-oidc");//
            ////http://localhost:5002/connect/endsession?id_token_hint=1C56BDD4F94136364F7241401EAF65CDAAA325B776191E08121D7B2F2583EA34
            //try
            //{

            var url = ru.CreateEndSessionUrl(IdTokenHint, "http://localhost:5002/signout-callback-oidc");


            var url_2 = "https://upravbot.ru/IDS4/Account/Logout?logoutId=" + IdTokenHint + "";
            HttpContext.Current.Response.Redirect(url_2, false);
            // HttpContext.Current.Response.Redirect(url, false);
            HttpContext.Current.GetOwinContext().Authentication.SignOut("ApplicationCookie");
            //}
            //catch (Exception ex)
            //{
            //    string a = ex.Message;
            //    /*
            //     1. Could not load file or assembly 'System.Text.Encodings.Web, Version=5.0.0.1, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies. The system cannot find the file specified.
            //     2. The type initializer for 'System.Text.Encodings.Web.DefaultUrlEncoder' threw an exception.
            //     3. Could not load file or assembly 'System.Buffers, Version=4.0.3.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies. The system cannot find the file specified.
            //     */
            //}
            //string b = "";
            //string  sessionResponseAsync = null;
            //var ru = new RequestUrl("https://upravbot.ru/IDS4/endsession");
            //Task.Run(async () => {
            //    sessionResponseAsync = ru.CreateEndSessionUrl(accessToken, "/ClientLogin.aspx");
            //});
            //var client = new HttpClient();
            //UserInfoResponse SessionResponse = null;
            //CancellationTokenSource source = new CancellationTokenSource();
            //source.CancelAfter(TimeSpan.FromSeconds(1));
            //Task.Run(async () =>
            //{
            //    SessionResponse = await client.GetUserInfoAsync(new UserInfoRequest
            //    {
            //        Address = "https://upravbot.ru/IDS4/signout-callback-oidc",//"http://localhost:5002/signout-callback-oidc", 
            //        Token = accessToken



            //    }).ConfigureAwait(false);

            //}).GetAwaiter().GetResult();

            return "";//sessionResponseAsync;// SessionResponse;//ru;
        }

        public static void ExecuteReader(string cmdString, SqlParameter[] sqlParameters, CommandType cmdType, Action<SqlDataReader> function = null)
        {

            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _Command = new SqlCommand(cmdString, connection);
                _Command.CommandType = cmdType;
                foreach (SqlParameter item in sqlParameters)
                {
                    _Command.Parameters.Add(item);
                }
                using (SqlDataReader _reader = _Command.ExecuteReader())
                {
                    try
                    {
                        if (function != null)
                        {
                            function.Invoke(_reader);
                        }
                    }
                    finally
                    {

                        _reader.Close();
                    }
                }
                connection.Close();
            }
        }
        public static DataTable ExecuteReadertoDataTable(string cmdString, SqlParameter[] sqlParameters, CommandType cmdType)
        {

            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _command = new SqlCommand(cmdString, connection);
                _command.CommandTimeout = 0;
                foreach (SqlParameter item2 in sqlParameters)
                {
                    _command.Parameters.Add(item2);
                }
                _command.CommandType = cmdType;
                DataTable dt = new DataTable();
                dt.Load(_command.ExecuteReader());
                return dt;

            }
        }
        public static string ExecuteReadertoDataTableAsJson(string cmdString, SqlParameter[] sqlParameters, CommandType cmdType)
        {

            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _command = new SqlCommand(cmdString, connection);
                _command.CommandTimeout = 0;
                foreach (SqlParameter item2 in sqlParameters)
                {
                    _command.Parameters.Add(item2);
                }
                _command.CommandType = cmdType;
                DataTable dt = new DataTable();
                dt.Load(_command.ExecuteReader());

                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                js.MaxJsonLength = int.MaxValue;
                return js.Serialize(rows);
            }
        }
        public static string ExecuteAsJson(string cmdString, SqlParameter[] sqlParameters, CommandType cmdType)
        {

            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _command = new SqlCommand(cmdString, connection);
                _command.CommandTimeout = 0;
                foreach (SqlParameter item2 in sqlParameters)
                {
                    _command.Parameters.Add(item2);
                }
                _command.CommandType = cmdType;
                DataTable dt = new DataTable();
                dt.Load(_command.ExecuteReader());

                List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
                Dictionary<string, string> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, string>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col].ToString());
                    }
                    rows.Add(row);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                js.MaxJsonLength = Int32.MaxValue;
                return js.Serialize(rows);
            }
        }
        public static object ExecuteScalar(string cmdString, SqlParameter[] sqlParamaters, CommandType cmdType)
        {
            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _Command = new SqlCommand(cmdString, connection);
                foreach (SqlParameter item3 in sqlParamaters)
                {
                    _Command.Parameters.Add(item3);
                }
                _Command.CommandType = cmdType;
                return _Command.ExecuteScalar();
            }
        }
        public static int ExecuteNoNQuery(string cmtString, SqlParameter[] sqlParameters, CommandType _cmdType)
        {
            using (var connection = getConnection())
            {
                connection.Open();
                SqlCommand _Command = new SqlCommand(cmtString, connection);
                foreach (SqlParameter item4 in sqlParameters)
                {
                    _Command.Parameters.Add(item4);
                }
                _Command.CommandType = _cmdType;
                return _Command.ExecuteNonQuery();
            }
        }
        public static void COMPARE_REQUESTS(bool is_Compare, string Request_as_JSON, int R_id_guid, int lg, string EVENT_MESSAGE, string path, string R_Services)
        {
            string R_id_guid2 = R_id_guid.ToString();
            int REQUEST_ID = 0;
            if (int.TryParse(R_id_guid2, out REQUEST_ID))
            {

            }
            string EVENT_TYPE;
            string EVENT_STATUS = "Важное";
            //  string path = HttpContext.Current.Request.Url.AbsolutePath;

            string EVENT_ROLE = (path.IndexOf("Manager/") > -1) ? "Управляющий" : (path.IndexOf("Super_Disp/") > -1) ? "Супер Диспетчер" : (path.IndexOf("Responsible_Admin/") > -1) ? "Ответственный" : (path.IndexOf("Disp_Admin/") > -1) ? "Диспетчер" : "Диспетчер поставщика";

            string EVENT_MODULE = (path.IndexOf("Manager/") > -1) ? "Профиль Управляющего" : (path.IndexOf("Super_Disp/") > -1) ? "Диспетчерская" : (path.IndexOf("Responsible_Admin/") > -1) ? "Профиль Управляющего" : (path.IndexOf("Disp_Admin/") > -1) ? "Диспетчерская" : "Диспетчер поставщика";

            if (is_Compare == false)
            {
                if (REQUEST_ID != 0)
                {

                    EVENT_TYPE = "Создан";
                    ExecuteNoNQuery("[usp_ConstructorAPI_INSERT_LOG]", new SqlParameter[] {

                     new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                    new SqlParameter("@EVENT_STATUS",EVENT_STATUS),
                    new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                    new SqlParameter("@EVENT_MODULE",EVENT_MODULE),
                    new SqlParameter("@EVENT_MESSAGE",EVENT_MESSAGE),
                    new SqlParameter("@EVENT_MAKER",lg),
                    new SqlParameter("@REQUEST_ID",REQUEST_ID),
                    new SqlParameter("@JSON_DATAS",Request_as_JSON)
                }, CommandType.StoredProcedure);
                    if (Request_as_JSON != "4" && Request_as_JSON != "5")
                    {
                        Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewUkR"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);

                        Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewResp"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);

                        Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewIspol"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
                    }
                }
                else
                {
                    Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewSuppR"), new SqlParameter("@rGuid", R_id_guid2), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
                }
            }
            else
            {
                EVENT_TYPE = "Обновить";

                ExecuteNoNQuery("[usp_ConstructorAPI_INSERT_LOG]", new SqlParameter[] {
                     new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
           new SqlParameter("@EVENT_STATUS",EVENT_STATUS),
           new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
           new SqlParameter("@EVENT_MODULE",EVENT_MODULE),
           new SqlParameter("@EVENT_MESSAGE",EVENT_MESSAGE),
           new SqlParameter("@EVENT_MAKER",lg),
           new SqlParameter("@REQUEST_ID",REQUEST_ID),
           new SqlParameter("@JSON_DATAS",Request_as_JSON)
                }, CommandType.StoredProcedure);

                dynamic Old_requests = JsonConvert.DeserializeObject(ExecuteAsJson("GETRequestForLOG", new SqlParameter[] { new SqlParameter("@rid", REQUEST_ID) }, CommandType.StoredProcedure));

                dynamic newRequest = JsonConvert.DeserializeObject(Request_as_JSON);
                int STATUS_ID = (int)newRequest[0].STATUS_ID;
                string TextForPlanDate = "";
                string TextForPlanTime = "";
                //if (REQUEST_ID != 0)
                //{
                //    Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@NewStatusId", STATUS_ID) }, CommandType.StoredProcedure);
                //}
                //else
                //{
                //    Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewUkRStatus"), new SqlParameter("@rGuid", R_id_guid2), new SqlParameter("@NewStatusId", STATUS_ID) }, CommandType.StoredProcedure);
                //}
                string Pdate = newRequest[0].Pdate;
                string[] charArray = Pdate.Split('-');

                Pdate = charArray[2] + "." + charArray[1] + '.' + charArray[0];

                string PLAN_END_DATE = Old_requests[0].PLAN_END_DATE;


                PLAN_END_DATE = (PLAN_END_DATE.Length != 0) ? PLAN_END_DATE.Substring(0, 10) : "";

                if (Pdate != PLAN_END_DATE && PLAN_END_DATE.Length != 0)
                {
                    TextForPlanDate = ": планируемая дата изменена с «" + PLAN_END_DATE + "» на «" + Pdate + "»";
                    ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",1),
                         new SqlParameter("@PLAN_DATE_TEXT",TextForPlanDate)
                    }, CommandType.StoredProcedure);
                }
                else
                {
                    if (PLAN_END_DATE.Length == 0)
                    {
                        TextForPlanDate = ": Выбран планируемая дата на «" + Pdate + "»";
                        ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",1),
                         new SqlParameter("@PLAN_DATE_TEXT",TextForPlanDate)
                    }, CommandType.StoredProcedure);
                    }
                }
                string Ptime = newRequest[0].Ptime;
                string PLAN_END_TIME = Old_requests[0].PLAN_END_TIME;
                PLAN_END_TIME = (PLAN_END_TIME.Length != 0) ? PLAN_END_TIME.Substring(0, 5) : "";
                Ptime = Ptime.Substring(0, 5);
                if (Ptime != PLAN_END_TIME && PLAN_END_TIME.Length != 0)
                {
                    TextForPlanTime = ": планируемое время изменено с «" + PLAN_END_TIME + "» на «" + Ptime + "»";

                    ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",1),
                         new SqlParameter("@PLAN_DATE_TEXT",TextForPlanTime)
                    }, CommandType.StoredProcedure);
                }
                else
                {
                    if (PLAN_END_TIME.Length == 0)
                    {
                        TextForPlanTime = ": Выбран планируемое время  на «" + Ptime + "»";

                        ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",1),
                         new SqlParameter("@PLAN_DATE_TEXT",TextForPlanTime)
                    }, CommandType.StoredProcedure);
                    }
                }


                //  string TextForPerformer = "";
                string newspId = Convert.ToString(newRequest[0].spId);
                Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "IspolChange"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@IspolId", newspId), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
                string OldSPECIALIS_ID = Convert.ToString(Old_requests[0].SPECIALIS_ID);
                if (newspId != OldSPECIALIS_ID)
                {
                    var new_spId = (newRequest[0].spId != null) ? Convert.ToInt32(newRequest[0].spId) : DBNull.Value;

                    var Old_SPECIALIS_ID = (Old_requests[0].SPECIALIS_ID != DBNull.Value) ? Convert.ToInt32(Old_requests[0].SPECIALIS_ID) : DBNull.Value;
                    // TextForPerformer = "исполнитель изменен с «" + Old_requests.SPECIALIS_ID + "» на «" + newRequest.spId + "»";
                    ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",2),
                         new SqlParameter("@OLD_ID",Old_SPECIALIS_ID),
                         new SqlParameter("@NEW_ID",new_spId)
                    }, CommandType.StoredProcedure);
                }

                //  string TextForResponsible = "";
                string newResp = Convert.ToString(newRequest[0].RESPONSIBLE_ID);
                Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "RespChange"), new SqlParameter("@rId", REQUEST_ID), new SqlParameter("@RespId", newResp), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
                string oldResp = Convert.ToString(Old_requests[0].RESPONSIBLE_ID);
                if (newResp != oldResp)
                {
                    //TextForResponsible = "ответственный по заявке изменен с «" + Old_requests.RESPONSIBLE_ID + "» на «" + newRequest.RESPONSIBLE_ID + "»";
                    var New_RESPONSIBLE_ID = (newRequest[0].RESPONSIBLE_ID != null) ? Convert.ToInt32(newRequest[0].RESPONSIBLE_ID) : DBNull.Value;
                    var Old_RESPONSIBLE_ID = (Old_requests[0].RESPONSIBLE_ID != DBNull.Value) ? Convert.ToInt32(Old_requests[0].RESPONSIBLE_ID) : DBNull.Value;

                    ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",REQUEST_ID),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                         new SqlParameter("@LOG_TYPE",3),
                         new SqlParameter("@OLD_ID",Old_RESPONSIBLE_ID),
                         new SqlParameter("@NEW_ID",New_RESPONSIBLE_ID)
                    }, CommandType.StoredProcedure);
                }

                dynamic New_prs = JsonConvert.DeserializeObject(R_Services);
                dynamic Old_prs = JsonConvert.DeserializeObject(ExecuteAsJson("GETREQUEST_SERVICES_FOR_LOG", new SqlParameter[] { new SqlParameter("@REQUEST_ID", REQUEST_ID) }, CommandType.StoredProcedure));

                //Если Добавлена услуга или Группа услуг или изиеннено

                for (int k = 0; k < New_prs.Count; k++)
                {
                    string New_Service_Guid = Convert.ToString(New_prs[k].SERVICE_GUID);
                    object New_ParentId = ExecuteScalar("GetParentIdOfServices", new SqlParameter[] { new SqlParameter("@SERVICE_GUID", New_Service_Guid) }, CommandType.StoredProcedure);
                    int CountOf_Service = (int)Mydb.ExecuteScalar("GetServiceCount", new SqlParameter[] { new SqlParameter("@rid", REQUEST_ID), new SqlParameter("@service_gud", New_Service_Guid) }, CommandType.StoredProcedure);
                    //  Если Добавлена услуга
                    if (New_ParentId != DBNull.Value)
                    {
                        if (CountOf_Service == 0)
                        {
                            string NEW_quantity2 = Convert.ToString(New_prs[k].QUANTITY);

                            ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                                                 new SqlParameter("@REQUEST_ID",REQUEST_ID),
                                                 new SqlParameter("@EVENT_MAKER",lg),

                 new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                                                 new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                                                 new SqlParameter("@LOG_TYPE",5),
                                                 new SqlParameter("@NEW_QUANTITY",NEW_quantity2),
                                                 new SqlParameter("@SERVICE_GUID",Convert.ToString(New_prs[k].SERVICE_GUID))
                                            }, CommandType.StoredProcedure);
                        }
                        //изменено данные старых услуг
                        else
                        {
                            dynamic old = JsonConvert.DeserializeObject(Mydb.ExecuteAsJson("GetService_COST_QUANTITY", new SqlParameter[] { new SqlParameter("@SERVICE_GUID", New_Service_Guid), new SqlParameter("@rid", REQUEST_ID) }, CommandType.StoredProcedure));
                            string OLD_quantity = Convert.ToString(old[0].QUANTITY);
                            string OLD_cost = Convert.ToString(old[0].COST);

                            string NEW_COST = Convert.ToString(New_prs[k].COST);

                            string NEW_quantity = Convert.ToString(New_prs[k].QUANTITY);
                            NEW_quantity = (NEW_quantity.IndexOf('.') != -1) ? NEW_quantity.Replace(".", ",") : NEW_quantity + ",00";
                            if (OLD_cost != NEW_COST)
                            {
                                ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                                                 new SqlParameter("@REQUEST_ID",REQUEST_ID),
                                                 new SqlParameter("@EVENT_MAKER",lg),
                                                 new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                                                 new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                                                 new SqlParameter("@LOG_TYPE",4),
                                                 new SqlParameter("@OLD_COST",(OLD_cost=="0.00")?"Договорная":OLD_cost),
                                                 new SqlParameter("@NEW_COST",(NEW_COST=="0.00")?"Договорная":NEW_COST),
                                                 new SqlParameter("@SERVICE_GUID",Convert.ToString(New_prs[k].SERVICE_GUID))
                                            }, CommandType.StoredProcedure);
                            }
                            if (OLD_quantity != NEW_quantity)
                            {
                                ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                                                     new SqlParameter("@REQUEST_ID",REQUEST_ID),
                                                     new SqlParameter("@EVENT_MAKER",lg),
                                                     new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                                                     new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                                                     new SqlParameter("@LOG_TYPE",4),
                                                     new SqlParameter("@OLD_QUANTITY",OLD_quantity),
                                                     new SqlParameter("@NEW_QUANTITY",NEW_quantity),
                                                     new SqlParameter("@SERVICE_GUID",Convert.ToString(New_prs[k].SERVICE_GUID))
                                                }, CommandType.StoredProcedure);
                            }
                        }
                    }
                    // Если Добавлена Группа услуг
                    else
                    {
                        int Count_Grups = (int)Mydb.ExecuteScalar("GetServiceCount", new SqlParameter[] { new SqlParameter("@rid", REQUEST_ID), new SqlParameter("@Parent", "yes") }, CommandType.StoredProcedure);
                        if (Count_Grups == 0)
                        {
                            string NEW_quantity2 = Convert.ToString(New_prs[k].QUANTITY);

                            ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                                                 new SqlParameter("@REQUEST_ID",REQUEST_ID),
                                                 new SqlParameter("@EVENT_MAKER",lg),
                                                 new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                                                 new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                                                 new SqlParameter("@LOG_TYPE",5),
                                                 new SqlParameter("@NEW_QUANTITY",NEW_quantity2),
                                                 new SqlParameter("@SERVICE_GUID",Convert.ToString(New_prs[k].SERVICE_GUID))
                                            }, CommandType.StoredProcedure);
                        }
                        else
                        {
                            // если старый Группа услуг изменено на новый
                            string Old_Service_Guid = Mydb.ExecuteScalar("GetGrupOf_service_ofRequest", new SqlParameter[] { new SqlParameter("@rid", REQUEST_ID) }, CommandType.StoredProcedure).ToString();
                            if (Old_Service_Guid != New_Service_Guid)
                            {
                                ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                                             new SqlParameter("@REQUEST_ID",REQUEST_ID),
                                             new SqlParameter("@EVENT_MAKER",lg),
                                             new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                                             new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                                             new SqlParameter("@LOG_TYPE",7),
                                             new SqlParameter("@Old_Service_guid",Old_Service_Guid),
                                             new SqlParameter("@New_Service_guid",New_Service_Guid)
                                        }, CommandType.StoredProcedure);
                            }
                        }
                    }
                }

                //если Удалено услуги
                for (int i = 0; i < Old_prs.Count; i++)
                {
                    string Old_Service_Guid = Convert.ToString(Old_prs[i].SERVICE_GUID);
                    object Old_ParentId = ExecuteScalar("GetParentIdOfServices", new SqlParameter[] { new SqlParameter("@SERVICE_GUID", Old_Service_Guid) }, CommandType.StoredProcedure);
                    if (Old_ParentId != DBNull.Value)
                    {
                        bool hasService = false;

                        for (int k = 0; k < New_prs.Count; k++)
                        {
                            string New_Service_Guid = Convert.ToString(New_prs[k].SERVICE_GUID);
                            if (New_Service_Guid == Old_Service_Guid)
                            {
                                hasService = true;
                            }
                        }
                        if (hasService == false)
                        {
                            ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                             new SqlParameter("@REQUEST_ID",REQUEST_ID),
                             new SqlParameter("@EVENT_MAKER",lg),
                             new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                             new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                             new SqlParameter("@LOG_TYPE",6),
                             new SqlParameter("@OLD_QUANTITY","0"),
                             new SqlParameter("@SERVICE_GUID",Old_Service_Guid)
                        }, CommandType.StoredProcedure);
                        }
                    }
                    else
                    {
                        bool IsDeletedOrNot = false;
                        for (int k = 0; k < New_prs.Count; k++)
                        {

                            string New_Service_Guid = Convert.ToString(New_prs[k].SERVICE_GUID);
                            object New_ParentId = ExecuteScalar("GetParentIdOfServices", new SqlParameter[] { new SqlParameter("@SERVICE_GUID", New_Service_Guid) }, CommandType.StoredProcedure);
                            if (New_ParentId != DBNull.Value)
                            {
                                IsDeletedOrNot = true;
                            }

                        }
                        if (IsDeletedOrNot == true)
                        {
                            ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                             new SqlParameter("@REQUEST_ID",REQUEST_ID),
                             new SqlParameter("@EVENT_MAKER",lg),
                             new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                             new SqlParameter("@EVENT_TYPE",EVENT_TYPE),
                             new SqlParameter("@LOG_TYPE",6),
                             new SqlParameter("@OLD_QUANTITY","0"),
                             new SqlParameter("@SERVICE_GUID",Old_Service_Guid)
                        }, CommandType.StoredProcedure);
                        }
                    }
                }


            }



        }


        internal static int ExecuteScalar(string v, SqlParameter[] sqlParameter, object commadType)
        {
            throw new NotImplementedException();
        }


    }
}