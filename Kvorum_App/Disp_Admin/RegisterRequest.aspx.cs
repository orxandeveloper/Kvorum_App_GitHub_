using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Disp_Admin.Utilities;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;



namespace Kvorum_App.Disp_Admin
{
   

    public partial class RegisterRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            #region NewStructure
            string adressUrl = System.Configuration.ConfigurationManager.AppSettings["ExternalIp"]+ "Super_Disp/DispRequests.aspx"; //HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + ":"+ HttpContext.Current.Request.Url.Port+ "/Super_Disp/DispRequests.aspx";

            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
            #endregion
        }


        [WebMethod]
        public static string GetOtcetAll(int dd, string CrFrom, string CrTo)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("usp_DispReportRequestTypesCountAll", new SqlParameter[] { new SqlParameter("@did", dd), new SqlParameter("@from", CrFrom), new SqlParameter("@to", CrTo) }, CommandType.StoredProcedure);


            Random r = new Random();
            int rand = r.Next();
            string startupPath = @"C:\inetpub\wwwroot\"; //AppDomain.CurrentDomain.BaseDirectory;


            string filePath = startupPath + @"Disp_Admin\excelOt\" + rand.ToString() + ".csv";
            string virtPath = @"excelOt/" + rand.ToString() + ".csv";

            //workbook.SaveAs(filePath);
            string strbuld = GenerateCSV(dt);
            File.WriteAllText(filePath, strbuld, Encoding.UTF8);

            List<Request> rs = new List<Utilities.Request>();
            Request r_ = new Utilities.Request();
            r_.ACCOUNT_NAME = virtPath;
            rs.Add(r_);
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);// @"[{Path : "+filePath+"}]";
        }

        [WebMethod]
        public static string CheckkDisp(int Log)
        {

            int CountDisp = (int)Mydb.ExecuteScalar("select COUNT(*) from DISP_ACC where LOG_IN_ID=@lg", new SqlParameter[] {new SqlParameter("@lg",Log) }, CommandType.Text);
            if (CountDisp==0)
            {

                return "{\"HasDisp\" : \"0\"}";
            }
            else
            {
                return "{\"HasDisp\" : \"1\"}";
            }

            
        }

        [WebMethod]
        public static string GetOtcet(int log,string CrFrom,string CrTo)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("usp_DispReportRequestTypesCount", new SqlParameter[] { new SqlParameter("@lg", log), new SqlParameter("@from", CrFrom), new SqlParameter("@to", CrTo) }, CommandType.StoredProcedure);

            
            Random r = new Random();
            int rand = r.Next();
            string startupPath = @"C:\inetpub\wwwroot\"; //AppDomain.CurrentDomain.BaseDirectory;


            string filePath= startupPath+ @"Disp_Admin\excelOt\"+ rand.ToString() + ".csv";
            string virtPath = @"excelOt/" + rand.ToString() + ".csv";

            //workbook.SaveAs(filePath);
            string strbuld = GenerateCSV(dt);
            File.WriteAllText(filePath, strbuld,Encoding.UTF8);

            List<Request> rs = new List<Utilities.Request>();
            Request r_ = new Utilities.Request();
            r_.ACCOUNT_NAME = virtPath;
            rs.Add(r_);
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);// @"[{Path : "+filePath+"}]";
        }
        [WebMethod]
        public static string GetCounts(int lg)
        {
            int Count = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_Request_Datas_1_2 where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            int CVrabot= (int)Mydb.ExecuteScalar("select COUNT(*) from VW_Request_Datas_1_2 where LOG_IN_ID=@lg and STATUS_ID=1", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            double Vrabot_ = 0;
            if (Count!=0&&CVrabot!=0)
            {
                Vrabot_ =(double) (100 * CVrabot) / Count;
                Vrabot_ = System.Math.Round(Vrabot_, 2);
            }


            int CVipol = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_Request_Datas_1_2 where LOG_IN_ID=@lg and STATUS_ID=3", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

            double Vipol = 0;
            if (Count != 0&& CVipol!=0)
            {
                Vipol = (double)(100 * CVipol) / Count;
                Vipol = System.Math.Round(Vipol, 2);
            }
           

            int COtmen = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_Request_Datas_1_2 where LOG_IN_ID=@lg and STATUS_ID=4", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

            double Otmen = 0;
            if (COtmen!=0&& Count != 0)
            {
                Otmen = (double)(100 * COtmen) / Count;
                Otmen = System.Math.Round(Otmen, 2);
            }
                
              

            int CZakrit = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_Request_Datas_1_2 where LOG_IN_ID=@lg and STATUS_ID=5", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            double Zakrit = 0;
            if (CZakrit!=0&& Count!=0)
            {
                Zakrit = (double)(100 * CZakrit) / Count;
                Zakrit = System.Math.Round(Zakrit, 2);
            }
            

            return "{\"CVrabot\" : \"" + CVrabot.ToString() + "\",\"Vrabot\" :\""+ Vrabot_ .ToString()+ "\",\"CVipol\" :\""+ CVipol .ToString()+ "\",\"Vipol\":\""+ Vipol .ToString()+ "\",\"COtmen\" :\"" + COtmen.ToString() + "\",\"Otmen\" :\"" + Otmen.ToString() + "\",\"CZakrit\" :\"" + CZakrit.ToString() + "\",\"Zakrit\" :\"" + Zakrit.ToString() + "\",\"Alloff\" :\"" + Count.ToString() + "\"}"; 
        }

        [WebMethod]
        public static string SearchRequest1(int lg, string Stxt)
        {
           System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("SearchRequest1", new SqlParameter[] { new SqlParameter("@Stext",Stxt), new SqlParameter("@logId",lg) }, CommandType.StoredProcedure);

            List<Request> rs = new List<Utilities.Request>();

            if (dt.Rows.Count!=0)
            {
                foreach (DataRow item in dt.Rows)
                {
                    Request r = new Utilities.Request();
                    r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    r.ROOM_TYPE = item["ROOM_TYPE"].ToString();

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
                    rs.Add(r);
                }
            }
            else
            {
                System.Data.DataTable dt_1 = Mydb.ExecuteReadertoDataTable("SerachForPServices_1", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@Stext", Stxt) }, CommandType.StoredProcedure);
                foreach (DataRow item in dt_1.Rows)
                {
                    Request r = new Utilities.Request();
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
                    rs.Add(r);
                }
            }
            
            JavaScriptSerializer js = new JavaScriptSerializer();
           return js.Serialize(rs);
        }
        [WebMethod]
        public static string SearchRequest2(int lg, string Stxt)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("SearchRequest_2", new SqlParameter[] { new SqlParameter("@Stext", Stxt), new SqlParameter("@logId", lg) }, CommandType. StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();

            if (dt.Rows.Count!=0)
            {
                foreach (DataRow item in dt.Rows)
                {
                    Request r = new Utilities.Request();
                    r.CR_DATE = item["CR_DATE"].ToString();
                    r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                    r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                    r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                    r.REQUEST_COMMENT = item["PAYMENT"].ToString();
                    r.STATUS = item["STATUS"].ToString();
                    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                    r.STATUS_ID = item["STATUS_ID"].ToString();
                    r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                    rs.Add(r);
                }
            }
            else
            {
                System.Data.DataTable dt_1 = Mydb.ExecuteReadertoDataTable("SerachForPServices_2", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@Stext", Stxt) }, CommandType.StoredProcedure);
                foreach (DataRow item in dt_1.Rows)
                {
                    Request r = new Utilities.Request();
                    r.CR_DATE = item["CR_DATE"].ToString();

                    r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                    r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                    r.REQUEST_COMMENT = item["PAYMENT"].ToString();
                    r.STATUS = item["STATUS"].ToString();
                    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                    r.STATUS_ID = item["STATUS_ID"].ToString();
                    r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                    rs.Add(r);
                }

            }
         
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);

        }
        

        [WebMethod]
        public static string Filterin(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt,int Log)
        {
            string returnval = "";

            /*string r ="REQUEST_ID=5";
            Console.WriteLine(r);
              int index = r.IndexOf('.');
            r=r.Substring(r.LastIndexOf('=')+1);
            Console.WriteLine(r);*/
            string MOBILE_NUMBER = "";
            string ROOM_NUMBER = "";
            string OBJECT_ID = "";
            string ROOM_TYPE_ID = "";
            string FIRST_NAME="";
            string STATUS_ID = "";
            string CR_DATE_from = "";
            string CR_DATEE_TO = "";
            
            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                MOBILE_NUMBER = (item.MOBILE_NUMBER.Length != 0) ? item.MOBILE_NUMBER.ToString() : null;
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ?  item.ROOM_NUMBER.ToString()  :null;
                OBJECT_ID = (item.OBJECT_ID != 0) ?  item.OBJECT_ID.ToString()  : null;
                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ?  item.ROOM_TYPE_ID.ToString() : null;
                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME: null;
               // FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'"):"";
                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : null;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM: null;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'"):"";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ?  item.CR_DATE_TO: null;
               
                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'"):"";
            }
            

            //string query = "select * from VW_Request_Datas where LOG_IN_ID=" + Log+" " +( (REQUEST_ID != "") ? " and " + REQUEST_ID : " ") + " "  +((STATUS_ID != "") ? " and " + STATUS_ID : " ") + " " + ((CR_DATE_from != "") ? " and " + CR_DATE_from : " ") + " " + ((CR_DATEE_TO != "") ? " and " + CR_DATEE_TO : " ") + " " + ((ROOM_NUMBER != "") ? " and " + ROOM_NUMBER : " ") + " " + ((OBJECT_ID != "") ? " and " + OBJECT_ID : " ") + " " + ((ROOM_TYPE_ID != "") ? " and " + ROOM_TYPE_ID : " ") + " " + ((FIRST_NAME != "") ? " and " + FIRST_NAME : " ");


            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_Filtering", new SqlParameter[] {
                new SqlParameter("@rid",MOBILE_NUMBER),
            new SqlParameter("@room",ROOM_NUMBER),
            new SqlParameter("@objectId",OBJECT_ID),
            new SqlParameter("@roomtype",ROOM_TYPE_ID),
            new SqlParameter("@firstname",FIRST_NAME),
            new SqlParameter("@status",STATUS_ID),
            new SqlParameter("@cr_S",CR_DATE_from),
            new SqlParameter("@cr_E",CR_DATEE_TO),
            new SqlParameter("@lg",Log)}, CommandType.StoredProcedure);

            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();

                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
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
                r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            returnval = js.Serialize(rs);
            return returnval;
        }
        [WebMethod]
        public static string Filterin2(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log)
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
                REQUEST_ID = (item.REQUEST_ID != 0) ?  item.REQUEST_ID.ToString() : null;
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ?  item.ROOM_NUMBER.ToString()  : null;
                //ROOM_NUMBER = (ROOM_NUMBER != "") ? ROOM_NUMBER.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";
                //ROOM_NUMBER = (item.ROOM_NUMBER != 0) ? "REQUEST_COMMENT like \'%\"room\":\"" + item.ROOM_NUMBER.ToString() + "\"%\'" : "";  


                OBJECT_ID = (item.OBJECT_ID != 0) ? item.OBJECT_ID.ToString()  : null;
                //OBJECT_ID = (OBJECT_ID != "") ? OBJECT_ID.Replace("q", "'").Replace("z", "\"").Replace("w", ":") : "";

                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? item.ROOM_TYPE_ID.ToString() : null;
                FIRST_NAME = (item.FIRST_NAME != "") ?  item.FIRST_NAME : null;
                //FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";

                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : null;
                CR_DATE_from = (item.CR_DATE_FROM != "") ?item.CR_DATE_FROM: null;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'") : "";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : null;
                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'") : "";
            }
            //string query = "select * from VW_Request_Datas_2 where LOG_IN_ID=" + Log + " " + ((REQUEST_ID != "") ? " and " + REQUEST_ID : " ") + " " + ((STATUS_ID != "") ? " and " + STATUS_ID : " ") + " " + ((CR_DATE_from != "") ? " and " + CR_DATE_from : " ") + " " + ((CR_DATEE_TO != "") ? " and " + CR_DATEE_TO : " ") + " " + ((ROOM_NUMBER != "") ? " and " + ROOM_NUMBER : " ") + " " + ((OBJECT_ID != "") ? " and " + OBJECT_ID : " ") + " " +  ((FIRST_NAME != "") ? " and " + FIRST_NAME : " ");
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_Filtering2", new SqlParameter[] {
                new SqlParameter("@rid",REQUEST_ID),
                new SqlParameter("@lg",Log),
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
                r.CR_DATE = item["CR_DATE"].ToString();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ACCOUNT_NAME = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];

                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);


        }

        [WebMethod]
        public static string AFilterin(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log)
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
            string ROOM_TYPE_ID = "";
            string FIRST_NAME = "";
            string STATUS_ID = "";
            string CR_DATE_from = "";
            string CR_DATEE_TO = "";

            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                REQUEST_ID = (item.REQUEST_ID != 0) ? "REQUEST_ID=" + item.REQUEST_ID.ToString() : "";
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ? "ROOM_NUMBER =" + item.ROOM_NUMBER.ToString() + "" : "";
                OBJECT_ID = (item.OBJECT_ID != 0) ? "OBJECT_ID=" + item.OBJECT_ID.ToString() + "" : "";
                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? "ROOM_TYPE_ID=" + item.ROOM_TYPE_ID.ToString() + "" : "";
                FIRST_NAME = (item.FIRST_NAME != "") ? string.Format("FIRST_NAME=\"{0}\"", item.FIRST_NAME) : "";
                FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'") : "";
                STATUS_ID = (item.STATUSE != 0) ? "STATUS_ID=" + item.STATUSE.ToString() : "";
                CR_DATE_from = (item.CR_DATE_FROM != "") ? string.Format("CR_DATE >=\"{0}\"", item.CR_DATE_FROM) : "";
                CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'") : "";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? string.Format("CR_DATE<=\"{0}\"", item.CR_DATE_TO) : "";
                CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'") : "";
            }

            string CLiD = Mydb.ExecuteScalar("select CLIENT_ID from VW_ALL_REQUESTS where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text).ToString();

            string query = "select * from VW_ALL_REQUESTS where CLIENT_ID=" + CLiD + " " + ((REQUEST_ID != "") ? " and " + REQUEST_ID : " ") + " " + ((STATUS_ID != "") ? " and " + STATUS_ID : " ") + " " + ((CR_DATE_from != "") ? " and " + CR_DATE_from : " ") + " " + ((CR_DATEE_TO != "") ? " and " + CR_DATEE_TO : " ") + " " + ((ROOM_NUMBER != "") ? " and " + ROOM_NUMBER : " ") + " " + ((OBJECT_ID != "") ? " and " + OBJECT_ID : " ") + " " + ((ROOM_TYPE_ID != "") ? " and " + ROOM_TYPE_ID : " ") + " " + ((FIRST_NAME != "") ? " and " + FIRST_NAME : " ");


            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { }, CommandType.Text);

            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
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
                r.COMMENT_FILE = (Convert.ToInt32(item["LOG_IN_ID"]) == Log) ? "Curr" : "NoC";
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            returnval = js.Serialize(rs);
            return returnval;
        }
        [WebMethod]
        public static string AFilterin2(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log)
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
                REQUEST_ID = (item.REQUEST_ID != 0) ? "REQUEST_ID=" + item.REQUEST_ID.ToString() : "";
                ROOM_NUMBER = (item.ROOM_NUMBER != "0") ? "REQUEST_COMMENT like q%wroomwLw" + item.ROOM_NUMBER.ToString() + "w%q" : "";
                ROOM_NUMBER = (ROOM_NUMBER != "") ? ROOM_NUMBER.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";

                OBJECT_ID = (item.OBJECT_ID != 0) ? "REQUEST_COMMENT like q%zObject_Idzw" + item.OBJECT_ID.ToString() + "%q" : "";
                OBJECT_ID = (OBJECT_ID != "") ? OBJECT_ID.Replace("q", "'").Replace("z", "\"").Replace("w", ":") : "";

                //ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? "ROOM_TYPE_ID=" + item.ROOM_TYPE_ID.ToString() + "" : "";
                FIRST_NAME = (item.FIRST_NAME != "") ? "REQUEST_COMMENT like q%windNamewLw" + item.FIRST_NAME + "w%q" : "";
                FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("q", "'").Replace("w", "\"").Replace("L", ":") : "";

                STATUS_ID = (item.STATUSE != 0) ? "STATUS_ID=" + item.STATUSE.ToString() : "";
                CR_DATE_from = (item.CR_DATE_FROM != "") ? string.Format("CR_DATE >=\"{0}\"", item.CR_DATE_FROM) : "";
                CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'") : "";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? string.Format("CR_DATE<=\"{0}\"", item.CR_DATE_TO) : "";
                CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'") : "";
            }
            string Clid = Mydb.ExecuteScalar("select CLIENT_ID from VW_ALL_REQUESTS_2 where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",Log) }, CommandType.Text).ToString();
            string query = "select * from VW_ALL_REQUESTS_2 where CLIENT_ID=" + Clid + " " + ((REQUEST_ID != "") ? " and " + REQUEST_ID : " ") + " " + ((STATUS_ID != "") ? " and " + STATUS_ID : " ") + " " + ((CR_DATE_from != "") ? " and " + CR_DATE_from : " ") + " " + ((CR_DATEE_TO != "") ? " and " + CR_DATEE_TO : " ") + " " + ((ROOM_NUMBER != "") ? " and " + ROOM_NUMBER : " ") + " " + ((OBJECT_ID != "") ? " and " + OBJECT_ID : " ") + " " + ((FIRST_NAME != "") ? " and " + FIRST_NAME : " ");
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { }, CommandType.Text);
            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.CR_DATE = item["CR_DATE"].ToString();

                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.COMMENT_FILE = (Convert.ToInt32(item["LOG_IN_ID"]) == Log) ? "Curr" : "NoC";
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);


        }
        [WebMethod]
        public static string getStatuses()
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_STATUS where STATUS_ID in (1,2,3,4,5)", new SqlParameter[] { }, CommandType.Text);
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
        public static string getRoomTypes()
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROOM_TYPE", new SqlParameter[] { }, CommandType.Text);
            List<Room_type> rmtys = new List<Room_type>();
            foreach (DataRow item in dt.Rows)
            {
                Room_type rtp = new Room_type ();
                rtp.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
               
                rtp.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                rtp.ROOM_FOR_ID = (int)item["ROOM_FOR_ID"];
                rmtys.Add(rtp);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rmtys);
        }

        [WebMethod]
        public static string gtSerives(int rid)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select SERVICE_NAME from PRODUCT_SERVICE where SERVICE_ID in (select P_SERVICE_ID from REQUEST_SERVICE where REQUEST_ID=@rid)",new SqlParameter[] { new SqlParameter("@rid",rid)},CommandType.Text);
            List<ProductService_> prss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ prs = new ProductService_();
                prs.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                prss.Add(prs);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(prss);
        }

        [WebMethod]
        public static string gtSpecials(int rid)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable(" select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=(select SPECIALIS_ID from REQUEST where REQUEST_ID=@rid)", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
            List<Account_> accs = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {
                Account_ acc = new Account_();
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(accs);
        }

        [WebMethod]
        public static string GetObjgectForInd(int ind)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ID, OBJECT_ADRESS from OBJECT where OBJECT_ID in (select OBJECT_ID from ROOM where ROOM_ID in (select ROOM_ID from PER_SCORE where SCORE_ID in (select SCORE_ID from INDIVIDUAL_PERSCORE where INDIVIDUAL_ID=@ind)))", new SqlParameter[] {new SqlParameter("@ind",ind) }, CommandType.Text);
            string ROOM_NUMBER = Mydb.ExecuteScalar("(select ROOM_NUMBER from ROOM where ROOM_ID in (select ROOM_ID from PER_SCORE where SCORE_ID in (select SCORE_ID from INDIVIDUAL_PERSCORE where INDIVIDUAL_ID=@ind)))", new SqlParameter[] { new SqlParameter("@ind",ind)}, CommandType.Text).ToString();
            List<ObjectS> objs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS obj = new ObjectS();
                obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                obj.ObjectPhoto = ROOM_NUMBER;


                objs.Add(obj);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(objs);
        }

                [WebMethod]

        public static string GetRequestTable(int LogId)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("GetRequestTable", new SqlParameter[] { new SqlParameter("@L", LogId) }, CommandType.StoredProcedure);

            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();

                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.CR_DATE = item["CR_DATE"].ToString();
                
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
               // r.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.INDIVIDUAL_ID =(item["INDIVIDUAL_ID"]==DBNull.Value)?-1: Convert.ToInt32(item["INDIVIDUAL_ID"]);
                r.FIRST_NAME = item["FIRST_NAME"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.REQUEST_COMMENT =item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (item["ORDER"].ToString() == "1") ? true : false; //(bool)item["EMERGENCY_TREATMENT"];
                r.ADRESS = item["OBJECT_ADRESS"].ToString();
                r.MOBILE_NUMBER=item["MOBILE_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }


        [WebMethod]
        public static string gtRstTable(int LogId)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("requestTable", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Utilities.Request>();

            foreach (DataRow item in dt.Rows)
            {
                Request r = new Utilities.Request();
                r.CR_DATE = item["CR_DATE"].ToString();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);
                r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
                r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();
                r.STATUS = item["STATUS"].ToString();
                r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
                r.STATUS_ID = item["STATUS_ID"].ToString();
                r.ACCOUNT_NAME = item["PAYMENT"].ToString();
                r.EMERGENCY_TREATMENT = (bool)item["EMERGENCY_TREATMENT"];
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);

        }
        [WebMethod]
        public static string getObjById(int objId)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ADRESS from OBJECT where OBJECT_ID=@obj", new SqlParameter[] { new SqlParameter("@obj", objId) }, CommandType.Text);
            List<ObjectS> objs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS obj = new ObjectS();
                obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                objs.Add(obj);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(objs);
        }
        public static string GenerateCSV(System.Data.DataTable dt)
        {
            StringBuilder sb = new StringBuilder();
            try
            {
                int count = 1;
                int totalColumns = dt.Columns.Count;
                /*
                foreach (DataColumn dr in dt.Columns)
                {
                    sb.Append(dr.ColumnName);

                    if (count != totalColumns)
                    {
                        sb.Append(",");
                    }

                    count++;
                }
                */
                sb.AppendLine();

                string value = String.Empty;
                foreach (DataRow dr in dt.Rows)
                {
                    for (int x = 0; x < totalColumns; x++)
                    {
                        value = dr[x].ToString();

                        if (value.Contains(";") || value.Contains("\""))
                        {
                            value = '"' + value.Replace("\"", "\"\"") + '"';
                        }

                        sb.Append(value);

                        if (x != (totalColumns - 1))
                        {
                            sb.Append(";");
                        }
                    }

                    sb.AppendLine();
                }
                return sb.ToString();
            }
            catch (Exception ex)
            {
                // Do something
                return "";
            }
        }
    }
}