using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class Services : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string GetExistDirections(string  project_Guid)
        {
            //            return Mydb.ExecuteReadertoDataTableAsJson(@"select ss.SERVICE_SET_ID,ss.SERVICE_SET_NAME,ssc.S_ICON_ADRESS,ssc.S_ICON_ID,isnull(ssi.RESPONSIBLE_ID,0) as RESPONSIBLE_ID from SELECTED_SERVICE_SET_ICON ssi
            //inner join SERVICE_SET ss on ss.SERVICE_SET_ID=ssi.SSS_ID inner join SERVICE_SET_ICONS ssc on ssc.S_ICON_ID=ssi.SSS_ICON where ssi.PROJECT_ID=@projectId", new SqlParameter[] { new SqlParameter("@projectId", projectId) }, CommandType.Text);
          //  var a = 0;

            //return Mydb.ExecuteAsJson("TestDB.[dbo].[sp_QUICK_API_get_ub_directions]", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", project_Guid), new SqlParameter("@respid", 0) }, CommandType.StoredProcedure);
            return Mydb.ExecuteAsJson("TestDB.[dbo].[sp_QUICK_API_get_ub_directions]", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", project_Guid), new SqlParameter("@respid", Convert.ToInt32(0)) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetResponsibels()
        {

            return Mydb.ExecuteReadertoDataTableAsJson("GetResponsibels", new SqlParameter[] { }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetProjects(int UprId)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from PROJECTS where PROJECT_ID in (select PROJECT_ID from OBJECT where LOG_IN_ID=@UprId)", new SqlParameter[] {new SqlParameter("@UprId", UprId) }, CommandType.Text); 
        }
        [WebMethod]
        public static string GetDirections_Grups_and_Services(string PROJECT_GUID,string DIRECTION_GUID,string SERVICE_GUID)
        {
            dynamic servc;
            if (SERVICE_GUID.Length == 0)
            {
                servc = DBNull.Value;
            }
            else
            {
                servc = SERVICE_GUID;
            }

            return Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_get_ub_services", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID), new SqlParameter("@DIRECTION_GUID", DIRECTION_GUID), new SqlParameter("@SERVICE_GUID", servc) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetExistServices(int prj, int dId)
        {/*select ps.SERVICE_ID,ps.SERVICE_NAME,ps.QUANTITY_IS,ps.UNIT_OF_MEASURE_ID from PRODUCT_SERVICE ps inner join PROJECT_PRODUCT_SERVICE pps on pps.PRODUCT_SERVICE_ID=ps.SERVICE_ID and pps.PROJECT_ID=@prj and ps.DIRECTION_ID=@d*/


            return Mydb.ExecuteReadertoDataTableAsJson(@"select 
ps.SERVICE_ID, 
ps.SERVICE_NAME, 
ps.QUANTITY_IS, 
ps.UNIT_OF_MEASURE_ID, 
pps.COST, 
pps.DATE_START 
 from PRODUCT_SERVICE ps 
inner join 
( 
SELECT * 
FROM 
PROJECT_PRODUCT_SERVICE  AS [data] 
WHERE 
DATE_START = (SELECT max(DATE_START) 
FROM 
PROJECT_PRODUCT_SERVICE 
WHERE 
PRODUCT_SERVICE_ID = [data].PRODUCT_SERVICE_ID) 
OR DATE_START is NULL 
) 
pps on 
pps.PRODUCT_SERVICE_ID=ps.SERVICE_ID and pps.PROJECT_ID=@prj and ps.DIRECTION_ID=@d", new SqlParameter[] { new SqlParameter("@prj",prj),new SqlParameter("@d",dId) }, CommandType.Text);
        }

        [WebMethod]
        public static string DeleteDirection(string d_guid)
        {

            //Mydb.ExecuteNoNQuery("delete from SELECTED_SERVICE_SET_ICON where SSS_ID=@sid and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@sid",sid),
            //    new SqlParameter("@prj",prj) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("DeleteDirection", new SqlParameter[] { new SqlParameter("@d_guid", d_guid) }, CommandType.StoredProcedure);
            return "";
        

        }
        [WebMethod]
        public static string getServiceSetIcon()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_SET_ICONS", new SqlParameter[] { }, CommandType.Text);
        }
        [WebMethod]
        public static string GetServiceDirectIcon()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_DIRECT_ICONS", new SqlParameter[] { }, CommandType.Text);
        }

        [WebMethod]
        public static string UpdateServiceSet(string ssn, int sid,int prj,int siconid, int lg)
        {
            //string dname,int dIconId,string sname,string quantity,int unit,string cost
            Mydb.ExecuteNoNQuery("update SERVICE_SET set SERVICE_SET_NAME=@ssn where SERVICE_SET_ID=@sid", new SqlParameter[] { new SqlParameter("@ssn", ssn),new SqlParameter("@sid",sid) }, CommandType.Text);

            Mydb.ExecuteNoNQuery("update SELECTED_SERVICE_SET_ICON set PROJECT_ID=@prj ,SSS_ICON=@iconid, RESPONSIBLE_ID=@lg where SSS_ID=@sid", new SqlParameter[] { new SqlParameter("@prj",prj),new SqlParameter("@iconid",siconid),new SqlParameter("@sid",sid),new SqlParameter("@lg",lg) }, CommandType.Text);

            //int dId =(int) Mydb.ExecuteScalar("insert into SERVICE_DIRECT (DIRECTION_NAME,SS_ID) output inserted.DIRECTION_ID values(@dname,@sid)", new SqlParameter[] { new SqlParameter("@dname", dname),new SqlParameter("@sid",sid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("insert into SDIRECT_SICON (S_DIRECT_ID,PROJECT_ID,ICON_ID) values (@dId,@prj,@dIconId)", new SqlParameter[] { new SqlParameter("@dId",dId),new SqlParameter("@prj",prj),new SqlParameter("@dIconId",dIconId) }, CommandType.Text);

            //int ProductId=(int)Mydb.ExecuteScalar("insert into PRODUCT_SERVICE(SERVICE_NAME, QUANTITY_IS, UNIT_OF_MEASURE_ID, DIRECTION_ID) output inserted.SERVICE_ID values(@sname, @quantity, @unit, @dId)", new SqlParameter[] { new SqlParameter("@sname", sname), new SqlParameter("@quantity", quantity), new SqlParameter("@unit", unit), new SqlParameter("@dId", dId) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST,ACTIVE)values(@productId,@prj,@cost,'0')", new SqlParameter[] { new SqlParameter("@productId", ProductId),new SqlParameter("@prj",prj),new SqlParameter("@cost",cost) }, CommandType.Text);
            
            return "";
        }

        [WebMethod]
        public static string SaveDirectionGrupServices(string GRUP_ICON, string PROJECT_GUID, int RESPONSIBLE_ID, string DIRECTION_NAME, string D_ICON, string GRUP_NAME, string SERVICE_PROJECT, string SERVICE_UNIT, string SERVICE_COST, string SERVICE_NAME)
        {
            #region old
            //int setId =(int) Mydb.ExecuteScalar("insert into SERVICE_SET (SERVICE_SET_NAME)output inserted.SERVICE_SET_ID values (@ssn)", new SqlParameter[] { new SqlParameter("@ssn",ssn) }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("insert into SELECTED_SERVICE_SET_ICON(SSS_ID,PROJECT_ID,SSS_ICON,RESPONSIBLE_ID) values (@setId,@prj,@siconid,@lg)", new SqlParameter[] { new SqlParameter("@setId",setId),new SqlParameter("@prj",prj),new SqlParameter("@siconid",siconid),new SqlParameter("@lg",lg) }, CommandType.Text);

            //int dId = (int)Mydb.ExecuteScalar("insert into SERVICE_DIRECT (DIRECTION_NAME,SS_ID) output inserted.DIRECTION_ID values(@dname,@sid)", new SqlParameter[] { new SqlParameter("@dname",dname),new SqlParameter("@sid",setId) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("insert into SDIRECT_SICON (S_DIRECT_ID,PROJECT_ID,ICON_ID) values (@dId,@prj,@dIconId)", new SqlParameter[] { new SqlParameter("@dId",dId),new SqlParameter("@prj",prj),new SqlParameter("@dIconId",dIconId) }, CommandType.Text);

            //int ProductId = (int)Mydb.ExecuteScalar("insert into PRODUCT_SERVICE (SERVICE_NAME,QUANTITY_IS,UNIT_OF_MEASURE_ID,DIRECTION_ID) output inserted.SERVICE_ID values(@sname, @quantity, @unit, @dId)",new SqlParameter[] { new SqlParameter("@sname",sname),new SqlParameter("@quantity",quantity),new SqlParameter("@unit",unit),new SqlParameter("@dId",dId) },CommandType.Text);


            //Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST,ACTIVE) values(@productId,@prj,@cost,'0')", new SqlParameter[] { new SqlParameter("@productId", ProductId), new SqlParameter("@prj", prj), new SqlParameter("@cost", cost) }, CommandType.Text);

            #endregion
            //insert direction
            string direction_guid= Mydb.ExecuteScalar("Insert_BASE_DIRECTIONS", new SqlParameter[] {
                new SqlParameter("@DIRECTION_NAME",DIRECTION_NAME),
                new SqlParameter("@ICON",D_ICON),
                new SqlParameter("@PROJECT_GUID",PROJECT_GUID),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)
            },CommandType.StoredProcedure).ToString();

            // insert grup
           int parentId=Convert.ToInt32( Mydb.ExecuteScalar("INSERT_GRUP_AND_SERVICES",new SqlParameter[] {
                new SqlParameter("@SERVICE_NAME",GRUP_NAME),
               new SqlParameter("@SERVICE_PROJECT",SERVICE_PROJECT),
                new SqlParameter("@SERVICE_ICON",GRUP_ICON),
                new SqlParameter("@DIRECTION_GUID",direction_guid)
            },CommandType.StoredProcedure));

            // insert Service
           Mydb.ExecuteScalar("INSERT_GRUP_AND_SERVICES", new SqlParameter[] {
                new SqlParameter("@PARENT_ID",parentId),
                new SqlParameter("@SERVICE_NAME",SERVICE_NAME),
                new SqlParameter("@SERVICE_UNIT",SERVICE_UNIT),
                new SqlParameter("@SERVICE_COST",SERVICE_COST),
                new SqlParameter("@SERVICE_ICON",DBNull.Value),
                new SqlParameter("@SERVICE_PROJECT",SERVICE_PROJECT)
            }, CommandType.StoredProcedure);
            return "";

        }
        [WebMethod]
        public static string Delete_Grup_Service(string g_guid)
        {
            //Mydb.ExecuteNoNQuery("delete from SDIRECT_SICON where S_DIRECT_ID=@dId and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@dId",dId),new SqlParameter("@prj",prj) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("Delete_Grup_Service", new SqlParameter[] { new SqlParameter("@s_g_Guid", g_guid) }, CommandType.StoredProcedure);
            return "";
        }
        [WebMethod]
        public static string UpdateDirect(string d_guid,string NAME,string ICON,int respId)
        {
            //string DName,int dId,string DIconId,int prj
            //Mydb.ExecuteNoNQuery("update SERVICE_DIRECT set DIRECTION_NAME=@Dname where DIRECTION_ID=@dId", new SqlParameter[] { new SqlParameter("@dId",dId),new SqlParameter("@Dname",DName) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("update SDIRECT_SICON set ICON_ID=@DIconId where S_DIRECT_ID=@dId and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@DIconId",DIconId),new SqlParameter("@dId",dId),new SqlParameter("@prj",prj) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("UpdateDirect", new SqlParameter[] { new SqlParameter("@d_guid", d_guid),new SqlParameter("@NAME", NAME),new SqlParameter("@ICON", ICON),new SqlParameter("@respId", respId) }, CommandType.StoredProcedure);

            return "";
        }

        [WebMethod]
        public static string getExistSuppliers(int lg)
        {
            int clientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from Account where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
            return Mydb.ExecuteAsJson("[dbo].[GetSuppliers]", new SqlParameter[] { new SqlParameter("@Cid",clientId) }, CommandType.StoredProcedure);
        }


        [WebMethod]
        public static string SaveDirectsGrup(string GRUP_NAME, string SERVICE_PROJECT, string GRUP_ICON, string direction_guid, string SERVICE_NAME, string SERVICE_UNIT,string SERVICE_COST)
        {

            //int dId = (int)Mydb.ExecuteScalar("insert into SERVICE_DIRECT (DIRECTION_NAME,SS_ID) output inserted.DIRECTION_ID values(@dname,@sid)", new SqlParameter[] { new SqlParameter("@dname", dname), new SqlParameter("@sid", setId) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("insert into SDIRECT_SICON (S_DIRECT_ID,PROJECT_ID,ICON_ID) values (@dId,@prj,@dIconId)", new SqlParameter[] { new SqlParameter("@dId", dId), new SqlParameter("@prj", prj), new SqlParameter("@dIconId", dIconId) }, CommandType.Text);

            //int ProductId = (int)Mydb.ExecuteScalar("insert into PRODUCT_SERVICE (SERVICE_NAME,QUANTITY_IS,UNIT_OF_MEASURE_ID,DIRECTION_ID) output inserted.SERVICE_ID values(@sname, @quantity, @unit, @dId)", new SqlParameter[] { new SqlParameter("@sname", sname), new SqlParameter("@quantity", quantity), new SqlParameter("@unit", unit), new SqlParameter("@dId", dId) }, CommandType.Text);


            //Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST,ACTIVE) values(@productId,@prj,@cost,'0')", new SqlParameter[] { new SqlParameter("@productId", ProductId), new SqlParameter("@prj", prj), new SqlParameter("@cost", cost) }, CommandType.Text);
            int parentId = Convert.ToInt32(Mydb.ExecuteScalar("INSERT_GRUP_AND_SERVICES", new SqlParameter[] {
                new SqlParameter("@SERVICE_NAME",GRUP_NAME),
               new SqlParameter("@SERVICE_PROJECT",SERVICE_PROJECT),
                new SqlParameter("@SERVICE_ICON",GRUP_ICON),
                new SqlParameter("@DIRECTION_GUID",direction_guid),
                //new SqlParameter("@SERVICE_SUPPLIER",SERVICE_SUPPLIER),,string SERVICE_SUPPLIER,string SUPPLIER_GUID
                //new SqlParameter("SUPPLIER_GUID",SUPPLIER_GUID)
            }, CommandType.StoredProcedure));

            // insert Service
            Mydb.ExecuteScalar("INSERT_GRUP_AND_SERVICES", new SqlParameter[] {
                new SqlParameter("@PARENT_ID",parentId),
                new SqlParameter("@SERVICE_NAME",SERVICE_NAME),
                new SqlParameter("@SERVICE_UNIT",SERVICE_UNIT),
                new SqlParameter("@SERVICE_COST",SERVICE_COST),
                new SqlParameter("@SERVICE_ICON",DBNull.Value),
                new SqlParameter("@SERVICE_PROJECT",SERVICE_PROJECT),
               // new SqlParameter("@SERVICE_SUPPLIER",SERVICE_SUPPLIER),
               // new SqlParameter("SUPPLIER_GUID",SUPPLIER_GUID)
            }, CommandType.StoredProcedure);
            return "";
        }

        [WebMethod]
        public static string DeleteService(int ServId,int prj)
        {
            Mydb.ExecuteNoNQuery("delete from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@ServId and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@ServId",ServId),new SqlParameter("@prj",prj) }, CommandType.Text);

            return "";
        }

        [WebMethod]
        public static string AddNewService(string sname,string quantity,int unit,int dId,int prj,string cost) {

            int servId = (int)Mydb.ExecuteScalar("insert into PRODUCT_SERVICE (SERVICE_NAME,QUANTITY_IS,UNIT_OF_MEASURE_ID,DIRECTION_ID) output inserted.SERVICE_ID values(@sname,@quantity,@unit,@dId)", new SqlParameter[] { new SqlParameter("@sname", sname), new SqlParameter("@quantity", quantity), new SqlParameter("@unit", unit), new SqlParameter("@dId", dId) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE(PRODUCT_SERVICE_ID,PROJECT_ID,COST) values (@servId,@prj,@cost)", new SqlParameter[] { new SqlParameter("@servId", servId), new SqlParameter("@prj", prj), new SqlParameter("@cost", cost) }, CommandType.Text);

            return "";
        }

        [WebMethod]
        public static string UpdatingService(string sname,string quantity,int unit,int servId,int prj,string cost)
        {
            Mydb.ExecuteNoNQuery("update PRODUCT_SERVICE set SERVICE_NAME=@sname ,QUANTITY_IS=@quantity ,UNIT_OF_MEASURE_ID=@unit where SERVICE_ID=@servId", new SqlParameter[] { new SqlParameter("@sname",sname),new SqlParameter("@quantity", quantity),new SqlParameter("@unit",unit),new SqlParameter("@servId",servId) }, CommandType.Text);
            Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST) values(@servId,@prj,@cost)", new SqlParameter[] { new SqlParameter("@servId",servId),new SqlParameter("@prj",prj),new SqlParameter("@cost",cost) }, CommandType.Text);

            return "";
        }
        [WebMethod]
        public static string GetAllServiceSet()
        {

            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_SET", new SqlParameter[] { }, CommandType.Text);
        }
        [WebMethod]
        public static string GetAllDirectsforAll(int sid)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_DIRECT where SS_ID=@sid", new SqlParameter[] {new SqlParameter("@sid",sid) }, CommandType.Text);
        }
        [WebMethod]
        public static string GetServicesForAll(int dId)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from PRODUCT_SERVICE where DIRECTION_ID=@dId", new SqlParameter[] { new SqlParameter("@dId", dId) }, CommandType.Text);
        }
        [WebMethod]
        public static string ConnectServicetoProject(int prj,string sets,string directs,string services)
        {
            dynamic jsonSets = JsonConvert.DeserializeObject(sets);
 

            foreach (var set in jsonSets)
            {
                int COuntSet = (int)Mydb.ExecuteScalar("select COUNT (*) from SELECTED_SERVICE_SET_ICON where SSS_ID=@sid and PROJECT_ID=@proj", new SqlParameter[] { new SqlParameter("@sid",Convert.ToInt32(set.SetId)),new SqlParameter("@proj",prj) }, CommandType.Text);
                if (COuntSet==1)
                {
                    Mydb.ExecuteNoNQuery("update SELECTED_SERVICE_SET_ICON set SSS_ICON=@IconId where SSS_ID=@sid and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@IconId",Convert.ToInt32(set.IconId)),new SqlParameter("@sid",Convert.ToInt32(set.SetId)),new SqlParameter("@prj",prj) }, CommandType.Text);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("insert into SELECTED_SERVICE_SET_ICON (SSS_ID,PROJECT_ID,SSS_ICON) values (@sid,@prj,@IconId)", new SqlParameter[] { new SqlParameter("@sid", Convert.ToInt32(set.SetId)), new SqlParameter("@prj", prj), new SqlParameter("@IconId", Convert.ToInt32(set.IconId)) }, CommandType.Text);
                }
            }

            dynamic JsonDirect = JsonConvert.DeserializeObject(directs);
            foreach (var direct in JsonDirect)
            {
                //int DirectId_ = direct.DirectId;
                //int DiconId_ = direct.DiconId;
                int COuntDirect = (int)Mydb.ExecuteScalar("select COUNT(*) from SDIRECT_SICON where S_DIRECT_ID=@dId and PROJECT_ID=@prj", new SqlParameter[] { new SqlParameter("@dId", Convert.ToInt32(direct.DirectId)), new SqlParameter("@prj", prj) }, CommandType.Text);
                if (COuntDirect==1)
                {
                    Mydb.ExecuteNoNQuery("update SDIRECT_SICON set ICON_ID=@DiconId where S_DIRECT_ID=@dId and PROJECT_ID=@prj",new SqlParameter[] { new SqlParameter("@DiconId",Convert.ToInt32(direct.DiconId)),new SqlParameter("dId",Convert.ToInt32(direct.DirectId)),new SqlParameter("@prj",prj) },CommandType.Text);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("insert into SDIRECT_SICON (S_DIRECT_ID,PROJECT_ID,ICON_ID) values(@dId,@prj,@DiconId)", new SqlParameter[] { new SqlParameter("@dId", Convert.ToInt32(direct.DirectId)), new SqlParameter("@prj", prj), new SqlParameter("@DiconId", Convert.ToInt32(direct.DiconId)) }, CommandType.Text);
                }
            }

            dynamic jsonServices = JsonConvert.DeserializeObject(services);
            foreach (var service in jsonServices)
            {
                //int serviceId_ = service.serviceId;
                //string cost_ = service.cost;
                Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST) values (@servId,@prj,@cost)", new SqlParameter[] { new SqlParameter("@servId",Convert.ToInt32(service.serviceId)),new SqlParameter("@prj",prj),new SqlParameter("@cost",Convert.ToString(service.cost)) }, CommandType.Text);
            }

            return "";
        }
    }
}