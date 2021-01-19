using Kvorum_App.Disp_Admin.Utilities;
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

namespace Kvorum_App.Disp_Admin
{
    public partial class SRequests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetDispName(int LgId)
        {
            return Mydb.ExecuteAsJson("Get_supp_disp_Name", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string Filterin(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log)
        {
            string returnval = "";

            /*string r ="REQUEST_ID=5";
            Console.WriteLine(r);
              int index = r.IndexOf('.');
            r=r.Substring(r.LastIndexOf('=')+1);
            Console.WriteLine(r);*/
            string REQUEST_ID = "";
            string ROOM_NUMBER = "";
            string OBJECT_ID = "";

            string FIRST_NAME = "";
            string STATUS_ID = "";
            string CR_DATE_from = "";
            string CR_DATEE_TO = "";

            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                REQUEST_ID = (item.REQUEST_ID != 0) ? item.REQUEST_ID.ToString() : null;
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ? item.ROOM_NUMBER.ToString() : null;
                OBJECT_ID = (item.OBJECT_ID != 0) ? item.OBJECT_ID.ToString() : null;

                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME : null;
                // FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'"):"";
                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : null;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM : null;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'"):"";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : null;

                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'"):"";
            }


            //string query = "select * from VW_Request_Datas where LOG_IN_ID=" + Log+" " +( (REQUEST_ID != "") ? " and " + REQUEST_ID : " ") + " "  +((STATUS_ID != "") ? " and " + STATUS_ID : " ") + " " + ((CR_DATE_from != "") ? " and " + CR_DATE_from : " ") + " " + ((CR_DATEE_TO != "") ? " and " + CR_DATEE_TO : " ") + " " + ((ROOM_NUMBER != "") ? " and " + ROOM_NUMBER : " ") + " " + ((OBJECT_ID != "") ? " and " + OBJECT_ID : " ") + " " + ((ROOM_TYPE_ID != "") ? " and " + ROOM_TYPE_ID : " ") + " " + ((FIRST_NAME != "") ? " and " + FIRST_NAME : " ");


            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("[uspo_Filtering_SUPPLIER]", new SqlParameter[] {
                new SqlParameter("@rid",REQUEST_ID),
            new SqlParameter("@room",ROOM_NUMBER),
            new SqlParameter("@objectId",OBJECT_ID),

            new SqlParameter("@firstname",FIRST_NAME),
            new SqlParameter("@status",STATUS_ID),
            new SqlParameter("@cr_S",CR_DATE_from),
            new SqlParameter("@cr_E",CR_DATEE_TO),
            new SqlParameter("@lg",Log)}, CommandType.StoredProcedure);

            List<Request> rs = new List<Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();


                r.CR_DATE = item["CR_DATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID = Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.REQUEST_COMMENT = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            returnval = js.Serialize(rs);
            return returnval;
        }
        [WebMethod]
        public static string GetSuppNamebyLogin(int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetSuppNamebyLogin", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetRequestTable(int lg)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("GetSuppLierRequests", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);

            List<Request> rs = new List<Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Request();
                r.ACCOUNT_NAME = item["SUPPLIER"].ToString();

                //  r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CRDATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["ID"]);
                r.REQUEST_TEXT = item["COMMENT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS_ID"].ToString();
                r.PLAN_END_DATE = item["WORKDATE"].ToString();
                r.ATRIBUTE = item["GUID"].ToString();
                r.FIRST_NAME = item["CLIENT"].ToString();
                r.STATUS_ID = item["STATUS_NAME"].ToString();
                r.REQUEST_COMMENT = item["PAYED"].ToString();
                // r.EMERGENCY_TREATMENT = (item["ORDER"].ToString() == "1") ? true : false; //(bool)item["EMERGENCY_TREATMENT"];
                r.ADRESS = item["OBJECT"].ToString();
                r.TOTAL_COST = item["PAYED"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }

        [WebMethod]
        public static string Super_Supplier_Requests()
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("Super_Supplier_Requests", new SqlParameter[] { }, CommandType.StoredProcedure);

            List<Request> rs = new List<Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Request();
                r.ACCOUNT_NAME = item["SUPPLIER"].ToString();

                //  r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CRDATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["ID"]);
                r.REQUEST_TEXT = item["COMMENT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["WORKDATE"].ToString();
                r.ATRIBUTE = item["GUID"].ToString();
                r.FIRST_NAME = item["CLIENT"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.REQUEST_COMMENT = item["PAYED"].ToString();
                // r.EMERGENCY_TREATMENT = (item["ORDER"].ToString() == "1") ? true : false; //(bool)item["EMERGENCY_TREATMENT"];
                r.ADRESS = item["OBJECT"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
    }
}