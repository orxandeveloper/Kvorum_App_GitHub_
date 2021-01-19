using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Super_Disp
{
    public partial class CreateSupRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string getExistIndividualsAndScores(int obj, string rmNum)
        {
            return Mydb.ExecuteAsJson("getExistIndividualsAndScores", new SqlParameter[] { new SqlParameter("@obj",obj),new SqlParameter("@rmNum",rmNum) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetSuppliersByObjectId(int obj)
        {

            return Mydb.ExecuteAsJson("GetSuppliersByObjectId", new SqlParameter[] { new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string getSuppsDatas(int obj, int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetSuppGuid_andProjectGuid", new SqlParameter[] { new SqlParameter("@obj", obj), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetServicesForSupplierSelected(int obj, string supp_guid, string service_guid)
        {
       
            string project_guid = Mydb.ExecuteScalar("[GetProjectGuidBySuppGud_LK]", new SqlParameter[] { new SqlParameter("@guid", supp_guid) }, CommandType.StoredProcedure).ToString();

 
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project", project_guid), new SqlParameter("@supplier", supp_guid), new SqlParameter("@service_guid", service_guid) }, CommandType.StoredProcedure);


        }
        [WebMethod]
        public static string GetServicesForSupplier(int obj, string supp_guid,string project_guid, string service_guid)
        {
            //string SUPPS = Mydb.ExecuteReadertoDataTableAsJson("GetSuppGuid_andProjectGuid", new SqlParameter[] { new SqlParameter("@obj", obj), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);


            //dynamic SUPPS_ = JsonConvert.DeserializeObject(SUPPS);

            ////List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            //string supp_guid = Convert.ToString(SUPPS_[0].SUPP_GUID);
            //string project_guid = Convert.ToString(SUPPS_[0].PROJECT_GUID);
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project", project_guid), new SqlParameter("@supplier", supp_guid), new SqlParameter("@service_guid", service_guid) }, CommandType.StoredProcedure);


        }

        [WebMethod]
        public static string GetSuppDispByObjectid(int obj,string supGuid)
        {

            return Mydb.ExecuteAsJson("GetSuppDispByObjectid", new SqlParameter[] { new SqlParameter("@obj", obj),new SqlParameter("@supGuid",supGuid) }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string getObjectByProjectId(int prj)
        {

            return Mydb.ExecuteAsJson("getObjectByProjectId", new SqlParameter[] { new SqlParameter("@prj", prj) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetProjects()

        {
            return Mydb.ExecuteAsJson("GetProjects", new SqlParameter[] { }, CommandType.StoredProcedure);
        }
    }
}