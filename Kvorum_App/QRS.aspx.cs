using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App
{
    public partial class QRS : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            string decodedUrl = HttpUtility.UrlDecode(url);
            var uri = new Uri(url);
            var query = HttpUtility.ParseQueryString(uri.Query);
            string obj =  query.Get("obj");
            string lg = query.Get("lg");
            string roomId = query.Get("roomId");
            string types_param = query.Get("types");
            byte[] bytes = Convert.FromBase64String(types_param);
            var types = Encoding.ASCII.GetString(bytes);
            dynamic RoomTypes = JsonConvert.DeserializeObject(types);

           
                foreach (var item in RoomTypes)
                {
                    dynamic QRS_AND_Adress = JsonConvert.DeserializeObject(Mydb.ExecuteAsJson("Get_QRS_AND_Adress", new SqlParameter[] { new SqlParameter("@lg", Convert.ToInt32(lg)), new SqlParameter("@types", Convert.ToInt32(item.ROOM_TYPE)), new SqlParameter("@obj", Convert.ToInt32(obj)),new SqlParameter("@roomId",Convert.ToInt32(roomId)) }, CommandType.StoredProcedure));

                    foreach (var item2 in QRS_AND_Adress)
                    {
                         string Guid = item2.ROOM_GUID;
                    //HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host +
                    string path = @"C:\inetpub\wwwroot\__QR\" + Guid.Trim() + ".jpg";
                    if (!File.Exists(path))
                    {
                        GenerateQrCode(Guid);
                    }
                        string QR_CODE = item2.QR_CODES;
                        string Adress = item2.OBJECT_ADRESS;
                        Response.Write("<div class=\"tabService\"><img src=\"" + QR_CODE + "\" class=\"qr\"><div class=\"headerServ\">" + Adress + "</div></div>");
                    }
                } 
             

        }

        private void GenerateQrCode(string guid)
        {
            string json = new JavaScriptSerializer().Serialize(new
            {
                QRTEXT = guid,

            });
            string baseUrl = Path.GetDirectoryName(HttpContext.Current.Request.Url.OriginalString);
            baseUrl = baseUrl.Replace("\\", "//");
            string url = System.Configuration.ConfigurationManager.AppSettings["urlForQr"];//"https://test.upravbot.ru/WCFServices/MATORIN.QUICK_API.svc/CreateQRCode";
            // baseUrl + "/WCFServices/MATORIN.QUICK_API.svc/CreateQRCode";
            //HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/WCFServices/MATORIN.QUICK_API.svc/CreateQRCode";
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

            Mydb.ExecuteNoNQuery("Update_ROOM_QRCODE", new SqlParameter[] { new SqlParameter("@room_guid", guid), new SqlParameter("@QRCODE", QR_CODE) }, CommandType.StoredProcedure);
        }
    }
}