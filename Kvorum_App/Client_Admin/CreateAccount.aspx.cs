using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Kvorum_App.Client_Admin.Utilities;
using System.Security.Cryptography;
using System.Text;

namespace Kvorum_App.Client_Admin
{
    public partial class CreateAccount : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string CheckMail(string email)
        {
            int EmCount = (int)Mydb.ExecuteScalar("select COUNT(*) from ACCOUNT where E_MAIL=@em", new SqlParameter[] { new SqlParameter("@em", email) }, CommandType.Text);
            if (EmCount==0)
            {
                return "{\"result\" : \"0\"}";
            }
            else
            {
                return "{\"result\" : \"1\"}";
            }
        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
        [WebMethod]
        public static string SaveAcc(List<MR>SMSR,string accName_,string PNumb_,string Email_,string Pass_,string ClId_,string Login_)
        {
            string NonEncryptedPass = Pass_;
            Pass_ = GetMd5HashData(Pass_);
            Mydb.ExecuteNoNQuery("insert into ACCOUNT (ACCOUNT_NAME,PHONE_NUMBER,E_MAIL,PASSWORD,CLIENT_ID,LOGIN) values(@accName,@PNumb,@Email,@Pass,@ClId,@Login)", new SqlParameter[]
            {
                new SqlParameter("@accName",accName_),
                new SqlParameter("@PNumb",PNumb_),
                new SqlParameter("@Email",Email_),
                new SqlParameter("@Pass",Pass_),
                new SqlParameter("@ClId",ClId_),
                new SqlParameter("@Login",Login_)
            }, CommandType.Text);
            int LogId = (int)Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where LOGIN=@Login", new SqlParameter[] { new SqlParameter("@Login", Login_) }, CommandType.Text);
            foreach (MR mr in SMSR)
            {
                int M_Id = Convert.ToInt32(mr.sm);
                int R_Id = Convert.ToInt32(mr.sr);
                /*INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);*/
                Mydb.ExecuteNoNQuery("insert into MODUL_ROLE (MODUL_ID,ROLE_ID) values (@Mid,@Rid)", new SqlParameter[] { new SqlParameter("@Mid", M_Id), new SqlParameter("@Rid", R_Id) }, CommandType.Text);
                int mr_Id = (int)Mydb.ExecuteScalar("select top 1 MR_ID from MODUL_ROLE order by MR_ID desc", new SqlParameter[] { }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into ACCOUNT_ROLE (LOG_IN_ID,MR_ID) values(@l,@mr)", new SqlParameter[] { new SqlParameter("@l", LogId), new SqlParameter("@mr", mr_Id) }, CommandType.Text);
                SendMail(Email_, NonEncryptedPass, Email_);
            }


            //foreach (MR item in SMSR)
            //{
            //    int mr_Id = (int)Mydb.ExecuteScalar("select MR_ID from MODUL_ROLE where ROLE_ID=@r and MODUL_ID=@m", new SqlParameter[]
            //    {
            //        new SqlParameter("@r",Convert.ToInt32(item.sr)),
            //        new SqlParameter("@m",Convert.ToInt32(item.sm))
            //    }, CommandType.Text);


            //        Mydb.ExecuteNoNQuery("insert into ACCOUNT_ROLE (LOG_IN_ID,MR_ID) values(@l,@mr)", new SqlParameter[] { new SqlParameter("@l", LogId), new SqlParameter("@mr", mr_Id )}, CommandType.Text);

            //}
            return "{\"result\" : \"1\"}";
        }

        public static string SendMail(string Login_Mail, string pass_, string Email_)
        {
            string succEm = "0";
            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = pass_;



           
            string text_ = "Для Вас создана учётная запись";
          
            string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>{0} в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Перейти в УправБот Вы можете по ссылке <a href=""https://upravbot.ru"">https://upravbot.ru</a></p<br><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";
           //string mobile = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
            body = String.Format(body, text_, Login_Mail, pass );
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
        [WebMethod]
        public static string UpdateAcc(List<MR> SMSR, string accName_, string PNumb_, string Email_, string Pass_, string ClId_, string Login_,int LgId)
        {
            DataTable dt_Acc_Role = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.Text);
           List<MR> mrs = new List<MR>();
            foreach (DataRow item in dt_Acc_Role.Rows)
            {
                int Mr_Id = Convert.ToInt32(item["MR_ID"]);
                Mydb.ExecuteNoNQuery("delete from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] { new SqlParameter("@mr", Mr_Id) }, CommandType.Text);
            }
            Mydb.ExecuteNoNQuery("delete from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.Text);
            foreach (MR mr in SMSR)
            {
                int M_Id = Convert.ToInt32(mr.sm);
                int R_Id = Convert.ToInt32(mr.sr);
                /*INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);*/
                Mydb.ExecuteNoNQuery("insert into MODUL_ROLE (MODUL_ID,ROLE_ID) values (@Mid,@Rid)", new SqlParameter[] { new SqlParameter("@Mid", M_Id), new SqlParameter("@Rid", R_Id) }, CommandType.Text);
                
                int LastMr = (int)Mydb.ExecuteScalar("select top 1 MR_ID from MODUL_ROLE order by MR_ID desc", new SqlParameter[] { }, CommandType.Text) ;
                Mydb.ExecuteNoNQuery("insert into ACCOUNT_ROLE (LOG_IN_ID,MR_ID) values(@l,@mr)", new SqlParameter[] { new SqlParameter("@l", LgId), new SqlParameter("@mr", LastMr) }, CommandType.Text);
            }


            //foreach (MR item in SMSR)
            //{
            //    int mr_Id = (int)Mydb.ExecuteScalar("select MR_ID from MODUL_ROLE where ROLE_ID=@r and MODUL_ID=@m", new SqlParameter[]
            //    {
            //        new SqlParameter("@r",Convert.ToInt32(item.sr)),
            //        new SqlParameter("@m",Convert.ToInt32(item.sm))
            //    }, CommandType.Text);


            //    Mydb.ExecuteNoNQuery("insert into ACCOUNT_ROLE (LOG_IN_ID,MR_ID) values(@l,@mr)", new SqlParameter[] { new SqlParameter("@l", LgId), new SqlParameter("@mr", mr_Id) }, CommandType.Text);

            //}
            if (Pass_.Length != 0)
            {
                Pass_ = GetMd5HashData(Pass_);
                Mydb.ExecuteNoNQuery("Update ACCOUNT set E_MAIL=@e,PHONE_NUMBER=@p,PASSWORD=@pas,ACCOUNT_NAME=@acc where LOG_IN_ID=@L", new SqlParameter[]
                {new SqlParameter("@e",Email_),
            new SqlParameter("@p",PNumb_),
            new SqlParameter("@acc",accName_),
            new SqlParameter("@L",LgId),
            new SqlParameter("@pas",Pass_)}, CommandType.Text);
            }
            else
            {
                Pass_ = GetMd5HashData(Pass_);
                Mydb.ExecuteNoNQuery("Update ACCOUNT set E_MAIL=@e,PHONE_NUMBER=@p,ACCOUNT_NAME=@acc where LOG_IN_ID=@L", new SqlParameter[]
                {new SqlParameter("@e",Email_),
            new SqlParameter("@p",PNumb_),
            new SqlParameter("@acc",accName_),
            new SqlParameter("@L",LgId)}, CommandType.Text);
            }
            return "{\"result\" : \"1\"}";
        }
        [WebMethod]
        public static string GetRole(int M_Id )
        {
            //List<Kvorum_App.Client_Admin.Utilities.Roles> rs = new List<Kvorum_App.Client_Admin.Utilities.Roles>();
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROLE", new SqlParameter[] {}, CommandType.Text);
            //foreach (DataRow item in dt.Rows)
            //{
            //    Kvorum_App.Client_Admin.Utilities.Roles role = new Kvorum_App.Client_Admin.Utilities.Roles();
            //    role.ROLE_NAME = item["ROLE_NAME"].ToString();
            //    role.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
            //    rs.Add(role);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(rs);

            List<Kvorum_App.Client_Admin.Utilities.Roles> rs = new List<Kvorum_App.Client_Admin.Utilities.Roles>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("select r.ROLE_ID,r.ROLE_NAME from RolesForModul rm, ROLE r where r.ROLE_ID=rm.R_ID and M_ID=@m", new SqlParameter[] { new SqlParameter("@m", M_Id) }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                Utilities.Roles r = new Utilities.Roles();
                r.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
                r.ROLE_NAME = item["ROLE_NAME"].ToString();

                rs.Add(r);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string getModul()
        {
            List<Kvorum_App.Client_Admin.Utilities.MODUL> ms = new List<Kvorum_App.Client_Admin.Utilities.MODUL>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("SELECT * FROM MODUL", new SqlParameter[] {  }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                Kvorum_App.Client_Admin.Utilities.MODUL modul = new Kvorum_App.Client_Admin.Utilities.MODUL();
                modul.MODUL_ID = Convert.ToInt32(item["MODUL_ID"]);
                modul.MODUL_NAME = item["MODUL_NAME"].ToString();
                ms.Add(modul);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string getLogin()
        {
            string nextLoginId = Mydb.ExecuteScalar("SELECT isnull(IDENT_CURRENT('ACCOUNT') + IDENT_INCR('ACCOUNT'),1)", new SqlParameter[] { }, CommandType.Text).ToString();
            nextLoginId = "Login_" + nextLoginId;

            return "{\"result\" : \""+nextLoginId+"\"}";
        }
        [WebMethod]
        public static string GetModel_Role(int LogId)
        {
            DataTable dt_Acc_Role = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.Text);
            List<MR> mrs = new List<MR>();
            foreach (DataRow item in dt_Acc_Role.Rows)
            {
                DataTable dt_M_R = Mydb.ExecuteReadertoDataTable("select * from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] { new SqlParameter("@mr", Convert.ToInt32(item["MR_ID"])) }, CommandType.Text);
                foreach (DataRow item2 in dt_M_R.Rows)
                {
                    MR mr = new MR();
                    mr.sm = item2["MODUL_ID"].ToString();
                    mr.sr = item2["ROLE_ID"].ToString();
                    mrs.Add(mr);
                }
            }
            JavaScriptSerializer js_mrs = new JavaScriptSerializer();

            return js_mrs.Serialize(mrs);
        }
    }
}