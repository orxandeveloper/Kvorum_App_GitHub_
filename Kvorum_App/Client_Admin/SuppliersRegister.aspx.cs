using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class SuppliersRegister : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetSuppliers(int Cid)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetSuppliers", new SqlParameter[] { new SqlParameter("@Cid",Cid) }, CommandType.StoredProcedure);
        }
    }
}