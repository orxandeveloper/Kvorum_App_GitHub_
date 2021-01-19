using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class RequestsManager : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string adressUrl= HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/Super_Disp/DispRequests.aspx";



            //
            Random r = new Random();
           // registerRequest.InnerHtml= "<script src='../Super_Disp/Utilities/UnitedSuper_Utilities.js?"+r.Next()+"' type='text/javascript'></script>";
           string a= Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");


            //Response.Write(output);
            //string strResult;
            //using (StreamReader sr = new StreamReader(objResponse.GetResponseStream()))
            //{
            //    strResult = sr.ReadToEnd();
            //    sr.Close();
            //}
            //  
        }
        [WebMethod]
        public static string GetRequestsForManager(int lg)
        {

            return Mydb.ExecuteAsJson("GetRequestsForManager", new SqlParameter[] { new SqlParameter("@lg",lg) }, CommandType.StoredProcedure);
        }
       // public static WebResponse GetRegisterOfRequests(string adressUrl, string htmlNodeId)
        //{
            
        //}
    }
}