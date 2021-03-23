using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClosedXML.Excel;
using Newtonsoft.Json;

namespace Kvorum_App.Super_Disp
{
    public partial class DispRequests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        //    List<object> columns = new List<object>();
        //    columns.Add( new { Rus = "Номер заявки", Eng = "MOBILE_NUMBER" } );
        //    columns.Add( new { Rus = "Номер лицевого счета заявителя", Eng = "SCORE_ID" } );
        //    columns.Add( new { Rus = "Заявитель", Eng = "FIRST_NAME" } );
        //    columns.Add( new { Rus = "Номер телефона заявителя", Eng = "PHONE_NUMBER" } );
        //    columns.Add( new { Rus = "Адрес объекта", Eng = "OBJECT_ADRESS" } );
        //    columns.Add( new { Rus = "Номер помещения", Eng = "ROOM_NUMBER" } );
        //    columns.Add( new { Rus = "Направление услуг", Eng = "DIRECTION_NAME" } );
        //    columns.Add( new { Rus = "Группа услуг", Eng = "SERVICE_GROUP" } );

            //var jsonForExample = new
            //{

            //    Eng = Eng_name,
            //    Rus = Rus_name,
            //};
            //GiveExcel_for_Raport ( Mydb.ExecuteReadertoDataTable("select * from vw_RequestFor_Raport where MASTER_ID between 878 and 895"
            //    , new SqlParameter[] { }, CommandType.Text), JsonConvert.SerializeObject(columns));
        }
        
        public static string GiveExcel_for_Raport(DataTable dt,string Cnames)
        {
            string result = "";
            if (dt.Rows.Count != 0)
            {
                string guid = Guid.NewGuid().ToString();
                string strFilePath = @"C:\Users\ACER\Desktop\yunis\Raport_" + DateTime.Now.ToString("dd.mm.yyyy") + "_" + guid + ".xlsx";
                using (var workbook = new XLWorkbook())
                {

                    #region ExcelHeader
                    var worksheet = workbook.Worksheets.Add("Sample Sheet");
                    string[] chars = new string[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
                    int i = 0;
                    int k = 0;
                    dynamic Columns = JsonConvert.DeserializeObject(Cnames);
                    List<string> list = new List<string>();
                    foreach (var column in  Columns)
                    {
                      //  var ColName = JsonConvert.DeserializeObject(column);
                        var Eng_name = (string)column.Eng;
                        var Rus_name = (string)column.Rus;
                        var letter = chars[k] + "1";
                        worksheet.Column(chars[k]).CellsUsed().SetDataType(XLDataType.Text);
                        worksheet.Cell(letter).Value = Rus_name;
                        var jsonForExcel = new
                        {
                            CellAdres = chars[k],
                            DbColumnName = Eng_name,
                            Rus_cellHeader = Rus_name,
                        };
                        list.Add(JsonConvert.SerializeObject(jsonForExcel));
                        worksheet.Cell(letter).Style.Font.Bold = true;

                        i++;
                        k++;
                       
                    }



                    #endregion
                    int cellNumber = 2;
                    foreach (DataRow item in dt.Rows)
                    {

                        for (int j = 0; j < list.Count; j++)
                        {
                            dynamic columnsAndCells = JsonConvert.DeserializeObject(list[j]);
                            var eng_column = (string)columnsAndCells.DbColumnName;
                            var RusHeader = (string)columnsAndCells.Rus_cellHeader;
                            string CellAdres = (string)columnsAndCells.CellAdres;
                            worksheet.Column( CellAdres).CellsUsed().SetDataType(XLDataType.Text);
                            if (eng_column=="kol" || eng_column=="ed"||eng_column=="cost")
                            {
                                continue;
                            }
                            var dbValue = item[eng_column].ToString();
                            if (eng_column== "EMERGENCY_TREATMENT")
                            {
                                dbValue = (dbValue=="False")?"": "Аварийная заявка";
                            }
                            if (eng_column== "REQUEST_SERVICES")
                            {
                                string[] dbValues = dbValue.Split('|');
                                for (int f = 0; f < dbValues.Length; f++)
                                {
                                    dbValue = "";
                                    var kol_cost_ed = dbValues[f].Substring(dbValues[f].IndexOf('(') + 1, (dbValues[f].IndexOf(')') - dbValues[f].IndexOf('(')) - 1);
                                    dbValues[f] = dbValues[f].Substring(0, dbValues[f].IndexOf('('));

                                    string[] kolcosted_array = kol_cost_ed.Split('^');
                                    if (exitsInjson(list, "kol"))
                                    {
                                        dbValues[f] = dbValues[f] + " (" + kolcosted_array[0] + ")";

                                    }
                                    if (exitsInjson(list, "ed"))
                                    {
                                        dbValues[f] = dbValues[f] + " (" + kolcosted_array[1] + ")";
                                    }
                                    if (exitsInjson(list, "cost"))
                                    {
                                        dbValues[f] = dbValues[f] + " (" + kolcosted_array[2] + ")";
                                    }
                                    if (f==0)
                                    {
                                        dbValue = dbValues[f];
                                    }
                                    else
                                    {
                                        dbValue = dbValue+"," + dbValues[f];
                                    }
                                }
                            }
                            
                            worksheet.Cell(CellAdres+cellNumber).Value =dbValue;
                            var rngTable = worksheet.Range("A1:V" + cellNumber + "");
                            rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                        }
                        cellNumber++;

                    }
                    
                    worksheet.Columns().AdjustToContents();
                    workbook.SaveAs(strFilePath);
                    result = "Raport_" + DateTime.Now.ToString("dd.mm.yyyy") + "_" + guid + ".xlsx";

                }

            }
            else
            {
                result = "0";
            }


            return result;
        }

        private static bool exitsInjson(List<string> list, string v)
        {
            var rvalue = false;
            for (int j = 0; j < list.Count; j++)
            {
                dynamic columnsAndCells = JsonConvert.DeserializeObject(list[j]);
                var eng_column = (string)columnsAndCells.DbColumnName;
                var RusHeader = (string)columnsAndCells.Rus_cellHeader;
                if (eng_column==v)
                {
                    rvalue = true;
                }
            }

            return rvalue;
       }

        [WebMethod]
        public static string RaportForRequest(string ColumnsName, string DataForRapor)
        {
            GiveExcel_for_Raport(Mydb.ExecuteReadertoDataTable("select * from vw_RequestFor_Raport where MASTER_ID between 878 and 880"
              , new SqlParameter[] { }, CommandType.Text), ColumnsName);
            // dynamic Datas_json = JsonConvert.DeserializeObject(DataForRapor);
            //bool and_or = (bool)Datas_json.and_or;
            //string SCORES = (string)Datas_json.SCORES;
            //string INDIVIDUAL_ID = (string)Datas_json.INDIVIDUAL_ID;
            //string ROOM_NUMBER = (string)Datas_json.ROOM_NUMBER;
            //string SPESIALIST_ID = (string)Datas_json.SPESIALIST_ID;
            //string RESPONSIBLE_ID = (string)Datas_json.RESPONSIBLE_ID;
            //string STATUS_ID = (string)Datas_json.STATUS_ID;
            //string OBJECT_ID = (string)Datas_json.OBJECT_ID;
            //string SUPPLIER_GUID = (string)Datas_json.SUPPLIER_GUID;
            //string DIRECTION_GUID = (string)Datas_json.DIRECTION_GUID;
            //string SERVICE_GROUP_GUID = (string)Datas_json.SERVICE_GROUP_GUID;
            //string SERVICE_GUID = (string)Datas_json.SERVICE_GUID;
            //string PAYED = (string)Datas_json.PAYED;
            //string REQUEST_TYPE_ = (string)Datas_json.REQUEST_TYPE_;
            //string PAYMENT = (string)Datas_json.PAYMENT;
            //string EMERGENCY_TREATMENT = (string)Datas_json.EMERGENCY_TREATMENT;
            //string CR_DATE_from = (string)Datas_json.CR_DATE_from;
            //string CR_DATE_to = (string)Datas_json.CR_DATE_to;

            //GiveExcel_for_Raport(
            //Mydb.ExecuteReadertoDataTable("RaportForRequest", new SqlParameter[] {
            //    new SqlParameter("@and_or",and_or),
            //    new SqlParameter("@SCORES",SCORES),
            //    new SqlParameter("@INDIVIDUAL_ID",INDIVIDUAL_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
            //    new SqlParameter("@SPESIALIST_ID",SPESIALIST_ID),
            //    new SqlParameter("@RESPONSIBLE_ID",RESPONSIBLE_ID),
            //    new SqlParameter("@STATUS_ID",STATUS_ID),
            //    new SqlParameter("@OBJECT_ID",OBJECT_ID),
            //    new SqlParameter("@SUPPLIER_GUID",SUPPLIER_GUID),
            //    new SqlParameter("@DIRECTION_GUID",DIRECTION_GUID),
            //    new SqlParameter("@SERVICE_GROUP_GUID",SERVICE_GROUP_GUID),
            //    new SqlParameter("@SERVICE_GUID",SERVICE_GUID),
            //    new SqlParameter("@PAYED",PAYED),
            //    new SqlParameter("@REQUEST_TYPE_",REQUEST_TYPE_),
            //    new SqlParameter("@PAYMENT",PAYMENT),
            //    new SqlParameter("@EMERGENCY_TREATMENT",EMERGENCY_TREATMENT),
            //    new SqlParameter("@CR_DATE_from",CR_DATE_from),
            //    new SqlParameter("@CR_DATE_to",CR_DATE_to)
            //}, CommandType.StoredProcedure),ColumnsName);

            return "";
        }

        [WebMethod]
        public static string GetDatasForRaport(int type, string Stext, string MultypleData)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("GetDatasForRaport", new SqlParameter[] {new SqlParameter("@type", type)
                ,new SqlParameter("@Stext", Stext),new SqlParameter("@MultypleData",MultypleData) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetDispsRequests(int lg, int role, int all)
        {

            // 

            //DataTable dt = Mydb.ExecuteReadertoDataTable("GetRequests_by_Role", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role), new SqlParameter("@all", all) }, CommandType.StoredProcedure);
            //List<Kvorum_App.Super_Disp.Helpers.Request> reqs = new List<Helpers.Request>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    Helpers.Request req = new Helpers.Request();
            //    req.MOBILE_NUMBER = item["MOBILE_NUMBER"].ToString();
            //    req.FIRST_NAME = item["FIRST_NAME"].ToString();
            //    req.OBJECT_ADRESS = item["OBJECT_ADRESS"].ToString();
            //    req.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //    req.CR_DATE = item["CR_DATE"].ToString();
            //    req.CR_DATE = req.CR_DATE.Substring(0, 10);
            //    req.REQUEST_TEXT = item["REQUEST_TEXT"].ToString();
            //    req.PLAN_END_DATE = item["PLAN_END_DATE"].ToString();
            //    req.REQUEST_TYPE = item["REQUEST_TYPE"].ToString();
            //    req.STATUS = item["STATUS"].ToString();
            //    req.RESPONSIBLE_NAME = item["RESPONSIBLE_NAME"].ToString();
            //    req.PAYMENT = item["PAYMENT"].ToString();
            //    req.RREQUEST_ID = item["REQUEST_ID"].ToString();
            //    req.STATUS_ID = item["STATUS_ID"].ToString();
            //    reqs.Add(req);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer(); js.Serialize(reqs);

            return Mydb.ExecuteAsJson("GetRequests_by_Role", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role), new SqlParameter("@all", all) }, CommandType.StoredProcedure);//GetDispsRequests;//
        }

        [WebMethod]
        public static string getObjectDisp(int lg, int role)
        {

            return Mydb.ExecuteAsJson("GetObjectsByRole", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@role", role) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string Filtering(List<Kvorum_App.Disp_Admin.Utilities.Filter> flt, int Log, int role, int all)
        {
            string returnval = "";

            /*string r ="REQUEST_ID=5";
            Console.WriteLine(r);
              int index = r.IndexOf('.');
            r=r.Substring(r.LastIndexOf('=')+1);
            Console.WriteLine(r);*/
            object MOBILE_NUMBER = "";
            object ROOM_NUMBER = "";
            object OBJECT_ID = "";
            object ROOM_TYPE_ID = "";
            object FIRST_NAME = "";
            object STATUS_ID = "";
            object CR_DATE_from = "";
            object CR_DATEE_TO = "";

            foreach (Kvorum_App.Disp_Admin.Utilities.Filter item in flt)
            {
                MOBILE_NUMBER = (item.MOBILE_NUMBER.Length != 0) ? item.MOBILE_NUMBER.ToString() : (object)DBNull.Value;
                ROOM_NUMBER = (item.ROOM_NUMBER.Length != 0) ? item.ROOM_NUMBER.ToString() : (object)DBNull.Value;
                OBJECT_ID = (item.OBJECT_ID != 0) ? item.OBJECT_ID.ToString() : (object)DBNull.Value;
                ROOM_TYPE_ID = (item.ROOM_TYPE_ID != 0) ? item.ROOM_TYPE_ID.ToString() : (object)DBNull.Value;
                FIRST_NAME = (item.FIRST_NAME != "") ? item.FIRST_NAME : (object)DBNull.Value;
                // FIRST_NAME = (FIRST_NAME != "") ? FIRST_NAME.Replace("\"", "'"):"";
                STATUS_ID = (item.STATUSE != 0) ? item.STATUSE.ToString() : (object)DBNull.Value;
                CR_DATE_from = (item.CR_DATE_FROM != "") ? item.CR_DATE_FROM : (object)DBNull.Value;
                //CR_DATE_from = (CR_DATE_from != "") ? CR_DATE_from.Replace("\"", "'"):"";
                CR_DATEE_TO = (item.CR_DATE_TO != "") ? item.CR_DATE_TO : (object)DBNull.Value;

                //CR_DATEE_TO = (CR_DATEE_TO != "") ? CR_DATEE_TO.Replace("\"", "'"):"";
            }

            return Mydb.ExecuteAsJson("uspo_Filtering", new SqlParameter[] {
                new SqlParameter("@rid",MOBILE_NUMBER),
            new SqlParameter("@room",ROOM_NUMBER),
            new SqlParameter("@objectId",OBJECT_ID),
            new SqlParameter("@roomtype",ROOM_TYPE_ID),
            new SqlParameter("@firstname",FIRST_NAME),
            new SqlParameter("@status",STATUS_ID),
            new SqlParameter("@cr_S",CR_DATE_from),
            new SqlParameter("@cr_E",CR_DATEE_TO),
            new SqlParameter("@lg",Log),
            new SqlParameter("@role",role),new SqlParameter("@all",all)}, CommandType.StoredProcedure);
        }

    }
}