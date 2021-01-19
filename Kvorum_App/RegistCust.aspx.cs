using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App
{
    public partial class RegistCust : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          
        }

        [WebMethod]
        public static string CheckAttandEmail(string mail, int TipOrg)
        {
            try
            {
                mail = "%" + mail + "%";

                int result = (int)Mydb.ExecuteScalar("select COUNT(*) from ACCOUNT where E_MAIL like @mail and CLIENT_ID=(select CLIENT_ID from CLIENT where ATTRIBUTE_ID=(select ATTRIBUTE_ID from CLIENT_ATTRIBUTE where ATTRIBUTE_ID=@org))", new SqlParameter[] { new SqlParameter("@mail", mail), new SqlParameter("@org", TipOrg) }, CommandType.Text);
                if (result==1)
                {
                    return "{\" result\" : \"1\"}";
                }
                else
                {
                    return "{\" result\" : \"0\"}";
                }
                 
            }
            catch (SqlException e)
            {

                return "{\" ERROR\" : \"" + e.Message.ToString() + "\"}";
            }
        }

        [WebMethod]
        public static string CheckMail(string mail_)
        {
            try
            {
                int CountOfMail = (int)Mydb.ExecuteScalar("select count(*) from ACCOUNT WHERE E_MAIL=@m", new SqlParameter[] {new SqlParameter("@m",mail_) }, CommandType.Text);
                if (CountOfMail>0)
                {
                    return "{\"result\" : \"1\"}";
                }
               else// if (CountOfMail==0)
                {
                    return "{\"result\" : \"2\"}";
                }
            }
            catch (Exception e)
            {

                return "{\" ERROR\" : \"" + e.Message.ToString() + "\"}";
            }
        }



      

        [WebMethod]
        public  static string ControlAndSave(string mail, int TipOrg, string Pass)
        {
            try
            {
                int countOfmail = (int)Mydb.ExecuteScalar("select COUNT(*) from ACCOUNT where E_MAIL =@mail", new SqlParameter[] { new SqlParameter("@mail", mail) }, CommandType.Text);
                if (countOfmail==0)
                {
                    Mydb.ExecuteNoNQuery("insert into CLIENT (ATTRIBUTE_ID,VERIFICATION_) values(@ID,@verf)", new SqlParameter[] { new SqlParameter("@ID", TipOrg),new SqlParameter("@verf",false) }, CommandType.Text);
                    int LastClientId =(int) Mydb.ExecuteScalar("SELECT TOP 1 CLIENT_ID FROM CLIENT ORDER BY CLIENT_ID DESC", new SqlParameter[] { }, CommandType.Text);
                    Mydb.ExecuteNoNQuery("insert into ACCOUNT(E_MAIL,PASSWORD,CLIENT_ID) values(@mail,@pass,@Cl_ID)", new SqlParameter[] { new SqlParameter("@mail", mail), new SqlParameter("@pass", GetMd5HashData(Pass)), new SqlParameter("@Cl_ID", LastClientId) }, CommandType.Text);
                    string guid =  Mydb.ExecuteScalar("select GUID from CLIENT where CLIENT_ID=(select CLIENT_ID from ACCOUNT where E_MAIL=@EmailC)", new SqlParameter[] { new SqlParameter("@EmailC", mail) }, CommandType.Text).ToString();
                    string CLient = Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where E_MAIL=@mailC", new SqlParameter[] { new SqlParameter("@mailC", mail) }, CommandType.Text).ToString();
                    string LogId = Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where E_MAIL=@mailC", new SqlParameter[] { new SqlParameter("@mailC",mail) }, CommandType.Text).ToString();
                    //string RolName = "Нечего";
                    //string ModulName = "Нечего";
                    //if (role == "4")
                    //{
                    //    ModulName = "Клиентское администрирование";
                    //    RolName = "Администратор";
                    //}
                    //if (role == "3")
                    //{
                    //    ModulName = "Диспетчерская";
                    //    RolName = "Диспетчер";
                    //}
                    Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Регистрация"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE","Администратор"),
                                    new SqlParameter("@EVENT_MODULE","Клиентское администрирование"),
                                    new SqlParameter("@EVENT_MESSAGE","Зарегистрирован новый пользователь (email: "+mail+")"),
                                    new SqlParameter("@EVENT_MAKER",LogId)}, CommandType.StoredProcedure);
                    return "{\"result\" : \"2\",\"guid\" : \""+guid+"\",\"Id\" : \""+CLient+"\",\"logId\":\""+LogId+"\"}";
                }
                else
                {
                    return "{\"result\" : \"1\"}";
                }
            }
            catch (Exception e)
            {

                return "{\" ERROR\" : \"" + e.Message.ToString() + "\"}";
            }

        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }

        //public static string getPassword(string mail)
        //{
        //    try
        //    {
        //        string pass = (string)Mydb.ExecuteScalar("select PASSWORD from ACCOUNT where E_MAIL=@mail", new SqlParameter[] { new SqlParameter("@mail", mail) }, CommandType.Text);
        //        return "{\" ERROR\" : \"" + pass + "\"}";

        //    }
        //    catch (Exception e)
        //    {

        //        return "{\" ERROR\" : \"" + e.Message.ToString() + "\"}";
        //    }
        //}

        //public static string saveRegister(string mail, int tipOrg, string pass)
        //{
        //    try
        //    {

        //    }
        //    catch (Exception e)
        //    {

        //        return "{\" ERROR\" : \"" + e.Message.ToString() + "\"}";
        //    }

        //}
    }
}