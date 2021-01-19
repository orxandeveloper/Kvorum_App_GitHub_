using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Disp_Admin.Utilities;
using Kvorum_App.Manager.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App
{
    public partial class ApiForPrivateOffice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string AddCounterValue(string type,int mid,string VALUE_,string cnum)
        {
            if (VALUE_.IndexOf(',') != -1)
            {
                VALUE_ = VALUE_.Replace(',', '.');

            }
            decimal _VALUE_ = decimal.Parse(VALUE_, CultureInfo.InvariantCulture);
            Mydb.ExecuteNoNQuery("AddCounterValue", new SqlParameter[] { new SqlParameter("@mid",mid), new SqlParameter("@TYPE",type), new SqlParameter("@VALUE_",VALUE_) }, CommandType.StoredProcedure);
            #region Old
            //if (type== "Газ")
            //{
            //    //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] {new SqlParameter("@VALUE_", VALUE_),new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //    if (count != 0)
            //    {
            //        Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //    else
            //    {
            //        Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    }
            //}
            //if (type== "Теплоэнергия")
            //{

            //    //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //    if (count != 0)
            //    {
            //        Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //    else
            //    {
            //        Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    }

            //}
            //if (type== "ХВС")
            //{

            //    //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //    if (count != 0)
            //    {
            //        Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //    else
            //    {
            //        Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    }

            //}
            //if (type== "ГВС")
            //{

            //    //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //    if (count != 0)
            //    {
            //        Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //    else
            //    {
            //        Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //    }

            //}
            //if (type!= "Газ" && type != "Теплоэнергия" && type != "ХВС" && type != "ГВС" )
            //{
            //    if (type.Contains("T1"))
            //    {
            //        int AmountT = (int)Mydb.ExecuteScalar("select AMUNT_TARIF from METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);

            //        if (AmountT==1)
            //        {

            //            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //                if (count != 0)
            //                {
            //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //                }
            //            else
            //            {
            //                Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            }


            //        }
            //        if (AmountT == 2)
            //        {
            //            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            if (count != 0)
            //            {
            //                Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //            }
            //            else
            //            {
            //                Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,0,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            }
            //        }
            //        if (AmountT == 3)
            //        {
            //            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            if (count != 0)
            //            {
            //                Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@VALUE_ where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //            }
            //            else
            //            {
            //                Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values (GETDATE(),@VALUE_,0,0,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            }
            //        }
            //    }
            //    if (type.Contains("T2"))
            //    {
            //        int AmountT = (int)Mydb.ExecuteScalar("select AMUNT_TARIF from METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            //        if (AmountT==2)
            //        {
            //            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            if (count != 0)
            //            {
            //                Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_2=@VALUE_2 where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_2", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //            }
            //            else
            //            {
            //                Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,METERS_ID) values (GETDATE(),0,@VALUE_2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_2", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            } 
            //        }
            //        if (AmountT==3)
            //        {
            //            int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            if (count != 0)
            //            {
            //                Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_2=@VALUE_2 where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_2", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //            }
            //            else
            //            {
            //                Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values (GETDATE(),0,@VALUE_2,0,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_2", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //            }
            //        }
            //    }
            //    if (type.Contains("T3"))
            //    {
            //        //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_3,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //        int count = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where DATE_= CONVERT(date, getdate())and METERS_ID=(select METERS_ID from METERS where METERS_NUMBER=@cnum)", new SqlParameter[] { new SqlParameter("@cnum", cnum) }, CommandType.Text);

            //        //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values (GETDATE(),@VALUE_,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //        if (count != 0)
            //        {
            //            Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_3=@VALUE_3 where METERS_ID=@mid and DATE_= CONVERT(date, getdate())", new SqlParameter[] { new SqlParameter("@VALUE_3", VALUE_), new SqlParameter("@mid", mid) }, CommandType.Text);
            //        }
            //        else
            //        {
            //            Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values (GETDATE(),0,0,@VALUE_3,@METERS_ID)", new SqlParameter[] { new SqlParameter("@VALUE_3", VALUE_), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //        }
            //    }
            //} 
            #endregion
            return "";
        }
        [WebMethod]
        public static string getMetersValuesT(int mid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from METER_VALUE where METERS_ID=@mid order by DATE_ desc", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {

                // AMUNT_TARIF/VALUE_
                // LOG_IN_ID/VALUE_2
                // METERS_ID/VALUE_3
                // NEXT_DATE/DATE_

                METERS m = new METERS();
                m.AMUNT_TARIF = item["VALUE_"].ToString();
                m.LOG_IN_ID = item["VALUE_2"].ToString();
                m.METERS_ID = item["VALUE_3"].ToString();
                m.NEXT_DATE = item["DATE_"].ToString();
                 
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string GetCountersT( string s)
        {
            int o = (int)Mydb.ExecuteScalar("select top 1  OBJECT_ID from VW_ROOMS where NUMBER=@s", new SqlParameter[] { new SqlParameter("@s", s) }, CommandType.Text);
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_METERS where OBJECT_ID=@o and ROOM_NUMBER=(select ROOM_ID from PER_SCORE where SCORE_ID=@s)", new SqlParameter[] { new SqlParameter("@o",o),new SqlParameter("@s",s) }, CommandType.Text);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string SecondLogin(string score, string Pass)
        {
            string result = "";
            string msPass = (string)Mydb.ExecuteScalar("select PASS from PER_SCORE where SCORE_ID=@s", new SqlParameter[] { new SqlParameter("@s",score) }, CommandType.Text);
            if (msPass==Pass)
            {
                result = "{\"result\" : \"0\"}";
            }
            else
            {
              result=  "{\"result\" : \"1\"}";
            }
            return result;
        }
        [WebMethod]
        public static string sortingBy( string By ,string score,string asc)
        {
            string query = "select * from VW_TENANT_REQUEST where OBJECT_ID=(select OBJECT_ID from ROOM where ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=@s)) order by "+ By + " "+asc+"";
            DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { new SqlParameter("@s",score) }, CommandType.Text);
            List<RequestTenant> rts = new List<RequestTenant>();
            foreach (DataRow item in dt.Rows)
            {
                RequestTenant rt = new RequestTenant();
                rt.FIRST_NAME = item["FIRST_NAME"].ToString();
                rt.ROOM_T = item["REQUEST_ID"].ToString();
                rt.ACCOUNT_NAME = item["CR_DATE"].ToString();
                rt.ROOM_NUMBER = item["STATUS"].ToString();
                rt.PHONE = item["STATUS_ID"].ToString();
                rt.INDIVIDUAL_ID = item["DONE_DATE"].ToString();
                rts.Add(rt);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rts);
        }
        [WebMethod]
        public static string getStatuses(string Score)
        {
            System.Data.DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST_STATUS", new SqlParameter[] { }, CommandType.Text);
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
        public static string VerniVRabot(int rid)
        {
            Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=1 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);

            return "{\"result\" : \"ok\"}";
        }
        [WebMethod]
        public static string Makefilter(List<TenantRFilter> flt, string score)
        {
            try
            {
                string STATUS_ID = null;
                string SERVICE_TYPE_ID = null;
                string REQUEST_ID = null;
                string Cr_S = null;
                string Cr_E = null;
                foreach (TenantRFilter item in flt)
                {
                    STATUS_ID = (item.STATUS_ID.ToString() != "0") ? item.STATUS_ID.ToString() : null;
                    SERVICE_TYPE_ID = (item.SERVICE_TYPE_ID == "0") ? null : item.SERVICE_TYPE_ID;
                    REQUEST_ID = (item.REQUEST_ID == "") ? null : item.REQUEST_ID;
                    Cr_E = (item.Cr_E == "") ? null : item.Cr_E;
                    Cr_S = (item.Cr_S == "") ? null : item.Cr_S;
                }
                DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_TenantRFiltering", new SqlParameter[] {
                new SqlParameter("@score",score),
                new SqlParameter("@STATUS_ID",STATUS_ID),
                new SqlParameter("@SERVICE_TYPE_ID",SERVICE_TYPE_ID),
                new SqlParameter("@REQUEST_ID",REQUEST_ID),
                new SqlParameter("@Cr_S",Cr_S),
                new SqlParameter("@Cr_E",Cr_E)
            }, CommandType.StoredProcedure);


                List<RequestTenant> rts = new List<RequestTenant>();
                foreach (DataRow item in dt.Rows)
                {
                    RequestTenant rt = new RequestTenant();
                    rt.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rt.ROOM_T = item["REQUEST_ID"].ToString();
                    rt.ACCOUNT_NAME = item["CR_DATE"].ToString();
                    rt.ROOM_NUMBER = item["STATUS"].ToString();
                    rt.PHONE = item["STATUS_ID"].ToString();
                    rt.INDIVIDUAL_ID = item["DONE_DATE"].ToString();
                    rts.Add(rt);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(rts);
            }
            catch (Exception ex)
            {

                return "{\"result\" : \""+ ex.ToString() + "\"}";
            }
        }
        [WebMethod]
        public static string getServiceType()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from SERVICE_TYPE where IS_DELETED=0", new SqlParameter[] { }, CommandType.Text);
            List<RequestTenant> rts = new List<RequestTenant>();
            foreach (DataRow item in dt.Rows)
            {
                RequestTenant rt = new RequestTenant();
                rt.ACCOUNT_NAME = item["SERVICE_TYPE_NAME"].ToString();
                rt.NUMBER = item["SERVICE_TYPE_ID"].ToString();
                rts.Add(rt);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rts);
        }
        [WebMethod]
        public static string makeOplat(int rid, string OFDates, string oftimeS, string oftimeE)
        {
            Mydb.ExecuteNoNQuery("update REQUEST set OK_DATE=CAST(@okd as date),OK_TIME_S=CAST(REPLACE(@okts,'-',':') as time(0)),OK_TIME_E=CAST(REPLACE(@okte,'-',':') as time(0)), STATUS_ID=8 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@okd", OFDates),new SqlParameter("@okts",oftimeS),new SqlParameter("@okte", oftimeE),new SqlParameter("@rid",rid) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string MakeZakrit(int rid, string rst, string sm)
        {
            Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_TEXT (RS_TEXT,RS_SMILE) values (@rst,@rsm)", new SqlParameter[] { new SqlParameter("@rst", rst), new SqlParameter("@rsm", sm) }, CommandType.Text);

            int LastId = (int)Mydb.ExecuteScalar(" select top 1 RST_ID from REQUEST_STATUS_TEXT order by RST_ID desc", new SqlParameter[] { }, CommandType.Text);

            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", rid), new SqlParameter("@fs", "0"), new SqlParameter("@rst", LastId) }, CommandType.Text);
            return "{\"result\" : \"ok\"}";
             
        }
        [WebMethod]
        public static string MakeClose(int rid)
        {
            Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=4 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid",rid) }, CommandType.Text);
           
            return "{\"result\" : \"ok\"}"; 
        }
        [WebMethod]
        public static string getSelectedServT(int R)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PRODUCT_SERVICE where SERVICE_ID in (select P_SERVICE_ID from REQUEST_SERVICE where REQUEST_ID=@R)", new SqlParameter[] { new SqlParameter("@R", R) }, CommandType.Text);
            List<ProductService_> pss = new List<ProductService_>();
            foreach (DataRow item in dt.Rows)
            {
                ProductService_ ps = new ProductService_();

                ps.SERVICE_ID = Convert.ToInt32(item["SERVICE_ID"]);
                ps.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                ps.COST = item["COST"].ToString();
                ps.QUANTITY_IS = Convert.ToBoolean(item["QUANTITY_IS"]);
                pss.Add(ps);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);
        }
        [WebMethod]
        public static string GetTRequestById(int rid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from REQUEST where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.Text);
            List<RequestTenant> rts = new List<RequestTenant>();
            foreach (DataRow item in dt.Rows)
            {
                RequestTenant rt = new RequestTenant();
                rt.ACCOUNT_NAME = item["STATUS_ID"].ToString();
                rt.INDIVIDUAL_ID = item["INDIVIDUAL_ID"].ToString();
                rt.NUMBER = item["COMFORDATE"].ToString();
                rt.OBJECT_ID = item["COM_TIME_FROM"].ToString();
                rt.ROOM_NUMBER = item["COM_TIME_TO"].ToString();
                rt.PHONE = (item["OFFERED_DATE_FROM"].ToString() != "") ? (item["PLAN_END_TIME"].ToString() +"|"+item["PLAN_END_DATE"].ToString() +"|"+item["OFFERED_DATE_FROM"].ToString()+"|" + item["OFFERED_DATE_TO"].ToString() + "|" + item["OFFERED_TIME_FROM1"].ToString() + "|" + item["OFFERED_TIME_FROM2"].ToString() + "|" + item["OFFERED_TIME_TO1"].ToString() + "|" + item["OFFERED_TIME_TO2"].ToString()) : "";
                rt.ROOM_T = item["CR_DATE"].ToString();
                rt.FIRST_NAME = item["DONE_DATE"].ToString();
             //   rt.PHONE =  + "|" + item["OFFERED_DATE_TO"].ToString() + "|" + item["OFFERED_TIME_FROM1"].ToString() + "|" + item["OFFERED_TIME_FROM2"].ToString() + "|" + item["OFFERED_TIME_TO1"].ToString() + "|" + item["OFFERED_TIME_TO1"].ToString();
                rts.Add(rt);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rts);
        }
        [WebMethod]
        public static string GetTenantRequestTable(string Score)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_TENANT_REQUEST where OBJECT_ID=(select OBJECT_ID from ROOM where ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=@s)) order by REQUEST_ID desc", new SqlParameter[] { new SqlParameter("@s",Score) }, CommandType.Text);

            List<RequestTenant> rts = new List<RequestTenant>();
            foreach (DataRow item in dt.Rows)
            {
                RequestTenant rt = new RequestTenant();
                rt.FIRST_NAME = item["FIRST_NAME"].ToString();
                rt.ROOM_T = item["REQUEST_ID"].ToString();
                rt.ACCOUNT_NAME = item["CR_DATE"].ToString();
                rt.ROOM_NUMBER = item["STATUS"].ToString();
                rt.PHONE = item["STATUS_ID"].ToString();
                rt.INDIVIDUAL_ID = item["DONE_DATE"].ToString();
                rts.Add(rt);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rts);
        }
        [WebMethod]
        public static string SaveRequest(string score,int indId,string Phone, List<ProductService_> prs, List<REQUEST_COMMENT> Cf, string RC,int ObjId,string comDate, string CFtime, string CTtime)
        {
            string result = "";
           int ObDispCount = (int)Mydb.ExecuteScalar("select COUNT(*) from DISP_OBJECT where OBJECT_ID=@o", new SqlParameter[] {new SqlParameter("@o",ObjId) }, CommandType.Text);
           // int ObDispCount = 1;
            if (ObDispCount!=0)
            {
                if (indId != 0)
                {
                    int RoomT = (int)Mydb.ExecuteScalar("select ROOM_TYPE_ID from ROOM where ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID =(select SCORE_ID from INDIVIDUAL_PERSCORE where INDIVIDUAL_ID=@indId))", new SqlParameter[] { new SqlParameter("@indId", indId) }, CommandType.Text);


                    Mydb.ExecuteNoNQuery("insert into REQUEST (INDIVIDUAL_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,COMFORDATE,COM_TIME_FROM,COM_TIME_TO)values(@indId,GETDATE(),2,@roomT,@score,CAST(@Comdate as date),CAST(REPLACE(@CFtime,'-',':')as time(0) ),CAST(REPLACE(@CTtime,'-',':')as time(0)))", new SqlParameter[] {
                new SqlParameter("@indId",indId),
                new SqlParameter("@roomT",RoomT),
                new SqlParameter("@score",score),
                new SqlParameter("@Comdate",comDate),
                new SqlParameter("@CFtime",CFtime),
                new SqlParameter("@CTtime",CTtime)
                }, CommandType.Text);
                }
                else
                {
                    string[] splited = Phone.Split('|');
                    Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,PHONE) values(@f,@p)", new SqlParameter[] { new SqlParameter("@f", splited[1]), new SqlParameter("@p", splited[0]) }, CommandType.Text);

                    int LastIndId = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (INDIVIDUAL_ID,SCORE_ID) values(@i,@s)", new SqlParameter[] { new SqlParameter("@i",LastIndId),new SqlParameter("@s",score) }, CommandType.Text);

                    int RoomT = (int)Mydb.ExecuteScalar("select ROOM_TYPE_ID from ROOM where ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID =(select SCORE_ID from INDIVIDUAL_PERSCORE where INDIVIDUAL_ID=@indId))", new SqlParameter[] { new SqlParameter("@indId", LastIndId) }, CommandType.Text);

                    Mydb.ExecuteNoNQuery("insert into REQUEST (INDIVIDUAL_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,COMFORDATE,COM_TIME_FROM,COM_TIME_TO)values(@indId,GETDATE(),2,@roomT,@score,CAST(@Comdate as date),CAST(REPLACE(@CFtime,'-',':')as time(0) ),CAST(REPLACE(@CTtime,'-',':')as time(0)))", new SqlParameter[] {
                new SqlParameter("@indId",LastIndId),
                new SqlParameter("@roomT",RoomT),
                new SqlParameter("@score",score),
                new SqlParameter("@Comdate",comDate),
                new SqlParameter("@CFtime",CFtime),
                new SqlParameter("@CTtime",CTtime)
                }, CommandType.Text);
                }
                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                foreach (ProductService_ item in prs)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST)}, CommandType.Text);

                }
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",RC),
                new SqlParameter("@Rid",LastReqId)
                //,new SqlParameter("@Cf",Cf)
            }, CommandType.Text);
                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (H_COMMNET_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }
                //Mydb.ExecuteNoNQuery("update IND_NAME set PHONE=@p where INDIVIDUAL_ID=@i", new SqlParameter[] { new SqlParameter("@p", Phone),new SqlParameter("@i",indId) }, CommandType.Text);
                result = "{\"result\" : \"ok\"}";
            }
            else
            {
                result = "{\"result\" : \"no\"}";  
            }
            return result;
        }
        [WebMethod]
        public static string getTenantDatas(string score)
        {
            string result = "";
            DataTable dtObj = Mydb.ExecuteReadertoDataTable("SELECT  OBJECT_ADRESS,OBJECT_ID FROM OBJECT WHERE OBJECT_ID=(select OBJECT_ID from ROOM where ROOM_ID =(select ROOM_ID from PER_SCORE  where IS_DELETED=0 and SCORE_ID=@s))", new SqlParameter[] { new SqlParameter("@s",score) }, CommandType.Text);
            List<ObjectS> os = new List<ObjectS>();
            foreach (DataRow item in dtObj.Rows)
            {
                ObjectS o = new ObjectS();
                o.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                o.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
                os.Add(o);
            }
            JavaScriptSerializer jsObj = new JavaScriptSerializer();
            


            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from IND_NAME where INDIVIDUAL_ID in (select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@s)", new SqlParameter[] {  new SqlParameter("@s",score) }, CommandType.Text);
            List<AccountDatas> ads = new List<AccountDatas>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas ad = new AccountDatas();
                ad.FIRST_NAME = item["FIRST_NAME"].ToString();
                ad.PHONE = item["PHONE"].ToString();
                ad.SHARE = item["INDIVIDUAL_ID"].ToString();
                ads.Add(ad);
            }
            JavaScriptSerializer jsad = new JavaScriptSerializer();

            result = "{\"result\" : \"Ok\",\"ADatas\":" + jsad.Serialize(ads) + ",\"ObjDatas\":"+ jsObj.Serialize(os)+"}";
            return result;

        }
        [WebMethod]
        public static string GetObjAdr(string Pth)
        {
            int ObjId = (int)Mydb.ExecuteScalar("GetObjId", new SqlParameter[] { new SqlParameter("@pth",Pth) }, CommandType.StoredProcedure);
            DataTable dt = Mydb.ExecuteReadertoDataTable("select o.OBJECT_ADRESS,o.OBJECT_NAME, (a.ACCOUNT_NAME + '  >  '+a.PHONE_NUMBER+'  >  '+a.E_MAIL) as Acc from OBJECT o, ACCOUNT a where o.OBJECT_ID=@oid and o.LOG_IN_ID=a.LOG_IN_ID", new SqlParameter[] {new SqlParameter("@oid",ObjId) }, CommandType.Text);
            List<ObjectS> objs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS obj = new ObjectS();
                obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                obj.ObjectPhoto = item["OBJECT_NAME"].ToString();
                obj.KladrObjectId = item["Acc"].ToString();
                obj.Object_Id = ObjId;


                objs.Add(obj);
                 
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(objs);
        }
    }
}