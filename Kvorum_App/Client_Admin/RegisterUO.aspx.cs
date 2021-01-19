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
            //DataTable dt = Mydb.ExecuteReadertoDataTable("sp_CounstructorAPI_GET_UO_by_CLIENT_ID", new SqlParameter[] { new SqlParameter("@CLIENT_ID", client_id) }, CommandType.StoredProcedure);
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from MAN_COMPANY where CLIENT_ID=@C", new SqlParameter[] { new SqlParameter("@C", client_id) }, CommandType.Text);
            List<ManCompany> mcs = new List<ManCompany>();
            foreach (DataRow item in dt.Rows)
            {
                ManCompany mc = new ManCompany();
                mc.MAN_COMPANY_ID = Convert.ToInt32(item["MAN_COMPANY_ID"]);
                mc.NAME = item["NAME"].ToString();
                mc.INN =item["INN"].ToString();
                mc.OGRN = item["OGRN_OGRNIP"].ToString();
                mc.KPP = item["KPP"].ToString();
                mc.OKPO = item["OKPO"].ToString();
                mc.ADRESS = item["ADRESS"].ToString();
                mcs.Add(mc);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(mcs);
        }
    }
}