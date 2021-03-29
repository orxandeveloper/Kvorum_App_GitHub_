using Kvorum_App.Super_Disp.Helpers;
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

namespace Kvorum_App.Super_Disp
{
    public partial class CreateDispRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
       
        [WebMethod]
        public static string getSpesicalisetsBySupplierGuid(string supGuid)
        {
            return Mydb.ExecuteAsJson("getSpesicalisetsBySupplierGuid", new SqlParameter[] { new SqlParameter("@supGuid", supGuid) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string CHECK_EMAIL_GUID_RESPONSE(string eml)
        {

            return Mydb.ExecuteAsJson("CHECK_EMAIL_GUID_RESPONSE", new SqlParameter[] { new SqlParameter("@eml", eml) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetAllServicesOfProject(string PROJECT_GUID, int lg = 0)
        {
            if (lg == 0)
            {
                return Mydb.ExecuteAsJson("TestDB.dbo.usp_QUICK_API_get_mp_services_search", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID) }, CommandType.StoredProcedure);
            }
            else
            {
                return Mydb.ExecuteAsJson("usp_QUICK_API_get_mp_services_search_by_Resp", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID), new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
            }
        }
        [WebMethod]
        public static string get_ub_services(string PROJECT_GUID, string DIRECTION_GUID, string SERVICE_GUID)
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
            /*new JavaScriptSerializer().Serialize(new
                {
                    WORKDATE = item["WORKDATE"].ToString().Substring(0, 10),
                    WORKBEGIN = item["WORKBEGIN"].ToString().ToString().Substring(0, 5),
                    WORKEND = item["WORKEND"].ToString().ToString().Substring(0, 5),
                    FILES = item["FILES"].ToString()
                });*/
            string s_GROUPS = Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_get_ub_services", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID), new SqlParameter("@DIRECTION_GUID", DIRECTION_GUID), new SqlParameter("@SERVICE_GUID", servc) }, CommandType.StoredProcedure);
        
            string R_GROUPS = Mydb.ExecuteAsJson("GET_RESPONSIBLES_BY_GROUP",new SqlParameter[] { new SqlParameter("@SERVICE_GUID", servc) },CommandType.StoredProcedure);
           string  js=new JavaScriptSerializer().Serialize(new {
                SERVICE_GROUPS= s_GROUPS,
                RESPONSIBLE_GROUPS= R_GROUPS

           });
            return js;//Mydb.ExecuteAsJson("TestDB.dbo.sp_QUICK_API_get_ub_services", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID), new SqlParameter("@DIRECTION_GUID", DIRECTION_GUID), new SqlParameter("@SERVICE_GUID", servc) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string get_ub_directions(string PROJECT_GUID, int respid,object Supp_Guid,int RequestKind)
        {

            return Mydb.ExecuteAsJson("TestDB.dbo.[sp_QUICK_API_get_ub_directions]", new SqlParameter[] { new SqlParameter("@PROJECT_GUID", PROJECT_GUID), new SqlParameter("@respid", respid),new SqlParameter("@Supp_Guid",(Supp_Guid==null)?DBNull.Value:Supp_Guid),new SqlParameter("@baseDirectionId", RequestKind) }, CommandType.StoredProcedure)
;
        }

        [WebMethod]
        public static string otpravToVrabotSupp(string Rid, List<ProductService_> prs, string opl, string login_id, string em, string Pdate, string Ptime, object SpId, object RESPONSIBLE_ID, string TOTAL_COST, string RESPONSIBLE_EMAIL, string PERFORMER_EMAIL, string AUTHOR, int StatusId, string path,string request_type, string RequestKind, string SPECIATISTS_ = null)
        {
            string result = "";
            string REQGUID = Rid;
            string SERVICE_COUNT = prs[0].QUANTITY.ToString();
            string SERVICE_END_COST = TOTAL_COST;
            SERVICE_END_COST = SERVICE_END_COST.Replace("Итого: ", "").Replace("руб", "");
            string SERVICE_GUID = prs[0].SERVICE_GUID;
            string[] pdate_ = Pdate.Split('-');
            string pdate = pdate_[2] + "." + pdate_[1] + "." + pdate_[0];
            DateTime endTime = DateTime.Parse(Ptime);
            endTime = endTime.AddHours(2);
            //  string textForPlanDate = AUTHOR + " : " + "Планируемая дата ( " + pdate + "), Планируемое время (" + Ptime + ")";
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rGuid", REQGUID), new SqlParameter("@NewStatusId", 1),new SqlParameter("@lg", login_id) }, CommandType.StoredProcedure);


   
            Mydb.ExecuteNoNQuery("Update_MP_Requests", new SqlParameter[] {
                new SqlParameter("@REQGUID",REQGUID),
                new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT),
                new SqlParameter("@SERVICE_END_COST",SERVICE_END_COST),
                new SqlParameter("@SERVICE_GUID",SERVICE_GUID),
                new SqlParameter("@SERVICE_NAME",prs[0].SERVICE_NAME),
              //  new SqlParameter("@textForPlanDate",textForPlanDate),
                new SqlParameter("@SPECIALIST_ID",SpId),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID),
                new SqlParameter("@STATUS","1"),
                new SqlParameter("@WORKDATE",pdate),
                new SqlParameter("@WORKBEGIN",Ptime),
                new SqlParameter("@WORKEND",endTime.ToString("HH:mm")),
                new SqlParameter("@PAYED",opl),
                new SqlParameter("@request_type",request_type)

            }, CommandType.StoredProcedure);

           
            string MOBILE_NUMBER = Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", REQGUID) }, CommandType.StoredProcedure).ToString();
            int Rid_ = Convert.ToInt32(MOBILE_NUMBER);
            var ServicesOfRequest = "";
            for (int i = 0; i < prs.Count; i++)
            {
                if (i == 0)
                {
                    ServicesOfRequest = prs[i].SERVICE_NAME;
                }
                else
                {
                    ServicesOfRequest = ServicesOfRequest + ", " + prs[i].SERVICE_NAME;
                }
                string COST_ = prs[i].COST;
                string SERVICE_COUNT_ = prs[i].QUANTITY.ToString();
                string SERVICE_NAME_ = prs[i].SERVICE_NAME;
                string SERVICE_GUID_ = prs[i].SERVICE_GUID;
                Mydb.ExecuteNoNQuery("UpdateServicesForSupRequest", new SqlParameter[] {
                    new SqlParameter("@REQ_GUID",REQGUID),
                    new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT_),
                    new SqlParameter("@SERVICE_END_COST",COST_),
                    new SqlParameter("@SERVICE_GUID",SERVICE_GUID_),
                    new SqlParameter("@SERVICE_NAME",SERVICE_NAME_),
                    new SqlParameter("@i",i)

                }, CommandType.StoredProcedure);
            }
            var TextEmail = "Заявка № П-" + MOBILE_NUMBER + " по услуге «" + ServicesOfRequest + "» изменила статус на «В работе».";

            string Email = Mydb.ExecuteScalar("[GET_ID_EMAIL_FROM_REQUEST]", new SqlParameter[] { new SqlParameter("@type", 10), new SqlParameter("@rid", SERVICE_GUID) }, CommandType.StoredProcedure).ToString();

            SendEmailForRequest(TextEmail, Email, -1,1, Convert.ToInt32(login_id), "Диспетчер поставщика", REQGUID);
            //Mydb.ExecuteNoNQuery("UpdateSuppServices", new SqlParameter[] {
            //    new SqlParameter("@MASTER_ID",Convert.ToInt32(MOBILE_NUMBER)),
            //    new SqlParameter("@MASTER_GUID",REQGUID),
            //    new SqlParameter("@SERVICE_END_COST",SERVICE_END_COST),
            //    new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT ),
            //    new SqlParameter("@SERVICE_NAME",prs[0].SERVICE_NAME),
            //    new SqlParameter("@SERVICE_GUID",prs[0].SERVICE_GUID)
            //}, CommandType.StoredProcedure);
            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";



            //if (RESPONSIBLE_ID != null)
            //{
            //    SendEmailForRequest(Text, RESPONSIBLE_EMAIL, Rid_, 1,  Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            //}

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «В работе».";
            //Заявка №[Номер заявки] возвращена в работу
            string textForPush = (em == "vernut") ? "Заявка №  П-" + MOBILE_NUMBER + " возвращена в работу": "Заявка № П-" + MOBILE_NUMBER + " принята в работу";
            Mydb.ExecuteNoNQuery("INSERT_FCM_LOG", new SqlParameter[] {

                new SqlParameter("@SECTION","Заявка"),
           new SqlParameter("@EVENT",textForPush),
           new SqlParameter("@TEXT",textForPush),
        //   new SqlParameter("@PROJECT_ID",PROJECT_ID),
           new SqlParameter("@SCORE_ID",""),
           new SqlParameter("@tokenId",SpId.ToString()),
          new SqlParameter("@LOG_IN_ID",Convert.ToInt32(login_id)),
           new SqlParameter("@PAGE",path),
           new SqlParameter("@ID",MOBILE_NUMBER),

            }, CommandType.StoredProcedure); 
            dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;
            if (SPECIATISTS == null)
            {
                if (SpId != null)
                {
                    //SERVICES_SPECIALISTS_CRUD("", Rid_, "", "Delete");

                    int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(SpId)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                    if (IS_DISPATCHER == 1)
                    {
                        SendEmailForRequest(Text, PERFORMER_EMAIL, Rid_, 1, Convert.ToInt32(SpId), "Диспетчер");

                    }
                   
                }
            }
            return result;
        }

        [WebMethod]
        public static string otpravToVrabot(int Rid, List<ProductService_> prs, string opl, string login_id, string em, string Pdate, string Ptime, object SpId, object RESPONSIBLE_ID, string TOTAL_COST, string RESPONSIBLE_EMAIL, string PERFORMER_EMAIL, string AUTHOR, int StatusId, string path, string request_type, string RequestKind, string SPECIATISTS_ = null)
        {
            //Rc = HttpUtility.UrlDecode(Rc);
            /* Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=1,SERVICE_GROUP_ID=@gs,PAYMENT=@PAYMENT, EMERGENCY_TREATMENT=@em,PLAN_END_DATE=CAST(@Pdate as date), PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0)), SPECIALIS_ID=@SpId, RESPONSIBLE_ID=@RESPONSIBLE_ID where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@gs", sid), new SqlParameter("@PAYMENT", opl), new SqlParameter("@em", em), new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime), new SqlParameter("@SpId", SpId), new SqlParameter("@RESPONSIBLE_ID", RESPONSIBLE_ID) }, CommandType.Text);*///yarin test edeceksin

            // dynamic prs = JsonConvert.DeserializeObject(prs_json);


            var Request_As_json = new[] {
                new {Pdate=Pdate,Ptime=Ptime,spId=SpId,RESPONSIBLE_ID=RESPONSIBLE_ID,STATUS_ID=StatusId}
            };
            string MOBILE_NUMBER = Convert.ToString(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            Mydb.COMPARE_REQUESTS(true, JsonConvert.SerializeObject(Request_As_json), Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > В работе", path, JsonConvert.SerializeObject(prs));
            // string path = HttpContext.Current.Request.Url.AbsolutePath;
            //int StatusId = 0;
            //if (path.IndexOf("Responsible_Admin/") > -1)
            //{
            //    StatusId = 1;


            //}
            //else
            //{
            //    StatusId = (SpId == null) ? 1 : (Convert.ToInt32(SpId) == Convert.ToInt32(login_id)) ? 1 : 2;
            //}
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 1), new SqlParameter("@lg", login_id) }, CommandType.StoredProcedure);

            Mydb.ExecuteNoNQuery("UPDATE_REQUEST_SUPER", new SqlParameter[] {
                        new SqlParameter("@Pdate", Pdate),
                        new SqlParameter("@Ptime", Ptime),
                        new SqlParameter("@spId", (SpId==null)?(object)DBNull.Value:Convert.ToInt32(SpId)),
                        new SqlParameter("@TOTAL_COST",TOTAL_COST),
                        new SqlParameter("@opl", Convert.ToBoolean(opl)),
                        new SqlParameter("@em", Convert.ToBoolean(em)),
                        new SqlParameter("@HReq", Rid),
                        new SqlParameter("@RESPONSIBLE_ID",(RESPONSIBLE_ID==null)?(object)DBNull.Value:Convert.ToInt32(RESPONSIBLE_ID)),
                        new SqlParameter("@statusid",StatusId),
                        new SqlParameter("@request_type",request_type),
                        new SqlParameter("@work_kind",RequestKind)
                    }, CommandType.StoredProcedure);


            Mydb.ExecuteNoNQuery("Delete_Services_Super", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);
            for (int i = 0; i < prs.Count; i++)
            {
                Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
            }

            //string PlanDate_Time = "Планируемая дата (" + Pdate + ") Планируемое время (" + Ptime + ")";
            //Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] {
            //            new SqlParameter("@Rc",PlanDate_Time),
            //            new SqlParameter("@Rid",Rid),new SqlParameter("@AUTHOR",AUTHOR)}, CommandType.StoredProcedure);

            DateTime endTime = DateTime.Parse(Ptime);
            endTime = endTime.AddHours(2);
            string RequestText_UP = "Услуга: " + prs[0].SERVICE_NAME +
                    Environment.NewLine +
                    "Количество: " + prs[0].QUANTITY.ToString() +
                     Environment.NewLine +
                     "Стоимость: " + (string)prs[0].COST;
            Mydb.ExecuteNoNQuery("UpdateMobileRequest",
                       new SqlParameter[] {
                            new SqlParameter("@MOBILE_NUMBER",Convert.ToInt32(MOBILE_NUMBER)),
                            new SqlParameter("@WORKDATE",SpliteReverseJoinDate(Pdate)),
                            new SqlParameter("@WORKBEGIN",Ptime),
                            new SqlParameter("@WORKEND",endTime.ToString("HH:mm")),
                            new SqlParameter("@RequestText",RequestText_UP),
                            new SqlParameter("@work_kind",RequestKind)}, CommandType.StoredProcedure);
            // int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";



            if (RESPONSIBLE_ID != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL, Rid, 1, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «В работе»."; ;
            dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;
            if (SPECIATISTS == null)
            {
                if (SpId != null)
                {
                    int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(SpId)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                    if (IS_DISPATCHER == 1)
                    {
                        SendEmailForRequest(Text, PERFORMER_EMAIL, Rid, 1, Convert.ToInt32(SpId), "Диспетчер");
                    }
                    //SERVICES_SPECIALISTS_CRUD("", Rid, "", "Delete");
                   
                }
            }
            else
            {
               // SERVICES_SPECIALISTS_CRUD(SPECIATISTS, Rid, Text, "Update");
            }

            if (Convert.ToInt32(MOBILE_NUMBER) != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 1) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";
        }

        private static string SpliteReverseJoinDate(string pdate)
        {
            string[] arrDate = pdate.Split('-');
            string  WORKDATE = arrDate[2] + "." + arrDate[1] + "." + arrDate[0];
            return WORKDATE;
        }

        [WebMethod]
        public static string MakeZakritSupp(string R_id, string imgs, string text,string opl,int login_id,string path)
        {
            string result = "";

            dynamic j = JsonConvert.DeserializeObject(imgs);
            //    string img = j[0].ImgAdres;
            string ImgAdres = "";
            for (int i = 0; i < j.Count; i++)
            {
                if (j[i].ImgAdres != 0)
                {
                    if (i == 0)
                    {
                        ImgAdres = j[i].ImgAdres;
                    }
                    else
                    {
                        ImgAdres = ImgAdres + "," + j[i].ImgAdres;
                    }
                }
            }
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rGuid", R_id), new SqlParameter("@NewStatusId", 5), new SqlParameter("@lg", login_id) }, CommandType.StoredProcedure);
            Mydb.ExecuteNoNQuery("[Update_MP_Requests]", new SqlParameter[] {
                new SqlParameter("@REQGUID",R_id),
                new SqlParameter("@STATUS","5"),
                new SqlParameter("@COMMENT_",text),
                new SqlParameter("@FILES",ImgAdres),
                 new SqlParameter("@PAYED",opl)
            }, CommandType.StoredProcedure);
            string MOBILE_NUMBER = Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", R_id) }, CommandType.StoredProcedure).ToString();
            int Rid_ = Convert.ToInt32(MOBILE_NUMBER);


            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";
            var RESPONSIBLE_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 6) }, CommandType.StoredProcedure);

            var RESPONSIBLE_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 7) }, CommandType.StoredProcedure);
            if (RESPONSIBLE_EMAIL != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid_, 4, Convert.ToInt32(RESPONSIBLE_ID), "Диспетчер");
            }


            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Отменена».";
            var SPECIALIST_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 5) }, CommandType.StoredProcedure);

            var SPECIALIST_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 8) }, CommandType.StoredProcedure);

            if (SPECIALIST_EMAIL != null)
            {
                int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", SPECIALIST_ID), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                if (IS_DISPATCHER == 1)
                {
                    SendEmailForRequest(Text, SPECIALIST_EMAIL.ToString(), Rid_, 4, Convert.ToInt32(SPECIALIST_ID), "Диспетчер");
                }
                 
                Mydb.ExecuteNoNQuery("INSERT_FCM_LOG", new SqlParameter[] {
                        new SqlParameter("@SECTION","Заявка"),
                   new SqlParameter("@EVENT","Заявка № П-" + MOBILE_NUMBER + " закрыта"),
                   new SqlParameter("@TEXT","Заявка № П-" + MOBILE_NUMBER + " закрыта" ),
                //   new SqlParameter("@PROJECT_ID",PROJECT_ID),
                   new SqlParameter("@SCORE_ID",""),
                   new SqlParameter("@tokenId",SPECIALIST_ID.ToString()),
                  new SqlParameter("@LOG_IN_ID",Convert.ToInt32(login_id)),
                   new SqlParameter("@PAGE",path),
                   new SqlParameter("@ID",MOBILE_NUMBER)    }, CommandType.StoredProcedure);
            }


            return result;

        }
        [WebMethod]
        public static string MakeZakrit(int Rid, string comment, string login_id, string path)
        {
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 5), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);
            if (comment.Length == 0)
            {
                Mydb.ExecuteNoNQuery("MakeClose", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);

            }
            else
            {
                Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=5 where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (REQUEST_COMMENT, REQUEST_ID) values(@rc,@rid)", new SqlParameter[] { new SqlParameter("@rc", comment), new SqlParameter("@rid", Rid) }, CommandType.Text);

            }
            //  object MobileNumber = Mydb.ExecuteScalar("select MOBILE_NUMBER from REQUEST WHERE REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);

            //Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MobileNumber)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);

            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

          //  Mydb.COMPARE_REQUESTS(false, "", Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > Закрыта", path, "");

           

            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «Закрыта».";

            var RESPONSIBLE_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 4) }, CommandType.StoredProcedure);
            var RESPONSIBLE_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 3) }, CommandType.StoredProcedure);

            if (RESPONSIBLE_EMAIL != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid, 5, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Закрыта».";
            var SPECIALIST_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 2) }, CommandType.StoredProcedure);

            var SPECIALIST_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 1) }, CommandType.StoredProcedure);

            if (SPECIALIST_EMAIL != null)
            {
                int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(SPECIALIST_ID)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                if (IS_DISPATCHER == 1)
                {
                    SendEmailForRequest(Text, SPECIALIST_EMAIL.ToString(), Rid, 5, Convert.ToInt32(SPECIALIST_ID), "Диспетчер");
                }
                
            }
            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 5) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 5), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";

        }

        //[WebMethod]
        //public static string MakeVraboteSupp(string Rid, object Ispol, string ispolEmail, string login_id, int RESPONSIBLE_ID, string path)
        //{

        //    dynamic Services = Mydb.ExecuteAsJson("", new SqlParameter[] { }, CommandType.StoredProcedure);
        //    string SERVICE_COUNT = Services[0].QUANTITY;
        //    string SERVICE_END_COST = Services[0].COST;
        //    string SERVICE_GUID = Services[0].SERVICE_GUID;
        //    string textForPlanDate = "";
        //    int SpId = (Ispol != null) ? Convert.ToInt32(Ispol) : 0;
        //  //  int RESPONSIBLE_ID = 0;
        //    Mydb.ExecuteNoNQuery("Update_MP_Requests", new SqlParameter[] {
        //        new SqlParameter("@REQGUID",Rid),
        //        new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT),
        //        new SqlParameter("@SERVICE_END_COST",SERVICE_END_COST),
        //        new SqlParameter("@SERVICE_GUID",SERVICE_GUID),
        //        new SqlParameter("@textForPlanDate",textForPlanDate),
        //        new SqlParameter("@SPECIALIST_ID",SpId),
        //        new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID),
        //        new SqlParameter("@STATUS","1")
        //    }, CommandType.StoredProcedure);
        //    string MOBILE_NUMBER = Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", Rid) }, CommandType.StoredProcedure).ToString();
        //    int Rid_ = Convert.ToInt32(MOBILE_NUMBER);

        //    string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";



        //    if (RESPONSIBLE_ID != null)
        //    {
        //        SendEmailForRequest(Text, RESPONSIBLE_EMAIL, Rid_, 1, Convert.ToInt32(RESPONSIBLE_ID));
        //    }

        //    Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «В работе»."; ;
        //    dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;
        //    if (SPECIATISTS == null)
        //    {
        //        if (SpId != null)
        //        {
        //            SERVICES_SPECIALISTS_CRUD("", Rid_, "", "Delete");
        //            SendEmailForRequest(Text, PERFORMER_EMAIL, Rid_, 1, Convert.ToInt32(SpId));
        //        }
        //    }
        //    return "";
        //}

        [WebMethod]
        public static string MakeVrabote(int Rid, object Ispol, string ispolEmail, string login_id, string path)
        {

            object Old_SPECIALIS_ID = Mydb.ExecuteScalar("select SPECIALIS_ID from REQUEST where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.Text);


            //  string path = HttpContext.Current.Request.Url.AbsolutePath;
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 1),new SqlParameter("@lg",Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);

            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "IspolChange"), new SqlParameter("@rId", Rid), new SqlParameter("@IspolId", Convert.ToInt32(Ispol)), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);

            string EVENT_ROLE = (path.IndexOf("Manager/") > -1) ? "Управляющий" : (path.IndexOf("Super_Disp/") > -1) ? "Супер Диспетчер" : (path.IndexOf("Responsible_Admin/") > -1) ? "Ответственный" : (path.IndexOf("Disp_Admin/") > -1) ? "Диспетчер" : "Диспетчер поставщика";
            if (Ispol != Old_SPECIALIS_ID)
            {
                object new_spId = (Ispol != null) ? Convert.ToInt32(Ispol) : (object)DBNull.Value;

                Old_SPECIALIS_ID = (Old_SPECIALIS_ID != DBNull.Value) ? Convert.ToInt32(Old_SPECIALIS_ID) : (object)DBNull.Value;
                // TextForPerformer = "исполнитель изменен с «" + Old_requests.SPECIALIS_ID + "» на «" + newRequest.spId + "»";
                Mydb.ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",Rid),
                         new SqlParameter("@EVENT_MAKER",login_id),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE","Обновить"),
                         new SqlParameter("@LOG_TYPE",2),
                         new SqlParameter("@OLD_ID",Old_SPECIALIS_ID),
                         new SqlParameter("@NEW_ID",new_spId)
                    }, CommandType.StoredProcedure);
            }

            Mydb.ExecuteNoNQuery("ReturnToWork", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@ispol", (Ispol == null) ? (object)DBNull.Value : Convert.ToInt32(Ispol)) }, CommandType.StoredProcedure);



            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));
          

          //  Mydb.COMPARE_REQUESTS(false, "", Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > В работе", path, "");
            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";

            var RESPONSIBLE_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 4) }, CommandType.StoredProcedure);


            var RESPONSIBLE_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 3) }, CommandType.StoredProcedure);

            if (RESPONSIBLE_EMAIL != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid, 1, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «В работе».";

            if (Ispol != null)
            {
                int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(Ispol)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                if (IS_DISPATCHER == 1)
                {
                    SendEmailForRequest(Text, ispolEmail, Rid, 1, Convert.ToInt32(Ispol), "Диспетчер");
                }
              
            }



            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 1) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 1), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }
            return "";

        }
        [WebMethod]
        public static string GetRStTF(int rid)
        {

            return Mydb.ExecuteAsJson("GetRStTF", new SqlParameter[] { new SqlParameter("@rid", rid) }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string GetProjects(int lg, string path)

        {
            int role = (path.IndexOf("Manager/") > -1) ? 1 : (path.IndexOf("Super_Disp/") > -1) ? 17 : (path.IndexOf("Responsible_Admin/") > -1) ? 16 : (path.IndexOf("Disp_Admin/") > -1) ? 3 : 15;
            return Mydb.ExecuteAsJson("GetProjects", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetKindOfRequest()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetKindOfRequest", new SqlParameter[] { }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string getObjectByProjectId(int prj)
        {

            return Mydb.ExecuteAsJson("getObjectByProjectId", new SqlParameter[] { new SqlParameter("@prj", prj) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetDispsByObjectid(int obj)
        {

            return Mydb.ExecuteAsJson("GetDispsByObjectid", new SqlParameter[] { new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string getRoomTypes()
        {
            return
Mydb.ExecuteAsJson("getRoomTypes", new SqlParameter[] { }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetDatasByAccNum(string nmbr)
        {
            return Mydb.ExecuteAsJson("GetDatasByAccNum", new SqlParameter[] { new SqlParameter("@nmbr",nmbr
) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string getInddata(string rm, int obj, int RoomT)
        {
            return Mydb.ExecuteAsJson("getInddata", new SqlParameter[] { new SqlParameter("@rm", rm), new SqlParameter("@obj", obj), new SqlParameter("@RoomT", RoomT) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string gethasInd2(string score)
        {
            return Mydb.ExecuteAsJson("gethasInd2", new SqlParameter[] { new SqlParameter("@Score", score) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string gethasInd(int indId)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("gethasInd", new SqlParameter[] { new SqlParameter("@indId", indId) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetRelatedSets(int obj)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetRelatedSets", new SqlParameter[] { new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetExistSeriveDirect(int ss, int obj)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetExistSeriveDirect", new SqlParameter[] { new SqlParameter("@ss", ss), new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetResponsibels_()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetResponsibels", new SqlParameter[] { }, CommandType.StoredProcedure);

        }
        [WebMethod]
        public static string GetProductServices(int o, int g)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetProductServices", new SqlParameter[] { new SqlParameter("@objId", o), new SqlParameter("@d", g) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string Give_Selected_Set_Direct_Service_For_Search(int objid)
        {

            return Mydb.ExecuteAsJson("[Give_Selected_Set_Direct_Service_For_Search]", new SqlParameter[] { new SqlParameter("objid", objid) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GetPerFormers(int obj)
        {

            return Mydb.ExecuteAsJson("GetPerFormers", new SqlParameter[] { new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string SaveHFile(string R, string imgs, string AUTHOR, object status = null)
        {
            dynamic j = JsonConvert.DeserializeObject(imgs);
            string img = j[0].ImgAdres;

            for (int i = 0; i < j.Count; i++)
            {
                if (j[i].ImgAdres != "")
                {
                    string ImgAdres = j[i].ImgAdres;
                    if (int.TryParse(R, out int rid))
                    {

                        Mydb.ExecuteNoNQuery("SaveHFile", new SqlParameter[] { new SqlParameter("@rid", rid), new SqlParameter("@url", ImgAdres), new SqlParameter("@AUTHOR", AUTHOR) }, CommandType.StoredProcedure);
                        if (status!=null)
                        {
                            Mydb.ExecuteNoNQuery("[UpdateMobileRequest]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", rid), new SqlParameter("@FILES", ImgAdres) }, CommandType.StoredProcedure);
                        }
                    }
                    else
                    {
                        Mydb.ExecuteNoNQuery("SaveHFile", new SqlParameter[] { new SqlParameter("@url", ImgAdres), new SqlParameter("@AUTHOR", AUTHOR), new SqlParameter("@REQ_GUID", R) }, CommandType.StoredProcedure);
                    }
                }
            }

            return "";
        }
        [WebMethod]
        public static string makeVipolSupp(string Rid, string rsf, string rst, string opl, string login_id, object ispol, object ispolEmail, object RESPONSIBLE_ID, object RESPONSIBLE_EMAIL, string TOTAL_COST, string prs_json, string Pdate, string Ptime, string path, string request_type, string SPECIATISTS_ = null)
        {
            string result = "";


            //string prs_json = HttpContext.Request.Params["prs_json"];
            dynamic prs = JsonConvert.DeserializeObject(prs_json);
            string REQGUID = Rid;
            string SERVICE_COUNT = prs[0].QUANTITY;
            string SERVICE_GUID = prs[0].SERVICE_GUID;
            string SERVICE_END_COST = TOTAL_COST;
            SERVICE_END_COST = SERVICE_END_COST.Replace("Итого: ", "").Replace("руб", "");
            string pdate = Pdate;
            string[] pdate_ = pdate.Split('-');
            pdate = pdate_[2] + "." + pdate_[1] + "." + pdate_[0];
            int SPECIALIST_ID = Convert.ToInt32(ispol);

            dynamic j = JsonConvert.DeserializeObject(rsf);
            string img = j[0].ImgAdres;
            string ImgAdres = "";
            for (int i = 0; i < j.Count; i++)
            {
                if (j[i].ImgAdres != 0)
                {
                    if (i == 0)
                    {
                        ImgAdres = j[i].ImgAdres;
                    }
                    else
                    {
                        ImgAdres = ImgAdres + "," + j[i].ImgAdres;
                    }
                }
            }
            // int RESPONSIBLE_ID = Convert.ToInt32(RESPONSIBLE_ID);

            //  pdate =// pdate.ToString("DD.MM.YYY");// Reverse(pdate);
            // string textForPlanDate = R_datas.AUTHOR_COMMENT + " : " + "Планируемая дата ( " + pdate + "), Планируемое время (" + R_datas.Ptime + ")";
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rGuid", REQGUID), new SqlParameter("@NewStatusId", 3), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);


            DateTime endTime = DateTime.Parse(Ptime);
            endTime = endTime.AddHours(2);
            Mydb.ExecuteNoNQuery("Update_MP_Requests", new SqlParameter[] {
                new SqlParameter("@REQGUID",REQGUID),
                new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT),
                new SqlParameter("@SERVICE_END_COST",SERVICE_END_COST),
                new SqlParameter("@SERVICE_GUID",SERVICE_GUID),
               // new SqlParameter("@textForPlanDate",textForPlanDate),
                new SqlParameter("@SPECIALIST_ID",SPECIALIST_ID),
                new SqlParameter("@RESPONSIBLE_ID",Convert.ToInt32(RESPONSIBLE_ID)),
                   new SqlParameter("@SERVICE_NAME",(string)prs[0].SERVICE_NAME),
                new SqlParameter("@FILES",ImgAdres),
             //   new SqlParameter("@COMMENT_",rst),
                new SqlParameter("@STATUS","3"),
                   new SqlParameter("@WORKDATE",pdate),
                new SqlParameter("@WORKBEGIN",Ptime),
                new SqlParameter("@WORKEND",endTime.ToString("HH:mm")),
                 new SqlParameter("@PAYED",opl),
                 new SqlParameter("@request_type",request_type)

            }, CommandType.StoredProcedure);

            Mydb.ExecuteNoNQuery("sntComment", new SqlParameter[] { new SqlParameter("@REQ_GUID", REQGUID), new SqlParameter("@rc", rst)
                , new SqlParameter("@lg", Convert.ToInt32(login_id)),new SqlParameter("@is_vipol","1") }, CommandType.StoredProcedure);
            for (int i = 0; i < prs.Count; i++)
            {
                string COST_ = prs[i].COST;
                string SERVICE_COUNT_ = prs[i].QUANTITY.ToString();
                string SERVICE_NAME_ = prs[i].SERVICE_NAME;
                string SERVICE_GUID_ = prs[i].SERVICE_GUID;
                Mydb.ExecuteNoNQuery("UpdateServicesForSupRequest", new SqlParameter[] {
                    new SqlParameter("@REQ_GUID",REQGUID),
                    new SqlParameter("@SERVICE_COUNT",SERVICE_COUNT_),
                    new SqlParameter("@SERVICE_END_COST",COST_),
                    new SqlParameter("@SERVICE_GUID",SERVICE_GUID_),
                    new SqlParameter("@SERVICE_NAME",SERVICE_NAME_),
                    new SqlParameter("@i",i)

                }, CommandType.StoredProcedure);
            }
            string MOBILE_NUMBER = Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", REQGUID) }, CommandType.StoredProcedure).ToString();
          
            Mydb.ExecuteNoNQuery("INSERT_FCM_LOG", new SqlParameter[] {

                new SqlParameter("@SECTION","Заявка"),
           new SqlParameter("@EVENT","Заявка № П-"+MOBILE_NUMBER+" выполнена"),
           new SqlParameter("@TEXT","Заявка № П-"+MOBILE_NUMBER+" выполнена" ),
        //   new SqlParameter("@PROJECT_ID",PROJECT_ID),
           new SqlParameter("@SCORE_ID",""),
           new SqlParameter("@tokenId",SPECIALIST_ID.ToString()),
          new SqlParameter("@LOG_IN_ID",Convert.ToInt32(login_id)),
           new SqlParameter("@PAGE",path),
           new SqlParameter("@ID",MOBILE_NUMBER),

            }, CommandType.StoredProcedure);


            SendEmailToSupplier(Convert.ToInt32(MOBILE_NUMBER), REQGUID, Convert.ToInt32(login_id), "Выполнена");
            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «Выполнена».";
            int Rid_ = Convert.ToInt32(MOBILE_NUMBER);

            if (RESPONSIBLE_ID != null)
            {

                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid_, 3, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Выполнена».";

            dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;
            if (SPECIATISTS_ == null)
            {

                if (ispolEmail != null)
                {
                    int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(ispol)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                    if (IS_DISPATCHER == 1)
                    {
                        SendEmailForRequest(Text, ispolEmail.ToString(), Rid_, 3, Convert.ToInt32(ispol), "Диспетчер");
                    }
                    //  SERVICES_SPECIALISTS_CRUD("", Rid, "", "Delete");
                  

                }
            }
            return result;
        }
        [WebMethod]
        public static string makeVipol(int Rid, string rsf, string rst, string opl, string login_id, object ispol, object ispolEmail, object RESPONSIBLE_ID, object RESPONSIBLE_EMAIL, object TOTAL_COST, string prs_json, string Pdate, string Ptime, string path, string request_type, string RequestKind, string SPECIATISTS_ = null)
        {
            //  var ispol_val=(ispol != null) ? ispol : DBNull.Value;
            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_TEXT (RS_TEXT) values (@rst)", new SqlParameter[] { new SqlParameter("@rst", rst) }, CommandType.Text);
            int LastId = (int)Mydb.ExecuteScalar(" select top 1 RST_ID from REQUEST_STATUS_TEXT order by RST_ID desc", new SqlParameter[] { }, CommandType.Text);

            dynamic j = JsonConvert.DeserializeObject(rsf);
            if (j[0].ImgAdres == "0")
            {
                Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)"
                    , new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", "0"), new SqlParameter("@rst", LastId) }, CommandType.Text);
            }
            for (int i = 0; i < j.Count; i++)
            {
                string ImgAdres = j[i].ImgAdres;
                if (ImgAdres == "0")
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", "0"), new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
                else
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_FILE (REQUEST_ID,FILE_ADRESS,RST_ID)values (@r_id,@fs,@rst)", new SqlParameter[] { new SqlParameter("@r_id", Rid), new SqlParameter("@fs", ImgAdres), new SqlParameter("@rst", LastId) }, CommandType.Text);
                }
            }
            var Request_As_json = new[] {
                 new {Pdate=Pdate,Ptime=Ptime,spId=ispol,RESPONSIBLE_ID=RESPONSIBLE_ID,STATUS_ID=3}
            };
            string MOBILE_NUMBER = Convert.ToString(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            Mydb.COMPARE_REQUESTS(true, JsonConvert.SerializeObject(Request_As_json), Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > выполнена", path, prs_json);

            /*Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=3,DONE_DATE=GETDATE(),PAYMENT=@PAYMENT, RESPONSIBLE_ID=@RESPONSIBLE_ID,SPECIALIS_ID=@ispol,TOTAL_COST=@TOTAL_COST,PLAN_END_DATE=CAST(@Pdate as date), PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ) where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@PAYMENT", Convert.ToBoolean(opl)), new SqlParameter("@RESPONSIBLE_ID", (RESPONSIBLE_ID == null) ? (object)DBNull.Value : Convert.ToInt32(RESPONSIBLE_ID)), new SqlParameter("@ispol", (ispol == null) ? (object)DBNull.Value : Convert.ToInt32(ispol)), new SqlParameter("@TOTAL_COST", TOTAL_COST), new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime) }, CommandType.Text)*/

            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 3), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);

            Mydb.ExecuteNoNQuery("UPDATE_REQUEST_SUPER", new SqlParameter[] { new SqlParameter("@statusid",3),new SqlParameter("@HReq", Rid), new SqlParameter("@opl", Convert.ToBoolean(opl)), new SqlParameter("@RESPONSIBLE_ID", (RESPONSIBLE_ID == null) ? (object)DBNull.Value : Convert.ToInt32(RESPONSIBLE_ID)), new SqlParameter("@spId", (ispol == null) ? (object)DBNull.Value : Convert.ToInt32(ispol)), new SqlParameter("@TOTAL_COST", TOTAL_COST), new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime),new SqlParameter("@request_type", request_type),new SqlParameter("@work_kind",RequestKind) }, CommandType.StoredProcedure);

            dynamic prs = JsonConvert.DeserializeObject(prs_json);
            Mydb.ExecuteNoNQuery("Delete_Services_Super", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);

            for (int i = 0; i < prs.Count; i++)
            {
                Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
            }

            // int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «Выполнена».";


            if (RESPONSIBLE_ID != null)
            {

                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid, 3, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Выполнена».";

            dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;
            if (SPECIATISTS_ == null)
            {

                if (ispolEmail != null)
                {
                    // SERVICES_SPECIALISTS_CRUD("", Rid, "", "Delete");
                    int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(ispol)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                    if (IS_DISPATCHER == 1)
                    {
                        SendEmailForRequest(Text, ispolEmail.ToString(), Rid, 3, Convert.ToInt32(ispol), "Диспетчер");
                    }
                   

                }
            }
            else
            {
               // SERVICES_SPECIALISTS_CRUD(SPECIATISTS, Rid, Text, "Update");
            }

            if (Convert.ToInt32(MOBILE_NUMBER) != 0)
            {
                DateTime endTime = DateTime.Parse(Ptime);
                endTime = endTime.AddHours(2);
                string RequestText_UP = "Услуга: " +(string) prs[0].SERVICE_NAME +
                     Environment.NewLine +
                     "Количество: " + (string)prs[0].QUANTITY +
                      Environment.NewLine +
                      "Стоимость: " + (string)prs[0].COST
                      +Environment.NewLine+
                      rst;
                Mydb.ExecuteNoNQuery("UpdateMobileRequest",
                       new SqlParameter[] {
                            new SqlParameter("@MOBILE_NUMBER",Convert.ToInt32(MOBILE_NUMBER)),
                            new SqlParameter("@WORKDATE",SpliteReverseJoinDate(Pdate)),
                            new SqlParameter("@WORKBEGIN",Ptime),
                            new SqlParameter("@WORKEND",endTime.ToString("HH:mm")),
                            new SqlParameter("@RequestText",RequestText_UP),
                           new SqlParameter("@request_type",request_type),
                       new SqlParameter("@work_kind",RequestKind)}, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 3) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 3), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }


            return "";

        }


        [WebMethod]
        public static string Vrabot_to_Otprav(int Rid, string rsf, string rst, string opl, string login_id, object ispol, object ispolEmail, object RESPONSIBLE_ID, object RESPONSIBLE_EMAIL, object TOTAL_COST, string prs_json, string Pdate, string Ptime, string path, string RequestKind, int REQUEST_TYPE, string SPECIATISTS_ = null)
        {
            //  var ispol_val=(ispol != null) ? ispol : DBNull.Value;
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 2), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);
            Mydb.ExecuteNoNQuery("insert into REQUEST_STATUS_TEXT (RS_TEXT) values (@rst)", new SqlParameter[] { new SqlParameter("@rst", rst) }, CommandType.Text);
          

            dynamic j = JsonConvert.DeserializeObject(rsf);
            
            var Request_As_json = new[] {
                new {Pdate=Pdate,Ptime=Ptime,spId=ispol,RESPONSIBLE_ID=RESPONSIBLE_ID,STATUS_ID=2}
            };
            string MOBILE_NUMBER = Convert.ToString(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            Mydb.COMPARE_REQUESTS(true, JsonConvert.SerializeObject(Request_As_json), Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > отправлена", path, prs_json);

            Mydb.ExecuteNoNQuery("Update REQUEST set STATUS_ID=2,DONE_DATE=GETDATE(),PAYMENT=@PAYMENT, RESPONSIBLE_ID=@RESPONSIBLE_ID,SPECIALIS_ID=@ispol,TOTAL_COST=@TOTAL_COST,PLAN_END_DATE=CAST(@Pdate as date),PROF_PLAN_END_DATE=CAST(@Pdate as date), PROF_PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ),PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ), WORK_KIND=@WORK_KIND,REQUEST_TYPE=@REQUEST_TYPE where REQUEST_ID=@rid", new SqlParameter[] { new SqlParameter("@rid", Rid), new SqlParameter("@PAYMENT", Convert.ToBoolean(opl)), new SqlParameter("@RESPONSIBLE_ID", (RESPONSIBLE_ID == null) ? (object)DBNull.Value : Convert.ToInt32(RESPONSIBLE_ID)), new SqlParameter("@ispol", (ispol == null) ? (object)DBNull.Value : Convert.ToInt32(ispol)), new SqlParameter("@TOTAL_COST", TOTAL_COST), new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime),new SqlParameter("@WORK_KIND",RequestKind),new SqlParameter("@REQUEST_TYPE", REQUEST_TYPE) }, CommandType.Text);

            dynamic prs = JsonConvert.DeserializeObject(prs_json);
            Mydb.ExecuteNoNQuery("Delete_Services_Super", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);

            for (int i = 0; i < prs.Count; i++)
            {
                Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Rid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
            }

            // int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));

            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «Отправлена».";


            if (RESPONSIBLE_ID != null)
            {

                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid, 2, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }

            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Отправлена».";

            dynamic SPECIATISTS = (SPECIATISTS_ != null) ? JsonConvert.DeserializeObject(SPECIATISTS_) : null;

            if (SPECIATISTS_ == null)
            {
                if (ispolEmail != null)
                {
                    //  SERVICES_SPECIALISTS_CRUD("", Rid, "", "Delete");
                    int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(ispol)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                    if (IS_DISPATCHER == 1)
                    {

                    SendEmailForRequest(Text, ispolEmail.ToString(), Rid, 2, Convert.ToInt32(ispol), "Диспетчер");
                    }


                }
            }
            else
            {
              //  SERVICES_SPECIALISTS_CRUD(SPECIATISTS, Rid, Text, "Update");
            }

            if (Convert.ToInt32(MOBILE_NUMBER) != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 2) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 2), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }


            return "";

        }

        [WebMethod]
        public static string GetDispName(int lg)
        {
            return Mydb.ExecuteAsJson("GetDispName", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
            /*select ACCOUNT_NAME,E_MAIL from ACCOUNT where LOG_IN_ID=@lg*/
        }
        [WebMethod]
        public static string GetTexniks(int objId)
        {
            return Mydb.ExecuteAsJson("GetTexniks", new SqlParameter[] { new SqlParameter("@objId", objId) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string sntComment(string rq, string cmnt, string AUTHOR, int lg, string path, object status = null)
        {
            string EVENT_ROLE = (path.IndexOf("Manager/") > -1) ? "Управляющий" : (path.IndexOf("Super_Disp/") > -1) ? "Супер Диспетчер" : (path.IndexOf("Responsible_Admin/") > -1) ? "Ответственный" : (path.IndexOf("Disp_Admin/") > -1) ? "Диспетчер" : "Диспетчер поставщика";
            int supReqId = 0;
            if (int.TryParse(rq, out int rid))
            {
                supReqId = rid;
                Mydb.ExecuteNoNQuery("sntComment", new SqlParameter[] { new SqlParameter("@rq", rid), new SqlParameter("@rc", cmnt), new SqlParameter("@AUTHOR", AUTHOR) }, CommandType.StoredProcedure);
                if (status != null)
                {
                    Mydb.ExecuteNoNQuery("[UpdateMobileRequest]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", rid), new SqlParameter("@RequestText", cmnt) }, CommandType.StoredProcedure);
                }
            }
            else
            {
                Mydb.ExecuteNoNQuery("sntComment", new SqlParameter[] { new SqlParameter("@REQ_GUID", rq), new SqlParameter("@rc", cmnt), new SqlParameter("@AUTHOR", AUTHOR) }, CommandType.StoredProcedure);
                supReqId = Convert.ToInt32(Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", rq) }, CommandType.StoredProcedure));
            }



            Mydb.ExecuteNoNQuery("[insert_HISTORY_LOG]", new SqlParameter[] {
                         new SqlParameter("@REQUEST_ID",supReqId),
                         new SqlParameter("@EVENT_MAKER",lg),
                         new SqlParameter("@EVENT_ROLE",EVENT_ROLE),
                         new SqlParameter("@EVENT_TYPE","Комментария"),
                         new SqlParameter("@LOG_TYPE",1),
                         new SqlParameter("@PLAN_DATE_TEXT","«"+cmnt+"»")
                    }, CommandType.StoredProcedure);
            return "";
        }
        [WebMethod]
        public static string SaveRequest_Super(string jsonRequestString, string prs_json, string Cf_json)
        {
            string result = "";
            dynamic R_datas = JsonConvert.DeserializeObject(jsonRequestString);


            #region Parameters
            int slcObj = (int)R_datas.slcObj;
            int IndId_ = (int)R_datas.IndId_;
            int Lg = (int)R_datas.Lg;
            string em = R_datas.em;

            string Pdate = R_datas.Pdate;
            string Ptime = R_datas.Ptime;
            int spId = (int)R_datas.spId;
            string Rt = R_datas.Rt;
            // string prs_json = R_datas.prs;
            dynamic prs = JsonConvert.DeserializeObject(prs_json);

            string Rc = R_datas.Rc;
            // string Cf_json = R_datas.Cf;
            dynamic Cf = JsonConvert.DeserializeObject(Cf_json);

            int RoomT = (int)R_datas.RoomT;
            string NUMBER = R_datas.NUMBER;
            string opl = R_datas.opl;
            string phn = R_datas.phn;

            int HReq = (int)R_datas.HReq;
            string indName = R_datas.indName;
            string TOTAL_COST = R_datas.TOTAL_COST;
            int RESPONSIBLE_ID = (int)R_datas.RESPONSIBLE_ID;
            #endregion

            string files = "";
            if (Cf.Count != 0)
            {

                string domainName = System.Net.Dns.GetHostName();
                // files = domainName;
                for (int i = 0; i < Cf.Count; i++)
                {
                    if (i == Cf.Count - 1)
                    {
                        files += Cf[i].COMMENT_FILE;
                    }
                    else
                    {
                        files += Cf[i].COMMENT_FILE + ",";
                    }
                }
            }
            string time = DateTime.Now.AddHours(1).ToString("HH:mm");
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string LOTUS_GUID_ = "";
            var MobileNumber = Mydb.ExecuteScalar("TestDB.dbo.sp_QUICK_API_new_request_add_autopilot2mobile", new SqlParameter[] {
                new SqlParameter("@object_id",slcObj),
                new SqlParameter("@number",NUMBER),
                new SqlParameter("@phone_number",phn),
                new SqlParameter("@request_text",Rc),
                new SqlParameter("@work_kind",LOTUS_GUID_),
                new SqlParameter("@files",files),
                new SqlParameter("@workdate",date),
                new SqlParameter("@workbegin",time),
                new SqlParameter("@workend",time),
                 new SqlParameter("@destination","")
            }, CommandType.StoredProcedure);
            int Inserted_Requestid = 0;
            int ClientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@l ", new SqlParameter[] { new SqlParameter("@l", Lg) }, CommandType.Text);
            if (IndId_ == 0)
            {
                if (HReq == 0)
                {
                    Inserted_Requestid = (int)Mydb.ExecuteScalar("SaveRequest_Super", new SqlParameter[] {
                     new SqlParameter("@em",Convert.ToBoolean(em)),
                    //  new SqlParameter("@IndId_",0),

                 new SqlParameter("@Pdate",Pdate),
                 new SqlParameter("@Ptime",Ptime),
                 new SqlParameter("@spId",spId),
                 new SqlParameter("@lg",Lg),
                 new SqlParameter("@Rt",Rt),
                  new SqlParameter("@CId",ClientId),
                new SqlParameter("@roomT",RoomT),
                new SqlParameter("@NUMBER",NUMBER),
                new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@phn",phn),
                 new SqlParameter("@MOBILE_NUMBER",MobileNumber),
                 new SqlParameter("@OBJECT_ID",slcObj),
                 new SqlParameter("@INDIVIDUAL_NAME",indName),
                 new SqlParameter("@TOTAL_COST",TOTAL_COST),
                 new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)
                    }, CommandType.StoredProcedure);


                    //foreach (var item in prs)
                    //{
                    //    Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    //new SqlParameter("@Rid",Inserted_Requestid),

                    //new SqlParameter("@Q",item.QUANTITY),
                    //new SqlParameter("@C",item.COST),
                    //    new SqlParameter("@SERVICE_GUID",item.SERVICE_GUID)}, CommandType.StoredProcedure);
                    //}
                    for (int i = 0; i < prs.Count; i++)
                    {
                        Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Inserted_Requestid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
                    }

                    Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",Inserted_Requestid)

                    }, CommandType.StoredProcedure);

                    foreach (var item in Cf)
                    {
                        if (item.COMMENT_FILE != "0")
                        {
                            Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] { new SqlParameter("@Cf", (string)item.COMMENT_FILE), new SqlParameter("@Rid", Inserted_Requestid) }, CommandType.StoredProcedure);
                        }
                    }

                }
                else
                {
                    Mydb.ExecuteNoNQuery("UPDATE_REQUEST_SUPER", new SqlParameter[] {
                        new SqlParameter("@Pdate", Pdate),
                        new SqlParameter("@Ptime", Ptime),
                        new SqlParameter("@spId", spId),
                        new SqlParameter("@TOTAL_COST",TOTAL_COST),
                        new SqlParameter("@opl", Convert.ToBoolean(opl)),
                        new SqlParameter("@em", Convert.ToBoolean(em)),
                        new SqlParameter("@HReq", HReq)
                    }, CommandType.Text);


                    for (int i = 0; i < prs.Count; i++)
                    {
                        Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Inserted_Requestid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
                    }

                  //  string PlanDate_Time = "Планируемая дата (" + Pdate + ") Планируемое время (" + Ptime + ")";
                    //Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] {
                    //    new SqlParameter("@Rc",PlanDate_Time),
                    //    new SqlParameter("@Rid",HReq)}, CommandType.StoredProcedure);
                    Inserted_Requestid = HReq;

                    result = "{\"result\":\"Ok\",\"RequestId\" : \"" + Inserted_Requestid.ToString() + "\"}";
                }
            }
            else
            {
                Inserted_Requestid = (int)Mydb.ExecuteScalar("SaveRequest_Super", new SqlParameter[] {
                           new SqlParameter("@em",Convert.ToBoolean(em)),
                new SqlParameter("@indId_",IndId_),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
                new SqlParameter("@CId",ClientId),
               new SqlParameter("@roomT",RoomT),
               new SqlParameter("@NUMBER",NUMBER),
               new SqlParameter("@opl",Convert.ToBoolean(opl)),
               new SqlParameter("@phn",phn),
                new SqlParameter("@MOBILE_NUMBER",MobileNumber),
                new SqlParameter("@OBJECT_ID",slcObj),
                new SqlParameter("@INDIVIDUAL_NAME",indName),
                new SqlParameter("@TOTAL_COST",TOTAL_COST),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)
                }, CommandType.StoredProcedure);

                for (int i = 0; i < prs.Count; i++)
                {
                    Mydb.ExecuteNoNQuery("INSERT_SERVICE_SUPER", new SqlParameter[] {
                    new SqlParameter("@Rid",Inserted_Requestid),

                    new SqlParameter("@Q",(decimal)prs[i].QUANTITY),
                    new SqlParameter("@C",(string)prs[i].COST),
                        new SqlParameter("@SERVICE_GUID",(string)prs[i].SERVICE_GUID)}, CommandType.StoredProcedure);
                }

                Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",Inserted_Requestid)

                    }, CommandType.StoredProcedure);

                foreach (var item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] { new SqlParameter("@Cf", (string)item.COMMENT_FILE), new SqlParameter("@Rid", Inserted_Requestid) }, CommandType.StoredProcedure);
                    }
                }

                result = "{\"result\":\"Ok\",\"RequestId\" : \"" + Inserted_Requestid.ToString() + "\"}";

            }

            return result;
        }





        [WebMethod]
        public static string SaveRequest(int slcObj, int IndId_, int Lg, string em, int DId, string Pdate, string Ptime, int spId, string Rt, List<ProductService_> prs, string Rc, List<REQUEST_COMMENT> Cf, int RoomT, string NUMBER, string opl, string phn, int gs, int HReq, int level, int dId, int sid, string costDirect, string CostSet, string indName, int RESPONSIBLE_ID)//int Tc,
        {
            Rt = HttpUtility.UrlDecode(Rt);
            Rt.Replace("\\", "");
            Rc = HttpUtility.UrlDecode(Rc);
            Rc = Rc.Replace(@"\", string.Empty);
            //Rt=Rt.Replace("\\","");
            //Rc=Rc.Replace("\\","")
            int ClientId = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@l ", new SqlParameter[] { new SqlParameter("@l", Lg) }, CommandType.Text);
            //Mydb.ExecuteNoNQuery("insert into INDIVIDUAL (IND_PHONE_NUMBER,CLIENT_ID) values(@ph,@Cl)", new SqlParameter[] {new SqlParameter("@ph",IndPhon),new SqlParameter("@Cl",ClientId) }, CommandType.Text);
            string result = "";
            int CrRequest;
            if (IndId_ == 0)
            {
                if (HReq == 0)
                {


                    Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,SERVICE_GROUP_ID,MOBILE_NUMBER,OBJECT_ID,INDIVIDUAL_NAME,RESPONSIBLE_ID)values(@em,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@gs,@MOBILE_NUMBER,@OBJECT_ID,@INDIVIDUAL_NAME,@RESPONSIBLE_ID)", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
               // new SqlParameter("@indId",LastIndId),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
              //  new SqlParameter("@Tc",Tc),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@roomT",RoomT),
                new SqlParameter("@NUMBER",NUMBER),
                new SqlParameter("@opl",Convert.ToBoolean(opl)),
                new SqlParameter("@gs",gs),
                new SqlParameter("@MOBILE_NUMBER",DBNull.Value),
                new SqlParameter("@OBJECT_ID",slcObj),
                new SqlParameter("@INDIVIDUAL_NAME",indName),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)
            }, CommandType.Text);
                    int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                    CrRequest = LastReqId;
                    if (level == 3)
                    {
                        foreach (ProductService_ item in prs)
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);


                        }
                    }
                    if (level == 2)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }//,COMMENT_FILE    //,@Cf
                    if (level == 1)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }
                    Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
                //,new SqlParameter("@Cf",Cf)
            }, CommandType.Text);

                    foreach (REQUEST_COMMENT item in Cf)
                    {
                        if (item.COMMENT_FILE != "0")
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                        }
                    }

                }
                else
                {
                    Mydb.ExecuteNoNQuery("update REQUEST set STATUS_ID=1,PLAN_END_DATE=CAST(@Pdate as date),PLAN_END_TIME=CAST(REPLACE(@Ptime,'-',':')as time(0) ),SPECIALIS_ID=@spId, PAYMENT=@opl,EMERGENCY_TREATMENT=@em where REQUEST_ID=@HReq", new SqlParameter[] { new SqlParameter("@Pdate", Pdate), new SqlParameter("@Ptime", Ptime), new SqlParameter("@spId", spId), new SqlParameter("@opl", Convert.ToBoolean(opl)), new SqlParameter("@em", Convert.ToBoolean(em)), new SqlParameter("@HReq", HReq) }, CommandType.Text);
                    //foreach (ProductService_ item in prs)
                    //{
                    //    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                    //new SqlParameter("@Rid",HReq),
                    //new SqlParameter("@PId",item.SERVICE_ID),
                    //new SqlParameter("@Q",item.QUANTITY),
                    //new SqlParameter("@C",item.COST)}, CommandType.Text);

                    //}

                    if (level == 3)
                    {
                        foreach (ProductService_ item in prs)
                        {
                            Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);


                        }
                    }
                    if (level == 2)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }//,COMMENT_FILE    //,@Cf
                    if (level == 1)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",HReq),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                    }

            //        string PlanDate_Time = "Планируемая дата (" + Pdate + ") Планируемое время (" + Ptime + ")";
            //        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
            //    new SqlParameter("@Rc",PlanDate_Time),
            //    new SqlParameter("@Rid",HReq)
            //    //,new SqlParameter("@Cf",Cf)
            //}, CommandType.Text);
                    CrRequest = HReq;
                }


                result = "{\"result\":\"Ok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
                // return result;
            }
            else
            {

                Mydb.ExecuteNoNQuery("insert into REQUEST (EMERGENCY_TREATMENT,INDIVIDUAL_ID,DELIVERY_TYPE_ID,PLAN_END_DATE,PLAN_END_TIME,SPECIALIS_ID,LOG_IN_ID,REQUEST_TEXT,CLIENT_ID,CR_DATE,STATUS_ID,ROOM_T,NUMBER,PAYMENT,PHONE_NUMBER,SERVICE_GROUP_ID,MOBILE_NUMBER,OBJECT_ID,INDIVIDUAL_NAME,RESPONSIBLE_ID)values(@em,@indId,@DId,CAST(@Pdate as date),CAST(REPLACE(@Ptime,'-',':')as time(0) ),@spId,@lg,@Rt,@CId,GETDATE ( ),1,@roomT,@NUMBER,@opl,@phn,@gs,@MOBILE_NUMBER,@OBJECT_ID,@INDIVIDUAL_NAME,@RESPONSIBLE_ID )", new SqlParameter[] {
                new SqlParameter("@em",Convert.ToBoolean(em)),
               // new SqlParameter("@Adr",Adr),
                new SqlParameter("@indId",IndId_),
                new SqlParameter("@DId",DId),
                new SqlParameter("@Pdate",Pdate),
                new SqlParameter("@Ptime",Ptime),
                new SqlParameter("@spId",spId),
                new SqlParameter("@lg",Lg),
                new SqlParameter("@Rt",Rt),
               new SqlParameter("@roomT",RoomT),
               new SqlParameter("@NUMBER",NUMBER),
               new SqlParameter("@opl",Convert.ToBoolean(opl)),
               new SqlParameter("@phn",phn),
               new SqlParameter("@gs",gs),
                new SqlParameter("@CId",ClientId),
                new SqlParameter("@MOBILE_NUMBER",DBNull.Value),
                new SqlParameter("@OBJECT_ID",slcObj),
                new SqlParameter("@INDIVIDUAL_NAME",indName),
                new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID)}, CommandType.Text);
                int LastReqId = (int)Mydb.ExecuteScalar("select top 1 REQUEST_ID from REQUEST order by REQUEST_ID desc", new SqlParameter[] { }, CommandType.Text);
                CrRequest = LastReqId;
                //foreach (ProductService_ item in prs)
                //{
                //    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST) values (@Rid,@PId,@Q,@C)", new SqlParameter[] {
                //    new SqlParameter("@Rid",LastReqId),
                //    new SqlParameter("@PId",item.SERVICE_ID),
                //    new SqlParameter("@Q",item.QUANTITY),
                //    new SqlParameter("@C",item.COST)}, CommandType.Text);

                //}                                                                         //,COMMENT_FILE //,@Cf
                if (level == 3)
                {
                    foreach (ProductService_ item in prs)
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",item.SERVICE_ID),
                    new SqlParameter("@Q",item.QUANTITY),
                    new SqlParameter("@C",item.COST),
                            new SqlParameter("@l",level)}, CommandType.Text);


                    }
                }
                if (level == 2)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",dId),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",costDirect),
                            new SqlParameter("@l",level)}, CommandType.Text);
                }//,COMMENT_FILE    //,@Cf
                if (level == 1)
                {
                    Mydb.ExecuteNoNQuery("insert into REQUEST_SERVICE (REQUEST_ID,P_SERVICE_ID,QUANTITY,COST,[LEVEL]) values (@Rid,@PId,@Q,@C,@l)", new SqlParameter[] {
                    new SqlParameter("@Rid",LastReqId),
                    new SqlParameter("@PId",sid),
                    new SqlParameter("@Q","0"),
                    new SqlParameter("@C",CostSet),
                            new SqlParameter("@l",level)}, CommandType.Text);
                }
                Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT(REQUEST_COMMENT,REQUEST_ID) values(@RC,@Rid)", new SqlParameter[] {
                new SqlParameter("@Rc",Rc),
                new SqlParameter("@Rid",LastReqId)
               //, new SqlParameter("@Cf",Cf)
            }, CommandType.Text);

                foreach (REQUEST_COMMENT item in Cf)
                {
                    if (item.COMMENT_FILE != "0")
                    {
                        Mydb.ExecuteNoNQuery("insert into REQUEST_COMMENT (COMMENT_FILE,REQUEST_ID) values (@Cf,@Rid)", new SqlParameter[] { new SqlParameter("@Cf", item.COMMENT_FILE), new SqlParameter("@Rid", LastReqId) }, CommandType.Text);
                    }
                }
            }

            string files = "";
            if (Cf.Count != 0)
            {

                string domainName = System.Net.Dns.GetHostName();
                // files = domainName;
                for (int i = 0; i < Cf.Count; i++)
                {
                    if (i == Cf.Count - 1)
                    {
                        files += Cf[i].COMMENT_FILE;
                    }
                    else
                    {
                        files += Cf[i].COMMENT_FILE + ",";
                    }
                }
            }
            string time = DateTime.Now.AddHours(1).ToString("HH:mm");
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string LOTUS_GUID_ = "";
            //if (dId != 0)
            //{
            //    LOTUS_GUID_ = Mydb.ExecuteScalar("select LOTUS_GUID from SERVICE_DIRECT WHERE DIRECTION_ID=@GroupPS", new SqlParameter[] { new SqlParameter("@GroupPS", dId) }, CommandType.Text).ToString();
            //}
            //else
            //{
            //    LOTUS_GUID_ = "490F9FEA-DB91-A9A4-4325-80F9006E94CC";
            //}
            //if (LOTUS_GUID_.Length == 0)
            //{
            //    LOTUS_GUID_ = "490F9FEA-DB91-A9A4-4325-80F9006E94CC";
            //}
            //if (dId == 0)
            //{
            //string Grup_name = Mydb.ExecuteScalar("select SERVICE_SET_NAME from SERVICE_SET where SERVICE_SET_ID=@d", new SqlParameter[] { new SqlParameter("@d", gs) }, CommandType.Text).ToString();

            LOTUS_GUID_ = Mydb.ExecuteScalar("select LOTUS_GUID from SERVICE_SET where SERVICE_SET_ID=@d", new SqlParameter[] { new SqlParameter("@d", gs) }, CommandType.Text).ToString();

            Rc = "Заявка из Управбот\n\r" + Rt;
            //}
            //else
            //{
            //    Rc = "Заявка из Управбот\n\r " + Rt;
            //}

            try
            {
                var MobileNumber = Mydb.ExecuteScalar("TestDB.dbo.sp_QUICK_API_new_request_add_autopilot2mobile", new SqlParameter[] {
                new SqlParameter("@object_id",slcObj),
                new SqlParameter("@number",NUMBER),
                new SqlParameter("@phone_number",phn),
                new SqlParameter("@request_text",Rc),
                new SqlParameter("@work_kind",LOTUS_GUID_),
                new SqlParameter("@files",files),
                new SqlParameter("@workdate",date),
                new SqlParameter("@workbegin",time),
                new SqlParameter("@workend",time),
                 new SqlParameter("@destination","")
            }, CommandType.StoredProcedure);

                if (MobileNumber != DBNull.Value)
                {

                    Mydb.ExecuteNoNQuery("UPDATE REQUEST set MOBILE_NUMBER=@MOBILE_NUMBER where REQUEST_ID=@r", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt32(MobileNumber)), new SqlParameter("@r", CrRequest) }, CommandType.Text);
                    result = "{\"result\":\"Ok\",\"RequestId\" : \"" + MobileNumber.ToString() + "\"}";
                }
                else
                {
                    result = "{\"result\":\"Halfok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
                }
            }
            catch (Exception)
            {

                result = "{\"result\":\"Halfok\",\"RequestId\" : \"" + CrRequest.ToString() + "\"}";
            }

            return result;
        }
        [WebMethod]
        public static string getObjectDisp(int lg)
        {

            return Mydb.ExecuteReadertoDataTableAsJson("GetObjcurrentdsp", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
        }

        private static void SendEmailForRequest(string text, string EMAIL_ADRESS, int inserted_Requestid, int REQUEST_STATUS, int lgId,string Role, string ReqGuid = null)
        {

            string EMAIL_GUID = Guid.NewGuid().ToString();
            string RequestPage = (Role == "Ответственный") ? "/Responsible_Admin/CreateRequest.aspx" : (Role == "Супер Диспетчер") ? "/Super_Disp/CreateDispRequest.aspx" : (Role == "Диспетчер") ? "/Disp_Admin/CreateRequest.aspx" : "/Manager/CreateRequest.aspx";
            if (ReqGuid != null)
            {
                RequestPage = "/Supplier_Admin/CreateDispRequest.aspx";
            }
            string REQUEST_LINK = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "" + RequestPage + "?eml=" + EMAIL_GUID;

            Mydb.ExecuteNoNQuery("Send_Mail_To_Responsibles", new SqlParameter[] { new SqlParameter("@Text", text), new SqlParameter("@REQUEST_LINK", REQUEST_LINK), new SqlParameter("@email", EMAIL_ADRESS), new SqlParameter("@Request_id", inserted_Requestid), new SqlParameter("@REQUEST_STATUS", REQUEST_STATUS), new SqlParameter("@EMAIL_GUID", EMAIL_GUID), new SqlParameter("@lgId", lgId), new SqlParameter("@ROLE", Role), new SqlParameter("@REQ_GUID", ReqGuid) }, CommandType.StoredProcedure);

            //string Role = Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", lgId) }, CommandType.StoredProcedure).ToString();
            //string RequestPage = (Role == "Ответственный") ? "/Responsible_Admin/CreateRequest.aspx" : (Role == "Супер Диспетчер") ? "/Super_Disp/CreateDispRequest.aspx" : (Role == "Диспетчер") ? "/Disp_Admin/CreateRequest.aspx" : "/Manager/CreateRequest.aspx";
            //string EMAIL_GUID = Guid.NewGuid().ToString();

            //string REQUEST_LINK = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "" + RequestPage + "?eml=" + EMAIL_GUID;
            //Mydb.ExecuteNoNQuery("Send_Mail_To_Responsibles", new SqlParameter[] { new SqlParameter("@Text", text), new SqlParameter("@REQUEST_LINK", REQUEST_LINK), new SqlParameter("@email", EMAIL_ADRESS), new SqlParameter("@Request_id", inserted_Requestid), new SqlParameter("@REQUEST_STATUS", REQUEST_STATUS), new SqlParameter("@EMAIL_GUID", EMAIL_GUID) }, CommandType.StoredProcedure);

            //DataTable dt = Mydb.ExecuteReadertoDataTable("GetRoles_", new SqlParameter[] { new SqlParameter("@L", lgId) }, CommandType.StoredProcedure);
            //foreach (DataRow item in dt.Rows)
            //{
            //    string Role = item["ROLE_NAME"].ToString();
            //    string RequestPage = (Role == "Ответственный") ? "/Responsible_Admin/CreateRequest.aspx" : (Role == "Супер Диспетчер") ? "/Super_Disp/CreateDispRequest.aspx" : (Role == "Диспетчер") ? "/Disp_Admin/CreateRequest.aspx" : (Role== "Диспетчер поставщика")? "/Supplier_Admin/CreateDispRequest.aspx" : "/Manager/CreateRequest.aspx";
            //    string EMAIL_GUID = Guid.NewGuid().ToString();
            //    if (ReqGuid!=null)
            //    {
            //        RequestPage = "/Supplier_Admin/CreateDispRequest.aspx";
            //    }
            //    string REQUEST_LINK = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "" + RequestPage + "?eml=" + EMAIL_GUID;

            //    Mydb.ExecuteNoNQuery("Send_Mail_To_Responsibles", new SqlParameter[] { new SqlParameter("@Text", text), new SqlParameter("@REQUEST_LINK", REQUEST_LINK), new SqlParameter("@email", EMAIL_ADRESS), new SqlParameter("@Request_id", inserted_Requestid), new SqlParameter("@REQUEST_STATUS", REQUEST_STATUS), new SqlParameter("@EMAIL_GUID", EMAIL_GUID), new SqlParameter("@lgId", lgId), new SqlParameter("@ROLE", Role), new SqlParameter("@REQ_GUID", ReqGuid) }, CommandType.StoredProcedure);
            //}

        }
        //private static void SendEmailForRequest(string text, string REQUEST_LINK, string RESPONSIBLE_EMAIL, int inserted_Requestid, int REQUEST_STATUS, string EMAIL_GUID)
        //{
        //    Mydb.ExecuteNoNQuery("Send_Mail_To_Responsibles", new SqlParameter[] { new SqlParameter("@Text", text), new SqlParameter("@REQUEST_LINK", REQUEST_LINK), new SqlParameter("@email", RESPONSIBLE_EMAIL), new SqlParameter("@Request_id", inserted_Requestid), new SqlParameter("@REQUEST_STATUS", REQUEST_STATUS), new SqlParameter("@EMAIL_GUID", EMAIL_GUID) }, CommandType.StoredProcedure);

        //}
        [WebMethod]
        public static string MakeOtmenSupp(string R_id, string imgs, string text,string opl,int login_id,string _path,int SpId)
        {
            string result = "";
            dynamic j = JsonConvert.DeserializeObject(imgs);
            //  string img = j[0].ImgAdres;
            string ImgAdres = "";
            for (int i = 0; i < j.Count; i++)
            {
                if (j[i].ImgAdres != "")
                {
                    if (i == 0)
                    {
                        ImgAdres = j[i].ImgAdres;
                    }
                    else
                    {
                        ImgAdres = ImgAdres + "," + j[i].ImgAdres;
                    }
                }
            }
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rGuid", R_id), new SqlParameter("@NewStatusId", 4), new SqlParameter("@lg", Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);

            //if (text.Length!=0)
            //{
            //    Mydb.ExecuteScalar("[getRespName]")
            //    Mydb.ExecuteNoNQuery("INSERT_COMMENT_SUPER", new SqlParameter[] {
            //    new SqlParameter("@Rc",R_id),
            //    new SqlParameter("@Rid",Inserted_Requestid),
            //    new SqlParameter("@AUTHOR",AUTHOR_COMMENT)
            //        }, CommandType.StoredProcedure); 
            //}
           
            Mydb.ExecuteNoNQuery("[Update_MP_Requests]", new SqlParameter[] {
                new SqlParameter("@REQGUID",R_id),
                new SqlParameter("@STATUS","4"),
                new SqlParameter("@COMMENT_",text),
                new SqlParameter("@FILES",ImgAdres),
                 new SqlParameter("@PAYED",opl)

            }, CommandType.StoredProcedure);
            string MOBILE_NUMBER = Mydb.ExecuteScalar("GetSupReqIdByGuid", new SqlParameter[] { new SqlParameter("@rq", R_id) }, CommandType.StoredProcedure).ToString();
             

            Mydb.ExecuteNoNQuery("INSERT_FCM_LOG", new SqlParameter[] {

                new SqlParameter("@SECTION","Заявка"),
           new SqlParameter("@EVENT","Заявка № П-" + MOBILE_NUMBER + " отменена"),
           new SqlParameter("@TEXT","Заявка № П-" + MOBILE_NUMBER + " отменена" ),
        //   new SqlParameter("@PROJECT_ID",PROJECT_ID),
           new SqlParameter("@SCORE_ID",""),
          new SqlParameter("@tokenId",SpId),
          new SqlParameter("@LOG_IN_ID",Convert.ToInt32(login_id)),
           new SqlParameter("@PAGE",""),
           new SqlParameter("@ID",MOBILE_NUMBER),

            }, CommandType.StoredProcedure);

            int Rid_ = Convert.ToInt32(MOBILE_NUMBER);

            SendEmailToSupplier(Rid_,R_id, login_id, "Отменена");
            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «В работе».";
            var RESPONSIBLE_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 6) }, CommandType.StoredProcedure);

            var RESPONSIBLE_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 7) }, CommandType.StoredProcedure);
            if (RESPONSIBLE_EMAIL != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid_, 4, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }


            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Отменена».";
            var SPECIALIST_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 5) }, CommandType.StoredProcedure);

            var SPECIALIST_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid", R_id), new SqlParameter("@type", 8) }, CommandType.StoredProcedure);

            if (SPECIALIST_EMAIL != null)
            {
                int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(SPECIALIST_ID)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                if (IS_DISPATCHER == 1)
                {
                    SendEmailForRequest(Text, SPECIALIST_EMAIL.ToString(), Rid_, 4, Convert.ToInt32(SPECIALIST_ID), "Диспетчер");
                }

               

            }

            return result;
        }

        private static void SendEmailToSupplier(int Rid_,string REQGUID, int login_id,string Status)
        {

            DataTable  prs = Mydb.ExecuteReadertoDataTable("GetSelected_Services", new SqlParameter[] { new SqlParameter("@rid", Rid_), new SqlParameter("@sup", 1) }, CommandType.StoredProcedure);

            var ServicesOfRequest = "";
            int i = 0;
            foreach(DataRow item in prs.Rows)
            {
                if (i == 0)
                {
                    ServicesOfRequest = item["SERVICE_NAME"].ToString();
                }
                else
                {
                    ServicesOfRequest = ServicesOfRequest + ", " + item["SERVICE_NAME"].ToString();
                }
                i++;
                
            }
            var TextEmailSUpp = "Заявка № П-" + Rid_ + " по услуге «" + ServicesOfRequest + "» изменила статус на «" + Status+ "».";

            string Email = Mydb.ExecuteScalar("[GET_ID_EMAIL_FROM_REQUEST]", new SqlParameter[] { new SqlParameter("@type", 11), new SqlParameter("@rid", REQGUID) }, CommandType.StoredProcedure).ToString();

            SendEmailForRequest(TextEmailSUpp, Email, -1, 1, login_id, "Диспетчер поставщика", REQGUID);
        }

        [WebMethod]
        public static string MakeOtmen(int Rid, string login_id, string path)
        {
            Mydb.ExecuteNoNQuery("LoginForRequest", new SqlParameter[] { new SqlParameter("@action", "NewStatus"), new SqlParameter("@rId", Rid), new SqlParameter("@NewStatusId", 4),new SqlParameter("@lg",Convert.ToInt32(login_id)) }, CommandType.StoredProcedure);
            Mydb.ExecuteNoNQuery("MakeCancel", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);


            int MOBILE_NUMBER = Convert.ToInt32(Mydb.ExecuteScalar("Get_MOBILE_NUMBER_BY_R_ID", new SqlParameter[] { new SqlParameter("@Rid", Rid) }, CommandType.StoredProcedure));
          

         //   Mydb.COMPARE_REQUESTS(false, "4", Rid, Convert.ToInt32(login_id), "Работа по заявке < " + MOBILE_NUMBER + " > Отменена", path, "");
            string Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь ответственным, изменила статус на «Отменена».";

            var RESPONSIBLE_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 4) }, CommandType.StoredProcedure);

            var RESPONSIBLE_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 3) }, CommandType.StoredProcedure);
            if (RESPONSIBLE_EMAIL != null)
            {
                SendEmailForRequest(Text, RESPONSIBLE_EMAIL.ToString(), Rid, 4, Convert.ToInt32(RESPONSIBLE_ID), "Ответственный");
            }


            Text = "В заявке № " + MOBILE_NUMBER + ",по которой Вы являетесь исполнителем, изменила статус на «Отменена».";
            var SPECIALIST_EMAIL = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 2) }, CommandType.StoredProcedure);

            var SPECIALIST_ID = Mydb.ExecuteScalar("GET_ID_EMAIL_FROM_REQUEST", new SqlParameter[] { new SqlParameter("@rid_", Rid), new SqlParameter("@type", 1) }, CommandType.StoredProcedure);

            if (SPECIALIST_EMAIL != null)
            {
                int IS_DISPATCHER = (int)Mydb.ExecuteScalar("GetRoles_", new SqlParameter[] { new SqlParameter("@L", Convert.ToInt32(SPECIALIST_ID)), new SqlParameter("@isDisp", true) }, CommandType.StoredProcedure);
                if (IS_DISPATCHER == 1)
                {
                    SendEmailForRequest(Text, SPECIALIST_EMAIL.ToString(), Rid, 4, Convert.ToInt32(SPECIALIST_ID), "Диспетчер");
                }
               

            }

            if (MOBILE_NUMBER != 0)
            {
                Mydb.ExecuteNoNQuery("TestDB.[dbo].[sp_QUICK_API_set_request_status]", new SqlParameter[] { new SqlParameter("@id", MOBILE_NUMBER), new SqlParameter("@status", 4) }, CommandType.StoredProcedure);

                Mydb.ExecuteNoNQuery("[TestDB].[dbo].[sp_QUICK_API_request_change_status_autopilot]", new SqlParameter[] { new SqlParameter("@MOBILE_NUMBER", Convert.ToInt64(MOBILE_NUMBER)), new SqlParameter("@NEW_STATUS", 4), new SqlParameter("@COMMENT", ""), new SqlParameter("@WHO", login_id) }, CommandType.StoredProcedure);
            }


            return "";

        }
        [WebMethod]
        public static string GetRequestbyId(int Rid,string path)
        {
            int EVENT_ROLE = (path.IndexOf("Manager/") > -1) ? 1 : (path.IndexOf("Super_Disp/") > -1) ? 17 : (path.IndexOf("Responsible_Admin/") > -1) ? 16 : (path.IndexOf("Disp_Admin/") > -1) ? 3:15;
            DataTable dt = Mydb.ExecuteReadertoDataTable("getRequestbyId", new SqlParameter[] { new SqlParameter("@R", Rid),new SqlParameter("@EVENT_ROLE",EVENT_ROLE) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Request>();
            if (dt.Rows.Count != 0)
            {
                foreach (DataRow item in dt.Rows)
                {
                    Request r = new Request();//EMERGENCY_TREATMENT,PAYMENT,PLAN_END_DATE,PLAN_END_TIME
                    r.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]==DBNull.Value?false: item["EMERGENCY_TREATMENT"]);//
                    r.PAYMENT = item["PAYMENT"].ToString();                                                                       //  r.ADRESS = item["ADRESS"].ToString();
                                                                                                                                  //  r.i_IND_PHONE_NUMBER = item["IND_PHONE_NUMBER"].ToString();
                                                                                                                                  //   r.im_FIRST_NAME = item["FIRST_NAME"].ToString();
                    r.ROOM_T = (item["ROOM_T"] == DBNull.Value) ? Mydb.ExecuteScalar("GetRoomTypeForMp", new SqlParameter[] { new SqlParameter("@indId", Convert.ToInt32(item["INDIVIDUAL_ID"])), new SqlParameter("@obj", (int)item["OBJECT_ID"]) }, CommandType.StoredProcedure).ToString() : item["ROOM_T"].ToString();
                    r.TOTAL_COST = item["TOTAL_COST"].ToString();//
                    r.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();//
                    r.PLAN_END_TIME = item["PLAN_END_TIME"].ToString().Substring(0, 5);//
                    r.DELIVERY_TYPE_ID = (item["DELIVERY_TYPE_ID"] == DBNull.Value) ? -1 : Convert.ToInt32(item["DELIVERY_TYPE_ID"]);//
                    r.SPECIALIS_ID = Convert.ToInt32(item["SPECIALIS_ID"]);//
                    r.SPECIALISTS = Mydb.ExecuteAsJson("GetSpsByRId", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);
                    r.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();//
                                                                     // r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();//
                                                                     // r.COMMENT_FILE = item["COMMENT_FILE"].ToString();//
                    r.LOG_IN_ID = (item["LOG_IN_ID"] != DBNull.Value) ? Convert.ToInt32(item["LOG_IN_ID"]) : 0;//
                    r.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();//
                    r.STATUS = item["STATUS_ID"].ToString();//
                    r.REQUEST_ID = Convert.ToInt32(item["REQUEST_ID"]);//
                    r.ATRIBUTE = item["SPECIALIST_NAME"].ToString();
                    string ind = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                    if (ind == "")
                    {
                        r.INDIVIDUAL_ID = 0;
                    }
                    else
                    {
                        r.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? 0 : Convert.ToInt32(item["INDIVIDUAL_ID"].ToString());
                    }
                    r.SERVICE_NAME = item["NUMBER"].ToString();
                    r.i_IND_PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                    r.TOTAL_COST = item["TOTAL_COST"].ToString();//
                                                                 //   r.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];// service Set
                    r.ADRESS = item["OBJECT_ID"].ToString();
                    r.FIRST_NAME = item["FIRST_NAME"].ToString();
                    // r.ROOM_COUNT = Convert.ToInt32(item["ROOM_COUNT"]);
                    r.ROOM_COUNT = Mydb.ExecuteAsJson("GetSelected_Services", new SqlParameter[] { new SqlParameter("@rid", r.REQUEST_ID) }, CommandType.StoredProcedure);
                    r.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                    r.STATUS = item["STATUS"].ToString();
                    r.RESPONSIBLE_ID = item["RESPONSIBLE_ID"].ToString();
                    r.PROJECT_ID = Mydb.ExecuteAsJson("GetProjectByObjId_for_SelecetdServices", new SqlParameter[] { new SqlParameter("@obj", Convert.ToInt32(r.ADRESS)) }, CommandType.StoredProcedure).ToString();
                    r.DISP_ID = (item["LOG_IN_ID"].ToString().Length == 0) ? "0" : item["LOG_IN_ID"].ToString();
                    r.REQUEST_TYPE = item["REQUEST_TYPE"] == DBNull.Value ? "True" : item["REQUEST_TYPE"].ToString();
                    r.REQUEST_TYPE = (r.REQUEST_TYPE == "True") ? "1" : "0";
                    r.REQUEST_TYPE = r.REQUEST_TYPE + "|" + item["BaseDirectionGroupId"].ToString();
                    // r.ROOM_NUMBER = Mydb.ExecuteScalar("gethasInd", new SqlParameter[] {new SqlParameter("@indId",r.INDIVIDUAL_ID),new SqlParameter("@rid",) }, CommandType.StoredProcedure).ToString();// for Room Number
                    rs.Add(r);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();

                return js.Serialize(rs);
            }
            else
            {
                DataTable dt2 = Mydb.ExecuteReadertoDataTable("GetTenantRequest", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
                List<RequestTenant> rsts = new List<RequestTenant>();
                foreach (DataRow item in dt2.Rows)
                {
                    RequestTenant rst = new RequestTenant();

                    rst.ROOM_T = item["ROOM_T"].ToString();
                    rst.ACCOUNT_NAME = "~";
                    rst.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rst.NUMBER = item["NUMBER"].ToString();
                    rst.OBJECT_ID = item["OBJECT_ID"].ToString();
                    rst.PHONE = item["PHONE_NUMBER"].ToString();
                    rst.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                    rst.INDIVIDUAL_ID = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                    rst.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];
                    string comf = (item["COMFORDATE"].ToString().Length != 0) ? "|" + "Желаемая дата: (" + item["COMFORDATE"].ToString().Substring(0, item["COMFORDATE"].ToString().LastIndexOf(' ')) + ")\n Желаемое время : c (" + item["COM_TIME_FROM"].ToString().Substring(0, item["COM_TIME_FROM"].ToString().LastIndexOf(':')).Replace(':', '-') + ") по (" + item["COM_TIME_TO"].ToString().Substring(0, item["COM_TIME_TO"].ToString().LastIndexOf(':')).Replace(':', '-') + ")" : "";

                    rst.REQUEST_TEXT = (item["COMFORDATE"].ToString().Length == 0) ? item["REQUEST_TEXT"].ToString() : item["REQUEST_TEXT"].ToString() + comf;
                    rst.EMERGENCY_TREATMENT = Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);
                    rst.PAYMENT = (item["PAYMENT"].ToString().Length == 0) ? false : Convert.ToBoolean(item["PAYMENT"]);
                    rst.PLAN_END_DATE = item["PLAN_END_DATE"].ToString(); ;
                    rst.PLAN_END_TIME = item["PLAN_END_TIME"].ToString();
                    rst.SPECIALIST_ID = (item["SPECIALIS_ID"].ToString().Length != 0) ? (int)item["SPECIALIS_ID"] : 0;
                    rst.TOTAL_COST = Mydb.ExecuteReadertoDataTableAsJson("GetServicesByLevel", new SqlParameter[] { new SqlParameter("@R", Rid) }, CommandType.StoredProcedure);
                    rst.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
                    rst.STATUS = item["STATUS"].ToString();
                    rst.RESPONSIBLE_ID = item["RESPONSIBLE_ID"].ToString();
                    rst.PROJECT_ID = Mydb.ExecuteScalar("GetProjectByObjId", new SqlParameter[] { new SqlParameter("@obj", Convert.ToInt32(rst.OBJECT_ID)) }, CommandType.StoredProcedure).ToString();
                    //rst.DISP_ID = item["LOG_IN_ID"].ToString();
                    rsts.Add(rst);


                }
                JavaScriptSerializer js2 = new JavaScriptSerializer();
                return js2.Serialize(rsts);
            }

        }
        [WebMethod]
        public static string usp_QUICK_API_GET_REQUEST(string GUID,string path)
        {
            int EVENT_ROLE = (path.IndexOf("Manager/") > -1) ? 1 : (path.IndexOf("Super_Disp/") > -1) ? 17 : (path.IndexOf("Responsible_Admin/") > -1) ? 16 : (path.IndexOf("Disp_Admin/") > -1) ? 3 : 15;
            DataTable dt = Mydb.ExecuteReadertoDataTable("TestDB.dbo.usp_QUICK_API_GET_REQUEST", new SqlParameter[] { new SqlParameter("@REQGUID", GUID),new SqlParameter("@EVENT_ROLE", EVENT_ROLE) }, CommandType.StoredProcedure);
            List<Request> rs = new List<Request>();
            foreach (DataRow item in dt.Rows)
            {
                Request r = new Request();//EMERGENCY_TREATMENT,PAYMENT,PLAN_END_DATE,PLAN_END_TIME
                r.EMERGENCY_TREATMENT = false;//Convert.ToBoolean(item["EMERGENCY_TREATMENT"]);//
                r.PAYMENT = item["PAYED"].ToString();                                                                       //  r.ADRESS = item["ADRESS"].ToString();
                                                                                                                            //  r.i_IND_PHONE_NUMBER = item["IND_PHONE_NUMBER"].ToString();
                                                                                                                            //   r.im_FIRST_NAME = item["FIRST_NAME"].ToString();
                r.ROOM_T = Mydb.ExecuteScalar("GetRoomTypeForMp", new SqlParameter[] { new SqlParameter("@sup", "1"), new SqlParameter("@obj", Convert.ToInt32(item["OBJECT_ID"])), new SqlParameter("@sc", item["LOGIN"].ToString()) }, CommandType.StoredProcedure).ToString();
                r.TOTAL_COST = item["PAYMENT_SUMM"].ToString();//
                r.PLAN_END_DATE = new JavaScriptSerializer().Serialize(new
                {
                    WORKDATE = item["WORKDATE"].ToString().Substring(0, 10),
                    WORKBEGIN = item["WORKBEGIN"].ToString().ToString().Substring(0, 5),
                    WORKEND = item["WORKEND"].ToString().ToString().Substring(0, 5),
                    FILES = item["FILES"].ToString()
                });
                //item["WORKDATE"].ToString();//
                r.PLAN_END_TIME = ""; //item["WORKBEGIN"].ToString().Substring(0, 5);//
                r.DELIVERY_TYPE_ID = 0;// item["WORKEND"].ToString().Substring(0, 5);//(item["DELIVERY_TYPE_ID"] == DBNull.Value) ? -1 : Convert.ToInt32(item["DELIVERY_TYPE_ID"]);//
                r.SPECIALIS_ID = Convert.ToInt32(item["SPECIALIST_ID"]);//
                r.SPECIALISTS = item["SUPPLIER"].ToString();// Mydb.ExecuteAsJson("GetSpsByRId", new SqlParameter[] { new SqlParameter("@rid", Rid) }, CommandType.StoredProcedure);
                r.REQUEST_TEXT = item["COMMENT"].ToString();
                r.ENTRANCE = item["ENTRANCE"].ToString();
                r.FLOOR = item["FLOOR"].ToString();
                //
                                                            // r.REQUEST_COMMENT = item["REQUEST_COMMENT"].ToString();//
                                                            // r.COMMENT_FILE = item["COMMENT_FILE"].ToString();//
                r.LOG_IN_ID = 0;//(item["LOG_IN_ID"] != DBNull.Value) ? Convert.ToInt32(item["LOG_IN_ID"]) : 0;//
                r.ACCOUNT_NAME = "";//item["ACCOUNT_NAME"].ToString();//
                r.STATUS = item["STATUS"].ToString();//
                r.REQUEST_ID = Convert.ToInt32(item["ID"]);//Convert.ToInt32(item["REQUEST_ID"]);//
                r.ATRIBUTE = ""; //item["SPECIALIST_NAME"].ToString();
                //string ind = (item["INDIVIDUAL_ID"].ToString().Length == 0) ? "0" : item["INDIVIDUAL_ID"].ToString();
                //if (ind == "")
                //{
                //    r.INDIVIDUAL_ID = 0;
                //}
                //else
                //{
                //    (item["INDIVIDUAL_ID"].ToString().Length == 0) ? 0 : Convert.ToInt32(item["INDIVIDUAL_ID"].ToString());
                //}
                r.INDIVIDUAL_ID = (int)Mydb.ExecuteScalar("GetRoomTypeForMp", new SqlParameter[] { new SqlParameter("@sup", "2"), new SqlParameter("@obj", Convert.ToInt32(item["OBJECT_ID"])), new SqlParameter("@sc", item["LOGIN"].ToString()) }, CommandType.StoredProcedure);

                r.SERVICE_NAME = item["LOGIN"].ToString();//item["NUMBER"].ToString();
                r.i_IND_PHONE_NUMBER = item["PHONE_NUMBER"].ToString();
                //r.TOTAL_COST = item["TOTAL_COST"].ToString();//
                //   r.SERVICE_GROUP_ID = (int)item["SERVICE_GROUP_ID"];// service Set
                r.ADRESS = item["OBJECT_ID"].ToString();
                r.FIRST_NAME = item["CLIENT"].ToString();// item["FIRST_NAME"].ToString();
                // r.ROOM_COUNT = Convert.ToInt32(item["ROOM_COUNT"]);
                r.ROOM_COUNT = Mydb.ExecuteAsJson("GetSelected_Services", new SqlParameter[] { new SqlParameter("@rid", r.REQUEST_ID), new SqlParameter("@sup", 1), new SqlParameter("@SERVICE_GUID", item["SERVICE_GUID"].ToString()) }, CommandType.StoredProcedure);
                r.MOBILE_NUMBER = item["ID"].ToString(); // item["MOBILE_NUMBER"].ToString();

                r.STATUS = item["STATUS_NAME"].ToString();
                r.RESPONSIBLE_ID = Mydb.ExecuteScalar("GetRoomTypeForMp", new SqlParameter[] { new SqlParameter("@sup", "3"), new SqlParameter("@SERVICE_GUID", item["SERVICE_GUID"].ToString()), new SqlParameter("@REQ_GUID", GUID) }, CommandType.StoredProcedure).ToString();//item["RESPONSIBLE_ID"].ToStrin();

                r.PROJECT_ID = Mydb.ExecuteAsJson("GetProjectByObjId_for_SelecetdServices", new SqlParameter[] { new SqlParameter("@obj", Convert.ToInt32(r.ADRESS)) }, CommandType.StoredProcedure).ToString();
               
                r.DISP_ID = "0"; //(item["LOG_IN_ID"].ToString().Length == 0) ? "0" : item["LOG_IN_ID"].ToString();
                                 // r.ROOM_NUMBER = Mydb.ExecuteScalar("gethasInd", new SqlParameter[] {new SqlParameter("@indId",r.INDIVIDUAL_ID),new SqlParameter("@rid",) }, CommandType.StoredProcedure).ToString();// for Room Number

                r.REQUEST_TYPE = item["REQUEST_TYPE"] == DBNull.Value ? "True" : item["REQUEST_TYPE"].ToString();
                r.REQUEST_TYPE = (r.REQUEST_TYPE == "True") ? "1" : "0";
                r.Entrance_Tex= item["Entrance_Tex"].ToString();
                r.Floor_Tex = item["Floor_Tex"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);

            // return "";
        }
        [WebMethod]
        public static string GetCommentsById(string rid)
        {
            if (int.TryParse(rid, out int r))
            {
                return Mydb.ExecuteAsJson("GetCommentsById", new SqlParameter[] { new SqlParameter("@rid", r) }, CommandType.StoredProcedure);
            }
            else
            {
                return Mydb.ExecuteAsJson("GetCommentsById", new SqlParameter[] { new SqlParameter("@REQ_GUID", rid) }, CommandType.StoredProcedure);
            }
        }
        [WebMethod]
        public static string CommentFiles(int R)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetCommentFiles", new SqlParameter[] { new SqlParameter("@R", R) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetObjcurrentdsp(int lg)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetObjcurrentdsp", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
        }


    }
}