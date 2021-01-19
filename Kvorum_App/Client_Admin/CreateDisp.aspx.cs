using Kvorum_App.Client_Admin.Utilities;
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

namespace Kvorum_App.Client_Admin
{
    public partial class CreateDisp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string  GetNotSelObj(int ClId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select o.OBJECT_ID,o.OBJECT_ADRESS from OBJECT o where ISNULL(o.IS_DELETED,0)<>1 and CLIENT_ID=@C and o.OBJECT_ID not in(select OBJECT_ID From DISP_OBJECT)", new SqlParameter[] { new SqlParameter("@C",ClId) }, CommandType.Text);
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
        public static string getPhone()
        {
            int COuntDSPh = (int)Mydb.ExecuteScalar("select COUNT (*) from DISP_PHONES where BUSY=0", new SqlParameter[] { }, CommandType.Text);
            if (COuntDSPh!=0)
            {
                 string Phone = Mydb.ExecuteScalar(" select top 1 PHONE from DISP_PHONES where BUSY=0 order by ID asc", new SqlParameter[] { }, CommandType.Text).ToString();
            return "{\"phone\" : \"" + Phone + "\"}"; 
            }
            else
            {
              return  "{\"phone\" : \"000\"}";
            }
           
        }

        [WebMethod]
        public static string GetAccForMR(int CId, int MId, int RId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID,ACCOUNT_NAME from ACCOUNT  where CLIENT_ID=@C and LOGIN is not null  and LOG_IN_ID in (select LOG_IN_ID from ACCOUNT_ROLE where MR_ID in (select MR_ID from MODUL_ROLE where MODUL_ID=@M and ROLE_ID=@R) and LOG_IN_ID not in (select LOG_IN_ID from DISP_ACC))", new SqlParameter[] { new SqlParameter("@C",CId),new SqlParameter("@M",MId),new SqlParameter("@R",RId) }, CommandType.Text);
            List<Account_> accs = new List<Account_>();
           
            foreach (DataRow item in dt.Rows)
            {
                int MR_id = (int)Mydb.ExecuteScalar("select MR_ID from ACCOUNT_ROLE  where MR_ID in( select MR_ID from MODUL_ROLE where MODUL_ID=@m and ROLE_ID=@r)and LOG_IN_ID=@lg", new SqlParameter[] {
                    new SqlParameter("@m",MId),
                    new SqlParameter("@r",RId),
                    new SqlParameter("@lg",Convert.ToInt32(item["LOG_IN_ID"]))
                }, CommandType.Text);
                Account_ acc = new Account_();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.KPP = MR_id.ToString(); ;
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(accs);
        }
        [WebMethod]
        public static string GetTexniks(int clientId)
        {
            //int clientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            int MId = 4;
            int RId = 6;
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetAccForCLforMR", new SqlParameter[] { new SqlParameter("@C", clientId), new SqlParameter("@M", MId), new SqlParameter("@R", RId) }, CommandType.StoredProcedure);
           
            List<Account_> accs = new List<Account_>();
          

            foreach (DataRow item in dt.Rows)
            {

                Account_ acc = new Account_();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(accs);
        }
        [WebMethod]
        public static string GetEngineers(int clientId)
        {
            int MId = 4;
            int RId = 2;
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetAccForCLforMR", new SqlParameter[] { new SqlParameter("@C", clientId), new SqlParameter("@M", MId), new SqlParameter("@R", RId) }, CommandType.StoredProcedure);

            List<Account_> accs = new List<Account_>();


            foreach (DataRow item in dt.Rows)
            {

                Account_ acc = new Account_();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(accs);
        }

        [WebMethod]
        public static string CRDisp(string Dsts,string icon, string NDisp, string PhDisp,int C,List<ObjectS> objs,List<Account_>DispAcc,List<Account_>EngAcc,List<Account_>TexAcc)
        {
            Mydb.ExecuteNoNQuery("insert into DISP_ICON (DISP_ICON_IMG) values(@ic)", new SqlParameter[] { new SqlParameter("@ic", icon) }, CommandType.Text);
            int DispicId = (int)Mydb.ExecuteScalar("select top 1 DISP_ICON_ID from DISP_ICON order by DISP_ICON_ID desc", new SqlParameter[] { }, CommandType.Text);

            Mydb.ExecuteNoNQuery("insert into DISP (DISP_STATUS,DISP_NAME,DISP_PHONE_NUMBER,CLIENT_ID,DISP_ICON_ID) values(@dsts,@Dn,@Dph,@c,@ic)", new SqlParameter[] {new SqlParameter("@dsts",Dsts), new SqlParameter("@Dn",NDisp),
                new SqlParameter("@Dph",PhDisp),
                new SqlParameter("@c",C),
                new SqlParameter("@ic",DispicId)
            },CommandType.Text);
            int DispId = (int)Mydb.ExecuteScalar("select top 1 DISP_ID from DISP order by DISP_ID desc", new SqlParameter[] { }, CommandType.Text);

            foreach (ObjectS item in objs)
            {
                Mydb.ExecuteNoNQuery("insert into DISP_OBJECT (OBJECT_ID,DISP_ID) values(@oId,@Did)", new SqlParameter[] { new SqlParameter("@oId",item.Object_Id),new SqlParameter("@Did",DispId) }, CommandType.Text);
            }

            foreach (Account_ item in DispAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] {new SqlParameter("@dsp",DispId),new SqlParameter("@lg",item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,3)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId)
                
                }, CommandType.Text);
            }
            foreach (Account_ item in EngAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@dsp", DispId), new SqlParameter("@lg", item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,2)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId) 
                }, CommandType.Text);
            }

            foreach (Account_ item in TexAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@dsp", DispId), new SqlParameter("@lg", item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,6)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId) 
                }, CommandType.Text);
            }
            Mydb.ExecuteNoNQuery("Update DISP_PHONES set BUSY=1 where  PHONE=@ph", new SqlParameter[] { new SqlParameter("@ph",PhDisp) }, CommandType.Text);
            return "";
        }
    }
}