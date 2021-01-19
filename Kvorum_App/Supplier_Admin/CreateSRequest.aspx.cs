using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Disp_Admin.Utilities;
using Newtonsoft.Json;
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

namespace Kvorum_App.Supplier_Admin
{
    public partial class CreateSRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetServicesForSupplier(int obj, int lg, string service_guid)
        {
            string SUPPS = Mydb.ExecuteReadertoDataTableAsJson("GetSuppGuid_andProjectGuid", new SqlParameter[] {new SqlParameter("@obj",obj),new SqlParameter("@lg",lg) }, CommandType.StoredProcedure);


            dynamic SUPPS_ = JsonConvert.DeserializeObject(SUPPS);
            
            //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            string supp_guid = Convert.ToString(SUPPS_[0].SUPP_GUID);
            string project_guid = Convert.ToString(SUPPS_[0].PROJECT_GUID);
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project",project_guid),new SqlParameter("@supplier",supp_guid),new SqlParameter("@service_guid",service_guid) }, CommandType.StoredProcedure);


        }
        [WebMethod]
        public static string getSuppsDatas( int obj,int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetSuppGuid_andProjectGuid", new SqlParameter[] { new SqlParameter("@obj", obj), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetServicesForSupplierSelected(int obj, int lg, string service_guid)
        {
         //   int objId =(int) Mydb.ExecuteScalar("select OBJECT_ID from OBJECT where OBJECT_ADRESS=@objname", new SqlParameter[] { new SqlParameter("@objname",obj) }, CommandType.Text);
            string SUPPS = Mydb.ExecuteReadertoDataTableAsJson("GetSuppGuid_andProjectGuid", new SqlParameter[] { new SqlParameter("@obj", obj), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);


            dynamic SUPPS_ = JsonConvert.DeserializeObject(SUPPS);
            //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            string supp_guid = Convert.ToString(SUPPS_[0].SUPP_GUID);
            string project_guid = Convert.ToString(SUPPS_[0].PROJECT_GUID);
            return Mydb.ExecuteReadertoDataTableAsJson("TestDB.[dbo].[sp_QUICK_API_get_mp_services_web]", new SqlParameter[] { new SqlParameter("@project", project_guid), new SqlParameter("@supplier", supp_guid), new SqlParameter("@service_guid", service_guid) }, CommandType.StoredProcedure);


        }

        [WebMethod]
        public static string GetObjcurrentdsp(int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ADRESS,OBJECT_ID from OBJECT where OBJECT_ID in (select OBJECT_ID from DISP_OBJECT where DISP_ID in (select DISP_ID from DISP_ACC where LOG_IN_ID =@lg))", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            List<ObjectS> objs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS obj = new ObjectS();
                obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
                obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                objs.Add(obj);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(objs);
        }
        [WebMethod]
        public static string otpravToVrabot(int Rid, List<ProductService_> prs, string opl, string login_id, int sid, string em, int level, int dId, string costDirect, string CostSet,string Ptime,string Pdate)
        {
            Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=1,SERVICE_GROUP_ID=@gs,PAYMENT=@PAYMENT, EMERGENCY_TREATMENT=@em, PLAN_END_DATE=CAST(@Pdate as date), PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0))  where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@gs", sid), new SqlParameter("@PAYMENT", opl), new SqlParameter("@em", em),new SqlParameter("@Pdate", Pdate),new SqlParameter("@Ptime", Ptime) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE_SUPPLIERS where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            if (level == 3)
            {
                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE_SUPPLIERS (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                new SqlParameter("@l",level)}, CommandType.Text);

                }
            }
            if (level == 2)
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE_SUPPLIERS (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","1"),
                    new SqlParameter("@C",costDirect),
                new SqlParameter("@l",level)}, CommandType.Text);
            }
            if (level == 1)
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE_SUPPLIERS (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","1"),
                    new SqlParameter("@C",CostSet),
                new SqlParameter("@l",level)}, CommandType.Text);
            }

            //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            return "";
        }
        [WebMethod]
        public static string MakeVrabote(int Rid, int Ispol, string login_id)
        {

            Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=1,SPECIALIS_ID=@ispol where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@ispol", Ispol) }, CommandType.Text);

            //  Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //}
            // Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            return "";

        }
        [WebMethod]
        public static string MakeZakrit(int Rid, string comment, string login_id)
        {
            if (comment.Length == 0)
            {
                Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
                //}
                //  Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID",Rid) }, CommandType.Text);

                // object MobileNumber1 = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

                //  Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber1)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);

                return "";
            }
            else
            {
                Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (REQUEST_COMMENT, REQUEST_ID) values(@rc,@rid)", new SqlParameter[] { new SqlParameter("@rc", comment), new SqlParameter("@rid", Rid) }, CommandType.Text);
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
                //}
                // Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            }
            //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            return "";

        }
        [WebMethod]
        public static string GetTexniksAndothers(int lg)
        {
            int DispId = (int)Mydb.ExecuteScalar("select DISP_ID from DISP_ACC where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

            DataTable dt = Mydb.ExecuteReadertoDataTable("select a.LOG_IN_ID,a.ACCOUNT_NAME,da.ROLE_ID from ACCOUNT a , DISP_ACC da where da.DISP_ID=@d and(da.ROLE_ID=6 or ROLE_ID=2 or ROLE_ID=15) and da.LOG_IN_ID=a.LOG_IN_ID", new SqlParameter[] { new SqlParameter("@d", DispId) }, CommandType.Text);

            List<Account_> accs = new List<Account_>();
            //string currdispname = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
            //Account_ ac_c = new Account_();
            //ac_c.LOG_IN_ID = lg;
            //ac_c.ACCOUNT_NAME = currdispname;
            //ac_c.RS = "3";
            //accs.Add(ac_c);
            foreach (DataRow item in dt.Rows)
            {
                Account_ acc = new Account_();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.RS = item["ROLE_ID"].ToString();
                accs.Add(acc);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(accs);
        }
        [WebMethod]
        public static string GetRStTF(int rid)
        {

            DataTable dt = Mydb.ExecuteReadertoDataTable("select rsf.FILE_ADRESS,rst.RS_TEXT from REQUEST_STATUS_FILE_SUPPLIERS rsf,REQUEST_STATUS_TEXT_SUPPLIERS rst where REQUEST_ID=@rid and rst.RST_ID=rsf.RST_ID", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
            List<RsFile> rsfs = new List<RsFile>();
            foreach (DataRow item in dt.Rows)
            {
                RsFile rsf = new RsFile();
                rsf.RS_TEXT = item["RS_TEXT"].ToString();
                rsf.ImgAdres = item["FILE_ADRESS"].ToString();
                rsfs.Add(rsf);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rsfs);
        }
        [WebMethod]
        public static string MakeOtmen(int Rid, string login_id)
        {// List<ProductService_> prs, string opl,

            Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=4 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //}
            //Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
          //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

         //   Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 4), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            return "";

        }
        [WebMethod]
        public static string makeVipol(int Rid, List<RsFile> rsf, string rst, List<ProductService_> prs, string opl, string login_id)
        {
            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_TEXT_SUPPLIERS (RS_TEXT) values (@rst)", new SqlParameter[] { new SqlParameter("@rst", rst) }, CommandType.Text);
            int LastId = (int)Mydb.ExecuteScalar(" select top 1 RST_ID from REQUEST_STATUS_TEXT_SUPPLIERS order by RST_ID desc", new SqlParameter[] { }, CommandType.Text);

            foreach (RsFile item in rsf)
            {
                if (item.ImgAdres == "0")
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE_SUPPLIERS (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", "0"), new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE_SUPPLIERS (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", item.ImgAdres), new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
            }
            Mydb.ExecuteNoNQuery("Update REQUEST_SUPPLIERS set STATUS_ID=3,DONE_DATE=GETDATE(),PAYMENT=@PAYMENT where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@PAYMENT", Convert.ToBoolean(opl)) }, CommandType.Text);
            // Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
            //        new SqlParameter("@Rid",Rid),
            //        new SqlParameter("@PId",item.SERVICE_ID),
            //        new SqlParameter("@Q",item.QUANTITY),
            //        new SqlParameter("@C",item.COST)}, CommandType.Text);

            //}
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID",item.SERVICE_ID),new SqlParameter("@QUANTITY",item.QUANTITY),new SqlParameter("@COST",item.COST),new SqlParameter("@REQUEST_ID",Rid) }, CommandType.Text);
            //}
            //Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT",Convert.ToBoolean(opl)),new SqlParameter("@REQUEST_ID",Rid) }, CommandType.Text);

            //object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER",Convert.ToInt64(MobileNumber)),new SqlParameter("@NEW_STATUS",3),new SqlParameter("@COMMENT",""),new SqlParameter("@WHO",login_id) }, CommandType.StoredProcedure);

            return "";
            //if (comment.Length==0)
            //{
            //    
            //    return "";
            //}
            //else
            //{
            //    Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=3 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
            //    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (REQUEST_COMMENT, REQUEST_ID) values(@rc,@rid)", new SqlParameter[] { new SqlParameter("@rc",comment),new SqlParameter("@rid",Rid) }, CommandType.Text);
            //    return "";
            //}
        }
        [WebMethod]
        public static string SaveHFile(int R, List<RsFile> imgs)
        {
            foreach (RsFile item in imgs)
            {
                if (item.ImgAdres != "")
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (REQUEST_ID,H_COMMNET_FILE) values(@rid,@url)", new SqlParameter[] { new SqlParameter("@rid", R), new SqlParameter("@url", item.ImgAdres) }, CommandType.Text);
                }

            }

            return "";
        }
        [WebMethod]
        public static string sntComment(int rq, string cmnt)
        {
            Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (REQUEST_ID,REQUEST_COMMENT) values (@rq,@rc)", new SqlParameter[] { new SqlParameter("@rq", rq), new SqlParameter("@rc", cmnt) }, CommandType.Text);
            return "";

        }
        [WebMethod]
        public static string CommentFiles(int R)
        {//select * from REQUEST_COMMENT where REQUEST_ID=@r
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_COMMENT_SUPPLIERS where REQUEST_ID=@r  and COMMENT_FILE is not null", new SqlParameter[] { new SqlParameter("@r", R) }, CommandType.Text);
            List<REQUEST_COMMENT> rcs = new List<REQUEST_COMMENT>();
            foreach (DataRow item in dt.Rows)
            {
                REQUEST_COMMENT rc = new REQUEST_COMMENT();
                rc.COMMENT_FILE = item["COMMENT_FILE"].ToString();
                rcs.Add(rc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rcs);

        }
        [WebMethod]
        public static string gethasInd(int indId)
        {//,r.ROOM_TYPE_ID
            DataTable dt = Mydb.ExecuteReadertoDataTable("select im.FIRST_NAME,im.PHONE,r.ROOM_NUMBER,r.OBJECT_ID from IND_NAME im, ROOM r where im.INDIVIDUAL_ID=@im and r.ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=(select SCORE_ID from INDIVIDUAL_PERSCORE where INDIVIDUAL_ID=@ip))", new SqlParameter[] { new SqlParameter("@im", indId), new SqlParameter("@ip", indId) }, CommandType.Text);
            List<IND_NAME> inds = new List<IND_NAME>();
            foreach (DataRow item in dt.Rows)
            {
                IND_NAME ind = new IND_NAME();
                // ind.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
                ind.FIRST_NAME = item["FIRST_NAME"].ToString();
                ind.PHONE = item["PHONE"].ToString();
                ind.OBJECT_ID = item["OBJECT_ID"].ToString();
                ind.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                inds.Add(ind);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(inds);
        }
        [WebMethod]
        public static string GetCommentsById(int rid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_COMMENT_SUPPLIERS where REQUEST_ID=@rid order by COMENT_ID asc", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
            List<REQUEST_COMMENT> rcs = new List<REQUEST_COMMENT>();
            foreach (DataRow item in dt.Rows)
            {
                REQUEST_COMMENT rc = new REQUEST_COMMENT();
                rc.COMMENT_FILE = item["COMMENT_FILE"].ToString();
                rc.REQUEST_COMMENT_ = item["REQUEST_COMMENT"].ToString();
                rc.COMMENT_DATETIME = item["COMMENT_DATETIME"].ToString();
                rc.H_COMMNET_FILE = item["H_COMMNET_FILE"].ToString();
                rcs.Add(rc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rcs);
        }
        [WebMethod]
        public static string GetRequestbyId(int Rid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("getRequest_SUPPLIER_byId", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Request>();
            if (dt.Rows.Count != 0)
            {
                foreach (DataRow item in dt.Rows)
                {
                   Request r = new Request();//EMERGENCY_TREATMENT,PAYMENT,PLAN_END_DATE,PLAN_END_TIME
                    r.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);//
                    r.PAYMENT = Convert.ToBoolean(item["PAYMENT"]);                                                                       //  r.ADRESS = item["ADRESS"].ToString();
                                                                                                                                          //  r.i_IND_PHONE_NUMBER = item["IND_PHONE_NUMBER"].ToString();
                                                                                                                                          //   r.im_FIRST_NAME = item["FIRST_NAME"].ToString();
                   // r.ROOM_T = item["ROOM_T"].ToString();
                    r.TOTAL_COST = item["TOTAL_COST"].ToString();//
                    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();//
                    r.PLAN_END_TIME = item["PLAN_END_TIME"].ToString();//
                  // r.DELIVERY_TYPE_ID = Convert.ToInt32(item["DELIVERY_TYPE_ID"]);//
                    r.SPECIALIS_ID = Convert.ToInt32(item["SPECIALIS_ID"]);//
                    r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();//
                                                                     // r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();//
                                                                     // r.COMMENT_FILE = item["COMMENT_FILE"].ToString();//
                    r.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);//
                    r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();//
                    r.STATUS = item["STATUS_ID"].ToString();//
                    r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);//
                    r.ATRIBUTE = item["SPECIALIST_NAME"].ToString();
                    string ind = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                    if (ind == "")
                    {
                        r.INDIVIDUAL_ID = 0;
                    }
                    else
                    {
                        r.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? 0 : Convert.ToInt32(item["INDIVIDUAL_ID"].ToString());
                    }
                    r.SERVICE_NAME = item["NUMBER"].ToString();
                    r.TOTAL_COST = item["PHONE_NUMBER"].ToString();
                    r.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];// service Set
                    r.ADRESS = item["OBJECT_ID"].ToString();
                    // r.ROOM_COUNT = Convert.ToInt32(item["ROOM_COUNT"]);
                    r.ROOM_COUNT = Mydb.ExecuteReadertoDataTableAsJson("GetServices_SUPPLIERS_ByLevel", new SqlParameter[] { new SqlParameter("@R", r.REQUEST_ID) }, CommandType.StoredProcedure);

                    rs.Add(r);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();

                return js.Serialize(rs);
            }
            else
            {
                DataTable dt2 = Mydb.ExecuteReadertoDataTable("GetTenantRequest", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
                List<RequestTenant> rsts = new List<RequestTenant>();
                foreach (DataRow item in dt2.Rows)
                {
                    RequestTenant rst = new RequestTenant();

                    rst.ROOM_T = item["ROOM_T"].ToString();
                    rst.ACCOUNT_NAME = "~";
                    rst.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rst.NUMBER = item["NUMBER"].ToString();
                    rst.OBJECT_ID = item["OBJECT_ID"].ToString();
                    rst.PHONE = item["PHONE_NUMBER"].ToString();
                    rst.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                    rst.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                    rst.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];
                    string comf = (item["COMFORDATE"].ToString().Length != 0) ? "|" + "Желаемая дата: (" + item["COMFORDATE"].ToString().Substring(0, item["COMFORDATE"].ToString().LastIndexOf(' ')) + ")\n Желаемое время : c (" + item["COM_TIME_FROM"].ToString().Substring(0, item["COM_TIME_FROM"].ToString().LastIndexOf(':')).Replace(':', '-') + ") по (" + item["COM_TIME_TO"].ToString().Substring(0, item["COM_TIME_TO"].ToString().LastIndexOf(':')).Replace(':', '-') + ")" : "";

                    rst.REQUEST_TEXT = (item["COMFORDATE"].ToString().Length == 0) ? item["REQUEST_TEXT"].ToString() : item["REQUEST_TEXT"].ToString() + comf;
                    rst.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);
                    rst.PAYMENT = (item["PAYMENT"].ToString().Length == 0) ? false : Convert.ToBoolean(item["PAYMENT"]);
                    rst.PLAN_END_DATE = item["PLAN_END_DATE"].ToString(); ;
                    rst.PLAN_END_TIME = item["PLAN_END_TIME"].ToString();
                    rst.SPECIALIST_ID = (item["SPECIALIS_ID"].ToString().Length != 0) ? (int)item["SPECIALIS_ID"] : 0;

                    rsts.Add(rst);


                }
                JavaScriptSerializer js2 = new JavaScriptSerializer();
                return js2.Serialize(rsts);
            }

        }
        [WebMethod]
        public static string SaveRequest(int slcObj, int IndId_, int Lg, string em, string Pdate, string Ptime, int spId, string Rt, List<ProductService_> prs, string Rc, List<REQUEST_COMMENT> Cf,  string NUMBER, string opl, string phn,  int HReq,  int dId, int sid)//int Tc,
        {
            Rt = HttpUtility.UrlDecode(Rt);
            Rt.Replace("\\", "");
            Rc = HttpUtility.UrlDecode(Rc);
            Rc = Rc.Replace(@"\", string.Empty);
            int CrRequest;
            if (IndId_ == 0)
            {
                //string files = "";
                //if (Cf.Count != 0)
                //{
                //    string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
                //    files = domainName;
                //    for (int i = 0; i < Cf.Count; i++)
                //    {
                //        if (i == Cf.Count - 1)
                //        {
                //            files += Cf[i].COMMENT_FILE;
                //        }
                //        else
                //        {
                //            files += Cf[i].COMMENT_FILE + ",";
                //        }
                //    }
                //}
                //        object MobileNumber =  Mydb.ExecuteScalar("TestDB.dbo.sp_QUICK_API_new_request_add_autopilot2mobile", new SqlParameter[] {
                //    new SqlParameter("@object_id",slcObj),
                //    new SqlParameter("@number",NUMBER),
                //    new SqlParameter("@phone_number",phn),
                //    new SqlParameter("@request_text",Rt),
                //    new SqlParameter("@work_kind","490F9FEA-DB91-A9A4-4325-80F9006E94CC"),
                //    new SqlParameter("@files",files),
                //    new SqlParameter("@workdate",Pdate),
                //    new SqlParameter("@workbegin",Ptime),
                //    new SqlParameter("@workend",Ptime),
                //     new SqlParameter("@destination","")
                //}, CommandType.StoredProcedure);
                //int mn = Convert.ToInt32(MobileNumber);
                int mn = 0;// Convert.ToInt32(MobileNumber);

                Mydb.ExecuteNoNQuery("insert into REQUEST_SUPPLIERS (EMERGENCY_TREATMENT,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CR_DATE,STATUS_ID,NUMBER,PAYMENT,SERVICE_GROUP_ID,MOBILE_NUMBER)values(@em,CAST(@Pdate as date),CAST(@Ptime as time(0) ),@spId,@lg,@Rt,GETDATE ( ),1,@NUMBER,@opl,@gs,@MOBILE_NUMBER)", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
               // new SqlParameter("@indId",LastIndId),
              // new SqlParameter("@DId",0),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
              //  new SqlParameter("@Tc",Tc),
               // new SqlParameter("@CId",ClientId),
             //   new SqlParameter("@roomT",RoomT),
                new SqlParameter("@NUMBER",NUMBER),
                new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@gs",sid),
                new SqlParameter("@MOBILE_NUMBER",mn)
            }, CommandType.Text);
                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST_SUPPLIERS order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                CrRequest = LastReqId;

                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE_SUPPLIERS (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,3)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),},
                    CommandType.Text);


                }

                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] { new SqlParameter("@Rc",Rc),new SqlParameter("@Rid",LastReqId)
                //,new SqlParameter("@Cf",Cf)
            }, CommandType.Text);

                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }

                return "{\"RequestId\" : \"" + CrRequest.ToString() + "\"}"; ;
            }
            else
            {
                //string files = "";
                //string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
                //if (Cf.Count != 0)
                //{
                //    files = domainName;
                //    for (int i = 0; i < Cf.Count; i++)
                //    {
                //        if (i == Cf.Count - 1)
                //        {
                //            files += Cf[i].COMMENT_FILE;
                //            Cf[i].COMMENT_FILE = domainName + Cf[i].COMMENT_FILE;
                //        }
                //        else
                //        {
                //            files += Cf[i].COMMENT_FILE + ",";
                //            Cf[i].COMMENT_FILE = domainName + Cf[i].COMMENT_FILE;
                //        }
                //    }
                //}
                //    object MobileNumber = Mydb.ExecuteScalar("TestDB.dbo.sp_QUICK_API_new_request_add_autopilot2mobile", new SqlParameter[] {
                //    new SqlParameter("@object_id",slcObj),
                //    new SqlParameter("@number",NUMBER),
                //    new SqlParameter("@phone_number",phn),
                //    new SqlParameter("@request_text",Rt),
                //    new SqlParameter("@work_kind","490F9FEA-DB91-A9A4-4325-80F9006E94CC"),
                //    new SqlParameter("@files",files),
                //    new SqlParameter("@workdate",Pdate),
                //    new SqlParameter("@workbegin",Ptime),
                //    new SqlParameter("@workend",Ptime),
                //     new SqlParameter("@destination","")
                //}, CommandType.StoredProcedure);
                int mn = 0;//Convert.ToInt32(MobileNumber);
                Mydb.ExecuteNoNQuery("insert into REQUEST_SUPPLIERS (EMERGENCY_TREATMENT,INDIVIDUAL_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CR_DATE,STATUS_ID,NUMBER,PAYMENT,PHONE_NUMBER,SERVICE_GROUP_ID,MOBILE_NUMBER)values(@em,@indId,CAST(@Pdate as date),CAST(@Ptime as time(0) ),@spId,@lg,@Rt,GETDATE ( ),1,@NUMBER,@opl,@phn,@gs,@MOBILE_NUMBER )", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
                new SqlParameter("@indId",IndId_),
                //new SqlParameter("@DId",0),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
               //new SqlParameter("@roomT",RoomT),
               new SqlParameter("@NUMBER",NUMBER),
               new SqlParameter("@opl",Convert.ToBoolean(opl)),
               new SqlParameter("@phn",phn),
               new SqlParameter("@gs",sid),
               // new SqlParameter("@CId",ClientId),
                new SqlParameter("@MOBILE_NUMBER",mn),}, CommandType.Text);

                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST_SUPPLIERS order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                CrRequest = LastReqId;

                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE_SUPPLIERS (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,3)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)}, CommandType.Text);


                }
                if (Rc.Trim().Length!=0)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
               //, new SqlParameter("@Cf",Cf)
            }, CommandType.Text); 
                }
                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT_SUPPLIERS (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }

            }
            return "{\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
        }
        [WebMethod]
        public static string getObjectDisp(int lg)
        {

          return  Mydb.ExecuteReadertoDataTableAsJson("select * from OBJECT where OBJECT_ID  in (select OBJECT_ID from DISP_OBJECT where DISP_ID =(select DISP_ID from DISP_ACC where LOG_IN_ID=@lg))", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
        }
        [WebMethod]
        public static string getExistIndividualsAndScores(int obj, string rmNum)
        {
            string j1 = Mydb.ExecuteReadertoDataTableAsJson(@"select NUMBER from PER_SCORE where IS_DELETED=0 and ROOM_ID in 
( select ROOM_ID from ROOM where OBJECT_ID =@obj and ROOM_NUMBER=@rmNum and IS_DELETED=0)", new SqlParameter[] { new SqlParameter("@obj",obj),new SqlParameter("@rmNum",rmNum) }, CommandType.Text);
           // j1.Length
            dynamic j1_ = JsonConvert.DeserializeObject(j1);
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
           // rows.Count
            if (j1_.Count != 0)
            {
                j1_ = j1_[0].NUMBER;
                string j2 = Mydb.ExecuteReadertoDataTableAsJson("select * from IND_NAME where IS_DELETED=0 and INDIVIDUAL_ID in (select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@Score and IS_DELETED=0)", new SqlParameter[] { new SqlParameter("@Score", Convert.ToString(j1_)) }, CommandType.Text);

              

                var row = new Dictionary<string, object>();

                row.Add("NummberJson", j1);
                row.Add("IndividualJson", j2);
                rows.Add(row); 
            }

            //JsonConvert.SerializeObject(j1 + j2);//j1 +","+ j2;
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rows);
        }
        [WebMethod]
        public static string getServiceSet(int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson(@"select * from SERVICE_SET_FOR_SUPPLIERS where 
    SUPP_ID = (select MAN_COMP_ID from DISP where
      DISP_ID = (select DISP_ID from DISP_ACC where LOG_IN_ID = @lg))", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
        }
        [WebMethod]
        public static string GetRelatedDirects(int lg, int sid)
        {
            return Mydb.ExecuteReadertoDataTableAsJson(@"select DIRECTION_ID,DIRECTION_NAME, ICON as ICON_ADRESS,SERVICE_SET_ID from SERVICE_DIRECT_FOR_SUPPLIERS where SERVICE_SET_ID=@sid and SUPP_ID = (select MAN_COMP_ID from DISP where
DISP_ID = (select DISP_ID from DISP_ACC where LOG_IN_ID = @lg))", new SqlParameter[] { new SqlParameter("@sid",sid),new SqlParameter("@lg",lg) }, CommandType.Text);
        }

        [WebMethod]
        public static string getServices(int dId, int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson(@"select distinct s.SERVICE_ID,s.SERVICE_NAME,s.SUPP_ID,s.COMMENT, s.UNIT_MEASURE as SERVICE_TYPE_NAME,sc.COST,sc.QUANTITY_IS from SERVICES_FOR_SUPPLIERS s 
inner join 
(select * from SUPPLIER_SERVICE_COSTS as [data] where DATE_START=(select max (DATE_START)
from SUPPLIER_SERVICE_COSTS where SERVICE_ID=[data].SERVICE_ID)
) sc on sc.SERVICE_ID=s.SERVICE_ID
where s.SERVICE_DIRECT_ID=@dId and s.SUPP_ID=(select MAN_COMP_ID from DISP where
DISP_ID = (select DISP_ID from DISP_ACC where LOG_IN_ID = @lg))", new SqlParameter[] { new SqlParameter("@dId",dId),new SqlParameter("@lg",lg) }, CommandType.Text);
        }

        [WebMethod]
        public static string GetTexniks(int lg)
        {
            //int clientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
            //int MId = 4;
            //int RId = 6;
            //DataTable dt = Mydb.ExecuteReadertoDataTable("GetAccForCLforMR", new SqlParameter[] { new SqlParameter("@C", clientId), new SqlParameter("@M", MId), new SqlParameter("@R", RId) }, CommandType.StoredProcedure);
            //string currdispname = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text).ToString();
            //List<Account_> accs = new List<Account_>();
            //Account_ ac_c = new Account_();
            //ac_c.LOG_IN_ID = lg;
            //ac_c.ACCOUNT_NAME = currdispname;
            //accs.Add(ac_c);

            //foreach (DataRow item in dt.Rows)
            //{

            //    Account_ acc = new Account_();
            //    acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
            //    acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
            //    accs.Add(acc);
            //}
            int DispId = (int)Mydb.ExecuteScalar("select DISP_ID from DISP_ACC where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

            DataTable dt = Mydb.ExecuteReadertoDataTable("select a.LOG_IN_ID,a.ACCOUNT_NAME,da.ROLE_ID from ACCOUNT a , DISP_ACC da where da.DISP_ID=@d and(da.ROLE_ID=6 or ROLE_ID=2) and da.LOG_IN_ID=a.LOG_IN_ID", new SqlParameter[] { new SqlParameter("@d", DispId) }, CommandType.Text);

            List<Account_> accs = new List<Account_>();
            string currdispname = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
            Account_ ac_c = new Account_();
            ac_c.LOG_IN_ID = lg;
            ac_c.ACCOUNT_NAME = currdispname;
            ac_c.RS = "15";
            accs.Add(ac_c);
            foreach (DataRow item in dt.Rows)
            {
                Account_ acc = new Account_();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.RS = item["ROLE_ID"].ToString();
                accs.Add(acc);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(accs);
        }
    }
}