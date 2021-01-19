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
    public partial class RequestCreate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetObjectsBySupplierGuid_LK(string guid)
        {

            return Mydb.ExecuteAsJson("GetObjectsBySupplierGuid_LK", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetServicesForSupplier_LK(string guid, string service_guid)
        {
            string project_guid = Mydb.ExecuteScalar("GetProjectGuidBySuppGud_LK", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure).ToString();
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project", project_guid), new SqlParameter("@supplier", guid), new SqlParameter("@service_guid", service_guid) }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string GetServicesForSupplierSelected_LK(string guid, string service_guid)
        {
            string project_guid = Mydb.ExecuteScalar("GetProjectGuidBySuppGud_LK", new SqlParameter[] { new SqlParameter("@guid", guid) }, CommandType.StoredProcedure).ToString();
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project", project_guid), new SqlParameter("@supplier", guid), new SqlParameter("@service_guid", service_guid) }, CommandType.StoredProcedure);

        }
    }
}