using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Kvorum_App.Manager.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class Counters : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string Get_Dead_Line(int objId)
        {

            return Mydb.ExecuteReadertoDataTableAsJson("Get_Dead_Line", new SqlParameter[] { new SqlParameter("@objId", objId) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string Cnahge_CNTR_DeadLine(int objId, int start, int stop, string on_end)
        {
            Mydb.ExecuteNoNQuery("Cnahge_CNTR_DeadLine", new SqlParameter[] { new SqlParameter("@objId", objId), new SqlParameter("@start", start), new SqlParameter("@stop", stop), new SqlParameter("@on_end", on_end) }, CommandType.StoredProcedure);
            return "";
        }
        [WebMethod]
        public static string GetMeterBySorting(int lg, string by, string asc)
        {
            string query = "select * from VW_METERS where LOG_IN_ID=@lg and ARXIV=0 and METERS_ID not in (select METER_ID from STOPED_METERS) order by " + by + " " + asc + "";
            DataTable dt = Mydb.ExecuteReadertoDataTable(query, new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);

                m.ROOM_NUMBER = item["ROOM_NUMBER2"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID2"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }

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
                        dataRow[actualCellIndex] = GetCellValue(spreadSheetDocument, cell);
                    }

                    dataTable.Rows.Add(dataRow);
                }

            }
            dataTable.Rows.RemoveAt(0);

            return dataTable;
        }


        [WebMethod]
        public static string GetCounters_For_Excel(int lg)
        {
            string result = "";
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetCounters_For_Excel", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
            //"{\"result\":\"Ok\",\"mtrsTrue\":" + j_true.Serialize(mtrsTrue) + ",\"mtrsFalse\":\"" + excel_name + "\",\"mtrsFalse_count\":\"" + mtrsFalse.Count + "\"}"
            result = "{\"result\":\"Ok\",\"MetersExcel\":\"" + GiveExcel_for_All_Counter(dt) + "\"}";//GiveExcel_for_All_Counter(dt);

            return result;
        }
        public static string GiveExcel_for_All_Counter(DataTable dt)
        {
            string result = "";
            if (dt.Rows.Count != 0)
            {
                string guid = Guid.NewGuid().ToString();
                string strFilePath = @"C:\inetpub\wwwroot\Files\Counters_Excel_" + guid + ".xlsx";
                using (var workbook = new XLWorkbook())
                {

                    #region ExcelHeader
                    var worksheet = workbook.Worksheets.Add("Sample Sheet");


                    worksheet.Column("A").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("A1").Value = "Лицевой счет";
                    worksheet.Cell("A1").Style.Font.Bold = true;


                    worksheet.Column("B").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("B1").Value = "Дата начала работы";
                    worksheet.Cell("B1").Style.Font.Bold = true;


                    worksheet.Column("C").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("C1").Value = "Номер прибора";
                    worksheet.Cell("C1").Style.Font.Bold = true;

                    worksheet.Column("D").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("D1").Value = "Тип прибора";
                    worksheet.Cell("D1").Style.Font.Bold = true;



                    worksheet.Column("E").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("E1").Value = "Наименование ПУ";
                    worksheet.Cell("E1").Style.Font.Bold = true;


                    worksheet.Column("F").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("F1").Value = "Показания";
                    worksheet.Cell("F1").Style.Font.Bold = true;


                    worksheet.Column("G").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("G1").Value = "Дата Окончания/ поверки";
                    worksheet.Cell("G1").Style.Font.Bold = true;


                    worksheet.Column("H").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("H1").Value = "Дата";
                    worksheet.Cell("H1").Style.Font.Bold = true;



                    worksheet.Column("I").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("I1").Value = "Квартирный";
                    worksheet.Cell("I1").Style.Font.Bold = true;


                    worksheet.Column("J").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("J1").Value = "Адрес";
                    worksheet.Cell("J1").Style.Font.Bold = true;


                    worksheet.Column("K").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("K1").Value = "Операция";
                    worksheet.Cell("K1").Style.Font.Bold = true;

                    worksheet.Column("L").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("L1").Value = "Заменяемый счетчик";
                    worksheet.Cell("L1").Style.Font.Bold = true;

                    worksheet.Column("M").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("M1").Value = "Показания заменяемого счетчика";
                    worksheet.Cell("M1").Style.Font.Bold = true;

                    worksheet.Column("N").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("N1").Value = "Улица";
                    worksheet.Cell("N1").Style.Font.Bold = true;

                    worksheet.Column("O").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("O1").Value = "Дом";
                    worksheet.Cell("O1").Style.Font.Bold = true;

                    worksheet.Column("P").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("P1").Value = "Квартира";
                    worksheet.Cell("P1").Style.Font.Bold = true;

                    #endregion
                    int cellNumber = 2;
                    foreach (DataRow item in dt.Rows)
                    {
                        var type = item["TYPE"].ToString();
                        if (item["TYPE"].ToString() != "Электроэнергия")
                        {
                            worksheet.Cell("A" + cellNumber.ToString() + "").Value = item["SCORE_ID"].ToString();//№ ЛС*


                            worksheet.Cell("B" + cellNumber.ToString() + "").Value = item["PREVIOUS_DATE"].ToString();//Дата начала работы


                            worksheet.Cell("C" + cellNumber.ToString() + "").Value = item["METERS_NUMBER"].ToString();//Номер счетчика*


                            worksheet.Cell("D" + cellNumber.ToString() + "").Value = item["TYPE"].ToString();//тип прибора


                            worksheet.Cell("E" + cellNumber.ToString() + "").Value = "";//Дата последней поверки*
                            string VALUE_ = item["VALUE_"].ToString();


                            if (!string.IsNullOrEmpty(VALUE_))
                            {
                                worksheet.Cell("F" + cellNumber.ToString() + "").Value = VALUE_;
                            }//Показания


                            worksheet.Cell("G" + cellNumber.ToString() + "").Value = item["NEXT_DATE"].ToString();//Дата Окончания/ поверки


                            worksheet.Cell("H" + cellNumber.ToString() + "").Value = item["DATE_"].ToString();//Дата


                            worksheet.Cell("I" + cellNumber.ToString() + "").Value = "Да";//Квартирный

                            worksheet.Cell("J" + cellNumber.ToString() + "").Value = item["OBJECT_ADRESS"].ToString();
                            cellNumber = cellNumber + 1;
                        }
                        else
                        {
                            int amount = Convert.ToInt32(item["AMUNT_TARIF"].ToString());
                            for (int j = 1; j <= amount; j++)
                            {

                                string value = "VALUE_";
                                if (j != 1)
                                {
                                    value = value + j;
                                }
                                worksheet.Cell("A" + cellNumber.ToString() + "").Value = item["SCORE_ID"].ToString();//№ ЛС*


                                worksheet.Cell("B" + cellNumber.ToString() + "").Value = item["PREVIOUS_DATE"].ToString();//Дата начала работы


                                worksheet.Cell("C" + cellNumber.ToString() + "").Value = "T" + j + "-" + item["METERS_NUMBER"].ToString();//Номер счетчика*


                                worksheet.Cell("D" + cellNumber.ToString() + "").Value = item["TYPE"].ToString();//тип прибора


                                worksheet.Cell("E" + cellNumber.ToString() + "").Value = "";//Дата последней поверки*
                                worksheet.Cell("F" + cellNumber.ToString() + "").Value = item[value].ToString();

                                worksheet.Cell("G" + cellNumber.ToString() + "").Value = item["NEXT_DATE"].ToString();//Дата Окончания/ поверки


                                worksheet.Cell("H" + cellNumber.ToString() + "").Value = item["DATE_"].ToString();//Дата


                                worksheet.Cell("I" + cellNumber.ToString() + "").Value = "Да";//Квартирный

                                worksheet.Cell("J" + cellNumber.ToString() + "").Value = item["OBJECT_ADRESS"].ToString();

                                cellNumber = cellNumber + 1;

                            }
                        }



                    }
                    var rngTable = worksheet.Range("A1:P" + cellNumber + "");
                    rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Columns().AdjustToContents();
                    workbook.SaveAs(strFilePath);
                    result = "Counters_Excel_" + guid + ".xlsx";

                }

            }
            else
            {
                result = "0";
            }


            return result;
        }
        [WebMethod]
        public static string UplCOunters(int obj, string file)
        {
            string result = "";
            file = @"C:\inetpub\wwwroot\Files\" + file;

            bool success = true;
            DataTable dt = null;
            //try
            //{
            //    // dt = ReadAsDataTable(file);
            //}
            //catch (IndexOutOfRangeException ex)
            //{




            //}

            try
            {
                dt = ReadAsDataTable(file);
                string header1 = (dt.Columns[0].ColumnName is string) ? dt.Columns[0].ColumnName : "";
                string header2 = (dt.Columns[1].ColumnName is string) ? dt.Columns[1].ColumnName : "";
                string header3 = (dt.Columns[2].ColumnName is string) ? dt.Columns[2].ColumnName : "";
                string header4 = (dt.Columns[3].ColumnName is string) ? dt.Columns[3].ColumnName : "";
                string header5 = (dt.Columns[4].ColumnName is string) ? dt.Columns[4].ColumnName : "";
                string header6 = (dt.Columns[5].ColumnName is string) ? dt.Columns[5].ColumnName : "";
                string header7 = (dt.Columns[6].ColumnName is string) ? dt.Columns[6].ColumnName : "";
                string header8 = (dt.Columns[7].ColumnName is string) ? dt.Columns[7].ColumnName : "";
                string header9 = (dt.Columns[8].ColumnName is string) ? dt.Columns[8].ColumnName : "";

                #region CheckHeaders
                if (header1 != "№ ЛС*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок первой колонки " + header1 + ". Должно быть № ЛС*\"}";
                    goto end;
                }
                if (header2 != "Номер счетчика*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header2 + ". Должно быть Номер счетчика*\"}";
                    goto end;
                }
                if (header3 != "Тип счетчика*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок третий колонки " + header3 + ". Должно быть Тип счетчика*\"}";
                    goto end;
                }
                if (header4 != "Количество тарифов**")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок четвертый колонки " + header4 + ". Должно быть Количество тарифов**\"}";
                    goto end;
                }
                if (header5 != "Дата последней поверки*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок пятый колонки " + header5 + ". Должно быть Дата последней поверки*\"}";
                    goto end;
                }
                if (header6 != "Дата следующей поверки*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок шестой колонки " + header6 + ". Должно быть Дата следующей поверки*\"}";
                    goto end;
                }
                if (header7 != "Тариф**")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок седьмой колонки " + header7 + ". Должно быть Тариф**\"}";
                    goto end;
                }
                if (header8 != "Начальное показание*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок восьмой колонки " + header8 + ". Должно быть Начальное показание*\"}";
                    goto end;
                }
                if (header9 != "Дата показания*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок девятый колонки " + header9 + ". Должно быть Дата показания*\"}";
                    goto end;
                }

                end:;
                #endregion
            }
            catch (Exception ex)
            {
                success = false;
                result = "{\"result\" : \" Загружаемый файл не соответствует корректному шаблону. (" + ex.Message + ")\"}";

            }

            if (success == true)
            {
                //result should here
                result = Return_True_False_File_Counters(obj, dt);


            }

            //foreach (DataRow item in dt.Rows)
            //{
            //    
            //    if (item[0].ToString() != "")
            //    {
            //       
            //    }
            //}
            //conn.Close();
            // JavaScriptSerializer js = new JavaScriptSerializer();
            //if (success == true)
            //{
            //    // result = js.Serialize(sfxs);
            //    result = "{\"result\" : \"Ok\",\"Counters\":" + js.Serialize(mtrs) + "}";
            //}

            return result;

        }
        public static string Return_True_False_File_Counters(int obj, DataTable dt)
        {
            List<METERS> mtrsTrue = new List<METERS>();
            List<METERS> mtrsFalse = new List<METERS>();
            int column_count = dt.Columns.Count;
            // DataRow[]  dt=dr.Select("№ ЛС* !=null and № ЛС* !='' and Номер счетчика*!=null and Номер счетчика*!='' Тип счетчика*!=nu;;  and Тип счетчика*!='' and != null")
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                int has_empty_count = 0;

                for (int k = 0; k < column_count; k++)
                {
                    if (string.IsNullOrEmpty(dt.Rows[i][k].ToString()))
                    {
                        has_empty_count++;
                    }
                }
                if (has_empty_count <= 8)
                {
                    bool currentSucc = true;
                    //if (dt.Rows[i][0].ToString().Length != 0 && dt.Rows[i][1].ToString().Length != 0 && dt.Rows[i][2].ToString().Length != 0)
                    //{
                    METERS mtr = new METERS();




                    #region checks
                    mtr.SCORE_ID = dt.Rows[i][0].ToString().Trim();//№ ЛС
                    int score_Count = 0;
                    if (mtr.SCORE_ID.Trim().Length != 0)
                    {

                        score_Count = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 1), new SqlParameter("@sc", mtr.SCORE_ID) }, CommandType.StoredProcedure);
                        if (score_Count == 0)
                        {
                            mtr.SCORE_ID = mtr.SCORE_ID + " (Такого лицевого счета нет в системе)";
                            currentSucc = false;
                        }
                        else
                        {
                            int score_in_Object = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 2), new SqlParameter("@sc", mtr.SCORE_ID), new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
                            if (score_in_Object == 0)
                            {
                                mtr.SCORE_ID = mtr.SCORE_ID + " (На этом объекте такой лицевой счет не зарегистрирован)";
                                currentSucc = false;
                            }

                        }
                    }
                    else
                    {
                        mtr.SCORE_ID = " (Заполните поле)";
                        currentSucc = false;
                    }


                    // (METER_NUMBER) check for empty cell, no METER_NUMBER
                    mtr.METERS_NUMBER = dt.Rows[i][1].ToString().Trim();//№ счетчика
                    mtr.METERS_NUMBER = mtr.METERS_NUMBER
                        .Replace("T1-", "")//ru
                                .Replace("T1-", "")//en

                                .Replace("T2-", "")//ru
                                .Replace("T2-", "")//en

                                 .Replace("T3-", "")//ru
                                .Replace("T3-", "")//en

                                .Replace("Т1-", "")
                                .Replace("Т2-", "")
                                .Replace("_x000D_", "")
                                .TrimStart()
                                .TrimStart()
                                .Replace(" ", "")
                                .Replace("\n", "");
                    if (mtr.METERS_NUMBER.Trim().Length != 0)
                    {

                        int Meter_count = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 3), new SqlParameter("@mn", mtr.METERS_NUMBER), new SqlParameter("@obj", obj), new SqlParameter("@sc", mtr.SCORE_ID) }, CommandType.StoredProcedure);
                        if (Meter_count == 1)
                        {
                            currentSucc = false;
                            mtr.METERS_NUMBER = mtr.METERS_NUMBER + " (Счетчик с таким номером уже зарегистрирован в системе)";
                        }
                    }
                    else
                    {
                        currentSucc = false;
                        mtr.METERS_NUMBER = " (Заполните поле)";
                    }


                    //(TYPE) check for empty cell, incorrect type of counter
                    mtr.TYPE = dt.Rows[i][2].ToString().Trim();//Тип счетчика
                    if (mtr.TYPE.Length != 0)
                    {
                        if (mtr.TYPE != "ГВС" && mtr.TYPE != "ХВС" && mtr.TYPE != "Теплоэнергия" && mtr.TYPE != "Электроэнергия" && mtr.TYPE != "Газ")
                        {
                            currentSucc = false;
                            mtr.TYPE = mtr.TYPE + " (Некорректное значение)";
                        }

                    }
                    else
                    {
                        currentSucc = false;
                        mtr.TYPE = " (Заполните поле)";
                    }



                    mtr.TYPE_ID = dt.Rows[i][6].ToString().Trim();//Тариф
                    if (mtr.TYPE == "Электроэнергия" && mtr.TYPE_ID.Length == 0)
                    {
                        mtr.TYPE_ID = "(Для счетчиков с типом \"Электроэнергия\" поле \"Тариф\" обязательно для заполнения)";

                        currentSucc = false;
                    }
                    if (mtr.TYPE == "Электроэнергия" && mtr.TYPE_ID.Length != 0)
                    {
                        string a = mtr.METERS_NUMBER.Trim();
                        //a = a.Replace(" ", "");
                        //// char[] wordArr = a.ToCharArray();
                        //// a = a.Substring(a.IndexOf('-') + 1, wordArr.Count() - 3);
                        //a = a.Substring(a.IndexOf('-') + 1);
                        //a = a.Substring(0, (a.IndexOf('_') != -1) ? a.IndexOf('_') : a.Length);
                        //mtr.METERS_NUMBER = a;
                        //  mtr.TYPE_ID = "(Для счетчиков с типом \"Электроэнергия\" поле \"Тариф\" обязательно для заполнения)";
                        if (mtr.TYPE_ID != "Т1" && mtr.TYPE_ID != "Т2" && mtr.TYPE_ID != "Т3")

                        {
                            mtr.TYPE_ID = mtr.TYPE_ID + " (Некорректное значение)";
                            currentSucc = false;
                        }


                    }
                    // (AMUNT_TARIF) check if meter type is not elektro and amunt_tarif is empty then amunt tarif equal to "-"
                    mtr.AMUNT_TARIF = dt.Rows[i][3].ToString().Trim();// Количество тарифов


                    // (AMUNT_TARIF) check if meter type is elektro and amunt_tarif shouldn't be empty
                    if (mtr.AMUNT_TARIF.Length == 0 && mtr.TYPE == "Электроэнергия")
                    {
                        mtr.AMUNT_TARIF = " (Для счетчиков с типом \"Электроэнергия\" поле \"Количество тарифов\" обязательно для заполнения)";
                        currentSucc = false;
                    }

                    if (mtr.AMUNT_TARIF.Length!=0 &&mtr.AMUNT_TARIF!="-" && mtr.TYPE != "Электроэнергия")
                    {
                        if (Convert.ToInt32(mtr.AMUNT_TARIF)>1)
                        {
                            mtr.AMUNT_TARIF = mtr.AMUNT_TARIF+ " (Неверное количество тарифов)";
                            currentSucc = false;

                        }
                    }



                    string meter_type = mtr.TYPE;
                    if (meter_type == "Электроэнергия")
                    {
                        string Meter_number = mtr.METERS_NUMBER;
                        if (Meter_number.IndexOf('(') == -1)
                        {
                            string kolTarif = mtr.AMUNT_TARIF;

                            // .Where(r => r.METERS_NUMBER.Replace(" ", "").Substring(r.METERS_NUMBER.Trim().IndexOf('-') + 1) == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID).ToList();
                            //.Substring(0, (x.Field<string>("Номер счетчика*").IndexOf('_') != -1) ? (x.Field<string>("Номер счетчика*").IndexOf('_')) : x.Field<string>("Номер счетчика*").Length)
                            ////int a = i;
                            //var dubl2 = dt.AsEnumerable()
                            //    .Select(x => new
                            //    {
                            //        SCORE_ID = x.Field<string>("№ ЛС*"),
                            //        METERS_NUMBER = x.Field<string>("Номер счетчика*")

                            //    .TrimStart().TrimEnd().Replace(" ", "")

                            //    ,
                            //        METER_TYPE = x.Field<string>("Тип счетчика*")
                            //    })

                            //    .Where(s => !string.IsNullOrEmpty(s.METERS_NUMBER.Trim())).Where(f => !string.IsNullOrEmpty(f.SCORE_ID)).Where(d => !string.IsNullOrEmpty(d.METER_TYPE)).Reverse().ToList();


                            // .Substring((x.Field<string>("Номер счетчика*").IndexOf('-')!=-1)? x.Field<string>("Номер счетчика*").IndexOf('-') + 1:0)

                            //.Substring(0, (x.Field<string>("Номер счетчика*").IndexOf('_') != -1) ? (x.Field<string>("Номер счетчика*").IndexOf('_')) : x.Field<string>("Номер счетчика*") .ToCharArray().Count())


                            //.Substring(x.Field<string>("Номер счетчика*").IndexOf('-') + 1, (x.Field<string>("Номер счетчика*").IndexOf('_') != -1) ? x.Field<string>("Номер счетчика*").IndexOf('_') - 3 : x.Field<string>("Номер счетчика*").Length - 3)

                            var dublicateDatas = dt.AsEnumerable()
                                .Select(x => new
                                {
                                    SCORE_ID = x.Field<string>("№ ЛС*"),
                                    METERS_NUMBER = x.Field<string>("Номер счетчика*")
                                .Replace("T1-", "")//ru
                                .Replace("T1-", "")//en

                                .Replace("T2-", "")//ru
                                .Replace("T2-", "")//en

                                 .Replace("T3-", "")//ru
                                .Replace("T3-", "")//en


                                   .Replace("Т1-", "")
                                .Replace("Т2-", "")
                                .Replace("_x000D_", "")
                                .TrimStart()
                                .TrimStart()
                                .Replace(" ", "")
                                .Replace("\n", "")



                               ,
                                    METER_TYPE = x.Field<string>("Тип счетчика*"),
                                    AMUNT_TARIF = x.Field<string>("Количество тарифов**"),
                                    TARIF = x.Field<string>("Тариф**")
                                })

                                .Where(s => !string.IsNullOrEmpty(s.METERS_NUMBER.Trim())).Where(f => !string.IsNullOrEmpty(f.SCORE_ID)).Where(d => !string.IsNullOrEmpty(d.METER_TYPE)).ToList().Where(y => y.METER_TYPE == "Электроэнергия").ToList();







                            if (kolTarif.IndexOf('(') == -1)
                            {

                                dublicateDatas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID).ToList();
                                int MeterCount = dublicateDatas.Count;//get same counters by meter numbe

                                if (MeterCount != Convert.ToInt32(kolTarif))
                                {
                                    mtr.AMUNT_TARIF = mtr.AMUNT_TARIF + " (Количество тарифов не соответствует количеству счетчиков)";
                                    currentSucc = false;
                                }
                            }

                            if (mtr.AMUNT_TARIF.IndexOf('(') == -1)
                            {
                                if (mtr.TYPE_ID.IndexOf('(') == -1)
                                {
                                    var T1_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T1" || r.TARIF == "Т1")).ToList();
                                    //ENG                //RUS
                                    if (T1_datas.Count > 1 || T1_datas.Count < 1)
                                    {
                                        if (mtr.TYPE_ID.IndexOf('(') == -1)
                                        {
                                            if (mtr.TYPE_ID == "T1" || mtr.TYPE_ID == "Т1")
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T1\" не уникально)";

                                                currentSucc = false;
                                            }
                                        }
                                    }
                                    if (kolTarif == "2")
                                    {
                                        var T2_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T2" || r.TARIF == "Т2")).ToList();
                                        //eng               //rus
                                        if (T2_datas.Count > 1 || T2_datas.Count < 1)
                                        {
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                if (mtr.TYPE_ID == "T2" || mtr.TYPE_ID == "Т2")
                                                {
                                                    mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T2\" не уникально)";

                                                    currentSucc = false;
                                                }
                                            }
                                        }
                                    }
                                    if (kolTarif == "3")
                                    {
                                        var T3_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T3" || r.TARIF == "Т3")).ToList();
                                        //eng               //rus
                                        if (T3_datas.Count > 1 || T3_datas.Count < 1)
                                        {
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                if (mtr.TYPE_ID == "T3" || mtr.TYPE_ID == "Т3")
                                                {
                                                    mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T3\" не уникально)";

                                                    currentSucc = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }


                        }

                    }


                    mtr.PREVIOUS_DATE = dt.Rows[i][4].ToString().Trim();//Дата последней поверки
                    mtr.PREVIOUS_DATE = DateTime.FromOADate(double.Parse(mtr.PREVIOUS_DATE)).ToString("dd.MM.yyyy");
                    // double PREVIOUS_DATE;
                    DateTime today = DateTime.Today;
                    if (mtr.PREVIOUS_DATE.Length != 0)
                    {
                        string isTrueFormat = DateFormatControl(mtr.PREVIOUS_DATE, "PREVIOUS_DATE");
                        if (isTrueFormat != "ok")
                        {
                            mtr.PREVIOUS_DATE = isTrueFormat;
                            currentSucc = false;

                        }
                        //if (double.TryParse(mtr.PREVIOUS_DATE, out PREVIOUS_DATE))
                        //{
                        //    int dot_count = Regex.Matches(mtr.PREVIOUS_DATE, "[.]").Count;
                        //    if (dot_count == 0)
                        //    {
                        //        mtr.PREVIOUS_DATE = DateTime.FromOADate(PREVIOUS_DATE).ToString();
                        //        mtr.PREVIOUS_DATE = mtr.PREVIOUS_DATE.Substring(0, 10);
                        //    }
                        //    DateTime PREVIOUS_DATE_ = DateTime.Parse(mtr.PREVIOUS_DATE);

                        //    //if (PREVIOUS_DATE_ > today)
                        //    //{
                        //    //    mtr.PREVIOUS_DATE = mtr.PREVIOUS_DATE + "(Дата последней поверки не может быть позже текущей даты)";
                        //    //    currentSucc = false;
                        //    //}

                        //}
                        //else
                        //{
                        //    mtr.PREVIOUS_DATE = mtr.PREVIOUS_DATE + " (Некорректное значение)";
                        //    currentSucc = false;
                        //}

                    }
                    else
                    {
                        mtr.PREVIOUS_DATE = "(Заполните поле)";
                        currentSucc = false;
                    }

                    //   mtr.NEXT_DATE = (dt.Rows[i][5].ToString().Length == 0) ? "" : dt.Rows[i][5].ToString();//Дата следующей поверки
                    //   mtr.NEXT_DATE = (mtr.NEXT_DATE.Length != 0) ? DateTime.FromOADate(double.TryParse(mtr.NEXT_DATE,)).ToString() : "";
                    mtr.NEXT_DATE = dt.Rows[i][5].ToString().Trim();
                    mtr.NEXT_DATE = DateTime.FromOADate(double.Parse(mtr.NEXT_DATE)).ToString("dd.MM.yyyy");
                    // double NEXT_DATE;
                    if (mtr.NEXT_DATE.Length != 0)
                    {
                        string isTrueFormat = DateFormatControl(mtr.NEXT_DATE, "NEXT_DATE");
                        if (isTrueFormat != "ok")
                        {
                            mtr.NEXT_DATE = isTrueFormat;
                            currentSucc = false;
                        }
                        //if (double.TryParse(mtr.NEXT_DATE, out NEXT_DATE))
                        //{
                        //    int dot_count = Regex.Matches(mtr.NEXT_DATE, "[.]").Count;
                        //    if (dot_count == 0)
                        //    {
                        //        mtr.NEXT_DATE = DateTime.FromOADate(NEXT_DATE).ToString();
                        //        mtr.NEXT_DATE = mtr.NEXT_DATE.Substring(0, 10);
                        //    }
                        //    DateTime NEXT_DATE_ = DateTime.Parse(mtr.NEXT_DATE);
                        //    //if (today > NEXT_DATE_)
                        //    //{
                        //    //    mtr.NEXT_DATE = mtr.NEXT_DATE + "(Дата следующей поверки не может быть раньше текущей даты)";
                        //    //    currentSucc = false;
                        //    //}
                        //}
                        //else
                        //{
                        //    mtr.NEXT_DATE = mtr.NEXT_DATE + "(Некорректное значение)";
                        //    currentSucc = false;
                        //}
                    }
                    else
                    {
                        mtr.NEXT_DATE = "(Заполните поле)";
                        currentSucc = false;
                    }


                    mtr.OBJECT_ID = dt.Rows[i][7].ToString();//Начальное показание
                    if (mtr.OBJECT_ID.Length == 0)
                    {
                        mtr.OBJECT_ID = "(Заполните поле)";
                        currentSucc = false;
                    }
                    else
                    {
                        if (mtr.OBJECT_ID.IndexOf('-') == -1)
                        {
                            if (mtr.OBJECT_ID.IndexOf('.') != -1)
                            {
                                // mtr.OBJECT_ID=Convert.ToDouble

                                double a = double.Parse(mtr.OBJECT_ID, CultureInfo.InvariantCulture);
                                a = (double)Math.Round(a, 3);
                                mtr.OBJECT_ID = a.ToString();
                                mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');


                            }
                            if (mtr.OBJECT_ID.IndexOf(',') != -1)
                            {
                                mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');
                                double a = double.Parse(mtr.OBJECT_ID, CultureInfo.InvariantCulture);
                                a = (double)Math.Round(a, 3);
                                mtr.OBJECT_ID = a.ToString();
                                mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');
                            }
                        }
                        else
                        {
                            mtr.OBJECT_ID = mtr.OBJECT_ID + " (счетчик с отрицательным показаниями)";
                            currentSucc = false;
                        }
                    }


                    mtr.ROOM_TYPE = dt.Rows[i][8].ToString();//Дата показания
                    mtr.ROOM_TYPE = DateTime.FromOADate(double.Parse(mtr.ROOM_TYPE)).ToString("dd.MM.yyyy");
                    // double ROOM_TYPE;
                    if (mtr.ROOM_TYPE.Length != 0)
                    {
                        string isTrueFormat = DateFormatControl(mtr.ROOM_TYPE, "Date_of_indication");
                        if (isTrueFormat != "ok")
                        {
                            mtr.ROOM_TYPE = isTrueFormat;
                            currentSucc = false;
                        }

                        //if (double.TryParse(mtr.ROOM_TYPE, out ROOM_TYPE))
                        //{
                        //    int dot_count = Regex.Matches(mtr.ROOM_TYPE, "[.]").Count;
                        //    if (dot_count == 0)
                        //    {
                        //        mtr.ROOM_TYPE = DateTime.FromOADate(ROOM_TYPE).ToString();
                        //        mtr.ROOM_TYPE = mtr.ROOM_TYPE.Substring(0, 10);
                        //    }
                        //    DateTime ROOM_TYPE_ = DateTime.Parse(mtr.ROOM_TYPE);
                        //    //if (ROOM_TYPE_ > today)
                        //    //{
                        //    //    mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Дата внесения показаний не может быть позже текущей даты)";
                        //    //    currentSucc = false;
                        //    //}

                        //}
                        //else
                        //{
                        //    mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Некорректное значение)";
                        //}
                    }
                    else
                    {
                        mtr.ROOM_TYPE = "(Заполните поле)";
                        currentSucc = false;
                    }

                    #endregion

                    //!string.IsNullOrEmpty(mtr.TYPE_ID) !string.IsNullOrEmpty(mtr.AMUNT_TARIF)
                    //bool all_is_empty = true;
                    //if (!string.IsNullOrEmpty(mtr.METERS_NUMBER) && !string.IsNullOrEmpty(mtr.NEXT_DATE) && !string.IsNullOrEmpty(mtr.OBJECT_ID) && !string.IsNullOrEmpty(mtr.PREVIOUS_DATE) && !string.IsNullOrEmpty(mtr.ROOM_TYPE) && !string.IsNullOrEmpty(mtr.SCORE_ID) && !string.IsNullOrEmpty(mtr.TYPE))
                    //{
                    //    //mtrs.Add(mtr);
                    //    all_is_empty = false;
                    //}

                    if (currentSucc == true)
                    {

                        mtrsTrue.Add(mtr);

                    }
                    else

                    {

                        mtrsFalse.Add(mtr);

                    }
                }

            }
            JavaScriptSerializer j_true = new JavaScriptSerializer();
            j_true.MaxJsonLength = int.MaxValue;
            j_true.Serialize(mtrsTrue);

            //JavaScriptSerializer j_false = new JavaScriptSerializer();
            //j_false.Serialize(mtrsFalse);
            string excel_name = Give_error_excel_Counter(obj, mtrsFalse);
            return "{\"result\":\"Ok\",\"mtrsTrue\":" + j_true.Serialize(mtrsTrue) + ",\"mtrsFalse\":\"" + excel_name + "\",\"mtrsFalse_count\":\"" + mtrsFalse.Count + "\"}"; ;
        }

        private static string DateFormatControl(string _DATE, string dateControlFor)
        {
            string IsTrue = "ok";
            int count = _DATE.Count(f => f == '.');
            if (count != 2)
            {
                IsTrue = "(Не по Формату \"дд.мм.гггг\")";
            }
            else
            {
                string[] arr = _DATE.Split('.');
                string Day = arr[0];
                if (Convert.ToInt32(Day) > 31)
                {
                    IsTrue = "(Не по Формату \"дд.мм.гггг\")";
                }
                else
                {
                    if (Day.Length == 1)
                    {
                        Day = "0" + Day;
                    }
                }
                string Month = arr[1];
                if (Convert.ToInt32(Month) > 12)
                {
                    IsTrue = "(Не по Формату \"дд.мм.гггг\")";
                }
                else
                {
                    if (Month.Length == 1)
                    {
                        Month = "0" + Month;
                    }
                }
                string Year = arr[2];
                if (Year.Length < 4 || Year.Length > 4)
                {
                    IsTrue = "(Не по Формату \"дд.мм.гггг\")";
                }


            }
            if (IsTrue == "ok")
            {
                DateTime DateTime_ = DateTime.Today;
                string today = DateTime_.ToString("dd.MM.yyyy");
                if (dateControlFor == "PREVIOUS_DATE")
                {
                    if (ComputeBiggerDate(_DATE, today, '.') == 1)
                    {
                        IsTrue = _DATE + " (Дата последней поверки не может быть позже текущей даты)";
                    }
                    //if (PREVIOUS_DATE_ > today)
                    //{
                    //    mtr.PREVIOUS_DATE = mtr.PREVIOUS_DATE + "(Дата последней поверки не может быть позже текущей даты)";
                    //    currentSucc = false;
                    //}
                }
                if (dateControlFor == "NEXT_DATE")
                {
                    if (ComputeBiggerDate(_DATE, today, '.') == 2)
                    {
                        IsTrue = _DATE + " (Дата следующей поверки не может быть раньше текущей даты)";
                    }
                }
                if (dateControlFor == "Date_of_indication")
                {
                    if (ComputeBiggerDate(_DATE, today, '.') == 1)
                    {
                        IsTrue = _DATE + " (Дата внесения показаний не может быть позже текущей даты)";
                    }

                }
            }
            return IsTrue;

        }

        public static int ComputeBiggerDate(string date_1, string date_2, char splitter)
        {
            int result = 0;
            string[] date1 = date_1.Split(splitter);
            string[] date2 = date_2.Split(splitter);
            //date1 = date1.Split(splitter)
            // date2 = date2.Split(splitter)

            int year1 = Convert.ToInt32(date1[2]);
            int year2 = Convert.ToInt32(date2[2]);

            int month1 = Convert.ToInt32(date1[1]);
            int month2 = Convert.ToInt32(date2[1]);

            int day1 = Convert.ToInt32(date1[0]);
            int day2 = Convert.ToInt32(date2[0]);

            if (year1 > year2)
            {
                result = 1;
            }
            else if (year1 == year2)
            {
                result = 0;
            }
            else if (year2 > year1)
            {
                result = 2;
            }

            if (result == 0)
            {
                if (month1 > month2)
                {
                    result = 1;
                }
                else if (month1 == month2)
                {
                    result = 0;
                }
                else if (month2 > month1)
                {
                    result = 2;
                }
            }

            if (result == 0)
            {
                if (day1 > day2)
                {
                    result = 1;
                }
                else if (day1 == day2)
                {
                    result = 0;
                }
                else if (day2 > day1)
                {
                    result = 2;
                }
            }
            return result;
        }

        public static string Give_error_excel_Counter(int obj, List<METERS> flsMeters)
        {
            string returnVal = "";
            if (flsMeters.Count != 0)
            {
                string guid = Guid.NewGuid().ToString();
                string strFilePath = @"C:\inetpub\wwwroot\Files\Error_Excel\Counters_(Object_" + obj + ")_Error_Excel_" + guid + ".xlsx";
                using (var workbook = new XLWorkbook())
                {

                    #region ExcelHeader
                    var worksheet = workbook.Worksheets.Add("Sample Sheet");

                    worksheet.Cell("A1").Value = "№ ЛС*";
                    worksheet.Cell("A1").Style.Font.Bold = true;
                    worksheet.Cell("A1").Style.Font.FontColor = XLColor.Red;
                    worksheet.Column("A").CellsUsed().SetDataType(XLDataType.Text);

                    worksheet.Column("B").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("B1").Value = "Номер счетчика*";
                    worksheet.Cell("B1").Style.Font.Bold = true;
                    worksheet.Cell("B1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("C").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("C1").Value = "Тип счетчика*";
                    worksheet.Cell("C1").Style.Font.Bold = true;
                    worksheet.Cell("C1").Style.Font.FontColor = XLColor.Red;

                    worksheet.Column("D").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("D1").Value = "Количество тарифов**";
                    worksheet.Cell("D1").Style.Font.Bold = true;
                    worksheet.Cell("D1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("E").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("E1").Value = "Дата последней поверки*";
                    worksheet.Cell("E1").Style.Font.Bold = true;
                    worksheet.Cell("E1").Style.Font.FontColor = XLColor.Red;

                    worksheet.Column("F").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("F1").Value = "Дата следующей поверки*";
                    worksheet.Cell("F1").Style.Font.Bold = true;
                    worksheet.Cell("F1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("G").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("G1").Value = "Тариф**";
                    worksheet.Cell("G1").Style.Font.Bold = true;
                    worksheet.Cell("G1").Style.Font.FontColor = XLColor.Red;

                    worksheet.Column("H").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("H1").Value = "Начальное показание*";
                    worksheet.Cell("H1").Style.Font.Bold = true;
                    worksheet.Cell("H1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("I").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("I1").Value = "Дата показания*";
                    worksheet.Cell("I1").Style.Font.Bold = true;
                    worksheet.Cell("I1").Style.Font.FontColor = XLColor.Red;
                    #endregion
                    for (int i = 0; i < flsMeters.Count; i++)
                    {
                        int cellNumber = i + 2;
                        worksheet.Cell("A" + cellNumber.ToString() + "").Value = flsMeters[i].SCORE_ID;//№ ЛС*
                        worksheet.Cell("A" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("B" + cellNumber.ToString() + "").Value = flsMeters[i].METERS_NUMBER;//Номер счетчика*
                        worksheet.Cell("B" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("C" + cellNumber.ToString() + "").Value = flsMeters[i].TYPE;//Тип счетчика*
                        worksheet.Cell("C" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("D" + cellNumber.ToString() + "").Value = flsMeters[i].AMUNT_TARIF;//Количество тарифов**
                        worksheet.Cell("D" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("E" + cellNumber.ToString() + "").Value = flsMeters[i].PREVIOUS_DATE;//Дата последней поверки*
                        worksheet.Cell("E" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("F" + cellNumber.ToString() + "").Value = flsMeters[i].NEXT_DATE;//Дата следующей поверки*
                        worksheet.Cell("F" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("G" + cellNumber.ToString() + "").Value = flsMeters[i].TYPE_ID;//Тариф**
                        worksheet.Cell("G" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("H" + cellNumber.ToString() + "").Value = flsMeters[i].OBJECT_ID;//Начальное показание*
                        worksheet.Cell("H" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("I" + cellNumber.ToString() + "").Value = flsMeters[i].ROOM_TYPE;//Дата показания*
                        worksheet.Cell("I" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                    }
                    var rngTable = worksheet.Range("A1:I1");
                    rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Columns().AdjustToContents();
                    workbook.SaveAs(strFilePath);
                    returnVal = "Counters_(Object_" + obj + ")_Error_Excel_" + guid + ".xlsx";

                }

            }
            else
            {
                returnVal = "0";
            }
            return returnVal;
        }
        [WebMethod]
        public static string ShowIndiCations(int obj, string file)
        {
            string result = "";
            file = @"C:\inetpub\wwwroot\Files\" + file;

            bool success = true;
            DataTable dt = null;
            try
            {
                dt = ReadAsDataTable(file);

                string header0 = (dt.Columns[0].ColumnName is string) ? dt.Columns[0].ColumnName : "";
                string header1 = (dt.Columns[1].ColumnName is string) ? dt.Columns[1].ColumnName : "";
                string header2 = (dt.Columns[2].ColumnName is string) ? dt.Columns[2].ColumnName : "";
                string header3 = (dt.Columns[3].ColumnName is string) ? dt.Columns[3].ColumnName : "";
                string header4 = (dt.Columns[4].ColumnName is string) ? dt.Columns[4].ColumnName : "";
                string header5 = (dt.Columns[5].ColumnName is string) ? dt.Columns[5].ColumnName : "";
                string header6 = (dt.Columns[6].ColumnName is string) ? dt.Columns[6].ColumnName : "";
                //string header8 = (dt.Columns[7].ColumnName is string) ? dt.Columns[7].ColumnName : "";
                //string header9 = (dt.Columns[8].ColumnName is string) ? dt.Columns[8].ColumnName : "";

                #region CheckHeaders
                if (header0 != "№ ЛС*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок первой колонки " + header0 + ". Должно быть № ЛС*\"}";
                    goto end;
                }
                if (header1 != "Номер счетчика*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header1 + ". Должно быть Номер счетчика*\"}";
                    goto end;
                }
                if (header2 != "Тип счетчика*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок третий колонки " + header2 + ". Должно быть Тип счетчика*\"}";
                    goto end;
                }
                if (header3 != "Количество тарифов**")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок четвертый колонки " + header3 + ". Должно быть Количество тарифов**\"}";
                    goto end;
                }

                if (header4 != "Тариф**")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок седьмой колонки " + header4 + ". Должно быть Тариф**\"}";
                    goto end;
                }
                if (header5 != "Показания*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок восьмой колонки " + header5 + ". Должно быть Показания*\"}";
                    goto end;
                }
                if (header6 != "Дата внесения показаний*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок девятый колонки " + header6 + ". Должно быть Дата внесения показаний*\"}";
                    goto end;
                }

                end:;
                #endregion

                if (success == true)
                {
                    //result should here
                    result = Return_True_False_File_IndiCations(obj, dt);


                }
            }
            catch (Exception ex)
            {


                success = false;
                // result = "{\"result\" : \" Загружаемый файл не соответствует корректному шаблону.\"}";
                result = new JavaScriptSerializer().Serialize(new
                {
                    result = " Загружаемый файл не соответствует корректному шаблону.",
                    ErrMesage = ex.Message

                });

            }

            //try
            //{


            //   }
            //catch (Exception x)
            //{
            //    result = "{\"result\" : \""+x.Message+"\"}";
            //    success = false;

            //}



            return result;
        }

        public static string Return_True_False_File_IndiCations(int objId, DataTable dt)
        {

            List<METERS> IndicTrue = new List<METERS>();
            List<METERS> IndicFalse = new List<METERS>();
            List<METERS> IndiCElektro = new List<METERS>();
            int column_count = dt.Columns.Count;
            // DataRow[]  dt=dr.Select("№ ЛС* !=null and № ЛС* !='' and Номер счетчика*!=null and Номер счетчика*!='' Тип счетчика*!=nu;;  and Тип счетчика*!='' and != null")
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                int has_empty_count = 0;

                for (int k = 0; k < column_count; k++)
                {
                    if (string.IsNullOrEmpty(dt.Rows[i][k].ToString()))
                    {
                        has_empty_count++;
                    }
                }
                if (has_empty_count <= 6)
                {
                    bool currentSucc = true;
                    bool elektro_success = true;
                    //if (dt.Rows[i][0].ToString().Length != 0 && dt.Rows[i][1].ToString().Length != 0 && dt.Rows[i][2].ToString().Length != 0)
                    //{
                    METERS mtr = new METERS();




                    #region checks
                    mtr.SCORE_ID = dt.Rows[i][0].ToString().Trim();//№ ЛС
                    int score_Count = 0;
                    if (mtr.SCORE_ID.Trim().Length != 0)
                    {

                        score_Count = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 1), new SqlParameter("@sc", mtr.SCORE_ID) }, CommandType.StoredProcedure);
                        if (score_Count == 0)
                        {
                            mtr.SCORE_ID = mtr.SCORE_ID + " (Такого лицевого счета нет в системе)";
                            currentSucc = false;
                        }
                        else
                        {
                            int score_in_Object = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 2), new SqlParameter("@sc", mtr.SCORE_ID), new SqlParameter("@obj", objId) }, CommandType.StoredProcedure);
                            if (score_in_Object == 0)
                            {
                                mtr.SCORE_ID = mtr.SCORE_ID + " (На этом объекте такой лицевой счет не зарегистрирован)";
                                currentSucc = false;
                            }

                        }
                    }
                    else
                    {
                        mtr.SCORE_ID = " (Заполните поле)";
                        currentSucc = false;
                    }


                    // (METER_NUMBER) check for empty cell, no METER_NUMBER
                    mtr.METERS_NUMBER = dt.Rows[i][1].ToString().Trim();//№ счетчика
                    mtr.METERS_NUMBER = mtr.METERS_NUMBER
                        .Replace("T1-", "")//ru
                                .Replace("T1-", "")//en

                                .Replace("T2-", "")//ru
                                .Replace("T2-", "")//en

                                 .Replace("T3-", "")//ru
                                .Replace("T3-", "")//en
                                .Replace("_x000D_", "")
                                .TrimStart()
                                .TrimStart()
                                .Replace(" ", "")
                                .Replace("\n", "");

                    mtr.TYPE = dt.Rows[i][2].ToString().Trim();//Тип счетчика
                    if (mtr.METERS_NUMBER.Trim().Length != 0)
                    {

                        if (mtr.SCORE_ID.IndexOf('(') == -1)
                        {
                            int Meter_count = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 3), new SqlParameter("@mn", mtr.METERS_NUMBER), new SqlParameter("@obj", objId), new SqlParameter("@sc", mtr.SCORE_ID) }, CommandType.StoredProcedure);
                            if (Meter_count == 0)
                            {
                                currentSucc = false;
                                mtr.METERS_NUMBER = mtr.METERS_NUMBER + " (Счетчик с таким номером не зарегистрирован в системе)";
                            }
                            else
                            {
                                int typeId = (mtr.TYPE == "ГВС") ? 1 : (mtr.TYPE == "ХВС") ? 2 : (mtr.TYPE == "Теплоэнергия") ? 3 : (mtr.TYPE == "Электроэнергия") ? 4 : 5;
                                int CorrectMeterType = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 4), new SqlParameter("@mn", mtr.METERS_NUMBER), new SqlParameter("@obj", objId), new SqlParameter("@sc", mtr.SCORE_ID), new SqlParameter("@type", typeId) }, CommandType.StoredProcedure);

                                if (CorrectMeterType == 0)
                                {
                                    currentSucc = false;
                                    mtr.TYPE = mtr.TYPE + " (У счетчика с таким номером в системе указан другой тип)";
                                }
                            }
                        }
                    }
                    else
                    {
                        currentSucc = false;
                        mtr.METERS_NUMBER = " (Заполните поле)";
                    }


                    //(TYPE) check for empty cell, incorrect type of counter
                    //  mtr.TYPE = dt.Rows[i][2].ToString().Trim();//Тип счетчика
                    if (mtr.TYPE.Length != 0)
                    {
                        if (mtr.TYPE != "ГВС" && mtr.TYPE != "ХВС" && mtr.TYPE != "Теплоэнергия" && mtr.TYPE != "Электроэнергия" && mtr.TYPE != "Газ")
                        {
                            currentSucc = false;
                            mtr.TYPE = mtr.TYPE + " (Некорректное значение)";
                        }


                    }
                    else
                    {
                        currentSucc = false;
                        mtr.TYPE = " (Заполните поле)";
                    }



                    mtr.TYPE_ID = dt.Rows[i][4].ToString().Trim().TrimEnd().TrimStart();//Тариф
                    if (mtr.TYPE == "Электроэнергия" && mtr.TYPE_ID.Length == 0)
                    {
                        mtr.TYPE_ID = "(Для счетчиков с типом \"Электроэнергия\" поле \"Тариф\" обязательно для заполнения)";

                        currentSucc = false;
                        elektro_success = false;
                    }
                    if (mtr.TYPE == "Электроэнергия" && mtr.TYPE_ID.Length != 0)
                    {
                        string a = mtr.METERS_NUMBER.Trim();
                        //a = a.Replace(" ", "");
                        //// char[] wordArr = a.ToCharArray();
                        //// a = a.Substring(a.IndexOf('-') + 1, wordArr.Count() - 3);
                        //a = a.Substring(a.IndexOf('-') + 1);
                        //a = a.Substring(0, (a.IndexOf('_') != -1) ? a.IndexOf('_') : a.Length);
                        //mtr.METERS_NUMBER = a;
                        //  mtr.TYPE_ID = "(Для счетчиков с типом \"Электроэнергия\" поле \"Тариф\" обязательно для заполнения)";
                        //   if ((mtr.TYPE_ID != "T1" || mtr.TYPE_ID!="Т1") && (mtr.TYPE_ID != "T2" || mtr.TYPE_ID != "Т2") && (mtr.TYPE_ID != "T3" || mtr.TYPE_ID != "Т3"))
                        //if((!mtr.TYPE_ID.Contains("T1") || !mtr.TYPE_ID.Contains("Т1")) || (!mtr.TYPE_ID.Contains("T2")|| !mtr.TYPE_ID.Contains("Т2")) || (!mtr.TYPE_ID.Contains("T3") || !mtr.TYPE_ID.Contains("Т3")))
                        //   {
                        //       mtr.TYPE_ID = mtr.TYPE_ID + " (Некорректное значение)";
                        //       currentSucc = false;
                        //       elektro_success = false;
                        //   }

                        //   if (mtr.TYPE_ID.IndexOf('1')!=-1)
                        //   {
                        //       if (mtr.TYPE_ID.Contains("T1") || mtr.TYPE_ID.Contains("Т1"))
                        //       {
                        //           mtr.TYPE_ID = mtr.TYPE_ID + " (Некорректное значение)";
                        //           currentSucc = false;
                        //           elektro_success = false;
                        //       }
                        //   }
                        //else  if (mtr.TYPE_ID.IndexOf('2') != -1)
                        //   {

                        //   }
                        //   else if (mtr.TYPE_ID.IndexOf('3') != -1)
                        //   {

                        //   }


                    }
                    // (AMUNT_TARIF) check if meter type is not elektro and amunt_tarif is empty then amunt tarif equal to "-"
                    mtr.AMUNT_TARIF = dt.Rows[i][3].ToString().Trim();// Количество тарифов


                    // (AMUNT_TARIF) check if meter type is elektro and amunt_tarif shouldn't be empty
                    if (mtr.AMUNT_TARIF.Length == 0 && mtr.TYPE == "Электроэнергия")
                    {
                        mtr.AMUNT_TARIF = " (Для счетчиков с типом \"Электроэнергия\" поле \"Количество тарифов\" обязательно для заполнения)";
                        elektro_success = false;
                        currentSucc = false;
                    }
                    else
                    {
                        if (mtr.METERS_NUMBER.IndexOf("(") == -1 && mtr.SCORE_ID.IndexOf("(") == -1 && mtr.AMUNT_TARIF.Length != 0)
                        {
                            int AMUNT_TARIF = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 5), new SqlParameter("@sc", mtr.SCORE_ID), new SqlParameter("@obj", objId), new SqlParameter("@mn", mtr.METERS_NUMBER) }, CommandType.StoredProcedure);
                            if (AMUNT_TARIF != Convert.ToInt32(mtr.AMUNT_TARIF))
                            {
                                mtr.AMUNT_TARIF = mtr.AMUNT_TARIF + " (У счетчика с таким номером в системе другое количество тарифов)";
                                currentSucc = false;

                            }
                        }
                    }





                    string meter_type = mtr.TYPE;


                    if (meter_type == "Электроэнергия")
                    {
                        string Meter_number = mtr.METERS_NUMBER;
                        if (Meter_number.IndexOf('(') == -1)
                        {
                            string kolTarif = mtr.AMUNT_TARIF;


                            #region BadCode
                            //var dublicateDatas = dt.AsEnumerable()
                            //    .Select(x => new {
                            //        SCORE_ID = x.Field<string>("№ ЛС*"),
                            //        METERS_NUMBER = x.Field<string>("Номер счетчика*")
                            //    .Replace("T1-", "")//ru
                            //    .Replace("T1-", "")//en

                            //    .Replace("T2-", "")//ru
                            //    .Replace("T2-", "")//en

                            //     .Replace("T3-", "")//ru
                            //    .Replace("T3-", "")//en
                            //    .Replace("_x000D_", "")
                            //    .TrimStart()
                            //    .TrimStart()
                            //    .Replace(" ", "")
                            //    .Replace("\n", "")

                            //   ,
                            //        METER_TYPE = x.Field<string>("Тип счетчика*"),
                            //        TARIF=x.Field<string>("Тариф**")
                            //    })

                            //    .Where(s => !string.IsNullOrEmpty(s.METERS_NUMBER.Trim())).Where(f => !string.IsNullOrEmpty(f.SCORE_ID)).Where(d => !string.IsNullOrEmpty(d.METER_TYPE)).ToList().Where(y => y.METER_TYPE == "Электроэнергия").ToList(); 
                            #endregion


                            /*   .Replace("T1-", "")//ru
                                .Replace("T1-", "")//en

                                .Replace("T2-", "")//ru
                                .Replace("T2-", "")//en

                                 .Replace("T3-", "")//ru
                                .Replace("T3-", "")//en


                                   .Replace("Т1-", "")
                                .Replace("Т2-", "")
                                .Replace("_x000D_", "")
                                .TrimStart()
                                .TrimStart()
                                .Replace(" ", "")
                                .Replace("\n", "")

*/
                            var dublicateDatas = dt.AsEnumerable()
                                .Select(x => new
                                {
                                    SCORE_ID = x.Field<string>("№ ЛС*"),
                                    METERS_NUMBER = x.Field<string>("Номер счетчика*"),
                                    METER_TYPE = x.Field<string>("Тип счетчика*"),
                                    AMUNT_TARIF = x.Field<string>("Количество тарифов**"),
                                    TARIF = x.Field<string>("Тариф**")
                                }).Where(y => y.METER_TYPE == "Электроэнергия").ToList();//.Where(s => !string.IsNullOrEmpty(s.METERS_NUMBER.Trim())).Where(f => !string.IsNullOrEmpty(f.SCORE_ID)).Where(d => !string.IsNullOrEmpty(d.METER_TYPE)).ToList().Where(y => y.METER_TYPE == "Электроэнергия").ToList();





                            dublicateDatas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID).ToList();


                            int MeterCount = dublicateDatas.Count;//get same counters by meter numbe

                            if (kolTarif.IndexOf('(') == -1)
                            {
                                if (MeterCount != Convert.ToInt32(kolTarif))
                                {
                                    mtr.AMUNT_TARIF = mtr.AMUNT_TARIF + " (Количество тарифов не соответствует количеству счетчиков)";
                                    currentSucc = false;
                                    elektro_success = false;
                                }
                                else
                                {

                                    int T1_count_eng = dublicateDatas.Count(x => x.TARIF.Contains("T1"));
                                    int T1_count_rus = dublicateDatas.Count(x => x.TARIF.Contains("Т1"));

                                    int T2_count_eng = dublicateDatas.Count(x => x.TARIF.Contains("T2"));
                                    int T2_count_rus = dublicateDatas.Count(x => x.TARIF.Contains("Т2"));

                                    int T3_count_eng = dublicateDatas.Count(x => x.TARIF.Contains("T3"));
                                    int T3_count_rus = dublicateDatas.Count(x => x.TARIF.Contains("Т3"));

                                  //  bool tSuccess = true;
                                    if (mtr.AMUNT_TARIF == "3")
                                    {

                                        if ((T1_count_rus < 1 || T1_count_rus > 1) && (T1_count_eng < 1 || T1_count_eng > 1))
                                        {

                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }

                                        }
                                        if ((T2_count_rus < 1 || T2_count_rus > 1) && (T2_count_eng < 1 || T2_count_eng > 1))
                                        {

                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }

                                        }

                                        if ((T3_count_rus < 1 || T3_count_rus > 1) && (T3_count_eng < 1 || T3_count_eng > 1))
                                        {
                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }


                                        }
                                    }

                                    if (mtr.AMUNT_TARIF == "2")
                                    {

                                        if ((T1_count_rus < 1 || T1_count_rus > 1) && (T1_count_eng < 1 || T1_count_eng > 1))
                                        {

                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }


                                        }
                                        if ((T2_count_rus < 1 || T2_count_rus > 1) && (T2_count_eng < 1 || T2_count_eng > 1))
                                        {

                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }


                                        }


                                    }
                                    if (mtr.AMUNT_TARIF == "1")
                                    {

                                        if ((T1_count_rus < 1 || T1_count_rus > 1) && (T1_count_eng < 1 || T1_count_eng > 1))
                                        {
                                            currentSucc = false;
                                            elektro_success = false;
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                mtr.TYPE_ID = mtr.TYPE_ID + " (У этого счетчика не для всех тарифов указаны показания)";
                                            }


                                        }
                                    }



                                }

                                if (mtr.AMUNT_TARIF.IndexOf('(') == -1)
                                {
                                    if (mtr.TYPE_ID.IndexOf('(') == -1)
                                    {
                                        var T1_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T1" || r.TARIF == "Т1")).ToList();
                                        //ENG                //RUS
                                        if (T1_datas.Count > 1 || T1_datas.Count < 1)
                                        {
                                            if (mtr.TYPE_ID.IndexOf('(') == -1)
                                            {
                                                if (mtr.TYPE_ID == "T1" || mtr.TYPE_ID == "Т1")
                                                {
                                                    mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T1\" не уникально)";

                                                    currentSucc = false;
                                                }
                                            }
                                        }
                                        if (kolTarif == "2")
                                        {
                                            var T2_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T2" || r.TARIF == "Т2")).ToList();
                                            //eng               //rus
                                            if (T2_datas.Count > 1 || T2_datas.Count < 1)
                                            {
                                                if (mtr.TYPE_ID.IndexOf('(') == -1)
                                                {
                                                    if (mtr.TYPE_ID == "T2" || mtr.TYPE_ID == "Т2")
                                                    {
                                                        mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T2\" не уникально)";

                                                        currentSucc = false;
                                                    }
                                                }
                                            }
                                        }
                                        if (kolTarif == "3")
                                        {
                                            var T3_datas = dublicateDatas.Where(r => r.METERS_NUMBER == mtr.METERS_NUMBER && r.SCORE_ID == mtr.SCORE_ID && r.AMUNT_TARIF == mtr.AMUNT_TARIF && (r.TARIF == "T3" || r.TARIF == "Т3")).ToList();
                                            //eng               //rus
                                            if (T3_datas.Count > 1 || T3_datas.Count < 1)
                                            {
                                                if (mtr.TYPE_ID.IndexOf('(') == -1)
                                                {
                                                    if (mtr.TYPE_ID == "T3" || mtr.TYPE_ID == "Т3")
                                                    {
                                                        mtr.TYPE_ID = mtr.TYPE_ID + " (счетчики электроэнергии, имя тариф \"T3\" не уникально)";

                                                        currentSucc = false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    }

                    mtr.OBJECT_ID = dt.Rows[i][5].ToString();//Начальное показание
                    if (mtr.OBJECT_ID.Length == 0)
                    {
                        mtr.OBJECT_ID = "(Заполните поле)";
                        currentSucc = false;
                    }
                    else
                    {

                        if (mtr.OBJECT_ID.IndexOf('.') != -1)
                        {
                            // mtr.OBJECT_ID=Convert.ToDouble

                            double a = double.Parse(mtr.OBJECT_ID, CultureInfo.InvariantCulture);
                            a = (double)Math.Round(a, 3);
                            mtr.OBJECT_ID = a.ToString();
                            mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');


                        }
                        if (mtr.OBJECT_ID.IndexOf(',') != -1)
                        {
                            mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');
                            double a = double.Parse(mtr.OBJECT_ID, CultureInfo.InvariantCulture);
                            a = (double)Math.Round(a, 3);
                            mtr.OBJECT_ID = a.ToString();
                            mtr.OBJECT_ID = mtr.OBJECT_ID.Replace(',', '.');
                        }
                        if (mtr.TYPE != "Электроэнергия")
                        {

                            if (mtr.METERS_NUMBER.IndexOf('(') == -1)
                            {
                                int isBigger = (int)Mydb.ExecuteScalar("[Check_Mass_Counter_datas]", new SqlParameter[] { new SqlParameter("@proc_Type", 6), new SqlParameter("@Curr_value", mtr.OBJECT_ID), new SqlParameter("@mn", mtr.METERS_NUMBER) }, CommandType.StoredProcedure);

                                if (isBigger == 0)
                                {
                                    currentSucc = false;
                                    mtr.OBJECT_ID = mtr.OBJECT_ID + "  (Текущие показания не могут быть меньше показаний, внесенных в прошлом месяце)";
                                }
                            }
                        }
                        else
                        {
                            if (mtr.TYPE_ID.IndexOf('(') == -1 && mtr.OBJECT_ID.IndexOf('(') == -1 && mtr.METERS_NUMBER.IndexOf('(') == -1)
                            {
                                int isBigger = (int)Mydb.ExecuteScalar("[Check_Mass_Counter_datas]", new SqlParameter[] { new SqlParameter("@proc_Type", 7), new SqlParameter("@Curr_value", mtr.OBJECT_ID), new SqlParameter("@mn", mtr.METERS_NUMBER), new SqlParameter("@tarif", mtr.TYPE_ID) }, CommandType.StoredProcedure);

                                if (isBigger == 0)
                                {
                                    currentSucc = false;
                                    elektro_success = false;
                                    mtr.OBJECT_ID = mtr.OBJECT_ID + "  (Текущие показания не могут быть меньше показаний, внесенных в прошлом месяце)";
                                }

                            }
                        }

                    }


                    DateTime today = DateTime.Today;
                    mtr.ROOM_TYPE = dt.Rows[i][6].ToString();//Дата показания
                    string today_ = today.ToString("dd.MM.yyyy");
                    int countofDots = CountOf(mtr.ROOM_TYPE, '.');
                    #region eampleFor_date
                    /* DateTime DateTime_ = DateTime.Today;
                     string today= DateTime_.ToString("dd.MM.yyyy");
                     if (dateControlFor== "PREVIOUS_DATE")
                     {
                         if (ComputeBiggerDate(_DATE, today, '.')==1)
                         {
                             IsTrue = _DATE + " (Дата последней поверки не может быть позже текущей даты)";
                         }
                         //if (PREVIOUS_DATE_ > today)
                         //{
                         //    mtr.PREVIOUS_DATE = mtr.PREVIOUS_DATE + "(Дата последней поверки не может быть позже текущей даты)";
                         //    currentSucc = false;
                         //}
                     }*/
                    #endregion
                    if (countofDots == 2)
                    {

                        if (ComputeBiggerDate(mtr.ROOM_TYPE, today_, '.') == 1)
                        {
                            mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Дата внесения показаний не может быть позже текущей даты)";
                            currentSucc = false;
                        }

                    }
                    else if (countofDots == 0)
                    {
                        /*  mtr.PREVIOUS_DATE = DateTime.FromOADate(double.Parse(mtr.PREVIOUS_DATE)).ToString("dd.MM.yyyy");*/
                        mtr.ROOM_TYPE = DateTime.FromOADate(double.Parse(mtr.ROOM_TYPE)).ToString("dd.MM.yyyy");

                        if (ComputeBiggerDate(mtr.ROOM_TYPE, today_, '.') == 1)
                        {
                            mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Дата внесения показаний не может быть позже текущей даты)";
                            currentSucc = false;
                        }

                    }
                    //double ROOM_TYPE;
                    //if (mtr.ROOM_TYPE.Length != 0)
                    //{
                    //    if (double.TryParse(mtr.ROOM_TYPE, out ROOM_TYPE))
                    //    {
                    //        int dot_count = Regex.Matches(mtr.ROOM_TYPE, "[.]").Count;
                    //        if (dot_count == 0)
                    //        {
                    //            mtr.ROOM_TYPE = DateTime.FromOADate(ROOM_TYPE).ToString();
                    //            mtr.ROOM_TYPE = mtr.ROOM_TYPE.Substring(0, 10);
                    //        }
                    //        DateTime ROOM_TYPE_ = DateTime.Parse(mtr.ROOM_TYPE);
                    //        if (ROOM_TYPE_ > today)
                    //        {
                    //            mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Дата внесения показаний не может быть позже текущей даты)";
                    //            currentSucc = false;
                    //        }

                    //    }
                    //    else
                    //    {
                    //        mtr.ROOM_TYPE = mtr.ROOM_TYPE + " (Некорректное значение)";
                    //    }
                    //}
                    //else
                    //{
                    //    mtr.ROOM_TYPE = "(Заполните поле)";
                    //    currentSucc = false;
                    //}

                    #endregion
                    if (elektro_success == false)
                    {
                        IndiCElektro.Add(mtr);
                    }

                    if (currentSucc == true)
                    {

                        IndicTrue.Add(mtr);

                    }
                    else

                    {

                        IndicFalse.Add(mtr);

                    }
                }

            }
            if (IndiCElektro.Count != 0)
            {
                IndicFalse.AddRange(IndicTrue.Where(x => IndiCElektro.Any(x2 => x2.METERS_NUMBER == x.METERS_NUMBER)).ToList());
                IndicTrue = IndicTrue.Where(x => IndiCElektro.Any(x2 => x2.METERS_NUMBER != x.METERS_NUMBER)).ToList();
            }
            JavaScriptSerializer j_true = new JavaScriptSerializer();
            j_true.Serialize(IndicTrue);

            //JavaScriptSerializer j_false = new JavaScriptSerializer();
            //j_false.Serialize(mtrsFalse);
            string excel_name = Give_error_excel_IndiCations(objId, IndicFalse);
            return "{\"result\":\"Ok\",\"mtrsTrue\":" + j_true.Serialize(IndicTrue) + ",\"mtrsFalse\":\"" + excel_name + "\",\"mtrsFalse_count\":\"" + IndicFalse.Count + "\"}";

        }
        static public int CountOf(string str, char ch)
        {
            int counter = 0;
            foreach (char a in str)
            {
                if (a == ch)
                {
                    counter++;
                }
            }
            return counter;
        }
        public static string Give_error_excel_IndiCations(int obj, List<METERS> flsMeters)
        {

            string returnVal = "";
            if (flsMeters.Count != 0)
            {
                string guid = Guid.NewGuid().ToString();
                string strFilePath = @"C:\inetpub\wwwroot\Files\Error_Excel\IndiCations_(Object_" + obj + ")_Error_Excel_" + guid + ".xlsx";
                using (var workbook = new XLWorkbook())
                {

                    #region ExcelHeader
                    var worksheet = workbook.Worksheets.Add("Sample Sheet");

                    worksheet.Cell("A1").Value = "№ ЛС*";
                    worksheet.Cell("A1").Style.Font.Bold = true;
                    worksheet.Cell("A1").Style.Font.FontColor = XLColor.Red;
                    worksheet.Column("A").CellsUsed().SetDataType(XLDataType.Text);

                    worksheet.Column("B").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("B1").Value = "Номер счетчика*";
                    worksheet.Cell("B1").Style.Font.Bold = true;
                    worksheet.Cell("B1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("C").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("C1").Value = "Тип счетчика*";
                    worksheet.Cell("C1").Style.Font.Bold = true;
                    worksheet.Cell("C1").Style.Font.FontColor = XLColor.Red;

                    worksheet.Column("D").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("D1").Value = "Количество тарифов**";
                    worksheet.Cell("D1").Style.Font.Bold = true;
                    worksheet.Cell("D1").Style.Font.FontColor = XLColor.Red;





                    worksheet.Column("E").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("E1").Value = "Тариф**";
                    worksheet.Cell("E1").Style.Font.Bold = true;
                    worksheet.Cell("E1").Style.Font.FontColor = XLColor.Red;

                    worksheet.Column("F").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("F1").Value = "Показания*";
                    worksheet.Cell("F1").Style.Font.Bold = true;
                    worksheet.Cell("F1").Style.Font.FontColor = XLColor.Red;


                    worksheet.Column("G").CellsUsed().SetDataType(XLDataType.Text);
                    worksheet.Cell("G1").Value = "Дата внесения показаний*";
                    worksheet.Cell("G1").Style.Font.Bold = true;
                    worksheet.Cell("G1").Style.Font.FontColor = XLColor.Red;
                    #endregion
                    for (int i = 0; i < flsMeters.Count; i++)
                    {
                        int cellNumber = i + 2;
                        worksheet.Cell("A" + cellNumber.ToString() + "").Value = flsMeters[i].SCORE_ID;//№ ЛС*
                        worksheet.Cell("A" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("B" + cellNumber.ToString() + "").Value = flsMeters[i].METERS_NUMBER;//Номер счетчика*
                        worksheet.Cell("B" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("C" + cellNumber.ToString() + "").Value = flsMeters[i].TYPE;//Тип счетчика*
                        worksheet.Cell("C" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("D" + cellNumber.ToString() + "").Value = flsMeters[i].AMUNT_TARIF;//Количество тарифов**
                        worksheet.Cell("D" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;



                        worksheet.Cell("E" + cellNumber.ToString() + "").Value = flsMeters[i].TYPE_ID;//Тариф**
                        worksheet.Cell("E" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("F" + cellNumber.ToString() + "").Value = flsMeters[i].OBJECT_ID;//Начальное показание*
                        worksheet.Cell("F" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                        worksheet.Cell("G" + cellNumber.ToString() + "").Value = flsMeters[i].ROOM_TYPE;//Дата показания*
                        worksheet.Cell("G" + cellNumber.ToString() + "").Style.Font.FontColor = XLColor.Red;

                    }
                    var rngTable = worksheet.Range("A1:G1");
                    rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Columns().AdjustToContents();
                    workbook.SaveAs(strFilePath);
                    returnVal = "IndiCations_(Object_" + obj + ")_Error_Excel_" + guid + ".xlsx";

                }

            }
            else
            {
                returnVal = "0";
            }
            return returnVal;
        }
        [WebMethod]

        public static string AddCounterValue_mass(List<METERS> trueValues)
        {
            foreach (var item in trueValues)
            {

                item.OBJECT_ID = item.OBJECT_ID.Replace(",", ".");
                Mydb.ExecuteNoNQuery("AddCounterValue_mass", new SqlParameter[] {
                new SqlParameter("@METER_NUMBER",item.METERS_NUMBER),
                new SqlParameter("@SCORE_ID",item.SCORE_ID),
                new SqlParameter("@TYPE",item.TYPE),
                new SqlParameter("@DATE_",item.ROOM_TYPE),
                  new SqlParameter("@VALUE_",item.OBJECT_ID),


            }, CommandType.StoredProcedure);
            }


            return "";

        }
        [WebMethod]
        public static string makeMeterFilter(int lg, List<MeterFilter> Mflt, string arx, int objId)
        {
            List<METERS> ms = new List<METERS>();
            if (arx == "1")
            {
                foreach (var item in Mflt)
                {
                    foreach (var itemRMType in item.RM_TYPE)
                    {
                        foreach (var itemMTYpe in item.M_TYPE)
                        {
                            itemRMType.ROOM_TYPE_ID = (itemRMType.ROOM_TYPE_ID == "0") ? null : itemRMType.ROOM_TYPE_ID;
                            item.ROOM_NUMBER = (item.ROOM_NUMBER == "0") ? null : item.ROOM_NUMBER;
                            itemMTYpe.TYPE_ID = (itemMTYpe.TYPE_ID == "0") ? null : itemMTYpe.TYPE_ID;
                            item.NUMBER = (item.NUMBER == "0") ? null : item.NUMBER;
                            item.METER_NUMBER = (item.METER_NUMBER == "0") ? null : item.METER_NUMBER;
                            DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_MetersFiltering", new SqlParameter[] {
                new SqlParameter("@LOG_IN_ID",lg),
                new SqlParameter("@ROOM_TYPE_ID",itemRMType.ROOM_TYPE_ID),
                new SqlParameter("@ROOM_NUMBER",item.ROOM_NUMBER),
                new SqlParameter("@TYPE_ID",itemMTYpe.TYPE_ID),
                new SqlParameter("@SCORE_ID", item.NUMBER),
                new SqlParameter("@METERS_NUMBER",item.METER_NUMBER),
                new SqlParameter("@objId",objId)
               // ,new SqlParameter("@arx","1")
            }, CommandType.StoredProcedure);
                            foreach (DataRow itemdt in dt.Rows)
                            {
                                METERS m = new METERS();
                                m.AMUNT_TARIF = itemdt["AMUNT_TARIF"].ToString();
                                m.LOG_IN_ID = itemdt["LOG_IN_ID"].ToString();
                                m.METERS_ID = itemdt["METERS_ID"].ToString();
                                m.METERS_NUMBER = itemdt["METERS_NUMBER"].ToString();
                                m.NEXT_DATE = itemdt["NEXT_DATE"].ToString();
                                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                                m.OBJECT_ID = itemdt["OBJECT_ID"].ToString();
                                m.PREVIOUS_DATE = itemdt["PREVIOUS_DATE"].ToString();
                                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);

                                m.ROOM_NUMBER = itemdt["ROOM_NUMBER2"].ToString();
                                m.ROOM_TYPE = itemdt["ROOM_TYPE"].ToString();
                                m.ROOM_TYPE_ID = itemdt["ROOM_TYPE_ID2"].ToString();
                                m.SCORE_ID = itemdt["SCORE_ID"].ToString();
                                m.TYPE = itemdt["TYPE"].ToString();
                                m.TYPE_ID = itemdt["TYPE"].ToString();
                                m.OBJECT_ADRESS = itemdt["OBJECT_ADRESS"].ToString();
                                ms.Add(m);
                            }

                        }
                    }
                }
            }
            else
            {
                foreach (var item in Mflt)
                {
                    foreach (var itemRMType in item.RM_TYPE)
                    {
                        foreach (var itemMTYpe in item.M_TYPE)
                        {
                            itemRMType.ROOM_TYPE = (itemRMType.ROOM_TYPE == "0") ? null : itemRMType.ROOM_TYPE;
                            item.ROOM_NUMBER = (item.ROOM_NUMBER == "0") ? null : item.ROOM_NUMBER;
                            itemMTYpe.TYPE_ID = (itemMTYpe.TYPE_ID == "0") ? null : itemMTYpe.TYPE_ID;
                            item.NUMBER = (item.NUMBER == "0") ? null : item.NUMBER;
                            item.METER_NUMBER = (item.METER_NUMBER == "0") ? null : item.METER_NUMBER;
                            DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_MetersFiltering", new SqlParameter[] {
                new SqlParameter("@LOG_IN_ID",lg),
                new SqlParameter("@ROOM_TYPE_ID",itemRMType.ROOM_TYPE),
                new SqlParameter("@ROOM_NUMBER",item.ROOM_NUMBER),
                new SqlParameter("@TYPE_ID",itemMTYpe.TYPE_ID),
                new SqlParameter("@SCORE_ID", item.NUMBER),
                new SqlParameter("@METERS_NUMBER",item.METER_NUMBER)
               ,new SqlParameter("@arx","0"),
                new SqlParameter("@objId",objId)

            }, CommandType.StoredProcedure);
                            foreach (DataRow itemdt in dt.Rows)
                            {
                                METERS m = new METERS();
                                m.AMUNT_TARIF = itemdt["AMUNT_TARIF"].ToString();
                                m.LOG_IN_ID = itemdt["LOG_IN_ID"].ToString();
                                m.METERS_ID = itemdt["METERS_ID"].ToString();
                                m.METERS_NUMBER = itemdt["METERS_NUMBER"].ToString();
                                m.NEXT_DATE = itemdt["NEXT_DATE"].ToString();
                                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                                m.OBJECT_ID = itemdt["OBJECT_ID"].ToString();
                                m.PREVIOUS_DATE = itemdt["PREVIOUS_DATE"].ToString();
                                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);

                                m.ROOM_NUMBER = itemdt["ROOM_NUMBER2"].ToString();
                                m.ROOM_TYPE = itemdt["ROOM_TYPE"].ToString();
                                m.ROOM_TYPE_ID = itemdt["ROOM_TYPE_ID2"].ToString();
                                m.SCORE_ID = itemdt["SCORE_ID"].ToString();
                                m.TYPE = itemdt["TYPE"].ToString();
                                m.TYPE_ID = itemdt["TYPE"].ToString();
                                m.OBJECT_ADRESS = itemdt["OBJECT_ADRESS"].ToString();
                                ms.Add(m);
                            }

                        }
                    }
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
            #region OldFIltering
            //if (arx == "1")
            //{
            //    ROOM_TYPE_ID = (ROOM_TYPE_ID == "0") ? null : ROOM_TYPE_ID;
            //    ROOM_NUMBER = (ROOM_NUMBER == "0") ? null : ROOM_NUMBER;
            //    TYPE_ID = (TYPE_ID == "0") ? null : TYPE_ID;
            //    SCORE_ID = (SCORE_ID == "0") ? null : SCORE_ID;
            //    METERS_NUMBER = (METERS_NUMBER == "0") ? null : METERS_NUMBER;

            //    DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_MetersFiltering", new SqlParameter[] {
            //    new SqlParameter("@LOG_IN_ID",lg),
            //    new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
            //    new SqlParameter("@TYPE_ID",TYPE_ID),
            //    new SqlParameter("@SCORE_ID",SCORE_ID),
            //    new SqlParameter("@METERS_NUMBER",METERS_NUMBER)
            //    ,new SqlParameter("@arx","0")
            //}, CommandType.StoredProcedure);
            //    List<METERS> ms = new List<METERS>();

            //    foreach (DataRow item in dt.Rows)
            //    {
            //        METERS m = new METERS();
            //        m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
            //        m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
            //        m.METERS_ID = item["METERS_ID"].ToString();
            //        m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
            //        m.NEXT_DATE = item["NEXT_DATE"].ToString();
            //        m.OBJECT_ID = item["OBJECT_ID"].ToString();
            //        m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
            //        m.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //        m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
            //        m.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
            //        m.SCORE_ID = item["SCORE_ID"].ToString();
            //        m.TYPE = item["TYPE"].ToString();
            //        m.TYPE_ID = item["TYPE"].ToString();
            //        ms.Add(m);
            //    }
            //    JavaScriptSerializer js = new JavaScriptSerializer();
            //    return js.Serialize(ms);
            //}
            //else
            //{
            //    ROOM_TYPE_ID = (ROOM_TYPE_ID == "0") ? null : ROOM_TYPE_ID;
            //    ROOM_NUMBER = (ROOM_NUMBER == "0") ? null : ROOM_NUMBER;
            //    TYPE_ID = (TYPE_ID == "0") ? null : TYPE_ID;
            //    SCORE_ID = (SCORE_ID == "0") ? null : SCORE_ID;
            //    METERS_NUMBER = (METERS_NUMBER == "0") ? null : METERS_NUMBER;

            //    DataTable dt = Mydb.ExecuteReadertoDataTable("uspo_MetersFiltering", new SqlParameter[] {
            //    new SqlParameter("@LOG_IN_ID",lg),
            //    new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
            //    new SqlParameter("@TYPE_ID",TYPE_ID),
            //    new SqlParameter("@SCORE_ID",SCORE_ID),
            //    new SqlParameter("@METERS_NUMBER",METERS_NUMBER)
            //}, CommandType.StoredProcedure);
            //    List<METERS> ms = new List<METERS>();

            //    foreach (DataRow item in dt.Rows)
            //    {
            //        METERS m = new METERS();
            //        m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
            //        m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
            //        m.METERS_ID = item["METERS_ID"].ToString();
            //        m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
            //        m.NEXT_DATE = item["NEXT_DATE"].ToString();
            //        m.OBJECT_ID = item["OBJECT_ID"].ToString();
            //        m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
            //        m.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
            //        m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
            //        m.ROOM_TYPE_ID = item["ROOM_TYPE_ID"].ToString();
            //        m.SCORE_ID = item["SCORE_ID"].ToString();
            //        m.TYPE = item["TYPE"].ToString();
            //        m.TYPE_ID = item["TYPE"].ToString();
            //        ms.Add(m);
            //    }
            //    JavaScriptSerializer js = new JavaScriptSerializer();
            //    return js.Serialize(ms);
            //    ///////////////////////////

            //}

            #endregion

        }
        [WebMethod]
        public static string GetMetersByObj(int lg, int o)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from VW_METERS where LOG_IN_ID=@lg and ARXIV=0 and OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@o", o) }, CommandType.Text);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);


                m.ROOM_NUMBER = item["ROOM_NUMBER2"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID2"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE_ID"].ToString();
                m.OBJECT_ADRESS = item["OBJECT_ADRESS"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string GetMeters(int lg)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("GetMeters_Manager", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.StoredProcedure);
            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);

                m.ROOM_NUMBER = item["ROOM_NUMBER2"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID2"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE_ID"].ToString();
                m.OBJECT_ADRESS = item["OBJECT_ADRESS"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = int.MaxValue;
            return js.Serialize(ms);

            // return //Mydb.ExecuteAsJson("GetMeters_Manager", new SqlParameter[] {new SqlParameter("@lg",lg) }, CommandType.StoredProcedure); 
        }
        [WebMethod]
        public static string GetArxMeters(int lg, int objId)
        {
            DataTable dt = null;

            if (objId == 0)
            {
                dt = Mydb.ExecuteReadertoDataTable("select * from VW_METERS where LOG_IN_ID=@lg and ARXIV=1 and METERS_ID not in (select METER_ID from STOPED_METERS) order by METERS_ID desc", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text);
            }
            else
            {
                dt = Mydb.ExecuteReadertoDataTable("select * from VW_METERS where LOG_IN_ID=@lg and [OBJECT_ID]=@objId and ARXIV=1 and METERS_ID not in (select METER_ID from STOPED_METERS) order by METERS_ID desc", new SqlParameter[] { new SqlParameter("@lg", lg), new SqlParameter("@objId", objId) }, CommandType.Text);
            }



            List<METERS> ms = new List<METERS>();

            foreach (DataRow item in dt.Rows)
            {
                METERS m = new METERS();
                m.AMUNT_TARIF = item["AMUNT_TARIF"].ToString();
                m.LOG_IN_ID = item["LOG_IN_ID"].ToString();
                m.METERS_ID = item["METERS_ID"].ToString();
                m.METERS_NUMBER = item["METERS_NUMBER"].ToString();
                m.NEXT_DATE = item["NEXT_DATE"].ToString();
                m.NEXT_DATE = m.NEXT_DATE.Substring(0, 10);

                m.OBJECT_ID = item["OBJECT_ID"].ToString();
                m.PREVIOUS_DATE = item["PREVIOUS_DATE"].ToString();
                m.PREVIOUS_DATE = m.PREVIOUS_DATE.Substring(0, 10);

                m.ROOM_NUMBER = item["ROOM_NUMBER2"].ToString();
                m.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                m.ROOM_TYPE_ID = item["ROOM_TYPE_ID2"].ToString();
                m.SCORE_ID = item["SCORE_ID"].ToString();
                m.TYPE = item["TYPE"].ToString();
                m.TYPE_ID = item["TYPE"].ToString();
                m.OBJECT_ADRESS = item["OBJECT_ADRESS"].ToString();
                ms.Add(m);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string SaveMETER(int ROOM_TYPE_ID, int OBJECT_ID, string ROOM_NUMBER, string SCORE_ID, string METERS_NUMBER, int TYPE_ID, int AMUNT_TARIF, string PREVIOUS_DATE, string NEXT_DATE, string InitialDate, string file, List<MeterValue> METERS_VALUES, string IS_AUTO)
        {
            string guid = Guid.NewGuid().ToString();
            DateTime next = DateTime.ParseExact(NEXT_DATE, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime previous = DateTime.ParseExact(PREVIOUS_DATE, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            Mydb.ExecuteNoNQuery("TestDB.dbo.usp_QUICK_API_add_new_counter2lk", new SqlParameter[] { new SqlParameter("@SCORE_ID", SCORE_ID), new SqlParameter("@METERS_NUMBER", METERS_NUMBER), new SqlParameter("@AMUNT_TARIF", AMUNT_TARIF), new SqlParameter("@PREVIOUS_DATE", previous), new SqlParameter("@NEXT_DATE", next), new SqlParameter("@TYPE_ID", TYPE_ID), new SqlParameter("@OBJECT_ID", OBJECT_ID), new SqlParameter("@LOTUS_GUID", guid) }, CommandType.StoredProcedure);

            //string score_guid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", SCORE_ID) }, CommandType.Text).ToString();SCORE_GUID @score_guid new SqlParameter("@score_guid",score_guid)
            #region oldStructure
            //Mydb.ExecuteNoNQuery("insert into METERS (ROOM_TYPE_ID,SCORE_ID,METERS_NUMBER,AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,OBJECT_ID,ARXIV,LOTUS_GUID,IS_AUTO) values(@ROOM_TYPE_ID,@SCORE_ID,@METERS_NUMBER,@AMUNT_TARIF,Cast(@PREVIOUS_DATE as date),cast(@NEXT_DATE as date),@TYPE_ID,@ROOM_NUMBER,@OBJECT_ID,'0',@g,@IS_AUTO)", new SqlParameter[] {
            //    new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
            //    new SqlParameter("@SCORE_ID",SCORE_ID),
            //    new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
            //    new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
            //    new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
            //    new SqlParameter("@NEXT_DATE",NEXT_DATE),
            //    new SqlParameter("@TYPE_ID",TYPE_ID),
            //    new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
            //    new SqlParameter("@OBJECT_ID",OBJECT_ID),
            //    new SqlParameter("@g",guid),
            //    new SqlParameter("@IS_AUTO",IS_AUTO),

            //}, CommandType.Text); 
            #endregion
            #region NewStructure
            string score_guid = Mydb.ExecuteScalar("select ID from PER_SCORE where SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@sc", SCORE_ID) }, CommandType.Text).ToString();
            Mydb.ExecuteNoNQuery("insert into METERS (ROOM_TYPE_ID,SCORE_ID,METERS_NUMBER,AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,OBJECT_ID,ARXIV,LOTUS_GUID,IS_AUTO,SCORE_GUID) values(@ROOM_TYPE_ID,@SCORE_ID,@METERS_NUMBER,@AMUNT_TARIF,Cast(@PREVIOUS_DATE as date),cast(@NEXT_DATE as date),@TYPE_ID,@ROOM_NUMBER,@OBJECT_ID,'0',@g,@IS_AUTO,@score_guid)", new SqlParameter[] {
                new SqlParameter("@ROOM_TYPE_ID",ROOM_TYPE_ID),
                new SqlParameter("@SCORE_ID",SCORE_ID),
                new SqlParameter("@METERS_NUMBER",METERS_NUMBER),
                new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
                new SqlParameter("@PREVIOUS_DATE",PREVIOUS_DATE),
                new SqlParameter("@NEXT_DATE",NEXT_DATE),
                new SqlParameter("@TYPE_ID",TYPE_ID),
                new SqlParameter("@ROOM_NUMBER",ROOM_NUMBER),
                new SqlParameter("@OBJECT_ID",OBJECT_ID),
                new SqlParameter("@g",guid),
                new SqlParameter("@IS_AUTO",IS_AUTO),
                new SqlParameter("@score_guid",score_guid)
            }, CommandType.Text);
            #endregion




            int LastMeterId = (int)Mydb.ExecuteScalar("select top 1 METERS_ID from METERS order by METERS_ID desc", new SqlParameter[] { }, CommandType.Text);
            //if (file!="")
            //{
            //    Mydb.ExecuteNoNQuery("insert into METERS_HISTORY(FILE_,METERS_ID) values(@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@file", file), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
            //}
            Mydb.ExecuteNoNQuery(@"insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),'Добавлен новый счетчик <' + (CONVERT(nvarchar(max), (select METERS_NUMBER from METERS where METERS_ID = @METERS_I_D))) + '> ',(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from OBJECT where OBJECT_ID =@objId)),@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@METERS_I_D", LastMeterId), new SqlParameter("@objId", OBJECT_ID), new SqlParameter("@file", file), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);

            List<string> values = new List<string>();
            foreach (MeterValue item in METERS_VALUES)
            {
                if (TYPE_ID != 4)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V", item.VALUE_), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                else
                {
                    values.Add(item.VALUE_.ToString());
                }

            }
            if (TYPE_ID == 4)
            {
                if (values.Count == 3)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@V3,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@V2", values[1]), new SqlParameter("@V3", values[2]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                if (values.Count == 2)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@V2", values[1]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
                if (values.Count == 1)
                {
                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V1,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", InitialDate), new SqlParameter("@V1", values[0]), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                }
            }

            return "";
        }
        [WebMethod]
        public static string SaveMeterMass(int obj, List<METERS> mtrs, List<METERS> elekts, int lg)
        {

            Stopwatch sw = new Stopwatch();
            sw.Start();
            int mtrs_i = 0;
            foreach (METERS item in mtrs)
            {
                mtrs_i = mtrs_i + 1;
                int ScoreIdC = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 2), new SqlParameter("@sc", item.SCORE_ID), new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
                int MetersNumC = (int)Mydb.ExecuteScalar("Check_Mass_Counter_datas", new SqlParameter[] { new SqlParameter("@proc_Type", 3), new SqlParameter("@mn", item.METERS_NUMBER), new SqlParameter("@sc", item.SCORE_ID), new SqlParameter("@obj", obj) }, CommandType.StoredProcedure);
                // if (ScoreIdC!=0 &&MetersNumC==0)
                // {
                //if (mtrs_i== 1564)
                //{
                //    string bell = "bell";
                //}
                //if (item.OBJECT_ID.IndexOf(',')!=-1)
                //{
                //    item.OBJECT_ID = item.OBJECT_ID.Replace(',', '.');

                //}
                int AMUNT_TARIF = (string.IsNullOrEmpty(item.AMUNT_TARIF)) ? 1 : Convert.ToInt32(item.AMUNT_TARIF);
                //decimal OBJECT_ID = decimal.Parse(item.OBJECT_ID, CultureInfo.InvariantCulture);
                Mydb.ExecuteNoNQuery("SaveMeter_Mass", new SqlParameter[] {


                new SqlParameter("@SCORE_ID",item.SCORE_ID),
                new SqlParameter("@METERS_NUMBER",item.METERS_NUMBER),
                new SqlParameter("@AMUNT_TARIF",Convert.ToInt32(AMUNT_TARIF)),
                new SqlParameter("@PREVIOUS_DATE",item.PREVIOUS_DATE),
                new SqlParameter("@NEXT_DATE",item.NEXT_DATE),
                new SqlParameter("@TYPE_ID",Convert.ToInt32(item.TYPE_ID)),
                new SqlParameter("@OBJECT_ID",obj),
                new SqlParameter("@LOG_IN_ID",lg),
                new SqlParameter("@DATE_",item.ROOM_TYPE),
                new SqlParameter("@VALUE_",item.OBJECT_ID)
                    }, CommandType.StoredProcedure);


                // }
            }
            int eleks_i = 0;
            foreach (METERS item in elekts)
            {
                eleks_i = eleks_i + 1;
                //if (item.OBJECT_ID.IndexOf(',') != -1)
                //{
                //    item.OBJECT_ID = item.OBJECT_ID.Replace(',', '.');

                //}

                //if (item.OBJECT_ID.IndexOf(',') != -1)
                //{
                //    item.OBJECT_ID = item.OBJECT_ID.Replace(',', '.');
                //    double a = double.Parse(item.OBJECT_ID, CultureInfo.InvariantCulture);
                //    a = (double)Math.Round(a, 15);
                //    item.OBJECT_ID = a.ToString();
                //    item.OBJECT_ID = item.OBJECT_ID.Replace(',', '.');
                //}
                //  decimal OBJECT_ID = decimal.Parse(item.OBJECT_ID, CultureInfo.InvariantCulture);
                int AMUNT_TARIF = (string.IsNullOrEmpty(item.AMUNT_TARIF)) ? 1 : Convert.ToInt32(item.AMUNT_TARIF);
                Mydb.ExecuteNoNQuery("SaveMeter_Mass", new SqlParameter[] {


                new SqlParameter("@SCORE_ID",item.SCORE_ID),
                new SqlParameter("@METERS_NUMBER",item.METERS_NUMBER),
                new SqlParameter("@AMUNT_TARIF",AMUNT_TARIF),
                new SqlParameter("@PREVIOUS_DATE",item.PREVIOUS_DATE),
                new SqlParameter("@NEXT_DATE",item.NEXT_DATE),
                new SqlParameter("@TYPE_ID",Convert.ToInt32(item.TYPE_ID)),
                new SqlParameter("@OBJECT_ID",obj),
                new SqlParameter("@LOG_IN_ID",lg),
                new SqlParameter("@DATE_",item.ROOM_TYPE),
                new SqlParameter("@VALUE_",item.OBJECT_ID),
                new SqlParameter("@TYPE",item.TYPE)
                    }, CommandType.StoredProcedure);
                #region olds
                //    int ScoreIdC = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where NUMBER=@sc and OBJECT_ID=@obj", new SqlParameter[] { new SqlParameter("@sc", item.SCORE_ID), new SqlParameter("@obj", obj) }, CommandType.Text);
                //    int MetersNumC = (int)Mydb.ExecuteScalar("select COUNT(*) from METERS where METERS_NUMBER=@mn", new SqlParameter[] { new SqlParameter("@mn", item.METERS_NUMBER) }, CommandType.Text);

                //    if (ScoreIdC!=0 && MetersNumC==0)
                //    {
                //        Mydb.ExecuteNoNQuery("insert into METERS (ROOM_TYPE_ID,SCORE_ID,METERS_NUMBER,AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,OBJECT_ID,ARXIV) values((select ROOM_TYPE_ID from ROOM where OBJECT_ID=@obj1 and ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=@sc1)),@SCORE_ID,@METERS_NUMBER,@AMUNT_TARIF,Cast(@PREVIOUS_DATE as date),cast(@NEXT_DATE as date),@TYPE_ID,(select ROOM_NUMBER from ROOM where OBJECT_ID=@obj2 and ROOM_ID=(select ROOM_ID from PER_SCORE where SCORE_ID=@sc2)),@OBJECT_ID,'0')", new SqlParameter[] {
                //    new SqlParameter("@obj1",obj),
                //    new SqlParameter("@sc1",item.SCORE_ID),
                //    new SqlParameter("@SCORE_ID",item.SCORE_ID),
                //    new SqlParameter("@METERS_NUMBER",item.METERS_NUMBER),
                //    new SqlParameter("@AMUNT_TARIF",item.AMUNT_TARIF),
                //    new SqlParameter("@PREVIOUS_DATE",item.PREVIOUS_DATE),
                //    new SqlParameter("@NEXT_DATE",item.NEXT_DATE),
                //    new SqlParameter("@TYPE_ID",item.TYPE),
                //    new SqlParameter("@sc2",item.SCORE_ID),
                //    new SqlParameter("@obj2",obj),
                //    new SqlParameter("@OBJECT_ID",obj)
                //}, CommandType.Text);
                //        int LastMeterId = (int)Mydb.ExecuteScalar("select top 1 METERS_ID from METERS order by METERS_ID desc", new SqlParameter[] { }, CommandType.Text);

                //        Mydb.ExecuteNoNQuery(@"insert into METERS_HISTORY(DATETIME,EVENT,AUTHOR,FILE_,METERS_ID) values( CONVERT(date, getdate()),'Добавлен новый счетчик <' + (CONVERT(nvarchar(max), (select METERS_NUMBER from METERS where METERS_ID = @METERS_I_D))) + '> ',(select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID = (select LOG_IN_ID from OBJECT where OBJECT_ID =@objId)),@file,@METERS_ID)", new SqlParameter[] { new SqlParameter("@METERS_I_D", LastMeterId), new SqlParameter("@objId", obj), new SqlParameter("@file", ""), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);

                //        //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);


                //    }
                //    string SLastMeterId2 = Mydb.ExecuteScalar("select METERS_ID from METERS where METERS_NUMBER=@mn", new SqlParameter[] { new SqlParameter("@mn", item.METERS_NUMBER) }, CommandType.Text).ToString() ;
                //    if (SLastMeterId2.Length!=0)
                //    {
                //        int LastMeterId2 = Convert.ToInt32(SLastMeterId2);
                //        int midC = (int)Mydb.ExecuteScalar("select COUNT(*) from METER_VALUE where METERS_ID=@mid", new SqlParameter[] { new SqlParameter("@mid", LastMeterId2) }, CommandType.Text);
                //        if (item.AMUNT_TARIF == "3")
                //        {

                //            //int val1 = Convert.ToInt32(elekts[0].OBJECT_ID);
                //            //int val2 = Convert.ToInt32(elekts[1].OBJECT_ID);
                //            //int val3 = Convert.ToInt32(elekts[2].OBJECT_ID);
                //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,VALUE_3,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@V3,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", elekts[0].ROOM_TYPE), new SqlParameter("@V1", val1), new SqlParameter("@V2", val2), new SqlParameter("@V3", val3), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);

                //            if (item.TYPE_ID.Contains("T1"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V1,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V1", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@val1", new SqlParameter[] { new SqlParameter("@val1", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //            if (item.TYPE_ID.Contains("T2"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values(CAST(@DATE_ as date),@V2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V2", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_2=@val2", new SqlParameter[] { new SqlParameter("@val2", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //            if (item.TYPE_ID.Contains("T3"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_3,METERS_ID) values(CAST(@DATE_ as date),@V3,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V3", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_3=@val3", new SqlParameter[] { new SqlParameter("@val3", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //        }
                //        if (item.AMUNT_TARIF == "2")
                //        {
                //            if (item.TYPE_ID.Contains("Т1"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V1,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V1", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@val1", new SqlParameter[] { new SqlParameter("@val1", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //            if (item.TYPE_ID.Contains("Т2"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_2,METERS_ID) values(CAST(@DATE_ as date),@V2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V2", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_2=@val2", new SqlParameter[] { new SqlParameter("@val2", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //            //int val1 = Convert.ToInt32(elekts[0].OBJECT_ID);
                //            //int val2 = Convert.ToInt32(elekts[1].OBJECT_ID);
                //            //// int val3 = Convert.ToInt32(elekts[2].OBJECT_ID);
                //            //Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,VALUE_2,METERS_ID) values(CAST(@DATE_ as date),@V1,@V2,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", elekts[0].ROOM_TYPE), new SqlParameter("@V1", val1), new SqlParameter("@V2", val2), new SqlParameter("@METERS_ID", LastMeterId) }, CommandType.Text);
                //        }
                //        if (item.AMUNT_TARIF == "1")
                //        {
                //            if (item.TYPE_ID.Contains("Т1"))
                //            {
                //                if (midC == 0)
                //                {
                //                    Mydb.ExecuteNoNQuery("insert into METER_VALUE(DATE_,VALUE_,METERS_ID) values(CAST(@DATE_ as date),@V1,@METERS_ID)", new SqlParameter[] { new SqlParameter("@DATE_", item.ROOM_TYPE), new SqlParameter("@V1", item.OBJECT_ID), new SqlParameter("@METERS_ID", LastMeterId2) }, CommandType.Text);
                //                }
                //                else
                //                {
                //                    Mydb.ExecuteNoNQuery("update METER_VALUE set VALUE_=@val1", new SqlParameter[] { new SqlParameter("@val1", item.OBJECT_ID) }, CommandType.Text);
                //                }
                //            }
                //        }
                //    }

                #endregion
            }
            sw.Stop();

            return "mtrs_i=" + mtrs_i.ToString() + "/eleks_i=" + eleks_i.ToString() + "";
        }
        [WebMethod]
        public static string CheckMeterNumber(string mn)
        {
            int Cmn = (int)Mydb.ExecuteScalar("select  COUNT(*) from METERS where METERS_NUMBER=@mn", new SqlParameter[] { new SqlParameter("@mn", mn) }, CommandType.Text);
            if (Cmn == 0)
            {
                return "{\"result\" : \"0\"}";
            }
            else
            {
                return "{\"result\" : \"1\"}";
            }
        }
        [WebMethod]
        public static string GetMeterTypes()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from METER_TYPE", new SqlParameter[] { }, CommandType.Text);
            List<Rooms> rs = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms r = new Rooms();
                r.FIRST_NAME = item["TYPE"].ToString();
                r.ROOM_ID = Convert.ToInt32(item["TYPE_ID"]);
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }

        [WebMethod]
        public static string getScoreId(int rmId)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select SCORE_ID from PER_SCORE where ROOM_ID=@rid and IS_DELETED=0", new SqlParameter[] { new SqlParameter("@rid", rmId) }, CommandType.Text);
            List<Rooms> rs = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms r = new Rooms();
                r.ROOM_FOR = item["SCORE_ID"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string getRoomNumber(int o, int st)
        {
            /*select ROOM_ID,ROOM_NUMBER from ROOM where OBJECT_ID=@o and ROOM_TYPE_ID=@st and IS_DELETED='0' ORDER BY CASE WHEN ISNUMERIC(ROOM_NUMBER) = 1 THEN CONVERT(INT, ROOM_NUMBER) ELSE 9999999 END*/
            DataTable dt = Mydb.ExecuteReadertoDataTable("getRoomNumberForCunters", new SqlParameter[] { new SqlParameter("@o", o), new SqlParameter("@st", st) }, CommandType.StoredProcedure);
            List<Rooms> rs = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms r = new Rooms();
                r.ROOM_ID = Convert.ToInt32(item["ROOM_ID"]);
                r.ROOM_NUMBER = item["ROOM_NUMBER"].ToString();
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);
        }

        [WebMethod]
        public static string GetRoomTypeByObjId(int O)
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROOM_TYPE where ROOM_TYPE_ID in (select ROOM_TYPE_ID from ROOM where OBJECT_ID=@o and IS_DELETED='0')", new SqlParameter[] { new SqlParameter("@o", O) }, CommandType.Text);
            List<Rooms> rs = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms r = new Rooms();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.ROOM_ID = Convert.ToInt32(item["ROOM_TYPE_ID"]);
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);
        }
        [WebMethod]
        public static string GetRoomType()
        {
            DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROOM_TYPE ", new SqlParameter[] { }, CommandType.Text);
            List<Rooms> rs = new List<Rooms>();
            foreach (DataRow item in dt.Rows)
            {
                Rooms r = new Rooms();
                r.ROOM_TYPE = item["ROOM_TYPE"].ToString();
                r.ROOM_ID = Convert.ToInt32(item["ROOM_TYPE_ID"]);
                rs.Add(r);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(rs);
        }


    }
}