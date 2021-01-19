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
    public partial class Disp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetDisps(int C)
        {
            int CNTDisp = (int)Mydb.ExecuteScalar("select COUNT(*) from DISP where CLIENT_ID=@C", new SqlParameter[] { new SqlParameter("@C",C) }, CommandType.Text);
            if (CNTDisp!=0)
            {
                DataTable dt = Mydb.ExecuteReadertoDataTable("select d.DISP_ID,d.DISP_STATUS,d.DISP_NAME,dc.DISP_ICON_IMG from DISP d,DISP_ICON dc where d.DISP_ICON_ID=dc.DISP_ICON_ID and d.CLIENT_ID=@C order by d.DISP_ID desc", new SqlParameter[] { new SqlParameter("@C",C)}, CommandType.Text);
                List<Dispatcheer> disps = new List<Dispatcheer>();
                foreach (DataRow item in dt.Rows)
                {
                    Dispatcheer d = new Dispatcheer();
                    d.DISP_ICON_IMG = item["DISP_ICON_IMG"].ToString();
                    d.DISP_ID = Convert.ToInt32(item["DISP_ID"]);
                    d.DISP_NAME = item["DISP_NAME"].ToString();
                    d.DISP_STATUS = Convert.ToBoolean(item["DISP_STATUS"]);
                    disps.Add(d);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(disps);
            }
            else
            {
               return "{\"result\" : \"2\"}";
            }
        }
        [WebMethod]
        public static string Activation(int D)
        {
            Mydb.ExecuteNoNQuery("UPDATE DISP SET DISP_STATUS = '1' WHERE DISP_ID=@D", new SqlParameter[] {new SqlParameter("@D",D) }, CommandType.Text);
            return "";
        }
    }
}