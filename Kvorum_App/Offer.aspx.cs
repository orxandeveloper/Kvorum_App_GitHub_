using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App
{
    public partial class Offer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string getDocs(string guid)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("Get_Supplier_DOCS", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string Change_Supplier_Offer(string guid)
        {
            Mydb.ExecuteNoNQuery("Change_Supplier_Offer", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure);
            return "";
                
        }
    }
}