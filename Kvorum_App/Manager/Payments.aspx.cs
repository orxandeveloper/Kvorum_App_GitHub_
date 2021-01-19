using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Kvorum_App.Manager.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class Payments : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public static string GetCellValue(SpreadsheetDocument document, Cell cell)
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
        public static  DataTable giveDataTableFromPaymentsExcel(string file)
        {
            DataTable dt=new DataTable();
            using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(@"C:\inetpub\wwwroot\Files\"+file, false))
            {

                WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                string relationshipId = sheets.First().Id.Value;
                WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);
                Worksheet workSheet = worksheetPart.Worksheet;
                SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                IEnumerable<Row> rows = sheetData.Descendants<Row>().Where(r=> !string.IsNullOrEmpty(r.InnerText));

                foreach (Cell cell in rows.ElementAt(0))
                {
                    dt.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                }

                foreach (Row row in rows) //this will also include your header row...
                {
                    DataRow tempRow = dt.NewRow();

                    for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                    {
                        tempRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                    }

                    dt.Rows.Add(tempRow);
                }

            }

            return dt;
        }
         [WebMethod]
        public static string ShowPayments(int lg,string file,int obj)
        {
            //string result = "";
            //string adres = @"C:\inetpub\wwwroot\Files\" + file + "";
            //adres = adres.Replace("~", "\\");
            //string extention = file.Substring(file.IndexOf('.') + 1);
            //bool success = true;//C:\inetpub\wwwroot\Files\" + file + "
            //string connStr = "";
            //if (extention == "xlsx")
            //{
            //    connStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + adres + ";Extended Properties='Excel 12.0;IMEX=1'";

            //}
            //if (extention == "xls")
            //{
            //    connStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + adres + ";Extended Properties='Excel 8.0;IMEX=1'";
            //}

            ////string connStr = @"SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0','Excel 12.0;Database=C:\inetpub\wwwroot\" + file + ";HDR=yes','Select * from [Лист1$]')";
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
            //    dt.Locale = CultureInfo.CurrentCulture;
            //    da.Fill(dt);
            //}
            string result = "";
            DataTable dt = giveDataTableFromPaymentsExcel(file);
            int dtrowsCOunt = dt.Rows.Count;
            bool success = true;

            List<Payment_Datas> pds = new List<Payment_Datas>();
            if (dt.Columns.Count>=8)
            {
                foreach (DataRow item in dt.Select())
                {
                    Payment_Datas pd = new Payment_Datas();

                    pd.SCORE_ID = item[0].ToString();

                    pd.PERIOD_M = item[1].ToString();

                    pd.SERVICE = item[2].ToString();

                    pd.TYPE = item[3].ToString();
                    pd.BBP = item[4].ToString();
                    pd.CHARGED = item[5].ToString();
                    pd.RECEIVED = item[6].ToString();
                    pd.TOTAL_P = item[7].ToString();
                    pds.Add(pd);

                } 
            }
                List<Payment_Datas_Errors> pdsErrors = new List<Payment_Datas_Errors>();
            List<Payment_Datas> PDSsucess= new List<Payment_Datas>();
            // string header0 = dt.Columns[0].ColumnName;
            //string header1 = dt.Columns[1].ColumnName;
            try
            {

                string header0 = dt.Columns[0].ColumnName  ;
                string header1 =  dt.Columns[1].ColumnName ;
                string header2 = dt.Columns[2].ColumnName ;
                string header3 = dt.Columns[3].ColumnName  ;
                string header4 = dt.Columns[4].ColumnName  ;
                string header5 = dt.Columns[5].ColumnName ;
                string header6 = dt.Columns[6].ColumnName  ;
                string header7 = dt.Columns[7].ColumnName ;
                 

                 

                #region CheckHeaders
                if (header0 != "№ ЛС*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок первой колонки " + header0 + ". Должно быть № ЛС*\"}";
                    goto end;
                }
                if (header1 != "Период*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок второй колонки " + header1 + ". Должно быть Период*\"}";
                    goto end;
                }
                if (header2 != "Услуга*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок третий колонки " + header2 + ". Должно быть Услуга*\"}";
                    goto end;
                }
                if (header3 != "Тип начисления/платежа*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок четвертый колонки " + header3 + ". Должно быть Тип начисления/платежа*\"}";
                    goto end;
                }
                if (header4 != "Остаток на начало периода")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок пятый колонки " + header4 + ". Должно быть Остаток на начало периода\"}";
                    goto end;
                }
                if (header5 != "Начислено*")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок шестой колонки " + header5 + ". Должно быть Начислено*\"}";
                    goto end;
                }
                if (header6 != "Поступило")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок седьмой колонки " + header6 + ". Должно быть Поступило\"}";
                    goto end;
                }
                if (header7 != "Остаток на конец периода")
                {
                    success = false;//"{\"result\" : \"2\"}";
                    result = "{\"result\" : \"Заголовок восьмой колонки " + header7 + ". Должно быть  Остаток на конец периода\"}";
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
             
                int num = 2;
                int row = 1;
            int rowCount = dt.Rows.Count;
            if (dt.Columns.Count>=8)
            {
                foreach (DataRow item in dt.Select())
                {//!string.IsNullOrEmpty(item[0].ToString())&& !string.IsNullOrEmpty(item[1].ToString()) && !string.IsNullOrEmpty(item[2].ToString()) && !string.IsNullOrEmpty(item[3].ToString())
                    if (item[0].ToString().Trim().Length != 0 || item[1].ToString().Trim().Length != 0 || item[2].ToString().Trim().Length != 0 || item[3].ToString().Trim().Length != 0)
                    {
                        if (item[0].ToString() != "№ ЛС*")
                        {
                            row++;
                            bool success_pds = true;
                            Payment_Datas pd = new Payment_Datas();
                            pd.SCORE_ID = item[0].ToString();

                            pd.PERIOD_M = item[1].ToString();

                            pd.SERVICE = item[2].ToString();

                            pd.TYPE = item[3].ToString();
                            pd.BBP = item[4].ToString();
                            pd.CHARGED = item[5].ToString();
                            pd.RECEIVED = item[6].ToString();
                            pd.TOTAL_P = item[7].ToString();

                            string errorText = "";
                            string CellAdres = "";
                            Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                            //chk Empty Field for ScoreId
                            if (pd.SCORE_ID.Length == 0)
                            {
                                success_pds = false;
                                errorText += "Не заполнено обязательное поле, ";
                                CellAdres = "A" + num.ToString();

                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                //pdsErrors.Add(pdError);
                            }
                            int countSc = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where LOG_IN_ID=@lg and NUMBER=@sc and OBJECT_ID=@obj", new SqlParameter[] { new SqlParameter("lg", lg), new SqlParameter("@sc", pd.SCORE_ID), new SqlParameter("@obj", obj) }, CommandType.Text);
                            /*   var  SCORE_ID //ЛС
                   var  PERIOD_M  //Период (месяц)
                   var  PERIOD_Y  //Период (год)
                   var  SERVICE  //Услуга
                   var  BBP //Остаток на начало периода
                   var  CHARGED  //Начислено
                   var RECEIVED //Поступило
                   var  TOTAL_P   //Остаток на конец периода
                   var  TYPE //Тип начисления/платежа*/
                            //checking for score_Id
                            if (countSc == 0 && pd.SCORE_ID.Length != 0)
                            {
                                success_pds = false;
                                errorText += "Л/с нет в системе, ";
                                CellAdres = "A" + num.ToString();
                                // //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                //  pdsErrors.Add(pdError);
                            }

                            //chk Empty field Period
                            if (pd.PERIOD_M.Length == 0)
                            {
                                success_pds = false;
                                errorText += "Не заполнено обязательное поле, ";
                                CellAdres = "B" + num.ToString();
                                // //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                //  pdsErrors.Add(pdError);
                            }

                            // chk Empty field for Service
                            if (pd.SERVICE.Length == 0)
                            {
                                success_pds = false;
                                errorText += "Не заполнено обязательное поле, ";
                                CellAdres = "C" + num.ToString();
                                //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                // pdsErrors.Add(pdError);
                            }

                            // chk Empty field for Type Payment
                            if (pd.TYPE.Length == 0)
                            {
                                success_pds = false;
                                errorText += "Не заполнено обязательное поле, ";
                                CellAdres = "D" + num.ToString();
                                //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                //  pdsErrors.Add(pdError);
                            }


                            // chk  Empty field for Charged
                            if (pd.CHARGED.Length == 0)
                            {
                                success_pds = false;
                                errorText += "Не заполнено обязательное поле, ";
                                CellAdres = "F" + num.ToString();
                                //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                pdError.SCORE_ID = pd.SCORE_ID;
                                pdError.PERIOD_M = pd.PERIOD_M;
                                pdError.SERVICE = pd.SERVICE;
                                pdError.TYPE = pd.TYPE;
                                pdError.BBP = pd.BBP;
                                pdError.CHARGED = pd.CHARGED;
                                pdError.RECEIVED = pd.RECEIVED;
                                pdError.TOTAL_P = pd.TOTAL_P;
                                pdError.ErrorText = errorText;
                                pdError.CellAdres = CellAdres;
                                //   pdsErrors.Add(pdError);
                            }

                            if (pd.SERVICE == "Итого")
                            {
                                //chk Empty Field for ScoreId
                                if (pd.SCORE_ID.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "A" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    // pdsErrors.Add(pdError);
                                }
                                //chk Empty field Period
                                if (pd.PERIOD_M.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "B" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    // pdsErrors.Add(pdError);
                                }
                                // chk Empty field for Type Payment
                                if (pd.TYPE.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "D" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    //  pdsErrors.Add(pdError);
                                }
                                //chk Empty field for BBP (Остаток на начало периода)
                                if (pd.BBP.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "E" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    // pdsErrors.Add(pdError);
                                }
                                // chk for Charged (Начислено)
                                if (pd.CHARGED.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "D" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    // pdsErrors.Add(pdError);
                                }
                                //chk for Postupilo
                                if (pd.RECEIVED.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "G" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    //  pdsErrors.Add(pdError);
                                }

                                // chk for (Остаток на конец периода) 
                                if (pd.TOTAL_P.Length == 0)
                                {
                                    success_pds = false;
                                    errorText += "Не заполнено обязательное поле, ";
                                    CellAdres = "H" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    //  pdsErrors.Add(pdError);
                                }



                            }
                            if (pd.SERVICE != "Итого" && pd.SERVICE.Length != 0)
                            {
                                int countService = (int)Mydb.ExecuteScalar("select COUNT(*) from RFP_SERVICES where SERVICE_NAME=@SERVICE", new SqlParameter[] { new SqlParameter("@SERVICE", pd.SERVICE) }, CommandType.Text);
                                if (countService == 0)
                                {
                                    //success_pds = false;
                                    //errorText += "Некорректно заполнено поле, ";
                                    //CellAdres = "D" + num.ToString();
                                    ////Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    //pdError.SCORE_ID = pd.SCORE_ID;
                                    //pdError.PERIOD_M = pd.PERIOD_M;
                                    //pdError.SERVICE = pd.SERVICE;
                                    //pdError.TYPE = pd.TYPE;
                                    //pdError.BBP = pd.BBP;
                                    //pdError.CHARGED = pd.CHARGED;
                                    //pdError.RECEIVED = pd.RECEIVED;
                                    //pdError.TOTAL_P = pd.TOTAL_P;
                                    //pdError.ErrorText = errorText;
                                    //pdError.CellAdres = CellAdres;
                                    int rfpType = (pd.TYPE == "ЖКУ") ? 1 : 2;
                                    Mydb.ExecuteNoNQuery("insert into RFP_SERVICES  (SERVICE_NAME,RFP_TYPE) values(@sn,@rfpType)", new SqlParameter[] { new SqlParameter("@sn", pd.SERVICE), new SqlParameter("@rfpType", rfpType) }, CommandType.Text);
                                }
                            }
                            // check correct for Period
                            if (pd.PERIOD_M.Length != 0)
                            {
                                if (pd.PERIOD_M.IndexOf(' ') == -1)
                                {
                                    success_pds = false;
                                    errorText += "Некорректно заполнено поле, ";
                                    CellAdres = "B" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    // pdsErrors.Add(pdError);
                                }
                                else
                                {
                                    string[] mnths = { "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" };
                                    string month_year = pd.PERIOD_M.Trim(); ;
                                    string[] mnth_year = month_year.Split(' ');
                                    int true_or_not = 0;
                                    for (int i = 0; i < mnths.Length; i++)
                                    {
                                        true_or_not = (int)Mydb.ExecuteScalar("uspo_Compare", new SqlParameter[] { new SqlParameter("@trueWord", mnths[i]), new SqlParameter("@WordInExcel", mnth_year[0]) }, CommandType.StoredProcedure);
                                        if (true_or_not == 1)
                                        {
                                            break;
                                        }
                                    }
                                    string year = mnth_year[1];
                                    year = year.Trim();
                                    if (year.Length != 4)
                                    {
                                        true_or_not = 2;
                                    }
                                    if (true_or_not == 2)
                                    {
                                        success_pds = false;
                                        errorText += "Некорректно заполнено поле, ";
                                        CellAdres = "B" + num.ToString();
                                        //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                        pdError.SCORE_ID = pd.SCORE_ID;
                                        pdError.PERIOD_M = pd.PERIOD_M;
                                        pdError.SERVICE = pd.SERVICE;
                                        pdError.TYPE = pd.TYPE;
                                        pdError.BBP = pd.BBP;
                                        pdError.CHARGED = pd.CHARGED;
                                        pdError.RECEIVED = pd.RECEIVED;
                                        pdError.TOTAL_P = pd.TOTAL_P;
                                        pdError.ErrorText = errorText;
                                        pdError.CellAdres = CellAdres;
                                        // pdsErrors.Add(pdError);
                                    }
                                }
                            }
                            // check for Incorrect Тип начисления/платежа*
                            if (pd.TYPE.Length != 0)
                            {
                                if (pd.TYPE != "ЖКУ" && pd.TYPE != "КР")
                                {
                                    success_pds = false;
                                    errorText += "Некорректно заполнено поле, ";
                                    CellAdres = "D" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    //  pdsErrors.Add(pdError);
                                }
                            }
                            //check For Service
                            int ServiceCOunt = (int)Mydb.ExecuteScalar("select COUNT (*) from RFP_SERVICES where [SERVICE_NAME]=@sm", new SqlParameter[] { new SqlParameter("@sm", pd.SERVICE.Trim()) }, CommandType.Text);
                            //check for dubl in DB
                            //
                            bool success_dubl = false;
                            if (ServiceCOunt != 0)
                            {
                                int PaymentsCount = (int)Mydb.ExecuteScalar("select COUNT (*) from DETAIL_INF where RFP_SERVICE_ID=(select RFP_SERVICE_ID from RFP_SERVICES where [SERVICE_NAME]=@srv)and RECIEPT_FOR_PAYMENT_ID = (select RECIEPT_FOR_PAYMENT_ID from RECIEPT_FOR_PAYMENT where SCORE_ID =@sc and DATA_MOUNTH_YEAR = @mnth )", new SqlParameter[] { new SqlParameter("@srv", pd.SERVICE.Trim()), new SqlParameter("@sc", pd.SCORE_ID.Trim()), new SqlParameter("@mnth", pd.PERIOD_M.Trim()) }, CommandType.Text);
                                if (PaymentsCount != 0)
                                {
                                    success_pds = false;
                                    errorText += "Уже есть в базе, ";
                                    CellAdres = "F" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = pd.SCORE_ID;
                                    pdError.PERIOD_M = pd.PERIOD_M;
                                    pdError.SERVICE = pd.SERVICE;
                                    pdError.TYPE = pd.TYPE;
                                    pdError.BBP = pd.BBP;
                                    pdError.CHARGED = pd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = pd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    //  pdsErrors.Add(pdError);
                                    success_dubl = true;
                                }
                            }


                            // check Dubl in Excel
                            for (int i = row + 1; i < dt.Rows.Count; i++)
                            {
                                Payment_Datas nextPd = new Payment_Datas();
                                nextPd.SCORE_ID = dt.Rows[i][0].ToString();

                                nextPd.PERIOD_M = dt.Rows[i][1].ToString();

                                nextPd.SERVICE = dt.Rows[i][2].ToString();

                                nextPd.TYPE = dt.Rows[i][3].ToString();
                                nextPd.BBP = dt.Rows[i][4].ToString();
                                nextPd.CHARGED = dt.Rows[i][5].ToString();
                                nextPd.RECEIVED = dt.Rows[i][6].ToString();
                                nextPd.TOTAL_P = dt.Rows[i][7].ToString();
                                if (nextPd.SCORE_ID == pd.SCORE_ID && nextPd.PERIOD_M == pd.PERIOD_M && nextPd.SERVICE == pd.SERVICE)
                                {
                                    success_pds = true;
                                    errorText += "Дублирование данных, ";
                                    CellAdres = "F" + num.ToString();
                                    //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                                    pdError.SCORE_ID = nextPd.SCORE_ID;
                                    pdError.PERIOD_M = nextPd.PERIOD_M;
                                    pdError.SERVICE = nextPd.SERVICE;
                                    pdError.TYPE = nextPd.TYPE;
                                    pdError.BBP = nextPd.BBP;
                                    pdError.CHARGED = nextPd.CHARGED;
                                    pdError.RECEIVED = pd.RECEIVED;
                                    pdError.TOTAL_P = nextPd.TOTAL_P;
                                    pdError.ErrorText = errorText;
                                    pdError.CellAdres = CellAdres;
                                    pdsErrors.Add(pdError);// first must  begin ende then delete andt accepchanges
                                    success_dubl = true;

                                    //item.Delete();
                                    //dt.Rows[i].Delete();
                                    //dt.AcceptChanges();

                                    //int row_Count = dt.Rows.Count;



                                    // errorText += "Дублирование данных, ";
                                    CellAdres = "F" + num.ToString();
                                    Payment_Datas_Errors pdError2 = new Payment_Datas_Errors();
                                    pdError2.SCORE_ID = pd.SCORE_ID;
                                    pdError2.PERIOD_M = pd.PERIOD_M;
                                    pdError2.SERVICE = pd.SERVICE;
                                    pdError2.TYPE = pd.TYPE;
                                    pdError2.BBP = pd.BBP;
                                    pdError2.CHARGED = pd.CHARGED;
                                    pdError2.RECEIVED = pd.RECEIVED;
                                    pdError2.TOTAL_P = pd.TOTAL_P;
                                    pdError2.ErrorText = errorText;
                                    pdError2.CellAdres = CellAdres;
                                    pdsErrors.Add(pdError2);
                                }

                            }
                            //if (success_dubl==true)
                            //{
                            //        //item.Delete();
                            //        //dt.AcceptChanges();
                            //        pdsErrors.Add(pdError);

                            //}

                            if (success_pds == false)
                            {
                                pdsErrors.Add(pdError);
                            }

                            Payment_Datas pdSuccess = new Payment_Datas();
                            if (success_pds == true)
                            {
                                pdSuccess.SCORE_ID = pd.SCORE_ID;
                                pdSuccess.PERIOD_M = pd.PERIOD_M;
                                pdSuccess.SERVICE = pd.SERVICE;
                                pdSuccess.TYPE = pd.TYPE;
                                pdSuccess.BBP = pd.BBP;
                                pdSuccess.CHARGED = pd.CHARGED;
                                pdSuccess.RECEIVED = pd.RECEIVED;
                                pdSuccess.TOTAL_P = pd.TOTAL_P;
                                PDSsucess.Add(pdSuccess);


                            }

                            num++;
                        }
                    }

                } 
            




           
            for (int i = 0; i < PDSsucess.Count; i++)
            {
                string LC = PDSsucess[i].SCORE_ID;
                string Period = PDSsucess[i].PERIOD_M;
                bool succItoqo = false;
                List<Payment_Datas_Errors> SameDatas = new List<Payment_Datas_Errors>();
                for (int j = i; j < (PDSsucess.Count - i); j++)
                {
                    if (PDSsucess[j].SCORE_ID==LC && PDSsucess[j].PERIOD_M == LC)
                    {
                        Payment_Datas_Errors sdata = new Payment_Datas_Errors();
                        // errorText = "Отсутствует строка ИТОГО по лицевому счету №" + PDSsucess[i].SCORE_ID + " за " + PDSsucess[i].PERIOD_M + ", ";
                        // CellAdres = "A" + num.ToString();
                        // //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                        sdata.SCORE_ID = PDSsucess[i].SCORE_ID;
                        sdata.PERIOD_M = PDSsucess[i].PERIOD_M;
                        sdata.SERVICE = PDSsucess[i].SERVICE;
                        sdata.TYPE = PDSsucess[i].TYPE;
                        sdata.BBP = PDSsucess[i].BBP;
                        sdata.CHARGED = PDSsucess[i].CHARGED;
                        sdata.RECEIVED = PDSsucess[i].RECEIVED;
                        sdata.TOTAL_P = PDSsucess[i].TOTAL_P;
                        sdata.ErrorText = "";//errorText;
                        sdata.CellAdres = "";
                        SameDatas.Add(sdata);
                    }

                }
                for (int k = 0; k < SameDatas.Count; k++)
                {
                    if (SameDatas[i].SERVICE== "Итого")
                    {
                        succItoqo = true;
                    }
                }
                if (succItoqo==false)
                {
                    for (int f = 0; f < SameDatas.Count; f++)
                    {
                        Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                        string errorText = "";
                        errorText = "Отсутствует строка ИТОГО по лицевому счету №" + SameDatas[f].SCORE_ID + " за " + SameDatas[f].PERIOD_M + ", ";
                        // CellAdres = "A" + num.ToString();
                        // //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                        pdError.SCORE_ID = SameDatas[f].SCORE_ID;
                        pdError.PERIOD_M = SameDatas[f].PERIOD_M;
                        pdError.SERVICE = SameDatas[f].SERVICE;
                        pdError.TYPE = SameDatas[f].TYPE;
                        pdError.BBP = SameDatas[f].BBP;
                        pdError.CHARGED = SameDatas[f].CHARGED;
                        pdError.RECEIVED = SameDatas[f].RECEIVED;
                        pdError.TOTAL_P = SameDatas[f].TOTAL_P;
                        pdError.ErrorText = errorText;
                        pdError.CellAdres = "";
                        pdsErrors.Add(pdError);
                    }
                }
                 
            }

            // check success datas which has in data errors
            if (PDSsucess.Count!=0)
                 
            {

                for (int i = 0; i < pdsErrors.Count; i++)
                {
                    for (int j = 0; j < PDSsucess.Count; j++)
                    {
                        if (PDSsucess[j].SCORE_ID == pdsErrors[i].SCORE_ID &&PDSsucess[j].PERIOD_M == pdsErrors[i].PERIOD_M)
                        {
                            Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                           string errorText = "Данные по услуге «"+ PDSsucess[j].SERVICE + "» за период «"+ PDSsucess[j].PERIOD_M + "» введены неверно. Пожалуйста, проверьте данные за этот период по лицевому счету «"+ PDSsucess[j].SCORE_ID+ "» ";
                           string CellAdres = "F" + num.ToString();
                            //Payment_Datas_Errors pdError = new Payment_Datas_Errors();
                            pdError.SCORE_ID = PDSsucess[j].SCORE_ID;
                            pdError.PERIOD_M = PDSsucess[j].PERIOD_M;
                            pdError.SERVICE = PDSsucess[j].SERVICE;
                            pdError.TYPE = PDSsucess[j].TYPE;
                            pdError.BBP = PDSsucess[j].BBP;
                            pdError.CHARGED = PDSsucess[j].CHARGED;
                            pdError.RECEIVED = PDSsucess[j].RECEIVED;
                            pdError.TOTAL_P = PDSsucess[j].TOTAL_P;
                            pdError.ErrorText = errorText;
                            pdError.CellAdres = CellAdres;
                            PDSsucess.RemoveAt(j);
                           pdsErrors.Add(pdError);

                        }
                    }
                }
                //for (int i = PDSsucess.Count-1; i >= 0; i--)
                //{
                //    for (int j = 0; j < pdsErrors.Count; j++)
                //    {
                //        if (PDSsucess[i].SCORE_ID == pdsErrors[j].SCORE_ID)
                //        {
                //            PDSsucess.RemoveAt(i);

                //        }
                //    }
                //} 

            }

            string ErrorFile_adres="";
            //make excel for Error_datas
            if (pdsErrors.Count!=0)
            {
                DataTable dtError = new DataTable();
                dtError.Clear();
                dtError.Columns.Add("№ ЛС*");
                dtError.Columns.Add("Период*");
                dtError.Columns.Add("Услуга*");
                dtError.Columns.Add("Тип начисления/платежа*");
                dtError.Columns.Add("Остаток на начало периода");
                dtError.Columns.Add("Начислено*");
                dtError.Columns.Add("Поступило");
                dtError.Columns.Add("Остаток на конец периода");
                dtError.Columns.Add("Ошибка");
                dtError.Columns.Add("CellAdress");

                for (int i = 0; i < pdsErrors.Count; i++)
                {
                    DataRow rw = dtError.NewRow();

                    rw["№ ЛС*"]=pdsErrors[i].SCORE_ID.ToString();
                    rw["Период*"]=pdsErrors[i].PERIOD_M.ToString();
                    rw["Услуга*"]=pdsErrors[i].SERVICE.ToString();
                    rw["Тип начисления/платежа*"]=pdsErrors[i].TYPE.ToString();
                    rw["Остаток на начало периода"]=pdsErrors[i].BBP.ToString();
                    rw["Начислено*"]=pdsErrors[i].CHARGED.ToString();
                    rw["Поступило"]=pdsErrors[i].RECEIVED.ToString();
                    rw["Остаток на конец периода"]=pdsErrors[i].TOTAL_P.ToString();
                    rw["Ошибка"]=pdsErrors[i].ErrorText.ToString();
                    rw["CellAdress"] = pdsErrors[i].CellAdres.ToString();
                    dtError.Rows.Add(rw);
                }

                 ErrorFile_adres = GiveError_Excel(obj, lg, dtError);

            }
            string SuccesFile_adres="";
            if (PDSsucess.Count!=0)
            {
                DataTable dtSuccess=new DataTable();
                dtSuccess.Clear();
                dtSuccess.Columns.Add("№ ЛС*");
                dtSuccess.Columns.Add("Период*");
                dtSuccess.Columns.Add("Услуга*");
                dtSuccess.Columns.Add("Тип начисления/платежа*");
                dtSuccess.Columns.Add("Остаток на начало периода");
                dtSuccess.Columns.Add("Начислено*");
                dtSuccess.Columns.Add("Поступило");
                dtSuccess.Columns.Add("Остаток на конец периода");
                for (int i = 0; i < PDSsucess.Count; i++)
                {
                    DataRow r = dtSuccess.NewRow();
                    r["№ ЛС*"]=PDSsucess[i].SCORE_ID;
                    r["Период*"]=PDSsucess[i].PERIOD_M;
                    r["Услуга*"]=PDSsucess[i].SERVICE;
                    r["Тип начисления/платежа*"]=PDSsucess[i].TYPE;
                    r["Остаток на начало периода"]=PDSsucess[i].BBP;
                    r["Начислено*"]=PDSsucess[i].CHARGED;
                    r["Поступило"]=PDSsucess[i].RECEIVED;
                    r["Остаток на конец периода"]=PDSsucess[i].TOTAL_P;
                    dtSuccess.Rows.Add(r);
                }
                SuccesFile_adres = GiveSuccess_Excel(dtSuccess);
            }


            #region olds

            //if (success == true)
            //{
            //    foreach (DataRow item in dt.Rows)
            //    {
            //        Payment_Datas pd = new Payment_Datas();

            //        if (item[0].ToString().Length == 0)
            //        {
            //            break;
            //        }
            //        /*
            //    string header0 = (dt.Columns[0].ColumnName is string) ? dt.Columns[0].ColumnName : "";
            //    string header1 =  dt.Columns[9].ColumnName ;
            //    string header2 = (dt.Columns[10].ColumnName is string) ? dt.Columns[10].ColumnName : "";
            //    string header3 = (dt.Columns[2].ColumnName is string) ? dt.Columns[2].ColumnName : "";
            //    string header4 = (dt.Columns[3].ColumnName is string) ? dt.Columns[3].ColumnName : "";
            //    string header5 = (dt.Columns[4].ColumnName is string) ? dt.Columns[4].ColumnName : "";
            //    string header6 = (dt.Columns[5].ColumnName is string) ? dt.Columns[5].ColumnName : "";
            //    string header7 = (dt.Columns[6].ColumnName is string) ? dt.Columns[6].ColumnName : "";
            //    string header8 = (dt.Columns[7].ColumnName is string) ? dt.Columns[7].ColumnName : "";*/

            //        pd.SCORE_ID = (item[0].ToString().Length == 0) ? " " : item[0].ToString();
            //        int CountSc = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where LOG_IN_ID=@lg and NUMBER=@sc and OBJECT_ID=@obj", new SqlParameter[] { new SqlParameter("lg",lg),new SqlParameter("@sc",pd.SCORE_ID),new SqlParameter("@obj", obj) }, CommandType.Text);
            //        if (CountSc==0)
            //        {
            //            pd.SCORE_ID = pd.SCORE_ID + "~";
            //        }
            //        pd.PERIOD_M = (item[1].ToString().Length == 0) ? " " : item[1].ToString();

            //        pd.SERVICE = (item[2].ToString().Length == 0) ? " " : item[2].ToString();//must/checking
            //        int countService =(int) Mydb.ExecuteScalar("select COUNT(*) from RFP_SERVICES where [SERVICE_NAME]=@SERVICE", new SqlParameter[] { new SqlParameter("@SERVICE", pd.SERVICE) }, CommandType.Text);
            //        if (countService==0)
            //        {
            //            pd.SERVICE = pd.SERVICE + "~";
            //        }
            //        pd.TYPE = (item[3].ToString().Length == 0) ? " " : item[3].ToString();
            //        pd.BBP= (item[4].ToString().Length == 0) ? " " : item[4].ToString();
            //        pd.CHARGED= (item[5].ToString().Length == 0) ? " " : item[5].ToString();
            //        pd.RECEIVED = (item[6].ToString().Length == 0) ? " " : item[6].ToString();
            //        pd.TOTAL_P = (item[7].ToString().Length == 0) ? " " : item[7].ToString();




            //        pds.Add(pd);

            //    }
            //}

            //conn.Close();
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //if (success == true)
            //{
            //    // result = js.Serialize(sfxs);
            //    result = "{\"result\" : \"Ok\",\"PDS\":" + js.Serialize(pds) + "}";
            //} 
            #endregion
            //returnvalue= "{\"result\" : \"5\",\"Id\" :\"" + Client_Id + "\",\"LogId\" :\"" + loginId + "\",\"Roles\":\"" + js.Serialize(rls) + "\"}"; 
            result = "{\"result\" : \"Ok\",\"SuccesCount\":\"" + PDSsucess.Count.ToString()+"\",\"SuccessAdress\":\""+SuccesFile_adres+"\",\"ErrorCount\":\""+pdsErrors.Count+"\",\"ErrorAdress\":\""+ErrorFile_adres+"\",\"AllCount\":\""+(dt.Rows.Count-1) +"\"}";
            }
            else
            {
                result = "{\"result\" : \"No\",\"ErrorFile\":\"Fail_file\"}";
            }
            return result;


        }
        public static void SendMailReciept(string body, string Email_)
        {
            Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string SavePaymentsMass(string f,int o,int lg, bool sendReciept)
        {
            DataTable dt = giveDataTableFromPaymentsExcel(f);
            List<Payment_Datas> pds = new List<Payment_Datas>();
            for (int i = 1; i < dt.Rows.Count; i++)
            {
                /*once  butun datalari ekliyoruz itoqoya kadar eger kontrol icerisinde usluqnin itoqo oldugunu gordugumuzde o zaman eklemeyo RFpe yapiyoruz bundan sonra list icerisindeki datalari details_inf tablosuna yaziyoruz*/
              

                string itoqo = dt.Rows[i]["Услуга*"].ToString();
                Payment_Datas pd = new Payment_Datas();
                pd.SCORE_ID = dt.Rows[i]["№ ЛС*"].ToString();
                pd.PERIOD_M = dt.Rows[i]["Период*"].ToString();
                int serviceId = 0;
                if (dt.Rows[i]["Услуга*"].ToString()!= "Итого")
                {
                      serviceId = (int)Mydb.ExecuteScalar("select RFP_SERVICE_ID from RFP_SERVICES where SERVICE_NAME=@s", new SqlParameter[] { new SqlParameter("@s", dt.Rows[i]["Услуга*"].ToString()) }, CommandType.Text); 
                }
                pd.SERVICE = serviceId.ToString();
                pd.TYPE = (dt.Rows[i]["Тип начисления/платежа*"].ToString() == "ЖКУ") ? "1" : "2";
                pd.BBP = (string.IsNullOrEmpty(dt.Rows[i]["Остаток на начало периода"].ToString())) ? "" : dt.Rows[i]["Остаток на начало периода"].ToString();
                pd.ACCURED = (string.IsNullOrEmpty(dt.Rows[i]["Начислено*"].ToString())) ? "" : dt.Rows[i]["Начислено*"].ToString(); 
                pd.RECEIVED= (string.IsNullOrEmpty(dt.Rows[i]["Поступило"].ToString())) ? "" : dt.Rows[i]["Поступило"].ToString();
                pd.BEP= (string.IsNullOrEmpty(dt.Rows[i]["Остаток на конец периода"].ToString())) ? "" : dt.Rows[i]["Остаток на конец периода"].ToString();

                if (dt.Rows[i]["Услуга*"].ToString() != "Итого")
                {
                    pds.Add(pd); 
                }
                if (dt.Rows[i]["Услуга*"].ToString() == "Итого")
                {
                    int countPayment = (int)Mydb.ExecuteScalar("select COUNT(*) from RECIEPT_FOR_PAYMENT where DATA_MOUNTH_YEAR=@period and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@period", dt.Rows[i]["Период*"].ToString()), new SqlParameter("@sc", dt.Rows[i]["№ ЛС*"].ToString()) }, CommandType.Text);

                    string body = "";
                    string IndividualDatas = Mydb.ExecuteReadertoDataTableAsJson("select * from IND_NAME where INDIVIDUAL_ID=(select top 1 INDIVIDUAL_ID from INDIVIDUAL_PERSCORE where SCORE_ID=@sc)", new SqlParameter[] { new SqlParameter("@sc", dt.Rows[i]["№ ЛС*"].ToString()) }, CommandType.Text);
                    dynamic json = JsonConvert.DeserializeObject(IndividualDatas);
                    string email = json[0].EMAIL;

                    if (sendReciept==true && email.Length!=0)
                    {
                        string fio = json[0].FIRST_NAME;
                        //https://upravbot.ru/ClientLogin.aspx
                        body = @"<div style=""display:block;width:100%;position:absolute;left:0;right:0;top:0;background-color:#f3f3f3;""><div style = ""display:block;margin:0 auto;max-width:700px;text-align:justify;font-family:sans-serif;color:#000033;background-color:#ffffff;padding:0 10px;""><br/><br/><p>Уважаемый(ая)<span id= ""fio""> {0} </span>!</p><br/><p>По Вашему личному счёту произведено начисление за период:</p><p><strong><span id=""datePeriod"">{1}</span></strong></p><br/><p>Вы можете оплатить и / или распечатать квитанцию в своём личном кабинете на сайте:</p><p style=""display:block;float:left;text-align:left;padding:10px30px;background-color:#328ac3;width:auto;""><a href=""{2}"" style=""color:white;text-decoration:none;"">Вход</a></p><br/><br style=""clear:both;""/><p>или в мобильном приложении:</p><p style=""display:block;text-align:left""><a href=""https://play.google.com/store/apps/details?id=ru.matorinun.matorin"" style=""color:#555ab7;cursor:pointer;text-decoration:none;""><img alt=""Наше приложение в Плей Маркете"" src=""http://matorin-un.ru/portals/0/googleplay185.png"" style=""width:185px;height:51px;"" title=""Наше приложение в Плей Маркете""></a>&nbsp;<a href=""https://itunes.apple.com/ru/app/matorin-quick/id1389783867?mt=8""><img alt = ""Наше приложение в Апсторе"" src=""http://matorin-un.ru/portals/0/appstore185_1.png"" style=""width:185px;height:51px;"" title=""Наше приложение в Апсторе""></a></p><br style=""clear:both;""/></div></div> ";
                        string url = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/ClientLogin.aspx";
                        body = string.Format(body, fio, dt.Rows[i]["Период*"], url);

                        SendMailReciept(body, email);


                    }
                    if (countPayment == 0)
                    {
                       // string OstatokNaNacalo = dt.Rows[i]["Остаток на начало периода"].ToString();
                      //  OstatokNaNacalo = OstatokNaNacalo.Replace('.', ',');
                            string nacisleno = dt.Rows[i]["Начислено*"].ToString();
                        //  nacisleno = nacisleno.Replace('.', ',');
                        // float Inoqo_k_oplata = float.Parse(OstatokNaNacalo) + float.Parse(nacisleno);
                        // string a = Inoqo_k_oplata.ToString("0.00");

                        string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
                        string CurrentDate = DateTime.Now.ToString();
                        Name = Name + "|" + CurrentDate + "|Excel";

                        int insertedId = (int)Mydb.ExecuteScalar("INSERT INTO RECIEPT_FOR_PAYMENT (DATA_MOUNTH_YEAR,BACKLOG_START,SCORE_ID,GENERAL_SUM,ACCURED_SUMM,RECEIVED,LOAD_TYPE)OUTPUT Inserted.RECIEPT_FOR_PAYMENT_ID VALUES(@period,@BL,@sc,@gs,@Accured,@recieved,@Name)", new SqlParameter[] { new SqlParameter("@period", dt.Rows[i]["Период*"]), new SqlParameter("@BL", dt.Rows[i]["Остаток на начало периода"].ToString()), new SqlParameter("@sc", dt.Rows[i]["№ ЛС*"].ToString()), new SqlParameter("@gs", dt.Rows[i]["Остаток на конец периода"].ToString()),new SqlParameter("@Accured",dt.Rows[i]["Начислено*"].ToString()),new SqlParameter("@recieved", dt.Rows[i]["Поступило"].ToString()),new SqlParameter("@Name",Name) }, CommandType.Text);

                        foreach (Payment_Datas item in pds)
                        {
                            int countDetail = (int)Mydb.ExecuteScalar("select COUNT(*) from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@rfpId", insertedId) }, CommandType.Text);
                            if (countDetail == 0)
                            {
                                Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@accsum", item.ACCURED), new SqlParameter("@rfptId", insertedId),new SqlParameter("@Name",Name) }, CommandType.Text);
                            }
                            else
                            {
                                Mydb.ExecuteNoNQuery("delete from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@rfpId", insertedId) }, CommandType.Text);

                                Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@accsum", item.ACCURED), new SqlParameter("@rfptId", insertedId),new SqlParameter("@Name",Name) }, CommandType.Text);
                            }
                        }
                    }
                    else
                    {
                        int hasPayment = (int)Mydb.ExecuteScalar("select RECIEPT_FOR_PAYMENT_ID from RECIEPT_FOR_PAYMENT where DATA_MOUNTH_YEAR=@period and SCORE_ID=@sc", new SqlParameter[] { new SqlParameter("@period", dt.Rows[i]["Период*"].ToString()), new SqlParameter("@sc", dt.Rows[i]["№ ЛС*"].ToString()) }, CommandType.Text);
                        string Name = Mydb.ExecuteScalar("select ACCOUNT_NAME from ACCOUNT where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", lg) }, CommandType.Text).ToString();
                        string CurrentDate = DateTime.Now.ToString();
                        Name = Name + "|" + CurrentDate + "|Excel";
                        foreach (Payment_Datas item in pds)
                        {
                            int countDetail = (int)Mydb.ExecuteScalar("select COUNT(*) from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@rfpId", hasPayment) }, CommandType.Text);
                            if (countDetail == 0)
                            {
                                Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@accsum", item.ACCURED), new SqlParameter("@rfptId", hasPayment),new SqlParameter("@Name",Name) }, CommandType.Text);
                            }
                            else
                            {
                                Mydb.ExecuteNoNQuery("delete from DETAIL_INF where RFP_SERVICE_ID=@rfp and RFP_TYPE_ID=@rfpt and RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@rfpId", hasPayment) }, CommandType.Text);

                                Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RFP_TYPE_ID,ACCURED_SUMM,RECIEPT_FOR_PAYMENT_ID,LOAD_TYPE) VALUES (@rfp,@rfpt,@accsum,@rfptId,@Name)", new SqlParameter[] { new SqlParameter("@rfp", Convert.ToInt32(item.SERVICE)), new SqlParameter("@rfpt", Convert.ToInt32(item.TYPE)), new SqlParameter("@accsum", item.ACCURED), new SqlParameter("@rfptId", hasPayment),new SqlParameter("@Name",Name) }, CommandType.Text);
                            }
                        }

                        
                       
                        Mydb.ExecuteNoNQuery("update RECIEPT_FOR_PAYMENT set PAY_DATE=GETDATE(),BACKLOG_START=@BL,GENERAL_SUM=@gs,ACCURED_SUMM=@Accured, RECEIVED=@received,LOAD_TYPE=@Name where RECIEPT_FOR_PAYMENT_ID=@rfpId", new SqlParameter[] { new SqlParameter("@BL", dt.Rows[i]["Остаток на начало периода"].ToString()), new SqlParameter("@gs", dt.Rows[i]["Остаток на конец периода"].ToString()), new SqlParameter("@Accured", dt.Rows[i]["Начислено*"].ToString()), new SqlParameter("@received", dt.Rows[i]["Поступило"].ToString()),new SqlParameter("@Name", Name), new SqlParameter("@rfpId", hasPayment) }, CommandType.Text);

                        /*(int)Mydb.ExecuteScalar("INSERT INTO RECIEPT_FOR_PAYMENT (DATA_MOUNTH_YEAR,BACKLOG_START,SCORE_ID,GENERAL_SUM,ACCURED_SUMM,RECEIVED)OUTPUT Inserted.RECIEPT_FOR_PAYMENT_ID VALUES(@period,@BL,@sc,@gs,@Accured,@recieved)", new SqlParameter[] { new SqlParameter("@period", dt.Rows[i]["Период*"]), new SqlParameter("@BL", dt.Rows[i]["Остаток на начало периода"].ToString()), new SqlParameter("@sc", dt.Rows[i]["№ ЛС*"].ToString()), new SqlParameter("@gs", dt.Rows[i]["Остаток на конец периода"].ToString()),new SqlParameter("@Accured",dt.Rows[i]["Начислено*"].ToString()),new SqlParameter("@recieved", dt.Rows[i]["Поступило"].ToString()) }, CommandType.Text);*/
                    }

                }


                //  Payment_Datas pd = new Payment_Datas();
                //pd.
            }

            return "";
        }
        public static string GiveError_Excel(int obj, int Log, DataTable dt)
        {
            string guid = Guid.NewGuid().ToString();
            string strFilePath = @"C:\inetpub\wwwroot\Files\Error_Excel\(Object_"+obj+")_(Log_"+Log.ToString()+ ")_Error_Excel_"+ guid + ".xlsx";
            using (var workbook = new XLWorkbook())
            {

                var worksheet = workbook.Worksheets.Add("Sample Sheet");

                
                int cell = 2;
                worksheet.Cell("A1").Value = "№ ЛС*";
                worksheet.Cell("A1").Style.Font.Bold = true;
                worksheet.Cell("A1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("B1").Value = "Период*";
                worksheet.Cell("B1").Style.Font.Bold = true;
                worksheet.Column(1).CellsUsed().SetDataType(XLDataType.Text);
                worksheet.Cell("B1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("C1").Value = "Услуга*";
                worksheet.Cell("C1").Style.Font.Bold = true;
                worksheet.Cell("C1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("D1").Value = "Тип начисления/платежа*";
                worksheet.Cell("D1").Style.Font.Bold = true;
                worksheet.Cell("D1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("E1").Value = "Остаток на начало периода";
                worksheet.Cell("E1").Style.Font.Bold = true;
                worksheet.Cell("F1").Value = "Начислено*";
                worksheet.Cell("F1").Style.Font.Bold = true;
                worksheet.Cell("F1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("G1").Value = "Поступило";
                worksheet.Cell("G1").Style.Font.Bold = true;
                worksheet.Cell("H1").Value = "Остаток на конец периода";
                worksheet.Cell("H1").Style.Font.Bold = true;
                worksheet.Cell("I1").Value = "Ошибка";
                worksheet.Cell("I1").Style.Font.Bold = true;
                foreach (DataRow item in dt.Rows)
                {
                    worksheet.Cell("A" + cell.ToString() + "").Value = item["№ ЛС*"].ToString();

                    string cellAdres = item["CellAdress"].ToString();
                    string ErrorText = item["Ошибка"].ToString().Trim();
                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {
                        if (item["№ ЛС*"].ToString().Trim().Length==0)
                        {
                            worksheet.Cell(cellAdres).Style.Fill.BackgroundColor = XLColor.Red; 
                        }
                    }
                    if (ErrorText.Contains("Л/с"))
                    {
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    }
                    //worksheet.Cell("B" + cell.ToString()).Style.NumberFormat.Format = "MMMM yyyy";
                    //worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                    //worksheet.Cell("B" + cell.ToString() + "").Value = item["Период*"].ToString();

                   

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        if (item["Период*"].ToString().Trim().Length==0)
                        {
                            worksheet.Cell("B" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red; 
                        }
                    }
                    //Некорректно заполнено поле


                    // chk Services


                    string PERIOD_M = item["Период*"].ToString();
                    if (PERIOD_M.Length!=0)
                    {
                        if (PERIOD_M.IndexOf(' ')==-1)
                        {
                            worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                            worksheet.Cell("B" + cell.ToString() + "").SetValue <string>(PERIOD_M);
                            //worksheet.Cell("B" + cell.ToString() + "").Value = PERIOD_M;
                            worksheet.Cell("B" + cell.ToString() + "").Style.Font.Bold = true;
                              worksheet.Cell("B" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                        }
                        else
                        {
                            string[] mnths = { "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" };
                            int true_or_not = 0;

                            string[] mnth_year = PERIOD_M.Split(' ');
                            for (int i = 0; i < mnths.Length; i++)
                            {
                                true_or_not = (int)Mydb.ExecuteScalar("uspo_Compare", new SqlParameter[] { new SqlParameter("@trueWord", mnths[i]), new SqlParameter("@WordInExcel", mnth_year[0]) }, CommandType.StoredProcedure);
                                if (true_or_not == 1)
                                {
                                    break;
                                }
                            }
                            string year = mnth_year[1];
                            year = year.Trim();
                            if (year.Length!=4)
                            {
                                true_or_not = 2;
                            }
                            if (true_or_not==2)
                            {
                                worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                                worksheet.Cell("B" + cell.ToString() + "").SetValue<string>(PERIOD_M);
                                worksheet.Cell("B" + cell.ToString() + "").Style.Font.Bold = true;
                                worksheet.Cell("B" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                            }
                            else
                            {
                                worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                                worksheet.Cell("B" + cell.ToString() + "").SetValue<string>(PERIOD_M);
                            }
                        }
                    }
                    //if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    //{
                    //    worksheet.Cell("B" + cell.ToString() + "").Style.Font.Bold = true;
                    //    worksheet.Cell("B" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    //}

                    int countService = (int)Mydb.ExecuteScalar("select COUNT(*) from RFP_SERVICES where SERVICE_NAME=@SERVICE", new SqlParameter[] { new SqlParameter("@SERVICE", item["Услуга*"].ToString()) }, CommandType.Text);
                    worksheet.Cell("C" + cell.ToString() + "").Value = item["Услуга*"].ToString();

                    if (item["Услуга*"].ToString()!= "Итого")
                    {
                        if (countService == 0)
                        {
                            worksheet.Cell("C" + cell.ToString() + "").Style.Font.Bold = true;
                            worksheet.Cell("C" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                        } 
                    }
                   
                  

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        if (item["Услуга*"].ToString().Trim().Length==0)
                        {
                            worksheet.Cell("C" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red; 
                        }
                    }
                    //if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    //{
                    //    worksheet.Cell("C" + cell.ToString() + "").Style.Font.Bold = true;
                    //    worksheet.Cell("C" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    //}

                    worksheet.Cell("D" + cell.ToString() + "").Value = item["Тип начисления/платежа*"].ToString();

                    if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    {

                        if (item["Тип начисления/платежа*"].ToString().Trim().Length==0)
                        {
                            worksheet.Cell("D" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red; 
                        }
                    }
                    string TYPE= item["Тип начисления/платежа*"].ToString();
                    //Некорректно заполнено поле
                    if (TYPE.Length!=0)
                    {
                        if (TYPE != "ЖКУ" && TYPE != "КР")
                        {
                            worksheet.Cell("D" + cell.ToString() + "").Style.Font.Bold = true;
                               worksheet.Cell("D" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                        }
                    }
                    //if (item["Ошибка"].ToString().IndexOf("Некорректно заполнено поле") != -1)
                    //{
                    //    worksheet.Cell("D" + cell.ToString() + "").Style.Font.Bold = true;
                    //    worksheet.Cell("D" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    //}

                    if (item["Ошибка"].ToString().IndexOf("Дублирование данных") != -1)
                    {
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("A" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                        worksheet.Cell("B" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("B" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                        worksheet.Cell("C" + cell.ToString() + "").Style.Font.Bold = true;
                        worksheet.Cell("C" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    }

                    worksheet.Cell("E" + cell.ToString() + "").Value = item["Остаток на начало периода"].ToString();
                    worksheet.Cell("F" + cell.ToString() + "").Value = item["Начислено*"].ToString();
                    worksheet.Cell("G" + cell.ToString() + "").Value = item["Поступило"].ToString();

                    if (item["Услуга*"].ToString() == "Итого")
                    {
                        if (item["№ ЛС*"].ToString().Length == 0)
                        {
                            worksheet.Cell("A" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Период*"].ToString().Length == 0)
                        {
                            worksheet.Cell("B" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Услуга*"].ToString().Length == 0)
                        {
                            worksheet.Cell("C" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Тип начисления/платежа*"].ToString().Length == 0)
                        {

                            worksheet.Cell("D" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Остаток на начало периода"].ToString().Length == 0)
                        {
                            worksheet.Cell("E" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Начислено*"].ToString().Length == 0)
                        {
                            worksheet.Cell("F" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Поступило"].ToString().Length == 0)
                        {
                            worksheet.Cell("G" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }
                        if (item["Остаток на конец периода"].ToString().Length == 0)
                        {
                            worksheet.Cell("H" + cell.ToString() + "").Style.Fill.BackgroundColor = XLColor.Red;
                        }

                    }

                    //if (item["Ошибка"].ToString().IndexOf("Не заполнено обязательное поле") != -1)
                    //{

                    //    worksheet.Cell(cellAdres).Style.Fill.BackgroundColor = XLColor.Red;
                    //}

                    worksheet.Cell("H" + cell.ToString() + "").Value = item["Остаток на конец периода"].ToString();
                    worksheet.Cell("I" + cell.ToString() + "").Value = item["Ошибка"].ToString();
                    worksheet.Cell("I" + cell.ToString() + "").Style.Font.Bold = true;
                    worksheet.Cell("I" + cell.ToString() + "").Style.Font.FontColor = XLColor.Red;
                    cell++;
                }
                var rngTable = worksheet.Range("A1:I" + cell.ToString() + "");
                rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Columns().AdjustToContents();
                workbook.SaveAs(strFilePath);
            }
            return "(Object_" + obj + ")_(Log_" + Log.ToString() + ")_Error_Excel_" + guid + ".xlsx";
        }

        public static string GiveSuccess_Excel(DataTable dt)
        {
            string guid = Guid.NewGuid().ToString();
            string strFilePath = @"C:\inetpub\wwwroot\Files\"+ guid+".xlsx";
            using (var workbook = new XLWorkbook())
                 {

                var worksheet = workbook.Worksheets.Add("Sample Sheet");


                int cell = 2;
                worksheet.Cell("A1").Value = "№ ЛС*";
                worksheet.Cell("A1").Style.Font.Bold = true;
                worksheet.Cell("A1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("B1").Value = "Период*";
                worksheet.Cell("B1").Style.Font.Bold = true;
                worksheet.Column(1).CellsUsed().SetDataType(XLDataType.Text);
                worksheet.Cell("B1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("C1").Value = "Услуга*";
                worksheet.Cell("C1").Style.Font.Bold = true;
                worksheet.Cell("C1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("D1").Value = "Тип начисления/платежа*";
                worksheet.Cell("D1").Style.Font.Bold = true;
                worksheet.Cell("D1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("E1").Value = "Остаток на начало периода";
                worksheet.Cell("E1").Style.Font.Bold = true;
                worksheet.Cell("F1").Value = "Начислено*";
                worksheet.Cell("F1").Style.Font.Bold = true;
                worksheet.Cell("F1").Style.Font.FontColor = XLColor.Red;
                worksheet.Cell("G1").Value = "Поступило";
                worksheet.Cell("G1").Style.Font.Bold = true;
                worksheet.Cell("H1").Value = "Остаток на конец периода";
                worksheet.Cell("H1").Style.Font.Bold = true;

                foreach (DataRow item in dt.Rows)
                {/*  worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                            worksheet.Cell("B" + cell.ToString() + "").SetValue <string>(PERIOD_M);*/
                    worksheet.Cell("A" + cell.ToString() + "").Value = item["№ ЛС*"].ToString();
                    //worksheet.Cell("B" + cell.ToString() + "").Value = item["Период*"].ToString();
                    worksheet.Cell("B" + cell.ToString()).SetDataType(XLDataType.Text);
                   // worksheet.Cell("B" + cell.ToString() + "").Value = item["Период*"].ToString();
                    worksheet.Cell("B" + cell.ToString() + "").SetValue<string>(item["Период*"].ToString());
                    worksheet.Cell("C" + cell.ToString() + "").Value = item["Услуга*"].ToString();
                    worksheet.Cell("D" + cell.ToString() + "").Value = item["Тип начисления/платежа*"].ToString();
                    worksheet.Cell("E" + cell.ToString() + "").Value = item["Остаток на начало периода"].ToString();
                    worksheet.Cell("F" + cell.ToString() + "").Value = item["Начислено*"].ToString();
                    worksheet.Cell("G" + cell.ToString() + "").Value = item["Поступило"].ToString();
                    worksheet.Cell("H" + cell.ToString() + "").Value = item["Остаток на конец периода"].ToString();
                    cell++;
                }
                var rngTable = worksheet.Range("A1:H" + cell.ToString() + "");
                rngTable.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Columns().AdjustToContents();
                workbook.SaveAs(strFilePath);

            }
            return guid + ".xlsx";
        }
        [WebMethod]
        public static string CHeckScore(string sc,int Obj)
        {
            string result;
            int CScore = (int)Mydb.ExecuteScalar("select COUNT(*) from VW_ROOMS where OBJECT_ID=@obj and NUMBER=@sc", new SqlParameter[] { new SqlParameter("@sc",sc),new SqlParameter("@obj",Obj) }, CommandType.Text);
            if (CScore==0)
            {
                result = "{\"result\" : \"0\"}";
            }
            else
            {
                result = "{\"result\" : \"1\"}";
            }
            return result;
        }
        [WebMethod]
        public static string MassLoadPayment(List<Payment_Datas> platej)
        {
            foreach (Payment_Datas item in platej)
            {
                item.PERIOD_M = item.PERIOD_M + " " + item.PERIOD_Y;
                string SERVICE = (item.SERVICE == "ХВС") ? "1" : (item.SERVICE == "ГВС") ? "2" : (item.SERVICE == "Теплоэнергия") ? "3" : (item.SERVICE == "Газ") ? "4" : (item.SERVICE == "Отопление") ? "5" : "6";
                string TYPE = (item.TYPE == "ЖКУ") ? "1" : "2";
                int countPayment = (int)Mydb.ExecuteScalar("select COUNT(*) from RECIEPT_FOR_PAYMENT where SCORE_ID=@SCORE_ID and DATA_MOUNTH_YEAR=@PERIOD_M", new SqlParameter[] { new SqlParameter("@SCORE_ID", item.SCORE_ID), new SqlParameter("@SCORE_ID", item.PERIOD_M) }, CommandType.Text);
                if (countPayment==0)
                {
                    Mydb.ExecuteNoNQuery(@"insert into RECIEPT_FOR_PAYMENT(DATA_MOUNTH_YEAR,ACCURED_SUMM,PAYMENT_SUMM, BACKLOG_START, GENERAL_SUM, SCORE_ID,RECEIEPT_F_P_ID) values (@PERIOD_M,@CHARGED,@RECEIVED,@BBP,@TOTAL_P,@SCORE_ID,@TYPE)", new SqlParameter[] {
                    new SqlParameter("@PERIOD_M", item.PERIOD_M),
                    new SqlParameter("@CHARGED",item.CHARGED),
                    new SqlParameter("@RECEIVED",item.RECEIVED),
                    new SqlParameter("@BBP",item.BBP),
                    new SqlParameter("@TOTAL_P",item.TOTAL_P),
                    new SqlParameter("@SCORE_ID",item.SCORE_ID),
                    new SqlParameter("@TYPE",Convert.ToInt32(TYPE)) }, CommandType.Text); 
                }
                else
                {
                    int LastRFPId = (int)Mydb.ExecuteScalar("select top(1) RECIEPT_FOR_PAYMENT_ID from RECIEPT_FOR_PAYMENT order by RECIEPT_FOR_PAYMENT_ID", new SqlParameter[] { }, CommandType.Text);
                    Mydb.ExecuteNoNQuery("insert into DETAIL_INF (RFP_SERVICE_ID,RECIEPT_FOR_PAYMENT_ID) values(@SERVICE,@LastRFPId)", new SqlParameter[] { new SqlParameter("@SERVICE", SERVICE), new SqlParameter("@LastRFPId", LastRFPId) }, CommandType.Text);
                }
                
            }

            return "";
        }
    }
}