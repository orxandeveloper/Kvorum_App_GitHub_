using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class Client : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            CheckGuid();
             
        }
        void CheckGuid()
        {
            int Id = Convert.ToInt32(Request.QueryString["Id"]);
            string g_url = Request.QueryString["g"];
            if (g_url!=null)
            {
                string g_client = Mydb.ExecuteScalar("select GUID from CLIENT where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text).ToString();
                if (g_client != g_url)
                {
                    //Response.Redirect("Client_Admin/AlertingError.aspx?reason=g&chp=notC");
                    string redirc = "../Client_Admin/AlertingError.aspx?reason=g&chp=notC";
                    Response.Redirect(redirc);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("update CLIENT set VERIFICATION_=1,GUID=NEWID() where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text);
                    int Acc_Id = (int)Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text);
                    Mydb.ExecuteNoNQuery("insert into MODUL_ROLE (ROLE_ID,MODUL_ID)  values(4,3)", new SqlParameter[] { }, CommandType.Text);

                    int Last_Mr = (int)Mydb.ExecuteScalar("SELECT TOP 1 MR_ID FROM MODUL_ROLE ORDER BY MR_ID DESC", new SqlParameter[] { }, CommandType.Text);

                    Mydb.ExecuteNoNQuery("insert into ACCOUNT_ROLE (LOG_IN_ID, MR_ID) VALUES(@A,@mr)", new SqlParameter[] {new SqlParameter("@A",Acc_Id),new SqlParameter("@mr",Last_Mr) }, CommandType.Text);

                }
            }
        }
        //void CheckGuid()
        //{
        //    int Id = Convert.ToInt32(Request.QueryString["Id"]);
        //    string g_url = Request.QueryString["g"];

        //    string g_client = Mydb.ExecuteScalar("select GUID from CLIENT where CLIENT_ID=@Id", new SqlParameter[] { new SqlParameter("@Id", Id) }, CommandType.Text).ToString();
        //    if (g_client != g_url&&g_url!=null)
        //    {
        //        Response.Redirect("../");
        //    }
        //}
    }
}