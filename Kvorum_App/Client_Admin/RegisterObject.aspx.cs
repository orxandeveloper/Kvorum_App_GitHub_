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
    public partial class RegisterObject : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string getObjForman(int cl, int uo)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select o.*,mc.NAME from OBJECT o,MAN_COMPANY mc where o.CLIENT_ID=@c and o.MAN_COMP_ID=@uo and o.MAN_COMP_ID=mc.MAN_COMPANY_ID and ISNULL(o.IS_DELETED,0)<>1 order by [OBJECT_ID] desc", new SqlParameter[] { new SqlParameter("@c", cl), new SqlParameter("@uo", uo) }, CommandType.Text);
            //List<ObjectS> objs = new List<ObjectS>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    ObjectS obj = new ObjectS();
            //    obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
            //    obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
            //    obj.ObjectPhoto = item["OBJECT_PHOTO"].ToString();
            //    obj.MAN_COMP_NAME = item["NAME"].ToString();
            //    objs.Add(obj);

            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(objs);
            return Mydb.ExecuteAsJson("getObjForman", new SqlParameter[] { new SqlParameter("@c", cl), new SqlParameter("@uo", uo) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string OBJ_List(int client_id)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("sp_CounstructorAPI_GET_OBJ_by_CLIENT_ID", new SqlParameter[] { new SqlParameter("@CLIENT_ID", client_id) }, CommandType.StoredProcedure);
            //List<ObjectS> objs = new List<ObjectS>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    ObjectS obj = new ObjectS();
            //    obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
            //    obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
            //    obj.ObjectPhoto = item["OBJECT_IMG"].ToString();
            //    obj.MAN_COMP_NAME = item["MAN_COMP_NAME"].ToString();
            //    objs.Add(obj);

            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(objs);
            return Mydb.ExecuteAsJson("sp_CounstructorAPI_GET_OBJ_by_CLIENT_ID", new SqlParameter[] { new SqlParameter("@CLIENT_ID", client_id) }, CommandType.StoredProcedure);
        }
    }
}