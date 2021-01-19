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
    public partial class Accounts : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetRolesNameById(int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select ROLE_NAME from ROLE where ROLE_ID in (select ROLE_ID from MODUL_ROLE where MR_ID in (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID=@log))", new SqlParameter[] { new SqlParameter("@log", lg) }, CommandType.Text);
            List<Roles> rls = new List<Roles>();
            foreach (DataRow item in dt.Rows)
            {
                Roles rl = new Roles();
                rl.ROLE_NAME = item["ROLE_NAME"].ToString();
                rls.Add(rl);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rls);
        }
        [WebMethod]
        public static string getmodulNamebyid(int Lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select MODUL_NAME from MODUL where MODUL_ID in (select MODUL_ID from MODUL_ROLE where MR_ID in (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID=@log))",new SqlParameter[] { new SqlParameter("@log",Lg) },CommandType.Text);
            List<MODUL> ms = new List<MODUL>();
            foreach (DataRow item in dt.Rows)
            {
                MODUL m = new MODUL();
                m.MODUL_NAME = item["MODUL_NAME"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
         [WebMethod]
        public static string GetACCList(int clId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_ConstructorAPI_GetAccountsList", new SqlParameter[] { new SqlParameter("@CLIENT_ID", clId) }, CommandType.StoredProcedure);

            List<Account_> accs = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {
                Account_ acc = new Account_();
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.E_MAIL = item["E_MAIL"].ToString();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                acc.PASSWORD = item["PASSWORD"].ToString();
                acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(accs);
        }
        [WebMethod]
        public static string GetAccDetail(int LogId_)
        {
            DataTable dtAcc = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId_) },CommandType.Text);
            List<Account_> accs = new List<Account_>();
            foreach (DataRow item in dtAcc.Rows)
            {
                Account_ acc = new Account_();
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.E_MAIL = item["E_MAIL"].ToString();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
              //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                acc.PASSWORD = item["PASSWORD"].ToString();
                acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                acc.LOGIN = item["LOGIN"].ToString();
                accs.Add(acc);
            }
          
            JavaScriptSerializer js_accs = new JavaScriptSerializer();
           
           

           
            int COuntOf_Mr = (int)Mydb.ExecuteScalar("select COUNT(*)from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId_) }, CommandType.Text);
           

            return js_accs.Serialize(accs); 
        }

        [WebMethod]
        public static string SearchAcc(string Stext_, int clId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("SearchAcc", new SqlParameter[] { new SqlParameter("@Stext", Stext_),new SqlParameter("@C", clId) }, CommandType.StoredProcedure);
            if (dt.Rows.Count!=0)
            {
                List<Account_> accs = new List<Account_>();
                foreach (DataRow item in dt.Rows)
                {
                    Account_ acc = new Account_();
                    acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    acc.E_MAIL = item["E_MAIL"].ToString();
                    acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                    //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                    acc.PASSWORD = item["PASSWORD"].ToString();
                    acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                    accs.Add(acc);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(accs);
            }
            else
            {
                DataTable dtm = Mydb.ExecuteReadertoDataTable("SearchForModul", new SqlParameter[] { new SqlParameter("@SModul",Stext_),new SqlParameter("@C",clId) }, CommandType.StoredProcedure);
                if (dtm.Rows.Count!=0)
                {
                    List<Account_> accs = new List<Account_>();
                    foreach (DataRow item in dtm.Rows)
                    {
                        Account_ acc = new Account_();
                        acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                        acc.E_MAIL = item["E_MAIL"].ToString();
                        acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                        //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                        acc.PASSWORD = item["PASSWORD"].ToString();
                        acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                        accs.Add(acc);
                    }
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    return js.Serialize(accs);
                }
                else
                {
                    dt = Mydb.ExecuteReadertoDataTable("SearchForRole", new SqlParameter[] { new SqlParameter("@SRole", Stext_), new SqlParameter("@C", clId) }, CommandType.StoredProcedure);
                     List<Account_> accs = new List<Account_>();
                    foreach (DataRow item in dt.Rows)
                    {
                        Account_ acc = new Account_();
                        acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                        acc.E_MAIL = item["E_MAIL"].ToString();
                        acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                        //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                        acc.PASSWORD = item["PASSWORD"].ToString();
                        acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                        accs.Add(acc);
                    }
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    return js.Serialize(accs);
                }
               
            }
           
        }
        [WebMethod]
        public static string DeleteAccount(int LogId)
        {
            Mydb.ExecuteNoNQuery("delete from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.Text);
            DataTable dt_Acc_Role = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.Text);
            List<MR> mrs = new List<MR>();
            foreach (DataRow item in dt_Acc_Role.Rows)
            {
                int Mr_Id = Convert.ToInt32(item["MR_ID"]);
                Mydb.ExecuteNoNQuery("delete from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] {new SqlParameter("@mr",Mr_Id)}, CommandType.Text);
            }

            Mydb.ExecuteNoNQuery("delete from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",LogId) }, CommandType.Text);
          return  "{\"result\" : \"1\"}";
        }



        [WebMethod]
        public static string getSortedTable(string sr_t, int C)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetAccListandSort", new SqlParameter[] { new SqlParameter("@C",C),new SqlParameter("@sort",sr_t) }, CommandType.StoredProcedure);
            List<Account_> accs = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {
                Account_ acc = new Account_();
                acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                acc.E_MAIL = item["E_MAIL"].ToString();
                acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                acc.PASSWORD = item["PASSWORD"].ToString();
                acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                accs.Add(acc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(accs);
        }

        [WebMethod]
        public static string GetHasModules(int C)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select MODUL_ID, MODUL_NAME from MODUL where MODUL_ID in(select MODUL_ID from MODUL_ROLE where MR_ID in  (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID in(select LOG_IN_ID from ACCOUNT where CLIENT_ID=@C)))", new SqlParameter[] {new SqlParameter("@C",C) }, CommandType.Text);
            List<MODUL> ms = new List<MODUL>();
            foreach (DataRow item in dt.Rows)
            {
                MODUL m = new MODUL();
                    m.MODUL_NAME = item["MODUL_NAME"].ToString();
                m.MODUL_ID = Convert.ToInt32(item["MODUL_ID"]);
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
         }
        [WebMethod]
        public static string GetHasRoles(int C)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select ROLE_ID,ROLE_NAME from ROLE where ROLE_ID in(select ROLE_ID from MODUL_ROLE where MR_ID in  (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID in(select LOG_IN_ID from ACCOUNT where CLIENT_ID=@C)))", new SqlParameter[] { new SqlParameter("@C", C) }, CommandType.Text);
            List<Roles> rls = new List<Roles>();
            foreach (DataRow item in dt.Rows)
            {
                Roles rl = new Roles();
                rl.ROLE_NAME = item["ROLE_NAME"].ToString();
                rl.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
                rls.Add(rl);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rls);

        }
        [WebMethod]
        public static string getAccForSelModul(int C, List<MODUL> modules)
        {
            DataTable dt=null;
            List<Account_> accs = new List<Account_>();
            foreach (MODUL ite_m in modules)
            {
                dt = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT where CLIENT_ID =@C and LOG_IN_ID in (select LOG_IN_ID from ACCOUNT_ROLE where MR_ID in (select MR_ID from MODUL_ROLE where MODUL_ID=@m))", new SqlParameter[] { new SqlParameter("@C",C),new SqlParameter("@m",ite_m.MODUL_ID) }, CommandType.Text);
                foreach (DataRow item in dt.Rows)
                {
                    Account_ acc = new Account_();
                    acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    acc.E_MAIL = item["E_MAIL"].ToString();
                    acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                    //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                    acc.PASSWORD = item["PASSWORD"].ToString();
                    acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                    accs.Add(acc);
                }

            }
           
           
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(accs);
            
        }
        [WebMethod]
        public static string getAccForSelRole(int C, List<Roles> rls)
        {
            DataTable dt = null;
            List<Account_> accs = new List<Account_>();
            foreach (Roles ite_m in rls)
            {
                dt = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT where CLIENT_ID =@C and LOG_IN_ID in (select LOG_IN_ID from ACCOUNT_ROLE where MR_ID in (select MR_ID from MODUL_ROLE where ROLE_ID=@R))", new SqlParameter[] {new SqlParameter("@C",C),new SqlParameter("@R",ite_m.ROLE_ID) }, CommandType.Text);
                foreach (DataRow item in dt.Rows)
                {
                    Account_ acc = new Account_();
                    acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    acc.E_MAIL = item["E_MAIL"].ToString();
                    acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                    //  acc.MODULE_ROLES = item["MODULE_ROLES"].ToString();
                    acc.PASSWORD = item["PASSWORD"].ToString();
                    acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                    accs.Add(acc);
                }
            }
            
            
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(accs);

        }

    }
}