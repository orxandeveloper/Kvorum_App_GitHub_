using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Office.Interop.Excel;

namespace Kvorum_App.Disp_Admin.Utilities
{
    public class CreateExcelDoc
    {
        private Application app = null;
        private Workbook workbook = null;
        private Worksheet worksheet = null;
        private Range workSheet_range = null;
        public CreateExcelDoc()
        {
            createDoc();
        }
        public void createDoc()
        {
            try
            {
                app = new Application();
                app.Visible = true;
                workbook = app.Workbooks.Add(1);
                worksheet = (Worksheet)workbook.Sheets[1];
            }
            catch (Exception e)
            {
                Console.Write("Error");
            }
            finally
            {
            }
        }

        public void createHeaders(int row, int col, string htext, string cell1,
        string cell2, int mergeColumns, string b, bool font, int size, string
        fcolor)
        {
            worksheet.Cells[row, col] = htext;
            workSheet_range = worksheet.get_Range(cell1, cell2);
            workSheet_range.Merge(mergeColumns);
            #region gereksiz



            //switch (b)
            //{
            //    case "WHITE":
            //        workSheet_range.Interior.Color = System.Drawing.Color.White.ToArgb();
            //        break;
            //    case "WHITE":
            //        workSheet_range.Interior.Color = System.Drawing.Color.White.ToArgb();
            //        break;
            //    case "WHITE":
            //        workSheet_range.Interior.Color =
            //System.Drawing.Color.White.ToArgb();
            //        break;
            //    case "White":
            //        workSheet_range.Interior.Color =
            //System.Drawing.Color.Turquoise.ToArgb();
            //        break;
            //    case "PeachPuff":
            //        workSheet_range.Interior.Color =
            //System.Drawing.Color.PeachPuff.ToArgb();
            //        break;
            //    default:
            //        //  workSheet_range.Interior.Color = System.Drawing.Color..ToArgb();
            //        break;
            //}
            #endregion

            workSheet_range.Borders.Color = System.Drawing.Color.Black.ToArgb();
            workSheet_range.Font.Bold = font;
            workSheet_range.ColumnWidth = size;
            //if (fcolor.Equals(""))
            //{
            //    workSheet_range.Font.Color = System.Drawing.Color.White.ToArgb();
            //}
            //else
            //{
            //    workSheet_range.Font.Color = System.Drawing.Color.Black.ToArgb();
            //}
        }

        public void addData(int row, int col, string data,
            string cell1, string cell2, string format)
        {
            worksheet.Cells[row, col] = data;
            workSheet_range = worksheet.get_Range(cell1, cell2);
            workSheet_range.Borders.Color = System.Drawing.Color.Black.ToArgb();
            workSheet_range.NumberFormat = format;
        }
    }
}