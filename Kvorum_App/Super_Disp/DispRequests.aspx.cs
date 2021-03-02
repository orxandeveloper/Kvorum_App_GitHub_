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

namespace Kvorum_App.Super_Disp
{
    public partial class DispRequests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetDatasForRaport(int type,string Stext)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetDatasForRaport", new SqlParameter[] {new SqlParameter("@type", type),new SqlParameter("Stext", Stext) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetDispsRequests(int lg,int role,int all)
        {

            // 

            //DataTable dt = Mydb.ExecuteReadertoDataTable("GetRequests_by_Role", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role), new SqlParameter("@all", all) }, CommandType.StoredProcedure);
            //List<Kvorum_App.Super_Disp.Helpers.Request> reqs = new List<Helpers.Request>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    Helpers.Request req = new Helpers.Request();
            //    req.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
            //    req.FIRST_NAME = item["FIRST_NAME"].ToString();
            //    req.OBJECT_ADRESS = item["OBJECT_ADRESS"].ToString();
            //    req.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //    req.CR_DATE = item["CR_DATE"].ToString();
            //    req.CR_DATE = req.CR_DATE.Substring(0, 10);
            //    req.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
            //    req.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
            //    req.REQUEST_TYPE = item["REQUEST_TYPE"].ToString();
            //    req.STATUS = item["STATUS"].ToString();
            //    req.RESPONSIBLE_NAME = item["RESPONSIBLE_NAME"].ToString();
            //    req.PAYMENT = item["PAYMENT"].ToString();
            //    req.RREQUEST_ID = item["REQUEST_ID"].ToString();
            //    req.STATUS_ID = item["STATUS_ID"].ToString();
            //    reqs.Add(req);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer(); js.Serialize(reqs);

            return  Mydb.ExecuteAsJson("GetRequests_by_Role", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role), new SqlParameter("@all", all) }, CommandType.StoredProcedure);//GetDispsRequests;//
        }

        [WebMethod]
        public static string getObjectDisp(int lg,int role)
        {

            return Mydb.ExecuteAsJson("GetObjectsByRole", new SqlParameter[] { new SqlParameter("@lg",lg),new SqlParameter("@role",role) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string Filtering(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log, int role,int all)
        {
            string returnval = "";

            /*string r ="REQUEST_ID=5";
            Console.WriteLine(r);
              int index = r.IndexOf('.');
            r=r.Substring(r.LastIndexOf('=')+1);
            Console.WriteLine(r);*/
            object MOBILE_NUMBER = "";
            object ROOM_NUMBER = "";
            object OBJECT_ID = "";
            object ROOM_TYPE_ID = "";
            object FIRST_NAME = "";
            object STATUS_ID = "";
            object CR_DATE_from = "";
            object CR_DATEE_TO = "";

            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                MOBILE_NUMBER = (item.MOBILE_NUMBER.Length != 0) ? item.MOBILE_NUMBER.ToString() :(object) DBNull.Value;
                ROOM_NUMBER = (item.ROOM_NUMBER.Length !=0 ) ? item.ROOM_NUMBER.ToString() : (object) DBNull.Value;
                OBJECT_ID = (item.OBJECT_ID != 0) ? item.OBJECT_ID.ToString() : (object) DBNull.Value;
                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? item.ROOM_TYPE_ID.ToString() : (object) DBNull.Value;
                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME : (object) DBNull.Value;
                // FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'"):"";
                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : (object) DBNull.Value;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM : (object) DBNull.Value;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'"):"";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : (object) DBNull.Value;

                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'"):"";
            }

            return Mydb.ExecuteAsJson("uspo_Filtering", new SqlParameter[] {
                new SqlParameter("@rid",MOBILE_NUMBER),
            new SqlParameter("@room",ROOM_NUMBER),
            new SqlParameter("@objectId",OBJECT_ID),
            new SqlParameter("@roomtype",ROOM_TYPE_ID),
            new SqlParameter("@firstname",FIRST_NAME),
            new SqlParameter("@status",STATUS_ID),
            new SqlParameter("@cr_S",CR_DATE_from),
            new SqlParameter("@cr_E",CR_DATEE_TO),
            new SqlParameter("@lg",Log),
            new SqlParameter("@role",role),new SqlParameter("@all",all)}, CommandType.StoredProcedure);
        }

        }
}