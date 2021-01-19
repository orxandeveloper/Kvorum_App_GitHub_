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
    public partial class NewsRegister : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetNews(string guid, string lg)
        {// 
           string result= Mydb.ExecuteReadertoDataTableAsJson("GetNews", new SqlParameter[] { new SqlParameter("@guid", guid), new SqlParameter("@lg",lg) }, CommandType.StoredProcedure);
            return result;
        }
    }
}