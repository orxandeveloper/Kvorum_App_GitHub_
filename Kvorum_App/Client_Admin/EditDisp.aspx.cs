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
    public partial class EditDisp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetCheckedObjects(int DD, string Cl_Id)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from OBJECT where ISNULL(IS_DELETED,0)<>1 and CLIENT_ID=@C", new SqlParameter[] { new SqlParameter("@C",Cl_Id)}, CommandType.Text);
            List<ObjectS> os = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS o = new ObjectS();
                int COuntCHecked = (int)Mydb.ExecuteScalar("select COUNT(*) from DISP_OBJECT where DISP_ID=@d and OBJECT_ID=@o",new SqlParameter[] {new SqlParameter("@d",DD),new SqlParameter("@o",Convert.ToInt32(item["OBJECT_ID"])) },CommandType.Text);

                if (COuntCHecked==1)
                {
                    o.Object_Id = Convert.ToInt32(item["Object_Id"]);
                    o.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                    o.ObjectPhoto = "1";
                }
                if (COuntCHecked==0)
                {
                    int IsOtherDispObj = (int)Mydb.ExecuteScalar("select COUNT(*) from DISP_OBJECT where  OBJECT_ID=@o", new SqlParameter[] {  new SqlParameter("@o", Convert.ToInt32(item["Object_Id"])) }, CommandType.Text);
                    if (IsOtherDispObj==0)
                    {
                        o.Object_Id = Convert.ToInt32(item["Object_Id"]);
                        o.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                        o.ObjectPhoto = "0";
                    }
                   
                }
                os.Add(o);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(os);
        }
        [WebMethod]
        public static string getDispDatas(int DD)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select d.*,dc.DISP_ICON_IMG from DISP d,DISP_ICON dc where d.DISP_ICON_ID=dc.DISP_ICON_ID and d.DISP_ID=@dd", new SqlParameter[] {new SqlParameter("@dd",DD) }, CommandType.Text);
            List<Dispatcheer> dsps = new List<Dispatcheer>();
            foreach (DataRow item in dt.Rows)
            {
                Dispatcheer d = new Dispatcheer();
                d.DISP_ICON_IMG = item["DISP_ICON_IMG"].ToString();
                d.DISP_ID = Convert.ToInt32(item["DISP_ID"]);
                d.DISP_STATUS = Convert.ToBoolean(item["DISP_STATUS"]);
                d.DISP_PHONE_NUMBER = item["DISP_PHONE_NUMBER"].ToString();
                d.DISP_NAME = item["DISP_NAME"].ToString();
                dsps.Add(d);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(dsps);
        }

        [WebMethod]
        public static string getDispsENgsTexs(int DD, int R)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("GetDispEngTex", new SqlParameter[] { new SqlParameter("@d",DD),new SqlParameter("@R",R) }, CommandType.StoredProcedure);
            //
            //foreach (DataRow item in dt.Rows)
            //{
            //    Account_ ac = new Account_();
            //    ac.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
            //    ac.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
            //    ass.Add(ac);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(ass);
            DataTable dt = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID from DISP_ACC where DISP_ID=@d and ROLE_ID=@r", new SqlParameter[] { new SqlParameter("@d", DD),new SqlParameter("@r",R) }, CommandType.Text);
            List<Account_> ass = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {


                Account_ a = new Account_();
                a.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                
                a.ACCOUNT_NAME = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(item["LOG_IN_ID"])) }, CommandType.Text).ToString();
                ass.Add(a);



            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ass);
        }
        [WebMethod]
        public static string GetNotDispAcc(int ClId,int DD)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID,ACCOUNT_NAME from ACCOUNT where CLIENT_ID=@c and LOGIN is not null and LOG_IN_ID in (select LOG_IN_ID from ACCOUNT_ROLE where MR_ID in (select MR_ID from MODUL_ROLE where ROLE_ID=6 or ROLE_ID=2 or ROLE_ID=3))", new SqlParameter[] {new SqlParameter("@c",ClId) }, CommandType.Text);
            //List<Account_> ass = new List<Account_>();
            List<Account_Disp> ads = new List<Account_Disp>();
            foreach (DataRow item in dt.Rows)
            {
              //  Account_ a = new Account_();//  
              Account_Disp ad=new Account_Disp();
                int Countlog = (int)Mydb.ExecuteScalar("select count(*) from DISP_ACC where LOG_IN_ID=@lg ", new SqlParameter[] {new SqlParameter("@lg",Convert.ToInt32(item["LOG_IN_ID"]))  }, CommandType.Text);//, new SqlParameter("@d", DD) and DISP_ID=@d
                if (Countlog==0)
                {
                    //a.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    //a.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                    //a.ENTITY_TYPE_ID = (int)Mydb.ExecuteScalar("select ROLE_ID from MODUL_ROLE where MR_ID=(select MR_ID from ACCOUNT_ROLE where LOG_IN_ID=@lg)", new SqlParameter[] { new SqlParameter("@lg", a.LOG_IN_ID) }, CommandType.Text);
                    //ass.Add(a);
                    ad.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    ad.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                    DataTable dtRoles=Mydb.ExecuteReadertoDataTable("select ROLE_ID from MODUL_ROLE where MR_ID in (select MR_ID from ACCOUNT_ROLE where LOG_IN_ID=@lg)", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(ad.LOG_IN_ID)) }, CommandType.Text);
                    List<Roles> rls = new List<Roles>();
                    foreach (DataRow itemrls in dtRoles.Rows)
                    {
                        Roles rl = new Roles();
                        rl.ROLE_ID = Convert.ToInt32(itemrls["ROLE_ID"]);
                        rls.Add(rl);
                    }
                    ad.roles = rls;
                    ads.Add(ad);

                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ads);

        }

        [WebMethod]
        public static string UpdateDisp(int DD, string icon, string NDisp, string PhDisp, List<ObjectS> objs, List<Account_> DispAcc, List<Account_> EngAcc, List<Account_> TexAcc)
        {
            int IconId = (int)Mydb.ExecuteScalar("select DISP_ICON_ID from DISP where  DISP_ID=@d", new SqlParameter[] { new SqlParameter("@d", DD) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("Update DISP_ICON set DISP_ICON_IMG=@ic where DISP_ICON_ID=@id", new SqlParameter[] { new SqlParameter("@ic",icon),new SqlParameter("@id", IconId) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("Update DISP set DISP_NAME=@Dn ,DISP_PHONE_NUMBER=@dph where DISP_ID=@d", new SqlParameter[] {new SqlParameter("@Dn",NDisp),new SqlParameter("@dph",PhDisp),new SqlParameter("@d",DD) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DISP_OBJECT where DISP_ID=@dd", new SqlParameter[] { new SqlParameter("@dd", DD) }, CommandType.Text);
            foreach (ObjectS item in objs)
            {
                Mydb.ExecuteNoNQuery("insert into DISP_OBJECT (OBJECT_ID,DISP_ID) values(@oId,@Did)", new SqlParameter[] { new SqlParameter("@oId", item.Object_Id), new SqlParameter("@Did", DD) }, CommandType.Text);
            }
           Mydb.ExecuteNoNQuery("delete from DISP_ACC where DISP_ID=@dd", new SqlParameter[] { new SqlParameter("@dd", DD) }, CommandType.Text);
            foreach (Account_ item in DispAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] {new SqlParameter("@dsp",DispId),new SqlParameter("@lg",item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,3)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DD)

                }, CommandType.Text);
            }
            foreach (Account_ item in EngAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@dsp", DispId), new SqlParameter("@lg", item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,2)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DD)
                }, CommandType.Text);
            }
            foreach (Account_ item in TexAcc)
            {
                //Mydb.ExecuteNoNQuery("Update ACCOUNT_ROLE set DISP_ID=@dsp where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@dsp", DispId), new SqlParameter("@lg", item.LOG_IN_ID) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into DISP_ACC (LOG_IN_ID,DISP_ID,ROLE_ID) values(@lg,@d,6)", new SqlParameter[] {
                    new SqlParameter("@lg",item.LOG_IN_ID),
                    new SqlParameter("@d",DD)
                }, CommandType.Text);
            }

           
            return "";
        }
        [WebMethod]
        public static string DispDelete(int DD)
        {
            int IconId = (int)Mydb.ExecuteScalar("select DISP_ICON_ID from DISP where DISP_ID=@d", new SqlParameter[] { new SqlParameter("@d",DD) }, CommandType.Text);
            string PhDisp_ = Mydb.ExecuteScalar("select DISP_PHONE_NUMBER from DISP where DISP_ID=@DD", new SqlParameter[] { new SqlParameter("@DD",DD) }, CommandType.Text).ToString();
            Mydb.ExecuteNoNQuery("Update DISP_PHONES set BUSY=0 where  PHONE=@ph", new SqlParameter[] { new SqlParameter("@ph", PhDisp_) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DISP_ICON where DISP_ICON_ID=@ic", new SqlParameter[] { new SqlParameter("@ic", IconId) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DISP_OBJECT where DISP_ID=@d", new SqlParameter[] {new SqlParameter("@d",DD) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DISP_ACC where DISP_ID=@d", new SqlParameter[] {new SqlParameter("@d",DD) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("delete from DISP where DISP_ID=@d", new SqlParameter[] { new SqlParameter("@d", DD) }, CommandType.Text);
           
           
            return "";
        }
    }
}