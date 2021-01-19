using Kvorum_App.Client_Admin.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class ProfileSettings : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string ChkPass(int Log,string Pass)
        {
            string dbPass = Mydb.ExecuteScalar("select PASSWORD from ACCOUNT where LOG_IN_ID=@L", new SqlParameter[] { new SqlParameter("@L", Log) }, CommandType.Text).ToString();
            Pass = GetMd5HashData(Pass);
            if (dbPass==Pass)
            {
              return  "{\"result\" : \"0\"}";
            }
            else
            {
                return "{\"result\" : \"1\"}";
            }
        }
        [WebMethod]
        public static string GetEntityType()
        {
            List<Entity_Type> ets = new List<Entity_Type>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ENTITY_TYPE", new SqlParameter[] { }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                Entity_Type et = new Entity_Type();
                et.ENTITY_TYPE_ID = Convert.ToInt32(item["ENTITY_TYPE_ID"]);
                et.ENTITY_TYPE_NAME = item["ENTITY_TYPE_NAME"].ToString();
                ets.Add(et);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ets);
        }
        [WebMethod]
        public static string GetDetailClient(int Cl)
        {
            int countRelationalDatas =(int) Mydb.ExecuteScalar("select count(*)from ACCOUNT a,CLIENT c, ENTITY_ADRESS e, ENTITY_TYPE et where et.ENTITY_TYPE_ID = c.ENTITY_TYPE_ID and e.ADRESS_ID = c.ADRESS_ID and c.CLIENT_ID = @c", new SqlParameter[] {new SqlParameter("@c",Cl) }, CommandType.Text);

            if (countRelationalDatas==0)
            {
                DataTable dt = Mydb.ExecuteReadertoDataTable("select E_MAIL,PASSWORD from ACCOUNT where CLIENT_ID=@cl and LOGIN is null", new SqlParameter[] { new SqlParameter("@cl", Cl) }, CommandType.Text);
                List < Account_ > accs = new List<Account_>();
                foreach (DataRow item in dt.Rows)
                {
                    Account_ acc = new Account_();

                    acc.E_MAIL = item["E_MAIL"].ToString();

                    acc.PASSWORD = item["PASSWORD"].ToString();


                    accs.Add(acc);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(accs);
            }
            else
            {
                List<Account_> accs = new List<Account_>();
                DataTable dt = Mydb.ExecuteReadertoDataTable("getDetailClient", new SqlParameter[] { new SqlParameter("@c", Cl) }, CommandType.StoredProcedure);

                foreach (DataRow item in dt.Rows)
                {
                    Account_ acc = new Account_();
                    acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                    acc.COMPANY_NAME = item["COMPANY_NAME"].ToString();
                    acc.ENTITY_TYPE_ID = Convert.ToInt32(item["ENTITY_TYPE_ID"]);
                    acc.E_MAIL = item["E_MAIL"].ToString();
                    acc.HOUSE = item["HOUSE"].ToString();
                    acc.INN = item["INN"].ToString();
                    acc.KPP = item["KPP"].ToString();
                    acc.BNAME = item["BNAME"].ToString();
                    acc.INNB = item["INNB"].ToString();
                    acc.KPPB = item["KPPB"].ToString();
                    acc.ADRESS_ID = item["ADRESS_ID"].ToString();
                    acc.BIK = item["BIK"].ToString();
                    acc.BKRS = item["BKRS"].ToString();
                    acc.RS = item["RS"].ToString();
                    acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                    acc.OGRN_OGRNIP = item["OGRN_OGRNIP"].ToString();
                    acc.OKPO = item["OKPO"].ToString();
                    acc.PASSWORD = item["PASSWORD"].ToString();
                    acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();

                    accs.Add(acc);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(accs);
            }

        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
        [WebMethod]
        public static string Save_Changes(string PASSWORD,string ACCOUNT_NAME,string PHONE_NUMBER,string E_MAIL, string COMPANY_NAME,string INN,string KPP,string OGRN_OGRNIP,int ENTITY_TYPE_ID,string OKPO,string HOUSE, string BNAME,string INNB,string KPPB,string BIK,string BKRS,string RS,int CL,string FIO)
        {
            if (PASSWORD.Length!=0)
            {
                PASSWORD = GetMd5HashData(PASSWORD);
                Mydb.ExecuteNoNQuery("Update ACCOUNT set E_MAIL=@e,PHONE_NUMBER=@p,PASSWORD=@pas,ACCOUNT_NAME=@acc where CLIENT_ID=@C and Login is null", new SqlParameter[]
                {new SqlParameter("@e",E_MAIL),
            new SqlParameter("@p",PHONE_NUMBER),
            new SqlParameter("@acc",ACCOUNT_NAME),
            new SqlParameter("@C",CL),
            new SqlParameter("@pas",PASSWORD)}, CommandType.Text);
            }
            else
            {
                PASSWORD = GetMd5HashData(PASSWORD);
                Mydb.ExecuteNoNQuery("Update ACCOUNT set E_MAIL=@e,PHONE_NUMBER=@p,ACCOUNT_NAME=@acc where CLIENT_ID=@C and Login is null", new SqlParameter[]
                {new SqlParameter("@e",E_MAIL),
            new SqlParameter("@p",PHONE_NUMBER),
            new SqlParameter("@acc",ACCOUNT_NAME),
            new SqlParameter("@C",CL),}, CommandType.Text);
            }


            //Mydb.ExecuteNoNQuery("update ENTITY_ADRESS set HOUSE where ADRESS_ID=@adr", new SqlParameter[] { new SqlParameter("@adr", ADRESS_ID) }, CommandType.Text);
            /*INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);*/
            int CountEntAdres = (int)Mydb.ExecuteScalar("select COUNT(*) from CLIENT c, ENTITY_ADRESS ea where c.ADRESS_ID=ea.ADRESS_ID and c.CLIENT_ID=@c", new SqlParameter[] { new SqlParameter("@c", CL) }, CommandType.Text);

            if (CountEntAdres==0)
            {
                Mydb.ExecuteNoNQuery("insert into ENTITY_ADRESS (HOUSE) values(@adr)", new SqlParameter[] { new SqlParameter("@adr", HOUSE) }, CommandType.Text);
            }
            else
            {
                int AdressId = (int)Mydb.ExecuteScalar("select ea.ADRESS_ID from CLIENT c, ENTITY_ADRESS ea where c.ADRESS_ID=ea.ADRESS_ID and c.CLIENT_ID=@c", new SqlParameter[] { new SqlParameter("@c", CL) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("update ENTITY_ADRESS set HOUSE=@h where ADRESS_ID=@AId", new SqlParameter[] { new SqlParameter("@h", HOUSE), new SqlParameter("@AId", AdressId) }, CommandType.Text);
            }
          
            int AdresId = (int)Mydb.ExecuteScalar("select ADRESS_ID from  ENTITY_ADRESS  where HOUSE=@h", new SqlParameter[] { new SqlParameter("@h", HOUSE) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update CLIENT set COMPANY_NAME=@cn,ENTITY_TYPE_ID=@enId,INN=@inn,OGRN_OGRNIP=@ogrn, OKPO=@okpo,KPP=@kpp, BNAME=@bname,INNB=@innb,KPPB=@kppb,BIK=@bik,BKRS=@bkrs,RS=@rs, ADRESS_ID=@A_Id where CLIENT_ID=@cl", new SqlParameter[] {
                new SqlParameter("@cn",COMPANY_NAME),
                new SqlParameter("@enId",ENTITY_TYPE_ID),
                new SqlParameter("@inn",INN),
                new SqlParameter("@ogrn",OGRN_OGRNIP),
                new SqlParameter("@okpo",OKPO),
                new SqlParameter("@kpp",KPP),
                new SqlParameter("@bname",BNAME),
                new SqlParameter("@innb",INNB),
                new SqlParameter("@kppb",KPPB),
                new SqlParameter("@bik",BIK),
                new SqlParameter("@bkrs",BKRS),
                new SqlParameter("@rs",RS),
                new SqlParameter("@cl",CL),
                new SqlParameter("@A_Id",AdresId)
            }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update ACCOUNT set ACCOUNT_NAME=@f where CLIENT_ID=@C and LOGIN is null", new SqlParameter[] { new SqlParameter("@C", CL), new SqlParameter("@f", FIO) }, CommandType.Text);



            return "{\"result\" : \"1\"}";


        }
    }
}