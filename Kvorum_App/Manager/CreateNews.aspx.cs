using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class CreateNews : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string getProjectNamebyLogin(int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("getProjectNamebyLogin",new SqlParameter[] { new SqlParameter("@lg",lg) },CommandType.StoredProcedure);
        }
        [WebMethod(EnableSession = true)]
        public static string SaveNews()
        {
            string newsText= HttpContext.Current.Request.Params["txtNews"];

            return "";
        }
    }
}