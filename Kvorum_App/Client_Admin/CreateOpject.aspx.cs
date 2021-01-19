using HttpUtils;
using Kvorum_App.Client_Admin.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class CreateOpject : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            
        }
        [WebMethod]
        public static string SearchLog(int l_g, string Stext, int Cl)
        {
            if (Stext.Contains("|"))
            {
                Stext.Replace("|", ":");
            }
            DataTable dt = Mydb.ExecuteReadertoDataTable("Orx_Search_Log", new SqlParameter[] { new SqlParameter("@C", l_g), new SqlParameter("@Stext", Stext) }, CommandType.StoredProcedure);
            List<LOG_GLOBAL> lgs = new List<LOG_GLOBAL>();
            foreach (DataRow item in dt.Rows)
            {
                LOG_GLOBAL lg = new LOG_GLOBAL();
                lg.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                lg.DATESTAMP = item["DATESTAMP"].ToString();
                lg.EVENT_MAKER = item["EVENT_MAKER"].ToString();
                lg.EVENT_MESSAGE = item["EVENT_MESSAGE"].ToString();
                lg.EVENT_MODULE = item["EVENT_MODULE"].ToString();
                lg.EVENT_ROLE = item["EVENT_ROLE"].ToString();
                lg.EVENT_STATUS = item["EVENT_STATUS"].ToString();
                lg.EVENT_TYPE = item["EVENT_TYPE"].ToString();
                lg.E_MAIL = item["E_MAIL"].ToString();
                lg.id = item["id"].ToString();
                lgs.Add(lg);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(lgs);
        }
        [WebMethod]
        public static string SearchLog2(int l_g, string Stext, int Cl)
        {
            if (Stext.Contains("|"))
            {
                Stext.Replace("|", ":");
            }
            string lg_s = null;
            DataTable dtlgs = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@c", new SqlParameter[] { new SqlParameter("@c", Cl) }, CommandType.Text);
            bool first = true;
            foreach (DataRow item in dtlgs.Rows)
            {
                if (first == true)
                {
                    lg_s = item["LOG_IN_ID"].ToString();
                    first = false;
                }
                else
                {
                    lg_s += "," + item["LOG_IN_ID"].ToString();
                }
            }
                DataTable dt = Mydb.ExecuteReadertoDataTable("searchAllLog", new SqlParameter[] { new SqlParameter("@s", lg_s), new SqlParameter("@Stext", Stext) }, CommandType.StoredProcedure);
            List<LOG_GLOBAL> lgs = new List<LOG_GLOBAL>();
            foreach (DataRow item in dt.Rows)
            {
                LOG_GLOBAL lg = new LOG_GLOBAL();
                lg.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                lg.DATESTAMP = item["DATESTAMP"].ToString();
                lg.EVENT_MAKER = item["EVENT_MAKER"].ToString();
                lg.EVENT_MESSAGE = item["EVENT_MESSAGE"].ToString();
                lg.EVENT_MODULE = item["EVENT_MODULE"].ToString();
                lg.EVENT_ROLE = item["EVENT_ROLE"].ToString();
                lg.EVENT_STATUS = item["EVENT_STATUS"].ToString();
                lg.EVENT_TYPE = item["EVENT_TYPE"].ToString();
                lg.E_MAIL = item["E_MAIL"].ToString();
                lg.id = item["id"].ToString();
                lgs.Add(lg);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(lgs);
        }
        //[WebMethod]
        //public static string GetLogin(int clId)
        //{
        //    //List<string> lg = new List<string>();

        //   // lg.Add(log);
        //   // JavaScriptSerializer js = new JavaScriptSerializer();
        //    return "{\"log\" : \""+log+"\"}";
        //}

        [WebMethod]
        public static string AddProject(int UoId, string ProjectName)
        {
            Mydb.ExecuteNoNQuery("insert into PROJECTS (PROJECT_NAME,MC_ID) values(@PROJECT_NAME,@MC_ID)", new SqlParameter[] {new SqlParameter("@PROJECT_NAME",ProjectName),new SqlParameter("@MC_ID",UoId) }, CommandType.Text);
            return "";
        }
        [WebMethod]
        public static string GetProjectForMan(int UoId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PROJECTS where MC_ID=@MC_ID", new SqlParameter[] {new SqlParameter("@MC_ID",UoId) }, CommandType.Text);
            List<Account_> pjs = new List<Account_>();
            foreach (DataRow item in dt.Rows)
            {
                Account_ pj = new Account_();
                pj.ACCOUNT_NAME = item["PROJECT_NAME"].ToString();
                pj.ADRESS_ID = item["PROJECT_ID"].ToString();
                pjs.Add(pj);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(pjs);
        }

        [WebMethod]
        public static string GetRegions()
        {
            List<Locations> regions = new List<Locations>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_KLADR_GET_REGION", new SqlParameter[] { }, CommandType.StoredProcedure);
            foreach (DataRow item in dt.Rows)
            {

                Locations loc = new Locations();
                loc.CODE = item["CODE"].ToString();
                loc.Name = item["Name"].ToString();
                regions.Add(loc);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            var js_ = js.Serialize(regions);

            return js_;
        }

        [WebMethod]
        public static string GetRaionByCode(string CODE_)
        {
            List<Locations> raions = new List<Locations>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_KLADR_GET_RAION", new SqlParameter[] { new SqlParameter("@code", CODE_) }, CommandType.StoredProcedure);


            foreach (DataRow item in dt.Rows)
            {
                Locations loc = new Locations();
                loc.CODE = item["CODE"].ToString();
                loc.Name = item["Name"].ToString();
                raions.Add(loc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(raions);
        }

        [WebMethod]
        public static string GetCityByCode(string CODE_)
        {
            List<Locations> raions = new List<Locations>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_KLADR_GET_CITY", new SqlParameter[] { new SqlParameter("@code", CODE_) }, CommandType.StoredProcedure);


            foreach (DataRow item in dt.Rows)
            {
                Locations loc = new Locations();
                loc.CODE = item["CODE"].ToString();
                loc.Name = item["Name"].ToString();
                raions.Add(loc);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(raions);
        }

        [WebMethod]
        public static string getObject(int CLId_,int ObjId_ )
        {
            ObjectS obj = new ObjectS();
            DataTable dt = Mydb.ExecuteReadertoDataTable("getObjectById", new SqlParameter[] { new SqlParameter("@objId", ObjId_), new SqlParameter("@CL_Id", CLId_) }, CommandType.StoredProcedure);
            //DataRow dr = dt.Rows[0];
            foreach (DataRow dr in dt.Rows)
            {
                obj.ClientId = Convert.ToInt32(dr["CLIENT_ID"]);
                obj.ManCompId = Convert.ToInt32(dr["MAN_COMP_ID"]);
                obj.ObjectAdress = dr["OBJECT_ADRESS"].ToString();
                obj.ObjectPhoto = dr["OBJECT_PHOTO"].ToString();
                obj.Object_Id = Convert.ToInt32(dr["OBJECT_ID"]);
                obj.KladrObjectId = dr["KLADR_OBJECT_ID"].ToString();
                obj.LOG_IN_ID = Convert.ToInt32(dr["LOG_IN_ID"]);
                obj.DOMAIN_NAME = dr["PROJECT_ID"].ToString();
            }
           
            JavaScriptSerializer js = new JavaScriptSerializer();
            
            return js.Serialize(obj);
        }
        [WebMethod]
        public static string GetUPRRoles(int ClId)
        {
            List<Account_> accrs = new List<Account_>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("select a.ACCOUNT_NAME,a.LOG_IN_ID  from  MODUL_ROLE mr,ACCOUNT a ,ACCOUNT_ROLE ar where a.LOG_IN_ID=ar.LOG_IN_ID and ar.MR_ID=mr.MR_ID and a.CLIENT_ID=@c and mr.ROLE_ID=1 ", new SqlParameter[] { new SqlParameter("@c", ClId) }, CommandType.Text);

            foreach (DataRow item in dt.Rows)
            {
                Account_ accr = new Account_();
                accr.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                accr.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
                accrs.Add(accr);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(accrs);
        }

        [WebMethod]
        public static string Update_Object(int ObjId,string ObjAdres,string ObjName,string ManKompId,string KladrId,string Photo,int LogId,int PROJECT_ID)
        {
            Mydb.ExecuteNoNQuery("Update_Object", new SqlParameter[] {
                new SqlParameter("@objId",ObjId),
                new SqlParameter("@objAdres",ObjAdres),
                new SqlParameter("@ObjectName",ObjName),
                new SqlParameter("@ManCompId",ManKompId),
                new SqlParameter("@photo",Photo),
            new SqlParameter("@kladrId",KladrId),
            new SqlParameter("@lg",LogId),
            new SqlParameter("@p_Id",PROJECT_ID)}, CommandType.StoredProcedure);

            return "{\"result\" : \"1\"}";
        }
        //[WebMethod]
        //public static string UpdateObject(int objId_, string objAdress_, string objname_, int manCompId_, string photo_)
        //{
        //    Mydb.ExecuteNoNQuery("Update_Object", new SqlParameter[] {
        //    new SqlParameter("@objId",objId_),
        //    new SqlParameter("@objAdres",objAdress_),
        //    new SqlParameter("@ObjectName",objname_),
        //    new SqlParameter("@ManCompId",manCompId_),
        //    new SqlParameter("@photo",photo_)}, CommandType.StoredProcedure);
        //    return "{\"result\" : \"1\"}";
        //}
        //[WebMethod]
        //public static string GetTownByCode(string CODE_)
        //{
        //    List<Locations> raions = new List<Locations>();
        //    DataTable dt = Mydb.ExecuteReadertoDataTable("sp_KLADR_GET_TOWN", new SqlParameter[] { new SqlParameter("@code", CODE_) }, CommandType.StoredProcedure);


        //    foreach (DataRow item in dt.Rows)
        //    {
        //        Locations loc = new Locations();
        //        loc.CODE = item["CODE"].ToString();
        //        loc.Name = item["Name"].ToString();
        //        raions.Add(loc);
        //    }
        //    JavaScriptSerializer js = new JavaScriptSerializer();
        //    return js.Serialize(raions);
        //}
        [WebMethod]
        public static string GetStreetsBytext (string txt)
        {
            List<Locations> streets = new List<Locations>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("sp_KLADR_SEARCH_STREET", new SqlParameter[] { new SqlParameter("@SearchText", txt) }, CommandType.StoredProcedure);
            foreach (DataRow item in dt.Rows)
            {
                Locations loc = new Locations();
                loc.CODE = item["CODE"].ToString();
                loc.Name = item["NAME"].ToString();
                streets.Add(loc);
            }
            JavaScriptSerializer js_ = new JavaScriptSerializer();
            return js_.Serialize(streets);

        }

        [WebMethod]
        public static string SaveImagefromBase(HttpContext context)
        {
            //byte[] bytes_image = Convert.FromBase64String(baseString);
            //MemoryStream ms = new MemoryStream(bytes_image, 0, baseString.Length);
            //ms.Write(bytes_image, 0, baseString.Length);
            //System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);

            //string imageAdress = "~/Client_Admin/img/" + imgName;
            ////Server.MapPath("PResim/") + Path.GetFileName(flp.FileName)
            //image.Save("C:\\Users\\abdullazada\\source\repos\\Kvorum_App\\Kvorum_App\\Client_Admin\\img\\");
             
            //if (context.Request.Files.Count > 0)
            //{
                //HttpFileCollection files = context.Request.Files["ImageFile"];
                HttpPostedFile file = context.Request.Files["ImageFile"];
                file.SaveAs("~/Client_Admin/img/" + file.FileName);
           
           // }
            return  "{\"src\" : \"" + file.FileName + "\"}";
        }

        [WebMethod]
        public static string DeleteObject(string obj_Id)
        {
            Mydb.ExecuteNoNQuery("Delete_Object", new SqlParameter[] { new SqlParameter("@objId", obj_Id) }, CommandType.StoredProcedure);
            return "{\"result\" : \"1\"}";
        }

        [WebMethod]
        public static string SaveClienObject(int Client_Id,string Objectadr, string CODE, int uoId, string img_,int LogId,int project_id)
        {
            #region COMMENTS
            //if (string.IsNullOrEmpty(CODE))
            //{
            //    Mydb.ExecuteNoNQuery("insert into OBJECT (OBJECT_ADRESS,OBJECT_NAME,CLIENT_ID,MAN_COMP_ID,OBJECT_PHOTO) values(@adres,@name,@id,@uoId,@img)", new SqlParameter[] {
            //        new SqlParameter("@adres", Objectadr),
            //        new SqlParameter("@name", Objectadr),
            //        new SqlParameter("@id", Client_Id),
            //    new SqlParameter("@uoId",uoId),
            //    new SqlParameter("@img",img_)}, CommandType.Text);

            //    Mydb.ExecuteNoNQuery("insert into KLADR (KLADR_OBJECT_ADRESS) values(@adres)", new SqlParameter[] { new SqlParameter("@adres", Objectadr) }, CommandType.Text);

            //    string IdObject = Mydb.ExecuteScalar("select OBJECT_ID from OBJECT where OBJECT_ADRESS=@adr", new SqlParameter[] { new SqlParameter("@adr", Objectadr) }, CommandType.Text).ToString();
            //    return "{\"result\" : \"1\",\"idObject\" : \"" + IdObject + "\"}";
            //}
            //else
            //{
            //    Mydb.ExecuteNoNQuery("insert into OBJECT (OBJECT_ADRESS,OBJECT_NAME,CLIENT_ID,MAN_COMP_ID,OBJECT_PHOTO) values(@adres,@name,@id,@uoId,@img)", new SqlParameter[] { new SqlParameter("@adres", Objectadr),
            //        new SqlParameter("@name", Objectadr),
            //        new SqlParameter("@id", Client_Id),
            //     new SqlParameter("@uoId",uoId),
            //    new SqlParameter("@img",img_)}, CommandType.Text);

            //    Mydb.ExecuteNoNQuery("insert into KLADR (KLADR_OBJECT_ID,KLADR_OBJECT_ADRESS) values(@code,@adres)", new SqlParameter[] { new SqlParameter("@code",CODE),new SqlParameter("@adres", Objectadr) }, CommandType.Text);

            //    string IdObject = Mydb.ExecuteScalar("select OBJECT_ID from OBJECT where OBJECT_ADRESS=@adr", new SqlParameter[] { new SqlParameter("@adr", Objectadr) }, CommandType.Text).ToString();
            //    return "{\"result\" : \"1\",\"idObject\" : \"" + IdObject + "\"}";
            //}
            #endregion
           // CODE = (CODE == "") ? null : CODE;
            Mydb.ExecuteNoNQuery("insert into OBJECT (OBJECT_ADRESS,OBJECT_NAME,CLIENT_ID,MAN_COMP_ID,OBJECT_PHOTO,KLADR_OBJECT_ID,LOG_IN_ID,PROJECT_ID) values(@adres,@name,@id,@uoId,@img,@CODE,@log,@PROJECT_ID)", new SqlParameter[] {
                    new SqlParameter("@adres", Objectadr),
                    new SqlParameter("@name", Objectadr),
                    new SqlParameter("@id", Client_Id),
                new SqlParameter("@uoId",uoId),
                new SqlParameter("@img",img_),
            new SqlParameter("@CODE",CODE),
            new SqlParameter("@log",LogId),
            new SqlParameter("@PROJECT_ID",project_id)}, CommandType.Text);
            string IdObject = Mydb.ExecuteScalar("select OBJECT_ID from OBJECT where OBJECT_ADRESS=@adr", new SqlParameter[] { new SqlParameter("@adr", Objectadr) }, CommandType.Text).ToString();

            return "{\"result\" : \"1\",\"idObject\" : \"" + IdObject + "\"}";

        }

        [WebMethod]
        public static string GetLogs( string EventModul, int lg_)
        {//int lg_, string EventModul (for new logic)
            #region old code
            //int Clid, ,int logDisp paremeters
            //DataTable dt = null;
            //int l_g = (int)Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@c and LOGIN is null", new SqlParameter[] { new SqlParameter("@c", Clid) }, CommandType.Text);
            //if (EventModul == "vse")
            //{
            //    string lg_s = null;
            //    DataTable dtlgs = Mydb.ExecuteReadertoDataTable("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@c", new SqlParameter[] { new SqlParameter("@c", Clid) }, CommandType.Text);
            //    bool first = true;
            //    foreach (DataRow item in dtlgs.Rows)
            //    {
            //        if (first == true)
            //        {
            //            lg_s = item["LOG_IN_ID"].ToString();
            //            first = false;
            //        }
            //        else
            //        {
            //            lg_s += "," + item["LOG_IN_ID"].ToString();
            //        }
            //    }
            //    dt = Mydb.ExecuteReadertoDataTable("getAllLogs", new SqlParameter[] { new SqlParameter("@s", lg_s) }, CommandType.StoredProcedure);
            //}
            //if (EventModul == "Admin")
            //{//'Клиентское администрирование'
            // //dt = Mydb.ExecuteReadertoDataTable("select top 100 lg.* ,a.ACCOUNT_NAME,a.E_MAIL from LOG_GLOBAL lg, ACCOUNT a where lg.EVENT_MODULE=@em and lg.EVENT_MAKER=@c and lg.EVENT_MAKER=a.CLIENT_ID order by lg.id desc", new SqlParameter[] { new SqlParameter("@c", l_g),new SqlParameter("@em", "Клиентское администрирование") }, CommandType.Text);
            //    dt = Mydb.ExecuteReadertoDataTable("getAllLogs", new SqlParameter[] { new SqlParameter("@s", l_g.ToString()) }, CommandType.StoredProcedure);
            //}
            //if (EventModul == "Dispo")
            //{
            //    dt = Mydb.ExecuteReadertoDataTable("select top 100 lg.* ,a.ACCOUNT_NAME,a.E_MAIL from LOG_GLOBAL lg, ACCOUNT a where  lg.EVENT_MAKER=@c and lg.EVENT_MAKER=a.LOG_IN_ID order by lg.id desc", new SqlParameter[] { new SqlParameter("@c", Convert.ToInt32(logDisp)) }, CommandType.Text);
            //    // dt = Mydb.ExecuteReadertoDataTable("getAllLogs", new SqlParameter[] { new SqlParameter("@s", logDisp) }, CommandType.StoredProcedure);
            //}
            //if (EventModul == "Upro")
            //{
            //    dt = Mydb.ExecuteReadertoDataTable("select top 100 * from VW_Log where EVENT_MAKER=@c order by id desc", new SqlParameter[] { new SqlParameter("@c", Convert.ToInt32(logDisp)) }, CommandType.Text);
            //}
            #endregion

            DataTable dt = Mydb.ExecuteReadertoDataTable("GetLogs", new SqlParameter[] {new SqlParameter("@lg",lg_),new SqlParameter("@EventModul",EventModul) }, CommandType.StoredProcedure);
            List<LOG_GLOBAL> lgs = new List<LOG_GLOBAL>();
            foreach (DataRow item in dt.Rows)
            {
                LOG_GLOBAL lg = new LOG_GLOBAL();
                lg.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
                lg.DATESTAMP = item["DATESTAMP"].ToString();
                lg.EVENT_MAKER = item["EVENT_MAKER"].ToString();
                lg.EVENT_MESSAGE = item["EVENT_MESSAGE"].ToString();
                lg.EVENT_MODULE = item["EVENT_MODULE"].ToString();
                lg.EVENT_ROLE = item["EVENT_ROLE"].ToString();
                lg.EVENT_STATUS = item["EVENT_STATUS"].ToString();
                lg.EVENT_TYPE = item["EVENT_TYPE"].ToString();
                lg.E_MAIL = item["E_MAIL"].ToString();
                lg.id = item["id"].ToString();
                lgs.Add(lg);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(lgs);
        }

        //[WebMethod]
        //public static string SaveImagebyForm(string ImageName)
        //{

        //}



        //[WebMethod]
        //public static string SaveImagefromBase(string base64String, string imgName)
        //{
        //    byte[] bytes_image = Convert.FromBase64String(base64String);
        //    MemoryStream ms = new MemoryStream(bytes_image, 0, bytes_image.Length);
        //    ms.Write(bytes_image, 0, bytes_image.Length);
        //    System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);

        //    string imageAdress = "~/Client_Admin/img/" + imgName;
        //    //Server.MapPath("PResim/") + Path.GetFileName(flp.FileName)
        //    image.Save("C:\\Users\\abdullazada\\source\repos\\Kvorum_App\\Kvorum_App\\Client_Admin\\img\\");
        //    return "{\"result\" : \"1\"}";
        //}

        [WebMethod]
        public static string GetRolesLeftmenu(int clId)
        {
            int log =(int) Mydb.ExecuteScalar("select LOG_IN_ID from ACCOUNT where CLIENT_ID=@C and LOGIN is null", new SqlParameter[] { new SqlParameter("@C", clId) }, CommandType.Text);
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetRoles_", new SqlParameter[] { new SqlParameter("@L", log) }, CommandType.StoredProcedure);

            List<Roles> rs = new List<Roles>();
            foreach (DataRow item in dt.Rows)
            {
                Roles r = new Roles();
                r.ROLE_NAME = item["ROLE_NAME"].ToString();
                r.ACCOUNT_QUANTITY = log.ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);
        }

        [WebMethod]
        public static string GetCompanyNameAndIdForLeft( int C_Id)
        {
            //string Login = Mydb.ExecuteScalar("select LOGIN from ACCOUNT where LOG_IN_ID=@L", new SqlParameter[] { new SqlParameter("@L", Logid) }, CommandType.Text).ToString();
            //if (string.IsNullOrEmpty(Login))
            //{
                string CompName = Mydb.ExecuteScalar("select COMPANY_NAME from CLIENT where CLIENT_ID=@C", new SqlParameter[] { new SqlParameter("@C", C_Id) }, CommandType.Text).ToString();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<ManCompany> mcs = new List<ManCompany>();
            ManCompany mc = new ManCompany();
            mc.NAME = CompName;
            return js.Serialize(mc);
                //return "{\"result\" : \"1\",\"IdComp\" :\"" + C_Id + "\",\"Compname\" :\"" + CompName + "\"}";
            //}
            //else
            //{
            //    //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from MAN_COMPANY where CLIENT_ID=@C", new SqlParameter[] { new SqlParameter("@C", C_Id) }, CommandType.Text);
            // return "{\"result\" : \"2\"}";
            //}

        }


    }
}