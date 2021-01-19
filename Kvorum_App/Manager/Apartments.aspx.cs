using HttpUtils;
using Kvorum_App.Manager.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Text.RegularExpressions;
using Kvorum_App.Disp_Admin.Utilities;
using Newtonsoft.Json;

namespace Kvorum_App.Manager
{
    public partial class Apartments : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region old
        //public static WorksheetPart GetWorksheetPart(WorkbookPart workbookPart, string sheetName)
        //{
        //    string relId = workbookPart.Workbook.Descendants<Sheet>().First(s => sheetName.Equals(s.Name)).Id;
        //    return (WorksheetPart)workbookPart.GetPartById(relId);
        //}
        //public static string GetCellValue(SpreadsheetDocument document, Cell cell)
        //{
        //    SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
        //    if (cell.CellValue == null)
        //    {
        //        return "";
        //    }
        //    string value = cell.CellValue.InnerXml;
        //    if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
        //    {
        //        return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
        //    }
        //    else
        //    {
        //        return value;
        //    }
        //}
        //public static string GetColumnName(string cellReference)
        //{
        //    // Create a regular expression to match the column name portion of the cell name.
        //    Regex regex = new Regex("[A-Za-z]+");
        //    Match match = regex.Match(cellReference);
        //    return match.Value;
        //}
        //public static int? GetColumnIndexFromName(string columnName)
        //{
        //    //return columnIndex;
        //    string name = columnName;
        //    int number = 0;
        //    int pow = 1;
        //    for (int i = name.Length - 1; i >= 0; i--)
        //    {
        //        number += (name[i] - 'A' + 1) * pow;
        //        pow *= 26;
        //    }
        //    return number;
        //}
        //public static DataTable ExcelToDataTable(string file)
        //{
        //    string fullPath = @"C:\inetpub\wwwroot\Files\";// " + file + "";
        //    fullPath = fullPath.Replace("~", "\\");
        //    var excelFileToImport = Directory.GetFiles(fullPath, file, SearchOption.AllDirectories);
        //    //Create a new DataTable.
        //    System.Data.DataTable dt = new System.Data.DataTable();
        //    //Open the Excel file in Read Mode using OpenXML
        //    using (SpreadsheetDocument doc = SpreadsheetDocument.Open(excelFileToImport[0], false))
        //    {
        //        WorksheetPart titlesWorksheetPart = GetWorksheetPart(doc.WorkbookPart, "Лист1");

        //        Worksheet titlesWorksheet = titlesWorksheetPart.Worksheet;
        //        //Fetch all the rows present in the worksheet
        //        IEnumerable<Row> rows = titlesWorksheet.GetFirstChild<SheetData>().Descendants<Row>();

        //        foreach (Cell cell in rows.ElementAt(0))
        //        {
        //            dt.Columns.Add(GetCellValue(doc, cell)); // this will include 2nd row a header row
        //        }
        //        //Loop through the Worksheet rows
        //        foreach (Row row in rows)
        //        {

        //            System.Data.DataRow tempRow = dt.NewRow();
        //            int columnIndex = 0;
        //            foreach (Cell cell in row.Descendants<Cell>())
        //            {
        //                // Gets the column index of the cell with data
        //                int cellColumnIndex = (int)GetColumnIndexFromName(GetColumnName(cell.CellReference));
        //                cellColumnIndex--; //zero based index
        //                if (columnIndex < cellColumnIndex)
        //                {
        //                    do
        //                    {
        //                        tempRow[columnIndex] = ""; //Insert blank data here;
        //                        columnIndex++;
        //                    }
        //                    while (columnIndex < cellColumnIndex);
        //                }
        //                tempRow[columnIndex] = GetCellValue(doc, cell);

        //                columnIndex++;
        //            }
        //            dt.Rows.Add(tempRow);

        //        }
        //    }
        //    return dt;
        //} 
        #endregion

        private static string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
            if (cell.CellValue == null)
            {
                return "";
            }
            string value = cell.CellValue.InnerXml;

            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
            }
            else
            {
                return value;
            }
        }
        private static int CellReferenceToIndex(Cell cell)
        {
            int index = 0;
            string reference = cell.CellReference.ToString().ToUpper();
            foreach (char ch in reference)
            {
                if (Char.IsLetter(ch))
                {
                    int value = (int)ch - (int)'A';
                    index = (index == 0) ? value : ((index + 1) * 26) + value;
                }
                else
                    return index;
            }
            return index;
        }
        public static DataTable ReadAsDataTable(string fileName)
        {
            DataTable dataTable = new DataTable();
            using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(fileName, false))
            {
                WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                string relationshipId = sheets.First().Id.Value;
                WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);
                Worksheet workSheet = worksheetPart.Worksheet;
                SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                IEnumerable<Row> rows = sheetData.Descendants<Row>();

                foreach (Cell cell in rows.ElementAt(0))
                {
                    dataTable.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                }

                foreach (Row row in rows)
                {
                    DataRow dataRow = dataTable.NewRow();
                    for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                    {
                        //dataRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                        Cell cell = row.Descendants<Cell>().ElementAt(i);
                        int actualCellIndex = CellReferenceToIndex(cell);
                        try
                        {
                            dataRow[actualCellIndex] = GetCellValue(spreadSheetDocument, cell);

                        }
                        catch (Exception ex)
                        {

                            if (ex is IndexOutOfRangeException)
                            {
                                continue;
                            }
                        }
                    }

                    dataTable.Rows.Add(dataRow);
                }

            }
            dataTable.Rows.RemoveAt(0);

            return dataTable;
        }


        [WebMethod]
        public static string GetRoomTypesFor_QRCodes(int lg, int obj)
        {

            return Mydb.ExecuteAsJson("GetRoomTypesFor_QRCodes", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
        }

        [WebMethod]
        public static string GenerateQrCode(int lg)
        {



            dynamic Rooms = JsonConvert.DeserializeObject(Mydb.ExecuteAsJson("Get_RoomGuidFor_QRby_LoginId", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure));
            foreach (var item2 in Rooms)
            {
                string R_guid = (string)item2.ROOM_GUID;
                string json = new JavaScriptSerializer().Serialize(new
                {
                    QRTEXT = R_guid,

                });
                string url = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/WCFServices/MATORIN.QUICK_API.svc/CreateQRCode";
                //"http://172.20.20.115/WCFServices/MATORIN.QUICK_API.svc/CreateQRCode";//
                // 
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

                request.Method = "POST";

                request.ContentType = "application/json";
                request.ContentLength = json.Length;

                using (var writer = new StreamWriter(request.GetRequestStream()))
                {
                    writer.Write(json);
                }

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                var dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string responseFromServer = reader.ReadToEnd();

                JavaScriptSerializer js = new JavaScriptSerializer();
                var obj = js.Deserialize<dynamic>(responseFromServer);
                var ResultData = obj["ResultData"];
                var QR_CODE = ResultData["QR_CODE_URL"];

                Mydb.ExecuteNoNQuery("Update_ROOM_QRCODE", new SqlParameter[] { new SqlParameter("@room_guid", R_guid), new SqlParameter("@QRCODE", QR_CODE) }, CommandType.StoredProcedure);

            }


            return new JavaScriptSerializer().Serialize(new { result = "OK" });
        }

        [WebMethod]
        public static string ShowExcel(string file)
        {
            string result = "";
            try
            {
                bool success = true;

                file = @"C:\inetpub\wwwroot\Files\" + file;
                DataTable dt = ReadAsDataTable(file);
                //SaveSupplierServices(dt);
                string header0 = dt.Columns[0].ColumnName;

                string header1 = dt.Columns[1].ColumnName;
                string header2 = dt.Columns[2].ColumnName;
                string header3 = dt.Columns[3].ColumnName;
                string header4 = dt.Columns[4].ColumnName;
                string header5 = dt.Columns[5].ColumnName;
                string header6 = dt.Columns[6].ColumnName;
                string header7 = dt.Columns[7].ColumnName;
                string header8 = dt.Columns[8].ColumnName;
                string header9 = dt.Columns[9].ColumnName;
                string header10 = dt.Columns[10].ColumnName;
                string header11 = dt.Columns[11].ColumnName;
                string header12 = dt.Columns[12].ColumnName;
                string header13 = dt.Columns[13].ColumnName;
                string header14 = dt.Columns[14].ColumnName;
                #region CheckHeaders
                if (header0 != "№ ЛС*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок первой колонки " + header0 + ". Должно быть № ЛС*\"}";
                    goto end;
                }
                if (header2 != "Этаж")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header2 + ". Должно быть Этаж\"}";
                    goto end;
                }
                if (header3 != "№ помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header3 + ". Должно быть № помещения*\"}";
                    goto end;
                }
                if (header4 != "Назначение помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок третий колонки " + header4 + ". Должно быть Назначение помещения*\"}";
                    goto end;
                }
                if (header5 != "Тип помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок четвертый колонки " + header5 + ". Должно быть Тип помещения*\"}";
                    goto end;
                }
                if (header6 != "Тип собственности")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок пятый колонки " + header6 + ". Должно быть Тип собственности\"}";
                    goto end;
                }
                if (header7 != "ФИО собственника")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок шестой колонки " + header7 + ". Должно быть ФИО собственника\"}";
                    goto end;
                }
                if (header8 != "Доля собственности")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок седьмой колонки " + header8 + ". Должно быть Доля собственности\"}";
                    goto end;
                }
                if (header9 != "Номер телефона")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок восьмой колонки " + header9 + ". Должно быть Номер телефона\"}";
                    goto end;
                }
                if (header10 != "E-mail")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок девятый колонки " + header10 + ". Должно быть E-mail\"}";
                    goto end;
                }
                if (header11 != "Общая площадь")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header11 + ". Должно быть Общая площадь\"}";
                    goto end;
                }
                if (header12 != "Жилая площадь")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header12 + ". Должно быть Жилая площадь\"}";
                    goto end;
                }
                if (header13 != "Общая площадь без летних зон")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header13 + ". Должно быть Общая площадь без летних зон\"}";
                    goto end;
                }
                if (header14 != "Пароль")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header14 + ". Должно быть Пароль\"}";
                    goto end;
                }
                end:;
                #endregion

                List<ScoreFromExcel> sfxs = new List<ScoreFromExcel>();
                if (success == true)
                {
                    foreach (DataRow item in dt.Rows)
                    {
                        ScoreFromExcel sfx = new ScoreFromExcel();


                        sfx.NUMBER = item["№ ЛС*"].ToString();//(item[0].ToString().Length == 0) ? " " : item[0].ToString();
                        sfx.ENTRANCE = item["Подъезд"].ToString();
                        sfx.FLOOR = item["Этаж"].ToString();
                        sfx.ROOM_NUMBER = (item["№ помещения*"].ToString().Length == 0) ? "" : item["№ помещения*"].ToString();
                        sfx.ROOM_FOR = (item["Назначение помещения*"].ToString().Length == 0) ? "" : item["Назначение помещения*"].ToString();
                        //if (sfx.NUMBER.Length==0 &&(sfx.ROOM_FOR== "Обособленное нежилое помещение" || sfx.ROOM_FOR== "Помещение общего пользования"))
                        //{
                        //    sfx.NUMBER = Mydb.ExecuteAsJson("GetVirtualScoreId", new SqlParameter[] { }, CommandType.StoredProcedure).ToString() ;
                        //}
                        sfx.ROOM_TYPE = (item["Тип помещения*"].ToString().Length == 0) ? " " : item["Тип помещения*"].ToString();
                        sfx.SHARE = (item["Доля собственности"].ToString().Length == 0) ? "" : item["Доля собственности"].ToString();
                        sfx.FIRST_NAME = (item["ФИО собственника"].ToString().Length == 0) ? "" : item["ФИО собственника"].ToString();
                        sfx.PHONE = (item["Номер телефона"].ToString().Length == 0) ? "" : item["Номер телефона"].ToString();
                        sfx.EMAIL = (item["E-mail"].ToString().Length == 0) ? "" : item["E-mail"].ToString();
                        sfx.OWNERSHIP_TYPE_ID = (item["Тип собственности"].ToString().Length == 0) ? " " : item["Тип собственности"].ToString();
                        sfx.GEN_SQUARE = (item["Общая площадь"].ToString().Length == 0) ? "" : item["Общая площадь"].ToString();
                        sfx.LIVE_SQUARE = (item["Жилая площадь"].ToString().Length == 0) ? "" : item["Жилая площадь"].ToString();
                        sfx.WITHOUT_SUMMER_SQUARE = (item["Общая площадь без летних зон"].ToString().Length == 0) ? " " : item["Общая площадь без летних зон"].ToString();
                        sfx.Pass = (item["Пароль"].ToString().Length == 0) ? "" : item["Пароль"].ToString();

                        //&& !string.IsNullOrEmpty(sfx.NUMBER) 
                        if (sfx.NUMBER != "№ ЛС*" && !string.IsNullOrEmpty(sfx.ROOM_NUMBER) && !string.IsNullOrEmpty(sfx.ROOM_FOR) && !string.IsNullOrEmpty(sfx.ROOM_TYPE))
                        {
                            sfxs.Add(sfx);
                        }
                        else
                        {
                            if (sfx.NUMBER != "№ ЛС*")
                            {

                            }
                        }

                    }
                }


                JavaScriptSerializer js = new JavaScriptSerializer();
                js.MaxJsonLength = Int32.MaxValue;
                if (success == true)
                {
                    // result = js.Serialize(sfxs);
                    result = "{\"result\" : \"Ok\",\"Numbers\":" + js.Serialize(sfxs) + "}";
                }

                return result;

            }
            catch (Exception ex)
            {

                result = "{\"result\" : \"" + ex.Message + "\"}";
                return result;
            }
            //  return "";
        }

        private static void SaveSupplierServices(DataTable dt)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                //slobina files/532fedbc-a20d-4310-90f7-f0b874b295f1.xlsx
                string SERVICE_NAME = dt.Rows[i]["SERVICE_NAME"].ToString();
                object parent_id = dt.Rows[i]["parent_id"];// Convert.ToInt32(dt.Rows[i]["parent_id"]);
                // dt.Rows[i][1].ToString();
                string SERVICE_UNIT = dt.Rows[i]["SERVICE_UNIT"].ToString();
                string SERVICE_NOTES= dt.Rows[i]["SERVICE_NOTES"].ToString();
                string SERVICE_COST= dt.Rows[i]["SERVICE_COST"].ToString();
                
                try
                {
                    //    Mydb.ExecuteNoNQuery("INSERT INTO [kvorum].[dbo].[_SUPPLIER_SERVICES]([parent_id],[SERVICE_NAME],[SERVICE_UNIT],[SERVICE_NOTES],[SERVICE_COST]) VALUES(@parent_id,@SERVICE_NAME,@SERVICE_UNIT,@SERVICE_NOTES,@SERVICE_COST)", new SqlParameter[] {
                    //    new SqlParameter("@parent_id",Convert.ToInt32(parent_id)),
                    //    new SqlParameter("@SERVICE_NAME", SERVICE_NAME)
                    //    ,new SqlParameter("@SERVICE_UNIT",SERVICE_UNIT),
                    //    new SqlParameter("@SERVICE_NOTES",SERVICE_NOTES),
                    //    new SqlParameter("@SERVICE_COST",SERVICE_COST)
                    //}, CommandType.Text);
                    if (parent_id==null)
                    {
                        //insert by output
                    }
                    else
                    {
                        // onlyInsert
                    }
                }
                catch (Exception ex)
                {
                    string a_ = "dutdut";
                }

            }
            string a = "thats all";
        }

        [WebMethod]
        public static string CHeck_Obj_RMF_RMT_RMN(int OBJECT_ID, int ROOM_FOR_ID, int ROOM_TYPE_ID, string ROOM_NUMBER, int LOG_IN_ID, int FLOOR)
        {
            string result;
            int CROOM = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where ROOM_NUMBER=@ROOM_NUMBER and ROOM_FOR_ID=@ROOM_FOR_ID and ROOM_TYPE_ID=@ROOM_TYPE_ID and FLOOR=@FLOOR and OBJECT_ID=@OBJECT_ID and LOG_IN_ID=@LOG_IN_ID and IS_DELETED_R=0 and IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@ROOM_NUMBER", ROOM_NUMBER), new SqlParameter("@ROOM_FOR_ID", ROOM_FOR_ID), new SqlParameter("@ROOM_TYPE_ID", ROOM_TYPE_ID), new SqlParameter("@FLOOR", FLOOR), new SqlParameter("@OBJECT_ID", OBJECT_ID), new SqlParameter("@LOG_IN_ID", LOG_IN_ID) }, CommandType.Text);
            if (CROOM == 0)
            {
                result = "{\"result\" : \"0\"}";
            }
            else
            {
                result = "{\"result\" : \"1\"}";
            }
            return result;
        }
        //[WebMethod]
        //public static string UplFile(Stream stream)
        //{

        //    HttpMultipartParser parser = new HttpMultipartParser(stream, "file");
        //    string tokenID;
        //    string sign;
        //    if (parser.Success)
        //    {
        //        var gname = Guid.NewGuid().ToString();
        //        var extension = Path.GetExtension(parser.Filename);
        //        var rootpath = AppDomain.CurrentDomain.BaseDirectory;
        //        rootpath = @"C:\inetpub\wwwroot";
        //        tokenID = parser.Parameters["tokenid"];
        //        sign = parser.Parameters["sign"];

        //        if (!Directory.Exists(rootpath + @"\Files\"))
        //        {
        //            Directory.CreateDirectory(rootpath + @"\Files\");
        //        }
        //        if (!Directory.Exists(rootpath + @"\Files\" + tokenID))
        //        {
        //            Directory.CreateDirectory(rootpath + @"\Files\" + tokenID);
        //        }
        //        var path = rootpath + @"Files\" + tokenID + @"\" + gname + extension;
        //        var url = @"http://31.3.22.226:12480/Files/" + tokenID + @"/" + gname + extension;
        //        File.WriteAllBytes(path, parser.FileContents);
        //    }

        //    return "{\"result\" : \"OK\"}";
        //}
        [WebMethod]
        public static string GenPassMass(List<AccountDatas_Base> scores, int o, string sms, string em, string exp)
        {
            List<AccountDatas_Base> ad_notSend = new List<AccountDatas_Base>();

            List<AccountDatas_Base> DistinctScores = scores.GroupBy(x => x.NUMBER).Select(x => x.FirstOrDefault()).ToList(); //ad_notSend.Select(x => new  { x.firs}).Distinct().ToList();
            // loop for only none Repeated Scores
            foreach (var item in DistinctScores)
            {
                Mydb.ExecuteNoNQuery("update PER_SCORE set PASS=(select dbo.GeneratePass()), DATA_EXP=@DATA_EXP where SCORE_ID=@PER_SCORE and OBJECT_ID=@o", new SqlParameter[] {
                    new SqlParameter("@DATA_EXP",exp),
                    new SqlParameter("@PER_SCORE",item.NUMBER),
                    new SqlParameter("@o",o)
                }, CommandType.Text);
            }
            foreach (AccountDatas_Base item in DistinctScores)
            {
                //Mydb.ExecuteNoNQuery("update PER_SCORE set PASS=(select dbo.GeneratePass()), DATA_EXP=@DATA_EXP where SCORE_ID=@PER_SCORE and OBJECT_ID=@o", new SqlParameter[] {
                //    new SqlParameter("@DATA_EXP",exp),
                //    new SqlParameter("@PER_SCORE",item.NUMBER),
                //    new SqlParameter("@o",o)
                //}, CommandType.Text);
                /*select * from VW_ROOMS where NUMBER=@n and OBJECT_ID=@o AND IS_DELETED_R=0 AND IS_DELETED_PS=0*/
                DataTable dt = Mydb.ExecuteReadertoDataTable("GetIndDatasByScoresId_and_Object", new SqlParameter[] { new SqlParameter("@n", item.NUMBER), new SqlParameter("@o", o) }, CommandType.StoredProcedure);

                //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", o) }, CommandType.Text).ToString();
                // protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
                //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
                string Pass = Mydb.ExecuteScalar("select PASS from PER_SCORE where SCORE_ID=@sc and OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER), new SqlParameter("@o", o) }, CommandType.Text).ToString();
                if (sms == "has")
                {
                    foreach (DataRow item2 in dt.Rows)
                    {
                        string phone = item2["PHONE"].ToString();
                        phone = phone.Trim();
                        if (phone.Length != 0)
                        {
                            //sendSsms

                            string resultSms = AddApartment.SendSms(phone, item.NUMBER, Pass, "Dlya Vas sozdan novyi parol'");
                            // Mydb.ExecuteNoNQuery("Update IND_NAME set SMS_OK=@sms where PHONE=@phn", new SqlParameter[] {new SqlParameter("@sms", resultSms), new SqlParameter("@phn", item2["PHONE"].ToString()) }, CommandType.Text);
                            Mydb.ExecuteNoNQuery("UpdateIndName_forGenerationPas", new SqlParameter[] { new SqlParameter("@smsok", resultSms), new SqlParameter("@phn", item2["PHONE"].ToString()), new SqlParameter("@sc", item.NUMBER) }, CommandType.StoredProcedure);


                        }
                        else
                        {
                            AccountDatas_Base ad_NoEm = new AccountDatas_Base();
                            ad_NoEm.NUMBER = item.NUMBER;
                            ad_NoEm.LIVE_SQUARE = "ph";
                            ad_NoEm.GEN_SQUARE = item2["FIRST_NAME"].ToString();
                            ad_notSend.Add(ad_NoEm);

                        }

                    }
                }


                if (em == "has")
                {
                    foreach (DataRow item2 in dt.Rows)
                    {
                        string email = item2["EMAIL"].ToString();
                        email = email.Trim();
                        if (email.Length != 0)
                        {
                            //string score = item.NUMBER; ;
                            //string pass = item2["PASS"].ToString();
                            //string srok = (item2["DATA_EXP"].ToString() == "0") ? "у пароля неограниченный срок действия" : item2["DATA_EXP"].ToString();
                            string emResult = Apartments.SendMail(item.NUMBER, Pass, item2["EMAIL"].ToString().Trim(), "0", "Для Вас создан новый пароль");// SendMail(item.NUMBER, item2["PASS"].ToString(), item2["EMAIL"].ToString().Trim(), "0","G");

                            //Mydb.ExecuteNoNQuery("Update IND_NAME set EMAIL_OK=@emok where EMAIL=@email", new SqlParameter[] { new SqlParameter("@emok", emResult),new SqlParameter("@email", email) }, CommandType.Text);
                            Mydb.ExecuteNoNQuery("UpdateIndName_forGenerationPas", new SqlParameter[] { new SqlParameter("@emok", emResult), new SqlParameter("@email", email), new SqlParameter("@sc", item.NUMBER) }, CommandType.StoredProcedure);
                        }
                        else
                        {
                            AccountDatas_Base ad_NoEm = new AccountDatas_Base();
                            ad_NoEm.NUMBER = item.NUMBER;
                            ad_NoEm.LIVE_SQUARE = "em";
                            ad_NoEm.GEN_SQUARE = item2["FIRST_NAME"].ToString();
                            ad_notSend.Add(ad_NoEm);

                        }

                    }

                }


            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ad_notSend);
        }
        [WebMethod]
        public static string ExpiredTenants(int lg, int o)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_ROOMS where OBJECT_ID=@o and LOG_IN_ID=@lg AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@o", o) }, CommandType.Text);

            List<Rooms> rms = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                DateTime Crdate;
                DateTime.TryParse(item["CR_DATA"].ToString(), out Crdate);
                DateTime currDate = DateTime.UtcNow.Date;
                TimeSpan differents = currDate - Crdate;
                int NumOfDays = (int)differents.TotalDays;
                //i == "") ?(-1): (item["DATA_EXP"].ToString()));
                if (item["DATA_EXP"].ToString() != "")
                {
                    int ExpDate = Convert.ToInt32(item["DATA_EXP"]);

                    if (NumOfDays > ExpDate)
                    {
                        Rooms rm = new Rooms();
                        rm.ENTRANCE = item["ENTRANCE"].ToString();
                        rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                        rm.FLOOR = item["FLOOR"].ToString();
                        rm.NUMBER = item["NUMBER"].ToString();
                        rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                        rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                        rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                        rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                        rms.Add(rm);
                    }
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);
        }
        [WebMethod]
        public static string PassLEss(int lg, int o)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_ROOMS where OBJECT_ID=@o and LOG_IN_ID=@lg and (PASS='' or PASS is null) AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@o", o), new SqlParameter("@lg", lg) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.ENTRANCE = item["ENTRANCE"].ToString();
                rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                rm.FLOOR = item["FLOOR"].ToString();
                rm.NUMBER = item["NUMBER"].ToString();
                rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                rms.Add(rm);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);
        }
        [WebMethod]
        public static string SaveInDBFromEx(int ObjId, string file, int l)
        {
            string result = "";
            // string adres = @"C:\inetpub\wwwroot\Files\" + file + "";
            // adres = adres.Replace("~", "\\");
            //  string extention = file.Substring(file.IndexOf('.') + 1);
            bool success = true;//C:\inetpub\wwwroot\Files\" + file + "
            //string connStr = "";
            //if (extention == "xlsx")
            //{
            //    connStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + adres + ";Extended Properties='Excel 12.0;IMEX=1'";

            //}
            //if (extention == "xls")
            //{
            //    connStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + adres + ";Extended Properties='Excel 8.0;IMEX=1'";
            //}
            //OleDbConnection conn = new OleDbConnection(connStr);
            //OleDbCommand cmd = new OleDbCommand();
            //cmd.Connection = conn;
            //OleDbDataAdapter da = new OleDbDataAdapter(cmd);
            //DataTable dt = new DataTable();
            //conn.Open();
            //DataTable dtSheet = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            //// 
            //foreach (System.Data.DataRow sheet in dtSheet.Rows)
            //{
            //    string sheetName = sheet["table_name"].ToString();
            //    cmd.CommandText = "select * from [" + sheetName + "]";
            //    da.SelectCommand = cmd;
            //    da.Fill(dt);
            //}
            try
            {
                int ROOM_FOR_ID = 0;
                int ROOM_TYPE_ID = 0;
                int OWNERSHIP_TYPE_ID = 0;
                file = @"C:\inetpub\wwwroot\Files\" + file;
                DataTable dt = ReadAsDataTable(file);//ExcelToDataTable(file);
                List<AccountDatas_Base> adb_s = new List<AccountDatas_Base>();
                if (success == true)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (string.IsNullOrEmpty(dt.Rows[i][0].ToString()) && string.IsNullOrEmpty(dt.Rows[i][3].ToString()) && string.IsNullOrEmpty(dt.Rows[i][4].ToString()) && string.IsNullOrEmpty(dt.Rows[i][5].ToString()))
                        {
                            continue;
                        }
                        ScoreFromExcel sfx = new ScoreFromExcel();
                        ROOM_FOR_ID = (int)Mydb.ExecuteScalar("getRoomFor_andRoomTypeId", new SqlParameter[] { new SqlParameter("@type_", 1), new SqlParameter("@text", dt.Rows[i][4].ToString().Trim()) }, CommandType.StoredProcedure);
                        if (ROOM_FOR_ID == 0)
                        {
                            #region badcode
                            //dt.Rows[i][2].ToString().Trim() == "Жилое помещение" || dt.Rows[i][2].ToString().Trim() == "Обособленное нежилое помещение" || dt.Rows[i][2].ToString().Trim() == "Квартира" || dt.Rows[i][2].ToString().Trim() == "Помещение общего пользования"
                            //if (dt.Rows[i][2].ToString().Trim() == "Жилое помещение")
                            //{
                            //    ROOM_FOR_ID = 1;
                            //}
                            //if (dt.Rows[i][2].ToString().Trim() == "Обособленное нежилое помещение")
                            //{
                            //    ROOM_FOR_ID = 2;
                            //}
                            //if (dt.Rows[i][2].ToString().Trim() == "Квартира")
                            //{
                            //    ROOM_FOR_ID = 3;
                            //}
                            //if (dt.Rows[i][2].ToString().Trim() == "Помещение общего пользования")
                            //{
                            //    ROOM_FOR_ID = 4;
                            //} 
                            #endregion
                            success = false;
                            result = "{\"result\" : \"Некорректное назначение помещения \"}";
                            break;
                            // success = true;
                        }
                        //else
                        //{

                        //}
                        //   string room_type = dt.Rows[i][3].ToString();
                        string text_test = dt.Rows[i][5].ToString().Trim();
                        ROOM_TYPE_ID = (int)Mydb.ExecuteScalar("getRoomFor_andRoomTypeId", new SqlParameter[] { new SqlParameter("@type_", 2), new SqlParameter("@text", text_test) }, CommandType.StoredProcedure);
                        if (ROOM_TYPE_ID == 0)
                        {
                            #region badcode
                            //dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Квартира" || dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Офис" || dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Апартаменты" || dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Машиноместо" || dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Нежилое"
                            //if (dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Квартира")
                            //{
                            //    ROOM_TYPE_ID = 1;
                            //}
                            //if (dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Офис")
                            //{
                            //    ROOM_TYPE_ID = 2;
                            //}
                            //if (dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Апартаменты")
                            //{
                            //    ROOM_TYPE_ID = 3;
                            //}
                            //if (dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Машиноместо")
                            //{
                            //    ROOM_TYPE_ID = 4;
                            //}
                            //if (dt.Rows[i][3].ToString().TrimEnd().TrimStart() == "Нежилое")
                            //{
                            //    ROOM_TYPE_ID = 5;
                            //}

                            //success = true; 
                            #endregion
                            success = false;
                            result = "{\"result\" : \"Некорректный тип помещения  \"}";
                            break;
                        }
                        //else
                        //{

                        //}
                        OWNERSHIP_TYPE_ID = (dt.Rows[i][6].ToString().Length != 0) ? (int)Mydb.ExecuteScalar("getRoomFor_andRoomTypeId", new SqlParameter[] { new SqlParameter("@type_", 3), new SqlParameter("@text", dt.Rows[i][6].ToString().Trim()) }, CommandType.StoredProcedure) : 0;
                        if (OWNERSHIP_TYPE_ID == 0 && dt.Rows[i][6].ToString().Length != 0)
                        {
                            #region badCode
                            //dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Социальный найм" || dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Долевая" || dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Единоличная" || dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Совместная"
                            //success = true;
                            //if (dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Социальный найм")
                            //{
                            //    OWNERSHIP_TYPE_ID = 4;
                            //}
                            //if (dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Долевая")
                            //{
                            //    OWNERSHIP_TYPE_ID = 3;
                            //}
                            //if (dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Единоличная")
                            //{
                            //    OWNERSHIP_TYPE_ID = 2;
                            //}
                            //if (dt.Rows[i][4].ToString().TrimEnd().TrimStart() == "Совместная")
                            //{
                            //    OWNERSHIP_TYPE_ID = 1;
                            //} 
                            #endregion
                            success = false;
                            result = "{\"result\" : \"Некорректный тип собственности  \"}";
                            break;

                        }
                        else
                        {

                        }
                        string ShareValue1 = dt.Rows[i][8].ToString().Trim();//.TrimEnd().TrimStart();

                        AccountDatas_Base ad_b = new AccountDatas_Base();
                        ad_b.ENTRANCE = dt.Rows[i][1].ToString().Trim();
                        ad_b.GEN_SQUARE = dt.Rows[i][11].ToString().Trim();//TrimEnd().TrimStart();
                        ad_b.LIVE_SQUARE = dt.Rows[i][12].ToString().Trim();//.TrimEnd().TrimStart();
                        ad_b.NUMBER = dt.Rows[i][0].ToString().Trim();//.TrimEnd().TrimStart();
                        ad_b.FLOOR = dt.Rows[i][2].ToString();
                        if (ad_b.NUMBER.Length == 0)
                        {
                            if (ROOM_FOR_ID == 2 || ROOM_FOR_ID == 4)
                            {
                                ad_b.NUMBER = Mydb.ExecuteScalar("getRoomFor_andRoomTypeId", new SqlParameter[] { new SqlParameter("@type_", 4) }, CommandType.StoredProcedure).ToString();
                            }
                            else
                            {
                                success = false;
                                result = "{\"result\" : \"Некорректный Лицевой счёт  \"}";
                                break;
                            }
                        }
                        ad_b.OWNERSHIP_TYPE_ID = OWNERSHIP_TYPE_ID;
                        ad_b.ROOM_QUANT = dt.Rows[i][3].ToString().Trim();//.TrimEnd().TrimStart();
                        ad_b.WITHOUT_SUMMER_SQUARE = dt.Rows[i][13].ToString().Trim() + "|" + dt.Rows[i][8].ToString().TrimEnd().TrimStart() + "|" + ROOM_FOR_ID + "|" + ROOM_TYPE_ID + "|" + dt.Rows[i][7].ToString().Trim() + "|" + dt.Rows[i][14].ToString().Trim(); ;
                        List<AccountDatas> ads = new List<AccountDatas>();
                        AccountDatas ad = new AccountDatas();
                        ad.EMAIL = (dt.Rows[i][10].ToString().Trim().Length == 0) ? "" : dt.Rows[i][10].ToString().Trim();
                        ad.FIRST_NAME = (dt.Rows[i][7].ToString().Trim().Length == 0) ? "" : dt.Rows[i][7].ToString().Trim();
                        ad.PHONE = (dt.Rows[i][9].ToString().Trim().Length == 0) ? "" : dt.Rows[i][9].ToString().Trim(); ;
                        ad.SHARE = (dt.Rows[i][8].ToString().Trim().Length == 0) ? "" : dt.Rows[i][8].ToString().Trim();
                        if (ad.EMAIL.Length == 0 && ad.FIRST_NAME.Length == 0 && ad.PHONE.Length == 0 && ad.SHARE.Length == 0)
                        {

                        }
                        else
                        {
                            ads.Add(ad);
                            ad_b.A_D = ads;
                        }
                        adb_s.Add(ad_b);
                    }
                }
                if (success == true)
                {
                    JavaScriptSerializer js = new JavaScriptSerializer();

                    List<AccountDatas_Base> adb_s_not = new List<AccountDatas_Base>();
                    foreach (AccountDatas_Base item in adb_s)
                    {
                        string[] widht_ = item.WITHOUT_SUMMER_SQUARE.Split('|');
                        // get Room Count 
                        int RoomCount = (int)Mydb.ExecuteScalar("select COUNT(*) from ROOM where ROOM_NUMBER=@rn and [OBJECT_ID]=@o", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT) }, CommandType.Text);
                         
                            // get Score_Count(LS)
                        int ScoreCount = (int)Mydb.ExecuteScalar("select COUNT(*) from PER_SCORE where SCORE_ID=@sc and [OBJECT_ID]=@o", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@sc", item.NUMBER) }, CommandType.Text);
                        if (RoomCount == 0)
                        { // if Room is not exits in database then make inserting operation and get new inserted Room_Id

                            // if Score count is not exists
                            if (ScoreCount == 0)
                            {
                                int LastRoomId = (int)Mydb.ExecuteScalar("insert into ROOM (OBJECT_ID, ENTRANCE,FLOOR,ROOM_NUMBER,ROOM_FOR_ID,ROOM_TYPE_ID,CHAMB_AMOUNT,GEN_SQUARE,LIVE_SQUARE) output inserted.ROOM_ID values (@OBJECT_ID, @ENTRANCE, @FLOOR, @ROOM_NUMBER, @ROOM_FOR_ID, @ROOM_TYPE_ID, @CHAMB_AMOUNT, @GEN_SQUARE, @LIVE_SQUARE)", new SqlParameter[] {
                                            new SqlParameter("@OBJECT_ID",ObjId),
                                            new SqlParameter("@ENTRANCE",item.ENTRANCE),
                                            new SqlParameter("@FLOOR",item.FLOOR),
                                            new SqlParameter("@ROOM_NUMBER",item.ROOM_QUANT),
                                            new SqlParameter("@ROOM_FOR_ID",widht_[2].ToString()),
                                            new SqlParameter("@ROOM_TYPE_ID",widht_[3].ToString()),
                                            new SqlParameter("@CHAMB_AMOUNT"," "),
                                            new SqlParameter("@GEN_SQUARE",item.GEN_SQUARE),
                                            new SqlParameter("@LIVE_SQUARE","0")
                                        }, CommandType.Text);
                                // then inserting operation and get new inserted Score(LS) guid
                                string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                                    new SqlParameter("@SCORE_ID",item.NUMBER),
                                    new SqlParameter("@NUMBER",item.NUMBER),

                                    new SqlParameter("@ROOM_ID",LastRoomId),
                                    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                                    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                                    new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                                    new SqlParameter("@WITHOUT_SUMMER_SQUARE",widht_[0].ToString()),
                                    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                                    new SqlParameter("@PASS",widht_[5]),
                                    new SqlParameter("@OBJECT_ID",ObjId)

                                }, CommandType.Text).ToString();
                                // if in the file has owners(mean sobstvennik)
                                if (item.A_D != null)
                                {
                                    // then look at them 
                                    foreach (AccountDatas item2 in item.A_D)
                                    {
                                        string EmOk = "0";
                                        // if email not empty and in the texts has character '@' and '.' then send mail to owner (sobstvennik) and password not emoty in the file
                                        if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && widht_[5].Length != 0)
                                        {
                                            EmOk = SendMail(item.NUMBER, widht_[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                                        }
                                        string PhoneOk = "0";
                                        // if phone is not empty and length of phone not bigger then 10 and password is not empty(in the file excel)
                                        if (item2.PHONE.Length >= 10 && widht_[5].Length != 0)
                                        {

                                            PhoneOk = "0";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                                        }
                                        // insert owners to table
                                        Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                                                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                                                        new SqlParameter("@EMAIL",item2.EMAIL),
                                                        new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                                                    }, CommandType.Text);
                                        int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                                         
                                        // and make relation owners and scores(LS)
                                        Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", @scoreGuid) }, CommandType.Text);

                                    }
                                }

                            }
                            else
                            {
                                AccountDatas_Base ad_bnot = new AccountDatas_Base();
                                ad_bnot.NUMBER = item.NUMBER;
                                ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                                adb_s_not.Add(ad_bnot);
                                success = false;
                                //  result = "{\"result\" : \"HalfOk\",\"Numbers\":\""+js.Serialize(adb_s_not) +"\"}";
                                result = "{\"result\" : \"HalfOk\",\"Numbers\":" + js.Serialize(adb_s_not) + ",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";

                            }
                        }
                        else
                        {
                            int LastRoomId = (int)Mydb.ExecuteScalar("select top 1 ROOM_ID from ROOM where ROOM_NUMBER=@rn and [OBJECT_ID]=@o", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT) }, CommandType.Text);
                            if (ScoreCount == 0)
                            {
                                string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                                    new SqlParameter("@SCORE_ID",item.NUMBER),
                                    new SqlParameter("@NUMBER",item.NUMBER),

                                    new SqlParameter("@ROOM_ID",LastRoomId),
                                    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                                    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                                    new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                                    new SqlParameter("@WITHOUT_SUMMER_SQUARE",widht_[0].ToString()),
                                    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                                    new SqlParameter("@PASS",widht_[5]),
                                    new SqlParameter("@OBJECT_ID",ObjId)

                                }, CommandType.Text).ToString();

                                if (item.A_D != null)
                                {
                                    foreach (AccountDatas item2 in item.A_D)
                                    {
                                        string EmOk = "0";
                                        if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && widht_[5].Length != 0)
                                        {
                                            EmOk = SendMail(item.NUMBER, widht_[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                                        }
                                        string PhoneOk = "0";
                                        if (item2.PHONE.Length >= 10 && widht_[5].Length != 0)
                                        {

                                            PhoneOk = "0";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                                        }
                                        Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                                                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                                                        new SqlParameter("@EMAIL",item2.EMAIL),
                                                        new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                                                    }, CommandType.Text);
                                        int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                                        //  string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER)}, CommandType.Text).ToString();
                                        Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", @scoreGuid) }, CommandType.Text);

                                    }
                                }

                            }
                            else
                            {
                                string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc and [OBJECT_ID]=@o", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@sc", item.NUMBER) }, CommandType.Text).ToString();
                                if (item.A_D != null)
                                {
                                    foreach (AccountDatas item2 in item.A_D)
                                    {
                                        int IndCount=(int)Mydb.ExecuteScalar("select COUNT(*) from IND_NAME im inner join INDIVIDUAL_PERSCORE ip on ip.INDIVIDUAL_ID=im.INDIVIDUAL_ID where ip.ID=@sguid and im.FIRST_NAME=@f", new SqlParameter[] { new SqlParameter("@f",item2.FIRST_NAME),new SqlParameter("@sguid",scoreGuid)},
                                            CommandType.Text);
                                        if (IndCount==0)
                                        {
                                            string EmOk = "0";
                                            if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && widht_[5].Length != 0)
                                            {
                                                EmOk = SendMail(item.NUMBER, widht_[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                                            }
                                            string PhoneOk = "0";
                                            if (item2.PHONE.Length >= 10 && widht_[5].Length != 0)
                                            {

                                                PhoneOk = "0";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                                            }
                                            Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                                                        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                                                        new SqlParameter("@EMAIL",item2.EMAIL),
                                                        new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                                                    }, CommandType.Text);
                                            int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);


                                            Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", scoreGuid) }, CommandType.Text); 
                                        }

                                    }
                                }
                                else
                                {
                                    AccountDatas_Base ad_bnot = new AccountDatas_Base();
                                    ad_bnot.NUMBER = item.NUMBER;
                                    ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                                    adb_s_not.Add(ad_bnot);
                                    success = false;
                                    //  result = "{\"result\" : \"HalfOk\",\"Numbers\":\""+js.Serialize(adb_s_not) +"\"}";
                                    result = "{\"result\" : \"HalfOk\",\"Numbers\":" + js.Serialize(adb_s_not) + ",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";
                                }

                            }
                        }

                    }
                    #region oldCode2
                    //foreach (AccountDatas_Base item in adb_s)
                    //{
                    //    string[] widht_ = item.WITHOUT_SUMMER_SQUARE.Split('|');//control for Object 
                    //    int ViewCOunt = (int)Mydb.ExecuteScalar("ViewCount", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@lg", l), new SqlParameter("@rf", widht_[2].ToString()), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@score", item.NUMBER), new SqlParameter("@fn", widht_[4]) }, CommandType.StoredProcedure);
                    //    if (ViewCOunt!=0)
                    //    {
                    //        string[] dolya = item.WITHOUT_SUMMER_SQUARE.Split('|');
                    //        if (item.A_D != null)
                    //        {
                    //            foreach (AccountDatas item2 in item.A_D)
                    //            {
                    //                int countInd =(int) Mydb.ExecuteScalar("select COUNT(*) from IND_NAME where FIRST_NAME=@f and EMAIL=@em and PHONE=@p ", new SqlParameter[] { new SqlParameter("@f",item2.FIRST_NAME),new SqlParameter("@em",item2.EMAIL),new SqlParameter("@p",item2.PHONE) }, CommandType.Text);
                    //                if (countInd==0)
                    //                {

                    //                    string EmOk = "0";
                    //                    if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && dolya[5].Length != 0)
                    //                    {
                    //                        EmOk = SendMail(item.NUMBER, dolya[5], item2.EMAIL, "0");
                    //                    }
                    //                    string PhoneOk = "0";
                    //                    if (item2.PHONE.Length >= 10 && dolya[5].Length != 0)
                    //                    {
                    //                        PhoneOk = AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5]);//"1"; //SendSms(item2.PHONE, ObjId, item.NUMBER,dolya[5]);
                    //                    }
                    //                    Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //    new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //    new SqlParameter("@EMAIL",item2.EMAIL),
                    //    new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //}, CommandType.Text);
                    //                    //                Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE) values(@FIRST_NAME,@EMAIL,@PHONE)", new SqlParameter[] {
                    //                    //    new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //                    //    new SqlParameter("@EMAIL",item2.EMAIL),
                    //                    //    new SqlParameter("@PHONE",item2.PHONE)
                    //                    //}, CommandType.Text);
                    //                    int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                    string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER) }, CommandType.Text).ToString();

                    //                    Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", scoreGuid) }, CommandType.Text); 
                    //                }
                    //                else
                    //                {
                    //                    AccountDatas_Base ad_bnot = new AccountDatas_Base();
                    //                    ad_bnot.NUMBER = item.NUMBER ;
                    //                    ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                    //                    adb_s_not.Add(ad_bnot);
                    //                    success = false;
                    //                    //  result = "{\"result\" : \"HalfOk\",\"Numbers\":\""+js.Serialize(adb_s_not) +"\"}";
                    //                    result = "{\"result\" : \"HalfOk\",\"Numbers\":" + js.Serialize(adb_s_not) + ",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";
                    //                }

                    //            }
                    //        }
                    //        else
                    //        {
                    //            AccountDatas_Base ad_bnot = new AccountDatas_Base();
                    //            ad_bnot.NUMBER = item.NUMBER;
                    //            ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                    //            adb_s_not.Add(ad_bnot);
                    //            success = false;
                    //            //  result = "{\"result\" : \"HalfOk\",\"Numbers\":}";
                    //            result = "{\"result\" : \"HalfOk\",\"Numbers\":" + js.Serialize(adb_s_not) + ",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";

                    //        }

                    //    }
                    //    else
                    //    {
                    //        //VW_ROOMS
                    //        int roomCOunt = (int)Mydb.ExecuteScalar("select COUNT(*) from ROOM Where [OBJECT_ID]=@o and ROOM_NUMBER=@rn and ROOM_TYPE_ID=@rt and ROOM_FOR_ID=@rf and [FLOOR]=@fl  AND IS_DELETED=0", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@rf", widht_[2].ToString()), new SqlParameter("@fl", item.FLOOR) }, CommandType.Text);
                    //        if (roomCOunt==0)
                    //        {
                    //            int LastRoomId = (int)Mydb.ExecuteScalar("insert into ROOM (OBJECT_ID, ENTRANCE,FLOOR,ROOM_NUMBER,ROOM_FOR_ID,ROOM_TYPE_ID,CHAMB_AMOUNT,GEN_SQUARE,LIVE_SQUARE) output inserted.ROOM_ID values (@OBJECT_ID, @ENTRANCE, @FLOOR, @ROOM_NUMBER, @ROOM_FOR_ID, @ROOM_TYPE_ID, @CHAMB_AMOUNT, @GEN_SQUARE, @LIVE_SQUARE)", new SqlParameter[] {
                    //                    new SqlParameter("@OBJECT_ID",ObjId),
                    //                    new SqlParameter("@ENTRANCE",item.ENTRANCE),
                    //                    new SqlParameter("@FLOOR",item.FLOOR),
                    //                    new SqlParameter("@ROOM_NUMBER",item.ROOM_QUANT),
                    //                    new SqlParameter("@ROOM_FOR_ID",widht_[2].ToString()),
                    //                    new SqlParameter("@ROOM_TYPE_ID",widht_[3].ToString()),
                    //                    new SqlParameter("@CHAMB_AMOUNT"," "),
                    //                    new SqlParameter("@GEN_SQUARE",item.GEN_SQUARE),
                    //                    new SqlParameter("@LIVE_SQUARE","0")
                    //                }, CommandType.Text);

                    //            string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //                new SqlParameter("@SCORE_ID",item.NUMBER),
                    //                new SqlParameter("@NUMBER",item.NUMBER),

                    //                new SqlParameter("@ROOM_ID",LastRoomId),
                    //                new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //                new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //                new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //                new SqlParameter("@WITHOUT_SUMMER_SQUARE",widht_[0].ToString()),
                    //                new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //                new SqlParameter("@PASS",widht_[5]),
                    //                new SqlParameter("@OBJECT_ID",ObjId)

                    //            }, CommandType.Text).ToString();

                    //            if (item.A_D != null)
                    //            {
                    //                foreach (AccountDatas item2 in item.A_D)
                    //                {
                    //                    string EmOk = "0";
                    //                    if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && widht_[5].Length != 0)
                    //                    {
                    //                        EmOk = SendMail(item.NUMBER, widht_[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                    //                    }
                    //                    string PhoneOk = "0";
                    //                    if (item2.PHONE.Length >= 10 && widht_[5].Length != 0)
                    //                    {

                    //                        PhoneOk = "0";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                    //                    }
                    //                    Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //                    new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //                    new SqlParameter("@EMAIL",item2.EMAIL),
                    //                    new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //                }, CommandType.Text);
                    //                    int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                    //  string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER)}, CommandType.Text).ToString();
                    //                    Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", @scoreGuid) }, CommandType.Text);

                    //                }
                    //            }

                    //        }
                    //        else
                    //        {
                    //            //VW_ROOMS
                    //            int LastRoomId = (int)Mydb.ExecuteScalar("select top 1 ROOM_ID from ROOM Where OBJECT_ID=@o and ROOM_NUMBER=@rn and ROOM_TYPE_ID=@rt and ROOM_FOR_ID=@rf AND IS_DELETED=0", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@rf", widht_[2].ToString()) }, CommandType.Text);
                    //            string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //                new SqlParameter("@SCORE_ID",item.NUMBER),
                    //                new SqlParameter("@NUMBER",item.NUMBER),

                    //                new SqlParameter("@ROOM_ID",LastRoomId),
                    //                new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //                new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //                new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //                new SqlParameter("@WITHOUT_SUMMER_SQUARE",widht_[0].ToString()),
                    //                new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //                new SqlParameter("@PASS",widht_[5]),
                    //                new SqlParameter("@OBJECT_ID",ObjId)

                    //            }, CommandType.Text).ToString();

                    //            if (item.A_D != null)
                    //            {
                    //                foreach (AccountDatas item2 in item.A_D)
                    //                {
                    //                    string EmOk = "0";
                    //                    if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && widht_[5].Length != 0)
                    //                    {
                    //                        EmOk = SendMail(item.NUMBER, widht_[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                    //                    }
                    //                    string PhoneOk = "0";
                    //                    if (item2.PHONE.Length >= 10 && widht_[5].Length != 0)
                    //                    {

                    //                        PhoneOk = "0";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                    //                    }
                    //                    Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //                    new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //                    new SqlParameter("@EMAIL",item2.EMAIL),
                    //                    new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //                }, CommandType.Text);
                    //                    int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                    //  string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER)}, CommandType.Text).ToString();
                    //                    Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", @scoreGuid) }, CommandType.Text);

                    //                }
                    //            }

                    //        }
                    //    }

                    //} 
                    #endregion
                    #region badCode
                    //          foreach (AccountDatas_Base item in adb_s)
                    //          {
                    //              string[] widht_ = item.WITHOUT_SUMMER_SQUARE.Split('|');//control for Object 
                    //              int ViewCOunt = (int)Mydb.ExecuteScalar("ViewCount", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@lg", l), new SqlParameter("@rf", widht_[2].ToString()), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@score", item.NUMBER), new SqlParameter("@fn", widht_[4]) }, CommandType.StoredProcedure);

                    //              // select COUNT(*) from VW_ROOMS where OBJECT_ID = @o and ROOM_NUMBER = @rn and LOG_IN_ID = @lg and ROOM_FOR_ID = @rf and ROOM_TYPE_ID = @rt  and NUMBER = @score and FIRST_NAME = @fn  AND IS_DELETED_R = 0 AND IS_DELETED_PS = 0
                    //              //if (widht_[1].ToString() == "0,5")
                    //              //{
                    //              //    ViewCOunt = 0;
                    //              //}
                    //              if (ViewCOunt == 0)
                    //              {

                    //                  int roomCOunt = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS Where OBJECT_ID=@o and ROOM_NUMBER=@rn and ROOM_TYPE_ID=@rt and ROOM_FOR_ID=@rf and [FLOOR]=@fl  AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@rf", widht_[2].ToString()), new SqlParameter("@fl", item.FLOOR) }, CommandType.Text);
                    //                  if (roomCOunt == 0)
                    //                  {
                    //                      string[] witdh = item.WITHOUT_SUMMER_SQUARE.Split('|');
                    //                      int LastRoomId = (int)Mydb.ExecuteScalar("insert into ROOM (OBJECT_ID, ENTRANCE,FLOOR,ROOM_NUMBER,ROOM_FOR_ID,ROOM_TYPE_ID,CHAMB_AMOUNT,GEN_SQUARE,LIVE_SQUARE) output inserted.ROOM_ID values (@OBJECT_ID, @ENTRANCE, @FLOOR, @ROOM_NUMBER, @ROOM_FOR_ID, @ROOM_TYPE_ID, @CHAMB_AMOUNT, @GEN_SQUARE, @LIVE_SQUARE)", new SqlParameter[] {
                    //                              new SqlParameter("@OBJECT_ID",ObjId),
                    //                              new SqlParameter("@ENTRANCE",item.ENTRANCE),
                    //                              new SqlParameter("@FLOOR",item.FLOOR),
                    //                              new SqlParameter("@ROOM_NUMBER",item.ROOM_QUANT),
                    //                              new SqlParameter("@ROOM_FOR_ID",witdh[2].ToString()),
                    //                              new SqlParameter("@ROOM_TYPE_ID",witdh[3].ToString()),
                    //                              new SqlParameter("@CHAMB_AMOUNT"," "),
                    //                              new SqlParameter("@GEN_SQUARE",item.GEN_SQUARE),
                    //                              new SqlParameter("@LIVE_SQUARE","0")
                    //                          }, CommandType.Text);
                    //                      // int LastRoomId = (int)Mydb.ExecuteScalar("select top 1 ROOM_ID from ROOM order by ROOM_ID desc", new SqlParameter[] { }, CommandType.Text);
                    //                      string[] dolya = item.WITHOUT_SUMMER_SQUARE.Split('|');
                    //                      // if (dolya[1] == "1")
                    //                      //   {
                    //                      int CountNumber = (int)Mydb.ExecuteScalar("select count(*) from VW_ROOMS where NUMBER=@NUMBER and OBJECT_ID=@o AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@NUMBER", item.NUMBER), new SqlParameter("@o", ObjId) }, CommandType.Text);
                    //                      if (CountNumber == 0)
                    //                      {
                    //                          string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //          new SqlParameter("@SCORE_ID",item.NUMBER),
                    //          new SqlParameter("@NUMBER",item.NUMBER),

                    //          new SqlParameter("@ROOM_ID",LastRoomId),
                    //          new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //          new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //          new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //          new SqlParameter("@WITHOUT_SUMMER_SQUARE",dolya[0].ToString()),
                    //          new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //          new SqlParameter("@PASS",dolya[5]),
                    //          new SqlParameter("@OBJECT_ID",ObjId)

                    //      }, CommandType.Text).ToString();
                    //                          if (item.A_D != null)
                    //                          {
                    //                              foreach (AccountDatas item2 in item.A_D)
                    //                              {
                    //                                  string EmOk = "0";
                    //                                  if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && dolya[5].Length != 0)
                    //                                  {
                    //                                      EmOk = SendMail(item.NUMBER, dolya[5], item2.EMAIL, "0", "Для Вас создан новый пароль");
                    //                                  }
                    //                                  string PhoneOk = "0";
                    //                                  if (item2.PHONE.Length >= 10 && dolya[5].Length != 0)
                    //                                  {

                    //                                      PhoneOk = "1";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5], "Dlya Vashego litsevogo scheta sozdan parol’");//"1";//SendSms(item2.PHONE, ObjId, item.NUMBER, dolya[5]);
                    //                                  }
                    //                                  Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //              new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //              new SqlParameter("@EMAIL",item2.EMAIL),
                    //              new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //          }, CommandType.Text);
                    //                                  int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                                  //  string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER)}, CommandType.Text).ToString();
                    //                                  Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", @scoreGuid) }, CommandType.Text);

                    //                              }
                    //                          }
                    //                      }
                    //                      else
                    //                      {
                    //                          AccountDatas_Base ad_bnot = new AccountDatas_Base();
                    //                          ad_bnot.NUMBER = item.NUMBER + "уже присутствует у данного объекта.";
                    //                          ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                    //                          adb_s_not.Add(ad_bnot);
                    //                          success = false;

                    //                          //success = false;
                    //                         // result = "{\"result\" : \"HalfOk\",\"Numbers\":\"0\",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";
                    //                      }
                    //                      #region badcode
                    //                      //  }
                    //                      /*  else
                    //                        {
                    //                string scoreGuid = Mydb.ExecuteScalar("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID) output inserted.ID values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //    new SqlParameter("@SCORE_ID",item.NUMBER),
                    //    new SqlParameter("@NUMBER",item.NUMBER),

                    //    new SqlParameter("@ROOM_ID",LastRoomId),
                    //    new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //    new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //    new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //    new SqlParameter("@WITHOUT_SUMMER_SQUARE",dolya[0].ToString()),
                    //    new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //    new SqlParameter("@PASS",dolya[5]),
                    //    new SqlParameter("@OBJECT_ID",ObjId)
                    //}, CommandType.Text).ToString();
                    //                if (item.A_D!=null)
                    //                {
                    //                    foreach (AccountDatas item2 in item.A_D)
                    //                    {
                    //                        string EmOk = "0";
                    //                        if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && dolya[5].Length != 0)
                    //                        {
                    //                            EmOk = SendMail(item.NUMBER, dolya[5], item2.EMAIL, "0");
                    //                        }
                    //                        string PhoneOk = "0";
                    //                        if (item2.PHONE.Length >= 10 && dolya[5].Length != 0)
                    //                        {
                    //                            PhoneOk = "";//AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5]);//"1";// SendSms(item2.PHONE, ObjId, item.NUMBER,dolya[5]);
                    //                        }
                    //                        Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //        new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //        new SqlParameter("@EMAIL",item2.EMAIL),
                    //        new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //    }, CommandType.Text);
                    //                        int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                     //   string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER) }, CommandType.Text).ToString();

                    //                        Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId),new SqlParameter("@scoreGuid", scoreGuid) }, CommandType.Text);

                    //                    } 
                    //                }
                    //                        }*/
                    //                      #endregion
                    //                  }
                    //                  else
                    //                  {//lastroom yanlis almistin test etmek lasim 100000
                    //                      int LastRoomId = (int)Mydb.ExecuteScalar("select top 1 ROOM_ID from VW_ROOMS Where OBJECT_ID=@o and ROOM_NUMBER=@rn and ROOM_TYPE_ID=@rt and ROOM_FOR_ID=@rf AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@o", ObjId), new SqlParameter("@rn", item.ROOM_QUANT), new SqlParameter("@rt", widht_[3].ToString()), new SqlParameter("@rf", widht_[2].ToString()) }, CommandType.Text);
                    //                      string[] dolya = item.WITHOUT_SUMMER_SQUARE.Split('|');
                    //                      if (dolya[1] == "1")
                    //                      {
                    //                          int CountNumber = (int)Mydb.ExecuteScalar("select count(*) from VW_ROOMS where NUMBER=@NUMBER and OBJECT_ID=@o AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@NUMBER", item.NUMBER), new SqlParameter("@o", ObjId) }, CommandType.Text);
                    //                          if (CountNumber == 0)
                    //                          {
                    //                              Mydb.ExecuteNoNQuery("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID)values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //          new SqlParameter("@SCORE_ID",item.NUMBER),
                    //          new SqlParameter("@NUMBER",item.NUMBER),

                    //          new SqlParameter("@ROOM_ID",LastRoomId),
                    //          new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //          new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //          new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //          new SqlParameter("@WITHOUT_SUMMER_SQUARE",(dolya[0]==" ")?"0":dolya[0]),
                    //          new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //          new SqlParameter("@PASS",dolya[5]),
                    //          new SqlParameter("@OBJECT_ID",ObjId)

                    //      }, CommandType.Text);
                    //                              if (item.A_D != null)
                    //                              {
                    //                                  foreach (AccountDatas item2 in item.A_D)
                    //                                  {
                    //                                      string EmOk = "0";
                    //                                      if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && dolya[5].Length != 0)
                    //                                      {
                    //                                          EmOk = SendMail(item.NUMBER, dolya[5], item2.EMAIL, "0");
                    //                                      }
                    //                                      string PhoneOk = "0";
                    //                                      if (item2.PHONE.Length >= 10 && dolya[5].Length != 0)
                    //                                      {
                    //                                          PhoneOk = "0"; //AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5]);// "1"; //SendSms(item2.PHONE, ObjId, item.NUMBER,dolya[5]);
                    //                                      }
                    //                                      Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //              new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //              new SqlParameter("@EMAIL",item2.EMAIL),
                    //              new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //          }, CommandType.Text);
                    //                                      int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);
                    //                                      string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER) }, CommandType.Text).ToString();

                    //                                      Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", scoreGuid) }, CommandType.Text);

                    //                                  }
                    //                              }
                    //                          }
                    //                      }
                    //                      else
                    //                      {
                    //                          int Score = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where NUMBER=@sc and OBJECT_ID=@o AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER), new SqlParameter("@o", ObjId) }, CommandType.Text);
                    //                          if (Score == 0)
                    //                          {
                    //                              Mydb.ExecuteNoNQuery("insert into PER_SCORE (SCORE_ID,NUMBER,ROOM_ID,LIVE_SQUARE,GEN_SQUARE,ROOM_QUANT,WITHOUT_SUMMER_SQUARE,OWNERSHIP_TYPE_ID,PASS,OBJECT_ID)values(@SCORE_ID,@NUMBER,@ROOM_ID,@LIVE_SQUARE,@GEN_SQUARE,@ROOM_QUANT,@WITHOUT_SUMMER_SQUARE,@OWNERSHIP_TYPE_ID,@PASS,@OBJECT_ID)", new SqlParameter[] {
                    //          new SqlParameter("@SCORE_ID",item.NUMBER),
                    //          new SqlParameter("@NUMBER",item.NUMBER),

                    //          new SqlParameter("@ROOM_ID",LastRoomId),
                    //          new SqlParameter("@LIVE_SQUARE",(item.LIVE_SQUARE==" ")?"0":item.LIVE_SQUARE),
                    //          new SqlParameter("@GEN_SQUARE",(item.GEN_SQUARE==" ")?"0":item.GEN_SQUARE),
                    //          new SqlParameter("@ROOM_QUANT","0"),//Convert.ToInt32((item.ROOM_QUANT==" ")?"0":item.ROOM_QUANT)),
                    //          new SqlParameter("@WITHOUT_SUMMER_SQUARE",(widht_[0]==" ")?"0":widht_[0]),
                    //          new SqlParameter("@OWNERSHIP_TYPE_ID",item.OWNERSHIP_TYPE_ID),
                    //          new SqlParameter("@PASS",widht_[5]),
                    //          new SqlParameter("@OBJECT_ID",ObjId)

                    //      }, CommandType.Text);
                    //                          }
                    //                          if (item.A_D != null)
                    //                          {
                    //                              foreach (AccountDatas item2 in item.A_D)
                    //                              {
                    //                                  string EmOk = "0";
                    //                                  if (item2.EMAIL.Length != 0 && item2.EMAIL.IndexOf('@') > -1 && item2.EMAIL.IndexOf('.') > -1 && dolya[5].Length != 0)
                    //                                  {
                    //                                      EmOk = SendMail(item.NUMBER, dolya[5], item2.EMAIL, "0");
                    //                                  }
                    //                                  string PhoneOk = "0";
                    //                                  if (item2.PHONE.Length >= 10 && dolya[5].Length != 0)
                    //                                  {
                    //                                      PhoneOk = AddApartment.SendSms(item2.PHONE, item.NUMBER, dolya[5]);//"1"; //SendSms(item2.PHONE, ObjId, item.NUMBER,dolya[5]);
                    //                                  }
                    //                                  Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE,SMS_OK,EMAIL_OK) values(@FIRST_NAME,@EMAIL,@PHONE,@PhoneOk,@EmOk)", new SqlParameter[] {
                    //              new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //              new SqlParameter("@EMAIL",item2.EMAIL),
                    //              new SqlParameter("@PHONE",item2.PHONE),new SqlParameter("@PhoneOk",PhoneOk),new SqlParameter("@EmOk",EmOk)
                    //          }, CommandType.Text);
                    //                                  //                Mydb.ExecuteNoNQuery("insert into IND_NAME (FIRST_NAME,EMAIL,PHONE) values(@FIRST_NAME,@EMAIL,@PHONE)", new SqlParameter[] {
                    //                                  //    new SqlParameter("@FIRST_NAME",item2.FIRST_NAME),
                    //                                  //    new SqlParameter("@EMAIL",item2.EMAIL),
                    //                                  //    new SqlParameter("@PHONE",item2.PHONE)
                    //                                  //}, CommandType.Text);
                    //                                  int LasInd_Id = (int)Mydb.ExecuteScalar("select top 1 INDIVIDUAL_ID from IND_NAME order by INDIVIDUAL_ID desc", new SqlParameter[] { }, CommandType.Text);

                    //                                  string scoreGuid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", item.NUMBER) }, CommandType.Text).ToString();

                    //                                  Mydb.ExecuteNoNQuery("insert into INDIVIDUAL_PERSCORE (SCORE_ID    ,INDIVIDUAL_ID,OWNERSHIP_TYPE_ID, SHARE,OBJECT_ID,ID)values(@SCORE_ID, @INDIVIDUAL_ID, @OWNERSHIP_TYPE_ID, @SHARE,@OBJECT_ID,@scoreGuid) ", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.NUMBER), new SqlParameter("@INDIVIDUAL_ID", LasInd_Id), new SqlParameter("@OWNERSHIP_TYPE_ID", item.OWNERSHIP_TYPE_ID), new SqlParameter("@SHARE", item2.SHARE), new SqlParameter("@OBJECT_ID", ObjId), new SqlParameter("@scoreGuid", scoreGuid) }, CommandType.Text);

                    //                              }
                    //                          }
                    //                      }
                    //                  }
                    //              }
                    //              else
                    //              {
                    //                  AccountDatas_Base ad_bnot = new AccountDatas_Base();
                    //                  ad_bnot.NUMBER = item.NUMBER+ "уже присутствует у данного объекта.";
                    //                  ad_bnot.ROOM_QUANT = item.ROOM_QUANT;
                    //                  adb_s_not.Add(ad_bnot);
                    //                  success = false;
                    //                  JavaScriptSerializer js = new JavaScriptSerializer();
                    //               //   result = "{\"result\" : \"HalfOk\",\"Numbers\":" + js.Serialize(adb_s_not) + ",\"ErrMesage\":\"уже присутствует у данного объекта.\"}";
                    //              }

                    //          } 
                    #endregion
                }

                if (success == true)
                {
                    result = "{\"result\" : \"OK\"}";
                }
            }
            catch (Exception ex)
            {

                JavaScriptSerializer js = new JavaScriptSerializer();
                result = "{\"result\" : \"HalfOk_\",\"Numbers\":\"0\",\"ErrMesage\":\"" + ex.Message + "\"}";
            }
            return result;


        }
        [WebMethod]
        public static string SaveAccFromExcel(int ObjId, string file)
        {
            string result = "";
            string adres = @"C:\inetpub\wwwroot\Files\" + file + "";
            adres = adres.Replace("~", "\\");
            string extention = file.Substring(file.IndexOf('.') + 1);
            bool success = true;//C:\inetpub\wwwroot\Files\" + file + "
            #region AllExcelReadingCodes
            string connStr = "";
            if (extention == "xlsx")
            {
                connStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + adres + ";Extended Properties='Excel 12.0;IMEX=1'";

            }
            if (extention == "xls")
            {
                connStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + adres + ";Extended Properties='Excel 8.0;IMEX=1'";
            }

            //string connStr = @"SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0','Excel 12.0;Database=C:\inetpub\wwwroot\" + file + ";HDR=yes','Select * from [Лист1$]')";
            OleDbConnection conn = new OleDbConnection(connStr);
            OleDbCommand cmd = new OleDbCommand();
            cmd.Connection = conn;
            OleDbDataAdapter da = new OleDbDataAdapter(cmd);
            DataTable dt = new DataTable();
            conn.Open();
            DataTable dtSheet = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            // 
            foreach (System.Data.DataRow sheet in dtSheet.Rows)
            {
                string sheetName = sheet["table_name"].ToString();
                cmd.CommandText = "select * from [" + sheetName + "]";
                da.SelectCommand = cmd;
                dt.Locale = CultureInfo.CurrentCulture;
                da.Fill(dt);
            }
            #endregion


            List<ScoreFromExcel> sfxs = new List<ScoreFromExcel>();
            // string header0 = dt.Columns[0].ColumnName;
            //string header1 = dt.Columns[1].ColumnName;
            try
            {

                string header0 = (dt.Columns[0].ColumnName is string) ? dt.Columns[0].ColumnName : "";
                string header1 = (dt.Columns[1].ColumnName is string) ? dt.Columns[1].ColumnName : "";
                string header2 = (dt.Columns[2].ColumnName is string) ? dt.Columns[2].ColumnName : "";
                string header3 = (dt.Columns[3].ColumnName is string) ? dt.Columns[3].ColumnName : "";
                string header4 = (dt.Columns[4].ColumnName is string) ? dt.Columns[4].ColumnName : "";
                string header5 = (dt.Columns[5].ColumnName is string) ? dt.Columns[5].ColumnName : "";
                string header6 = (dt.Columns[9].ColumnName is string) ? dt.Columns[6].ColumnName : "";
                string header7 = (dt.Columns[10].ColumnName is string) ? dt.Columns[7].ColumnName : "";
                string header8 = (dt.Columns[11].ColumnName is string) ? dt.Columns[8].ColumnName : "";
                string header9 = (dt.Columns[8].ColumnName is string) ? dt.Columns[9].ColumnName : "";
                string header10 = (dt.Columns[8].ColumnName is string) ? dt.Columns[10].ColumnName : "";
                string header11 = (dt.Columns[8].ColumnName is string) ? dt.Columns[11].ColumnName : "";
                string header12 = (dt.Columns[8].ColumnName is string) ? dt.Columns[12].ColumnName : "";
                #region CheckHeaders
                if (header0 != "№ ЛС*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок первой колонки " + header0 + ". Должно быть \"№ ЛС\"\"}";
                    goto end;
                }
                if (header1 != "№ помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header1 + ". Должно быть \"№ помещения*\"\"}";
                    goto end;
                }
                if (header2 != "Назначение помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок третий колонки " + header2 + ". Должно быть \"Назначение помещения*\"\"}";
                    goto end;
                }
                if (header3 != "Тип помещения*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок четвертый колонки " + header3 + ". Должно быть \"Тип помещения*\"\"}";
                    goto end;
                }
                if (header4 != "Тип собственности")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок пятый колонки " + header4 + ". Должно быть \"Тип собственности\"\"}";
                    goto end;
                }
                if (header5 != "ФИО собственника")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок шестой колонки " + header5 + ". Должно быть \"ФИО собственника\"\"}";
                    goto end;
                }
                if (header6 != "Доля собственности")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок седьмой колонки " + header6 + ". Должно быть \"Доля собственности\"\"}";
                    goto end;
                }
                if (header7 != "Номер телефона")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок восьмой колонки " + header7 + ". Должно быть \"Номер телефона\"\"}";
                    goto end;
                }
                if (header8 != "E-mail")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок девятый колонки " + header8 + ". Должно быть \"E-mail\"\"}";
                    goto end;
                }
                if (header9 != "Общая площадь")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок девятый колонки " + header9 + ". Должно быть \"Общая площадь\"\"}";
                    goto end;
                }
                if (header10 != "Жилая площадь")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header10 + ". Должно быть \"Жилая площадь\"\"}";
                    goto end;
                }

                if (header11 != "Общая площадь без летних зон")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header11 + ". Должно быть \"Общая площадь без летних зон\"\"}";
                    goto end;
                }
                if (header12 != "Пароль")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок десятый колонки " + header11 + ". Должно быть \"Пароль\"\"}";
                    goto end;
                }
                end:;
                #endregion
            }
            catch (Exception)
            {
                result = "{\"result\" : \"No\"}";
                success = false;

            }

            if (success == true)
            {
                foreach (DataRow item in dt.Rows)
                {
                    ScoreFromExcel sfx = new ScoreFromExcel();

                    if (item[0].ToString().Length == 0)
                    {
                        break;
                    }
                    sfx.NUMBER = (item[0].ToString().Length == 0) ? " " : item[0].ToString();
                    sfx.ROOM_NUMBER = (item[1].ToString().Length == 0) ? " " : item[1].ToString();
                    sfx.ROOM_FOR = (item[2].ToString().Length == 0) ? " " : item[2].ToString();
                    sfx.ROOM_TYPE = (item[3].ToString().Length == 0) ? " " : item[3].ToString();
                    sfx.SHARE = (item[4].ToString().Length == 0) ? " " : item[4].ToString();
                    sfx.FIRST_NAME = (item[5].ToString().Length == 0) ? " " : item[5].ToString();
                    sfx.PHONE = (item[6].ToString().Length == 0) ? " " : item[6].ToString();
                    sfx.EMAIL = (item[7].ToString().Length == 0) ? " " : item[7].ToString();
                    sfx.OWNERSHIP_TYPE_ID = (item[8].ToString().Length == 0) ? " " : item[8].ToString();
                    sfx.GEN_SQUARE = (item[9].ToString().Length == 0) ? " " : item[9].ToString();
                    sfx.LIVE_SQUARE = (item[10].ToString().Length == 0) ? " " : item[10].ToString();
                    sfx.WITHOUT_SUMMER_SQUARE = (item[11].ToString().Length == 0) ? " " : item[11].ToString();


                    sfxs.Add(sfx);

                }
            }

            conn.Close();
            JavaScriptSerializer js = new JavaScriptSerializer();
            if (success == true)
            {
                // result = js.Serialize(sfxs);
                result = "{\"result\" : \"Ok\",\"Numbers\":" + js.Serialize(sfxs) + "}";
            }

            return result;


        }
        [WebMethod]
        public static string makeFiltering(int lg, List<RoomFilter> flt, int OBJECT_ID)
        {
            List<Rooms> rms = new List<Rooms>();
            foreach (var item in flt)// flt listesi icerisinde donuyoruz
            {
                foreach (var itemRMfor in item.RM_FOR)
                {
                    foreach (var itemRMtype in item.RM_TYPE)
                    {
                        foreach (var itemRMnum in item.RM_NUMBER)
                        {
                            DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_Filtering_Rooms", new SqlParameter[] {
                                   new SqlParameter("@LOG_IN_ID",lg),
                                   new SqlParameter("@ROOM_FOR_ID",itemRMfor.ROOM_FOR),
                                   new SqlParameter("@ROOM_TYPE_ID",itemRMtype.ROOM_TYPE),
                                   new SqlParameter("@FIRST_NAME",item.FIRST_NAME),
                                   new SqlParameter("@NUMBER",item.NUMBER),
                                   new SqlParameter("@ROOM_NUMBER",itemRMnum.ROOM_NUMBER),
                                   new SqlParameter("@OBJECT_ID",(OBJECT_ID.ToString()=="0")?null:OBJECT_ID.ToString())
                               }, CommandType.StoredProcedure);

                            foreach (DataRow itemdt in dt.Rows)
                            {
                                Rooms rm = new Rooms();
                                rm.ENTRANCE = itemdt["ENTRANCE"].ToString();
                                rm.FIRST_NAME = itemdt["FIRST_NAME"].ToString();
                                rm.FLOOR = itemdt["FLOOR"].ToString();
                                rm.NUMBER = itemdt["NUMBER"].ToString();
                                rm.ROOM_FOR = itemdt["ROOM_FOR"].ToString();
                                rm.ROOM_ID = Convert.ToInt32(itemdt["ROOM_ID"]);
                                rm.ROOM_NUMBER = itemdt["ROOM_NUMBER"].ToString();
                                rm.ROOM_TYPE = itemdt["ROOM_TYPE"].ToString();
                                rm.CHAMB_AMOUNT = itemdt["OBJECT_ADRESS"].ToString();
                                rms.Add(rm);
                            }

                        }
                    }
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);
            #region OldFIltering
            //   string ROOM_FOR_ID = null;
            //string ROOM_NUMBER = null;
            //int ROOM_TYPE_ID = 0;
            //string FIRST_NAME = null;
            //string NUMBER = null;
            //   string LOGIN = Mydb.ExecuteScalar("select LOGIN from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg)}, CommandType.Text).ToString();
            //   if (LOGIN!="")
            //   {
            //       foreach (RoomFilter item in flt)
            //       {
            //           ROOM_FOR_ID = item.ROOM_FOR_ID;
            //           ROOM_NUMBER = item.ROOM_NUMBER;
            //           ROOM_TYPE_ID = item.ROOM_TYPE_ID;
            //           FIRST_NAME = item.FIRST_NAME;
            //           NUMBER = item.NUMBER;
            //       }
            //       DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_Filtering_Rooms", new SqlParameter[] {
            //       new SqlParameter("@LOG_IN_ID",lg),
            //       new SqlParameter("@ROOM_FOR_ID",ROOM_FOR_ID),
            //       new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //       new SqlParameter("@FIRST_NAME",FIRST_NAME),
            //       new SqlParameter("@NUMBER",NUMBER),
            //       new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER)
            //   }, CommandType.StoredProcedure);
            //       List<Rooms> rms = new List<Rooms>();
            //       foreach (DataRow item in dt.Rows)
            //       {
            //           Rooms rm = new Rooms();
            //           rm.ENTRANCE = item["ENTRANCE"].ToString();
            //           rm.FIRST_NAME = item["FIRST_NAME"].ToString();
            //           rm.FLOOR = item["FLOOR"].ToString();
            //           rm.NUMBER = item["NUMBER"].ToString();
            //           rm.ROOM_FOR = item["ROOM_FOR"].ToString();
            //           rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
            //           rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //           rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
            //           rms.Add(rm);
            //       }
            //       JavaScriptSerializer js = new JavaScriptSerializer();
            //       return js.Serialize(rms); 
            //   }
            //   else
            //   {
            //       foreach (RoomFilter item in flt)
            //       {
            //           ROOM_FOR_ID = item.ROOM_FOR_ID;
            //           ROOM_NUMBER = item.ROOM_NUMBER;
            //           ROOM_TYPE_ID = item.ROOM_TYPE_ID;
            //           FIRST_NAME = item.FIRST_NAME;
            //           NUMBER = item.NUMBER;
            //       }
            //       int ct = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.Text);
            //       DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_Filtering_Rooms_ByClient", new SqlParameter[] {
            //       new SqlParameter("@CLIENT_ID",ct),
            //       new SqlParameter("@ROOM_FOR_ID",ROOM_FOR_ID),
            //       new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //       new SqlParameter("@FIRST_NAME",FIRST_NAME),
            //       new SqlParameter("@NUMBER",NUMBER),
            //       new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER)
            //   }, CommandType.StoredProcedure);
            //       List<Rooms> rms = new List<Rooms>();
            //       foreach (DataRow item in dt.Rows)
            //       {
            //           Rooms rm = new Rooms();
            //           rm.ENTRANCE = item["ENTRANCE"].ToString();
            //           rm.FIRST_NAME = item["FIRST_NAME"].ToString();
            //           rm.FLOOR = item["FLOOR"].ToString();
            //           rm.NUMBER = item["NUMBER"].ToString();
            //           rm.ROOM_FOR = item["ROOM_FOR"].ToString();
            //           rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
            //           rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //           rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
            //           rms.Add(rm);
            //       }
            //       JavaScriptSerializer js = new JavaScriptSerializer();
            //       return js.Serialize(rms);
            //   } 
            #endregion

        }
        [WebMethod]
        public static string getRoomNumbersById(int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select distinct ROOM_NUMBER from VW_ROOMS where LOG_IN_ID = @lg AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rms.Add(rm);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);
        }
        [WebMethod]
        public static string GetRoomByO_Id(int lg, int o)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_ROOMS where OBJECT_ID=@o and LOG_IN_ID=@L AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@o", o), new SqlParameter("@L", lg) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            // int i= 0;
            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.ENTRANCE = item["ENTRANCE"].ToString();
                rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                rm.FLOOR = item["FLOOR"].ToString();
                rm.NUMBER = item["NUMBER"].ToString();
                rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                rm.CHAMB_AMOUNT = item["OBJECT_ADRESS"].ToString();
                //if (i==0)
                //{
                //    rm.GEN_SQUARE = Mydb.ExecuteReadertoDataTableAsJson("Get_RoomGuidFor_QRby_LoginId", new SqlParameter[] { new SqlParameter("@lg",lg),new SqlParameter("@obj",o) }, CommandType.StoredProcedure);
                //    i++;
                //}
                rms.Add(rm);
            }
            //var tdText = "";
            //for (int i = 0; i < rms.Count; i++)
            //{
            //    var firstLC = rms[i].NUMBER;
            //    var firstSobs = rms[i].FIRST_NAME;
            //    var j = i + 1;
            //    var secondLC = rms[j].NUMBER;
            //    var secondSobs = rms[j].FIRST_NAME;
            //    if (firstLC == secondLC)
            //    {
            //        tdText = tdText + ", " + firstSobs + ", " + secondSobs;
            //        rms[i].FIRST_NAME = tdText;
            //        rms.RemoveAt(j);
            //    }
            //    else
            //    {
            //        tdText = "";
            //    }

            //    }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);

        }
        [WebMethod]
        public static string GetRoomByO_Id2(int lg, int o)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_ROOMS where [OBJECT_ID]=@o and LOG_IN_ID=@L AND IS_DELETED_R=0 AND IS_DELETED_PS=0", new SqlParameter[] { new SqlParameter("@o", o), new SqlParameter("@L", lg) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.ENTRANCE = item["ENTRANCE"].ToString();
                rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                rm.FLOOR = item["FLOOR"].ToString();
                rm.NUMBER = item["NUMBER"].ToString();
                string PassScore = Mydb.ExecuteScalar("select ISNULL(PASS,'0') from PER_SCORE where SCORE_ID=@sc and  IS_DELETED='0'", new SqlParameter[] { new SqlParameter("@sc", rm.NUMBER) }, CommandType.Text).ToString();
                PassScore = PassScore.Trim();
                if (PassScore != "0")
                {
                    rm.NUMBER = rm.NUMBER + "~";
                }
                if (PassScore == "")
                {
                    rm.NUMBER = rm.NUMBER.Replace("~", string.Empty);
                }
                rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                rms.Add(rm);
            }
            //var tdText = "";
            //for (int i = 0; i < rms.Count; i++)
            //{
            //    var firstLC = rms[i].NUMBER;
            //    var firstSobs = rms[i].FIRST_NAME;
            //    var j = i + 1;
            //    var secondLC = rms[j].NUMBER;
            //    var secondSobs = rms[j].FIRST_NAME;
            //    if (firstLC == secondLC)
            //    {
            //        tdText = tdText + ", " + firstSobs + ", " + secondSobs;
            //        rms[i].FIRST_NAME = tdText;
            //        rms.RemoveAt(j);
            //    }
            //    else
            //    {
            //        tdText = "";
            //    }

            //    }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rms);

        }
        [WebMethod]
        public static string GetRoomsBySorting(int Log, string by, string asc)
        {
            string Login = Mydb.ExecuteScalar("select LOGIN from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text).ToString();
            if (Login != "")
            {//select * from VW_ROOMS where LOG_IN_ID=@lg and IS_DELETED=0 order by " + by + " " + asc + ""
                string query = "SELECT * FROM VW_ROOMS where LOG_IN_ID=@lg AND IS_DELETED_R=0 AND IS_DELETED_PS=0 ORDER BY CASE WHEN 1 = IsNumeric(" + by + ") THEN Cast(" + by + " AS INT) END " + asc + "";
                if (by == "ROOM_FOR" || by == "ROOM_TYPE")
                {
                    query = "select * from VW_ROOMS where LOG_IN_ID=@lg AND IS_DELETED_R=0 AND IS_DELETED_PS=0 order by " + by + " " + asc + "";
                }
                DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text);
                List<Rooms> rms = new List<Rooms>();
                foreach (DataRow item in dt.Rows)
                {
                    Rooms rm = new Rooms();
                    rm.ENTRANCE = item["ENTRANCE"].ToString();
                    rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rm.FLOOR = item["FLOOR"].ToString();
                    rm.NUMBER = item["NUMBER"].ToString();
                    rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                    rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                    rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                    rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                    rms.Add(rm);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(rms);
            }
            else
            {
                int ct = (int)Mydb.ExecuteScalar("select CLIENT_ID from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", Log) }, CommandType.Text);
                string query = "select * from VW_ROOMS where CLIENT_ID=@ct AND IS_DELETED_R=0 AND IS_DELETED_PS=0 order by " + by + " " + asc + "";
                DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { new SqlParameter("@ct", ct) }, CommandType.Text);
                List<Rooms> rms = new List<Rooms>();
                foreach (DataRow item in dt.Rows)
                {
                    Rooms rm = new Rooms();
                    rm.ENTRANCE = item["ENTRANCE"].ToString();
                    rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                    rm.FLOOR = item["FLOOR"].ToString();
                    rm.NUMBER = item["NUMBER"].ToString();
                    rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                    rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                    rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                    rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                    rms.Add(rm);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(rms);
            }
        }
        [WebMethod]
        public static string GetRooms(int LogId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select  * from VW_ROOMS where LOG_IN_ID=@lg and IS_DELETED_R=0 and IS_DELETED_PS=0 order by ROOM_ID desc", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.Text);
            List<Rooms> rms = new List<Rooms>();
            //  int i = 0;

            foreach (DataRow item in dt.Rows)
            {
                Rooms rm = new Rooms();
                rm.ENTRANCE = item["ENTRANCE"].ToString();
                rm.FIRST_NAME = item["FIRST_NAME"].ToString();
                rm.FLOOR = item["FLOOR"].ToString();
                rm.NUMBER = item["NUMBER"].ToString();
                rm.ROOM_FOR = item["ROOM_FOR"].ToString();
                rm.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                rm.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rm.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                rm.OBJECT_ID = Convert.ToInt32(item["OBJECT_ID"]);
                rm.CHAMB_AMOUNT = item["OBJECT_ADRESS"].ToString();
                rm.LIVE_SQUARE = item["ID"].ToString();
                //if (i==0)
                //{

                //    rm.GEN_SQUARE = Mydb.ExecuteReadertoDataTableAsJson("Get_RoomGuidFor_QRby_LoginId", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.StoredProcedure);
                //    i++;
                //}
                rms.Add(rm);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = int.MaxValue;
            return js.Serialize(rms);

        }
        public static string SendMail(string score_, string pass_, string Email_, string srok_, string G = null)
        {
            string succEm = "0";
            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = pass_;
            string srok = (srok_ == "0") ? "у пароля неограниченный срок действия" : srok_;



            #region oldBodyMail

            //string body = @"<h4 style=""font-weight:100;""><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4><h4 style=""font - weight: 100; "">Здравствуйте! Для Вашего дома по адресу  <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">IOS</a> ) и личный кабинет на странице дома .</h4><h4 style=""font-weight: 100;"">Ваш логин: <b>""{1}""</b></h4><h4 style=""font-weight: 100;"">Ваш пароль:<b>""{2}""</b></h4><h4 style=""font-weight: 100;"">Срок действия пароля в днях:<b>""{3}""</b></h4><h4 style=""font-weight: 100;"">Вы можете поменять пароль в <a href=""#"">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4><h4 style=""font-weight: 100;"">В личном кабинете и мобильном приложении Вы сможете:</h4><img src=""https://upravbot.ru/img/prebor.jpg""><h4 style=""width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;"">Подать показания приборов учета</h4><br><img src =""https://upravbot.ru/img/money.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -4vw;""> Оплатить счет за жилищно - коммунальные услуги онлайн</h4><br><img src = ""https://upravbot.ru/img/doci.png"" style = ""margin-left: 36px; margin-top: 16px;"" ><h4 style = ""font-weight: 700; margin-left: 10vw; margin-top: -3vw;"" > Оформить заявку </h4><br><h4 style = ""font-weight:100"" > При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href = ""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></h4><br><h4 style = ""font-weight:100;font-style:  italic;"" > C уважением,Ваш «УПРАВБОТ».</h4> ";
            //string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><h2>Добро пожаловать!</h2><p>Для Вашего лицевого счета создана учетная запись в&nbsp;системе «Автопилот».</p><p>Здравствуйте! Для Вашего дома по адресу <a href=""#"">""{0}""</a> функционируют мобильное приложение (<a href=""#"">Android</a>, <a href=""#"">iOS</a> ) и&nbsp;личный кабинет на странице дома.</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Вы можете поменять пароль в&nbsp;<a href=""#"">настройках профиля</a> в&nbsp;личном кабинете или в&nbsp;мобильном приложении.</p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «Автопилот», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «Автопилот».</p></div></div>";
            //body = String.Format(body, protocol, score_, pass);

            #endregion
            string text_ = "Для Вашего лицевого счета создана учетная запись";
            if (G != null)
            {
                text_ = G;
            }
            string body = @" <div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>{3} в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{0}""</b></p><p>Ваш пароль:<b>""{1}""</b></p><p>Скачать приложение Вы можете: <a href=""{2}"">https://upravbot.ru/getmobile.aspx</a></p><p>В личном кабинете и мобильном приложении Вы сможете:</p><ul style=""list-style:none;""><li style=""display: block; margin-bottom:16px;""><img src=""https://upravbot.ru/img/prebor.jpg"" align=""left"" style=""text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;"" alt=""> Подать показания приборов учета.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/money.png"" align=""left"" style=""text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;"" alt=""""> Оплатить счет за жилищно - коммунальные услуги онлайн.</li><li style=""display: block;  margin-bottom:16px;""><img src=""https://upravbot.ru/img/doci.png"" align=""left"" style=""text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;"" alt=""> Оформить заявку.</li></ul><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";
            string mobile = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
            body = String.Format(body, score_, pass, mobile, text_);
            try
            {
                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                succEm = "1";
            }
            catch (Exception)
            {

                succEm = "0";
            }
            return succEm;
        }
        public static string SendSms(string Phone_, int ObjectId_, string score_, string Pass)
        {
            string succSms = "0";
            string nm = Phone_;
            nm = "7" + nm;
            //nm = nm.Replace('(', ' ').Replace(')', ' ').Replace('-', ' ');
            //nm = nm.Replace(" ", string.Empty);
            string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjectId_) }, CommandType.Text).ToString();
            protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/MainPage.aspx";
            //string text = "Uvazhaemyj zhitel'! Vam vystavlen schet za ZHKU. Dlya oplaty ispol'zujte mobil'prilozhenie: " + protocol + ". Vash MATORIN";
            string protocolForApps = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/AutoPilot.aspx";
            string text = "Dlya Vas sozdana uchetnaya zapis. Login: " + score_ + ". Parol: " + Pass + " . " + protocol + " . Prilozhenie: " + protocolForApps;
            string URL = "https://my5.t-sms.ru/sendsms.php?user=MATORIN&pwd=MAT0R1N&sadr=MATORIN&dadr=" + nm + "&text=" + text + "";
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
                request.Proxy = HttpWebRequest.DefaultWebProxy;
                request.Proxy.Credentials = CredentialCache.DefaultNetworkCredentials;
                request.PreAuthenticate = true;
                request.ContentType = "application/json";
                WebResponse webResponse = request.GetResponse();
                Stream webStream = webResponse.GetResponseStream();
                StreamReader responseReader = new StreamReader(webStream);
                string rspns = responseReader.ReadToEnd();

                Mydb.ExecuteNoNQuery("INSERT INTO SMS_GATE(SMS_TEXT,SMS_RESPONSE,SCORE_ID,SEND_NUMBER,SMS_DATE) VALUES(@SMS_TEXT,@SMS_RESPONSE,@SCORE_ID,@SEND_NUMBER,GETDATE())", new SqlParameter[] { new SqlParameter("@SMS_TEXT", text), new SqlParameter("@SMS_RESPONSE", rspns), new SqlParameter("@SCORE_ID", score_), new SqlParameter("@SEND_NUMBER", nm) }, CommandType.Text);
                succSms = "1";
            }
            catch (Exception)
            {

                succSms = "0";
            }
            return succSms;
        }
        [WebMethod]
        public static string GetProductsByGroup(int d, int obj)
        {

            DataTable dt = Mydb.ExecuteReadertoDataTable("select SERVICE_ID,SERVICE_NAME from PRODUCT_SERVICE where DIRECTION_ID=@d and SERVICE_ID not in (select PRODUCT_SERVICE_ID from PROJECT_PRODUCT_SERVICE where PROJECT_ID = (select PROJECT_ID from OBJECT where OBJECT_ID = @o))", new SqlParameter[] { new SqlParameter("@d", d), new SqlParameter("@o", obj) }, CommandType.Text);
            List<Rooms> pss = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms ps = new Rooms();
                ps.ROOM_ID = (int)item["SERVICE_ID"];
                ps.FIRST_NAME = item["SERVICE_NAME"].ToString();
                pss.Add(ps);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);
        }
        [WebMethod]
        public static string GetEdizm()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from UNIT_OF_MEASURE", new SqlParameter[] { }, CommandType.Text);
            List<ROOM_FOR> edzs = new List<ROOM_FOR>();

            foreach (DataRow item in dt.Rows)
            {
                ROOM_FOR edz = new ROOM_FOR();
                edz.ROOM_FOR_ = item["UNIT_OF_MEASURE_NAME"].ToString();
                edz.ROOM_FOR_ID = (int)item["UNIT_OF_MEASURE_ID"];
                edzs.Add(edz);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(edzs);
        }
        [WebMethod]
        public static string AddEdizm(string edizm)
        {
            string result = "";
            int CountEdizm = (int)Mydb.ExecuteScalar("select COUNT(*) from UNIT_OF_MEASURE where UNIT_OF_MEASURE_NAME like '%'+@stext+'%'", new SqlParameter[] { new SqlParameter("@stext", edizm) }, CommandType.Text);
            if (CountEdizm == 0)
            {
                int UnitId = (int)Mydb.ExecuteScalar("INSERT INTO UNIT_OF_MEASURE OUTPUT INSERTED.UNIT_OF_MEASURE_ID VALUES(@unit)", new SqlParameter[] { new SqlParameter("@unit", edizm) }, CommandType.Text);
                result = "{\"result\":\"in\",\"UnitId\" : \"" + UnitId + "\"}";
            }
            else
            {

                int Unit_ = (int)Mydb.ExecuteScalar("select UNIT_OF_MEASURE_ID from UNIT_OF_MEASURE where UNIT_OF_MEASURE_NAME like '%'+@stext+'%'", new SqlParameter[] { new SqlParameter("@stext", edizm) }, CommandType.Text);
                result = "{\"result\":\"ok\",\"UnitId\" : \"" + Unit_ + "\"}";
            }
            return result;
        }
        [WebMethod]
        public static string AddProductService(string NameService, int edizm, string isQuantity, int dd)
        {
            int productId = (int)Mydb.ExecuteScalar("insert into PRODUCT_SERVICE (SERVICE_NAME,UNIT_OF_MEASURE_ID,QUANTITY_IS,DIRECTION_ID) OUTPUT INSERTED.SERVICE_ID values(@NameService,@edizm,@isQuantity,@dd)", new SqlParameter[] { new SqlParameter("@NameService", NameService), new SqlParameter("@edizm", edizm), new SqlParameter("@isQuantity", isQuantity), new SqlParameter("@dd", dd) }, CommandType.Text);

            return "{\"result\":\"ok\",\"productId\" : \"" + productId + "\"}"; ;
        }
        [WebMethod]
        public static string AddProductServiceToProject(int objId, List<PROJECT_PRODUCT_SERVICE> prss)
        {
            int projectId = (int)Mydb.ExecuteScalar("select PROJECT_ID from OBJECT where OBJECT_ID = @obj", new SqlParameter[] { new SqlParameter("@obj", objId) }, CommandType.Text);
            foreach (PROJECT_PRODUCT_SERVICE item in prss)
            {
                //Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST) values (@PRODUCT_SERVICE_ID,@PROJECT_ID,@COST)", new SqlParameter[] { new SqlParameter("@PRODUCT_SERVICE_ID", item.PRODUCT_SERVICE_ID),new SqlParameter("@PROJECT_ID",projectId), new SqlParameter("@COST", item.COST) }, CommandType.Text);
                int countService = (int)Mydb.ExecuteScalar("select COUNT(*) from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@ps and PROJECT_ID=@pr", new SqlParameter[] { new SqlParameter("@ps", item.PRODUCT_SERVICE_ID), new SqlParameter("@pr", projectId) }, CommandType.Text);
                if (countService == 0)
                {
                    Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST) values (@PRODUCT_SERVICE_ID,@PROJECT_ID,@COST)", new SqlParameter[] { new SqlParameter("@PRODUCT_SERVICE_ID", item.PRODUCT_SERVICE_ID), new SqlParameter("@PROJECT_ID", projectId), new SqlParameter("@COST", item.COST) }, CommandType.Text);
                }
                else
                {
                    string COST = Mydb.ExecuteScalar("select COST from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@ps and PROJECT_ID=@pr", new SqlParameter[] { new SqlParameter("@ps", item.PRODUCT_SERVICE_ID), new SqlParameter("@pr", projectId), new SqlParameter("@COST", item.COST) }, CommandType.Text).ToString();
                    if (COST != item.COST)
                    {
                        Mydb.ExecuteNoNQuery("insert into PROJECT_PRODUCT_SERVICE (PRODUCT_SERVICE_ID,PROJECT_ID,COST) values (@PRODUCT_SERVICE_ID,@PROJECT_ID,@COST)", new SqlParameter[] { new SqlParameter("@PRODUCT_SERVICE_ID", item.PRODUCT_SERVICE_ID), new SqlParameter("@PROJECT_ID", projectId), new SqlParameter("@COST", item.COST) }, CommandType.Text);
                    }
                }
            }
            return "";
        }
        [WebMethod]
        public static string GetHasDirectService(int Obj)
        {//select * from SERVICE_DIRECT where DIRECTION_ID in (select DIRECTION_ID from PRODUCT_SERVICE where SERVICE_ID in(select  PRODUCT_SERVICE_ID from PROJECT_PRODUCT_SERVICE where PROJECT_ID = (select PROJECT_ID from OBJECT where OBJECT_ID = @obj)))
            string json = Mydb.ExecuteReadertoDataTableAsJson(@"select ss.*,si.* from (select * from SERVICE_DIRECT where DIRECTION_ID in (select DIRECTION_ID from PRODUCT_SERVICE where SERVICE_ID
 in(select  PRODUCT_SERVICE_ID from PROJECT_PRODUCT_SERVICE where PROJECT_ID =
 (select PROJECT_ID from OBJECT where OBJECT_ID = @obj)))) 
 ss inner join SDIRECT_SICON sic on sic.S_DIRECT_ID = ss.DIRECTION_ID inner join SERVICE_DIRECT_ICONS si on si.ICON_ID = sic.ICON_ID", new SqlParameter[] { new SqlParameter("@obj", Obj) }, CommandType.Text);
            //List<IND_NAME> sds = new List<IND_NAME>();
            //foreach (DataRow item in dt.Rows)
            //{
            //    IND_NAME sd = new IND_NAME();
            //    sd.INDIVIDUAL_ID = item["DIRECTION_ID"].ToString();
            //    sd.LAST_NAME = item["DIRECTION_NAME"].ToString();
            //    sds.Add(sd);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            return json;

        }

        [WebMethod]
        public static string GetAlltDirectServices(int Obj)
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_DIRECT", new SqlParameter[] { }, CommandType.Text);
        }
        [WebMethod]
        public static string GetHasServices(int obj, int d)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PRODUCT_SERVICE where DIRECTION_ID=@d and SERVICE_ID in (select PRODUCT_SERVICE_ID from PROJECT_PRODUCT_SERVICE where PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@obj))", new SqlParameter[] { new SqlParameter("@d", d), new SqlParameter("@obj", obj) }, CommandType.Text);
            List<Rooms> pss = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms ps = new Rooms();
                ps.ROOM_ID = (int)item["SERVICE_ID"];
                ps.FIRST_NAME = item["SERVICE_NAME"].ToString();
                pss.Add(ps);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(pss);

        }

        [WebMethod]
        public static string GetHasCost(int obj, int sid)
        {
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@sid and PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@o)", new SqlParameter[] { new SqlParameter("@sid",sid),new SqlParameter("@o",obj) }, CommandType.Text);

            //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            //Dictionary<string, object> row;
            //foreach (DataRow dr in dt.Rows)
            //{
            //    row = new Dictionary<string, object>();
            //    foreach (DataColumn col in dt.Columns)
            //    {
            //        row.Add(col.ColumnName, dr[col]);
            //    }
            //    rows.Add(row);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(rows);
            return Mydb.ExecuteReadertoDataTableAsJson("select * from PROJECT_PRODUCT_SERVICE where PRODUCT_SERVICE_ID=@sid and PROJECT_ID=(select PROJECT_ID from OBJECT where OBJECT_ID=@o)", new SqlParameter[] { new SqlParameter("@sid", sid), new SqlParameter("@o", obj) }, CommandType.Text);

        }

        [WebMethod]
        public static string GetRelatedIcons(int d)
        {
            return Mydb.ExecuteReadertoDataTableAsJson(@"select * from SERVICE_DIRECT_ICONS where ICON_ID in 
 (select SERVICE_ICON_ID from DIRECT_ICONS where SERVICE_DIRECT_ID = @d)", new SqlParameter[] { new SqlParameter("@d", d) }, CommandType.Text);

        }
        [WebMethod]
        public static string getAllIcons()
        {
            return Mydb.ExecuteReadertoDataTableAsJson("select * from SERVICE_DIRECT_ICONS", new SqlParameter[] { }, CommandType.Text);
        }
        [WebMethod]
        public static string SaveDirect(string d, List<METERS> icns)
        {

            int DirectId = (int)Mydb.ExecuteScalar("insert into SERVICE_DIRECT (DIRECTION_NAME) output inserted.DIRECTION_ID values (@d)", new SqlParameter[] { new SqlParameter("@d", d) }, CommandType.Text);
            foreach (METERS item in icns)
            {
                //item. iconid
                Mydb.ExecuteNoNQuery("insert into DIRECT_ICONS (SERVICE_ICON_ID,SERVICE_DIRECT_ID) values(@icon,@d)", new SqlParameter[] { new SqlParameter("@icon", item.ROOM_NUMBER), new SqlParameter("@d", DirectId) }, CommandType.Text);
            }
            return "";

        }
    }
}