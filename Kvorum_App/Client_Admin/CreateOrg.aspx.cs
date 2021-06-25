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
    public partial class CreateOrg : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetDetailUO(int CLId_, int UoId_)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from MAN_COMPANY where MAN_COMPANY_ID=@id and CLIENT_ID=@ClId", new SqlParameter[] { new SqlParameter("@id", UoId_), new SqlParameter("@ClId", CLId_) }, CommandType.Text);
            DataRow item = dt.Rows[0];

          Kvorum_App.Client_Admin.Utilities.ManCompany ms = new Kvorum_App.Client_Admin.Utilities.ManCompany();
            ms.ADRESS = item["ADRESS"].ToString();
            ms.ADRESS_ID = item["ADRESS_ID"].ToString();
            ms.CLIENT_ID = Convert.ToInt32(item["CLIENT_ID"]);
            ms.EMAIL = item["EMAIL"].ToString();
            ms.FB = item["FB"].ToString();
            ms.INN = item["INN"].ToString();
            ms.KPP = item["KPP"].ToString();
            ms.LICENCE = item["LICENCE"].ToString();
            ms.MAN_COMPANY_ID = Convert.ToInt32(item["MAN_COMPANY_ID"]);
            ms.NAME = item["NAME"].ToString();
            ms.OGRN = item["OGRN_OGRNIP"].ToString();
            ms.OK = item["OK"].ToString();
            ms.OKPO = item["OKPO"].ToString();
            ms.PHONE = item["PHONE"].ToString();
            ms.TW = item["TW"].ToString();
            ms.VK = item["VK"].ToString();


            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string RelationObject(int Uo_)
        {
            string returnval = null;
            int countRelation = (int)Mydb.ExecuteScalar("select COUNT(*)  from OBJECT where MAN_COMP_ID=@uo", new SqlParameter[] { new SqlParameter("@uo", Uo_) }, CommandType.Text);
            if (countRelation==0)
            {
                returnval= "{\"result\" : \"0\"}";
            }
            if (countRelation>0)
            {
                returnval ="{\"result\" : \"1\"}";
            }
            return returnval;
        }
        [WebMethod]
        public static string UpdataUo(string MAN_COMPANY_ID,
                string INN,
                string KPP,
                string OKPO,
                string OGRN_OGRNIP,
                string NAME,
                string LICENCE,
                string ADRESS_ID,
                string ADRESS,
                string PHONE,
                string EMAIL,
                string VK,
                string OK,
                string FB,
                string TW,
                string CLIENT_ID,
                string BIK,
                string BNAME,
                string BKRS,
                string RS,
                string action,
                string shopid    )
        {
            Mydb.ExecuteNoNQuery("sp_CounstructorAPI_ADD_EDIT_DEL_UO", new SqlParameter[] { new SqlParameter("@MAN_COMPANY_ID", MAN_COMPANY_ID),
            new SqlParameter("@INN", INN),
            new SqlParameter("@KPP", KPP),
            new SqlParameter("@OKPO", OKPO),
            new SqlParameter("@OGRN_OGRNIP", OGRN_OGRNIP),
            new SqlParameter("@NAME", NAME),
            new SqlParameter("@LICENCE", LICENCE),
            new SqlParameter("@ADRESS_ID", ADRESS_ID),
            new SqlParameter("@ADRESS", ADRESS),
            new SqlParameter("@PHONE", PHONE),
            new SqlParameter("@EMAIL", EMAIL),
            new SqlParameter("@VK", VK),
            new SqlParameter("@OK", OK),
            new SqlParameter("@FB", FB),
            new SqlParameter("@TW", TW),
            new SqlParameter("@CLIENT_ID", CLIENT_ID),
            new SqlParameter("@BIK", BIK),
            new SqlParameter("@BNAME", BNAME),
            new SqlParameter("@BKRS", BKRS),
            new SqlParameter("@RS", RS),
            new SqlParameter("@action", action) }, CommandType.StoredProcedure);
            //Mydb.ExecuteNoNQuery("UPDATE [MAN_COMPANY] SET[INN] = @INN,[KPP] = @KPP,[OKPO] = @OKPO,[OGRN_OGRNIP] = @OGRN_OGRNIP,[NAME] = @NAME,[LICENCE] = @LICENCE,[ADRESS_ID] = @ADRESS_ID,[ADRESS] = @ADRESS,[PHONE] = @PHONE,[EMAIL] = @EMAIL,[VK] = @VK,[OK] = @OK,[FB] = @FB,[TW] = @TW,[CLIENT_ID] = @CLIENT_ID,[SHOP_ID]=@SHOP_ID WHERE MAN_COMPANY_ID = @MAN_COMPANY_ID", new SqlParameter[] {

            //new SqlParameter("@INN", INN), 
            //new SqlParameter("@KPP", KPP), 
            //new SqlParameter("@OKPO", OKPO), 
            //new SqlParameter("@OGRN_OGRNIP", OGRN_OGRNIP), 
            //new SqlParameter("@NAME", NAME), 
            //new SqlParameter("@LICENCE", "No Lic"),
            //new SqlParameter("@ADRESS_ID", ADRESS_ID), 
            //new SqlParameter("@ADRESS", ADRESS), 
            //new SqlParameter("@PHONE", PHONE), 
            //new SqlParameter("@EMAIL", EMAIL), 
            //new SqlParameter("@VK", VK), 
            //new SqlParameter("@OK", OK), 
            //new SqlParameter("@FB", FB), 
            //new SqlParameter("@TW", TW), 
            //new SqlParameter("@CLIENT_ID", CLIENT_ID),
            //new SqlParameter("@MAN_COMPANY_ID",MAN_COMPANY_ID),
            //new SqlParameter("@SHOP_ID",shopid)
            //},CommandType.Text);

            //Mydb.ExecuteNoNQuery("UPDATE RS SET RS=@RS, BANK_BIK_ID=@BIK, KS =@BKRS WHERE MAN_COMP_ID = @new_id", new SqlParameter[] { new SqlParameter("@RS",RS),new SqlParameter("@BIK",BIK),new SqlParameter("@BKRS",BKRS),new SqlParameter("@new_id",MAN_COMPANY_ID) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string GetUoById(int id)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_CounstructorAPI_GET_UO_by_ID", new SqlParameter[] { new SqlParameter("@MAN_COMPANY_ID", id) }, CommandType.StoredProcedure);
            List<ManCompany> mcs = new List<ManCompany>();
            foreach (DataRow dr in dt.Rows)
            {
                ManCompany row = new ManCompany();
                row.MAN_COMPANY_ID =Convert.ToInt32(dr["MAN_COMPANY_ID"]);
                row.INN = dr["INN"].ToString();
                row.KPP = dr["KPP"].ToString();
                row.OKPO = dr["OKPO"].ToString();
                row.OGRN = dr["OGRN_OGRNIP"].ToString();
                row.NAME = dr["NAME"].ToString();
                row.LICENCE = dr["LICENCE"].ToString();
                row.ADRESS_ID = dr["ADRESS_ID"].ToString();
                row.ADRESS = dr["ADRESS"].ToString();
                row.PHONE = dr["PHONE"].ToString();
                row.EMAIL = dr["EMAIL"].ToString();
                row.VK = dr["VK"].ToString();
                row.OK = dr["OK"].ToString();
                row.FB = dr["FB"].ToString();
                row.TW = dr["TW"].ToString();
                row.CLIENT_ID = Convert.ToInt32(dr["CLIENT_ID"]);
                row.RS = dr["RS"].ToString();
                row.KS = dr["KS"].ToString();
                row.BANK_BIK_ID = dr["BANK_BIK_ID"].ToString();
                row.BANK_BIK = dr["BANK_BIK"].ToString();
                row.BANK_NAME = dr["BANK_NAME"].ToString();
                row.BANK_INN = dr["BANK_INN"].ToString();
                row.BANK_KRS = dr["BANK_KRS"].ToString();
                row.BANK_OGRN = dr["BANK_OGRN"].ToString();
                row.SHOP_ID = dr["SHOP_ID"].ToString();
                mcs.Add(row);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(mcs);
        }

        [WebMethod]
        public static string CheckRS(string RS)
        {
            int COuntRs = (int)Mydb.ExecuteScalar("select COUNT(*) from RS where RS=@rs", new SqlParameter[] { new SqlParameter("@rs", RS) }, CommandType.Text);
            if (COuntRs!=0)
            {
                return "{\"result\" : \"1\"}"; ;
            }
            else
            {
                return "{\"result\" : \"0\"}";
            }
        }

        [WebMethod]
        public static string CRUD_UO(string MAN_COMPANY_ID,
                string INN,
                string KPP,
                string OKPO,
                string OGRN_OGRNIP,
                string NAME,
                string LICENCE,
                string ADRESS_ID,
                string ADRESS,
                string PHONE,
                string EMAIL,
                string VK,
                string OK,
                string FB,
                string TW,
                string CLIENT_ID,
                string BIK,
                string BNAME,
                string BKRS,
                string RS,
                string action,
                string shopid)
        {
            Mydb.ExecuteNoNQuery("sp_CounstructorAPI_ADD_EDIT_DEL_UO", new SqlParameter[] { new SqlParameter("@MAN_COMPANY_ID", MAN_COMPANY_ID),
            new SqlParameter("@INN", INN),
            new SqlParameter("@KPP", KPP),
            new SqlParameter("@OKPO", OKPO),
            new SqlParameter("@OGRN_OGRNIP", OGRN_OGRNIP),
            new SqlParameter("@NAME", NAME),
            new SqlParameter("@LICENCE", LICENCE),
            new SqlParameter("@ADRESS_ID", ADRESS_ID),
            new SqlParameter("@ADRESS", ADRESS),
            new SqlParameter("@PHONE", PHONE),
            new SqlParameter("@EMAIL", EMAIL),
            new SqlParameter("@VK", VK),
            new SqlParameter("@OK", OK),
            new SqlParameter("@FB", FB),
            new SqlParameter("@TW", TW),
            new SqlParameter("@CLIENT_ID", CLIENT_ID),
            new SqlParameter("@BIK", BIK),
            new SqlParameter("@BNAME", BNAME),
            new SqlParameter("@BKRS", BKRS),
            new SqlParameter("@RS", RS),
            new SqlParameter("@action", action) }, CommandType.StoredProcedure);

            //Mydb.ExecuteNoNQuery("INSERT INTO [MAN_COMPANY]([INN],[KPP],[OKPO],[OGRN_OGRNIP],[NAME],[LICENCE],[ADRESS_ID],[ADRESS],[PHONE],[EMAIL],[VK],[OK],[FB],[TW],[CLIENT_ID],[SHOP_ID])VALUES(@INN,@KPP,@OKPO,@OGRN_OGRNIP,@NAME,@LICENCE,@ADRESS_ID,@ADRESS,@PHONE,@EMAIL,@VK,@OK,@FB,@TW,@CLIENT_ID,@SHOP_ID) ", new SqlParameter[] {
            //new SqlParameter("@INN", INN),
            //new SqlParameter("@KPP", KPP),
            //new SqlParameter("@OKPO", OKPO),
            //new SqlParameter("@OGRN_OGRNIP", OGRN_OGRNIP),
            //new SqlParameter("@NAME", NAME),
            //new SqlParameter("@LICENCE", "No Lic"),
            //new SqlParameter("@ADRESS_ID", ADRESS_ID),
            //new SqlParameter("@ADRESS", ADRESS),
            //new SqlParameter("@PHONE", PHONE),
            //new SqlParameter("@EMAIL", EMAIL),
            //new SqlParameter("@VK", VK),
            //new SqlParameter("@OK", OK),
            //new SqlParameter("@FB", FB),
            //new SqlParameter("@TW", TW),
            //new SqlParameter("@CLIENT_ID", CLIENT_ID),
            //new SqlParameter("@SHOP_ID",shopid)}, CommandType.Text);

            //int cmpId = (int)Mydb.ExecuteScalar("select top 1 MAN_COMPANY_ID from MAN_COMPANY order by MAN_COMPANY_ID desc", new SqlParameter[] { }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("INSERT INTO RS (RS, KS, BANK_BIK_ID, MAN_COMP_ID)VALUES(@RS, @BKRS, @BIK, @new_id)", new SqlParameter[] { new SqlParameter("@RS",RS),new SqlParameter("@BKRS", BKRS),new SqlParameter("@BIK", BIK),new SqlParameter("@new_id",cmpId) }, CommandType.Text);

            /*"INSERT INTO RS (RS, KS, BANK_BIK_ID, MAN_COMP_ID)VALUES(@RS, ISNULL(@BKRS, (SELECT BANK_KRS FROM BIK WHERE BANK_BIK = @BIK)), @BIK, @new_id)"*/


            return "";
        }
    }
}