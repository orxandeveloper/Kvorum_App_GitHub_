using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Manager
{
    public partial class Manager : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("ru-RU");
            // Pa
            //ContentPlaceHolder1.AppRelativeTemplateSourceDirectory
            //  bd.InnerHtml = "<script src=\"../ Super_Disp / Utilities / UnitedSuper_Utilities.js\"></script>";
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Mydb.SigOutFromIdendity();
        }
    }
}