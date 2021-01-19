using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Disp_Admin.Utilities;
using Kvorum_App.Manager.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Disp_Admin
{
    public partial class CreateRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            #region newStructure
            string adressUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/Super_Disp/CreateDispRequest.aspx";




            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
            #endregion
        }
        [WebMethod]
        public static string GetExistSeriveDirect(int ss, int obj)
        {

            return Mydb.ExecuteReadertoDataTableAsJson(@"select sd.DIRECTION_ID,sd.DIRECTION_NAME,sd.SS_ID,sdi.ICON_ADRESS,sdi.ICON_ID from SDIRECT_SICON ssd  inner join SERVICE_DIRECT sd on sd.DIRECTION_ID = ssd.S_DIRECT_ID inner join SERVICE_DIRECT_ICONS sdi on sdi.ICON_ID = ssd.ICON_ID where sd.SS_ID=@ss and ssd.PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@obj)", new SqlParameter[] { new SqlParameter("@ss", ss), new SqlParameter("@obj", obj) }, CommandType.Text);
        }
        [WebMethod]
        public static string GetRelatedSets(int obj)
        {
            return Mydb.ExecuteReadertoDataTableAsJson(@"
select ss.SERVICE_SET_ID,ss.SERVICE_SET_NAME,ssc.S_ICON_ADRESS,ssc.S_ICON_ID, ac.LOG_IN_ID,ac.ACCOUNT_NAME from SELECTED_SERVICE_SET_ICON ssi
inner join SERVICE_SET ss on ss.SERVICE_SET_ID=ssi.SSS_ID 
inner join SERVICE_SET_ICONS ssc on ssc.S_ICON_ID=ssi.SSS_ICON 
inner join ACCOUNT ac on ac.LOG_IN_ID=ssi.RESPONSIBLE_ID
where ssi.PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@obj)", new SqlParameter[] { new SqlParameter("@obj",obj) }, CommandType.Text);
        }
        [WebMethod]
        public static string GetGroupOfServices()
        {
            DataTable dt=Mydb.ExecuteReadertoDataTable("select * from SERVICE_DIRECT", new SqlParameter[] { }, CommandType.Text);
            List<IND_NAME> sds = new List<IND_NAME>();
            foreach (DataRow item in dt.Rows)
            {
                IND_NAME sd = new IND_NAME();
                sd.INDIVIDUAL_ID = item["DIRECTION_ID"].ToString();
                sd.LAST_NAME = item["DIRECTION_NAME"].ToString();
                sds.Add(sd);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(sds);
       }
        [WebMethod]
        public static string MakeVipolJ(int rid, int ispol, string calen, string tm,string ODF,string ODT,string OTF1,string OTF2,string OTT1,string OTT2)
        {
            Mydb.ExecuteNoNQuery(@"update REQUEST set SPECIALIS_ID=@sp,STATUS_ID=1,
PLAN_END_DATE = CAST(@Pdate as date),
PLAN_END_TIME = CAST(REPLACE(@Ptime, '-', ':') as time(0)),
OFFERED_DATE_FROM = CAST(@ODF as date),
OFFERED_DATE_TO = CAST(@ODT as date),
OFFERED_TIME_FROM1 = CAST(REPLACE(@OTF1, '-', ':') as time(0)),
OFFERED_TIME_FROM2 = CAST(REPLACE(@OTF2, '-', ':') as time(0)),
OFFERED_TIME_TO1 = CAST(REPLACE(@OTT1, '-', ':') as time(0)),
OFFERED_TIME_TO2 = CAST(REPLACE(@OTT2, '-', ':') as time(0)) where REQUEST_ID = @rid", new SqlParameter[] { new SqlParameter("@sp", ispol), new SqlParameter("@Pdate", calen), new SqlParameter("@Ptime", tm),new SqlParameter("@ODF", ODF),new SqlParameter("@ODT", ODT),new SqlParameter("@OTF1", OTF1),new SqlParameter("@OTF2", OTF2),new SqlParameter("@OTT1", OTT1),new SqlParameter("@OTT2", OTT2),new SqlParameter("@rid",rid) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string GetDatasByAccNum(string nmbr)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select rm.OBJECT_ID,rm.ROOM_TYPE_ID,rm.ROOM_NUMBER,im.*  from ROOM rm ,IND_NAME im where rm.IS_DELETED=0 and rm.ROOM_ID in ( select ROOM_ID from PER_SCORE where NUMBER=@nmbr1 and IS_DELETED=0) and im.INDIVIDUAL_ID in(select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@nmbr2 and IS_DELETED=0)", new SqlParameter[] { new SqlParameter("@nmbr1",nmbr),new SqlParameter("@nmbr2",nmbr) }, CommandType.Text);
            List<DataByAccNum> dbns = new List<DataByAccNum>();
            foreach (DataRow item in dt.Rows)
            {
                DataByAccNum dbn = new DataByAccNum();
                dbn.FIRST_NAME = item["FIRST_NAME"].ToString();
                dbn.INDIVIDUAL_ID = item["INDIVIDUAL_ID"].ToString();
                dbn.OBJECT_ID = item["OBJECT_ID"].ToString();
                dbn.PHONE = item["PHONE"].ToString();
                dbn.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                dbn.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
                dbns.Add(dbn);


            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(dbns);
        }
        [WebMethod]
        public static string SaveHFile(int R,List<RsFile> imgs)
        {
            foreach (RsFile item in imgs)
            {
                if (item.ImgAdres!="")
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (REQUEST_ID,H_COMMNET_FILE) values(@rid,@url)", new SqlParameter[] { new SqlParameter("@rid", R), new SqlParameter("@url", item.ImgAdres) }, CommandType.Text);
                }
               
            }
           
            return "";
        }
        [WebMethod]
        public static string sntComment(int rq, string cmnt)
        {
            Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (REQUEST_ID,REQUEST_COMMENT) values (@rq,@rc)", new SqlParameter[] { new SqlParameter("@rq", rq), new SqlParameter("@rc", cmnt) }, CommandType.Text);
            return "";

        }
        [WebMethod]
        public static string getInddata(string rm, int obj,int RoomT)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select ind.*, r.ROOM_TYPE_ID from IND_NAME ind,ROOM r where  r.ROOM_TYPE_ID=@rt and  ind.INDIVIDUAL_ID=(select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=(select SCORE_ID from PER_SCORE where ROOM_ID=(select ROOM_ID from ROOM where ROOM_NUMBER=@rm and OBJECT_ID=@obj))) and r.ROOM_NUMBER=@rm2", new SqlParameter[] { new SqlParameter("@rm",rm),new SqlParameter("@obj",obj),new SqlParameter("@rm2",rm),new SqlParameter("@rt",RoomT)}, CommandType.Text);
            //List<IND_NAME> inds = new List<IND_NAME>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    IND_NAME ind = new IND_NAME();
            //    ind.INDIVIDUAL_ID = item["INDIVIDUAL_ID"].ToString();
            //    ind.FIRST_NAME = item["FIRST_NAME"].ToString();
            //    ind.PHONE = item["PHONE"].ToString();
            //    ind.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
            //    inds.Add(ind);
            //}
            DataTable dt = Mydb.ExecuteReadertoDataTable("select NUMBER from PER_SCORE where IS_DELETED=0 and ROOM_ID in ( select ROOM_ID from ROOM where OBJECT_ID =@obj and ROOM_TYPE_ID=@RoomT and ROOM_NUMBER=@rm and IS_DELETED=0)", new SqlParameter[] { new SqlParameter("@obj", obj),new SqlParameter("@RoomT", RoomT),new SqlParameter("@rm",rm) }, CommandType.Text);
            List<AccountDatas_Base> acbs = new List<AccountDatas_Base>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas_Base acb = new AccountDatas_Base();
                acb.NUMBER = item["NUMBER"].ToString();
                acbs.Add(acb);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(acbs);
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
        public static string gethasInd2(string score)
        {//,r.ROOM_TYPE_ID
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from IND_NAME where IS_DELETED=0 and INDIVIDUAL_ID in (select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@Score and IS_DELETED=0)", new SqlParameter[] { new SqlParameter("@Score", score) }, CommandType.Text);
            List<IND_NAME> inds = new List<IND_NAME>();
            foreach (DataRow item in dt.Rows)
            {
                IND_NAME ind = new IND_NAME();
                // ind.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
                ind.FIRST_NAME = item["FIRST_NAME"].ToString();
                ind.PHONE = item["PHONE"].ToString();
                ind.INDIVIDUAL_ID = item["INDIVIDUAL_ID"].ToString();
                inds.Add(ind);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(inds);
        }

        [WebMethod]
        public static string GetResponsibels_()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetResponsibels", new SqlParameter[] { }, CommandType.StoredProcedure);

        }
        [WebMethod]
        
        public static string GetObjcurrentdsp(int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ADRESS,OBJECT_ID from OBJECT where OBJECT_ID in (select OBJECT_ID from DISP_OBJECT where DISP_ID in (select DISP_ID from DISP_ACC where LOG_IN_ID =@lg))", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
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
        public static string GetProductServices(int o,int g)
        {//select SERVICE_ID, SERVICE_NAME,QUANTITY_IS,COST from PRODUCT_SERVICE
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select ps.SERVICE_ID, st.SERVICE_TYPE_ID,st.SERVICE_TYPE_NAME,ps.SERVICE_NAME,ps.QUANTITY_IS,COST from PRODUCT_SERVICE ps ,SERVICE_TYPE st where ps.SERVICE_TYPE_ID=st.SERVICE_TYPE_ID and ps.IS_DELETED=0", new SqlParameter[] { }, CommandType.Text);
            //List<ProductService_> pss = new List<ProductService_>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    ProductService_ ps = new ProductService_();
            //    ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
            //    ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
            //    ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
            //    ps.COST = item["COST"].ToString();
            //    ps.SERVICE_TYPE_NAME = item["SERVICE_TYPE_NAME"].ToString();
            //    pss.Add(ps);

            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //DataTable dt = Mydb.ExecuteReadertoDataTable("GiveServicesByObjectId", new SqlParameter[] { new SqlParameter("@objId",o),new SqlParameter("@d",g) }, CommandType.StoredProcedure);
            DataTable dt = Mydb.ExecuteReadertoDataTable(@"select 
ps.SERVICE_ID, 
ps.SERVICE_NAME, 
ps.QUANTITY_IS, 
ps.UNIT_OF_MEASURE_ID, 
um.UNIT_OF_MEASURE_NAME,
pps.COST, 
pps.DATE_START 
 from PRODUCT_SERVICE ps 
inner join 
( 
SELECT * 
FROM 
PROJECT_PRODUCT_SERVICE  AS [data] 
WHERE 
DATE_START = (SELECT max(DATE_START) 
FROM 
PROJECT_PRODUCT_SERVICE 
WHERE 
PRODUCT_SERVICE_ID = [data].PRODUCT_SERVICE_ID) 
OR DATE_START is NULL 
) 
pps on 
pps.PRODUCT_SERVICE_ID=ps.SERVICE_ID and pps.PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@objId) and ps.DIRECTION_ID=@d
inner join UNIT_OF_MEASURE um on um.UNIT_OF_MEASURE_ID=ps.UNIT_OF_MEASURE_ID", new SqlParameter[] { new SqlParameter("@objId", o), new SqlParameter("@d", g) }, CommandType.Text);
            List<ProductService_> pss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ ps = new ProductService_();
                ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
                ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
                ps.SERVICE_TYPE_NAME = item["UNIT_OF_MEASURE_NAME"].ToString();
                ps.COST = item["COST"].ToString();
                pss.Add(ps);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);
        }

        [WebMethod]
        public static string Give_Selected_Set_Direct_Service_For_Search(int objid)
        {

            return Mydb.ExecuteAsJson("[Give_Selected_Set_Direct_Service_For_Search]", new SqlParameter[] { new SqlParameter("objid", objid) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string getGroupOfProducts()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from SERVICE_DIRECT", new SqlParameter[] { }, CommandType.Text);
            List<ProductService_> ds = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ d = new ProductService_();
                d.SERVICE_NAME = item["DIRECTION_ID"].ToString();
                d.SERVICE_TYPE_NAME = item["DIRECTION_NAME"].ToString();
                ds.Add(d);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ds);
        }
        [WebMethod]
        public static string GetProductsByGrup(int o, int dr)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("GiveServiceByGroup", new SqlParameter[] {new SqlParameter("@objId",o),new SqlParameter("drId",dr) }, CommandType.StoredProcedure);

            List<ProductService_> pss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ ps = new ProductService_();
                ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
                ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
                ps.SERVICE_TYPE_NAME = item["UNIT_OF_MEASURE_NAME"].ToString();
                ps.COST = item["COST"].ToString();
                pss.Add(ps);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);

        } 
        [WebMethod]
        public static string getProductsbyText(int o, string txt,int d)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("GiveServiceBySearch", new SqlParameter[] { new SqlParameter("@objId",o),new SqlParameter("@txt",txt),new SqlParameter("@d",d) }, CommandType.StoredProcedure);
            List<ProductService_> pss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ ps = new ProductService_();
                ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
                ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
                ps.SERVICE_TYPE_NAME = item["UNIT_OF_MEASURE_NAME"].ToString();
                ps.COST = item["COST"].ToString();
                pss.Add(ps);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);

        }
        [WebMethod]
        public static string getDelivery()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from DELIVERY_TYPE", new SqlParameter[] { }, CommandType.Text);
            List<DeliveryType> ds = new List<DeliveryType>();
            foreach (DataRow item in dt.Rows)
            {
                DeliveryType d = new DeliveryType();
                d.DELIVERY_COST = Convert.ToInt32(item["DELIVERY_COST"]);
                d.DELIVERY_TYPE_ID = Convert.ToInt32(item["DELIVERY_TYPE_ID"]);
                d.DELIVERY_TYPE_NAME = item["DELIVERY_TYPE_NAME"].ToString();
                ds.Add(d);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ds);
        }

        [WebMethod]
        public static string GetCurrDisp(int logId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID ,ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@l", new SqlParameter[] { new SqlParameter("@l", logId) }, CommandType.Text);
            List<Account_> ass = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {
                Account_ a = new Account_();
                a.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                a.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                ass.Add(a);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ass);
        }
        [WebMethod]
        public static string getSpecialist()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from SPECIALIST", new SqlParameter[] { }, CommandType.Text);
            List<Specialist_> sps = new List<Specialist_>();
            foreach (DataRow item in dt.Rows)
            {
                Specialist_ sp = new Specialist_();
                sp.SPECIALITS_ID = Convert.ToInt32(item["SPECIALITS_ID"]);
                sp.NAME = item["NAME"].ToString();

                sps.Add(sp);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(sps);
        }
        [WebMethod]
        public static string GetTexniksAndothers(int lg)
        {
            int DispId = (int)Mydb.ExecuteScalar("select DISP_ID from DISP_ACC where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

            DataTable dt = Mydb.ExecuteReadertoDataTable("select a.LOG_IN_ID,a.ACCOUNT_NAME,da.ROLE_ID from ACCOUNT a , DISP_ACC da where da.DISP_ID=@d and(da.ROLE_ID=6 or ROLE_ID=2 or ROLE_ID=3) and da.LOG_IN_ID=a.LOG_IN_ID", new SqlParameter[] { new SqlParameter("@d", DispId) }, CommandType.Text);

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
            int DispId = (int)Mydb.ExecuteScalar("select DISP_ID from DISP_ACC where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg)  }, CommandType.Text);

            DataTable dt = Mydb.ExecuteReadertoDataTable("select a.LOG_IN_ID,a.ACCOUNT_NAME,da.ROLE_ID from ACCOUNT a , DISP_ACC da where da.DISP_ID=@d and(da.ROLE_ID=6 or ROLE_ID=2) and da.LOG_IN_ID=a.LOG_IN_ID", new SqlParameter[] { new SqlParameter("@d", DispId) }, CommandType.Text);

            List<Account_> accs = new List<Account_>();
            string currdispname = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
            Account_ ac_c = new Account_();
            ac_c.LOG_IN_ID = lg;
            ac_c.ACCOUNT_NAME = currdispname;
            ac_c.RS = "3";
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
        [WebMethod]
        public static string SaveRequest(int slcObj, int IndId_, int Lg, string em, int DId, string Pdate, string Ptime, int spId, string Rt,  List<ProductService_> prs, string Rc, List<REQUEST_COMMENT> Cf,int RoomT,string NUMBER,string opl,string phn,int gs,int HReq, int level, int dId,int sid,string costDirect,string CostSet,string indName,int RESPONSIBLE_ID)//int Tc,
        {
            Rt = HttpUtility.UrlDecode(Rt);
            Rt.Replace("\\", "");
            Rc = HttpUtility.UrlDecode(Rc);
            Rc =Rc.Replace(@"\", string.Empty);
            //Rt=Rt.Replace("\\","");
            //Rc=Rc.Replace("\\","")
            int ClientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@l ", new SqlParameter[] { new SqlParameter("@l", Lg) }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("insert into INDIVIDUAL (IND_PHONE_NUMBER,CLIENT_ID) values(@ph,@Cl)", new SqlParameter[] {new SqlParameter("@ph",IndPhon),new SqlParameter("@Cl",ClientId) }, CommandType.Text);
            string result = "";
            int CrRequest;
            if (IndId_ == 0)
            {
                if (HReq==0)
                {
                    //string files = "";
                    //if (Cf.Count != 0) burasi Mobile tarafi icin
                    //{
                    //    string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
                    //    files = domainName;
                    //    for (int i = 0; i < Cf.Count; i++)
                    //    {
                    //        if (i == Cf.Count - 1)
                    //        {
                    //            files +=Cf[i].COMMENT_FILE;
                    //        }
                    //        else
                    //        {
                    //            files +=Cf[i].COMMENT_FILE + ",";
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
                  // Convert.ToInt32(MobileNumber);

                    Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,SERVICE_GROUP_ID,MOBILE_NUMBER,OBJECT_ID,INDIVIDUAL_NAME,RESPONSIBLE_ID)values(@em,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@gs,@MOBILE_NUMBER,@OBJECT_ID,@INDIVIDUAL_NAME,@RESPONSIBLE_ID)", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
               // new SqlParameter("@indId",LastIndId),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
              //  new SqlParameter("@Tc",Tc),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@roomT",RoomT),
                new SqlParameter("@NUMBER",NUMBER),
                new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@gs",gs),
                new SqlParameter("@MOBILE_NUMBER",DBNull.Value),
                new SqlParameter("@OBJECT_ID",slcObj),
                new SqlParameter("@INDIVIDUAL_NAME",indName),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)
            }, CommandType.Text);
                    int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                    CrRequest = LastReqId;
                    if (level==3)
                    {
                        foreach (ProductService_ item in prs)
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);
                            

                        }           
                    }
                    if (level==2)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }//,COMMENT_FILE    //,@Cf
                    if (level==1)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
                //,new SqlParameter("@Cf",Cf)
            }, CommandType.Text);

                    foreach (REQUEST_COMMENT item in Cf)
                    {
                        if (item.COMMENT_FILE != "0")
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                        }
                    }

                }
                else
                {
                    Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=1,PLAN_END_DATE=CAST(@Pdate as date),PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ),SPECIALIS_ID=@spId, PAYMENT=@opl,EMERGENCY_TREATMENT=@em where REQUEST_ID=@HReq", new SqlParameter[] { new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime), new SqlParameter("@spId", spId),new SqlParameter("@opl",Convert.ToBoolean(opl)),new SqlParameter("@em",Convert.ToBoolean(em)), new SqlParameter("@HReq", HReq) }, CommandType.Text);
                    //foreach (ProductService_ item in prs)
                    //{
                    //    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    //new SqlParameter("@Rid",HReq),
                    //new SqlParameter("@PId",item.SERVICE_ID),
                    //new SqlParameter("@Q",item.QUANTITY),
                    //new SqlParameter("@C",item.COST)}, CommandType.Text);

                    //}

                    if (level == 3)
                    {
                        foreach (ProductService_ item in prs)
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);


                        }
                    }
                    if (level == 2)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }//,COMMENT_FILE    //,@Cf
                    if (level == 1)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }

            //        string PlanDate_Time = "Планируемая дата (" + Pdate + ") Планируемое время (" + Ptime + ")";
            //        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
            //    new SqlParameter("@Rc",PlanDate_Time),
            //    new SqlParameter("@Rid",HReq)
            //    //,new SqlParameter("@Cf",Cf)
            //}, CommandType.Text);
                    CrRequest = HReq;
                }


                result= "{\"result\":\"Ok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}"; 
               // return result;
            }
            else
            {
                //string files = "";
                //string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
                //if (Cf.Count != 0) burasi Mobile a gondermek icin
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
               // int mn = 0;//Convert.ToInt32(MobileNumber);
                Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,INDIVIDUAL_ID,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,PHONE_NUMBER,SERVICE_GROUP_ID,MOBILE_NUMBER,OBJECT_ID,INDIVIDUAL_NAME,RESPONSIBLE_ID)values(@em,@indId,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@phn,@gs,@MOBILE_NUMBER,@OBJECT_ID,@INDIVIDUAL_NAME,@RESPONSIBLE_ID )", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
                new SqlParameter("@indId",IndId_),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
               new SqlParameter("@roomT",RoomT),
               new SqlParameter("@NUMBER",NUMBER),
               new SqlParameter("@opl",Convert.ToBoolean(opl)),
               new SqlParameter("@phn",phn),
               new SqlParameter("@gs",gs),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@MOBILE_NUMBER",DBNull.Value),
                new SqlParameter("@OBJECT_ID",slcObj),
                new SqlParameter("@INDIVIDUAL_NAME",indName),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)}, CommandType.Text);
                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                CrRequest = LastReqId;
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                //    new SqlParameter("@Rid",LastReqId),
                //    new SqlParameter("@PId",item.SERVICE_ID),
                //    new SqlParameter("@Q",item.QUANTITY),
                //    new SqlParameter("@C",item.COST)}, CommandType.Text);

                //}                                                                         //,COMMENT_FILE //,@Cf
                if (level == 3)
                {
                    foreach (ProductService_ item in prs)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);


                    }
                }
                if (level == 2)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                }//,COMMENT_FILE    //,@Cf
                if (level == 1)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                }
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
               //, new SqlParameter("@Cf",Cf)
            }, CommandType.Text);

                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }
            }

            string files = "";
            if (Cf.Count != 0)
            {

                string domainName = System.Net.Dns.GetHostName();
                // files = domainName;
                for (int i = 0; i < Cf.Count; i++)
                {
                    if (i == Cf.Count - 1)
                    {
                        files += Cf[i].COMMENT_FILE;
                    }
                    else
                    {
                        files += Cf[i].COMMENT_FILE + ",";
                    }
                }
            }
            string time = DateTime.Now.AddHours(1).ToString("HH:mm");
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string LOTUS_GUID_ = "";
            //if (dId != 0)
            //{
            //    LOTUS_GUID_ = Mydb.ExecuteScalar("select LOTUS_GUID from SERVICE_DIRECT WHERE DIRECTION_ID=@GroupPS", new SqlParameter[] { new SqlParameter("@GroupPS", dId) }, CommandType.Text).ToString();
            //}
            //else
            //{
            //    LOTUS_GUID_ = "490F9FEA-DB91-A9A4-4325-80F9006E94CC";
            //}
            //if (LOTUS_GUID_.Length == 0)
            //{
            //    LOTUS_GUID_ = "490F9FEA-DB91-A9A4-4325-80F9006E94CC";
            //}
            //if (dId == 0)
            //{
                //string Grup_name = Mydb.ExecuteScalar("select SERVICE_SET_NAME from SERVICE_SET where SERVICE_SET_ID=@d", new SqlParameter[] { new SqlParameter("@d", gs) }, CommandType.Text).ToString();

                LOTUS_GUID_ = Mydb.ExecuteScalar("select LOTUS_GUID from SERVICE_SET where SERVICE_SET_ID=@d", new SqlParameter[] { new SqlParameter("@d", gs) }, CommandType.Text).ToString();

                Rc = "Заявка из Управбот\n\r" + Rt;
            //}
            //else
            //{
            //    Rc = "Заявка из Управбот\n\r " + Rt;
            //}

            try
            {
                var MobileNumber = Mydb.ExecuteScalar("TestDB.dbo.sp_QUICK_API_new_request_add_autopilot2mobile", new SqlParameter[] {
                new SqlParameter("@object_id",slcObj),
                new SqlParameter("@number",NUMBER),
                new SqlParameter("@phone_number",phn),
                new SqlParameter("@request_text",Rc),
                new SqlParameter("@work_kind",LOTUS_GUID_),
                new SqlParameter("@files",files),
                new SqlParameter("@workdate",date),
                new SqlParameter("@workbegin",time),
                new SqlParameter("@workend",time),
                 new SqlParameter("@destination","")
            }, CommandType.StoredProcedure);

                if (MobileNumber!=DBNull.Value)
                {
                   
                    Mydb.ExecuteNoNQuery("UPDATE REQUEST set MOBILE_NUMBER=@MOBILE_NUMBER where REQUEST_ID=@r", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt32(MobileNumber)), new SqlParameter("@r", CrRequest) }, CommandType.Text);
                    result = "{\"result\":\"Ok\",\"RequestId\" : \"" + MobileNumber.ToString() + "\"}";
                }
                else
                {
                    result = "{\"result\":\"Halfok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
                }
            }
            catch (Exception)
            {

               result= "{\"result\":\"Halfok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
            }

            return result;
        }
        [WebMethod]
        public static string SaveRequestStatus( int IndId_, int Lg, string em, int DId, string Pdate, string Ptime, int spId, string Rt, List<ProductService_> prs, string Rc, List<REQUEST_COMMENT> Cf, int RoomT,string NUMBER,string opl,string phn,int gs, int HReq)
        {
            int ClientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@l ", new SqlParameter[] { new SqlParameter("@l", Lg) }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("insert into INDIVIDUAL (IND_PHONE_NUMBER,CLIENT_ID) values(@ph,@Cl)", new SqlParameter[] {new SqlParameter("@ph",IndPhon),new SqlParameter("@Cl",ClientId) }, CommandType.Text);
            int CrRequest;
            if (IndId_ == 0)
            {
                if (HReq==0)

                {/*insert into REQUEST (EMERGENCY_TREATMENT,INDIVIDUAL_ID,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,PHONE_NUMBER,SERVICE_GROUP_ID,MOBILE_NUMBER)values(@em,@indId,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@phn,@gs,@MOBILE_NUMBER )*/

                    Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,SERVICE_GROUP_ID)values(@em,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@gs )", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
               // new SqlParameter("@indId",LastIndId),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
            new SqlParameter("@roomT", RoomT),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@NUMBER",NUMBER),
                new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@gs",gs)

            }, CommandType.Text);
                    int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                    CrRequest = LastReqId;

                    foreach (ProductService_ item in prs)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)}, CommandType.Text);

                    }                                                                       //,COMMENT_FILE     //,@Cf
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
              // , new SqlParameter("@Cf",Cf)
            }, CommandType.Text);
                    foreach (REQUEST_COMMENT item in Cf)
                    {
                        if (item.COMMENT_FILE != "0")
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                        }
                    } 
                }
                else
                {

                    Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=1,PLAN_END_DATE=CAST(@Pdate as date),PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ),SPECIALIS_ID=@spId, PAYMENT=@opl,EMERGENCY_TREATMENT=@em where REQUEST_ID=@HReq", new SqlParameter[] { new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime), new SqlParameter("@spId", spId), new SqlParameter("@opl", Convert.ToBoolean(opl)), new SqlParameter("@em", Convert.ToBoolean(em)), new SqlParameter("@HReq", HReq) }, CommandType.Text);
                    foreach (ProductService_ item in prs)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)}, CommandType.Text);

                    }
            //        string PlanDate_Time = "Планируемая дата (" + Pdate + ") Планируемое время (" + Ptime + ")";
            //        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
            //    new SqlParameter("@Rc",PlanDate_Time),
            //    new SqlParameter("@Rid",HReq)
            //    //,new SqlParameter("@Cf",Cf)
            //}, CommandType.Text);
                    CrRequest = HReq;
                }





                return "{\"RequestId\" : \"" + CrRequest.ToString() + "\"}"; ; ;
            }
            else
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,INDIVIDUAL_ID,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,PHONE_NUMBER,SERVICE_GROUP_ID)values(@em,@indId,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@phn,@gs )", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
                new SqlParameter("@indId",IndId_),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
               new SqlParameter("@roomT",RoomT),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@NUMBER",NUMBER),
                 new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@phn",phn),
                new SqlParameter("@gs",gs)}, CommandType.Text);
                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                CrRequest = LastReqId;
                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)}, CommandType.Text);

                }                                                                       //,COMMENT_FILE     ,@Cf
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
               // new SqlParameter("@Cf",Cf)
            }, CommandType.Text);
                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }
            }
            return "{\"RequestId\" : \"" + CrRequest.ToString() + "\"}"; ;
            ;
        }
        [WebMethod]
        public static string GetRequestbyId( int Rid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("getRequestbyId", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
            List<Utilities.Request> rs = new List<Utilities.Request>();
            if (dt.Rows.Count!=0)
            {
                foreach (DataRow item in dt.Rows)
                {
                    Utilities.Request r = new Utilities.Request();//EMERGENCY_TREATMENT,PAYMENT,PLAN_END_DATE,PLAN_END_TIME
                    r.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);//
                    r.PAYMENT = Convert.ToBoolean(item["PAYMENT"]);                                                                       //  r.ADRESS = item["ADRESS"].ToString();
                                                                                           //  r.i_IND_PHONE_NUMBER = item["IND_PHONE_NUMBER"].ToString();
                                                                                           //   r.im_FIRST_NAME = item["FIRST_NAME"].ToString();
                    r.ROOM_T = item["ROOM_T"].ToString();
                    r.TOTAL_COST = item["TOTAL_COST"].ToString();//
                    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();//
                    r.PLAN_END_TIME = item["PLAN_END_TIME"].ToString();//
                    r.DELIVERY_TYPE_ID = (item["DELIVERY_TYPE_ID"]==DBNull.Value) ?-1:Convert.ToInt32(item["DELIVERY_TYPE_ID"]);//
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
                    r.FIRST_NAME = item["FIRST_NAME"].ToString();
                    // r.ROOM_COUNT = Convert.ToInt32(item["ROOM_COUNT"]);
                    r.ROOM_COUNT = Mydb.ExecuteReadertoDataTableAsJson("GetServicesByLevel", new SqlParameter[] { new SqlParameter("@R",r.REQUEST_ID) }, CommandType.StoredProcedure);
                    r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                    r.STATUS = item["STATUS"].ToString();
                    r.RESPONSIBLE_ID = item["RESPONSIBLE_ID"].ToString();
                     
                    rs.Add(r);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();

                return js.Serialize(rs);
            }
            else
            {
                DataTable dt2 = Mydb.ExecuteReadertoDataTable("GetTenantRequest", new SqlParameter[] {new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
                List<Utilities.RequestTenant> rsts = new List<Utilities.RequestTenant>();
                foreach (DataRow item in dt2.Rows)
                {
                    Utilities.RequestTenant rst = new Utilities.RequestTenant();
                     
                    rst.ROOM_T = item["ROOM_T"].ToString();
                    rst.ACCOUNT_NAME = "~";
                    rst.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rst.NUMBER = item["NUMBER"].ToString();
                    rst.OBJECT_ID = item["OBJECT_ID"].ToString();
                    rst.PHONE = item["PHONE_NUMBER"].ToString();
                    rst.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                    rst.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                    rst.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];
                    string comf=(item["COMFORDATE"].ToString().Length!=0)? "|" + "Желаемая дата: (" + item["COMFORDATE"].ToString().Substring(0, item["COMFORDATE"].ToString().LastIndexOf(' ')) + ")\n Желаемое время : c (" + item["COM_TIME_FROM"].ToString().Substring(0, item["COM_TIME_FROM"].ToString().LastIndexOf(':')).Replace(':', '-') + ") по (" + item["COM_TIME_TO"].ToString().Substring(0, item["COM_TIME_TO"].ToString().LastIndexOf(':')).Replace(':', '-') + ")":"";

                    rst.REQUEST_TEXT = (item["COMFORDATE"].ToString().Length == 0) ? item["REQUEST_TEXT"].ToString() : item["REQUEST_TEXT"].ToString()+ comf;
                    rst.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);
                    rst.PAYMENT = (item["PAYMENT"].ToString().Length == 0) ? false:Convert.ToBoolean(item["PAYMENT"]);
                    rst.PLAN_END_DATE = item["PLAN_END_DATE"].ToString(); ;
                    rst.PLAN_END_TIME = item["PLAN_END_TIME"].ToString();
                    rst.SPECIALIST_ID =  (item["SPECIALIS_ID"].ToString().Length!=0)? (int)item["SPECIALIS_ID"]:0;
                   rst.TOTAL_COST =  Mydb.ExecuteReadertoDataTableAsJson("GetServicesByLevel", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
                    rst.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                    rst.STATUS = item["STATUS"].ToString();
                    rst.RESPONSIBLE_ID = item["RESPONSIBLE_ID"].ToString();
                    rsts.Add(rst);
                    
                 
                }
                JavaScriptSerializer js2 = new JavaScriptSerializer();
                return js2.Serialize(rsts);
            }
           
        }

        [WebMethod]
        public static string GetPServiceByid(int R_id)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PRODUCT_SERVICE where SERVICE_ID not in (select P_SERVICE_ID from REQUEST_SERVICE where REQUEST_ID=@r)", new SqlParameter[] {new SqlParameter("@r",R_id) }, CommandType.Text);
            //List<ProductService_> pss = new List<ProductService_>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    ProductService_ ps = new ProductService_();

            //    ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
            //    ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
            //    ps.COST = item["COST"].ToString();
            //    ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
            //    pss.Add(ps);
            //}
            //DataTable dts = Mydb.ExecuteReadertoDataTable("select ps.SERVICE_NAME,ps.QUANTITY_IS,ps.SERVICE_ID, rs.COST,rs.QUANTITY from PRODUCT_SERVICE ps, REQUEST_SERVICE rs where rs.REQUEST_ID=@r and rs.P_SERVICE_ID=ps.SERVICE_ID", new SqlParameter[] { new SqlParameter("@r",R_id) }, CommandType.Text);
            //foreach (DataRow item2 in dts.Rows)
            //{
            //    ProductService_ ps2 = new ProductService_();
            //    ps2.SERVICE_ID = Convert.ToInt32(item2["SERVICE_ID"]);
            //    ps2.SERVICE_NAME = item2["SERVICE_NAME"].ToString();
            //    ps2.COST = item2["COST"].ToString();
            //    ps2.QUANTITY_IS = Convert.ToBoolean(item2["QUANTITY_IS"]);
            //    ps2.QUANTITY = Convert.ToInt32(item2["QUANTITY"]);
            //    ps2.DISCRIPTION = 5;
            //    pss.Add(ps2);
            //}
            DataTable dt = Mydb.ExecuteReadertoDataTable("GiveServicesByRequestId", new SqlParameter[] { new SqlParameter("@r",R_id) }, CommandType.StoredProcedure);
            List<ProductService_> pss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ ps2 = new ProductService_();
                ps2.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
                ps2.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                ps2.COST = item["COST"].ToString();
                ps2.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
                ps2.QUANTITY = Convert.ToInt32(item["QUANTITY"]);
                ps2.SERVICE_TYPE_NAME = item["UNIT_OF_MEASURE_NAME"].ToString(); ;
                pss.Add(ps2);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);
        }


       
        [WebMethod]
        public static string UpdateRequest(int R_id,int Lg, string IndName, string IndPhon, string em, string Adr, int DId, string Pdate, string Ptime, int spId, string Rt, int Tc, List<ProductService_> prs, string Rc, string Cf,int room) {

            int IndId = (int)Mydb.ExecuteScalar("select INDIVIDUAL_ID from REQUEST where REQUEST_ID=@r", new SqlParameter[] { new SqlParameter("@r", R_id) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("update INDIVIDUAL set IND_PHONE_NUMBER=@phn where INDIVIDUAL_ID=@Id", new SqlParameter[] { new SqlParameter("@phn", IndPhon), new SqlParameter("@Id", IndId) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update IND_NAME set FIRST_NAME=@f where INDIVIDUAL_ID=@Id", new SqlParameter[] { new SqlParameter("@f", IndName), new SqlParameter("@Id", IndId) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update REQUEST set EMERGENCY_TREATMENT=@em,ADRESS=@a,DELIVERY_TYPE_ID=@d,TOTAL_COST=@t,PLAN_END_DATE=CAST(@Pdate as date),PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0)),SPECIALIS_ID=@sp,REQUEST_TEXT=@rt,ROOM_COUNT=@rmc where REQUEST_ID=@Rid", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
                new SqlParameter("@a",Adr),
                new SqlParameter("@d",DId),
                new SqlParameter("@t",Tc),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@sp",spId),
                new SqlParameter("@rt",Rt),
                new SqlParameter("@rmc",room),
                new SqlParameter("@Rid",R_id)
            }, CommandType.Text);
            Mydb.ExecuteNoNQuery("update REQUEST_COMMENT set REQUEST_COMMENT=@rc,COMMENT_FILE=@cf where REQUEST_ID=@Rid", new SqlParameter[] {
                new SqlParameter("@rc",Rc),
                new SqlParameter("@cf",Cf),
                new SqlParameter("@Rid",R_id)
            }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE where REQUEST_ID=@Rid", new SqlParameter[] { new SqlParameter("@Rid", R_id) }, CommandType.Text);
            foreach (ProductService_ item in prs)
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    new SqlParameter("@Rid",R_id),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)
                }, CommandType.Text);
            }
            return "";
        }

        [WebMethod]
        public static string makeVipol(int Rid, List<RsFile> rsf,string rst, List<ProductService_> prs, string opl, string login_id)
        {
            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_TEXT (RS_TEXT) values (@rst)", new SqlParameter[] { new SqlParameter("@rst",rst) }, CommandType.Text);
            int LastId = (int)Mydb.ExecuteScalar(" select top 1 RST_ID from REQUEST_STATUS_TEXT order by RST_ID desc", new SqlParameter[] { }, CommandType.Text);

            foreach (RsFile item in rsf)
            {
                if (item.ImgAdres=="0")
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id",Rid),new SqlParameter("@fs","0"),new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", item.ImgAdres), new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
            }
            Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=3,DONE_DATE=GETDATE(),PAYMENT=@PAYMENT where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@PAYMENT", Convert.ToBoolean(opl)) }, CommandType.Text);

            int MOBILE_NUMBER =Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));
            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 3) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 3), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
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
        public static string MakeOtmen(int Rid,string login_id)
        {// List<ProductService_> prs, string opl,

            Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=4 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //}
            //Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 4) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 4), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }

          
            return "";
            
        }
        [WebMethod]
        public static string MakeZakrit(int Rid, string comment,string login_id)
        {
            if (comment.Length == 0)
            {
                Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
                //}
              //  Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID",Rid) }, CommandType.Text);

               // object MobileNumber1 = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

              //  Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber1)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);



                
            }
            else
            {
                Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (REQUEST_COMMENT, REQUEST_ID) values(@rc,@rid)", new SqlParameter[] { new SqlParameter("@rc", comment), new SqlParameter("@rid", Rid) }, CommandType.Text);
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
                //}
               // Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            }
            //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);

            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 5) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";
          
        }
        [WebMethod]
        public static string MakeVrabote(int Rid, int Ispol,string login_id)
        {
             
                Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=1,SPECIALIS_ID=@ispol where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid),new SqlParameter("@ispol",Ispol) }, CommandType.Text);

            //  Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //
            //foreach (ProductService_ item in prs)
            //{
            //    Mydb.ExecuteNoNQuery("update REQUEST_SERVICE set P_SERVICE_ID=@P_SERVICE_ID, QUANTITY=@QUANTITY, COST=@COST where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@P_SERVICE_ID", item.SERVICE_ID), new SqlParameter("@QUANTITY", item.QUANTITY), new SqlParameter("@COST", item.COST), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //}
            // Mydb.ExecuteNoNQuery("Update REQUEST set PAYMENT=@PAYMENT where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@PAYMENT", opl), new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            //object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);

            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 1) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";
            
        }

        [WebMethod]
        public static string GetCommentsById(int rid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_COMMENT where REQUEST_ID=@rid order by COMENT_ID asc", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
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
        public static string GetRStTF(int rid) {

            DataTable dt = Mydb.ExecuteReadertoDataTable("select rsf.FILE_ADRESS,rst.RS_TEXT from REQUEST_STATUS_FILE rsf,REQUEST_STATUS_TEXT rst where REQUEST_ID=@rid and rst.RST_ID=rsf.RST_ID", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
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
        public static string CommentFiles(int R)
        {//select * from REQUEST_COMMENT where REQUEST_ID=@r
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_COMMENT where REQUEST_ID=@r  and COMMENT_FILE is not null", new SqlParameter[] { new SqlParameter("@r",R) }, CommandType.Text);
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
        public static string otpravToVrabot(int Rid, List<ProductService_> prs, string opl, string login_id,int sid,string em,int level,int dId, string costDirect,string CostSet,string Pdate, string Ptime, int SpId,int RESPONSIBLE_ID)
          {
            Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=1,SERVICE_GROUP_ID=@gs,PAYMENT=@PAYMENT, EMERGENCY_TREATMENT=@em,PLAN_END_DATE=CAST(@Pdate as date), PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0)), SPECIALIS_ID=@SpId, RESPONSIBLE_ID=@RESPONSIBLE_ID where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid),new SqlParameter("@gs",sid), new SqlParameter("@PAYMENT", opl),new SqlParameter("@em",em),new SqlParameter("@Pdate",Pdate),new SqlParameter("@Ptime",Ptime),new SqlParameter("@SpId",SpId),new SqlParameter("@RESPONSIBLE_ID", RESPONSIBLE_ID) }, CommandType.Text);//yarin test edeceksin

            Mydb.ExecuteNoNQuery("delete from REQUEST_SERVICE where REQUEST_ID=@REQUEST_ID", new SqlParameter[] { new SqlParameter("@REQUEST_ID", Rid) }, CommandType.Text);
            if (level==3)
            {
                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                new SqlParameter("@l",level)}, CommandType.Text);

                } 
            }
            if (level==2)
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","1"),
                    new SqlParameter("@C",costDirect),
                new SqlParameter("@l",level)}, CommandType.Text);
            }
            if (level==1)
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","1"),
                    new SqlParameter("@C",CostSet),
                new SqlParameter("@l",level)}, CommandType.Text);
            }

            //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);

            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 1) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";                                                                              
        }
    }
}