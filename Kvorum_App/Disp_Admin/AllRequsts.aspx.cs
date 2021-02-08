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
    public partial class AllRequsts : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            #region NewStructure
            string adressUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + ":"+ HttpContext.Current.Request.Url.Port+"/Super_Disp/DispRequests.aspx";

            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
            #endregion

        }
        [WebMethod]
        public static string AllSearch1(int dd, string txt, int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_AllSearchRequest", new SqlParameter[] { new SqlParameter("@dd", dd), new SqlParameter("@Stext", txt) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();
            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                r.CR_DATE = item["CR_DATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID = Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ATRIBUTE = (item["LOG_IN_ID"] != lg.ToString()|| item["LOG_IN_ID"]==null) ? "NotC"  : "Curr";
                //r.DELIVERY_TYPE_ID = 1;
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                r.COMMENT_FILE = item["PAYMENT"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string AllSearch2(int dd, string txt, int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_AllSearchRequest2", new SqlParameter[] {new SqlParameter("@dd",dd),new SqlParameter("@Stext",txt) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CR_DATE"].ToString();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ATRIBUTE = (Convert.ToInt32(item["LOG_IN_ID"]) == lg) ? "Curr" : "NotC";
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                r.COMMENT_FILE = item["PAYMENT"].ToString();

                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }

        [WebMethod]
        public static string getAllCounts(int dd)
        {
            int CVrabot = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID=@dd and STATUS_ID=1", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            //CVrabot= CVrabot+ (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_2 where DISP_ID=@dd and STATUS_ID=1", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            int CVipol = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID=@dd and STATUS_ID=3", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);
            //CVipol= CVipol+ (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_2 where DISP_ID=@dd and STATUS_ID=3", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);
            
            int COtmen = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID=@dd and STATUS_ID=4", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            //COtmen= COtmen+ (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_2 where DISP_ID=@dd and STATUS_ID=4", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);


            int CZakrit = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID=@dd and STATUS_ID=5", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            int COtprav = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID2=@dd and STATUS_ID=2", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            //CZakrit= CZakrit+ (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_2 where DISP_ID=@dd and STATUS_ID=5", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);


            int Count = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_1_2 where DISP_ID=@dd", new SqlParameter[] { new SqlParameter("@dd",dd) }, CommandType.Text);
            //Count= Count+ (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ALL_REQUESTS_2 where DISP_ID=@dd", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);

            return "{\"CVrabot\" : \"" + CVrabot.ToString() + "\",\"CVipol\" :\"" + CVipol.ToString() + "\",\"COtmen\" :\"" + COtmen.ToString() + "\",\"CZakrit\" :\"" + CZakrit.ToString() + "\",\"Alloff\" :\"" + Count.ToString() + "\",\"Otpravv\" :\"" + COtprav.ToString() + "\"}";

        }

        [WebMethod]
        public static string AFiltering(int lg, int dd, List<Kvorum_App.Disp_Admin.Utilities.Filter> flt)
        {
            string MOBILE_NUMBER = "";
            string ROOM_NUMBER = "";
            string OBJECT_ID = "";
            string ROOM_TYPE_ID = "";
            string FIRST_NAME = "";
            string STATUS_ID = "";
            string CR_DATE_from = "";
            string CR_DATEE_TO = "";
            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                MOBILE_NUMBER = (item.MOBILE_NUMBER.Length != 0 ) ? item.MOBILE_NUMBER.ToString() : null;
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ? item.ROOM_NUMBER.ToString() : null;
                OBJECT_ID = (item.OBJECT_ID!= 0) ? item.OBJECT_ID.ToString() : null;
                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? item.ROOM_TYPE_ID.ToString() : null;
                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME : null;
                // FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'"):"";
                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : null;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM : null;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'"):"";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : null;

                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'"):"";
            }
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_AllFilterin", new SqlParameter[] {
                new SqlParameter("@rid",MOBILE_NUMBER),
            new SqlParameter("@room",ROOM_NUMBER),
            new SqlParameter("@objectId",OBJECT_ID),
            new SqlParameter("@roomtype",ROOM_TYPE_ID),
            new SqlParameter("@firstname",FIRST_NAME),
            new SqlParameter("@status",STATUS_ID),
            new SqlParameter("@cr_S",CR_DATE_from),
            new SqlParameter("@cr_E",CR_DATEE_TO),
            new SqlParameter("@dd",dd)}, CommandType.StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();
            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();

                r.CR_DATE = item["CR_DATE"].ToString();
                r.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID = Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ATRIBUTE = (item["LOG_IN_ID"].ToString() != lg.ToString() || item["LOG_IN_ID"].ToString() == null) ? "NotC" : "Curr";
                r.DELIVERY_TYPE_ID = 1;
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                r.COMMENT_FILE = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (item["EMERGENCY_TREATMENT"].ToString().Length == 0) ? false : (bool)item["EMERGENCY_TREATMENT"];
                r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);

        }

        [WebMethod]
        public static string AFiltering2(int lg ,int dd, List<Kvorum_App.Disp_Admin.Utilities.Filter> flt)
        {
            string REQUEST_ID = "";
            string ROOM_NUMBER = "";
            string OBJECT_ID = "";
             string ROOM_TYPE_ID = "";
            string FIRST_NAME = "";
            string STATUS_ID = "";
            string CR_DATE_from = "";
            string CR_DATEE_TO = "";
            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                REQUEST_ID = (item.REQUEST_ID != 0) ? item.REQUEST_ID.ToString() : null;
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ? item.ROOM_NUMBER.ToString() : null;
                //ROOM_NUMBER = (ROOM_NUMBER != "") ? ROOM_NUMBER.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";
                //ROOM_NUMBER = (item.ROOM_NUMBER != 0) ? "REQUEST_COMMENT like \'%\"room\":\"" + item.ROOM_NUMBER.ToString() + "\"%\'" : "";  


                OBJECT_ID = (item.OBJECT_ID != 0) ? item.OBJECT_ID.ToString() : null;
                //OBJECT_ID = (OBJECT_ID != "") ? OBJECT_ID.Replace("q", "'").Replace("z", "\"").Replace("w", ":") : "";

                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? item.ROOM_TYPE_ID.ToString() : null;
                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME : null;
                //FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";

                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : null;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM : null;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'") : "";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : null;
                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'") : "";
            }
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_AllFilterin2", new SqlParameter[] {
                new SqlParameter("@rid",REQUEST_ID),
                new SqlParameter("@dd",dd),
                new SqlParameter("@Cr_S",CR_DATE_from),
                new SqlParameter("@Cr_E",CR_DATEE_TO),
                new SqlParameter("@R_ObjId",OBJECT_ID),
                new SqlParameter("@R_Room",ROOM_NUMBER),
                new SqlParameter("@R_indName",FIRST_NAME),
                new SqlParameter("@StatusId",STATUS_ID),
                new SqlParameter("@rt",ROOM_TYPE_ID)
            }, CommandType.StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CR_DATE"].ToString();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ATRIBUTE = (Convert.ToInt32(item["LOG_IN_ID"]) == lg) ? "Curr" : "NotC";
                r.COMMENT_FILE = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string GetAllRequest(int Lg,int dd)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_ALL_REQUESTS_2 where DISP_ID=@dd", new SqlParameter[] { new SqlParameter("@dd", dd) }, CommandType.Text);
            List<Request> rs = new List<Utilities.Request>();

            //foreach (DataRow item in dt.Rows)
            //{
            //    Request r = new Utilities.Request();
            //    r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
            //    r.CR_DATE = item["CR_DATE"].ToString();
            //    r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
            //    r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
            //    r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
            //    r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
            //    r.STATUS = item["STATUS"].ToString();
            //    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
            //    r.STATUS_ID = item["STATUS_ID"].ToString();
            //    r.ATRIBUTE=(Convert.ToInt32(item["LOG_IN_ID"]) == Lg) ? "Curr" : "NotC";
            //    r.DELIVERY_TYPE_ID = 2;
            //    r.COMMENT_FILE = item["PAYMENT"].ToString();
            //    r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
            //    rs.Add(r);
            //}select * from VW_ALL_REQUESTS where DISP_ID2=@ddSELECT * FROM VW_ALL_REQUESTS_1_2 WHERE DISP_ID2=@dd or DISP_ID=@dd2 order by CR_DATE desc
            DataTable dt2 = Mydb.ExecuteReadertoDataTable("GetAllRequests", new SqlParameter[] { new SqlParameter("@dd", dd),new SqlParameter("@dd2",dd) }, CommandType.StoredProcedure); 

            foreach (DataRow item in dt2.Rows)
            {
                Request r = new Utilities.Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();

                r.CR_DATE = item["CR_DATE"].ToString();
                r.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"])==DBNull.Value?-1:Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ATRIBUTE = (item["SPECIALIS_ID"].ToString() != Lg.ToString() || item["LOG_IN_ID"].ToString()==null) ? "NotC" : "Curr";
                r.DELIVERY_TYPE_ID = 1;
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                r.COMMENT_FILE = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (item["ORDER"].ToString() == "1") ? true : false;//(item["EMERGENCY_TREATMENT"].ToString().Length==0)?false: (bool)item["EMERGENCY_TREATMENT"];
                r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);
        }
        [WebMethod]
        public static string GetDispName(int LgId)
        {
            string DspName = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.Text).ToString();
            string dspPhone = Mydb.ExecuteScalar("select DISP_PHONE_NUMBER from DISP where DISP_ID in (select DISP_ID from DISP_ACC where LOG_IN_ID = @lg)", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.Text).ToString();
            string dspPhoneUrl = Mydb.ExecuteScalar("select PHONE_URL from DISP_PHONES where PHONE=@Ph", new SqlParameter[] { new SqlParameter("@Ph", dspPhone) }, CommandType.Text).ToString();
            string dispPPass = Mydb.ExecuteScalar("  select [PHONE_PWD] from DISP_PHONES where PHONE=@Ph", new SqlParameter[] { new SqlParameter("@Ph",dspPhone) }, CommandType.Text).ToString();
            //
            string dspetName = Mydb.ExecuteScalar("select DISP_NAME from DISP where DISP_ID in (select DISP_ID from DISP_ACC where LOG_IN_ID = @lg)", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.Text).ToString();
            string ddspId = Mydb.ExecuteScalar("select DISP_ID from DISP_ACC where LOG_IN_ID = @lg", new SqlParameter[] { new SqlParameter("@lg",LgId) }, CommandType.Text).ToString() ;
            return "{\"dspName\" : \"" + DspName + "\",\"Phone\":\""+ dspPhone + "\",\"DName\":\"" + dspetName + "\",\"DDId\":\"" + ddspId + "\",\"PhUrl\":\""+ dspPhoneUrl + "\",\"PhPwd\":\"" + dispPPass + "\"}";
        }
        //[WebMethod]
        //public static string GetAllRequests(int Logid)
        //{
        //    int Clid = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@L", new SqlParameter[] {new SqlParameter("@L",Logid) }, CommandType.Text);

        //    DataTable dt = Mydb.ExecuteReadertoDataTable("GetAllRequestForClient", new SqlParameter[] { new SqlParameter("@C", Clid) }, CommandType.StoredProcedure);
        //    List<Request> rs = new List<Utilities.Request>();

        //    foreach (DataRow item in dt.Rows)
        //    {
        //        Request r = new Utilities.Request();
        //        r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();//
        //        //r.ADRESS = item["ADRESS"].ToString();
        //       // r.ATRIBUTE = item["ATRIBUTE"].ToString();
        //        r.CR_DATE = item["CR_DATE"].ToString();//
        //        r.FIRST_NAME = item["FIRST_NAME"].ToString();//
        //        r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);//
        //        r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();//
        //        // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
        //        r.STATUS_ID = item["STATUS_ID"].ToString();//
        //        r.STATUS = item["STATUS"].ToString();//
        //        r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();//
        //        r.INDIVIDUAL_ID = Convert.ToInt32(item["INDIVIDUAL_ID"]);//

        //        rs.Add(r);
        //    }
        //    JavaScriptSerializer js = new JavaScriptSerializer();
        //    return js.Serialize(rs);

        //}
    }
}