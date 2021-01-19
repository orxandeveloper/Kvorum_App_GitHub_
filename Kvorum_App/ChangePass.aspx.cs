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
    public partial class ChangePass : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int Id = Convert.ToInt32(Request.QueryString["Id"]);
            string g_url = Request.QueryString["g"];
            if (g_url != null)
            {
                string g_client = Mydb.ExecuteScalar("select GUID from CLIENT where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text).ToString();
                if (g_client != g_url)
                {
                    Response.Redirect("Client_Admin/AlertingError.aspx?reason=g&chp=notC");
                }
                else
                {
                    //Mydb.ExecuteNoNQuery("update CLIENT set VERIFICATION_=1 where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text);
                }
            }
        }

        [WebMethod]
        public static string ChangePass_(int Id, string Pass)
        {
            Pass = GetMd5HashData(Pass);
            Mydb.ExecuteNoNQuery("update ACCOUNT set PASSWORD=@p where CLIENT_ID=@id and LOGIN is null", new SqlParameter[] {new SqlParameter("@p",Pass),new SqlParameter("@id",Id) }, CommandType.Text);
            int LogId = (int)Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@c", new SqlParameter[] { new SqlParameter("@c", Id) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("update CLIENT set  GUID=NEWID() where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id",Id) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("usp_ConstructorAPI_INSERT_LOG", new SqlParameter[] {
                                    new SqlParameter("@EVENT_TYPE","Восстановление пароля"),
                                    new SqlParameter("@EVENT_STATUS","Систем"),
                                    new SqlParameter("@EVENT_ROLE","Администратор"),
                                    new SqlParameter("@EVENT_MODULE","Клиентское администрирование"),
                                    new SqlParameter("@EVENT_MESSAGE","Пользователь  запросил ("+LogId+") Восстановление пароля"),
                                    new SqlParameter("@EVENT_MAKER",LogId)}, CommandType.StoredProcedure);
            return "{\"result\" : \"1\"}";

        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
    }
}