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
        public static string GetProjectsByClient(int C)
        {
            return Mydb.ExecuteAsJson("GetProjectsByClient", new SqlParameter[] { new SqlParameter("@C", C) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetNotSelObj(int ClId, int prj)
        {

            return Mydb.ExecuteAsJson("GetNotSelObj", new SqlParameter[] { new SqlParameter("@C", ClId), new SqlParameter("@prj", prj) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string getPhone()
        {
            int COuntDSPh = (int)Mydb.ExecuteScalar("select COUNT (*) from DISP_PHONES where BUSY=0", new SqlParameter[] { }, CommandType.Text);
            if (COuntDSPh != 0)
            {
                string Phone = Mydb.ExecuteScalar(" select top 1 PHONE from DISP_PHONES where BUSY=0 order by ID asc", new SqlParameter[] { }, CommandType.Text).ToString();
                return "{\"phone\" : \"" + Phone + "\"}";
            }
            else
            {
                return "{\"phone\" : \"000\"}";
            }

        }

        [WebMethod]
        public static string GetAccForMR(int CId, int MId, int RId)
        {
            return Mydb.ExecuteAsJson("GetAccForMR", new SqlParameter[] { new SqlParameter("@C", CId), new SqlParameter("@M", MId), new SqlParameter("@R", RId) }, CommandType.StoredProcedure);
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
        public static string CRDisp(string Dsts, string icon, string NDisp, string PhDisp, int C, List<ObjectS> objs, List<Account_> DispAcc, List<Account_> Spess, List<Account_> Resps)
        {
            //Mydb.ExecuteNoNQuery("insert into DISP_ICON (DISP_ICON_IMG) values(@ic)", new SqlParameter[] { new SqlParameter("@ic", icon) }, CommandType.Text);
            //int DispicId = (int)Mydb.ExecuteScalar("select top 1 DISP_ICON_ID from DISP_ICON order by DISP_ICON_ID desc", new SqlParameter[] { }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("insert into DISP (DISP_STATUS,DISP_NAME,DISP_PHONE_NUMBER,CLIENT_ID,DISP_ICON_ID) values(@dsts,@Dn,@Dph,@c,@ic)", new SqlParameter[] {new SqlParameter("@dsts",Dsts), new SqlParameter("@Dn",NDisp),
            //    new SqlParameter("@Dph",PhDisp),
            //    new SqlParameter("@c",C),
            //    new SqlParameter("@ic",DispicId)
            //},CommandType.Text);
            //int DispId = (int)Mydb.ExecuteScalar("select top 1 DISP_ID from DISP order by DISP_ID desc", new SqlParameter[] { }, CommandType.Text);
            int DispId = Convert.ToInt32(Mydb.ExecuteScalar("CRDisp", new SqlParameter[] {
                new SqlParameter("@ic", icon),
                new SqlParameter("@dsts",Dsts),
                new SqlParameter("@Dn",NDisp),
                new SqlParameter("@Dph",PhDisp),
                new SqlParameter("@c",C)

            }, CommandType.StoredProcedure));
            foreach (ObjectS item in objs)
            {
                Mydb.ExecuteNoNQuery("InsertObjectToDisp", new SqlParameter[] { new SqlParameter("@oId", item.Object_Id), new SqlParameter("@Did", DispId) }, CommandType.StoredProcedure);
            }

            foreach (Account_ item in DispAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] {new SqlParameter("@dsp",DispId),new SqlParameter("@lg",item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("InsertAccountToDisp", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId),
                    new SqlParameter("@R",Convert.ToInt32(item.MODULE_ROLES))

                }, CommandType.Text);
            }
            foreach (Account_ item in Spess)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@dsp", DispId), new SqlParameter("@lg", item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("InsertAccountToDisp", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId),
                        new SqlParameter("@R",Convert.ToInt32(item.MODULE_ROLES))
                }, CommandType.Text);
            }

            foreach (Account_ item in Resps)
            {
                
                Mydb.ExecuteNoNQuery("InsertAccountToDisp", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DispId),
                        new SqlParameter("@R",Convert.ToInt32(item.MODULE_ROLES))
                }, CommandType.Text);
            }
            Mydb.ExecuteNoNQuery("BusyDIspPhone", new SqlParameter[] { new SqlParameter("@ph", PhDisp) }, CommandType.StoredProcedure);
            return "";
        }
    }
}