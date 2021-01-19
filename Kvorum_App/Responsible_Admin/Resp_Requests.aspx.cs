using Kvorum_App.Responsible_Admin.Resp_Helpers;
using Resp_Heplers;
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

namespace Kvorum_App.Responsible_Admin
{
    public partial class Resp_Requests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            string adressUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/Super_Disp/DispRequests.aspx";

            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
        }

        [WebMethod]
        public static string getRespName(int LgId)
        {
            string RespName = Mydb.ExecuteScalar("getRespName", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.StoredProcedure).ToString();
        
            return "{\"RespName\" : \"" + RespName + "\"}";
        }
        [WebMethod]
        public static string getStatuses()
        {
           DataTable dt = Mydb.ExecuteReadertoDataTable("getStatuses", new SqlParameter[] { }, CommandType.StoredProcedure);
            List<REQUEST_STATUS> rss = new List<REQUEST_STATUS>();
            foreach (DataRow item in dt.Rows)
            {
                REQUEST_STATUS rs = new REQUEST_STATUS();
                rs.STATUS = item["STATUS"].ToString();
                rs.STATUS_ID = item["STATUS_ID"].ToString();
                rss.Add(rs);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rss);
        }
        [WebMethod]
        public static string GetRequestTableForResponsibles(int LogId)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("GetRequestTableForResponsibles", new SqlParameter[] { new SqlParameter("@L", LogId) }, CommandType.StoredProcedure);

            List<Resp_Request> rs = new List<Resp_Request>();

            foreach (DataRow item in dt.Rows)
            {
                Resp_Request r = new Resp_Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();

                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CR_DATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"] == DBNull.Value) ? -1 : Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.REQUEST_COMMENT = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (item["ORDER"].ToString() == "1") ? true : false; //(bool)item["EMERGENCY_TREATMENT"];
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string getRoomTypes()
        {
            return Mydb.ExecuteAsJson("getRoomTypes", new SqlParameter[] { }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string CheckCountOfRequestForResponsible(int Log)
        {

            int CountDisp = (int)Mydb.ExecuteScalar("CheckCountOfRequestForResponsible", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.StoredProcedure);
            if (CountDisp == 0)
            {

                return "{\"CountRequest\" : \"0\"}";
            }
            else
            {
                return "{\"CountRequest\" : \"1\"}";
            }


        }

    }
}