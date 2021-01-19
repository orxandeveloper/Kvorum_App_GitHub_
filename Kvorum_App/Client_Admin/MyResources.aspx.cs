using Kvorum_App.Client_Admin.Utilities;
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
    public partial class MyResources : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetResource(int Cl_Id)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select cr.PAST_QUANTITY,cr.CR_ID,cr.RESOURSE_ID, rs.RESOURSE_NAME from RESOURSE_NAME rs,CLIENT_RESOURSES cr where cr.RESOURSE_ID=(select RESOURSE_ID from CLIENT_RESOURSES where CLIENT_ID=@c)", new SqlParameter[] { new SqlParameter("@c", Cl_Id) }, CommandType.Text);
            List<Resources_> rss = new List<Resources_>();

            foreach (DataRow item in dt.Rows)
            {
                Resources_ rs = new Resources_();
                rs.CR_ID = Convert.ToInt32(item["CR_ID"]);
                rs.PAST_QUANTITY = Convert.ToInt32(item["PAST_QUANTITY"]);
                rs.RESOURSE_ID = Convert.ToInt32(item["RESOURSE_ID"]);
                rs.RESOURSE_NAME = item["RESOURSE_NAME"].ToString();
                rss.Add(rs);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rss);
        }
    }
}