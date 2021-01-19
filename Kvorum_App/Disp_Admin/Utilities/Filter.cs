using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Disp_Admin.Utilities
{
    public class Filter
    {
        public int REQUEST_ID { get; set; }
        public string ROOM_NUMBER{ get; set; }
        public int OBJECT_ID { get; set; }
        public int ROOM_TYPE_ID { get; set; }
        public string FIRST_NAME { get; set; }
        public string CR_DATE_FROM { get; set; }
         public string CR_DATE_TO { get; set; }
        public int STATUSE { get; set; }
        public string MOBILE_NUMBER { get; set; }
                                           // public string REQUEST_COMMENT { get; set; }
    }
}