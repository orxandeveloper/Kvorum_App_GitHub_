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

namespace Kvorum_App
{
    public partial class InfoUO : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string AddInfo(int McId,List<DOC_FOR_MC> dc)
        {
            foreach (DOC_FOR_MC item in dc)
            {
                if (item.KAT_ID!=0)
                {
                    int CounOfDoc = (int)Mydb.ExecuteScalar("select COUNT(*) from DOC_FOR_MC where D_URL=@url and MC_ID=@mc", new SqlParameter[] { new SqlParameter("@url", item.D_URL), new SqlParameter("@mc", McId) }, CommandType.Text);
                    if (CounOfDoc == 0)
                    {
                       // Mydb.ExecuteNoNQuery("delete from DOC_FOR_MC where MC_ID=@mc", new SqlParameter[] { new SqlParameter("@mc", McId) }, CommandType.Text);
                        Mydb.ExecuteNoNQuery("insert into  DOC_FOR_MC (D_NAME,D_URL,KAT_ID,MC_ID) values (@dnm,@durl,@kid,@mc)", new SqlParameter[] { new SqlParameter("@dnm", item.D_NAME), new SqlParameter("@durl", item.D_URL), new SqlParameter("@kid", item.KAT_ID), new SqlParameter("@mc", McId) }, CommandType.Text);
                    }
                }
                //else
                //{
                //    Mydb.ExecuteNoNQuery("delete from DOC_FOR_MC where MC_ID=@mc", new SqlParameter[] { new SqlParameter("@mc", McId) }, CommandType.Text);
                //}
                
            }
            

                //foreach (DOC_FOR_MC item in dcRemove)
                //{
                //if (item.D_NAME=="Udal")
                //{
                //    Mydb.ExecuteNoNQuery("delete from DOC_FOR_MC where D_URL=@d", new SqlParameter[] { new SqlParameter("@d", item.D_URL) }, CommandType.Text);
                //}
                    
                //}
            

            return "";
        }
        [WebMethod]
        public static string DelDoc(string url)
        {
            Mydb.ExecuteNoNQuery("delete from DOC_FOR_MC where D_URL=@url", new SqlParameter[] { new SqlParameter("@url",url) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string getInfos(int McId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from DOC_FOR_MC where MC_ID=@id", new SqlParameter[] { new SqlParameter("@id", McId) }, CommandType.Text);
            List<DOC_FOR_MC> ds = new List<DOC_FOR_MC>();
            foreach (DataRow item in dt.Rows)
            {
                DOC_FOR_MC d = new DOC_FOR_MC();
                d.D_NAME = item["D_NAME"].ToString();
                d.D_URL = item["D_URL"].ToString();
                d.KAT_ID = Convert.ToInt32(item["KAT_ID"]);
                ds.Add(d);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ds);
        }
    }
}