using Kvorum_App.Business_Admin.Business_Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class RegisterUO : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetUOList(int client_id)
        {
           
            return Mydb.ExecuteAsJson("GetUOList", new SqlParameter[] { new SqlParameter("@C", client_id) }, CommandType.StoredProcedure);
        }
    }
}