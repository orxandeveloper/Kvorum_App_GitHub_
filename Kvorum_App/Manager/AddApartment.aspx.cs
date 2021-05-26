using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.Manager.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class AddApartment : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string Get_bank_payments(string login)
        {

            return Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_Get_bank_payments", new SqlParameter[] {new SqlParameter("@LS", login) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string Get_accural_payments(string id, string login, string type)
        {

            return Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_Get_accural_payments", new SqlParameter[] {
            new SqlParameter("@id",id),new SqlParameter("@login",login),new SqlParameter("@type",type)}, CommandType.StoredProcedure); 
        }

        [WebMethod]
        public static string GetRoomTypes_ByRoomfor_(int roomf)
        {
            return Mydb.ExecuteAsJson("GetRoomTypes_ByRoomfor", new SqlParameter[] { new SqlParameter("@roomf", roomf) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string PaymenSumUpdate(List<Payment_Details> pds, string generalPost,string sc)
        {
            foreach (Payment_Details item in pds)
            {
                item.PAYMENT_SUM = (string.IsNullOrEmpty(item.PAYMENT_SUM)==true) ? "0.00" : item.PAYMENT_SUM;
                Mydb.ExecuteNoNQuery("Update DETAIL_INF set PAYMENT_SUMM=@ps where DETAIL_INF_ID=@d", new SqlParameter[] { new SqlParameter("@ps",item.PAYMENT_SUM),new SqlParameter("@d",item.DETAIL_INF_ID) }, CommandType.Text);
            }
            Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYMENT_SUMM=@ps where RECIEPT_FOR_PAYMENT_ID=(select RECIEPT_FOR_PAYMENT_ID from DETAIL_INF where DETAIL_INF_ID=@dt)", new SqlParameter[] {new SqlParameter("@ps",generalPost),new SqlParameter("@dt",Convert.ToInt32(pds[0].DETAIL_INF_ID))}, CommandType.Text);


            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from RECIEPT_FOR_PAYMENT where SCORE_ID=@sc  order by RECIEPT_FOR_PAYMENT_ID desc", new SqlParameter[] { new SqlParameter("@sc", sc) }, CommandType.Text);
            List<RFP> rfps = new List<RFP>();
            foreach (DataRow item in dt.Rows)
            {
                RFP rfp = new RFP();
                rfp.ACCURED_SUMM = item["ACCURED_SUMM"].ToString();
                rfp.BACKLOG_START = item["BACKLOG_START"].ToString();
                rfp.DATA_MOUNTH_YEAR = item["DATA_MOUNTH_YEAR"].ToString();
                rfp.PAYMENT_SUM = item["PAYMENT_SUMM"].ToString();
                rfp.RECIEPT_FOR_PAYMENT_ID = (int)item["RECIEPT_FOR_PAYMENT_ID"];
                rfp.PAY_DATE = item["PAY_DATE"].ToString();
                rfps.Add(rfp);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rfps);
        }
        [WebMethod]
        public static string SavePayments(string period, string BL,string sc ,string GENERAL_SUM, List<DETAIL_INF> dts,string received,string Accured,int Log,bool sendR)
        {
            int countPayment = (int)Mydb.ExecuteScalar("select COUNT(*) from RECIEPT_FOR_PAYMENT where DATA_MOUNTH_YEAR=@period and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@period", period), new SqlParameter("@sc",sc) }, CommandType.Text);
            string body = "";
            string IndividualDatas = Mydb.ExecuteReadertoDataTableAsJson("select * from IND_NAME where INDIVIDUAL_ID=(select top 1 INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@sc)", new SqlParameter[] { new SqlParameter("@sc", sc) }, CommandType.Text);
            dynamic json = JsonConvert.DeserializeObject(IndividualDatas);
            string email = json[0].EMAIL;
            if (sendR == true && email.Length != 0)
            {
                string fio = json[0].FIRST_NAME;
                //https://upravbot.ru/ClientLogin.aspx
                body = @"<div style=""display:block;width:100%;position:absolute;left:0;right:0;top:0;background-color:#f3f3f3;""><div style = ""display:block;margin:0 auto;max-width:700px;text-align:justify;font-family:sans-serif;color:#000033;background-color:#ffffff;padding:0 10px;""><br/><br/><p>Уважаемый(ая)<span id= ""fio""> {0} </span>!</p><br/><p>По Вашему личному счёту произведено начисление за период:</p><p><strong><span id=""datePeriod"">{1}</span></strong></p><br/><p>Вы можете оплатить и / или распечатать квитанцию в своём личном кабинете на сайте:</p><p style=""display:block;float:left;text-align:left;padding:10px30px;background-color:#328ac3;width:auto;""><a href=""{2}"" style=""color:white;text-decoration:none;"">Вход</a></p><br/><br style=""clear:both;""/><p>или в мобильном приложении:</p><p style=""display:block;text-align:left""><a href=""https://play.google.com/store/apps/details?id=ru.matorinun.matorin"" style=""color:#555ab7;cursor:pointer;text-decoration:none;""><img alt=""Наше приложение в Плей Маркете"" src=""http://matorin-un.ru/portals/0/googleplay185.png"" style=""width:185px;height:51px;"" title=""Наше приложение в Плей Маркете""></a>&nbsp;<a href=""https://itunes.apple.com/ru/app/matorin-quick/id1389783867?mt=8""><img alt = ""Наше приложение в Апсторе"" src=""http://matorin-un.ru/portals/0/appstore185_1.png"" style=""width:185px;height:51px;"" title=""Наше приложение в Апсторе""></a></p><br style=""clear:both;""/></div></div> ";
                string url = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/ClientLogin.aspx";
                body = string.Format(body, fio, period, url);

                SendMailReciept(body, email);

            }

            if (countPayment==0)

            {
                DateTime today = DateTime.Today;
                string[] date = today.ToString("d").Split('.');
                string PAY_DATE = date[2] + '-' + (Convert.ToInt32(date[1]) + 1).ToString() + '-' + 10;//PLAN_END_DATE=CAST(@Pdate as date)
                string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text).ToString();
                string CurrentDate = DateTime.Now.ToString();
                Name = Name + "|" + CurrentDate + "|Manually";

                int insertedId= (int)Mydb.ExecuteScalar("INSERT INTO RECIEPT_FOR_PAYMENT (DATA_MOUNTH_YEAR,BACKLOG_START,SCORE_ID,ACCURED_SUMM,PAY_DATE,GENERAL_SUM,RECEIVED,LOAD_TYPE)OUTPUT Inserted.RECIEPT_FOR_PAYMENT_ID VALUES(@period,@BL,@sc,@Accured,getdate(),@gs,@received,@Name)", new SqlParameter[] { new SqlParameter("@period",period),new SqlParameter("@BL",BL),new SqlParameter("@sc",sc),new SqlParameter("@Accured", Accured),new SqlParameter("@gs",GENERAL_SUM),new SqlParameter("@received", received),new SqlParameter("@Name",Name) }, CommandType.Text);
                foreach (DETAIL_INF item in dts)
                {
                    int countDetail = (int)Mydb.ExecuteScalar("select COUNT(*) from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID),new SqlParameter("@rfpId",insertedId) }, CommandType.Text);
                    if (countDetail==0)
                    {
                        Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp",item.RFP_SERVICE_ID),new SqlParameter("@rfpt",item.RFP_TYPE_ID),new SqlParameter("@accsum",item.ACCURED_SUMM),new SqlParameter("@rfptId",insertedId),new SqlParameter("@Name",Name) }, CommandType.Text);
                    }
                    else
                    {
                        Mydb.ExecuteNoNQuery("delete from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@rfpId", insertedId) }, CommandType.Text);
                        string[] paydatas = Name.Split('|');
                        string payed = (item.PAYED == 1) ? paydatas[0] + "|" + paydatas[1] : null;
                        Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE,PAYED) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name,@payed)", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@accsum", item.ACCURED_SUMM), new SqlParameter("@rfptId", insertedId),new SqlParameter("@Name",Name),new SqlParameter("@payed",payed) }, CommandType.Text);

                    }
                }
            }
            else
            {
                int hasPayment = (int)Mydb.ExecuteScalar("select RECIEPT_FOR_PAYMENT_ID from RECIEPT_FOR_PAYMENT where DATA_MOUNTH_YEAR=@period and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@period", period), new SqlParameter("@sc", sc) }, CommandType.Text);

        
                string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text).ToString();
                string CurrentDate = DateTime.Now.ToString();
                Name = Name + "|" + CurrentDate + "|Manually";
                foreach (DETAIL_INF item in dts)
                {
                    int countDetail = (int)Mydb.ExecuteScalar("select COUNT(*) from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@rfpId", hasPayment) }, CommandType.Text);
                    if (countDetail == 0)
                    {
                        Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@accsum", item.ACCURED_SUMM), new SqlParameter("@rfptId", hasPayment),new SqlParameter("@Name",Name) }, CommandType.Text);
                    }
                    else
                    {
                        Mydb.ExecuteNoNQuery("delete from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@rfpId", hasPayment) }, CommandType.Text);

                        string[] paydatas = Name.Split('|');
                        object payed = (item.PAYED == 1) ? paydatas[0] + "|" + paydatas[1] :(object) DBNull.Value; 

                        Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE,PAYED) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name,@payed)", new SqlParameter[] { new SqlParameter("@rfp", item.RFP_SERVICE_ID), new SqlParameter("@rfpt", item.RFP_TYPE_ID), new SqlParameter("@accsum", item.ACCURED_SUMM), new SqlParameter("@rfptId", hasPayment),new SqlParameter("@Name",Name),new SqlParameter("@payed",payed) }, CommandType.Text);

                    }
                }
                

                Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAY_DATE=GETDATE(),BACKLOG_START=@BL,GENERAL_SUM=@gs,ACCURED_SUMM=@Accured, RECEIVED=@received,LOAD_TYPE=@Name where DATA_MOUNTH_YEAR=@period and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@BL", BL), new SqlParameter("@gs", GENERAL_SUM), new SqlParameter("@Accured", Accured), new SqlParameter("@received", received), new SqlParameter("@Name",Name),new SqlParameter("@period", period), new SqlParameter("@sc", sc) }, CommandType.Text);
            }

            
             return Mydb.ExecuteReadertoDataTableAsJson("select * from RECIEPT_FOR_PAYMENT where SCORE_ID=@sc  order by RECIEPT_FOR_PAYMENT_ID desc", new SqlParameter[] { new SqlParameter("@sc", sc) }, CommandType.Text);
        }

        [WebMethod]
        public static string DeleteKvart(string PAY_GUID)
        {

            Mydb.ExecuteNoNQuery("TestDB.dbo.DeleteKvart", new SqlParameter[] { new SqlParameter("@PAY_GUID", PAY_GUID) }, CommandType.StoredProcedure);
            return "{\"result\" : \"ok\"}";
        }
        [WebMethod]
        public static string DeleteKvartByPeriod(string ServiceArray)
        {
            dynamic json = JsonConvert.DeserializeObject(ServiceArray);
            for (int i = 0; i < json.Count; i++)
            {
                var PAY_GUID = json[i].PAY_GUID;

                Mydb.ExecuteNoNQuery("TestDB.dbo.DeleteKvart", new SqlParameter[] { new SqlParameter("@PAY_GUID", Convert.ToString(PAY_GUID)) }, CommandType.StoredProcedure);
            }
            return "";
        }

        [WebMethod]
        public static string Save_Payments2(string arr)
        {
           
            string g = Guid.NewGuid().ToString();
            dynamic json = JsonConvert.DeserializeObject(arr);
            for (int i = 0; i < json.Count; i++)
            {
                string LS = json[i].LS;
                string ADDRESS = json[i].ADDRESS;
                string MONTH = json[i].MONTH;
                string SERVICES = json[i].SERVICES;
                string VOLUME = json[i].VOLUME;
                string UNITS = json[i].UNITS;
                string TARIFF = json[i].TARIFF;
                string ONBEGIN = json[i].ONBEGIN;
                string CONSTANT = json[i].CONSTANT;
                string LGOTA = json[i].LGOTA;
                string RECALC = json[i].RECALC;
                string OVERALL = json[i].OVERALL;
                  string PAYMENTS = json[i].PAYMENTS;
                string PAYDATE = json[i].PAYDATE;
                string SALDO = json[i].SALDO;
                //  string OVERALL2 = json[i].OVERALL2;
                string ONEND = json[i].ONEND;
                string LOAD_GUID = g;
                var PAY_GUID = json[i].PAY_GUID;
                PAY_GUID = (PAY_GUID == "0") ? DBNull.Value:Convert.ToString(PAY_GUID);
                    
                Mydb.ExecuteNoNQuery("TestDB.dbo.sp_QUICK_API_ADD_KVARTPLATA", new SqlParameter[] {
                new SqlParameter("@LS", LS),
                new SqlParameter("@ADDRESS", ADDRESS),
                new SqlParameter("@MONTH", MONTH),
                new SqlParameter("@SERVICE", SERVICES),
                new SqlParameter("@VOLUME", VOLUME),
                new SqlParameter("@UNITS", UNITS),
                new SqlParameter("@TARIFF", TARIFF),
                new SqlParameter("@ONBEGIN",ONBEGIN),
                new SqlParameter("@CONSTANT", CONSTANT),
                new SqlParameter("@LGOTA", LGOTA),
                new SqlParameter("@RECALC", RECALC),
                new SqlParameter("@OVERALL", OVERALL),
                new SqlParameter("@PAYMENTS", PAYMENTS),
                new SqlParameter("@PAYDATE",  PAYDATE),
                new SqlParameter("@SALDO", SALDO),
                new SqlParameter("@ONEND",  ONEND),
                new SqlParameter("@LOAD_GUID", LOAD_GUID),
                new SqlParameter("@PAY_GUID",PAY_GUID)
            }, CommandType.StoredProcedure);

            //    Mydb.ExecuteNoNQuery("TestDB.dbo.sp_QUICK_API_ADD_KVARTPLATA", new SqlParameter[] {
            //        new SqlParameter("@LS", LS),
            //    new SqlParameter("@ADDRESS", ADDRESS),
            //    new SqlParameter("@MONTH", SERVICE),
            //    new SqlParameter("@SERVICE","Итого за " +SERVICE+":"),
            //    new SqlParameter("@VOLUME", ""),
            //    new SqlParameter("@UNITS", ""),
            //    new SqlParameter("@TARIFF", ""),
            //    new SqlParameter("@ONBEGIN", ONBEGIN),
            //    new SqlParameter("@CONSTANT", OVERALL),
            //    new SqlParameter("@LGOTA", LGOTA),
            //    new SqlParameter("@RECALC", RECALC),
            //    new SqlParameter("@OVERALL", OVERALL2),
            //    new SqlParameter("@PAYMENTS", PAYMENTS),
            //    new SqlParameter("@PAYDATE",  ""),
            //    new SqlParameter("@SALDO", "0"),
            //    new SqlParameter("@ONEND",  OVERALL2),
            //    new SqlParameter("@LOAD_GUID", g)
            //}, CommandType.StoredProcedure);
            }
            #region OLD_CODE
            //for (int i = 0; i < json.Count; i++)
            //{
            //    string LS = json[i].LS;
            //    string ADDRESS = json[i].ADDRESS;
            //    string SERVICE = json[i].SERVICE;
            //    string VOLUME = json[i].VOLUME;
            //    string UNITS = json[i].UNITS;
            //    string TARIFF = json[i].TARIFF;
            //    string OVERALL = json[i].OVERALL;
            //    string LGOTA = json[i].LGOTA;
            //    string ONBEGIN = json[i].ONBEGIN;
            //    string RECALC = json[i].RECALC;
            //    string OVERALL2 = json[i].OVERALL2;
            //    string PAYMENTS = json[i].PAYMENTS;
            //    string ONEND = json[i].ONEND;
            //    Mydb.ExecuteNoNQuery("TestDB.dbo.sp_QUICK_API_ADD_KVARTPLATA", new SqlParameter[] {
            //    new SqlParameter("@LS", LS),
            //    new SqlParameter("@ADDRESS", ADDRESS),
            //    new SqlParameter("@MONTH", SERVICE),
            //    new SqlParameter("@SERVICE", SERVICE),
            //    new SqlParameter("@VOLUME", VOLUME),
            //    new SqlParameter("@UNITS", UNITS),
            //    new SqlParameter("@TARIFF", TARIFF),
            //    new SqlParameter("@ONBEGIN", ""),
            //    new SqlParameter("@CONSTANT", OVERALL),
            //    new SqlParameter("@LGOTA", LGOTA),
            //    new SqlParameter("@RECALC", RECALC),
            //    new SqlParameter("@OVERALL", OVERALL2),
            //    new SqlParameter("@PAYMENTS", PAYMENTS),
            //    new SqlParameter("@PAYDATE",  ""),
            //    new SqlParameter("@SALDO", "0"),
            //    new SqlParameter("@ONEND",  ""),
            //    new SqlParameter("@LOAD_GUID", g)
            //}, CommandType.StoredProcedure);

            //    Mydb.ExecuteNoNQuery("TestDB.dbo.sp_QUICK_API_ADD_KVARTPLATA", new SqlParameter[] {
            //        new SqlParameter("@LS", LS),
            //    new SqlParameter("@ADDRESS", ADDRESS),
            //    new SqlParameter("@MONTH", SERVICE),
            //    new SqlParameter("@SERVICE","Итого за " +SERVICE+":"),
            //    new SqlParameter("@VOLUME", ""),
            //    new SqlParameter("@UNITS", ""),
            //    new SqlParameter("@TARIFF", ""),
            //    new SqlParameter("@ONBEGIN", ONBEGIN),
            //    new SqlParameter("@CONSTANT", OVERALL),
            //    new SqlParameter("@LGOTA", LGOTA),
            //    new SqlParameter("@RECALC", RECALC),
            //    new SqlParameter("@OVERALL", OVERALL2),
            //    new SqlParameter("@PAYMENTS", PAYMENTS),
            //    new SqlParameter("@PAYDATE",  ""),
            //    new SqlParameter("@SALDO", "0"),
            //    new SqlParameter("@ONEND",  OVERALL2),
            //    new SqlParameter("@LOAD_GUID", g)
            //}, CommandType.StoredProcedure); 
            //}
            //string payguid = Mydb.ExecuteScalar("select PAY_GUID from TestDB.dbo.[KVARTPLATA_PAYMENTS] where LOAD_GUID=@g and [SERVICE] like '%Итого за%'", new SqlParameter[] { new SqlParameter("@g",g) }, CommandType.Text).ToString();
            //return "{\"guid\" : \"" + payguid + "'\"}";
            #endregion
            return "{\"result\" : \"ok\"}";
        }
        [WebMethod]
        public static string PayDelete(string sc , int idPay)
        {
            Mydb.ExecuteNoNQuery("delete from RECIEPT_FOR_PAYMENT where RECIEPT_FOR_PAYMENT_ID=@idPay and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@idPay",idPay),new SqlParameter("@sc",sc) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DETAIL_INF where RECIEPT_FOR_PAYMENT_ID=@idPay", new SqlParameter[] { new SqlParameter("@idPay",idPay) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string GetRFP(string sc)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from RECIEPT_FOR_PAYMENT where SCORE_ID=@sc  order by RECIEPT_FOR_PAYMENT_ID desc", new SqlParameter[] { new SqlParameter("@sc",sc) }, CommandType.Text);
            //List<RFP> rfps = new List<RFP>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    RFP rfp = new RFP();
            //    rfp.ACCURED_SUMM = item["ACCURED_SUMM"].ToString();
            //    rfp.BACKLOG_START = item["BACKLOG_START"].ToString();
            //    rfp.DATA_MOUNTH_YEAR = item["DATA_MOUNTH_YEAR"].ToString();
            //    rfp.PAYMENT_SUM = item["PAYMENT_SUMM"].ToString();
            //    rfp.RECIEPT_FOR_PAYMENT_ID = (int)item["RECIEPT_FOR_PAYMENT_ID"];
            //    rfp.PAY_DATE = item["PAY_DATE"].ToString();
            //    rfp.PAYED = item["PAYED"].ToString();
            //    rfp.GENERAL_SUM = item["GENERAL_SUM"].ToString();
            //    rfps.Add(rfp);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(rfps);

            /*select rp.* ,(select count(*) from DETAIL_INF where RECIEPT_FOR_PAYMENT_ID=rp.RECIEPT_FOR_PAYMENT_ID) as DetCount from RECIEPT_FOR_PAYMENT rp
  where rp.SCORE_ID=@sc  order by rp.RECIEPT_FOR_PAYMENT_ID desc*/


            return Mydb.ExecuteReadertoDataTableAsJson(@"GetRFP", new SqlParameter[] { new SqlParameter("@sc", sc) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetExistDetail(int rfpId)
        {
            /*select * from DETAIL_INF where RECIEPT_FOR_PAYMENT_ID=@rfpId*/
            /*
             GetExistDetail
             */

            return Mydb.ExecuteAsJson("GetDailInf_MANAGER", new SqlParameter[] { new SqlParameter("@rfpId",rfpId) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string PayedDetail(int DetId, string chk,int Log, string all, string Accured_Summ, string GENERAL_SUMM)
        {
            int rfpId = (int)Mydb.ExecuteScalar("select RECIEPT_FOR_PAYMENT_ID from DETAIL_INF where DETAIL_INF_ID=@DetId", new SqlParameter[] { new SqlParameter("@DetId", DetId) }, CommandType.Text);
            string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text).ToString();
            string CurrentDate = DateTime.Now.ToString();
            Name = Name + "|" + CurrentDate;
            if (chk=="0")
            {
               
             
                Mydb.ExecuteNoNQuery(" update DETAIL_INF set PAYED=@p where DETAIL_INF_ID=@DetId", new SqlParameter[] { new SqlParameter("@p",Name), new SqlParameter("@DetId",DetId) }, CommandType.Text);

                Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set ACCURED_SUMM=@as, GENERAL_SUM=@gs where RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] { new SqlParameter("@as",Accured_Summ),new SqlParameter("@gs",GENERAL_SUMM),new SqlParameter("@rfp",rfpId) }, CommandType.Text);

                if (all == "1")
                {
                   
                    Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYED=@name where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@name", Name), new SqlParameter("@rfpId", rfpId) }, CommandType.Text);
                }
            }
            else
            {
                Mydb.ExecuteNoNQuery(" update DETAIL_INF set PAYED=null where DETAIL_INF_ID=@DetId", new SqlParameter[] {  new SqlParameter("@DetId", DetId) }, CommandType.Text);
                //Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYED=null where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] {  new SqlParameter("@rfpId", rfpId) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set ACCURED_SUMM=@as, GENERAL_SUM=@gs where RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] { new SqlParameter("@as", Accured_Summ), new SqlParameter("@gs", GENERAL_SUMM), new SqlParameter("@rfp", rfpId) }, CommandType.Text);
                if (all == "0")
                {

                    Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYED=null where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] {new SqlParameter("@rfpId", rfpId) }, CommandType.Text);
                }
            }
            return "";
        }
        [WebMethod]
        public static string Payed(int rfpId, string chk,int Log)
        {
            if (chk=="0")
            {
                string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",Log) }, CommandType.Text).ToString();
                string CurrentDate = DateTime.Now.ToString();
                Name = Name + "|" + CurrentDate;
                Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYED=@name where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@name",Name),new SqlParameter("@rfpId", rfpId) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("update DETAIL_INF set PAYED=@p where RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] { new SqlParameter("@p",Name),new SqlParameter("@rfp",rfpId) }, CommandType.Text);
            }
            else
            {
                Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAYED = null where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfpId",rfpId) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("update DETAIL_INF set PAYED=null where RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] { new SqlParameter("@rfp", rfpId) }, CommandType.Text);
            }
            return "";
        }

        [WebMethod]
        public static string DeleteDetail_inf(int lg,int dtId)
        {
            int RECIEPT_FOR_PAYMENT_ID= (int)Mydb.ExecuteScalar("select RECIEPT_FOR_PAYMENT_ID from DETAIL_INF where DETAIL_INF_ID=@dtId", new SqlParameter[] { new SqlParameter("@dtId", dtId) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("[DELETE_DETAIL_INF]", new SqlParameter[] {new SqlParameter("@dtId", dtId),new SqlParameter("@lg",lg) }, CommandType.StoredProcedure);
            DataTable dt2 = Mydb.ExecuteReadertoDataTable("select * from DETAIL_INF where RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] { new SqlParameter("@rfp",RECIEPT_FOR_PAYMENT_ID) }, CommandType.Text);
            float gs_ = 0;
            foreach (DataRow item in dt2.Rows)
            {
                float accured = float.Parse(item["ACCURED_SUMM"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                gs_ = accured + gs_;

            }
         string   GENERAL_SUM = gs_.ToString();
            string a = gs_.ToString();
            a = a.Replace(',', '.');
            if (a.IndexOf(',') == -1)
            {

                a = a + ".00";
            }
            else
            {

                string[] c = a.Split('.');
                string b = c[1];
                if (b.Length == 1)
                {

                    a = a + "0";
                }
            }
            a = a.Substring(0, a.IndexOf('.') + 3);
            GENERAL_SUM = a;
            Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAY_DATE=GETDATE(),ACCURED_SUMM=@gs where  RECIEPT_FOR_PAYMENT_ID=@rfp", new SqlParameter[] {  new SqlParameter("@gs", GENERAL_SUM), new SqlParameter("@rfp",RECIEPT_FOR_PAYMENT_ID) }, CommandType.Text);
            return "";

        }
        [WebMethod]
        public static string GetDailInf(int rfpId)
        {
            //           DataTable dt = Mydb.ExecuteReadertoDataTable(@"
            //select dt.DETAIL_INF_ID,dt.PAYED,dt.ACCURED_SUMM,rs.SERVICE_NAME,rfpt.RECIEPT_F_P_NAME from DETAIL_INF dt 
            //inner join RECIEPT_FOR_PAYMENT_TYPE rfpt on rfpt.RECIEPT_F_P_ID=dt.RFP_TYPE_ID
            //inner join RFP_SERVICES rs on rs.RFP_SERVICE_ID=dt.RFP_SERVICE_ID and dt.RECIEPT_FOR_PAYMENT_ID=rfpId", new SqlParameter[] { new SqlParameter("@rfpId", rfpId) }, CommandType.Text);
            //           List<Payment_Details> pds = new List<Payment_Details>();
            //           foreach (DataRow item in dt.Rows)
            //           {
            //               Payment_Details pd = new Payment_Details();
            //               pd.ACCURED_SUMM = item["ACCURED_SUMM"].ToString();
            //               pd.SERVICE_NAME = item["SERVICE_NAME"].ToString();
            //               pd.DETAIL_INF_ID =(int) item["DETAIL_INF_ID"];
            //               pd.PAYMENT_SUM = item["PAYED"].ToString();
            //               pds.Add(pd);
            //           }
            //           JavaScriptSerializer js = new JavaScriptSerializer();
            //           return js.Serialize(pds);

            /*select dt.DETAIL_INF_ID,dt.PAYED,dt.ACCURED_SUMM,rs.SERVICE_NAME,rs.RFP_SERVICE_ID,rfpt.RECIEPT_F_P_ID from DETAIL_INF dt 
 inner join RECIEPT_FOR_PAYMENT_TYPE rfpt on rfpt.RECIEPT_F_P_ID=dt.RFP_TYPE_ID
 inner join RFP_SERVICES rs on rs.RFP_SERVICE_ID=dt.RFP_SERVICE_ID and dt.RECIEPT_FOR_PAYMENT_ID=@rfpId*/

            return Mydb.ExecuteAsJson(@"GetDailInf_MANAGER", new SqlParameter[] { new SqlParameter("@rfpId", rfpId) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetSeledPaymentServices(string sc, string data)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("getS_PayServices", new SqlParameter[] { new SqlParameter("@sc",sc),new SqlParameter("@data",data) }, CommandType.StoredProcedure);
            List<Payment_Details> pds = new List<Payment_Details>();
            foreach (DataRow item in dt.Rows)
            {
                Payment_Details pd = new Payment_Details();
                pd.ACCURED_SUMM = item["ACCURED_SUMM"].ToString();
                pd.PAYMENT_SUM = item["PAYMENT_SUMM"].ToString();
                pd.RECIEPT_FOR_PAYMENT_ID = (int)item["RECIEPT_FOR_PAYMENT_ID"];
                pd.RFP_SERVICE_ID = (int)item["RFP_SERVICE_ID"];
                pd.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                pd.DETAIL_INF_ID = (int)item["DETAIL_INF_ID"];
                pds.Add(pd);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pds);
                
        }
        [WebMethod]
        public static string getRelationService(int RFP_TYPE)
        {

            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from RFP_SERVICES where RFP_TYPE=@RFP_TYPE", new SqlParameter[] { new SqlParameter("@RFP_TYPE", RFP_TYPE) }, CommandType.Text);
            List<RFP_SERVICES> rss = new List<RFP_SERVICES>();
            foreach (DataRow item in dt.Rows)
            {
                RFP_SERVICES rs = new RFP_SERVICES();
                rs.RFP_SERVICE_ID = item["RFP_SERVICE_ID"].ToString();
                rs.SERVICE_NAME = item["SERVICE_NAME"].ToString();
                rss.Add(rs);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rss);

        }
        [WebMethod]
        public static string GetTipNac()
        {
           DataTable dt= Mydb.ExecuteReadertoDataTable("select * from RECIEPT_FOR_PAYMENT_TYPE", new SqlParameter[] { }, CommandType.Text);
            List <ObjectS> nacs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS nac = new ObjectS();
                nac.DOMAIN_NAME = item["RECIEPT_F_P_ID"].ToString();
                nac.MAN_COMP_NAME = item["RECIEPT_F_P_NAME"].ToString();
                nacs.Add(nac);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(nacs);
        }
        [WebMethod]
        public static string CheckEmail_or_Phone(string Email, string Phone )
        {
            string result = "";
            if (Email!="")
            {
                //
                int countEmail = (int)Mydb.ExecuteScalar("select  COUNT(*) from IND_NAME where EMAIL like'%'+ @em+'%' and IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em",Email) }, CommandType.Text);
                if (countEmail==0)
                {
                    result= "{\"result\" : \"0\"}";
                }
                else
                {
                    result= "{\"result\" : \"1\"}";
                }
            }
            if (Phone!="")
            {
                int CountPhone = (int)Mydb.ExecuteScalar("select  COUNT(*) from IND_NAME where PHONE like'%'+ @ph+'%' and IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph",Phone) }, CommandType.Text);
                if (CountPhone==0)
                {
                    result= "{\"result\" : \"0\"}";
                }
                else
                {
                    result= "{\"result\" : \"1\"}";
                }
                
            }
            return result;
        }
        [WebMethod]
        public static string CHeckPass(string p)
        {
            int Cpass = (int)Mydb.ExecuteScalar("select COUNT(*) from PER_SCORE where PASS=@p", new SqlParameter[] { new SqlParameter("@p", p) }, CommandType.Text);
            if (Cpass == 0)
            {
                return "{\"result\" : \"0\"}";
            }
            else
            {
                return "{\"result\" : \"1\"}";
            }
        }
        [WebMethod]
        public static string GenPass()
        {
            string gnpas = (string)Mydb.ExecuteScalar("select dbo.GeneratePass()", new SqlParameter[] { }, CommandType.Text);

            return "{\"result\" : \"" + gnpas + "\"}";
        }
        [WebMethod]
        public static string CHeckAccNumber(string number, int ObjId)
        {
            string Count = Mydb.ExecuteScalar("CHeckAccNumber", new SqlParameter[] { new SqlParameter("@nmbr", number), new SqlParameter("@objId", ObjId) }, CommandType.StoredProcedure).ToString();
            return "{\"result\" : \"" + Count + "\"}";
        }
        [WebMethod]
        public static string DeleteRoom(int rm)
        {
            Mydb.ExecuteNoNQuery("Update ROOM set IS_DELETED=1 where ROOM_ID=@rm", new SqlParameter[] { new SqlParameter("@rm", rm) }, CommandType.Text);

            return "";
        }
        [WebMethod]
        public static string DeleteAccData(string nmbr)
        {
            Mydb.ExecuteNoNQuery("update IND_NAME set IS_DELETED=1 where INDIVIDUAL_ID in (select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@nmbr1)", new SqlParameter[] { new SqlParameter("@nmbr1", nmbr) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("Update INDIVIDUAL_PERSCORE set IS_DELETED=1 where SCORE_ID=@nmbr", new SqlParameter[] { new SqlParameter("@nmbr", nmbr) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update PER_SCORE set IS_DELETED=1 where NUMBER=@nmbr", new SqlParameter[] { new SqlParameter("@nmbr", nmbr) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string GetBaseAccountDatas(int RoomId,int OBJECT_ID)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetScoresByRoomId", new SqlParameter[] { new SqlParameter("@rmId", RoomId) }, CommandType.StoredProcedure);//select * from PER_SCORE where ROOM_ID=@rmId and IS_DELETED=0

            List<AccountDatas_Base> acbs = new List<AccountDatas_Base>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas_Base acb = new AccountDatas_Base();
                acb.GEN_SQUARE = item["GEN_SQUARE"].ToString();
                acb.LIVE_SQUARE = item["LIVE_SQUARE"].ToString();
                acb.NUMBER = item["NUMBER"].ToString();
                acb.OWNERSHIP_TYPE_ID = Convert.ToInt32(item["OWNERSHIP_TYPE_ID"]);
                acb.ROOM_QUANT = item["ROOM_QUANT"].ToString() + "|" + item["PASS"].ToString();
                acb.WITHOUT_SUMMER_SQUARE = item["WITHOUT_SUMMER_SQUARE"].ToString();
                acb.ID = item["ID"].ToString();
                acb.ENTRANCE = System.Configuration.ConfigurationManager.AppSettings["NewStructure"];

                // acb.A_D = null;
                DataTable dt2 = Mydb.ExecuteReadertoDataTable("GetAccountDatasByScoreAndObject", new SqlParameter[] { new SqlParameter("@nmbr1", acb.NUMBER),new SqlParameter("@OBJECT_ID", OBJECT_ID) },
                    CommandType.StoredProcedure);
                /*
                 select  distinct ip.SHARE,im.* from INDIVIDUAL_PERSCORE ip INNER JOIN IND_NAME im ON ip.INDIVIDUAL_ID = im.INDIVIDUAL_ID where  im.IS_DELETED=0 and  im.INDIVIDUAL_ID in (select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@nmbr1 and IS_DELETED= 0 and OBJECT_ID=@OBJECT_ID) 
                 */
                List<AccountDatas> acs = new List<AccountDatas>();
                foreach (DataRow item2 in dt2.Rows)
                {
                    AccountDatas ac = new AccountDatas();
                    ac.EMAIL = item2["EMAIL"].ToString();
                    ac.SHARE = item2["SHARE"].ToString();
                    ac.PHONE = item2["PHONE"].ToString();
                    ac.FIRST_NAME = item2["FIRST_NAME"].ToString();
                    acs.Add(ac);

                }
                acb.A_D = acs;
                acbs.Add(acb);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(acbs);

        }

        [WebMethod]
        public static string getFirstNames(int ind)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from IND_NAME where INDIVIDUAL_ID=@ind", new SqlParameter[] { new SqlParameter("@ind", ind) }, CommandType.Text);
            List<AccountDatas> acds = new List<AccountDatas>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas acd = new AccountDatas();
                acd.EMAIL = item["EMAIL"].ToString();
                acd.FIRST_NAME = item["FIRST_NAME"].ToString();
                acd.PHONE = item["PHONE"].ToString();
                acds.Add(acd);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(acds);
        }
        [WebMethod]
        public static string getIndAndShare(string nmbr)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from INDIVIDUAL_PERSCORE where SCORE_ID=@nmbr", new SqlParameter[] { new SqlParameter("@nmbr", nmbr) }, CommandType.Text);
            List<AccountDatas> acds = new List<AccountDatas>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas acd = new AccountDatas();
                acd.SHARE = item["SHARE"].ToString();
                acd.FIRST_NAME = item["INDIVIDUAL_ID"].ToString();
                acd.PHONE = item["OWNERSHIP_TYPE_ID"].ToString();
                acds.Add(acd);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(acds);
        }

        [WebMethod]
        public static string GetRoomDetail(int RoomId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROOM where ROOM_ID=@rmId", new SqlParameter[] { new SqlParameter("@rmId", RoomId) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.OBJECT_ID = Convert.ToInt32(item["OBJECT_ID"]);
                rm.ENTRANCE = item["ENTRANCE"].ToString();
                rm.FLOOR = item["FLOOR"].ToString();
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rm.ROOM_FOR = item["ROOM_FOR_ID"].ToString();
                rm.ROOM_TYPE = item["ROOM_TYPE_ID"].ToString();
                rm.CHAMB_AMOUNT = item["CHAMB_AMOUNT"].ToString();
                rm.GEN_SQUARE = item["GEN_SQUARE"].ToString();
                rm.LIVE_SQUARE = item["LIVE_SQUARE"].ToString();
                rms.Add(rm);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);

        }
        [WebMethod]
        public static string UpdateRoom(int ROOM_ID, int OBJECT_ID, string ENTRANCE, string FLOOR, string ROOM_NUMBER, int ROOM_FOR_ID, int ROOM_TYPE_ID, int CHAMB_AMOUNT, string GEN_SQUARE, string LIVE_SQUARE, List<AccountDatas_Base> adbs)
        {
            Mydb.ExecuteNoNQuery("UpdateRoom", new SqlParameter[] {
                new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
                new SqlParameter("@ENTRANCE",ENTRANCE),
                new SqlParameter("@FLOOR",FLOOR),
                new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
                new SqlParameter("@OBJECT_ID",OBJECT_ID),
                new SqlParameter("@CHAMB_AMOUNT",CHAMB_AMOUNT),
                new SqlParameter("@GEN_SQUARE",GEN_SQUARE),
                new SqlParameter("@LIVE_SQUARE",LIVE_SQUARE),
                new SqlParameter("@ROOM_FOR_ID",ROOM_FOR_ID),
                new SqlParameter("@ROOM_ID",ROOM_ID)
            }, CommandType.StoredProcedure);







            #region sendinDatasToTenents
            foreach (var item in adbs)
            {
                string[] array = item.NUMBER.Split('|');
                string Sc = array[0];
                int Has_ind = (int)Mydb.ExecuteScalar("select COUNT(*) from INDIVIDUAL_PERSCORE where SCORE_ID=@sc and OBJECT_ID=@OBJECT_ID and IS_DELETED=0", new SqlParameter[] { new SqlParameter("@sc", Sc), new SqlParameter("@OBJECT_ID", OBJECT_ID) }, CommandType.Text);
                if (Has_ind < item.A_D.Count)
                {
                    string[] scores = item.NUMBER.Split('|');
                    string score = scores[0];//select ISNULL(PASS,'0') from PER_SCORE where SCORE_ID=@sc and  IS_DELETED='0'

                    //select ISNULL(PASS,'0') from PER_SCORE where SCORE_ID=@sc and OBJECT_ID=@OBJECT_ID and  IS_DELETED='0'

                    string Pass = (string)Mydb.ExecuteScalar("GivePassByScore_by_object", new SqlParameter[] { new SqlParameter("@sc", score), new SqlParameter("@OBJECT_ID", OBJECT_ID) }, CommandType.StoredProcedure);
                    // Pass = (string.IsNullOrEmpty(Pass)) ? "0" : Pass;
                    if (Pass == scores[1])
                    {
                        foreach (var itemA_D in item.A_D)
                        {
                            if (itemA_D.EMAIL.Length != 0)//If email is not empty
                            {
                                //select COUNT(*) from IND_NAME where EMAIL=@em and  IS_DELETED='0'
                                //(int)Mydb.ExecuteScalar("Is_sended_sms_email", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL),new SqlParameter("@sc", score) }, CommandType.StoredProcedure);
                                int EmC = Is_sended_sms_email(score, em: itemA_D.EMAIL);
                                if (EmC != 0)//if in db has email
                                {
                                    //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where EMAIL=@em and EMAIL_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL) }, CommandType.Text);
                                    int isSendEm = Is_sended_sms_email(score, em: itemA_D.EMAIL, ok_: "1");
                                    if (isSendEm != 0)
                                    {
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";//if email is send then plus ~ icon

                                    }
                                    else
                                    {
                                        // if has in db but not sended email
                                        //    SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                        Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");
                                        //gonderildikten sonra yine bir ibare koyuyoruz
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                    }
                                }
                                else
                                {
                                    //email gonderilecek
                                    //  SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                    Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вашего лицевого счёта создан пароль");
                                    //after sending plus icon ~
                                    itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                }
                            }
                            if (itemA_D.PHONE.Length != 0)// If Phone is not empty
                            {
                                int phC = Is_sended_sms_email(score, ph: itemA_D.PHONE);
                                //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                if (phC != 0)//if this phone has in db
                                {
                                    //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and SMS_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                    int isSendPh = Is_sended_sms_email(score, ph: itemA_D.PHONE,ok_:"1");
                                    if (isSendPh != 0)
                                    {
                                        itemA_D.PHONE = itemA_D.PHONE + "~";// if sended sms then plus icon ~
                                    }
                                    else
                                    {
                                        string lc = item.NUMBER;
                                        string[] lc_arr = lc.Split('|');

                                        // in db exists phone number but not sended sms
                                        //  SendSms(itemA_D.PHONE, OBJECT_ID, score, lc_arr[1].ToString());
                                        SendSms(itemA_D.PHONE, score, Pass, "Dlya Vashego litsevogo scheta sozdan parol’");
                                        //after sendinng plus icon ~
                                        itemA_D.PHONE = itemA_D.PHONE + "~";
                                    }

                                }
                                else
                                {
                                    //email gonderilecek
                                    string lc = item.NUMBER;
                                    string[] lc_arr = lc.Split('|');
                                    //   SendSms(itemA_D.PHONE, OBJECT_ID, score, lc_arr[1].ToString());
                                    SendSms(itemA_D.PHONE, score, Pass, "Dlya Vashego litsevogo scheta sozdan parol’");
                                    //gonderildikten sonra yine bir ibare koyuyoruz
                                    itemA_D.PHONE = itemA_D.PHONE + "~";
                                }
                            }
                        }
                    }
                    else
                    {// eger yeni bir sifre girilmiwse 
                        string[] scores_Pass_sms_em = item.NUMBER.Split('|');
                        foreach (var itemA_D in item.A_D)
                        {
                            string has_sms = scores_Pass_sms_em[2];
                            string S_Core = scores_Pass_sms_em[0];
                            string has_em = scores_Pass_sms_em[3];
                            string Pas_s = scores_Pass_sms_em[1];
                            string srok = (scores_Pass_sms_em[4] == "0") ? "у пароля неограниченный срок действия" : scores_Pass_sms_em[4];
                            if (has_sms == "has")// eger sms gonderilecek ise
                            {
                                // SendSms(itemA_D.PHONE, OBJECT_ID, S_Core, Pas_s);// sms gonderilecek
                                SendSms(itemA_D.PHONE, S_Core, Pas_s, "Dlya Vas sozdan novyi parol'");
                                //sms gonderildikten sonra phone bir ibare koyulacaq
                                itemA_D.PHONE = itemA_D.PHONE + "~";
                            }
                            if (has_em == "has")
                            {
                                // SendMail(OBJECT_ID, S_Core, Pas_s, itemA_D.EMAIL, srok);// email gonderilecek
                                // email gonderildikten sonra email e bir ibare koyulacak
                                Apartments.SendMail(S_Core, Pas_s, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");
                                itemA_D.EMAIL = itemA_D.EMAIL + "~";
                            }
                        }
                    }
                }
                if (Has_ind > item.A_D.Count)
                {
                    string[] scores = item.NUMBER.Split('|');
                    string score = scores[0];//select ISNULL(PASS,'0') from PER_SCORE where SCORE_ID=@sc and  IS_DELETED='0'
                    //
                    string Pass = (string)Mydb.ExecuteScalar("GivePassByScore_by_object", new SqlParameter[] { new SqlParameter("@sc", score), new SqlParameter("@OBJECT_ID", OBJECT_ID) }, CommandType.StoredProcedure);
                    Pass = (string.IsNullOrEmpty(Pass)) ? "0" : Pass;
                    if (Pass == scores[1])
                    {
                        foreach (var itemA_D in item.A_D)
                        {
                            if (itemA_D.EMAIL.Length != 0)//if email is not empty
                            {//(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where EMAIL=@em and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL) }, CommandType.Text);
                                int EmC = Is_sended_sms_email(score, em: itemA_D.EMAIL);
                                if (EmC != 0)//if email exists in db
                                {
                                    int isSendEm = Is_sended_sms_email(score, em: itemA_D.EMAIL,ok_:"1");
                                    // (int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where EMAIL=@em and EMAIL_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL) }, CommandType.Text);
                                    if (isSendEm != 0)
                                    {
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";// if email is sended then plus icon ~

                                    }
                                    else
                                    {
                                        // exists in db but not sended email
                                        // SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                        Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                    }

                                }
                                else
                                {
                                    //send email
                                    //  SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                    Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вас создан  пароль");
                                     
                                    itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                }
                            }
                            if (itemA_D.PHONE.Length != 0)
                            {
                                int phC = Is_sended_sms_email(score, ph: itemA_D.PHONE);
                                    //
                                   // (int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                if (phC != 0)//if phone exists in db
                                {
                                    int isSendPh = Is_sended_sms_email(score, ph: itemA_D.PHONE,ok_:"1");
                                    //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and SMS_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                    if (isSendPh != 0)
                                    {
                                        itemA_D.PHONE = itemA_D.PHONE + "~";// 
                                    }
                                    else
                                    {
                                        // if exists in db but not sended sms
                                        //    SendSms(itemA_D.PHONE, OBJECT_ID, score, scores[1].ToString());
                                        SendSms(itemA_D.PHONE, score, Pass, "Dlya Vas sozdan parol'");
                                        
                                        itemA_D.PHONE = itemA_D.PHONE + "~";
                                    }
                                }
                                else
                                {
                                    //sending sms
                                    SendSms(itemA_D.PHONE, score, Pass, "Dlya Vas sozdan parol'"); //  SendSms(itemA_D.PHONE, OBJECT_ID, score, scores[1].ToString());
                                    //gonderildikten sonra yine bir ibare koyuyoruz
                                    itemA_D.PHONE = itemA_D.PHONE + "~";
                                }
                            }
                        }
                    }
                    else
                    {
                        string[] scores_Pass_sms_em = item.NUMBER.Split('|');
                        foreach (var itemA_D in item.A_D)
                        {
                            string has_sms = scores_Pass_sms_em[2];
                            string S_Core = scores_Pass_sms_em[0];
                            string has_em = scores_Pass_sms_em[3];
                            string Pas_s = scores_Pass_sms_em[1];
                            string srok = (scores_Pass_sms_em[4] == "0") ? "у пароля неограниченный срок действия" : scores_Pass_sms_em[4];
                            if (has_sms == "has")// if need send sms
                            {
                                SendSms(itemA_D.PHONE, score, Pas_s, "Dlya Vas sozdan parol'"); // SendSms(itemA_D.PHONE, OBJECT_ID, S_Core, Pas_s);// sms gonderilecek
                                //sms gonderildikten sonra phone bir ibare koyulacaq
                                itemA_D.PHONE = itemA_D.PHONE + "~";
                            }
                            if (has_em == "has")
                            {
                                Apartments.SendMail(score, Pas_s, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");
                                //  SendMail(OBJECT_ID, S_Core, Pas_s, itemA_D.EMAIL, srok);// email gonderilecek
                                // email gonderildikten sonra email e bir ibare koyulacak
                                itemA_D.EMAIL = itemA_D.EMAIL + "~";
                            }
                        }
                    }
                }
                if (Has_ind == item.A_D.Count)
                {
                    string[] scores = item.NUMBER.Split('|');
                    string score = scores[0];
                    string Pass = (string)Mydb.ExecuteScalar("GivePassByScore_by_object", new SqlParameter[] { new SqlParameter("@sc", score), new SqlParameter("@OBJECT_ID", OBJECT_ID) }, CommandType.StoredProcedure);
                    Pass = (string.IsNullOrEmpty(Pass)) ? "0" : Pass;
                    if (Pass == scores[1])
                    {
                        foreach (var itemA_D in item.A_D)
                        {
                            if (itemA_D.EMAIL.Length != 0)//Eger Email bos degilse
                            {
                                int EmC = Is_sended_sms_email(score, em: itemA_D.EMAIL);
                                //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where EMAIL=@em and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL) }, CommandType.Text);
                                if (EmC != 0)//bu email db de varsa 
                                {
                                    int isSendEm = Is_sended_sms_email(score, em: itemA_D.EMAIL,ok_:"1");
                                    //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where EMAIL=@em and EMAIL_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@em", itemA_D.EMAIL) }, CommandType.Text);
                                    if (isSendEm != 0)
                                    {
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";// gonderilmise eger bir ibare koyuyoruz

                                    }
                                    else
                                    {
                                        // db de var ama email gonderilmemis
                                        Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");    // SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                        //gonderildikten sonra yine bir ibare koyuyoruz
                                        itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                    }

                                }
                                else
                                {
                                    //email gonderilecek
                                    Apartments.SendMail(score, Pass, itemA_D.EMAIL, "0", "Для Вас создан  пароль");  //SendMail(OBJECT_ID, score, Pass, itemA_D.EMAIL, scores[4]);
                                    //gonderildikten sonra yine bir ibare koyuyoruz
                                    itemA_D.EMAIL = itemA_D.EMAIL + "~";
                                }
                            }
                            if (itemA_D.PHONE.Length != 0)
                            {
                                int phC = Is_sended_sms_email(score, ph: itemA_D.PHONE);
                                //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                if (phC != 0)//bu Phone db de varsa
                                {
                                    int isSendPh = Is_sended_sms_email(score, ph: itemA_D.PHONE,ok_:"1");
                                    //(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where PHONE=@ph and SMS_OK='1' and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@ph", itemA_D.PHONE) }, CommandType.Text);
                                    if (isSendPh != 0)
                                    {
                                        itemA_D.PHONE = itemA_D.PHONE + "~";// sms gonderilmis ise eger ibare koyuyoruz
                                    }
                                    else
                                    {
                                        // db de var ama sms gonderilmemis
                                        //  SendSms(itemA_D.PHONE, OBJECT_ID, score, scores[1].ToString());
                                        SendSms(itemA_D.PHONE, score, Pass, "Dlya Vas sozdan parol'");
                                        //gonderildikten sonra yine bir ibare koyuyoruz
                                        itemA_D.PHONE = itemA_D.PHONE + "~";
                                    }
                                }
                                else
                                {
                                    //email gonderilecek
                                    //  SendSms(itemA_D.PHONE, OBJECT_ID, score, scores[1].ToString());
                                    SendSms(itemA_D.PHONE, score, Pass, "Dlya Vas sozdan parol'");
                                    //gonderildikten sonra yine bir ibare koyuyoruz
                                    itemA_D.PHONE = itemA_D.PHONE + "~";
                                }
                            }
                        }
                    }
                    else
                    {
                        string[] scores_Pass_sms_em = item.NUMBER.Split('|');
                        foreach (var itemA_D in item.A_D)
                        {
                            string has_sms = scores_Pass_sms_em[2];
                            string S_Core = scores_Pass_sms_em[0];
                            string has_em = scores_Pass_sms_em[3];
                            string Pas_s = scores_Pass_sms_em[1];
                            string srok = (scores_Pass_sms_em[4] == "0") ? "у пароля неограниченный срок действия" : scores_Pass_sms_em[4];
                            if (has_sms == "has")// eger sms gonderilecek ise
                            {
                                //   SendSms(itemA_D.PHONE, OBJECT_ID, S_Core, Pas_s);// sms gonderilecek
                                SendSms(itemA_D.PHONE, score, Pas_s, "Dlya Vas sozdan novyi parol'");
                                //sms gonderildikten sonra phone bir ibare koyulacaq
                                itemA_D.PHONE = itemA_D.PHONE + "~";
                            }
                            if (has_em == "has")
                            {
                                // SendMail(OBJECT_ID, S_Core, Pas_s, itemA_D.EMAIL, srok);// email gonderilecek
                                Apartments.SendMail(score, Pas_s, itemA_D.EMAIL, "0", "Для Вас создан новый пароль");
                                // email gonderildikten sonra email e bir ibare koyulacak
                                itemA_D.EMAIL = itemA_D.EMAIL + "~";
                            }
                        }
                    }
                }
            }
            #endregion
            //accound datyasi control ele eger vari tabaninda nomre deyisibse mesaj ve ya sms gonder yox eger teze elave elenibse yene mesaj gonder...
            #region OldCoSmsCodes
            //foreach (AccountDatas_Base item in adbs)
            //{
            //    string[] scores = item.NUMBER.Split('|');
            //    string score = scores[0];

            //    DataTable dt_Ind_id = Mydb.ExecuteReadertoDataTable("select INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID in (select SCORE_ID from PER_SCORE where ROOM_ID=@rm)", new SqlParameter[] { new SqlParameter("@rm", ROOM_ID) }, CommandType.Text);
            //    foreach (AccountDatas item_ads in item.A_D)
            //    {
            //        string Pass = (string)Mydb.ExecuteScalar("select PASS from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", score) }, CommandType.Text);
            //        if (dt_Ind_id.Rows.Count != 0)
            //        {
            //            foreach (DataRow item_ind in dt_Ind_id.Rows)
            //            {
                           
            //                Pass = (string.IsNullOrEmpty(Pass)) ? "0" : Pass;
            //                if (Pass != scores[1])
            //                {

            //                    string Phone = (string)Mydb.ExecuteScalar("select PHONE from IND_NAME where INDIVIDUAL_ID=@indId", new SqlParameter[] { new SqlParameter("@indId", Convert.ToInt32(item_ind["INDIVIDUAL_ID"])) }, CommandType.Text);

            //                    if (Phone != item_ads.PHONE)
            //                    {
            //                        string has_sms = scores[2];


            //                        if (has_sms == "has")
            //                        {
            //                            #region sendSms
            //                            SendSms(item_ads.PHONE, score, Pass, "G");
            //                            //string nm = item_ads.PHONE;
            //                            //nm = "7" + nm;
            //                            //nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ');
            //                            //nm = nm.Replace(" ", string.Empty);
            //                            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
            //                            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //                            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
            //                            //string text = "Uvazhaemyj zhitel'! Vam vystavlen schet za ZHKU. Dlya oplaty ispol'zujte mobil'prilozhenie: " + protocol + ". Vash MATORIN";
            //                            //string URL = "https://my5.t-sms.ru/sendsms.php?user=MATORIN&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
            //                            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            //                            //request.Proxy = HttpWebRequest.DefaultWebProxy;
            //                            //request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
            //                            //request.PreAuthenticate = true;
            //                            //request.ContentType = "application/json";
            //                            //WebResponse webResponse = request.GetResponse();
            //                            //Stream webStream = webResponse.GetResponseStream();
            //                            //StreamReader responseReader = new StreamReader(webStream);
            //                            //string rspns = responseReader.ReadToEnd();

            //                            //Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
            //                            #endregion
            //                            //send Sms
            //                        }

            //                    }
            //                    string Email = (string)Mydb.ExecuteScalar("select EMAIL from IND_NAME where INDIVIDUAL_ID=@indId", new SqlParameter[] { new SqlParameter("@indId", Convert.ToInt32(item_ind["INDIVIDUAL_ID"])) }, CommandType.Text);
            //                    if (Email != item_ads.EMAIL)
            //                    {
            //                        string has_em = scores[3];
            //                        if (has_em == "has")
            //                        {
            //                            Apartments.SendMail(score, Pass, item_ads.EMAIL, "0", "G");
            //                            #region oldEmailSendingCode

            //                            //SendMail(OBJECT_ID, score,Pass, EMAIL,)
            //                            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
            //                            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //                            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //                            ////string score = datas[0];
            //                            //string pass = scores[1];
            //                            //string srok = (scores[4] == "0") ? "у пароля неограниченный срок действия" : scores[4];




            //                            //string body = @"<h4 style=""font-weight:100;""><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4><h4 style=""font - weight: 100; "">Здравствуйте! Для Вашего дома по адресу  <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">IOS</a> ) и личный кабинет на странице дома .</h4><h4 style=""font-weight: 100;"">Ваш логин: <b>""{1}""</b></h4><h4 style=""font-weight: 100;"">Ваш пароль:<b>""{2}""</b></h4><h4 style=""font-weight: 100;"">Срок действия пароля в днях:<b>""{3}""</b></h4><h4 style=""font-weight: 100;"">Вы можете поменять пароль в <a href=""#"">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4><h4 style=""font-weight: 100;"">В личном кабинете и мобильном приложении Вы сможете:</h4><img src=""https://upravbot.ru/img/prebor.jpg""><h4 style=""width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;"">Подать показания приборов учета</h4><br><img src =""https://upravbot.ru/img/money.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -4vw;""> Оплатить счет за жилищно - коммунальные услуги онлайн</h4><br><img src = ""https://upravbot.ru/img/doci.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -3vw;"" > Оформить заявку </h4><br><h4 style = ""font-weight:100"" > При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href = ""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></h4><br><h4 style = ""font-weight:100;font-style:  italic;"" > C уважением,Ваш «УПРАВБОТ».</h4> ";
            //                            //body = String.Format(body, protocol, score, pass, srok);

            //                            //Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", item_ads.EMAIL), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure); 
            //                            #endregion
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //        else
            //        {
            //            string has_sms = scores[2];

            //            string nm = item_ads.PHONE;
            //            if (has_sms == "has")
            //            {
            //                #region sendSms
            //                SendSms(nm, score, Pass, "G");
                      
            //                //nm = "7" + nm;
            //                //nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ');
            //                //nm = nm.Replace(" ", string.Empty);
            //                //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
            //                //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //                //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
            //                //string text = "Uvazhaemyj zhitel'! Vam vystavlen schet za ZHKU. Dlya oplaty ispol'zujte mobil'prilozhenie: " + protocol + ". Vash MATORIN";
            //                //string URL = "https://my5.t-sms.ru/sendsms.php?user=MATORIN&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
            //                //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            //                //request.Proxy = HttpWebRequest.DefaultWebProxy;
            //                //request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
            //                //request.PreAuthenticate = true;
            //                //request.ContentType = "application/json";
            //                //WebResponse webResponse = request.GetResponse();
            //                //Stream webStream = webResponse.GetResponseStream();
            //                //StreamReader responseReader = new StreamReader(webStream);
            //                //string rspns = responseReader.ReadToEnd();

            //                //Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
            //                #endregion
            //                //send Sms
            //            }
            //            string has_em = scores[3];
            //            if (has_em == "has")
            //            {

            //                //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
            //                //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //                //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //                ////string score = datas[0];
            //                //string pass = scores[1];
            //                //string srok = (scores[4] == "0") ? "у пароля неограниченный срок действия" : scores[4];




            //                //string body = @"<h4 style=""font-weight:100;""><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4><h4 style=""font - weight: 100; "">Здравствуйте! Для Вашего дома по адресу  <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">IOS</a> ) и личный кабинет на странице дома .</h4><h4 style=""font-weight: 100;"">Ваш логин: <b>""{1}""</b></h4><h4 style=""font-weight: 100;"">Ваш пароль:<b>""{2}""</b></h4><h4 style=""font-weight: 100;"">Срок действия пароля в днях:<b>""{3}""</b></h4><h4 style=""font-weight: 100;"">Вы можете поменять пароль в <a href=""#"">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4><h4 style=""font-weight: 100;"">В личном кабинете и мобильном приложении Вы сможете:</h4><img src=""https://upravbot.ru/img/prebor.jpg""><h4 style=""width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;"">Подать показания приборов учета</h4><br><img src =""https://upravbot.ru/img/money.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -4vw;""> Оплатить счет за жилищно - коммунальные услуги онлайн</h4><br><img src = ""https://upravbot.ru/img/doci.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -3vw;"" > Оформить заявку </h4><br><h4 style = ""font-weight:100"" > При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href = ""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></h4><br><h4 style = ""font-weight:100;font-style:  italic;"" > C уважением,Ваш «УПРАВБОТ».</h4> ";
            //                //body = String.Format(body, protocol, score, pass, srok);

            //                //Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", item_ads.EMAIL), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
            //                Apartments.SendMail(score, Pass, item_ads.EMAIL, "0", "G");
            //            }

            //        }

            //    }

            //}
            #endregion

            string allScoreGuides = "";
            foreach (AccountDatas_Base item in adbs)
            {
                allScoreGuides += item.ID + ",";
                int delete_operation = 1;
                string[] num_pass = item.NUMBER.Split('|');

            
                string[] datas = item.NUMBER.Split('|');
               // int id = (int) Mydb.ExecuteScalar("select COUNT (*) from PER_SCORE where ID=@ID", new SqlParameter[] { new SqlParameter("@ID", item.ID) },CommandType.Text);

                if (item.ID!="0")
                {
                    Mydb.ExecuteNoNQuery(@"UPDATE_PER_SCORE", new SqlParameter[] {
                    new SqlParameter("@SCORE_ID",datas[0]),
                    new SqlParameter("@NUMBER", datas[0]),

                    new SqlParameter("@ROOM_ID",ROOM_ID),
                    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    new SqlParameter("@ROOM_QUANT",Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    new SqlParameter("@WITHOUT_SUMMER_SQUARE",(item.WITHOUT_SUMMER_SQUARE==" ")?"0":item.WITHOUT_SUMMER_SQUARE),
                    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    new SqlParameter("@PASS",datas[1]),
                    new SqlParameter("@DATA_EXP",datas[4]),
                new SqlParameter("@OBJECT_ID",OBJECT_ID),
                new SqlParameter("@ID",item.ID)}, CommandType.StoredProcedure);

                    foreach (AccountDatas item2 in item.A_D)
                    {
                        string EMAIL_OK = "0";
                        string SMS_OK = "0";
                        if (item2.EMAIL.Contains("~"))
                        {
                            item2.EMAIL = item2.EMAIL.Remove(item2.EMAIL.IndexOf('~'));
                            EMAIL_OK = "1";
                        }

                        if (item2.PHONE.Contains("~"))
                        {
                            item2.PHONE = item2.PHONE.Remove(item2.PHONE.IndexOf('~'));
                            SMS_OK = "1";
                        }
                        Mydb.ExecuteNoNQuery("UPDATE_OR_INSERT_INDIVIDUAL", new SqlParameter[] {//INSERT_INDIVIDUAL MUST DELETE
                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                        new SqlParameter("@EMAIL",item2.EMAIL),
                        new SqlParameter("@PHONE",item2.PHONE),
                        new SqlParameter("@SMS_OK",SMS_OK),
                        new SqlParameter("@EMAIL_OK",EMAIL_OK),
                        new SqlParameter("@SCORE_GUID",item.ID),
                        new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                        new SqlParameter("@SHARE",item2.SHARE),
                        new SqlParameter("@OBJECT_ID",OBJECT_ID),
                        new SqlParameter("@SCORE_ID",datas[0]),
                        new SqlParameter("@COUNT_OF_INDIVIDUAL",delete_operation)
                    }, CommandType.StoredProcedure);
                        delete_operation++;
                        UpdateMySql(datas[0], item.ID);
                        
                    }

                }
                else
                {
                    string ScoreGuid=Mydb.ExecuteScalar(@"INSERT_PER_SCORE", new SqlParameter[] {
                    new SqlParameter("@SCORE_ID",datas[0]),
                    new SqlParameter("@NUMBER", datas[0]),

                    new SqlParameter("@ROOM_ID",ROOM_ID),
                    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    new SqlParameter("@ROOM_QUANT",Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    new SqlParameter("@WITHOUT_SUMMER_SQUARE",(item.WITHOUT_SUMMER_SQUARE==" ")?"0":item.WITHOUT_SUMMER_SQUARE),
                    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    new SqlParameter("@PASS",datas[1]),
                    new SqlParameter("@DATA_EXP",datas[4]),
                new SqlParameter("@OBJECT_ID",OBJECT_ID)}, CommandType.StoredProcedure).ToString();
                    string MysQlEmail = "";
                    string MySqlLAST_NAME = "";
                    if (item.A_D.Count>0)
                    {
                        MysQlEmail = item.A_D[0].EMAIL;
                        MySqlLAST_NAME = item.A_D[0].FIRST_NAME;
                    }
                    Mydb.ExecuteNoNQuery("TestDB.dbo.InsertScoreToMySql", new SqlParameter[] { new SqlParameter("@myid", ScoreGuid), new SqlParameter("@ls", datas[0]), new SqlParameter("@objId", OBJECT_ID),new SqlParameter("@pass", datas[1]),new SqlParameter("@room", ROOM_NUMBER),new SqlParameter("@email",MysQlEmail),new SqlParameter("@LAST_NAME", MySqlLAST_NAME) }, CommandType.StoredProcedure);

                    foreach (AccountDatas item2 in item.A_D)
                      {
                    string EMAIL_OK = "0";
                    string SMS_OK = "0";
                        if (item2.EMAIL.Contains("~"))
                        {
                            item2.EMAIL = item2.EMAIL.Remove(item2.EMAIL.IndexOf('~'));
                            EMAIL_OK = "1";
                        }

                        if (item2.PHONE.Contains("~"))
                        {
                            item2.PHONE = item2.PHONE.Remove(item2.PHONE.IndexOf('~'));
                            SMS_OK = "1";
                        }
                        Mydb.ExecuteNoNQuery("UPDATE_OR_INSERT_INDIVIDUAL", new SqlParameter[] {//INSERT_INDIVIDUAL MUST DELETE
                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                        new SqlParameter("@EMAIL",item2.EMAIL),
                        new SqlParameter("@PHONE",item2.PHONE),
                        new SqlParameter("@SMS_OK",SMS_OK),
                        new SqlParameter("@EMAIL_OK",EMAIL_OK),
                        new SqlParameter("@SCORE_GUID",ScoreGuid),
                        new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                        new SqlParameter("@SHARE",item2.SHARE),
                        new SqlParameter("@OBJECT_ID",OBJECT_ID),
                        new SqlParameter("@SCORE_ID",datas[0]),
                        new SqlParameter("@COUNT_OF_INDIVIDUAL",Convert.ToInt32(item.ID))
                    }, CommandType.StoredProcedure);
                  
                   
                  

                }
                }

              

            }
            //allScoreGuides = allScoreGuides.Remove(allScoreGuides.Length - 1);
            //Mydb.ExecuteNoNQuery("MakeIsDeleted_PERSCORE", new SqlParameter[] {
            //    new SqlParameter("@SCORE_GUIDS",allScoreGuides)
            //}, CommandType.StoredProcedure);

            return "";
        }

        private static void UpdateMySql(string ls, string sguid)
        {
            bool makeIt = true;
            try
            {
                if (makeIt==true)
                {//TestDB.dbo.[sp_QUICK_API_get_token_by_ls]
                    string TokenId = Mydb.ExecuteScalar("Get_Token_forUpravbotby_ls", new SqlParameter[] { new SqlParameter("@ls",ls) }, CommandType.StoredProcedure).ToString();
                    if (TokenId.Length!=0)
                    {
                        string phone = Mydb.ExecuteScalar(@"select PHONE from IND_NAME in_
                        inner join INDIVIDUAL_PERSCORE ip on in_.INDIVIDUAL_ID = ip.INDIVIDUAL_ID
                        where ip.SCORE_ID = @sc and ip.ID = @id", new SqlParameter[] { new SqlParameter("@sc",ls),new SqlParameter("@id",sguid) }, CommandType.Text).ToString();

                        string email = Mydb.ExecuteScalar(@"select EMAIL from IND_NAME in_
                        inner join INDIVIDUAL_PERSCORE ip on in_.INDIVIDUAL_ID = ip.INDIVIDUAL_ID
                        where ip.SCORE_ID = @sc and ip.ID = @id", new SqlParameter[] { new SqlParameter("@sc", ls), new SqlParameter("@id", sguid) }, CommandType.Text).ToString();
                        string fio = Mydb.ExecuteScalar(@"select FIRST_NAME from IND_NAME in_
                        inner join INDIVIDUAL_PERSCORE ip on in_.INDIVIDUAL_ID=ip.INDIVIDUAL_ID
                        where ip.SCORE_ID=@sc and ip.ID=@id", new SqlParameter[] { new SqlParameter("@sc", ls), new SqlParameter("@id", sguid) }, CommandType.Text).ToString();

                        Mydb.ExecuteNoNQuery("TestDB.dbo.sp_QUICK_API_update_profile", new SqlParameter[] { new SqlParameter("@tokenID",TokenId),new SqlParameter("@phone",phone),new SqlParameter("@fio",fio),new SqlParameter("@email",email) }, CommandType.StoredProcedure);


                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GetProtocolAndHost()
        {
            string protoc = Request.Url.Scheme + "://" + Request.Url.Host;
            return protoc;
        }

        public static int Is_sended_sms_email(string sc,dynamic  ph=null, dynamic em=null, dynamic ok_=null)
        {
            return (int)Mydb.ExecuteScalar("Is_sended_sms_email", new SqlParameter[] { new SqlParameter("@em", (em==null)?DBNull.Value:em), new SqlParameter("@sc", sc),new SqlParameter("@ph",(ph==null)?DBNull.Value:ph),new SqlParameter("@OK",(ok_==null)?DBNull.Value:ok_) }, CommandType.StoredProcedure);
        }

        public static void SendMail(int ObjecId, string score_, string pass_, string Email_, string body)
        {
            string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = pass_;
          //  string srok = (srok_ == "0") ? "у пароля неограниченный срок действия" : srok_;




            //string body = @"<h4 style=""font-weight:100;""><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4><h4 style=""font - weight: 100; "">Здравствуйте! Для Вашего дома по адресу  <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">IOS</a> ) и личный кабинет на странице дома .</h4><h4 style=""font-weight: 100;"">Ваш логин: <b>""{1}""</b></h4><h4 style=""font-weight: 100;"">Ваш пароль:<b>""{2}""</b></h4><h4 style=""font-weight: 100;"">Срок действия пароля в днях:<b>""{3}""</b></h4><h4 style=""font-weight: 100;"">Вы можете поменять пароль в <a href=""#"">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4><h4 style=""font-weight: 100;"">В личном кабинете и мобильном приложении Вы сможете:</h4><img src=""https://upravbot.ru/img/prebor.jpg""><h4 style=""width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;"">Подать показания приборов учета</h4><br><img src =""https://upravbot.ru/img/money.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -4vw;""> Оплатить счет за жилищно - коммунальные услуги онлайн</h4><br><img src = ""https://upravbot.ru/img/doci.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -3vw;"" > Оформить заявку </h4><br><h4 style = ""font-weight:100"" > При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href = ""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></h4><br><h4 style = ""font-weight:100;font-style:  italic;"" > C уважением,Ваш «УПРАВБОТ».</h4> ";
            //string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><h2>Добро пожаловать!</h2><p>Для Вашего лицевого счета создана учетная запись в&nbsp;системе «Автопилот».</p><p>Здравствуйте! Для Вашего дома по адресу <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">iOS</a> ) и&nbsp;личный кабинет на странице дома.</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Вы можете поменять пароль в&nbsp;<a href=""#"">настройках профиля</a> в&nbsp;личном кабинете или в&nbsp;мобильном приложении.</p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «Автопилот», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «Автопилот».</p></div></div>";
            //body = String.Format(body, protocol, score_, pass);

            Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
        }

        public static void SendMailReciept(string body,string Email_)
        {
            Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
        }

        public static string SendSms(string Phone_, string score_,string Pass, string G=null)
        {
            string success = "";
            
                string nm = Phone_;
                nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ').Replace('+', ' ');
                nm = nm.Replace(" ", string.Empty);
                if (nm.Length == 10)
                {
                    nm = "7" + nm;
                    // Console.WriteLine("10simvol");
                }
                if (nm.Length > 10)
                {
                    //  Console.WriteLine("nm.Length>10");
                    string is_seven = nm.Substring(0, 1);
                    if (is_seven == "8")
                    {
                        //Console.WriteLine("is_seven==8");
                        nm = nm.Remove(0, 1);
                        nm = "7" + nm;
                    }
                    is_seven = nm.Substring(0, 1);
                    if (is_seven != "7")
                    {
                        // Console.WriteLine("is_seven!=7");
                        nm = "7" + nm;
                    }
                }
                // string protocol = "test Link";//Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjectId_) }, CommandType.Text).ToString();
                // protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
                //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
                //string text = "Uvazhaemyj zhitel'! Vam vystavlen schet za ZHKU. Dlya oplaty ispol'zujte mobil'prilozhenie: " + protocol + ". Vash MATORIN";
                string protocolForApps = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
                //"http://www.matorin-un.ru/getmobile";
                string text = "Dlya Vas sozdana uchetnaya zapis' v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")"; //"Для Вас создана учётная запись в системе \"Управбот\". Логин: " + score_ + ". Пароль: " + Pass + " . Скачать приложение: " + protocolForApps;
                if (G != null)
                {
                    text = G + " v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")";
                    //"Dlya Vas sozdan parol’ v sisteme Upravbot. Login: " + score_ + ", Parol: " + Pass + " . (" + protocolForApps + ")";
                }
                string URL = "https://my5.pir.company/sendsms.php?user=matorin&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
                //https://my5.t-sms.ru/sendsms.php
                try
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
                    request.Proxy = HttpWebRequest.DefaultWebProxy;
                    request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
                    request.PreAuthenticate = true;
                    request.ContentType = "application/json";
                    WebResponse webResponse = request.GetResponse();
                    Stream webStream = webResponse.GetResponseStream();
                    StreamReader responseReader = new StreamReader(webStream);
                    string rspns = responseReader.ReadToEnd();

                    Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score_), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
                    success = "1";
                }
                catch (Exception)
                {

                    success = "0";
                } 
             
            return success;
        }
        [WebMethod]
        public static string AddNewApartment(int OBJECT_ID, string ENTRANCE, string FLOOR, string ROOM_NUMBER, int ROOM_FOR_ID, int ROOM_TYPE_ID, int CHAMB_AMOUNT, string GEN_SQUARE, string LIVE_SQUARE, List<AccountDatas_Base> adbs)
        {
            int CountRoom = (int)Mydb.ExecuteScalar("select COUNT(*) from ROOM where OBJECT_ID=@OBJECT_ID and ROOM_FOR_ID=@ROOM_FOR_ID and ROOM_NUMBER=@ROOM_NUMBER and ROOM_TYPE_ID=@ROOM_TYPE_ID", new SqlParameter[] { new SqlParameter("@OBJECT_ID", OBJECT_ID), new SqlParameter("@ROOM_FOR_ID", ROOM_FOR_ID), new SqlParameter("@ROOM_NUMBER", ROOM_NUMBER), new SqlParameter("@ROOM_TYPE_ID", ROOM_TYPE_ID) }, CommandType.Text);
            if (CountRoom == 0)
            {

                Mydb.ExecuteNoNQuery("insert into ROOM (OBJECT_ID, ENTRANCE,FLOOR,ROOM_NUMBER,ROOM_FOR_ID,ROOM_TYPE_ID,CHAMB_AMOUNT,GEN_SQUARE,LIVE_SQUARE) values (@OBJECT_ID, @ENTRANCE, @FLOOR, @ROOM_NUMBER, @ROOM_FOR_ID, @ROOM_TYPE_ID, @CHAMB_AMOUNT, @GEN_SQUARE, @LIVE_SQUARE)", new SqlParameter[] {
                new SqlParameter("@OBJECT_ID",OBJECT_ID),
                new SqlParameter("@ENTRANCE",ENTRANCE),
                new SqlParameter("@FLOOR",FLOOR),
                new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
                new SqlParameter("@ROOM_FOR_ID",ROOM_FOR_ID),
                new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
                new SqlParameter("@CHAMB_AMOUNT",CHAMB_AMOUNT),
                new SqlParameter("@GEN_SQUARE",GEN_SQUARE),
                new SqlParameter("@LIVE_SQUARE",LIVE_SQUARE)
            }, CommandType.Text);
                int LastRoomId = (int)Mydb.ExecuteScalar("select top 1 ROOM_ID from ROOM order by ROOM_ID desc", new SqlParameter[] { }, CommandType.Text);
                foreach (AccountDatas_Base item in adbs)
                {
                    string[] datas = item.NUMBER.Split('|');


                    /*insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,DATA_EXP,OBJECT_ID)values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@DATA_EXP,@OBJECT_ID)  ExecuteNoNQuery*/
                   string ScoreGuid= Mydb.ExecuteScalar("[INSERT_PER_SCORE]", new SqlParameter[] {
                    new SqlParameter("@SCORE_ID",datas[0]),
                    new SqlParameter("@NUMBER", datas[0]),

                    new SqlParameter("@ROOM_ID",LastRoomId),
                    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    new SqlParameter("@ROOM_QUANT",Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    new SqlParameter("@WITHOUT_SUMMER_SQUARE",(item.WITHOUT_SUMMER_SQUARE==" ")?"0":item.WITHOUT_SUMMER_SQUARE),
                    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    new SqlParameter("@PASS",datas[1]),
                    new SqlParameter("@DATA_EXP",datas[4]),
                    new SqlParameter("@OBJECT_ID",OBJECT_ID)

                }, CommandType.StoredProcedure).ToString();

                    string MysQlEmail = "";
                    string MySqlLAST_NAME = "";
                    if (item.A_D.Count > 0)
                    {
                        MysQlEmail = item.A_D[0].EMAIL;
                        MySqlLAST_NAME = item.A_D[0].FIRST_NAME;
                    }
                    Mydb.ExecuteNoNQuery("TestDB.dbo.InsertScoreToMySql", new SqlParameter[] { new SqlParameter("@myid", ScoreGuid), new SqlParameter("@ls", datas[0]), new SqlParameter("@objId", OBJECT_ID), new SqlParameter("@pass", datas[1]), new SqlParameter("@room", ROOM_NUMBER), new SqlParameter("@email", MysQlEmail), new SqlParameter("@LAST_NAME", MySqlLAST_NAME) }, CommandType.StoredProcedure);
                    foreach (AccountDatas item2 in item.A_D)
                    {
                        Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,'0','0')", new SqlParameter[] {
                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                        new SqlParameter("@EMAIL",item2.EMAIL),
                        new SqlParameter("@PHONE",item2.PHONE)

                    }, CommandType.Text);
                        int LastIndI_d = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);
                        string has_sms = datas[2];
                        string has_em = datas[3];
                        string nm = item2.PHONE;
                        if (has_sms == "has")
                        {
                          
                           string resultSms = SendSms(nm, datas[0], datas[1]);
                            Mydb.ExecuteNoNQuery("Update IND_NAME set SMS_OK=@smsOk where INDIVIDUAL_ID=@ind", new SqlParameter[] { new SqlParameter("@smsOk", resultSms),new SqlParameter("@ind", LastIndI_d) }, CommandType.Text);
                            #region sendSms
                            //nm = "7" + nm;
                            //nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ');
                            //nm = nm.Replace(" ", string.Empty);
                            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
                            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
                            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
                            //string protocolForApps = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/AutoPilot.aspx";
                            //string text = "Dlya Vas sozdana uchetnaya zapis. Login: " + datas[0] + ", Parol: "+ datas[1]+"."+protocol+ ". Prilozhenie: " + protocolForApps;
                            //string URL = "https://my5.t-sms.ru/sendsms.php?user=MATORIN&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
                            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
                            //request.Proxy = HttpWebRequest.DefaultWebProxy;
                            //request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
                            //request.PreAuthenticate = true;
                            //request.ContentType = "application/json";
                            //WebResponse webResponse = request.GetResponse();
                            //Stream webStream = webResponse.GetResponseStream();
                            //StreamReader responseReader = new StreamReader(webStream);
                            //string rspns = responseReader.ReadToEnd();
                            //string score = datas[0];
                            //Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
                            //Mydb.ExecuteNoNQuery("Update IND_NAME set SMS_OK='1' where INDIVIDUAL_ID=@ind", new SqlParameter[] { new SqlParameter("@ind", LastIndI_d) }, CommandType.Text);
                            #endregion
                            //send Sms
                        }
                        if (has_em == "has")
                        {
                           // string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", OBJECT_ID) }, CommandType.Text).ToString();
                         //   protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
                         //   protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
                            string score = datas[0];
                            string pass = datas[1];
                           
                            string body = @" <div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>Для Вашего лицевого счета создана учетная запись в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{0}""</b></p><p>Ваш пароль:<b>""{1}""</b></p><p>Скачать приложение Вы можете: <a href=""{2}"">https://upravbot.ru/getmobile.aspx</a></p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";
                            string mobile = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
                            body = String.Format(body, score, pass, mobile);

                            if (item2.EMAIL.Length!=0)
                            {
                                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", item2.EMAIL), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                                
                                Mydb.ExecuteNoNQuery("Update IND_NAME set EMAIL_OK='1' where INDIVIDUAL_ID=@ind", new SqlParameter[] { new SqlParameter("@ind", LastIndI_d) }, CommandType.Text); 
                            }
                        }
                        int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                        Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@SCORE_GUID) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", datas[0]), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE),new SqlParameter("@OBJECT_ID", OBJECT_ID),new SqlParameter("@SCORE_GUID",ScoreGuid) }, CommandType.Text);

                    }
                }

                return "{\"result\" : \"OK\"}";
            }
            else
            {
                return "{\"result\" : \"HAS\"}";
            }
        }
        [WebMethod]
        public static string GetOwnerShip()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from OWNERSHIP_TYPE", new SqlParameter[] { }, CommandType.Text);
            List<OWNERSHIP_TYPE> owns = new List<OWNERSHIP_TYPE>();
            foreach (DataRow item in dt.Rows)
            {
                OWNERSHIP_TYPE own = new OWNERSHIP_TYPE();
                own.OWNERSHIP_TYPE_ = item["OWNERSHIP_TYPE"].ToString();
                own.OWNERSHIP_TYPE_ID = (int)item["OWNERSHIP_TYPE_ID"];
                owns.Add(own);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(owns);
        }
        [WebMethod]
        public static string GetUproObj(int lg)
        {
            string LOGIN = Mydb.ExecuteScalar("select LOGIN from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
            if (LOGIN != "")
            {
                //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from OBJECT where LOG_IN_ID=@lg and IS_DELETED is null", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
                //List<ObjectS> objs = new List<ObjectS>();
                //foreach (DataRow item in dt.Rows)
                //{
                //    ObjectS obj = new ObjectS();
                //    obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
                //    obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                //    objs.Add(obj);
                //}
                //JavaScriptSerializer js = new JavaScriptSerializer();
                //return js.Serialize(objs);
                return Mydb.ExecuteReadertoDataTableAsJson("select OBJECT_ADRESS as ObjectAdress, OBJECT_ID as Object_Id,* from OBJECT where LOG_IN_ID=@lg and IS_DELETED is null", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            }
            else
            {
                int clientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);

                //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from OBJECT where CLIENT_ID=@c and IS_DELETED is null", new SqlParameter[] { new SqlParameter("@c", clientId) }, CommandType.Text);
                //List<ObjectS> objs = new List<ObjectS>();
                //foreach (DataRow item in dt.Rows)
                //{
                //    ObjectS obj = new ObjectS();
                //    obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
                //    obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                //    objs.Add(obj);
                // }
                //JavaScriptSerializer js = new JavaScriptSerializer();
                //return js.Serialize(objs);
                return Mydb.ExecuteReadertoDataTableAsJson("select OBJECT_ADRESS as ObjectAdress, OBJECT_ID as Object_Id,* from OBJECT  where CLIENT_ID=@c and IS_DELETED is null", new SqlParameter[] { new SqlParameter("@c",clientId) }, CommandType.Text);
            }
        }

        [WebMethod]
        public static string getRoomFor()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROOM_FOR", new SqlParameter[] { }, CommandType.Text);
            List<ROOM_FOR> rfs = new List<ROOM_FOR>();
            foreach (DataRow item in dt.Rows)
            {
                ROOM_FOR rf = new ROOM_FOR();
                rf.ROOM_FOR_ = item["ROOM_FOR"].ToString();
                rf.ROOM_FOR_ID = Convert.ToInt32(item["ROOM_FOR_ID"]);
                rf.NewStructure = System.Configuration.ConfigurationManager.AppSettings["NewStructure"];
                rfs.Add(rf);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rfs);
        }
    }
}