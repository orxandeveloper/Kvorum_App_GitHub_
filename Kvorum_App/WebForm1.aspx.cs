using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using HttpUtils;
using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Manager;
using Kvorum_App.Manager.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            #region For Test
            //string values_T = "{T1: \"1\",T2:\"2\", T3:\"3\"}";
            //  string values_T = "{T1: \"1\",T2:\"2\"}";
            //string values_T = "{T1: \"1\"}";
            //dynamic T_Values = JsonConvert.DeserializeObject(values_T);
            //string ValueT1 = T_Values.T1;
            //string ValueT2 = T_Values.T2;
            //string ValueT3 = T_Values.T3;
            //string a = ""; 
            #endregion

            #region SendSms
            //string URL = "https://my5.t-sms.ru/sendsms.php?user=matorin&pwd=MAT0R1N&sadr=79852029070&dadr=79999988754&text=HelloWorld";
            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            //request.Proxy = HttpWebRequest.DefaultWebProxy;
            //request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
            //request.PreAuthenticate = true;
            //request.ContentType = "application/json";
            //WebResponse webResponse = request.GetResponse();
            //Stream webStream = webResponse.GetResponseStream();
            //StreamReader responseReader = new StreamReader(webStream);
            //Response.Write(responseReader.ReadToEnd()); 
            #endregion
            // jsondata();
            //SendLoginMailFor34();
            // SendSms("79154916045", "Test221900", "Test_221900");Phone_number Anton
            //SendSmSForNewLS();
            // sendEmailForNewLs();

        }

        private void sendEmailForNewLs()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable(@"select ss.SCORE_ID, in_.EMAIL,ps.PASS,in_.FIRST_NAME from SubbotaScores ss
inner join INDIVIDUAL_PERSCORE ip on ip.SCORE_ID=ss.SCORE_ID
inner join PER_SCORE ps on ps.SCORE_ID=ss.SCORE_ID and ps.PASS=ss.PASS
inner join IND_NAME in_ on in_.INDIVIDUAL_ID=ip.INDIVIDUAL_ID and in_.EMAIL is not null", new SqlParameter[] { }, CommandType.Text);
            // SendMail("221900", "221900_pass", "orxandeveloper@gmail.com", "0");
            foreach (DataRow item in dt.Rows)
            {
                string Email = item["EMAIL"].ToString();
                string ScoreId = item["SCORE_ID"].ToString();
                string Pass = item["PASS"].ToString();
                SendMail(ScoreId, Pass, Email, "0");
            }
        }
        public static string SendMail(string score_, string pass_, string Email_, string srok_, string G = null)
        {
            string succEm = "0";
            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = pass_;
            string srok = (srok_ == "0") ? "у пароля неограниченный срок действия" : srok_;



            #region oldBodyMail

            //string body = @"<h4 style=""font-weight:100;""><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4><h4 style=""font - weight: 100; "">Здравствуйте! Для Вашего дома по адресу  <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">IOS</a> ) и личный кабинет на странице дома .</h4><h4 style=""font-weight: 100;"">Ваш логин: <b>""{1}""</b></h4><h4 style=""font-weight: 100;"">Ваш пароль:<b>""{2}""</b></h4><h4 style=""font-weight: 100;"">Срок действия пароля в днях:<b>""{3}""</b></h4><h4 style=""font-weight: 100;"">Вы можете поменять пароль в <a href=""#"">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4><h4 style=""font-weight: 100;"">В личном кабинете и мобильном приложении Вы сможете:</h4><img src=""https://upravbot.ru/img/prebor.jpg""><h4 style=""width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;"">Подать показания приборов учета</h4><br><img src =""https://upravbot.ru/img/money.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -4vw;""> Оплатить счет за жилищно - коммунальные услуги онлайн</h4><br><img src = ""https://upravbot.ru/img/doci.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -3vw;"" > Оформить заявку </h4><br><h4 style = ""font-weight:100"" > При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href = ""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></h4><br><h4 style = ""font-weight:100;font-style:  italic;"" > C уважением,Ваш «УПРАВБОТ».</h4> ";
            //string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><h2>Добро пожаловать!</h2><p>Для Вашего лицевого счета создана учетная запись в&nbsp;системе «Автопилот».</p><p>Здравствуйте! Для Вашего дома по адресу <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">iOS</a> ) и&nbsp;личный кабинет на странице дома.</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Вы можете поменять пароль в&nbsp;<a href=""#"">настройках профиля</a> в&nbsp;личном кабинете или в&nbsp;мобильном приложении.</p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «Автопилот», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «Автопилот».</p></div></div>";
            //body = String.Format(body, protocol, score_, pass);

            #endregion
            string text_ = "Для Вашего лицевого счета создана учетная запись";
            if (G != null)
            {
                text_ = G;
            }
            string body = @" \<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>{3} в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{0}""</b></p><p>Ваш пароль:<b>""{1}""</b></p><p>Скачать приложение Вы можете: <a href=""{2}"">http://www.matorin-un.ru/getmobile</a></p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";
            string mobile = "http://www.matorin-un.ru/getmobile";//HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
            body = String.Format(body, score_, pass, mobile, text_);
            try
            {
                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                succEm = "1";
            }
            catch (Exception)
            {

                succEm = "0";
            }
            return succEm;
        }
        private void SendSmSForNewLS()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable(@"select ss.SCORE_ID,
'7'+REVERSE(SUBSTRING((REVERSE(LTRIM(RTRIM(REPLACE(in_.PHONE,' ',''))))),0,11)) as PHONE ,ps.PASS,in_.FIRST_NAME from SubbotaScores ss
inner join INDIVIDUAL_PERSCORE ip on ip.SCORE_ID = ss.SCORE_ID
inner join PER_SCORE ps on ps.SCORE_ID = ss.SCORE_ID and ps.PASS = ss.PASS
inner join IND_NAME in_ on in_.INDIVIDUAL_ID = ip.INDIVIDUAL_ID and in_.PHONE is not null", new SqlParameter[] { }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                string Phone = item["PHONE"].ToString();
                string ScoreId = item["SCORE_ID"].ToString();
                string Pass = item["PASS"].ToString();
                SendSms(Phone, ScoreId, Pass);
            }
        }

        public static string SendSms(string Phone_, string score_, string Pass, string G = null)
        {
            string success = "";
            string nm = Phone_;
            nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ').Replace('+', ' ');
            nm = nm.Replace(" ", string.Empty);
            if (nm.Length == 10)
            {
                nm = "7" + nm;
                // Console.WriteLine("10simvol");
            }
            if (nm.Length > 10)
            {
                //  Console.WriteLine("nm.Length>10");
                string is_seven = nm.Substring(0, 1);
                if (is_seven == "8")
                {
                    //Console.WriteLine("is_seven==8");
                    nm = nm.Remove(0, 1);
                    nm = "7" + nm;
                }
                is_seven = nm.Substring(0, 1);
                if (is_seven != "7")
                {
                    // Console.WriteLine("is_seven!=7");
                    nm = "7" + nm;
                }
            }
            // string protocol = "test Link";//Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjectId_) }, CommandType.Text).ToString();
            // protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
            //string text = "Uvazhaemyj zhitel'! Vam vystavlen schet za ZHKU. Dlya oplaty ispol'zujte mobil'prilozhenie: " + protocol + ". Vash MATORIN";
            string protocolForApps = "http://www.matorin-un.ru/getmobile";//"http://onelink.to/9qxk74"//HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
            //"http://www.matorin-un.ru/getmobile";
            string text = "Dlya Vas sozdana uchetnaya zapis' v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")"; //"Для Вас создана учётная запись в системе \"Управбот\". Логин: " + score_ + ". Пароль: " + Pass + " . Скачать приложение: " + protocolForApps;
            if (G != null)
            {
                text = G + " v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")";
                //"Dlya Vas sozdan parol’ v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")";
            }
            string URL = "https://my5.pir.company/sendsms.php?user=matorin&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
            //https://my5.t-sms.ru/sendsms.php
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
                request.Proxy = HttpWebRequest.DefaultWebProxy;
                request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
                request.PreAuthenticate = true;
                request.ContentType = "application/json";
                WebResponse webResponse = request.GetResponse();
                Stream webStream = webResponse.GetResponseStream();
                StreamReader responseReader = new StreamReader(webStream);
                string rspns = responseReader.ReadToEnd();

                Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score_), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
                success = "1";
            }
            catch (Exception)
            {

                success = "0";
            }
            return success;
        }
        public static string GeneratePass() {
            var bigCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var smallCases = "abcdefghijklmnopqrstuvwxyz";
            var numbers = "0123456789";
            var random = new Random();
            int bigrand_ = random.Next(bigCases.Length);
            var BigRand = bigCases[bigrand_].ToString();// bigCases[Math.Floor(Math.random() * bigCases.Length)];

            int smallRand_ = random.Next(smallCases.Length);
            var smallRand = smallCases[smallRand_];//smallCases[Math.Floor(Math.random() * smallCases.Length)];

            var numbRand="";
            for (var i = 0; i < 6; i++)
            {
                numbRand += numbers[random.Next(numbers.Length)]; //numbers[Math.Floor(Math.random() * numbers.Length)];
            }
            var GenPas = BigRand + smallRand + numbRand;
            return GenPas;
        }
        public static string SendLoginMailFor34(string Login_Mail = null, string pass_ = null, string Email_=null)
        {
            string succEm = "0";
            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = "";
            DataTable dt = Mydb.ExecuteReadertoDataTable("select LTRIM(RTRIM(E_MAIL)) as E_Mail,LOG_IN_ID,ISNULL(ACCOUNT_NAME,'noName') as ACCOUNT_NAME from ACCOUNT where LOG_IN_ID>=748 order  by LOG_IN_ID desc", new SqlParameter[] { }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                string Em = item["E_MAIL"].ToString();
                string Login_ = item["LOG_IN_ID"].ToString();
                  pass = GeneratePass();
                string Account__ = item["ACCOUNT_NAME"].ToString();
                string EncryptedPass = GetMd5HashData(pass);
                Mydb.ExecuteNoNQuery(" update ACCOUNT  set [PASSWORD]=@encPass where LOG_IN_ID=@lg", new SqlParameter[] {new SqlParameter("@encPass", EncryptedPass),new SqlParameter("@lg",Convert.ToInt32(Login_)) }, CommandType.Text);

                string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>{0} в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Перейти в УправБот Вы можете по ссылке <a href=""https://upravbot.ru"">https://upravbot.ru</a></p<br><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";

                string text_ = "Для Вас создана учётная запись";
                body = String.Format(body, text_, Em, pass);
                try
                {
                    Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Em), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                    succEm = "1";
                    Mydb.ExecuteNoNQuery("insert into AccPassEms (LoginID,Account_name,[Password],E_mail) values(@LoginID,@Account_name,@Password,@E_mail)", new SqlParameter[] {new SqlParameter("@LoginID",Login_),new SqlParameter("@Account_name", Account__),new SqlParameter("@Password", pass),new SqlParameter("@E_mail", Em) }, CommandType.Text);
                }
                catch (Exception ex)
                {
                    Mydb.ExecuteNoNQuery("insert into AccPassEms (LoginID,Account_name,[Password],E_mail) values(@LoginID,@Account_name,@Password,@E_mail)", new SqlParameter[] { new SqlParameter("@LoginID", Login_), new SqlParameter("@Account_name", Account__), new SqlParameter("@Password", pass), new SqlParameter("@E_mail","Error_("+ ex.Message + ")_"+ Em) }, CommandType.Text);
                    succEm =ex.Message;
                }
            }





            

            
            //string mobile = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
           
          
            return succEm;
        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
        public static void gg(){
        
}
        public void jsondata()
        {
            //Dictionary<string, string> region;
            //List<Dictionary<string, object>> regions = new List<Dictionary<string, object>>();
            List<Locations> regions = new List<Locations>();

           
            DataTable dt= Mydb.ExecuteReadertoDataTable("sp_KLADR_GET_REGION", new SqlParameter[] { }, CommandType.StoredProcedure);
            foreach (DataRow item in dt.Rows)
            {

                Locations loc = new Locations();
                loc.CODE = item["CODE"].ToString();
                loc.Name = item["Name"].ToString();
                regions.Add(loc);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();

            Response.Write(js.Serialize(regions));
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //int true_or_not = (int)Mydb.ExecuteScalar("uspo_Compare", new SqlParameter[] { new SqlParameter("@trueWord", "Январь"),new SqlParameter("@WordInExcel", "янв") }, CommandType.StoredProcedure);
            //if (true_or_not==1)
            //{
            //    string fuck = "dogru";
            //}
            //if (true_or_not==2)
            //{
            //    string fuck2 = "Yanlis";
            //}
            DataTable dt = give_exampleError_dataTable();//Mydb.ExecuteReadertoDataTable("select * from METERS", new SqlParameter[] { }, CommandType.Text);
            string strFilePath = @"C:\inetpub\wwwroot\Files\Error_Excel\FUck_off.xlsx";
            if (dt.Rows.Count == 0)
            {
                string hh = "helloworld";
            }
            //StreamWriter sw = new StreamWriter(strFilePath, false);
            //sw.Write(dt);
            //var wb = new XLWorkbook();
            //wb.Worksheets.Add(dt,dt.TableName);
            //wb.SaveAs(strFilePath);
            using (var workbook = new XLWorkbook())
            {
                
                var worksheet = workbook.Worksheets.Add("Sample Sheet");
                
                int cell = 2;
                worksheet.Cell("A1").Value = "№ ЛС*";
                worksheet.Cell("A1").Style.Font.Bold = true;
                worksheet.Cell("A1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("B1").Value = "Период*";
                worksheet.Cell("B1").Style.Font.Bold = true;
                worksheet.Cell("B1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("C1").Value = "Услуга*";
                worksheet.Cell("C1").Style.Font.Bold = true;
                worksheet.Cell("C1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("D1").Value = "Тип начисления/платежа*";
                worksheet.Cell("D1").Style.Font.Bold = true;
                worksheet.Cell("D1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("E1").Value = "Остаток на начало периода";
                worksheet.Cell("E1").Style.Font.Bold = true;
                worksheet.Cell("F1").Value = "Начислено*";
                worksheet.Cell("F1").Style.Font.Bold = true;
                worksheet.Cell("F1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("G1").Value = "Поступило";
                worksheet.Cell("G1").Style.Font.Bold = true;
                worksheet.Cell("H1").Value = "Остаток на конец периода";
                worksheet.Cell("H1").Style.Font.Bold = true;
                worksheet.Cell("I1").Value = "Ошибка";
                worksheet.Cell("I1").Style.Font.Bold = true;
                foreach (DataRow item in dt.Rows)
                {
                    worksheet.Cell("A" + cell.ToString() + "").Value = item["№ ЛС*"].ToString();
                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле")!=-1)
                    {
                        worksheet.Cell("A" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    if (item["Ошибка"].ToString().IndexOf("Л/с нет в системе") != -1)
                    {
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.FontColor= XLColor.Red;
                    }
                    worksheet.Cell("B" + cell.ToString()).Style.NumberFormat.Format = "MMMM yyyy";
                    worksheet.Cell("B" + cell.ToString() + "").Value = item["Период*"].ToString();

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {
                       
                        worksheet.Cell("B" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    {
                        worksheet.Cell("B" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("B" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    }

                  
                    worksheet.Cell("C" + cell.ToString() + "").Value = item["Услуга*"].ToString();

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        worksheet.Cell("C" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    //if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    //{
                    //    worksheet.Cell("C" + cell.ToString() + "").Style.Font.Bold = true;
                    //    worksheet.Cell("C" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    //}

                    worksheet.Cell("D" + cell.ToString() + "").Value = item["Тип начисления/платежа*"].ToString();

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        worksheet.Cell("D" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                    }
                    if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    {
                        worksheet.Cell("D" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("D" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    }

                    worksheet.Cell("E" + cell.ToString() + "").Value = item["Остаток на начало периода"].ToString();
                    worksheet.Cell("F" + cell.ToString() + "").Value = item["Начислено*"].ToString();
                    worksheet.Cell("G" + cell.ToString() + "").Value = item["Поступило"].ToString();

                    if (item["Услуга*"].ToString()== "Итого")
                    {
                        if (item["№ ЛС*"].ToString().Length==0)
                        {
                            worksheet.Cell("A" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Период*"].ToString().Length == 0)
                        {
                            worksheet.Cell("B" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Услуга*"].ToString().Length == 0)
                        {
                            worksheet.Cell("C" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Тип начисления/платежа*"].ToString().Length == 0)
                        {

                            worksheet.Cell("D" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Остаток на начало периода"].ToString().Length == 0)
                        {
                            worksheet.Cell("E" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Начислено*"].ToString().Length == 0)
                        {
                            worksheet.Cell("F" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Поступило"].ToString().Length == 0)
                        {
                            worksheet.Cell("G" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Остаток на конец периода"].ToString().Length == 0)
                        {
                            worksheet.Cell("H" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        
                    }

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        worksheet.Cell("G" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                    }

                    worksheet.Cell("H" + cell.ToString() + "").Value = item["Остаток на конец периода"].ToString();
                    worksheet.Cell("I" + cell.ToString() + "").Value = item["Ошибка"].ToString();
                    worksheet.Cell("I" + cell.ToString() + "").Style.Font.Bold = true;
                    worksheet.Cell("I" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    cell++;
                }
                var rngTable = worksheet.Range("A1:I"+cell.ToString()+"");
                rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Columns().AdjustToContents();
                workbook.SaveAs(strFilePath);
            }
        }

        public DataTable give_exampleError_dataTable()
        {
            DataTable dtError = new DataTable();
            dtError.TableName = "Errors_PDS";
            dtError.Clear();
            dtError.Columns.Add("№ ЛС*");
            dtError.Columns.Add("Период*",typeof(string));
            dtError.Columns.Add("Услуга*");
            dtError.Columns.Add("Тип начисления/платежа*");
            dtError.Columns.Add("Остаток на начало периода");
            dtError.Columns.Add("Начислено*");
            dtError.Columns.Add("Поступило");
            dtError.Columns.Add("Остаток на конец периода");
            dtError.Columns.Add("Ошибка");
            dtError.Columns.Add("CellAdress");

            DataRow rw = dtError.NewRow();

            rw["№ ЛС*"] = "4972";
            rw["Период*"] = "Январь 2016".ToString();
            rw["Услуга*"] = "ХВС";
            rw["Тип начисления/платежа*"] = "ЖКУ";
            rw["Остаток на начало периода"] = "";
            rw["Начислено*"] = "26,00";
            rw["Поступило"] = "";
            rw["Остаток на конец периода"] = "";
            rw["Ошибка"] = "Л/с нет в системе";
            rw["CellAdress"] = "A2";
            dtError.Rows.Add(rw);

            DataRow rw2 = dtError.NewRow();

            rw2["№ ЛС*"] = "4972";
            rw2["Период*"] = "Январь 2016";
            rw2["Услуга*"] = "Теплоэнергия";
            rw2["Тип начисления/платежа*"] = "ЖКУ";
            rw2["Остаток на начало периода"] = "";
            rw2["Начислено*"] = "28,00";
            rw2["Поступило"] = "";
            rw2["Остаток на конец периода"] = "";
            rw2["Ошибка"] = "Дублирование данных";
            rw2["CellAdress"] = "A3,B3,C3";
            dtError.Rows.Add(rw2);

            DataRow rw3 = dtError.NewRow();

            rw3["№ ЛС*"] = "4972";
            rw3["Период*"] = "Январь 2016";
            rw3["Услуга*"] = "Электроэнергия";
            rw3["Тип начисления/платежа*"] = "";
            rw3["Остаток на начало периода"] = "";
            rw3["Начислено*"] = "22,00";
            rw3["Поступило"] = "";
            rw3["Остаток на конец периода"] = "";
            rw3["Ошибка"] = "Не заполнено обязательное поле";
            rw3["CellAdress"] = "D4";
            dtError.Rows.Add(rw3);

            DataRow rw4 = dtError.NewRow();

            rw4["№ ЛС*"] = "4972";
            rw4["Период*"] = "Январь 2016";
            rw4["Услуга*"] = "Капитальный ремонт";
            rw4["Тип начисления/платежа*"] = "Капитальный ремонт";
            rw4["Остаток на начало периода"] = "";
            rw4["Начислено*"] = "30,00";
            rw4["Поступило"] = "";
            rw4["Остаток на конец периода"] = "";
            rw4["Ошибка"] = "Некорректно заполнено поле";
            rw4["CellAdress"] = "D5";
            dtError.Rows.Add(rw4);

            DataRow rw5 = dtError.NewRow();

            rw5["№ ЛС*"] = "4972";
            rw5["Период*"] = "";
            rw5["Услуга*"] = "Газ";
            rw5["Тип начисления/платежа*"] = "ЖКУ";
            rw5["Остаток на начало периода"] = "";
            rw5["Начислено*"] = "27,00";
            rw5["Поступило"] = "";
            rw5["Остаток на конец периода"] = "";
            rw5["Ошибка"] = "Некорректно заполнено поле";
            rw5["CellAdress"] = "B6";
            dtError.Rows.Add(rw5);

            DataRow rw6 = dtError.NewRow();

            rw6["№ ЛС*"] = "4972";
            rw6["Период*"] = "Январь 2016";
            rw6["Услуга*"] = "Теплоэнергия";
            rw6["Тип начисления/платежа*"] = "ЖКУ";
            rw6["Остаток на начало периода"] = "";
            rw6["Начислено*"] = "29,00";
            rw6["Поступило"] = "";
            rw6["Остаток на конец периода"] = "";
            rw6["Ошибка"] = "Дублирование данных";
            rw6["CellAdress"] = "A7,B7,C7";
            dtError.Rows.Add(rw6);


            DataRow rw7 = dtError.NewRow();

            rw7["№ ЛС*"] = "4972";
            rw7["Период*"] = "Январь 2016";
            rw7["Услуга*"] = "Горячая вода";
            rw7["Тип начисления/платежа*"] = "ЖКУ";
            rw7["Остаток на начало периода"] = "";
            rw7["Начислено*"] = "26,00";
            rw7["Поступило"] = "";
            rw7["Остаток на конец периода"] = "";
            rw7["Ошибка"] = "Некорректно заполнено поле";
            rw7["CellAdress"] = "C8";
            dtError.Rows.Add(rw7);


            DataRow rw8 = dtError.NewRow();

            rw8["№ ЛС*"] = "4972";
            rw8["Период*"] = "Январь 2016";
            rw8["Услуга*"] = "Итого";
            rw8["Тип начисления/платежа*"] = "ЖКУ";
            rw8["Остаток на начало периода"] = "";
            rw8["Начислено*"] = "23,00";
            rw8["Поступило"] = "";
            rw8["Остаток на конец периода"] = "";
            rw8["Ошибка"] = "Не заполнено обязательное поле";
            rw8["CellAdress"] = "C8";
            dtError.Rows.Add(rw8);

            DataRow rw9 = dtError.NewRow();

            rw9["№ ЛС*"] = "4273";
            rw9["Период*"] = "Август 2016";
            rw9["Услуга*"] = "Теплоэнергия";
            rw9["Тип начисления/платежа*"] = "ЖКУ";
            rw9["Остаток на начало периода"] = "";
            rw9["Начислено*"] = "";
            rw9["Поступило"] = "";
            rw9["Остаток на конец периода"] = "";
            rw9["Ошибка"] = "Не заполнено обязательное поле";
            rw9["CellAdress"] = "C8";
            dtError.Rows.Add(rw9);

            DataRow rw10 = dtError.NewRow();

            rw10["№ ЛС*"] = "4273";
            rw10["Период*"] = "фев.2016";
            rw10["Услуга*"] = "Капитальный ремонт";
            rw10["Тип начисления/платежа*"] = "КР";
            rw10["Остаток на начало периода"] = "";
            rw10["Начислено*"] = "28,00";
            rw10["Поступило"] = "";
            rw10["Остаток на конец периода"] = "";
            rw10["Ошибка"] = "Некорректно заполнено поле";
            rw10["CellAdress"] = "B11";
            dtError.Rows.Add(rw10);


            DataRow rw11 = dtError.NewRow();

            rw11["№ ЛС*"] = "4273";
            rw11["Период*"] = "февраль 2016";
            rw11["Услуга*"] = "";
            rw11["Тип начисления/платежа*"] = "ЖКУ";
            rw11["Остаток на начало периода"] = "";
            rw11["Начислено*"] = "32,00";
            rw11["Поступило"] = "";
            rw11["Остаток на конец периода"] = "";
            rw11["Ошибка"] = "Не заполнено обязательное поле";
            rw11["CellAdress"] = "С12";
            dtError.Rows.Add(rw11);

            DataRow rw12 = dtError.NewRow();

            rw12["№ ЛС*"] = "";
            rw12["Период*"] = "февраль 2016";
            rw12["Услуга*"] = "ГВС";
            rw12["Тип начисления/платежа*"] = "ЖКУ";
            rw12["Остаток на начало периода"] = "";
            rw12["Начислено*"] = "33,00";
            rw12["Поступило"] = "";
            rw12["Остаток на конец периода"] = "";
            rw12["Ошибка"] = "Не заполнено обязательное поле";
            rw12["CellAdress"] = "С13";
            dtError.Rows.Add(rw12);

            return dtError;
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            //DataTable dt = Apartments.ExcelToDataTable("Все услуги по проектам Фили Град, Весна, Символ_2.0.xlsx");
            //for (int i = 1; i < dt.Rows.Count; i++)
            //{
            //    string Edizm = dt.Rows[i][3].ToString();
            //    int Count_uom = (int)Mydb.ExecuteScalar("select COUNT(*) from UNIT_OF_MEASURE where UNIT_OF_MEASURE_NAME=@uom", new SqlParameter[] { new SqlParameter("@uom",Edizm) }, CommandType.Text);
            //    if (Count_uom==0)
            //    {
            //        Mydb.ExecuteNoNQuery("INSERT INTO UNIT_OF_MEASURE (UNIT_OF_MEASURE_NAME)VALUES (@Edizm)", new SqlParameter[] { new SqlParameter("@Edizm", Edizm) }, CommandType.Text);
            //    }

            //}
            //Response.Write("Edizm_is Done...");
        }

        protected void Button3_Click(object sender, EventArgs e)
        {
            //DataTable dt = Apartments.ExcelToDataTable("Все услуги по проектам Фили Град, Весна, Символ_2.0.xlsx");
            //for (int i = 1; i < dt.Rows.Count; i++)
            //{
            //    string Edizm = dt.Rows[i][3].ToString();
            //    int EdizmId = (int)Mydb.ExecuteScalar("select UNIT_OF_MEASURE_ID from UNIT_OF_MEASURE where UNIT_OF_MEASURE_NAME=@Edizm", new SqlParameter[] { new SqlParameter("@Edizm", Edizm) }, CommandType.Text);
            //    string SERVICE_NAME = dt.Rows[i][2].ToString();

            //    string Dn_Name = dt.Rows[i][1].ToString();

            //    int Service_DIrect_id = (int)Mydb.ExecuteScalar("select DIRECTION_ID from SERVICE_DIRECT where DIRECTION_NAME=@dn", new SqlParameter[] { new SqlParameter("@dn",Dn_Name) }, CommandType.Text);

            //    int countService = (int)Mydb.ExecuteScalar("select COUNT(*) from PRODUCT_SERVICE where [SERVICE_NAME]=@sn", new SqlParameter[] { new SqlParameter("@sn", SERVICE_NAME) }, CommandType.Text);

            //    if (countService==0)
            //    {
            //        Mydb.ExecuteNoNQuery("INSERT INTO PRODUCT_SERVICE ([SERVICE_NAME], DIRECTION_ID, UNIT_OF_MEASURE_ID)VALUES (@SERVICE_NAME, @DIRECTION_ID, @UNIT_OF_MEASURE_ID)", new SqlParameter[] { new SqlParameter("@SERVICE_NAME",SERVICE_NAME),new SqlParameter("@DIRECTION_ID", Service_DIrect_id),new SqlParameter("@UNIT_OF_MEASURE_ID", EdizmId) }, CommandType.Text);
            //    }

            //}
            //Response.Write("Adding Product_Service is Done");
        }

        protected void Button4_Click(object sender, EventArgs e)
        {
            DataTable dt = ExcelToDataTable2("Все услуги по проектам Фили Град, Весна, Символ_2.0.xlsx");
            for (int i = 1; i < dt.Rows.Count; i++)
            {
                string Project = dt.Rows[i][0].ToString();

                int ProjectId = (int)Mydb.ExecuteScalar("select PROJECT_ID from PROJECTS where PROJECT_NAME=@PROJECT_NAME", new SqlParameter[] {new SqlParameter("@PROJECT_NAME", Project) }, CommandType.Text);

                string SERVICE_NAME = dt.Rows[i][2].ToString();

                string DIRECTION_NAME = dt.Rows[i][1].ToString();
                string UNIT_OF_MEASURE_NAME = dt.Rows[i][3].ToString();

                // decimal Cost = decimal.Parse(string.Format("{0:0.00}", dt.Rows[i][4].ToString()));
                string Cost = dt.Rows[i][4].ToString();

                int PRODUCT_SERVICE_ID = (int)Mydb.ExecuteScalar("select SERVICE_ID from PRODUCT_SERVICE where [SERVICE_NAME]=@SERVICE_NAME and DIRECTION_ID= (select DIRECTION_ID from SERVICE_DIRECT where DIRECTION_NAME=@DIRECTION_NAME) and UNIT_OF_MEASURE_ID =( select UNIT_OF_MEASURE_ID from UNIT_OF_MEASURE where UNIT_OF_MEASURE_NAME=@UNIT_OF_MEASURE_NAME)", new SqlParameter[] {new SqlParameter("@SERVICE_NAME",SERVICE_NAME),new SqlParameter("@DIRECTION_NAME", DIRECTION_NAME),new SqlParameter("@UNIT_OF_MEASURE_NAME", UNIT_OF_MEASURE_NAME) }, CommandType.Text);

                int COuntOfPROJECT_PRODUCT_SERVICE_ = (int)Mydb.ExecuteScalar("select COUNT(*) from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@PRODUCT_SERVICE_ID and PROJECT_ID=@PROJECT_ID and COST=@COST", new SqlParameter[] {new SqlParameter("@PRODUCT_SERVICE_ID", PRODUCT_SERVICE_ID),new SqlParameter("@PROJECT_ID",ProjectId),new SqlParameter("@COST",Cost) }, CommandType.Text);
                if (COuntOfPROJECT_PRODUCT_SERVICE_==0)
                {
                    Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE(PRODUCT_SERVICE_ID,PROJECT_ID,COST) values(@PRODUCT_SERVICE_ID,@PROJECT_ID,@COST)", new SqlParameter[] { new SqlParameter("@PRODUCT_SERVICE_ID", PRODUCT_SERVICE_ID), new SqlParameter("@PROJECT_ID", ProjectId), new SqlParameter("@COST", Cost) }, CommandType.Text);
                }

            }
            Response.Write("Adding PROJECT_PRODUCT_SERVICE is Done");
        }


        #region OldExcelToDataTable

        public static WorksheetPart GetWorksheetPart(WorkbookPart workbookPart, string sheetName)
        {
            string relId = workbookPart.Workbook.Descendants<Sheet>().First(s => sheetName.Equals(s.Name)).Id;
            return (WorksheetPart)workbookPart.GetPartById(relId);
        }
        public static string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
            if (cell.CellValue == null)
            {
                return "";
            }
            string value = cell.CellValue.InnerXml;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                
                return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
            }
            else
            {
                return value;
            }
        }
        public static string GetColumnName(string cellReference)
        {
            // Create a regular expression to match the column name portion of the cell name.
            Regex regex = new Regex("[A-Za-z]+");
            Match match = regex.Match(cellReference);
            return match.Value;
        }
        public static int? GetColumnIndexFromName(string columnName)
        {
            //return columnIndex;
            string name = columnName;
            int number = 0;
            int pow = 1;
            for (int i = name.Length - 1; i >= 0; i--)
            {
                number += (name[i] - 'A' + 1) * pow;
                pow *= 26;
            }
            return number;
        }
        public static DataTable ExcelToDataTable2(string file)
        {
            string fullPath = @"C:\inetpub\wwwroot\Files\";// " + file + "";
            fullPath = fullPath.Replace("~", "\\");
            var excelFileToImport = Directory.GetFiles(fullPath, file, SearchOption.AllDirectories);
            //Create a new DataTable.
            System.Data.DataTable dt = new System.Data.DataTable();
            //Open the Excel file in Read Mode using OpenXML
            using (SpreadsheetDocument doc = SpreadsheetDocument.Open(excelFileToImport[0], false))
            {
                WorksheetPart titlesWorksheetPart = GetWorksheetPart(doc.WorkbookPart, "Лист1");

                Worksheet titlesWorksheet = titlesWorksheetPart.Worksheet;
                //Fetch all the rows present in the worksheet
                IEnumerable<Row> rows = titlesWorksheet.GetFirstChild<SheetData>().Descendants<Row>();

                foreach (Cell cell in rows.ElementAt(0))
                {
                    
                    dt.Columns.Add(GetCellValue(doc, cell)); // this will include 2nd row a header row
                }
                //Loop through the Worksheet rows
                foreach (Row row in rows)
                {

                    System.Data.DataRow tempRow = dt.NewRow();
                    int columnIndex = 0;
                    foreach (Cell cell in row.Descendants<Cell>())
                    {
                        // Gets the column index of the cell with data
                        int cellColumnIndex = (int)GetColumnIndexFromName(GetColumnName(cell.CellReference));
                        cellColumnIndex--; //zero based index
                        if (columnIndex < cellColumnIndex)
                        {
                            do
                            {
                                tempRow[columnIndex] = ""; //Insert blank data here;
                                columnIndex++;
                            }
                            while (columnIndex < cellColumnIndex);
                        }
                        tempRow[columnIndex] = GetCellValue(doc, cell);

                        columnIndex++;
                    }
                    dt.Rows.Add(tempRow);

                }
            }
            return dt;
        }

        #endregion

        #region Konstanin
        //public DataTable ReadExcelFileDOM(string filename)
        //{
        //    DataTable table;

        //    using (SpreadsheetDocument myDoc = SpreadsheetDocument.Open(filename, true))
        //    {
        //        WorkbookPart workbookPart = myDoc.WorkbookPart;
        //        Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().First();
        //        WorksheetPart worksheetPart =
        //         (WorksheetPart)(workbookPart.GetPartById(worksheet.Id));
        //        SheetData sheetData =
        //            worksheetPart.Worksheet.Elements<SheetData>().First();
        //        List<List<string>> totalRows = new List<List<string>>();
        //        int maxCol = 0;

        //        foreach (Row r in sheetData.Elements<Row>())
        //        {
        //            // Add the empty row. 
        //            string value = null;
        //            while (totalRows.Count < r.RowIndex - 1)
        //            {
        //                List<string> emptyRowValues = new List<string>();
        //                for (int i = 0; i < maxCol; i++)
        //                {
        //                    emptyRowValues.Add("");
        //                }
        //                totalRows.Add(emptyRowValues);
        //            }


        //            List<string> tempRowValues = new List<string>();
        //            foreach (Cell c in r.Elements<Cell>())
        //            {
        //                #region get the cell value of c. 
        //                if (c != null)
        //                {
        //                    value = c.InnerText;

        //                    // If the cell represents a numeric value, you are done. 
        //                    // For dates, this code returns the serialized value that 
        //                    // represents the date. The code handles strings and Booleans 
        //                    // individually. For shared strings, the code looks up the 
        //                    // corresponding value in the shared string table. For Booleans, 
        //                    // the code converts the value into the words TRUE or FALSE. 
        //                    if (c.DataType != null)
        //                    {
        //                        switch (c.DataType.Value)
        //                        {
        //                            case CellValues.SharedString:
        //                                // For shared strings, look up the value in the shared 
        //                                // strings table. 
        //                                var stringTable = workbookPart.
        //                                    GetPartsOfType<SharedStringTablePart>().FirstOrDefault();

        //                                // If the shared string table is missing, something is 
        //                                // wrong. Return the index that you found in the cell. 
        //                                // Otherwise, look up the correct text in the table. 
        //                                if (stringTable != null)
        //                                {
        //                                    value = stringTable.SharedStringTable.
        //                                        ElementAt(int.Parse(value)).InnerText;
        //                                }
        //                                break;

        //                            case CellValues.Boolean:
        //                                switch (value)
        //                                {
        //                                    case "0":
        //                                        value = "FALSE";
        //                                        break;
        //                                    default:
        //                                        value = "TRUE";
        //                                        break;
        //                                }
        //                                break;
        //                        }
        //                    }

        //                    //Console.Write(value + "  "); 
        //                }
        //                #endregion

        //                // Add the cell to the row list. 
        //                int i = Convert.ToInt32(c.CellReference.ToString().ToCharArray().First() - 'A');

        //                // Add the blank cell in the row. 
        //                while (tempRowValues.Count < i)
        //                {
        //                    tempRowValues.Add("");
        //                }
        //                tempRowValues.Add(value);
        //            }

        //            // add the row to the totalRows. 
        //            // maxCol = processList(tempRowValues, totalRows, maxCol);
        //            Console.Clear();
        //            Console.Write("Processing..." + DateTime.Now.ToLongTimeString());

        //        }

        //        //table = ConvertListListStringToDataTable(totalRows, maxCol);
        //    }
        //    return table;
        //} 
        #endregion

        protected void Button5_Click(object sender, EventArgs e)
        {
            //int id = (int)Mydb.ExecuteScalar("INSERT INTO RECIEPT_FOR_PAYMENT (DATA_MOUNTH_YEAR)OUTPUT Inserted.RECIEPT_FOR_PAYMENT_ID VALUES(@b)", new SqlParameter[] { new SqlParameter("@b", "bob") }, CommandType.Text);

            Response.Write("<script>alert('You fucking ass hole... I said do not click... Congratulations you delete the entire of database')</script>");
        }

        protected void button6_Click(object sender, EventArgs e)
        {
            string Json = Mydb.ExecuteAsJson("select ip.SCORE_ID,in_.EMAIL from INDIVIDUAL_PERSCORE ip inner join IND_NAME in_ on in_.INDIVIDUAL_ID = ip.INDIVIDUAL_ID and EMAIL is not null and LEN(EMAIL) <> 0", new SqlParameter[] { }, CommandType.Text);
            Response.Write(Json);
        }
    }
}