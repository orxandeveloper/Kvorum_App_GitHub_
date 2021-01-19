using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class CreateRequest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string adressUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/Super_Disp/CreateDispRequest.aspx";



            //

            registerRequest.InnerHtml = Mydb.LoadPageToAnotherPage(adressUrl, "//div[@id='contentRegister']");
        }
    }
}