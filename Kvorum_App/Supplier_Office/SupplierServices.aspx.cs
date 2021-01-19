using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Supplier_Office
{
    public partial class SupplierServices : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetServicesBySuppGuid_LK(string guid)
        {
            return Mydb.ExecuteAsJson("GetServicesBySuppGuid_LK", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure);
        }

    }
}