using Kvorum_App.Client_Admin.Utilities;
using Newtonsoft.Json;
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
    public partial class TenantLogin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string CheckRmNum(int ObjId) {
            int rmNum = (int)Mydb.ExecuteScalar("select count(ROOM_NUMBER) from Room where OBJECT_ID=@ObjId", new SqlParameter[] {new SqlParameter("@ObjId",ObjId) }, CommandType.Text);
            string result = "";
            if (rmNum != 0)
            {
                result = "{\"result\" : \"" + rmNum + "\"}";
            }
            else
            {
                result = "{\"result\" : \"0\"}";
            }
            return result;
        }
        [WebMethod]
        public static string Logtenant(string Score, int ObjId,string Room_Num,string PassT)
        {
            string result = "";
            //DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_TenantLogin", new SqlParameter[] {new SqlParameter("@Score",Score),new SqlParameter("@ObjId", ObjId),new SqlParameter("@Room_Num", Room_Num) }, CommandType.StoredProcedure);
            //foreach (DataRow item in dt.Rows)
            //{
            //    result= "{\"result\" : \"" + item["Result"] + "\"}";
            //}
            int RoomCount = (int)Mydb.ExecuteScalar("select COUNT (*) from ROOM where ROOM_NUMBER=@Room_Num and ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=@Score and OBJECT_ID=@ObjId)", new SqlParameter[] {  new SqlParameter("@Room_Num",Room_Num),new SqlParameter("@Score", Score), new SqlParameter("@ObjId", ObjId) }, CommandType.Text);
            if (RoomCount!=0)
            {
                int PassCount = (int)Mydb.ExecuteScalar("select COUNT(*) from PER_SCORE where  PASS=@PassT and SCORE_ID=@Score and OBJECT_ID=@ObjId and ROOM_ID=(select ROOM_ID from ROOM where ROOM_NUMBER=@Room_Num and OBJECT_ID=@obj_Id)", new SqlParameter[] { new SqlParameter("@PassT",PassT),new SqlParameter("@Score",Score),new SqlParameter("@ObjId",ObjId) ,new SqlParameter("@Room_Num",Room_Num),new SqlParameter("@obj_Id",ObjId) }, CommandType.Text);

                if (PassCount==1)
                {
                    int ProjectId = (int)Mydb.ExecuteScalar("select PROJECT_ID from OBJECT where OBJECT_ID=@ObjId", new SqlParameter[] { new SqlParameter("@ObjId", ObjId) }, CommandType.Text);
                    
                      result= "{\"result\" : \"1\",\"objId\":\""+ObjId+ "\",\"C_Score\":\"" + Score+ "\",\"ProjectId\":\""+ProjectId+"\"}";         //"{\"result\" : \"1\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + Id + "\",\"RoleId\":\"" + role + "\"}";
                  //  result = @"{result:1,objId:" + ObjId + ",C_Score:" + Score + ",ProjectDatas:" + ProjectDatas + "}";
                }
                else
                {
                    int ProjectId = (int)Mydb.ExecuteScalar("select PROJECT_ID from OBJECT where OBJECT_ID=@ObjId", new SqlParameter[] { new SqlParameter("@ObjId", ObjId) }, CommandType.Text);

                    string LoginBitrix = Mydb.ExecuteReadertoDataTableAsJson("usp_CHECK_BITRIX_USER", new SqlParameter[] { new SqlParameter("@login",Score),new SqlParameter("@pwd",PassT) }, CommandType.StoredProcedure);
                    // dynamic jsonSets = JsonConvert.DeserializeObject(sets);
                    dynamic jsonLoginBitrix = JsonConvert.DeserializeObject(LoginBitrix);
                    if (jsonLoginBitrix[0].LOTUS_GUID!= "Login failed")
                    {
                        result = "{\"result\" : \"1\",\"objId\":\"" + ObjId + "\",\"C_Score\":\"" + Score + "\",\"ProjectId\":\"" + ProjectId + "\"}";
                    }
                    else
                    {
                        result = "{\"result\" : \"0\"}";
                    }
                }
            }
            else
            {
                result= "{\"result\" : \"0\"}";
            }
            return result;
        }
        [WebMethod]
        public static string getObjectId(string adr)
        {
            string Result = "";
            int count = (int)Mydb.ExecuteScalar("select count (*) from OBJECT where  OBJECT_ADRESS=@adr", new SqlParameter[] { new SqlParameter("@adr", adr) }, CommandType.Text);
            if (count!=0)
            {
                string ObjId = Mydb.ExecuteScalar("select OBJECT_ID from OBJECT where OBJECT_ADRESS=@adr", new SqlParameter[] { new SqlParameter("@adr", adr) }, CommandType.Text).ToString();
                Result= "{\"result\" : \"" + ObjId + "\"}";
            }
            else
            {
                Result= "{\"result\" : \"0\"}";
            }
            return Result;
        }
        [WebMethod]
        public static string GetStreetsBytext(string txt,string score)
        {
            DataTable dt=null;
            if (score=="0")
            {
                dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ID,OBJECT_ADRESS from OBJECT where OBJECT_ADRESS like '%'+@txt+'%'", new SqlParameter[] { new SqlParameter("@txt", txt) }, CommandType.Text); 
            }
            else
            {
                dt = Mydb.ExecuteReadertoDataTable("select OBJECT_ID,OBJECT_ADRESS from OBJECT where OBJECT_ID=(select OBJECT_ID from PER_SCORE where SCORE_ID=@score)", new SqlParameter[] { new SqlParameter("@score",score) }, CommandType.Text);
            }
            List<ObjectS> objs = new List<ObjectS>();
            foreach (DataRow item in dt.Rows)
            {
                ObjectS obj = new ObjectS();
                obj.ObjectAdress = item["OBJECT_ADRESS"].ToString();
                obj.Object_Id = Convert.ToInt32(item["OBJECT_ID"]);
                objs.Add(obj);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(objs);
        }
        [WebMethod]
        public static string CheckPers(string pers)
        {
            int Count = (int)Mydb.ExecuteScalar("select COUNT(*) from PER_SCORE where NUMBER=@pers", new SqlParameter[] {new SqlParameter("@pers",pers) }, CommandType.Text);
            string result = "";

            if (Count==0)
            {
                result= "{\"result\" : \"0\"}";
            }
            else
            {
                result = "{\"result\" : \"1\"}";
            }

            return result;
        }
    }
}