using Kvorum_App.Manager.Helpers;
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

namespace Kvorum_App.Manager
{
    public partial class CounterCard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string DeleteCounter(int mid)
        {
            //Mydb.ExecuteNoNQuery("update METERS set ARXIV='1' where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            int Mtype = (int)Mydb.ExecuteScalar("select TYPE_ID from VW_METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update METERS set ARXIV='1' where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            string historyText = "Счетчик перенесен в архив";
            Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),@historyText,(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from VW_METERS where METERS_ID=@mid)),'-',@METERS_ID)", new SqlParameter[] { new SqlParameter("@historyText", historyText), new SqlParameter("@mid", mid), new SqlParameter("@METERS_ID", mid) }, CommandType.Text);
            //if (Mtype==4)
            //{
            //int value1 = (int)Mydb.ExecuteScalar("select top(1) VALUE_ from METER_VALUE where METERS_ID=@mid order by DATE_ desc", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //int value2 = (int)Mydb.ExecuteScalar("select top(1) VALUE_2 from METER_VALUE where METERS_ID=@mid order by DATE_ desc", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //int value3= (int)Mydb.ExecuteScalar("select top(1) VALUE_3 from METER_VALUE where METERS_ID=@mid order by DATE_ desc", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //int valueCount = (int)Mydb.ExecuteScalar("select COUNT (*) from METER_VALUE where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            //    if (valueCount<=1)
            //    {
            //        Mydb.ExecuteNoNQuery("delete from METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);

            //        Mydb.ExecuteNoNQuery("delete from METERS_HISTORY where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //        Mydb.ExecuteNoNQuery("delete from METER_VALUE where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);

            //    }
            //    else
            //    {
                    
            //}
           // }
            //else
            //{
            //    int valueCount = (int)Mydb.ExecuteScalar("select COUNT (*) from METER_VALUE where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //    if (valueCount <= 1)
            //    {
            //        Mydb.ExecuteNoNQuery("delete from METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);

            //        Mydb.ExecuteNoNQuery("delete from METERS_HISTORY where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //        Mydb.ExecuteNoNQuery("delete from METER_VALUE where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //    else
            //    {
            //        Mydb.ExecuteNoNQuery("update METERS set ARXIV=1 where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text);
            //    }
            //}
            return "";
        }
        [WebMethod]
        public static string MakeStop(int mid, string St_date, string cmnt, string file,int lg)
        {
           // Mydb.ExecuteNoNQuery("insert into STOPED_METERS(METER_ID,DATE_STOP,COMMENT,DOC) values (@METER_ID,Cast(@DATE_STOP as date),@COMMENT,@DOC)", new SqlParameter[] { new SqlParameter("@METER_ID", mid),new SqlParameter("@DATE_STOP", St_date),new SqlParameter("@COMMENT",cmnt),new SqlParameter("@DOC",file) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update METERS set SUSBEND='1' where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("insert into METERS_HISTORY='Счетчик приостановлен. Дата выхода из строя:"+St_date+ ". Комментарий'")
            Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),'Счетчик приостановлен. Дата выхода из строя: " + St_date + ". Комментарий: " + cmnt + "', (select ACCOUNT_NAME from ACCOUNT WHERE LOG_IN_ID = @lg),@file,@mid)", new SqlParameter[] { new SqlParameter("@lg",lg),new SqlParameter("@file",file),new SqlParameter("@mid",mid) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string MakePoverka(int mid, string last, string next, string HistImg,int ObjId ,string dRemoval, string dInstal,string removal)
        {
            string Susbend = Mydb.ExecuteScalar("select SUSBEND from METERS where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.Text).ToString();
            string historyText="";
            if (Susbend=="True")
            {
                historyText = "Счетчик возобновил работу";
            }
            else
            {
                historyText = "'Была произведена поверка счетчика " + removal + ". Дата снятия: " + dRemoval + ", Дата установки: " + dInstal + " '";
            }
            Mydb.ExecuteNoNQuery("update METERS set PREVIOUS_DATE=Cast(@lst as date),NEXT_DATE=cast(@nxt as date),SUSBEND='0'  where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@lst",last),new SqlParameter("@nxt",next),new SqlParameter("@mid",mid) }, CommandType.Text);


            Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),@historyText,(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from OBJECT where OBJECT_ID =@objId)),@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@historyText",historyText),new SqlParameter("@objId",ObjId),new SqlParameter("@file",HistImg),new SqlParameter("@METERS_ID",mid) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string SaveMETERAndArxiv(int mid,int ROOM_TYPE_ID, int OBJECT_ID, string ROOM_NUMBER, string SCORE_ID, string METERS_NUMBER, int TYPE_ID, int AMUNT_TARIF, string PREVIOUS_DATE, string NEXT_DATE, string InitialDate, string file, List<MeterValue> METERS_VALUES,string PrevnxtZ)
        {

            #region oldStructure
            //Mydb.ExecuteNoNQuery("insert into METERS (ROOM_TYPE_ID,SCORE_ID,METERS_NUMBER,AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,OBJECT_ID,ARXIV) values(@ROOM_TYPE_ID,@SCORE_ID,@METERS_NUMBER,@AMUNT_TARIF,Cast(@PREVIOUS_DATE as date),cast(@NEXT_DATE as date),@TYPE_ID,@ROOM_NUMBER,@OBJECT_ID,'0')", new SqlParameter[] {
            //    new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //    new SqlParameter("@SCORE_ID",SCORE_ID),

            //    new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
            //    new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
            //    new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
            //    new SqlParameter("@NEXT_DATE",NEXT_DATE),
            //    new SqlParameter("@TYPE_ID",TYPE_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
            //    new SqlParameter("@OBJECT_ID",OBJECT_ID)
            //}, CommandType.Text); 
            #endregion
            #region NewStructure
            string SCORE_GUID = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@Sc", new SqlParameter[] { new SqlParameter("@Sc", SCORE_ID) }, CommandType.Text).ToString();
            Mydb.ExecuteNoNQuery("insert into METERS (ROOM_TYPE_ID,SCORE_ID,SCORE_GUID,METERS_NUMBER,AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,OBJECT_ID,ARXIV) values(@ROOM_TYPE_ID,@SCORE_ID,@SCORE_GUID,@METERS_NUMBER,@AMUNT_TARIF,Cast(@PREVIOUS_DATE as date),cast(@NEXT_DATE as date),@TYPE_ID,@ROOM_NUMBER,@OBJECT_ID,'0')", new SqlParameter[] {
                new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
                new SqlParameter("@SCORE_ID",SCORE_ID),
                new SqlParameter("@SCORE_GUID",SCORE_GUID),
                new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
                new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
                new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
                new SqlParameter("@NEXT_DATE",NEXT_DATE),
                new SqlParameter("@TYPE_ID",TYPE_ID),
                new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
                new SqlParameter("@OBJECT_ID",OBJECT_ID)
            }, CommandType.Text);
            #endregion
            int LastMeterId = (int)Mydb.ExecuteScalar("select top 1 METERS_ID from METERS order by METERS_ID desc", new SqlParameter[] { }, CommandType.Text);
            //if (file!="")
            //{
            //    Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(FILE_,METERS_ID) values(@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@file", file), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
            //}
            Mydb.ExecuteNoNQuery(@"insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),'Добавлен новый счетчик <' + (CONVERT(nvarchar(max), (select METERS_NUMBER from METERS where METERS_ID = @METERS_I_D))) + '> ',(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from OBJECT where OBJECT_ID =@objId)),@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@METERS_I_D", LastMeterId), new SqlParameter("@objId", OBJECT_ID), new SqlParameter("@file", file), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);

            List<string> values = new List<string>();
            foreach (MeterValue item in METERS_VALUES)
            {
                if (TYPE_ID != 4)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V", item.VALUE_), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                else
                {
                    values.Add(item.VALUE_.ToString());
                }

            }
            if (TYPE_ID == 4)
            {
                if (values.Count == 3)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@V3,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@V2", values[1]), new SqlParameter("@V3", values[2]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                if (values.Count == 2)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@V2", values[1]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                if (values.Count == 1)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V1,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
            }

            Mydb.ExecuteNoNQuery("update METERS_HISTORY set EVENT='Данный счетчик был заменен на счетчик <"+METERS_NUMBER.ToString()+">' where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("update METERS set ARXIV='1',PREVIOUS_DATE=cast(@PREVIOUS_DATE as date) where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid",mid), new SqlParameter("@PREVIOUS_DATE",PrevnxtZ) }, CommandType.Text);
            
             
               
            return "{\"result\" : \""+LastMeterId+"\"}"; ;
        }
        [WebMethod]
        public static string GetMeterHist(int mid)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from METERS_HISTORY where METERS_ID=@mid order by HYSTORY_ID desc", new SqlParameter[] {new SqlParameter("@mid",mid) }, CommandType.Text);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.PREVIOUS_DATE = item["DATETIME"].ToString();
                m.SCORE_ID = item["EVENT"].ToString();
                m.ROOM_NUMBER = item["AUTHOR"].ToString();
                m.TYPE = item["FILE_"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(ms);
        }
        [WebMethod]
        public static string UpdateMeter( int METERS_ID , int ROOM_TYPE_ID,string ROOM_NUMBER ,string SCORE_ID , string METERS_NUMBER,int TYPE_ID, int AMUNT_TARIF , string PREVIOUS_DATE , string NEXT_DATE,string IS_AUTO)
        {
            //Mydb.ExecuteNoNQuery("UPDATE METERS SET ROOM_TYPE_ID=@ROOM_TYPE_ID,SCORE_ID=@SCORE_ID,METERS_NUMBER=@METERS_NUMBER,TYPE_ID=@TYPE_ID,AMUNT_TARIF=@AMUNT_TARIF,PREVIOUS_DATE=@PREVIOUS_DATE,NEXT_DATE=@NEXT_DATE WHERE METERS_ID=@METERS_ID", new SqlParameter[] {new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //    new SqlParameter("@SCORE_ID",SCORE_ID),
            //    new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
            //    new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
            //    new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
            //    new SqlParameter("@NEXT_DATE",NEXT_DATE),
            //    new SqlParameter("@TYPE_ID",TYPE_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),new SqlParameter("@METERS_ID",METERS_ID)
            //     }, CommandType.Text);
            //string historyText = "Данные счетчика были изменены";


            //Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),@historyText,(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from VW_METERS where METERS_ID=@mid)),'-',@METERS_ID)", new SqlParameter[] { new SqlParameter("@historyText", historyText), new SqlParameter("@mid", METERS_ID), new SqlParameter("@METERS_ID", METERS_ID) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("UpdateMeter", new SqlParameter[] {new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
                new SqlParameter("@SCORE_ID",SCORE_ID),
                new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
                new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
                new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
                new SqlParameter("@NEXT_DATE",NEXT_DATE),
                new SqlParameter("@TYPE_ID",TYPE_ID),
                new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
                new SqlParameter("@METERS_ID",METERS_ID),
                new SqlParameter("@IS_AUTO",IS_AUTO)
                 }, CommandType.StoredProcedure);
            return "";  
        }
        [WebMethod]
        public static string GetPerScores(int ObjId,int rt,string rm)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PER_SCORE where ROOM_ID in ( select ROOM_ID from ROOM where OBJECT_ID=@ObjId) and IS_DELETED=0", new SqlParameter[] { new SqlParameter("@ObjId", ObjId) }, CommandType.Text);
            
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetPerScoresForCounters", new SqlParameter[] { new SqlParameter("@ObjId", ObjId), new SqlParameter("@rt", rt), new SqlParameter("@rm", rm) }, CommandType.StoredProcedure);
          List<AccountDatas_Base> adbs = new List<AccountDatas_Base>();
            foreach (DataRow item in dt.Rows)
            {
                AccountDatas_Base adb = new AccountDatas_Base() { NUMBER = item["NUMBER"].ToString() };
                adbs.Add(adb);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(adbs);
        }
        [WebMethod]
        public static string GetMeterDetail(int mid)
        {

            DataTable dt = Mydb.ExecuteReadertoDataTable("GetMeterDetail ", new SqlParameter[] { new SqlParameter("@mid", mid) }, CommandType.StoredProcedure);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["ARXIV"].ToString()+"|"+item["SUSBEND"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.ROOM_NUMBER = item["ROOM_NUMBER2"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID2"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE_ID"].ToString();
                m.IS_AUTO = item["IS_AUTO"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
    }
}